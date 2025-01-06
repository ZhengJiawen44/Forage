import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

export async function getSignedURL(
  imageType: string,
  imageSize: number,
  checksum: string
) {
  //return a aws signed url to upload that specific image
  try {
    const s3 = new S3Client({
      region: process.env.S3_REGION,
      credentials: {
        secretAccessKey: process.env.USER_ACCESS_SECRET!,
        accessKeyId: process.env.USER_ACCESS!,
      },
    });

    const key = crypto.randomUUID();
    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.S3_NAME,
      Key: key,
      ContentType: imageType,
      ContentLength: imageSize,
      ChecksumSHA256: checksum,
    });

    const signedURL = await getSignedUrl(s3, putObjectCommand, {
      expiresIn: 3600,
    });

    return { signedURL, key };
  } catch (error) {
    throw error;
  }
}
