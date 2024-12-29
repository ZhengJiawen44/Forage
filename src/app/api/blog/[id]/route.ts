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
    //get the header userID
    // const userId = req.headers.get("x-user-ID");
    // console.log(userId);

    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { error: "id does not exist within path params" },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.findUnique({ where: { id: Number(id) } });

    if (!blog) {
      return NextResponse.json({ error: "Blog2 not found" }, { status: 404 });
    }

    //also get the author name and profile pic
    const user = await prisma.user.findUnique({ where: { id: blog.authorID } });

    const formattedBlog = {
      ...blog,
      createdAt: dayjs(blog.createdAt).format("DD/MM/YYYY"),
      authorName: user?.name,
    };

    return NextResponse.json({ formattedBlog }, { status: 200 });
  } catch (error) {
    console.log((error as Error).message);

    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "id does not exist within path params" },
        { status: 400 }
      );
    }
    const blog = await prisma.blog.delete({ where: { id: Number(id) } });
    if (!blog) {
      return NextResponse.json({ error: "blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "blog deleted" }, { status: 200 });
  } catch (error) {
    console.log((error as Error).message);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { error: "id does not exist within path params" },
        { status: 400 }
      );
    }
    const body = await req.json();

    const result = blogSchema.safeParse(body);

    if (result.error) {
      return NextResponse.json(
        { message: "bad input recieved" },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.update({
      where: { id: Number(id) },
      data: result.data,
    });
    // const blog = null;
    if (!blog) {
      return NextResponse.json({ error: "blog not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "blog succesfully updated" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
