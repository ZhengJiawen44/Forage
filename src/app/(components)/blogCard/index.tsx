import React from "react";
import { format } from "@/lib/getFormattedDay";

type Blog = {
  id: number;
  title: string;
  length: number;
  subtitle: string | null;
  content: string;
  authorID: number;
  createdAt: Date;
};

const BlogCardPreview = (blog: Blog) => {
  return (
    <div className="mb-16">
      <div className="flex w-full">
        <div className="w-[80%] border">
          <h1 className="font-sans text-2xl">{blog.title}</h1>
          <p className="font-lora">{blog.subtitle}</p>
          <p className="font-lora">{blog.length} min read</p>
          <p className="font-lora">{format(blog.createdAt)}</p>
        </div>
        <div className="w-[20%] border">
          <Image />
        </div>
      </div>
    </div>
  );
};

const Image = () => {
  return (
    <div className="w-full aspect-[1.5] rounded-[12px] bg-green-800"></div>
  );
};

export default BlogCardPreview;
