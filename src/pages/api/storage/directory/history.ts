import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { request } from "@/utils/request";
import { DisplayHistoryResponse, ErrorResponse, SuccessResponse } from "@/types/Responses";
import { AxiosError } from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  const { path } = req.query;

  const result = await request(session?.user)
    .get(`/storage/directory/history?path=${path}`)
    .then((res) => {
      return { status: res.status, data: res.data };
    })
    .catch((err: AxiosError) => {
      return { status: err.status ?? 400, msg: err.message };
    });

  const responseData =
    result.status / 100 < 4
      ? ((result as SuccessResponse).data as DisplayHistoryResponse[])
      : result as ErrorResponse;
  return res.status(result.status).json(responseData);
};

export default handler;
