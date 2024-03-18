// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { request } from "@/utils/request";
import { AxiosError } from "axios";
import {
  ErrorResponse,
  FavoriteResponse,
  SuccessResponse,
} from "@/types/Responses";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).json({ error: "Unauthorized" });
  }


  const result = await request(session?.user)
    .get(`/admin/check`)
    .then((res) => {
      return { status: res.status, data: res.data };
    })
    .catch((err: AxiosError) => {
      return { status: err.status ?? 400, msg: err.message };
    });

  const responseData =
    result.status / 100 < 4
      ? ((result as SuccessResponse).data as FavoriteResponse)
      : (result as ErrorResponse);

  res.status(result.status).json(responseData);
}
