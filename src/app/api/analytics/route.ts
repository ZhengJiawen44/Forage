import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";
import { Decimal } from "@prisma/client/runtime/library";
interface View {
  hasViewed: boolean;
}
interface Read {
  hasRead: boolean;
  duration: number;
}

export async function POST(req: NextRequest) {
  const TIME_TO_READ = 120 * 1000; //dummy data for time required to read this blog
  const { blogID, view, read }: { blogID: number; view: View; read: Read } =
    await req.json();

  if (!blogID) {
    return NextResponse.json({ status: 400 });
  }
  const today = new Date();
  try {
    if (view?.hasViewed === true) {
      //update the running counts on the blog table
      await prisma.blog.update({
        where: { id: blogID },
        data: { views: { increment: 1 } },
      });

      //upsert today's view count in the blogAnalytics table
      await prisma.blogAnalytics.upsert({
        where: {
          blogID_date: {
            // Uses the @@unique constraint
            blogID: blogID,
            date: today,
          },
        },
        create: {
          blogID: blogID,
          date: today,
          views: 1,
        },
        update: {
          views: { increment: 1 },
        },
      });
      // console.log("logged has views!");
      return NextResponse.json({ status: 200 });
    }
    if (read?.hasRead === true) {
      console.log(read?.hasRead);
      let durationInHours = read?.duration / 3600; //convert to hours
      durationInHours = +durationInHours.toFixed(2); //round to 2 decimal places

      //update the running read counts and read time on the blog table
      await prisma.blog.update({
        where: { id: blogID },
        data: {
          reads: { increment: 1 },
          hoursRead: { increment: durationInHours },
        },
      });
      //upsert today's read count and read times for the blog in blogs analytics table
      await prisma.blogAnalytics.upsert({
        where: {
          blogID_date: {
            // Uses the @@unique constraint
            blogID: blogID,
            date: today,
          },
        },
        create: {
          blogID: blogID,
          date: today,
          reads: 1,
        },
        update: {
          reads: { increment: read.duration },
        },
      });

      // console.log("logged has read!");
      return NextResponse.json({ status: 200 });
    }

    console.log("neither read nor view data was submitted");
    return NextResponse.json({ status: 400 });
  } catch (error) {
    console.log(error instanceof Error ? error.stack : error);
    return NextResponse.json({ status: 500 });
  }
}
