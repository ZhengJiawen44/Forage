import { NextRequest, NextResponse } from "next/server";
import { blogSchema } from "@/schemas/blogSchema";
import dayjs from "dayjs";
import { prisma } from "@/lib/prismaClient";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "invalid URL" }, { status: 400 });
    }

    const blog = await prisma.blog.findUnique({ where: { id: Number(id) } });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    //also get the author name and or profile pic
    const user = await prisma.user.findUnique({ where: { id: blog.authorID } });

    const formattedBlog = {
      ...blog,
      createdAt: dayjs(blog.createdAt).format("DD/MM/YYYY"),
      authorName: user?.name,
    };

    return NextResponse.json({ formattedBlog }, { status: 200 });
  } catch (error) {
    console.error((error as Error).message);
    console.error((error as Error).stack);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

//PROTECTED ROUTE
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    //access the request header for user ID
    const userID = req.headers.get("X-user-ID");
    if (!userID) {
      return NextResponse.json({ error: "not authorized" }, { status: 401 });
    }

    //get blog id
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "invalid URL" }, { status: 400 });
    }

    //is user creater of the blog?
    const blog = await prisma.blog.findUnique({ where: { id: +id } });
    if (!blog) {
      return NextResponse.json(
        { message: "could not find blog" },
        { status: 404 }
      );
    }
    if (+userID !== blog.authorID) {
      return NextResponse.json({ message: "not authorized" }, { status: 401 });
    }

    const deletedBlog = await prisma.blog.delete({ where: { id: Number(id) } });

    if (!deletedBlog) {
      return NextResponse.json({ error: "blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "blog succesfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error((error as Error).message);
    console.error((error as Error).stack);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

//PROTECTED ROUTE
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    //access the request header for user ID
    const userID = req.headers.get("X-user-ID");
    if (!userID) {
      return NextResponse.json({ error: "not authorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "invalid URL" }, { status: 400 });
    }
    const body = await req.json();

    const parsedBody = blogSchema.safeParse(body);

    if (parsedBody.error) {
      return NextResponse.json(
        { message: "bad input recieved" },
        { status: 400 }
      );
    }

    //is user creater of the blog?
    const blog = await prisma.blog.findUnique({ where: { id: +id } });
    if (!blog) {
      return NextResponse.json(
        { message: "could not find blog" },
        { status: 404 }
      );
    }
    if (+userID !== blog.authorID) {
      return NextResponse.json({ message: "not authorized" }, { status: 401 });
    }

    const updatedBlog = await prisma.blog.update({
      where: { id: Number(id) },
      data: parsedBody.data,
    });

    if (!updatedBlog) {
      return NextResponse.json({ error: "blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "blog succesfully updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error((error as Error).message);
    console.error((error as Error).stack);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
