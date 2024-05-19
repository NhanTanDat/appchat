const chatModel = require("../Models/chatModel");

const createChat = async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    const chat = await chatModel.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (chat) return res.status(200).json(chat);

    const newChat = new chatModel({
      members: [senderId, receiverId],
    });

    const response = await newChat.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

const userChats = async (req, res) => {
  
  const { memberId } = req.params;

  try {
    const chats = await chatModel.find({
      members: memberId
    });

    res.status(200).json(chats);
  } catch (error) {
    console.error('Error fetching chats by member ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const findChat = async (req, res) => {
  const firstId = req.params.firstId;
  const secondId = req.params.secondId;

  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createChat, userChats, findChat };
