"use client";
import { useState } from "react";
import MenuBar from "./MenuBar";
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

      <div>
        {blogs.map((blog) => (
          <p key={blog.id}>{blog.title}</p>
        ))}
      </div>

      <p>About</p>
    </>
  );
};

export default Index;
