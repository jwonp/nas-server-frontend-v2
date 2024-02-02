import { request } from "@/utils/request";

import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { metas } = req.body;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(403).json({});
  }

  const result = await request(session?.user).post(`/storage/meta`, metas);

  res.status(200).json({});
};

export default handler;
