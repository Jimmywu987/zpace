import { userSelector } from "@/redux/user";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { BecomeHostBox } from "./BecomeHostButton";

import { ManageRoomBox } from "./ManageRoomBox";
export const ManageRooms = () => {
  const reduxUser = useSelector(userSelector);
  const session = useSession();

  const user = session.data?.user as User;
  const isRoomOwner = (!!user && !!user.isRoomOwner) || reduxUser.isRoomOwner;

  if (!isRoomOwner) {
    return <BecomeHostBox />;
  }

  return <ManageRoomBox />;
};
