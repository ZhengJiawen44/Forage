"use client";
import { useState } from "react";
import MenuBar from "../reusable-ui/MenuBar";
import { BlogCard } from "..";
import About from "./About";
import Image from "next/image";

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

      {activeTab === "Stories" && blogs.length > 0 ? (
        <div>
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              createdAt={blog.createdAt}
              length={blog.length}
              description={blog.description}
              content={blog.content}
              thumbnail={blog.thumbnail}
              authorID={blog.authorID}
            />
          ))}
        </div>
      ) : activeTab === "Stories" && blogs.length <= 0 ? (
        <div className="flex flex-col justify-center items-center gap-2">
          <Image
            src="/SnowmanFallingApart.svg"
            alt="Snowman falling apart"
            width={0}
            height={0}
            style={{ filter: "invert(0.5)", width: "50%", height: "auto" }}
          />
          <p className="lg:text-xl">it looks a bit empty here right now...</p>
        </div>
      ) : (
        <About />
      )}
    </>
  );
};

export default Index;
