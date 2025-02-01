import React from "react";
import { prisma } from "@/lib/prismaClient";
import { IllustratedMessage } from "@/app/(components)/index";
import { BlogHistoryList } from "@/app/(components)/index";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/token/verifyToken";

const page = async () => {
  type Blog = {
    id?: number;
    title: string;
    length: number;
    thumbnail: string | null;
    description: string | null;
    content: string;
    authorID: number;
    createdAt: Date;
  };

  type History = {
    id: number;
    blogID: number;
    authorID: number;
    readAt: Date;
  };

  let authorize = false;
  try {
    //get the current user
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      throw Error("user is not logged in");
    }
    const { decodedPayload, errorMessage } = await verifyToken(token.value);

    if (errorMessage) {
      console.log(errorMessage);
      throw Error("invalid user token");
    }
    authorize = true;

    //get the user's history
    const userHistory = await prisma.history.findMany({
      where: { authorID: +decodedPayload.id },
      include: { blog: true },
    });

    const historyList = userHistory.map((obj) => {
      const blog = obj.blog;
      return {
        id: obj.id,
        userID: obj.authorID,
        blogID: obj.blogID,
        readAt: obj.readAt,
        title: blog.title,
        thumbnail: blog.thumbnail,
        description: blog.description,
      };
    });

    //empty placeholder for empty history
    if (!userHistory || userHistory.length < 1) {
      return (
        <IllustratedMessage src="/SnowmanPokeTree.svg">
          you did not read anything
        </IllustratedMessage>
      );
    }
    //return history
    return (
      <>
        <BlogHistoryList historyList={historyList} />{" "}
      </>
    );
  } catch (error) {
    console.error(error);
  } finally {
    !authorize && redirect("/auth/login");
  }
};

export default page;
