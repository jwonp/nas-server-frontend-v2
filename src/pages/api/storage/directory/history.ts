import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { request } from "@/utils/request";
import { DisplayHistoryResponse } from "@/types/Responses";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403).json({});
  }
  const { path } = req.query;

  console.log(`path is ${path}`);
  const result = await request(session?.user).get(
    `/storage/directory/history?path=${path}`
  );

  return res.status(200).json(result.data as DisplayHistoryResponse[]);
};

export default handler;
