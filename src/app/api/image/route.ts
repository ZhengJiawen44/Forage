import { NextRequest, NextResponse } from "next/server";
import { getSignedURL } from "@/lib/aws/putObjectURL";

export async function POST(req: NextRequest) {
  const FORMAT = ["image/png", "image/jpg", "image/jpeg"];
  const SIZE = 5000000;
  try {
    const { imageSize, imageType, checksum } = await req.json();

    console.log(imageSize);

    //check if image is of valid size and type
    if (imageSize > SIZE || !FORMAT.includes(imageType)) {
      console.log("toolarge");

      return NextResponse.json(
        {
          error: "image is too large or in wrong format",
        },
        { status: 422 }
      );
    }

    //return a aws signed url to PUT that image
    const { signedURL, key } = await getSignedURL(
      imageType,
      imageSize,
      checksum
    );

    return NextResponse.json({ url: signedURL, uuID: key }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) console.log(error.stack);

    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
