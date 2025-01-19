import React from "react";
import { notFound } from "next/navigation";
import { BlogForm } from "@/app/(components)";
const page = async ({ params }: { params: { id: number } }) => {
  const { id } = await params;
  try {
    const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
      method: "GET",
    });

    const body = await res.json();

    if (!res.ok) {
      console.log(body.error);
      notFound();
    }

    const { formattedBlog } = body;

    if (!formattedBlog) {
      console.log(body.error);
      notFound();
    }
    return <BlogForm ID={id} {...formattedBlog} />;
  } catch (error) {
    console.log(error);
    notFound();
  }
};

export default page;
