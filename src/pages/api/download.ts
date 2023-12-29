import { NextApiRequest, NextApiResponse } from "next";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
type Url ={
  url:string
}
const handler = async (req: NextApiRequest, res: NextApiResponse<Url>) => {
  const key = "2b561120-3fcb-40fc-bc66-36b6e38c53eb.jpeg";
  let clientUrl=""
  try {
    clientUrl = await createPresignedUrlWithClient({
      region: process.env.BUCKET_REGION as string,
      bucket: process.env.BUCKET_NAME as string,
      key: key,
    });
  } catch(err) {
    console.log(err)
  }
  res.status(200).json({
    url:clientUrl
  })
};
export default handler;
