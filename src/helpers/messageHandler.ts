export default function messageHandler(socket: any) {
  socket.on("send-message", (msg: any, room: string) => {
    socket.to(room).emit("receive-message", (msg));
  });

  socket.on("join-room", (room: string) => {
    socket.join(room);
  });


  socket.on("joinRoomMessage", (username: string) => {
    socket.broadcast.emit("newIncomingMessage", {author: "admin", message: `${username} has joined room`})
  });


  socket.on("createdMessage", (msg: any, room: any) => {
    if (room === "") {
      socket.broadcast.emit("newIncomingMessage", msg);
    } else {
      socket.to(room).emit("newIncomingMessage", msg);
    }
  });
}

