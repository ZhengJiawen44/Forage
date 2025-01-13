import React from "react";
import { Editor } from "@/app/(components)";
import { notFound } from "next/navigation";
import { BlogForm } from "@/app/(components)";
const page = async ({ params }: { params: { id: number } }) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "GET",
  });

  const body = await res.json();

  if (!res.ok) {
    console.log(body.error);
    notFound();
  }
  const { formattedBlog } = body;

  return <BlogForm {...formattedBlog} />;
};

export default page;
