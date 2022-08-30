import { prisma } from "@/services/prisma";

export async function getUserWithUserId(user_id: string) {
  // console.log(user_id)
  const user = prisma.user.findFirst({
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

  return user;
}
