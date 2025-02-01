import React from "react";
import { prisma } from "@/lib/prismaClient";
import OptionsBar from "@/app/(components)/reusable-ui/OptionsBar";
import { format } from "@/lib/getFormattedDay";
import { IllustratedMessage } from "@/app/(components)/index";
import {
  CardContainer,
  CardBody,
  CardFooter,
  CardHeader,
  CardPane,
  CardTitle,
} from "@/app/(components)/index";

const page = async () => {
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

  try {
    const blog: Blog[] = await prisma.blog.findMany({});
    if (!blog || blog.length < 1) {
      return (
        <IllustratedMessage src="/SnowmanPokeTree.svg">
          Hurray! write the first blog for this awesome site!
        </IllustratedMessage>
      );
    }
    return (
      <>
        {blog.map(({ ...blog }) => (
          <CardContainer key={blog.id}>
            <CardPane className="flex-[3]">
              <CardHeader>
                <CardTitle href={`/blog/${blog.id}`}>{blog.title}</CardTitle>
              </CardHeader>
              <CardBody>{blog.description}</CardBody>
              <CardFooter className="flex justify-between">
                <div className="flex gap-4 items-center">
                  <p className="font-montserrat text-[0.8rem]">{`${blog.length} min read`}</p>
                  <p className="font-montserrat text-[0.8rem]">
                    {format(blog.createdAt)}
                  </p>
                </div>
                <OptionsBar blogID={blog.id} authorID={blog.authorID} />
              </CardFooter>
            </CardPane>
            <CardPane className="flex-[1]">
              {blog.thumbnail && (
                <img
                  src={blog.thumbnail}
                  className="w-full rounded-[6px] aspect-video object-cover"
                />
              )}
            </CardPane>
          </CardContainer>
        ))}
      </>
    );
  } catch (error) {
    console.error(error);
    return <p>Failed to load blogs</p>;
  }
};

export default page;
