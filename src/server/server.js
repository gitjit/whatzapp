const io = require("socket.io")(8000);

const users = {};

console.log("server listening");

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    console.log(`${name} just joined the room`);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
    console.log(users);
  }); // new-user-joined

  // Send
  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  }); // send

  // Disconnect
  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
  }); // disconnect
  
}); // io.onƒ
