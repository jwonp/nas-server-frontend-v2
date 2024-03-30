import { InitErroResponse, request, response } from "@/utils/request";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { ItemResponse } from "@/types/Responses";
import { type Error } from "@/types/Responses";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  let result = InitErroResponse;

  if (!session || !session.user) {
    const error: Error = {
      body: { msg: "Unauthorized" },
    };
    return res.status(403).json(error);
  }

  if (req.method === "GET") {
    const { path } = req.query;

    result = await response<ItemResponse>(
      request(session?.user).get(
        `/storage/item?path=${path ? `/${(path as string[]).join("/")}` : "/"}`
      )
    );
  }

  if (req.method === "DELETE") {
    const body = req.body;
    if (!body) {
      const error: Error = {
        body: { msg: "No body" },
      };

      return res.status(400).json(error);
    }
    const { fileId, fileSize, fileType, directory } = body;

    result = await response(
      request(session?.user).delete(
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
    );
  }
  const { status, ...body } = result;
  const data = body.body;
  res.status(result.status).json(data);
};

export default handler;
