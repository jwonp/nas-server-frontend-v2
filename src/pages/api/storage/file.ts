// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import { getSignedUrlParams } from "@/utils/handleS3";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const s3 = new S3({
  apiVersion: "latest",
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.BUCKET_REGION,
  signatureVersion: "v4",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  const { fileType, directory, ownerId } = req.query;
  let responseData = { uploadUrl: "", key: "" };
  try {
    const { key, params } = getSignedUrlParams(
      fileType as string,
      directory as string,
      ownerId as string
    );
    const uploadUrl = s3.getSignedUrl(`putObject`, params);
    responseData.key = key;
    responseData.uploadUrl = uploadUrl;
  } catch {
    return res.status(500).json({ status: 500, msg: "Fail to upload file" });
  }

  res.status(200).json(responseData);
}
