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

  if (req.method === "GET") {
    const result = await request(session?.user)
      .get("/admin/account/temporary")
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
    return res.status(result.status).json(responseData);
  }
  if (req.method === "POST") {
    const { account } = req.body;
    const result = await request(session?.user)
      .post("/admin/account/temporary", { account })
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
    return res.status(result.status).json(responseData);
  }
}
