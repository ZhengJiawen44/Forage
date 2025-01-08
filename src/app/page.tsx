import React from "react";
import { prisma } from "@/lib/prismaClient";
import { BlogCard } from "./(components)";

const page = async () => {
  type Blog = {
    id: number;
    title: string;
    length: number;
    description: string | null;
    content: string;
    authorID: number;
    createdAt: Date;
  };

  const blog: Blog[] = await prisma.blog.findMany({});

  return (
    <>
      {blog.map(({ ...blog }) => (
        <BlogCard key={blog.id} {...blog} />
      ))}
    </>
  );
};

export default page;
