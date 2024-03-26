import { NextApiRequest, NextApiResponse } from "next";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { type Error } from "@/types/Responses";
type BucketDetail = {
  region: string;
  bucket: string;
  key: string;
};
const createPresignedUrlWithClient = async ({
  region,
  bucket,
  key,
}: BucketDetail) => {
  const client = new S3Client({ region: region });
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    const error: Error = {
      body: { msg: "Unauthorized" },
    };
    return res.status(403).json(error);
  }
  const { key } = req.query;
  let clientUrl = "";
  const region = process.env.BUCKET_REGION as string;
  const bucket = process.env.BUCKET_NAME as string;

  try {
    clientUrl = await createPresignedUrlWithClient({
      region: region,
      bucket: bucket,
      key: key as string,
    });
  } catch (err) {
    const error: Error = {
      body: { msg: "Fail to download file" },
    };
    return res.status(500).json(error);
  }
  res.status(200).json({
    url: clientUrl,
  });
};
export default handler;
