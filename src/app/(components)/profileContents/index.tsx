"use client";
import { useState } from "react";
import MenuBar from "../reusable-ui/MenuBar";
import About from "./About";
import Image from "next/image";
import { IllustratedMessage } from "@/app/(components)/index";
import { format } from "@/lib/getFormattedDay";
import OptionsBar from "../reusable-ui/OptionsBar";
import {
  CardContainer,
  CardBody,
  CardFooter,
  CardHeader,
  CardPane,
  CardTitle,
} from "@/app/(components)/index";

interface Blog {
  length: number;
  id: number;
  title: string;
  content: string;
  description: string | null;
  thumbnail: string | null;
  createdAt: Date;
  authorID: number;
}
interface BlogContentProps {
  blogs: Blog[];
}

const Index = ({ blogs }: BlogContentProps) => {
  const [activeTab, setActiveTab] = useState<string>("Stories");
  return (
    <>
      <MenuBar
        items={["Stories", "About"]}
        defaultItem="Stories"
        onTabChange={(tab: string) => {
          setActiveTab(tab);
        }}
      />
      <IllustratedMessage src="/SnowmanFallingApart.svg">
        it looks a bit empty here right now...
      </IllustratedMessage>
      {activeTab === "Stories" && blogs.length > 0 ? (
        <div>
          {blogs.map((blog) => (
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
        </div>
      ) : activeTab === "Stories" && blogs.length <= 0 ? (
        <IllustratedMessage src="/SnowmanFallingApart.svg">
          it looks a bit empty here right now...
        </IllustratedMessage>
      ) : (
        <About />
      )}
    </>
  );
};

export default Index;
