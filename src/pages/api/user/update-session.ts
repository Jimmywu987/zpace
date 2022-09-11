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
    return res.status(200).json({ message: "Success" });
  }
};

export default handler;
