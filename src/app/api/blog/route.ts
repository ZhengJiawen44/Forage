import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import { blogSchema } from "@/schemas/blogSchema";
import { prisma } from "@/lib/prismaClient";

export async function POST(req: NextRequest) {
  try {
    //access the request header for user ID
    const userID = req.headers.get("x-user-ID");
    if (!userID) {
      return NextResponse.json({ error: "not authorized" }, { status: 403 });
    }

    //validate req body
    const body = await req.json();
    const parsedBody = blogSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json({ error: "invalid data" }, { status: 400 });
    }

    //construct blog object
    const blogData = {
      ...parsedBody.data,
      authorID: +userID,
    };

    //insert blog into db
    const blog = await prisma.blog.create({ data: blogData });

    if (!blog) {
      return NextResponse.json(
        { error: "blog could not be created" },
        { status: 500 }
      );
    }
    return NextResponse.json({ message: "blog created!" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error((error as Error).message);
      console.error((error as Error).stack);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({});
    if (!blogs) {
      return NextResponse.json(
        { message: "blogs could not be retrieved" },
        { status: 500 }
      );
    }
    const formattedBlogs = blogs.map((blog) => ({
      ...blog,
      createdAt: dayjs(blog.createdAt).format("DD/MM/YYYY"),
    }));

    return NextResponse.json({ formattedBlogs }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    console.error((error as Error).message);
    console.error((error as Error).stack);
  }
}
