// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { type Error } from "@/types/Responses";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { InitErroResponse, request, response } from "@/utils/request";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  let result = InitErroResponse;
  if (!session) {
    const error: Error = {
      body: { msg: "Unauthorized" },
    };
    return res.status(403).json(error);
  }

  if (req.method === "GET") {
    result = await response(
      request(session?.user).get("/storage/item/favorite")
    );
  }

  if (req.method === "PUT") {
    const { folder, directory } = req.body;
    result = await response(
      request(session?.user).put("/storage/item/favorite", {
        directory,
        folder,
      })
    );
  }

  const { status, ...body } = result;
  const data = body.body;
  return res.status(result.status).json(data);
}
