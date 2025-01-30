import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

export async function PATCH(req: NextRequest) {
  try {
    const userID = req.headers.get("X-user-ID");

    if (!userID) {
      return NextResponse.json(
        { error: "Unauthorized: User ID not provided" },
        { status: 401 } // 401 is more appropriate for unauthorized requests
      );
    }

    let { about } = await req.json();

    console.log("about: ", about.length);

    if (!about || typeof about !== "string") {
      about = "";
    }

    const user = await prisma.user.update({
      where: { id: +userID },
      data: { about },
      select: { id: true, about: true }, // Only select fields you need
    });

    return NextResponse.json(
      {
        message: "About section updated successfully",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log the error for debugging but return a safe error message
    console.error("Error updating user:", error);

    return NextResponse.json(
      {
        error: "Internal server error occurred",
      },
      { status: 500 }
    );
  }
}
