import { request } from "@/utils/request";

import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import { AxiosError } from "axios";
import {
  ErrorResponse,
  MetaUploadResponse,
  SuccessResponse,
} from "@/types/Responses";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  if (req.method === "GET") {
    const result = await request(session?.user)
      .get(`/admin/storages/temp/meta`)
      .then((res) => {
        return { status: res.status, data: res.data };
      })
      .catch((err: AxiosError) => {
        return { status: err.status ?? 400, msg: err.message };
      });
    const responseData =
      result.status / 100 < 4
        ? ((result as SuccessResponse).data as MetaUploadResponse)
        : (result as ErrorResponse);
    return res.status(result.status).json(responseData);
  }
  if (req.method === "POST") {
    let { metas } = req.body;
    if (!metas) {
      return res.status(400).json({ status: 400, msg: "No body" });
    }
    const result = await request(session?.user)
      .post(`/admin/storages/temp/meta`, metas)
      .then((res) => {
        return { status: res.status, data: res.data };
      })
      .catch((err: AxiosError) => {
        return { status: err.status ?? 400, msg: err.message };
      });
    const responseData =
      result.status / 100 < 4
        ? ((result as SuccessResponse).data as MetaUploadResponse)
        : (result as ErrorResponse);
    res.status(result.status).json(responseData);
  }
  if (req.method === "PUT") {
    let { metas } = req.body;
    if (!metas) {
      return res.status(400).json({ status: 400, msg: "No body" });
    }
    const result = await request(session?.user)
      .put(`/admin/storages/temp/meta`, metas)
      .then((res) => {
        return { status: res.status, data: res.data };
      })
      .catch((err: AxiosError) => {
        return { status: err.status ?? 400, msg: err.message };
      });
    const responseData =
      result.status / 100 < 4
        ? ((result as SuccessResponse).data as MetaUploadResponse)
        : (result as ErrorResponse);
    res.status(result.status).json(responseData);
  }
  if (req.method === "DELETE") {
    let { metas } = req.body;
    if (!metas) {
      return res.status(400).json({ status: 400, msg: "No delete ids" });
    }
    const result = await request(session?.user)
      .delete(`/admin/storages/temp/meta`, { data: { metas } })
      .then((res) => {
        return { status: res.status, data: res.data };
      })
      .catch((err: AxiosError) => {
        return { status: err.status ?? 400, msg: err.message };
      });
    const responseData =
      result.status / 100 < 4
        ? ((result as SuccessResponse).data as MetaUploadResponse)
        : (result as ErrorResponse);
    res.status(result.status).json(responseData);
  }
};

export default handler;
