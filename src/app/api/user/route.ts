import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/token/verifyToken";
import { prisma } from "@/lib/prismaClient";

//gets the user information about the current user
export async function GET(req: NextRequest) {
  try {
    //get token
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    //verify token
    const { errorMessage, decodedPayload } = await verifyToken(String(token));

    if (errorMessage || !decodedPayload.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    //query database
    const user = await prisma.user.findUnique({
      where: { id: decodedPayload.id },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    //return user object
    return NextResponse.json(user);
  } catch (error) {
    console.error((error as Error).message);
    console.error((error as Error).stack);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
