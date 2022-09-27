import React from "react";
import { ManageRooms } from "./components/ManageRooms";

export default function NavFunctions() {
  return (
    <div className="flex flex-none space-x-5">
      <div>
      </div>
      <div>
        <ManageRooms />
      </div>
    </div>
  );
}
