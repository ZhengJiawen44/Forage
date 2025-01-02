import React from "react";
import { prisma } from "@/lib/prismaClient";
import { format } from "@/lib/getFormattedDay";
import OptionsBar from "../../(components)/blogCard/OptionsBar";
import Link from "next/link";
interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const blog = await prisma.blog.findUnique({ where: { id: Number(id) } });

  return (
    <>
      <div
        className="md:w-[80%] m-auto  h-fit pb-10 mb-10 rounded-[5px] 
      bg-item p-10 font-lora"
      >
        <div className="flex items-center justify-between mb-5 gap-48 ">
          <h1 className=" text-foreground tracking-tighter text-xl md:text-[2.5rem] font-semibold">
            {blog?.title}
          </h1>
        </div>
        <p className="mb-10 block text-gray-300 font-sans text-[1.2rem]">
          {blog?.subtitle}
        </p>

        {/*userprofile and name */}
        <div className="mb-10 flex gap-6 items-start">
          <img
            src="https://avatars.githubusercontent.com/u/125772813?v=4&size=64"
            className="rounded-[100rem] w-11 h-11"
          />
          <div className=" w-full">
            <div className="flex mb-1">
              <p className="mr-4 sm:mr-14 text-[1.1rem]">
                {/* {blog?.authorID} */}
                Zheng Jiawen
              </p>
            </div>
            <div className="flex  justify-between  w-full items-center">
              <div className="flex items-center">
                <p className="mr-4 text-gray-300 font-extralight">
                  {blog?.length} min read
                </p>
                <div className="flex items-center">
                  <p className="mr-4">.</p>
                </div>

                <p className="text-gray-300 font-light">
                  {format(blog?.createdAt)}
                </p>
              </div>

              <OptionsBar />
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-[1.3rem] pt-10">{blog?.content}</p>
      </div>
      <Link href={`/${id}/update`}>edit</Link>
      <Link href={`/new`}>create</Link>
    </>
  );
};

export default page;
