import { request, response } from "@/utils/request";

import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { MetaData } from "@/types/MetaData";
import { type Error } from "@/types/Responses";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { metas } = req.body;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    const error: Error = {
      body: { msg: "Unauthorized" },
    };
    return res.status(403).json(error);
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

  const result = await response(
    request(session?.user).post(`/storage/meta`, metas)
  );

  const { status, ...body } = result;
  const data = body.body;
  res.status(result.status).json(data.body);
};

export default handler;
