import { prisma } from "@/services/prisma";
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { createOptions } from "../auth/[...nextauth]";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession({ req, res }, createOptions(req));
  if (!session) {
    res.status(401);
    throw new Error("Not authorized");
  }
  if (req.method === "POST") {
    const user = session.user as User;
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isRoomOwner: true,
      },
    });
    return res.status(201).json({ message: "Success" });
  }
};

export default handler;
