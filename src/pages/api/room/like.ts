import { prisma } from "@/services/prisma";
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { createOptions } from "../auth/[...nextauth]";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, createOptions(req));

  if (!session) {
    res.status(401);
    throw new Error("Not authorized");
  }
  if (req.method === "GET") {
    const user = session.user as User;
    try {
      const { roomId } = req.query;
      const { id } = await prisma.like.create({
        data: {
          userId: user.id,
          roomId: roomId.toString(),
        },
      });

      return res.status(200).json({ id });
    } catch (error) {
      return res.status(401).json({ errors: "Fail to delete" });
    }
  }
};

export default handler;
