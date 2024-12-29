import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import { blogSchema } from "@/schemas/blogSchema";
import { prisma } from "@/lib/prismaClient";
import { verifyToken } from "@/lib/verifyToken";

export async function POST(req: NextRequest) {
  try {
    // //access the request header for user ID passed from middleware
    // const userID = req.headers.get("x-user-ID");
    // console.log(userID);

    const body = await req.json();

    //zod validate
    const parsedBody = blogSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json({ error: "invalid data" }, { status: 400 });
    }

    type DecodedPayload = {
      id: String;
    };

    //get cookie
    const cookie = req.cookies.get("token");
    //verify cookie
    const { errorMessage, decodedPayload } = await verifyToken(
      cookie?.value ?? ""
    );

    if (errorMessage) {
      return NextResponse.json(
        { error: "invalid user token" },
        { status: 403 }
      );
    }

    const blogData = {
      ...parsedBody.data,
      authorID: (decodedPayload as DecodedPayload).id,
    };

    //create blog
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
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    console.error(error);
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
    console.log(error);
  }
}
