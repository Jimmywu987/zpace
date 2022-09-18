import { prisma } from "./prisma";

export const getCreateRoomInfo = async (user_id: string) => {
  return await prisma.room.findMany({
    where: {
      userId: user_id,
    },
    include: {
      roomImgs: true,
      weeklyOpenTimeslots: true,
      oneTimeOffOpenTimeslots: true,
      ratingAndComments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
