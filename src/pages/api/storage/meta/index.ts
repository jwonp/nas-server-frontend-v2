import { request } from "@/utils/request";

import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { MetaData } from "@/types/MetaData";
import { AxiosError } from "axios";
import { ErrorResponse, MetaUploadResponse, SuccessResponse } from "@/types/Responses";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { metas } = req.body;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403).json({ error: "Unauthorized" });
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
      ? ((result as SuccessResponse).data as MetaUploadResponse)
      : result as ErrorResponse;
  res.status(result.status).json(responseData);
};

export default handler;
