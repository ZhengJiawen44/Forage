import React from "react";
import { format } from "@/lib/getFormattedDay";
import OptionsBar from "../reusable-ui/OptionsBar";
import Link from "next/link";

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
    <div
      className="flex w-full mb-5 lg:mb-10 border bg-item p-6 
      gap-4 lg:gap-20 rounded-[5px] "
    >
      <div className="w-[70%] md:w-[80%]">
        <Link href={`/blog/${blog.id}`}>
          <h1 className="font-sans text-xl lg:text-2xl mb-2 md:mb-4 font-extrabold hover:underline">
            {blog.title}
          </h1>
        </Link>

        <p
          className="font-lora font-thin text-item-foreground mb-8 md:mb-10
          overflow-hidden text-ellipsis line-clamp-2"
        >
          {blog.subtitle ?? blog.content}
        </p>

        <div className=" flex font-lora font-thin text-item-foreground justify-between text-[0.8rem] md:text-[1rem]">
          <div className="flex gap-4 items-center">
            <p className="font-lora">{blog.length} min read</p>
            <p className="font-lora">{format(blog.createdAt)}</p>
          </div>
          <OptionsBar />
        </div>
      </div>

      <div className="w-[30%] md:w-[20%]">
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
