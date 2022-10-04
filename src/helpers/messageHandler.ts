export default (io: any, socket: any) => {
  socket.on("createdMessage", (msg: any) => {
    io.broadcast.emit("newIncomingMessage", msg);
    console.log('new message')
  });
};
