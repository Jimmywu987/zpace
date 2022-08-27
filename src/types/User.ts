import { UserStatusEnum } from "@prisma/client";

export type User = {
  createdAt: string;
  description: string;
  email: string;
  id: string;
  isRoomOwner: boolean;
  phoneNumber: string;
  profileImg: string;
  status: UserStatusEnum;
  username: string;
};
