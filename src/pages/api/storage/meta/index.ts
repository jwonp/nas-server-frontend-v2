import { request } from "@/utils/request";

import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { MetaData } from "@/types/MetaData";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { metas } = req.body;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403).json({});
  }
  metas = (metas as MetaData[]).map((meta) => {
    if (!Object.keys(meta).includes("ownerId")) {
      return {
        ...meta,
        ownerId: session.user.id,
      };
    }
    return meta;
  });
  const result = await request(session?.user).post(`/storage/meta`, metas);

  res.status(200).json(result.data);
};

export default handler;
