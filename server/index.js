const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");

const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");
const userRoute = require("./Routes/userRoute");
const path = require("path");
require("dotenv").config();
const fs = require('fs');
const app = express();
const AWS = require("aws-sdk");

process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = "1";

AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:8081'],
  credentials: true,
  methods: 'GET, POST, OPTIONS',
};
  
app.use(express.json());
app.use(cors(corsOptions))

app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
  res.send("Chào mừng em đến với nhà của bọn anh !!!!!!");
});

const uri = process.env.DATABASE;
const port = process.env.PORT;

const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Tạo thư mục uploads nếu nó chưa tồn tại
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}
app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB kết nối thành công..."))
  .catch((error) => console.error("MongoDB kết nối thất bại:", error.message));
