import { prisma } from "@/services/prisma";
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { createOptions } from "../auth/[...nextauth]";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, createOptions(req));

  if (!session) {
    res.status(401);
    throw new Error("Not authorized");
  }
  if (req.method === "POST") {
    const user = session.user as User;

    const editRoom = req.body;
    const {
      id,
      roomUrls,
      deleteImg,
      weeklyTimeAvailability,
      oneTimeAvailability,
      ...storeData
    } = editRoom;
    const { spaceName, capacity, hourlyPrice, description } = storeData;
    if (
      !id ||
      !spaceName ||
      !capacity ||
      !hourlyPrice ||
      !description ||
      weeklyTimeAvailability.length === 0
    ) {
      return res.status(401).json({ errors: "Missing Input" });
    }
    try {
      const room = await prisma.room.findFirst({
        where: { id },
      });
      if (!room) {
        return res.status(500).json({ errors: "Fail to edit" });
      }
      await prisma.room.update({
        where: { id },
        data: { ...storeData },
      });
      if (room.spaceName !== spaceName || room.description !== description) {
        await stripe.products.update(room.stripeProductId, {
          name: spaceName,
          description,
        });
      }
      if (room.hourlyPrice !== hourlyPrice) {
        await stripe.prices.update(room.stripePriceId, {
          unit_amount: hourlyPrice * 100,
        });
      }

      await prisma.weeklyOpenTimeslot.deleteMany({
        where: {
          roomId: id,
        },
      });
      for (let k = 0; k < weeklyTimeAvailability.length; k++) {
        let startTime, endTime;
        if (
          weeklyTimeAvailability[k].weekHalfDayOne === "A.M." &&
          weeklyTimeAvailability[k].weekStartHr === "12"
        ) {
          startTime = "00";
        } else if (weeklyTimeAvailability[k].weekHalfDayOne === "A.M.") {
          startTime = weeklyTimeAvailability[k].weekStartHr;
        } else {
          let convertedTime =
            Number(weeklyTimeAvailability[k].weekStartHr) + 12;
          startTime = convertedTime.toString();
        }

        if (
          weeklyTimeAvailability[k].weekHalfDayTwo === "A.M." &&
          weeklyTimeAvailability[k].weekEndHr === "12"
        ) {
          endTime = "00";
        } else if (weeklyTimeAvailability[k].weekHalfDayTwo === "A.M.") {
          endTime = weeklyTimeAvailability[k].weekEndHr;
        } else {
          let convertedTime = Number(weeklyTimeAvailability[k].weekEndHr) + 12;
          endTime = convertedTime.toString();
        }
        startTime = startTime + ":" + weeklyTimeAvailability[k].weekStartMin;
        endTime = endTime + ":" + weeklyTimeAvailability[k].weekEndMin;

        await prisma.weeklyOpenTimeslot.create({
          data: {
            monday: weeklyTimeAvailability[k].monday,
            tuesday: weeklyTimeAvailability[k].tuesday,
            wednesday: weeklyTimeAvailability[k].wednesday,
            thursday: weeklyTimeAvailability[k].thursday,
            friday: weeklyTimeAvailability[k].friday,
            saturday: weeklyTimeAvailability[k].saturday,
            sunday: weeklyTimeAvailability[k].sunday,
            startTime,
            endTime,
            roomId: room.id,
          },
        });
      }
      await prisma.oneTimeOffOpenTimeslot.deleteMany({
        where: {
          roomId: id,
        },
      });
      for (let j = 0; j < oneTimeAvailability.length; j++) {
        let startTime, endTime;
        if (
          oneTimeAvailability[j].halfOneDayOne === "A.M." &&
          oneTimeAvailability[j].oneOffStartHr === "12"
        ) {
          startTime = "00";
        } else if (oneTimeAvailability[j].halfOneDayOne === "A.M.") {
          startTime = oneTimeAvailability[j].oneOffStartHr;
        } else {
          let convertedTime = Number(oneTimeAvailability[j].oneOffStartHr) + 12;
          startTime = convertedTime.toString();
        }

        if (
          oneTimeAvailability[j].halfOneDayTwo === "A.M." &&
          oneTimeAvailability[j].oneOffEndHr === "12"
        ) {
          endTime = "00";
        } else if (oneTimeAvailability[j].halfOneDay2 === "A.M.") {
          endTime = oneTimeAvailability[j].oneOffEndHr;
        } else {
          let convertedTime = Number(oneTimeAvailability[j].oneOffEndHr) + 12;
          endTime = convertedTime.toString();
        }
        startTime = startTime + ":" + oneTimeAvailability[j].oneOffEndMin;
        endTime = endTime + ":" + oneTimeAvailability[j].oneOffEndMin;

        await prisma.oneTimeOffOpenTimeslot.create({
          data: {
            date: oneTimeAvailability[j].oneOffDate,
            startTime,
            endTime,
            roomId: room.id,
          },
        });
      }
      await prisma.roomImg.createMany({
        data: roomUrls.map((url: string) => {
          return {
            url,
            roomId: room.id,
          };
        }),
      });
      await prisma.roomImg.deleteMany({
        where: {
          id: {
            in: deleteImg,
          },
        },
      });

      return res.status(201).json({ message: "Success" });
    } catch (error) {
      return res.status(401).json({ errors: "Fail to edit" });
    }
  }
};

export default handler;
