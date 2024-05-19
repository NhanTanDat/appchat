const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const userModel = require("../Models/userModel");
const chatModel = require("../Models/chatModel");

const express = require('express');
const app = express();
const multer = require("multer");
const AWS = require("aws-sdk");
require('dotenv').config();
const path = require("path");
const multerS3 = require('multer-s3');

process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = "1";

AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();
const bucketName = process.env.S3_BUCKET_NAME;

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: function (req, file, cb) {
      const extname = path.extname(file.originalname).toLowerCase();
      const isImage = ['.jpg', '.jpeg', '.png', '.gif'].includes(extname);
      const isVideo = ['.mp4', '.mov', '.avi', '.mkv'].includes(extname);

      if (isImage) {
        cb(null, 'images/' + Date.now() + '-' + path.basename(file.originalname));
      } else if (isVideo) {
        cb(null, 'videos/' + Date.now() + '-' + path.basename(file.originalname));
      } else {
        cb(new Error('Invalid file type'));
      }
    }
  })
});

const uploadImg = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Không co tập tin nao được tải lên.' });
    }
  
    // Trả về đường dẫn của hình ảnh đã lưu trữ trên S3
    res.status(200).json({ message: 'Ảnh đã được lưu', path: req.file.location });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi tải ảnh lên S3.' });
  }
}

const createToken = ( _id, name, phone, email) => {
  return jwt.sign({ _id , name, phone, email}, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
};

const verifyToken = (token) => {
  try {
    // Giải mã token và lấy dữ liệu được mã hóa trong nó
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded;
  } catch (error) {
    return null;
  }
};

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Token không được cung cấp" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Token không hợp lệ" });
  }

  // Gán thông tin người dùng vào req để các hàm xử lý sau có thể truy cập
  req.user = decoded;
  next();
};

// Hàm xử lý lấy thông tin người dùng
const getUserInfo = async (req, res) => {
  try {
    // Thông tin người dùng đã được gán từ middleware
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi lấy thông tin người dùng" });
  }
};


const registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const friends = [];
  const friendRequest = [];
  const avatar = "default-avatar.jpg";
  try {
    let user = await userModel.findOne({ email });
    if (user) return res.status(400).json("Người dùng đã tồn tại...");

    user = new userModel({ name,avatar, email, phone, password,friends,friendRequest });

    if (!name || !email || !password)
      return res.status(400).json("Tất cả các trường là bắt buộc...");

    if (!validator.isEmail(email))
      return res.status(400).json("Email phải là email hợp lệ...");

    if (!validator.isStrongPassword(password))
      return res.status(400).json("Mật khẩu phải là mật khẩu mạnh..");

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = createToken(user._id,user.name, user.phone, user.email);

    res.status(200).json({ status: 200,message: "thành công", token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  const { emailOrPhone, password } = req.body;

  try {

    let user = await userModel.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    });

    if (!user) {
      return res.status(400).json("Email hoặc số điện thoại hoặc mật khẩu không hợp lệ...");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json("Email hoặc số điện thoại hoặc mật khẩu không hợp lệ...");
    }

    const token = createToken(user._id,user.name, user.phone, user.email);

    res.status(200).json({ status: 200,message: "thành công", token });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
const finUserByID = async (req, res) => {
  const { receiverId } = req.body;
  try {
    const user = await userModel.findById(receiverId);
    res.status(200).json(user);
  } catch (error) {
    
  }
};
const findUser = async (req, res) => {
  const { data } = req.body;
  let query = {};
  try {
    if (!data) {
      return res.status(400).json({ message: 'Vui lòng cung cấp dữ liệu để tìm kiếm: số điện thoại, tên hoặc email' });
    }
    if (validator.isMobilePhone(data, 'any')) {
      query.phone = data;
    } else if (validator.isEmail(data)) {
      query.email = data;
    } else {
      query.name = data;
    }
    const users = await userModel.find(query);
    res.status(200).json(users);
  } catch (error) {
   
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
};
const getUsers = async (req, res) => {
  const {id} = req.body; // ID của người dùng hiện tại

  try {
    // Lấy danh sách bạn bè của người dùng
    const user = await userModel.findById(id);

    const friendIds = user.friends.map(friend => friend.id);

    // Lấy danh sách người đã gửi yêu cầu kết bạn cho người dùng
    const requestSenderIds = user.friendRequest.map(request => request.receiverId);

    const requestIds = user.friendRequest.map(request => request.senderId);

    // Tạo mảng ID bao gồm bản thân người dùng và danh sách bạn bè và người đã gửi yêu cầu kết bạn
    const excludeIds = [...friendIds, ...requestSenderIds,...requestIds, id];

    // Lấy danh sách người dùng không phải là bạn bè, không phải người đã gửi yêu cầu kết bạn, và không phải bản thân người gửi yêu cầu kết bạn
    const nonFriendsAndNonRequestSenders = await userModel.find({ _id: { $nin: excludeIds } });

    res.status(200).json(nonFriendsAndNonRequestSenders);
} catch (error) {
    res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy danh sách người dùng.', error });
}
};
const getFriendRequestsById = async (req, res) => {
  const { data } = req.body; 
  try {
    const user = await userModel.findById(data);
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
    const friendRequests = user.friendRequest;
    res.status(200).json(friendRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy danh sách yêu cầu kết bạn' });
  }
};

const sendFriendRequest = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    // Kiểm tra xem người gửi yêu cầu kết bạn tồn tại trong hệ thống
    const sender = await userModel.findById(senderId);
    if (!sender) {
      return res.status(404).json({ message: 'Người gửi không tồn tại trong hệ thống' });
    }

    // Kiểm tra xem người nhận yêu cầu kết bạn tồn tại trong hệ thống
    const receiver = await userModel.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: 'Người nhận không tồn tại trong hệ thống' });
    }
    
    // Kiểm tra xem người gửi đã gửi yêu cầu kết bạn trước đó chưa
    const existingRequest = receiver.friendRequest.find(request => request.receiverId.equals(receiverId));
    if (existingRequest) {
      return res.status(400).json({ message: 'Bạn đã gửi yêu cầu kết bạn cho người này trước đó' });
    }

    // Tạo yêu cầu kết bạn mới
    const newRequest = {
      senderId: senderId,
      receiverId: receiverId,
      sentAt: new Date()
    };

    // Thêm yêu cầu kết bạn vào danh sách yêu cầu của người gửi
    receiver.friendRequest.push(newRequest);
    await receiver.save();

    res.status(200).json({ message: 'Yêu cầu kết bạn đã được gửi thành công'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi gửi yêu cầu kết bạn' });
  }
};

const acceptFriendRequest = async (req, res) => {
  const { requestId } = req.body;
  try {

    // Tìm kiếm yêu cầu kết bạn dựa trên requestId
    const sender = await userModel.findOne({ 'friendRequest._id': requestId });
    if (!sender) {
      return res.status(404).json({ message: 'Yêu cầu kết bạn không tồn tại' });
    }

    // Lấy thông tin yêu cầu kết bạn
    const request = sender.friendRequest.find(request => request._id.equals(requestId));
    if (!request) {
      return res.status(404).json({ message: 'Yêu cầu kết bạn không tồn tại' });
    }

    // Thêm người nhận vào danh sách bạn bè của người gửi
      sender.friends.push(request.senderId);
      await sender.save();

    // // Thêm người gửi vào danh sách bạn bè của người nhận
    const receiver = await userModel.findById(request.senderId);
    receiver.friends.push(request.receiverId);
    await receiver.save();

    // Xóa yêu cầu kết bạn đã được chấp nhận
    sender.friendRequest.pull({ _id: requestId });
    await sender.save();

    // Tạo cuộc trò chuyện giữa người gửi và người nhận
    const chat = await chatModel.findOne({
      members: { $all: [request.senderId, request.receiverId] },
    });

    if (!chat) {
      const newChat = new chatModel({
        members: [request.senderId, request.receiverId],
      });

      await newChat.save();
    }

    res.status(200).json({ message: 'Đã chấp nhận yêu cầu kết bạn',sender});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi chấp nhận yêu cầu kết bạn' });
  }
};

const creatgroupchat = async (req, res) =>{
  try {
    const { memberIds } = req.body;

    // Tìm kiếm chat nhóm với tất cả các thành viên được chỉ định
    const chat = await chatModel.findOne({ members: { $all: memberIds } });

    // Nếu không tìm thấy chat nhóm, tạo mới
    if (!chat) {
      const newChat = new chatModel({ members: memberIds });
      await newChat.save();
      return res.status(201).json({ message: 'Group chat created successfully', chatId: newChat });
    } else {
      return res.status(409).json({ message: 'Group chat already exists for the given members', chatId: chat });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const getSenderInfoByReceiverId = async (senderId) => {
  try {
    // Find the user by senderId and populate the friendRequest.receiverId field
    const user = await userModel.findById(senderId)
      .populate('friendRequest.senderId', 'name avatar email phone');

    if (!user) {
      throw new Error('User not found');
    }

    // Extract and return information about receivers from friendRequest array
    const receivers = user.friendRequest.map(request => ({
      id: request._id,
      name: request.senderId.name,
      avatar: request.senderId.avatar,
      email: request.senderId.email,
      phone: request.senderId.phone,
    }));

    return receivers;
  } catch (error) {
    console.error('Error fetching sender information:', error);
    throw error; // Propagate the error to the caller
  }
};

const getAllFriendsByID = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const friendIds = user.friends.map(friend => friend._id); // Lấy ra chỉ ID của bạn bè
    const data = friendIds.map(friendId => userModel.findById(friendId)); // Tạo một mảng các promise

    const friends = await Promise.all(data);

    // Trả về danh sách bạn bè
    res.status(200).json({ friends });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getSenderInfoByReceiverIdHandler = async (req, res) => {
  const {senderId} = req.body; // Assuming receiverId is obtained from the request parameters

  try {
    const senders = await getSenderInfoByReceiverId(senderId);
    // Handle the senders array (contains sender information)
    res.status(200).json(senders);
  } catch (error) {
    // Handle errors
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { creatgroupchat,getAllFriendsByID,upload,uploadImg,finUserByID,getSenderInfoByReceiverIdHandler,getFriendRequestsById,registerUser, loginUser, findUser, getUsers, sendFriendRequest,acceptFriendRequest ,getUserInfo,authenticateToken};
