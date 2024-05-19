const express = require("express");
const {
  createMessage,
  getMessages,
  upload
} = require("../Controllers/messageController");
const cors = require('cors');


const router = express.Router();


router.post("/", upload.array("attachments"), createMessage);
router.get("/:chatId", getMessages);

module.exports = router;

