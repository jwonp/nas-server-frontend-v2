// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { request, response } from "@/utils/request";
import { UserSearchResponse } from "@/types/Responses";
import { type Error } from "@/types/Responses";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    const error: Error = {
      body: { msg: "Unauthorized" },
    };
    return res.status(403).json(error);
  }
  if (!query || query === "") {
    const error: Error = {
      body: { msg: "Not guest" },
    };
    return res.status(204).json(error);
  }
  const result = await response<UserSearchResponse>(
    request(session?.user).get(`/user/search?query=${query}`)
  );

  const { status, ...body } = result;
  const data = body.body;
  res.status(result.status).json(data);
}
