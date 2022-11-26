import { TimeslotStatusEnum } from "@prisma/client";
import { prisma } from "./prisma";

export const getRoomInfoById = async (roomId: string) => {
  return await prisma.room.findUnique({
    where: {
      id: roomId,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          profileImg: true,
          createdAt: true,
          description: true,
        },
      },
      roomImgs: true,
      weeklyOpenTimeslots: true,
      oneTimeOffOpenTimeslots: true,
      customerBookingTimeslots: {
        where: {
          status: TimeslotStatusEnum.ACCEPTED,
        },
        include: {
          bookingTimeslots: true,
        },
      },
      ratingAndComments: {
        select: {
          user: {
            select: {
              username: true,
              profileImg: true,
              createdAt: true,
              description: true,
            },
          },
          id: true,
          createdAt: true,
          comment: true,
          rating: true,
          roomId: true,
        },
      },
      likes: true,
    },
  });
};
