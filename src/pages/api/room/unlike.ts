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
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      await prisma.like.delete({
        where: {
          id: id.toString(),
        },
      });
      return res.status(200).json({ message: "Unlike" });
    } catch (error) {
      return res.status(401).json({ errors: "Fail to delete" });
    }
  }
};

export default handler;
