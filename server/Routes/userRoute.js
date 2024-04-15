const express = require("express");
const {
  registerUser,
  loginUser,
  findUser,
  getUsers,
  sendFriendRequest,
  acceptFriendRequest,
  getUserInfo,
  authenticateToken,
  getFriendRequestsById,
  getSenderInfoByReceiverIdHandler
  
} = require("../Controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/user", findUser);
router.post("/userInfo", authenticateToken, getUserInfo);
router.post("/sendfriendrequest", sendFriendRequest);
router.post("/acceptfriendrequest", acceptFriendRequest);
router.post("/getfriendrequests",getFriendRequestsById)
router.post("/", getUsers);
router.post("/getsenderinfo", getSenderInfoByReceiverIdHandler);

module.exports = router;
