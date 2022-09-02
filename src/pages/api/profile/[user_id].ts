import { prisma } from "@/services/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const id = req.query.user_id as string;
    const url = req.body.imageUrl;
    if (id) {
      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          profileImg: url,
        },
      });
      return res.status(200).json({message: "Success"});
    }
   
  }
};

export default handler;
