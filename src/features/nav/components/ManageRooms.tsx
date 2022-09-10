import { useState } from "react";

import { becomeHost } from "@/apis/api";
import { User } from "@prisma/client";
import { Session } from "next-auth/core/types";
import { getSession, useSession } from "next-auth/react";
import { BecomeHostBox } from "./BecomeHostButton";
export const ManageRooms = () => {
  const [updatedSession, setUpdatedSession] = useState<Session | null>(null);
  const session = useSession();

  const onClickConfirm = async () => {
    const res = await becomeHost();
    if (res && res.status === 201) {
      const session = await getSession();
      setUpdatedSession(session);
      return;
    }
  };
  const user = session.data?.user as User;
  const updatedUser = updatedSession?.user as User;
  const isRoomOwner =
    (!!user && !!user.isRoomOwner) ||
    (!!updatedUser && !!updatedUser.isRoomOwner);
  console.log("isRoomOwner", isRoomOwner);
  return (
    <div>
      <BecomeHostBox onClickConfirm={onClickConfirm} />
    </div>
  );
};
