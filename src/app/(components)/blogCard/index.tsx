import React from "react";
import { format } from "@/lib/getFormattedDay";
import OptionsBar from "../reusable-ui/OptionsBar";
import Link from "next/link";

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
  return (
    <div
      className="flex w-full mb-5 lg:mb-10 border bg-item p-6 
      gap-4 lg:gap-20 rounded-[5px] "
    >
      <div className="w-[70%] md:w-[80%] xl:w-[77%]">
        <Link href={`/blog/${blog.id}`}>
          <h1 className="font-sans text-lg lg:text-2xl mb-2 md:mb-4 font-normal hover:underline">
            {blog.title}
          </h1>
        </Link>

        <p
          className="text-[0.9rem]  text-item-foreground mb-8 md:mb-10
          overflow-hidden text-ellipsis line-clamp-2"
        >
          {blog.description}
        </p>

        <div className=" flex font-montserrat  text-item-foreground justify-between text-[0.8rem] md:text-[1rem]">
          <div className="flex gap-4 items-center">
            <p className="font-montserrat text-[0.8rem]">
              {blog.length} min read
            </p>
            <p className="font-montserrat text-[0.8rem]">
              {format(blog.createdAt)}
            </p>
          </div>
          <OptionsBar blogID={blog.id} authorID={blog.authorID} />
        </div>
      </div>

      <div className="w-[30%] md:w-[20%] xl:w-[23%]">
        {blog.thumbnail && (
          <img
            src={blog.thumbnail}
            className="w-full rounded-[6px] aspect-video object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default BlogCardPreview;
