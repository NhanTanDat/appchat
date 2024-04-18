const express = require("express");
const {
  createChat,
  userChats,
  findChat,
} = require("../Controllers/chatController");

const router = express.Router();

router.post("/", createChat);
router.get("/:memberId", userChats);
router.get("/find/:firstId/:secondId", findChat);

module.exports = router;
