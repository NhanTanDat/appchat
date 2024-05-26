import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    console.log("Connected Users:", onlineUsers);

    io.emit("getUsers", onlineUsers);
  });

  socket.on("sendMessage", (message) => {
    console.log("message", message);

    // Gửi tin nhắn và thông báo cho từng người nhận
    message.recipientIds.forEach(recipientId => {
      const user = onlineUsers.find(user => user.userId === recipientId);
      if (user) {
        console.log("Gửi tin nhắn và thông báo cho user", recipientId);
        io.to(user.socketId).emit("getMessage", message);
        io.to(user.socketId).emit("getNotification", {
          senderId: message.senderId,
          isRead: false,
          date: new Date(),
        });
      }
    });
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected:", onlineUsers);
    io.emit("getUsers", onlineUsers);
  });
});

io.listen(80);

console.log(`Server socket running on port: 80...`);