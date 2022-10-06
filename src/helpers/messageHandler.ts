export default function messageHandler(io: any, socket: any) {
  socket.on("send-message", (msg: any) => {
    console.log(socket.id);
    console.log(msg.sender_id);
    // if (socket.id !== msg.sender_id) {
    console.log("receive msg now");
    io.emit("receive-message", msg);
    // }
  });

  socket.on("createdMessage", (msg: any, room: any) => {
    console.log(msg);
    if (room === "") {
      io.emit("newIncomingMessage", msg);
    } else {
      io.to(room).emit("newIncomingMessage", msg);
    }
  });
};
