import { prisma } from "@/lib/prismaClient";
import { NextResponse, NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  try {
    // get the search word query params
    const searchParams = req.nextUrl.searchParams;
    const keyword = searchParams.get("search");
    if (!keyword) {
      return NextResponse.json({ blogs: [] });
    }
    //get the current user
    const userID = req.headers.get("x-user-ID");
    if (!userID) {
      return NextResponse.json({ error: "not authorized" }, { status: 401 });
    }

    const history = await prisma.history.findMany({
      where: {
        authorID: +userID,
        blog: { title: { contains: keyword, mode: "insensitive" } },
      },
      include: { blog: true },
    });

    const formattedHistory = history.map((record) => {
      const blog = record.blog;
      return {
        id: record.id,
        userID: record.authorID,
        blogID: record.blogID,
        readAt: record.readAt,
        title: blog.title,
        thumbnail: blog.thumbnail,
        description: blog.description,
      };
    });
    return NextResponse.json({ formattedHistory });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  //get the current user
  try {
    const userID = req.headers.get("x-user-ID");
    if (!userID) {
      return NextResponse.json({ error: "not authorized" }, { status: 401 });
    }

    const deletedEntries = await prisma.history.deleteMany({
      where: {
        authorID: +userID,
      },
    });

    if (deletedEntries.count === 0) {
      return NextResponse.json(
        { error: "no history found in user" },
        { status: 404 }
      );
    }
    if (!deletedEntries) {
      return NextResponse.json(
        { error: "internal server error" },
        { status: 500 }
      );
    }
    return NextResponse.json({ message: "All history cleared" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
