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
    const userHistory: History[] = await prisma.history.findMany({
      where: { authorID: +decodedPayload.id },
    });

    //extract unique blog id from user's history
    //e,g [{id:1, blogID:12, authorID:24, readAt:01-12-2002},{id:1, blogID:12, authorID:24, readAt:02-12-2002}] => [12]
    const userHistoryBlogIDList = [
      ...new Set(
        userHistory.map((element) => {
          return element.blogID;
        })
      ),
    ];

    //get the blogs using the extracted id
    const blogs: Blog[] = await prisma.blog.findMany({
      where: { id: { in: userHistoryBlogIDList } },
    });

    //create a mapping for the blog id
    const blogMap = new Map(
      blogs.map((blog) => {
        return [blog.id, blog];
      })
    );
    //reconstruct the history log with the blog
    const historyList = userHistory.map((history) => {
      const blog = blogMap.get(history.blogID)!;

      return {
        blogID: blog.id!,
        readAt: history.readAt,
        ...blog,
        id: history.id,
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
        <BlogHistoryList historyList={historyList} />
      </>
    );
  } catch (error) {
    console.error(error);
  } finally {
    !authorize && redirect("/auth/login");
  }
};

export default page;
