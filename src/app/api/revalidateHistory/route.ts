import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    revalidateTag("history");
    return NextResponse.json({
      success: true,
      message: "History cache revalidated",
    });
  } catch (error) {
    console.error("Failed to revalidate history cache:", error);
    return NextResponse.json(
      { success: false, error: "Failed to revalidate cache" },
      { status: 500 }
    );
  }
}
