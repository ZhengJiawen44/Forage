"use client";
import { useState } from "react";
import MenuBar from "../reusable-ui/MenuBar";
import { BlogCard } from "..";
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
  console.log(activeTab);

  return (
    <>
      <MenuBar
        items={["Stories", "About"]}
        defaultItem="About"
        onTabChange={(tab: string) => {
          setActiveTab(tab);
        }}
      />
      {activeTab === "Stories" ? (
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
      ) : (
        <p>about</p>
      )}
    </>
  );
};

export default Index;
