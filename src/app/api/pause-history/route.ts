import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";
import { getTimeLeftSeconds } from "@/lib/cookies/getTimeLeft";
import { cookies } from "next/headers";
import { signToken } from "@/lib/token/signToken";
import { verifyToken } from "@/lib/token/verifyToken";
export async function PATCH(req: NextRequest) {
  //get the user ID
  const userID = req.headers.get("x-user-ID");
  if (!userID) {
    return NextResponse.json({ error: "not authorized" }, { status: 401 });
  }

  //get the request body containing enable History flag
  const { pauseHistory } = await req.json();

  console.log(pauseHistory);

  if (typeof pauseHistory !== "boolean") {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  //update the user with the new enable History flag
  const user = await prisma.user.update({
    where: { id: +userID },
    data: { historyEnabled: pauseHistory },
  });

  //update the cookie with the new enable History flag, and set the expiry as time left
  const timeLeft = await getTimeLeftSeconds();

  //get previous token information
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const { decodedPayload, errorMessage } = await verifyToken(token?.value!);
  const { id, name, cookieExpiryDate } = decodedPayload;

  //clear previous Auth token from cookie
  cookieStore.set("token", "", { maxAge: 0, path: "/" });

  //create new jwt with id, name, and updated historyEnabled, expiryTime as payload
  const newToken = await signToken(
    { id, name, pauseHistory, cookieExpiryDate },
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
      message: `succesfully ${pauseHistory ? "paused" : "resumed"} history`,
    },
    { status: 200 }
  );
}
