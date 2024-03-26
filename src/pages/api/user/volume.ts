// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { request, response } from "@/utils/request";
import { VolumeSize } from "@/types/Volume";
import { type Error } from "@/types/Responses";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    const error: Error = {
      body: { msg: "Unauthorized" },
    };
    return res.status(403).json(error);
  }
  const result = await response<VolumeSize>(
    request(session?.user).get("/user/volume")
  );
  const { status, ...body } = result;
  const data = body.body;
  res.status(result.status).json(data);
}
