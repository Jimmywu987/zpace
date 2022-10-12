import React from "react";
import { ManageRooms } from "./components/ManageRooms";
import { ChatBox } from "./components/ChatBox"

export default function NavFunctions() {
  return (
    <div className="flex flex-none space-x-5">
      <div>
        <ChatBox />
      </div>
      <div>
        <ManageRooms />
      </div>
    </div>
  );
}
