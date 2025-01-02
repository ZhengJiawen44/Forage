import React from "react";
import { format } from "@/lib/getFormattedDay";
import OptionsBar from "./OptionsBar";
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
    <div className="flex w-full mb-10 border bg-item p-6 gap-20 rounded-[5px]">
      <div className="w-[80%]">
        <h1 className="font-sans text-2xl mb-4">{blog.title}</h1>
        <p className="font-lora font-thin text-item-foreground mb-10">
          {blog.subtitle}
        </p>

        <div className="flex font-lora font-thin text-item-foreground justify-between">
          <div className="flex gap-4">
            <p className="font-lora">{blog.length} min read</p>
            <p className="font-lora">{format(blog.createdAt)}</p>
          </div>
          <OptionsBar />
        </div>
      </div>

      <div className="w-[20%]">
        <Image />
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
