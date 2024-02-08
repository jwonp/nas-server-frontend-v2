import { request } from "@/utils/request";

import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { AxiosError } from "axios";
import { ErrorResponse, SuccessResponse } from "@/types/Responses";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { metas } = req.body;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
   return res.status(403).json({ error: "Unauthorized" });
  }

  const result = await request(session?.user)
    .post(`/storage/meta`, metas)
    .then((res) => {
      return { status: res.status, data: res.data };
    })
    .catch((err: AxiosError) => {
      return { status: err.status ?? 400, msg: err.message };
    });

  const responseData =
    result.status / 100 < 4
      ? (result as SuccessResponse).data
      : (result as ErrorResponse);
  res.status(result.status).json(responseData);
};

export default handler;
