import { prisma } from "@/services/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const setting = req.body;
      const date = setting.date;
      const weeks = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];
      const week = new Date(date).getDay();
      const weekDay = weeks[week];
      const roomInfos = await prisma.room.findMany({
        where: {
          OR: [
            {
              weeklyOpenTimeslots: {
                some: {
                  [weekDay]: true,
                },
              },
            },
            {
              oneTimeOffOpenTimeslots: {
                some: {
                  date: date,
                },
              },
            },
          ],
        },
        include: {
          likes: true,
          roomImgs: true,
          weeklyOpenTimeslots: true,
          oneTimeOffOpenTimeslots: true,
          ratingAndComments: true,
        },
      });
      return res.status(200).json({ roomInfos });
    } catch (error) {
      return res.status(401).json({ errors: "Fail to fetch" });
    }
  }
};

export default handler;
