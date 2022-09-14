import { prisma } from "@/services/prisma";
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { createOptions } from "../auth/[...nextauth]";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession({ req, res }, createOptions(req));
  if (!session) {
    res.status(401);
    throw new Error("Not authorized");
  }
  if (req.method === "POST") {
    const user = session.user as User;
    const updateUser = req.body as Partial<User>;
    const { email } = updateUser;
    if (email) {
      const hasUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (hasUser) {
        return res
          .status(422)
          .json({ errors: "Email has already been registered" });
      }
    }

    try {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...updateUser,
        },
      });
      return res.status(201).json({ message: "Success" });
    } catch (error) {
      return res.status(401).json({ errors: "Fail to update" });
    }
  }
};

export default handler;
