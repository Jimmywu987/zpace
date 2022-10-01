export default (io:any, socket:any) => {
  const createdMessage = (msg:any) => {
    socket.broadcast.emit("newIncomingMessage", msg);
    console.log('newMessage')
  };

  socket.on("createdMessage", createdMessage);
};

