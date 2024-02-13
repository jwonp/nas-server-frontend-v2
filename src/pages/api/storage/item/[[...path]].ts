import { request } from "@/utils/request";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { AxiosError } from "axios";
import {
  ErrorResponse,
  ItemResponse,
  SuccessResponse,
} from "@/types/Responses";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  const { path } = req.query;
  if (req.method === "GET") {
    if (!session || !session.user) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const result = await request(session?.user).get(
      `/storage/item?path=${path ? `/${(path as string[]).join("/")}` : ""}`
    );

    return res.status(200).json(result.data);
  }
  if (req.method === "DELETE") {
    const { fileId, fileSize, fileType ,directory} = req.body;
    const result = await request(session?.user)
      .delete(
        fileType === "folder" ? `/storage/item/folder` : `/storage/item`,
        {
          data: {
            fileId: fileId,
            fileSize: fileSize,
            directory: directory,
            userId: session?.user.id,
          },
        }
      )
      .then((res) => {
        return { status: res.status, data: res.data };
      })
      .catch((err: AxiosError) => {
        return { status: err.status ?? 400, msg: err.message };
      });

    const responseData =
      result.status / 100 < 4
        ? ((result as SuccessResponse).data as ItemResponse)
        : (result as ErrorResponse);

    return res.status(result.status).json(responseData);
  }
};

export default handler;
