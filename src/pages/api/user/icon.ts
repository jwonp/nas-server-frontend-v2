// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import { randomUUID } from "crypto";
import { type Error } from "@/types/Responses";

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
  const fileType = req.query.fileType;
  const key = `icons/${randomUUID()}.${fileType}`;
  let responseData = {
    uploadUrl: "",
    key: "",
  };
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Expires: 60,
  };
  try {
    const uploadUrl = s3.getSignedUrl(`putObject`, params);
    responseData.key = key;
    responseData.uploadUrl = uploadUrl;
  } catch (e) {
    const error: Error = {
      body: { msg: "Fail to upload icon" },
    };
    return res.status(500).json(error);
  }

  res.status(200).json(responseData);
}
