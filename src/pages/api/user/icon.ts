// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import { randomUUID } from "crypto";

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
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Expires: 60,
  };
  const uploadUrl = s3.getSignedUrl(`putObject`, params);

  res.status(200).json({
    uploadUrl,
    key: key,
  });
}
