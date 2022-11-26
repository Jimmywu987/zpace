const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

import { prisma } from "@/services/prisma";
import sgMail from "@/services/sendgrid";
import { Prisma, TimeslotStatusEnum, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { createOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await unstable_getServerSession(
      req,
      res,
      createOptions(req)
    );
    if (!session) {
      res.status(401);
      throw new Error("Not authorized");
    }
    const user = session.user as User;
    try {
      const {
        tokenId,
        price,
        roomId,
        headCount,
        roomOwnerId,
        bookedTimeSlot,
        spaceName,
      } = req.body;

      // Create Checkout Sessions from body params.
      const charge = await stripe.charges.create({
        amount: price * 100,
        currency: "hkd",
        source: tokenId,
      });
      if (!charge.paid) {
        return res.status(405).json({ message: "Payment failed" });
      }
      const booking = await prisma.$transaction(
        async (tx: Prisma.TransactionClient) => {
          const booking = await tx.customerBookingTimeslot.create({
            data: {
              status: TimeslotStatusEnum.PENDING,
              roomId,
              headCount,
              customerId: user.id,
              price,
            },
          });
          const checkIfChatExist = await tx.chatTable.findUnique({
            where: {
              hostId_customerId: {
                hostId: roomOwnerId,
                customerId: user.id,
              },
            },
          });

          if (checkIfChatExist) {
            await tx.message.create({
              data: {
                userId: user.id,
                isRead: true,
                content: booking.id,
                isRequest: true,
                chatTableId: checkIfChatExist.id,
              },
            });
          } else {
            await tx.chatTable.create({
              data: {
                customerId: user.id,
                hostId: roomOwnerId,
                messages: {
                  create: {
                    userId: user.id,
                    isRead: true,
                    content: booking.id,
                    isRequest: true,
                  },
                },
              },
            });
          }

          for (let i = 0; i < bookedTimeSlot.length; i++) {
            await tx.bookingTimeslot.create({
              data: {
                customerBookingTimeslotId: booking.id,
                date: bookedTimeSlot[i].date,
                startTime: bookedTimeSlot[i].from,
                endTime: bookedTimeSlot[i].to,
              },
            });
          }
          return booking;
        }
      );

      const host = await prisma.user.findUnique({
        where: {
          id: roomOwnerId,
        },
      });

      const toHost = {
        to: host?.email, // Change to your recipient
        from: "zpaceroomrenting@gmail.com", // Change to your verified sender
        subject: "Room Renting request!",
        text: `${user.username} would like to book ${spaceName}, for more details, please click here https://zpace.ml/.`,
      };

      const toCustomer = {
        to: user.email, // Change to your recipient
        from: "zpaceroomrenting@gmail.com", // Change to your verified sender
        subject: "Booking request is sent",
        text: "Booking request sent successfully.",
      };
      sgMail
        .send(toHost)
        .then((response) => {})
        .catch((err) => {});
      sgMail
        .send(toCustomer)
        .then((response) => {})
        .catch((err) => {});

      return res.status(200).json({
        message: "booked successfully",
        customerBookingId: booking.id,
      });
    } catch (err) {
      res.status(500).json({ message: "failed to purchase" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
