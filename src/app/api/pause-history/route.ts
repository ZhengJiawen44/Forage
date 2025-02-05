import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";
import { getTimeLeftSeconds } from "@/lib/cookies/getTimeLeft";
import { cookies } from "next/headers";
import { signToken } from "@/lib/token/signToken";
import { verifyToken } from "@/lib/token/verifyToken";
export async function PATCH(req: NextRequest) {
  try {
    //get the user ID
    const userID = req.headers.get("x-user-ID");
    if (!userID) {
      return NextResponse.json({ error: "not authorized" }, { status: 401 });
    }

    //get the request body containing enable History flag
    const { historyEnabled } = await req.json();
    if (typeof historyEnabled !== "boolean") {
      return NextResponse.json(
        {
          error: "bad request - pauseHistory is required and must be a boolean",
        },
        { status: 400 }
      );
    }

    //update the user with the new enable History flag. throws an error when update fails
    await prisma.user.update({
      where: { id: +userID },
      data: { historyEnabled: historyEnabled },
    });

    //update the cookie with the new enable History flag, and set the expiry as time left
    //cookie time left
    const timeLeft = await getTimeLeftSeconds();

    //get previous token information
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    if (!token) {
      return NextResponse.json(
        { error: "no auth token found" },
        { status: 401 }
      );
    }
    const { decodedPayload, errorMessage } = await verifyToken(token?.value!);

    if (errorMessage || !decodedPayload) {
      throw new Error("expired or invalid token");
    }
    const { id, name, cookieExpiryDate } = decodedPayload;

    //clear previous Auth token from cookie
    cookieStore.delete("token");

    //create new jwt with id, name, and updated historyEnabled, expiryTime as payload
    const newToken = await signToken(
      { id, name, historyEnabled, cookieExpiryDate },
      cookieExpiryDate
    );

    //place new jwt into cookie
    cookieStore.set("token", newToken, {
      httpOnly: true,
      maxAge: timeLeft,
      secure: process.env.NODE_ENV == "production",
      path: "/",
    });

    return NextResponse.json(
      {
        message: `succesfully ${historyEnabled ? "resumed" : "paused"} history`,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) console.log(error.stack);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.name : "internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
