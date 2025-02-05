import React from "react";
import { prisma } from "@/lib/prismaClient";
import { HistoryList } from "@/app/(components)/index";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/token/verifyToken";
import { unstable_cache } from "next/cache";

const getUserHistory = unstable_cache(
  async (userID: number) => {
    console.log("db queried for history");
    //query user's history
    const userHistory = await prisma.history.findMany({
      where: { authorID: userID },
      include: { blog: true },
    });
    //map the history list
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
    //sort the history list
    historyList.sort((a, b) => {
      if (a.readAt.getTime() > b.readAt.getTime()) {
        return -1;
      } else if (a.readAt.getTime() < b.readAt.getTime()) {
        return 1;
      }
      return 0;
    });
    return historyList;
  },
  ["historyKey"],
  { tags: ["history"], revalidate: 3600 }
);

const page = async () => {
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

    //get the cached user's history
    const historyList = await getUserHistory(+decodedPayload.id);
    return (
      <>
        <HistoryList historyList={historyList} />
      </>
    );
  } catch (error) {
    console.error(error);
  } finally {
    !authorize && redirect("/auth/login");
  }
};

export default page;
