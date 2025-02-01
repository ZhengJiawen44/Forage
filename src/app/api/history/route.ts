import { prisma } from "@/lib/prismaClient";
import { NextResponse, NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  // get the search word query params
  const searchParams = req.nextUrl.searchParams;
  const keyword = searchParams.get("search");
  console.log(keyword);

  if (!keyword) {
    return NextResponse.json({ blogs: [] });
  }
  //get the current user
  const userID = req.headers.get("x-user-ID");
  if (!userID) {
    return NextResponse.json({ error: "not authorized" }, { status: 401 });
  }

  const blogs = await prisma.history.findMany({
    where: {
      authorID: +userID,
      blog: { title: { contains: keyword, mode: "insensitive" } },
    },
    include: { blog: true },
  });
  console.log(blogs);

  return NextResponse.json({ blogs });
}
