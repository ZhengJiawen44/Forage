import React from "react";
import { format } from "@/lib/getFormattedDay";
import OptionsBar from "../reusable-ui/OptionsBar";
import Link from "next/link";

import SanitizedContent from "./extractedContent";
type Blog = {
  id: number;
  title: string;
  length: number;
  thumbnail: string | null;
  description: string | null;
  content: string;
  authorID: number;
  createdAt: Date;
};

const BlogCardPreview = (blog: Blog) => {
  //extract first image (if any)

  //extract content without image

  return (
    <div
      className="flex w-full mb-5 lg:mb-10 border bg-item p-6 
      gap-4 lg:gap-20 rounded-[5px] "
    >
      <div className="w-[70%] md:w-[80%] xl:w-[77%]">
        <Link href={`/blog/${blog.id}`}>
          <h1 className="font-sans text-xl lg:text-2xl mb-2 md:mb-4 font-extrabold hover:underline">
            {blog.title}
          </h1>
        </Link>

        <div
          className="font-lora font-thin text-item-foreground mb-8 md:mb-10
          overflow-hidden text-ellipsis line-clamp-2"
        >
          {blog.description?.length === 0 ? (
            <SanitizedContent content={blog.content} />
          ) : (
            blog.description
          )}
        </div>

        <div className=" flex font-lora font-thin text-item-foreground justify-between text-[0.8rem] md:text-[1rem]">
          <div className="flex gap-4 items-center">
            <p className="font-lora">{blog.length} min read</p>
            <p className="font-lora">{format(blog.createdAt)}</p>
          </div>
          <OptionsBar />
        </div>
      </div>

      <div className="w-[30%] md:w-[20%] xl:w-[23%]">
        {blog.thumbnail && <Image src={blog.thumbnail} />}
      </div>
    </div>
  );
};

const Image = ({ src }) => {
  console.log(src);

  return (
    <img src={src} className="w-full rounded-[6px] aspect-video object-cover" />
  );
};

export default BlogCardPreview;
