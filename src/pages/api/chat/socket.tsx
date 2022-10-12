import { Server } from "socket.io";
import messageHandler from "@/helpers/messageHandler";

export default function SocketHandler(req:any, res:any) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket:any) => {
    messageHandler(socket);

  });

  console.log("Setting up socket");
  res.end();
  
}


