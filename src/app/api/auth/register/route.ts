import { registrationSchema } from "@/schemas/registrationSchema";
import { NextResponse, NextRequest } from "next/server";
import { hash } from "@/lib/hash";
import { signToken } from "@/lib/token/signToken";
import { prisma } from "@/lib/prismaClient";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = registrationSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: "invalid data!" }, { status: 400 });
  }

  const emailTaken =
    (await prisma.user.findUnique({
      where: { email: body.email },
    })) !== null;
  if (emailTaken) {
    return NextResponse.json(
      { error: "this email is already taken" },
      { status: 403 } //forbidden
    );
  }

  try {
    body.password = await hash(body.password);
    const { name, email, password } = body;
    const user = await prisma.user.create({
      data: { name, email, password },
    });
    if (!user) {
      return NextResponse.json(
        {
          error: "user could not be created at this time",
        },
        { status: 500 }
      );
    }

    //get newly created user's ID
    const dbUser = await prisma.user.findUnique({ where: { email: email } });

    //create a token with the ID
    const idToken = await signToken({ id: dbUser?.id }, "1h");

    //send email with the token embedded in the URL
    const error = await sendVerificationEmail(body.email, idToken);
    console.log("err: ", error);

    if (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }

    return NextResponse.json({ success: "email sent" });
  } catch (error) {
    console.error((error as Error).message);
    console.error((error as Error).stack);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
