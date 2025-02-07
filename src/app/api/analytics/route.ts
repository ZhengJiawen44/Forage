import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

interface View {
  hasViewed: boolean;
}
interface Read {
  hasRead: boolean;
  duration: number;
}

export async function POST(req: NextRequest) {
  const { blogID, view, read }: { blogID: number; view: View; read: Read } =
    await req.json();

  if (!blogID) {
    return NextResponse.json({ status: 400 });
  }
  try {
    if (view?.hasViewed === true) {
      await prisma.blog.update({
        where: { id: blogID },
        data: { views: { increment: 1 } },
      });
      return NextResponse.json({ status: 200 });
    } else if (read?.hasRead === true) {
      //debugging purposes
      console.log(read?.duration);
      await prisma.blog.update({
        where: { id: blogID },
        data: { reads: { increment: 1 } },
      });
      return NextResponse.json({ status: 200 });
    }

    console.log("neither read nor view data was submitted");
    return NextResponse.json({ status: 400 });
  } catch (error) {
    console.log(error instanceof Error ? error.stack : error);
    return NextResponse.json({ status: 500 });
  }
}
