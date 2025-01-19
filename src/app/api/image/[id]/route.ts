import { NextRequest, NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

interface RouteParams {
  params: {
    id: string;
  };
}
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  const s3 = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
      secretAccessKey: process.env.USER_ACCESS_SECRET!,
      accessKeyId: process.env.USER_ACCESS!,
    },
  });

  const deleteObjectCommand = new DeleteObjectCommand({
    Bucket: process.env.S3_NAME,
    Key: id,
  });

  await s3.send(deleteObjectCommand);

  return NextResponse.json(
    { message: "succesfully deleted image" },
    { status: 200 }
  );
}
