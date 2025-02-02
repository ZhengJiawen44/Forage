import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

interface RouteParams {
  params: {
    blogID: string;
  };
}
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    //get the user ID
    const userID = req.headers.get("X-user-ID");
    if (!userID) {
      return NextResponse.json({ error: "not authorized" }, { status: 401 });
    }

    //get the route param blogID
    const { blogID } = await params;

    //delete all history entries where userID and blogID
    const deletedEntries = await prisma.history.deleteMany({
      where: { blogID: +blogID, authorID: +userID },
    });

    if (deletedEntries.count === 0) {
      return NextResponse.json(
        { message: "no history could be found for this blog!" },
        { status: 400 }
      );
    }
    if (!deletedEntries) {
      return NextResponse.json(
        { error: "500 internal server error" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "succesfully deleted all history for this blog" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "500 internal server error" },
      { status: 500 }
    );
  }
}
