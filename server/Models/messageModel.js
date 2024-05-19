const mongoose = require("mongoose");

// Mô hình cho các tệp đính kèm (hình ảnh và video)
const attachmentSchema = new mongoose.Schema({
  type: { type: String, enum: ["image", "video"] }, // Loại tệp (hình ảnh hoặc video)
  url: String, // Đường dẫn đến tệp trên S3
});

// Mô hình cho tin nhắn
const messageSchema = new mongoose.Schema(
  {
    chatId: String,
    senderId: String,
    text: String,
    attachments: { type: [attachmentSchema], default: [] }, // Mảng các tệp đính kèm, mặc định là rỗng
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;