import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { type Error } from "@/types/Responses";
import { randomUUID } from "crypto";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    const error: Error = {
      body: { msg: "Unauthorized" },
    };
    return res.status(403).json(error);
  }
  const { amount } = req.query;

  const ids = Array.from(Array(Number(amount))).map((_) => randomUUID());
  res.status(200).json({ ids });
};

export default handler;
