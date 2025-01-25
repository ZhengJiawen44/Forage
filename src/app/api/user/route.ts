import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/token/verifyToken";
import { prisma } from "@/lib/prismaClient";

//PROTECTED ROUTE
export async function GET(req: NextRequest) {
  //gets the user information about the current user

  try {
    const userID = req.headers.get("x-user-ID");
    if (!userID) {
      return NextResponse.json({ error: "not authorized" }, { status: 403 });
    }

    //query database
    const user = await prisma.user.findUnique({
      where: { id: +userID },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    //return user object
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error((error as Error).message);
    console.error((error as Error).stack);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
