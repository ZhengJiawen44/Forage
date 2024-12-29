import { NextResponse, NextRequest } from "next/server";
import { loginSchema } from "@/schemas/loginSchema";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prismaClient";
import { signToken } from "@/lib/token/signToken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = loginSchema.safeParse(body);
  if (validation.success !== true) {
    return NextResponse.json({ error: "invalid data!" }, { status: 400 });
  }

  //compare password from database and frontend
  try {
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }
    const { id, password, emailVerified } = user;

    const passwordValid = await bcrypt.compare(body.password, password);
    if (!passwordValid || !emailVerified) {
      return NextResponse.json(
        { error: "invalid credentials" },
        { status: 403 }
      );
    }

    //clear previous Auth token from cookie
    const cookieStore = await cookies();
    cookieStore.set("token", "", { maxAge: 0, path: "/" });

    //create new jwt with id as payload
    const token = await signToken({ id: id }, "1h");

    //place new jwt into cookie
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60,
      secure: process.env.NODE_ENV == "production",
      path: "/",
    });

    return NextResponse.json({ success: "logged in" });
  } catch (error) {
    console.error((error as Error).message);
    console.error((error as Error).stack);
    return NextResponse.json(
      { success: "Internal server error" },
      { status: 500 }
    );
  }
}
