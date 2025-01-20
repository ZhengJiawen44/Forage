import React from "react";
import { notFound } from "next/navigation";
import { BlogForm } from "@/app/(components)";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/token/verifyToken";

const page = async ({ params }: { params: { id: number } }) => {
  //get the user
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token?.value) {
    console.log("403 unauthorized");
    redirect("/");
  }
  const { errorMessage, decodedPayload } = await verifyToken(token.value);
  if (errorMessage) {
    console.log("403 unauthorized");
    redirect("/");
  }

  //get the specific blog
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

    var { formattedBlog } = body;

    if (!formattedBlog) {
      console.log(body.error);
      notFound();
    }
  } catch (error) {
    console.log(error);
    notFound();
  }
  //is The blog created by the user?
  if (formattedBlog.authorID === decodedPayload.id) {
    return <BlogForm ID={id} {...formattedBlog} />;
  }
  console.log("403 unauthorized");
  redirect("/");
};

export default page;
