// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { InitErroResponse, request, response } from "@/utils/request";
import { type Error } from "@/types/Responses";

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
      request(session?.user).get("/admin/users/temporary")
    );
  }

  if (req.method === "POST") {
    const { account } = req.body;
    result = await response(
      request(session?.user).post("/admin/users/temporary", { account })
    );
  }

  if (req.method === "DELETE") {
    const { user } = req.query;
    result = await response(
      request(session?.user).delete(`/admin/users/temporary?user=${user}`)
    );
  }

  const { status, ...body } = result;
  const data = body.body;
  return res.status(status).json(data);
}
