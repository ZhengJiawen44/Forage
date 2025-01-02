import React from "react";
import { prisma } from "@/lib/prismaClient";

const page = async () => {
  const blog = await prisma.blog.findMany({});
  console.log("blog: ", blog);
  return <p className="text-purple-500 text-4xl">page</p>;
};

export default page;
