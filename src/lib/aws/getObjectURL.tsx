import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
export async function getObjectID(key: string) {
  const s3 = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
      secretAccessKey: process.env.USER_ACCESS_SECRET!,
      accessKeyId: process.env.USER_ACCESS!,
    },
  });

  const getObjectCommand = new GetObjectCommand({
    Bucket: process.env.S3_NAME,
    Key: key,
  });

  const signedURL = await getSignedUrl(s3, getObjectCommand, {
    expiresIn: 3600,
  });
}
