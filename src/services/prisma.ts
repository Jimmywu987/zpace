import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();


export async function getUserWithUserId(user_id: string) {
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
