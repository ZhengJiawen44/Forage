import React from "react";
import { prisma } from "@/lib/prismaClient";
import OptionsBar from "../../(components)/reusable-ui/OptionsBar";
import Link from "next/link";
import { BlogDeleteDialog } from "@/app/(components)";
import { LastRead } from "@/app/(components)";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/token/verifyToken";
import { format } from "@/lib/getFormattedDay";

interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  let blog;

  try {
    // Find the specific blog
    blog = await prisma.blog.findUnique({ where: { id: Number(id) } });
    if (!blog) {
      notFound();
    }

    // Record user read history
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (token) {
      const { decodedPayload, errorMessage } = await verifyToken(token.value);
      if (errorMessage) {
        console.log(errorMessage);
        redirect("/auth/login");
      }

      //did user enable history?
      if (decodedPayload.enableHistory === true) {
        await prisma.history.create({
          data: {
            blogID: blog.id,
            authorID: decodedPayload.id,
            readAt: new Date(),
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to be handled by Next.js error boundary
  }
  if (!blog) {
    notFound();
  }

  return (
    <>
      <LastRead
        id={blog.id.toString()}
        title={blog.title}
        thumbnail={blog.thumbnail}
        description={blog.description}
      />
      <div
        className="md:w-[80%] m-auto h-fit pb-10 mb-10 rounded-[5px] 
       p-10 font-lora"
      >
        <div className="flex items-center justify-between mb-5 gap-48 ">
          <h1 className="text-foreground tracking-tighter text-xl md:text-[2.5rem] font-semibold">
            {blog.title}
          </h1>
        </div>
        <p className="mb-10 block text-gray-300 font-sans text-[1.2rem]">
          {blog.description}
        </p>

        {/*userprofile and name */}
        <div className="mb-10 flex gap-6 items-start">
          <img
            src="https://avatars.githubusercontent.com/u/125772813?v=4&size=64"
            className="rounded-[100rem] w-11 h-11"
            alt="Author avatar"
          />
          <div className="w-full">
            <div className="flex mb-1">
              <p className="mr-4 sm:mr-14 text-[1.1rem]">
                {/* {blog.authorID} */}
                Zheng Jiawen
              </p>
            </div>
            <div className="flex justify-between w-full items-center">
              <div className="flex items-center">
                <p className="mr-4 text-gray-300 font-extralight">
                  {blog.length} min read
                </p>
                <div className="flex items-center">
                  <p className="mr-4">.</p>
                </div>
                <p className="text-gray-300 font-light">
                  {format(blog.createdAt)}
                </p>
              </div>
              <OptionsBar blogID={blog.id} authorID={blog.authorID} />
            </div>
          </div>
        </div>
        <p
          className="text-gray-300 text-[1.3rem] pt-10 w-full"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
      <Link href={`/blog/update/${id}`}>edit</Link>
      <Link href={`/blog/new`}>create</Link>
      <BlogDeleteDialog id={+id} />
    </>
  );
};

export default page;
