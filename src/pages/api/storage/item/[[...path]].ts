import { request } from "@/utils/request";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  const { path } = req.query;
  if (req.method === "GET") {
    if (!session || !session.user) {
      return res.status(403).json({});
    }

    const result = await request(session?.user).get(
      `/storage/item?path=${path ? `/${(path as string[]).join("/")}` : ""}`
    );

    return res.status(200).json(result.data);
  }
  if (req.method === "DELETE") {
    const { fileId } = req.body;
    const result = await request(session?.user).delete(`/storage/item`, {
      data: { fileId: fileId, userId:session?.user.id },
    });
    return res.status(200).json(result.data);
  }
};

export default handler;
