import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { request } from "@/utils/request";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403).json({});
  }
  const { path } = req.query;
  console.log("---");
  console.log(path);
  let folder = "";
  let directory = "";
  let isExistDirectory = false;
  if (path === "/") {
    return res.status(200).json({ isExistDirectory: true });
  }
  const splitedPath = (path as string).split("/");

  folder = splitedPath.pop() as string;
  directory = splitedPath.join("/");

  const result = await request(session?.user).get(
    `/storage/directory/check?directory=${directory}&folder=${folder}`
  );
  
  return res.status(200).json({ isExistDirectory: result.data.isExistDirectory });
};

export default handler;
