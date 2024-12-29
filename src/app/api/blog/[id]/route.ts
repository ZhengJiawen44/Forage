import { NextRequest, NextResponse } from "next/server";
import { blogSchema } from "@/schemas/blogSchema";
import dayjs from "dayjs";
import { prisma } from "@/lib/prismaClient";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET({ params }: RouteParams) {
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

export async function DELETE({ params }: RouteParams) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "invalid URL" }, { status: 400 });
    }

    const blog = await prisma.blog.delete({ where: { id: Number(id) } });

    if (!blog) {
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

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
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

    const blog = await prisma.blog.update({
      where: { id: Number(id) },
      data: parsedBody.data,
    });

    if (!blog) {
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
