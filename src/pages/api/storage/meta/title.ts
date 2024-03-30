import { request, response } from "@/utils/request";

import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { type Error } from "@/types/Responses";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { fileId, title } = req.body;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    const error: Error = {
      body: { msg: "Unauthorized" },
    };
    return res.status(403).json(error);
  }

  const result = await response(
    request(session?.user).patch(`/storage/meta/title`, {
      fileId: fileId,
      title: title,
      userId: session.user.id,
    })
  );

  const { status, ...body } = result;
  const data = body.body;
  res.status(status).json(data);
};

export default handler;
