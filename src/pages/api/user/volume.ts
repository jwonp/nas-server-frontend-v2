// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { request } from "@/utils/request";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const result = await request(session?.user).get("/user/volume");
  if (!session) {
    return res.status(403).json({error:"Unauthorize"});
  }

  res.status(200).json(result.data);
}
