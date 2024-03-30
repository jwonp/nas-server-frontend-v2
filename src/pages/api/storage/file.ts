import type { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import { getSignedUrlParams } from "@/utils/handleS3";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Error } from "@/types/Responses";

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
    const error: Error = {
      body: { msg: "Unauthorized" },
    };
    return res.status(403).json(error);
  }
  const { fileType, ownerId, preKey } = req.query as {
    fileType: string;
    ownerId: string;
    preKey?: string;
  };
  let responseData = { uploadUrl: "", key: "" };
  try {
    const { key, params } = getSignedUrlParams(
      fileType as string,
      ownerId as string,
      preKey
    );
    const uploadUrl = s3.getSignedUrl(`putObject`, params);
    responseData.key = key;
    responseData.uploadUrl = uploadUrl;
  } catch (e) {
    const error: Error = {
      body: { msg: "Fail to upload file" },
    };
    return res.status(500).json(error);
  }

  res.status(200).json(responseData);
}
