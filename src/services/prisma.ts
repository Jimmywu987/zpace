import { PrismaClient } from "@prisma/client";
import timeSince from "@/helpers/timeSince";
export const prisma = new PrismaClient();

export async function getUserWithUserId(
  user_id: string,
  changeCreateAt: boolean
) {
  const user = await prisma.user.findFirst({
    where: {
      id: user_id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      profileImg: true,
      phoneNumber: true,
      description: true,
      createdAt: true,
    },
  });
  if (user && changeCreateAt)
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      profileImg: user.profileImg,
      phoneNumber: user.phoneNumber,
      description: user.description,
      createdAt: timeSince(user.createdAt),
    };

  return user;
}
