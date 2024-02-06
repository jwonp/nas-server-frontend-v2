import { request } from "@/utils/request";

import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { fileId, title } = req.body;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403).json({});
  }

  const result = await request(session?.user).patch(`/storage/meta/title`, {
    fileId: fileId,
    title: title,
    userId: session.user.id,
  });

  res.status(200).json(result.data);
};

export default handler;
