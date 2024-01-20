import { request } from "@/utils/request";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { path } = req.query;
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    return res.status(403).json({});
  }

  const result = await request(session?.user).get(
    `/storage/item?path=${path ? `/${(path as string[]).join("/")}` : ""}`
  );

  res.status(200).json(result.data);
};

export default handler;
