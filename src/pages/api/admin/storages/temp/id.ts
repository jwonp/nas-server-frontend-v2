import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import { randomUUID } from "crypto";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  const { amount } = req.query;
  console.log(amount);
  const ids = Array.from(Array(Number(amount))).map((_) => randomUUID());
  return res.status(200).json({ ids });
};

export default handler;
