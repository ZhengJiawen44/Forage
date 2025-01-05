import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function POST(req: NextRequest) {
  //return a aws signed url to upload that specific image
  const s3 = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
      secretAccessKey: process.env.USER_ACCESS_SECRET!,
      accessKeyId: process.env.USER_ACCESS!,
    },
  });
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.S3_NAME,
    Key: "image1",
  });
  const signedURL = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 3600,
  });
  return NextResponse.json({ url: signedURL }, { status: 200 });
}
