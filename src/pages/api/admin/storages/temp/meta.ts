import { InitErroResponse, request, response } from "@/utils/request";
import { type Error } from "@/types/Responses";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let result = InitErroResponse;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    const error: Error = {
      body: { msg: "Unauthorized" },
    };
    return res.status(403).json(error);
  }
  if (req.method === "GET") {
    result = await response(
      request(session?.user).get(`/admin/storages/temp/meta`)
    );
  }

  if (req.method === "POST") {
    let { metas } = req.body;

    if (!metas) {
      const error: Error = {
        body: { msg: "No body" },
      };
      return res.status(400).json(error);
    }

    result = await response(
      request(session?.user).post(`/admin/storages/temp/meta`, metas)
    );
  }

  if (req.method === "PUT") {
    let { metas } = req.body;
    if (!metas) {
      const error: Error = {
        body: { msg: "No body" },
      };
      return res.status(400).json(error);
    }
    result = await response(
      request(session?.user).put(`/admin/storages/temp/meta`, metas)
    );
  }

  if (req.method === "DELETE") {
    let { metas } = req.body;
    if (!metas) {
      const error: Error = {
        body: { msg: "No delete ids" },
      };
      return res.status(400).json(error);
    }
    result = await response(
      request(session?.user).delete(`/admin/storages/temp/meta`, {
        data: { metas },
      })
    );
  }

  const { status, ...body } = result;
  const data = body.body;
  return res.status(result.status).json(data);
};

export default handler;
