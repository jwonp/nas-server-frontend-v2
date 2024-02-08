import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { request } from "@/utils/request";
import { AxiosError } from "axios";
import { ErrorResponse, SuccessResponse } from "@/types/Responses";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  const { path } = req.query;

  let folder = "";
  let directory = "";

  if (path === "/") {
    return res.status(200).json({ isExistDirectory: true });
  }
  const splitedPath = (path as string).split("/");

  folder = splitedPath.pop() as string;
  directory = splitedPath.join("/");

  const result = await request(session?.user)
    .get(
      `/storage/directory/check?directory=${directory}&folder=${`folder$${folder}`}`
    )
    .then((res) => {
      return { status: res.status, data: res.data };
    })
    .catch((err: AxiosError) => {
      return { status: err.status ?? 400, msg: err.message };
    });

  const responseData = (result as SuccessResponse).data
    ? {
        isExistDirectory: (result as SuccessResponse).data.isExistDirectory,
      }
    : (result as ErrorResponse);
  return res.status(result.status).json(responseData);
};

export default handler;
