const Message = require("../Models/messageModel");


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


const createMessage = async (req, res) => {
res.setHeader('Content-Type', 'multipart/form-data');
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Specify the origin if needed
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization'); // Include additional headers if needed
res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies, authorization headers, etc.
  console.log(req.body.attachments);
  const { chatId, senderId, text } = req.body;
  const { attachments } = req.body;
  try {
    console.log(req.body)
    if (attachments) {
      return res.status(400).json({ message: 'Không co tập tin nao được tải lên.' });
    }
      const attachmentUrls = req.files.map((file) => file.location);
      const message = new Message({
      chatId,
      senderId,
      text,
      attachments: attachmentUrls.map((url) => ({
        type: url.includes("images") ? "image" : "video",
        url,
      })),
    });
    const data = await message.save();
    // Trả về đường dẫn của hình ảnh đã lưu trữ trên S3
    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi tải ảnh lên S3.' });
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createMessage, getMessages,upload };
