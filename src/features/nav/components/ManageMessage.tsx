import { userSelector } from "@/redux/user";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import  ChatBox from "@/features/chatbox/ChatBox";

export const ManageMessage = () => {
  const reduxUser = useSelector(userSelector);
  const session = useSession();

  const user = session.data?.user as User;

  return <ChatBox />;
};
