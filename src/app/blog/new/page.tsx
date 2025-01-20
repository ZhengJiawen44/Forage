import React from "react";
import { BlogForm } from "@/app/(components)";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const page = async () => {
  //is a user logged in?
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    redirect("/auth/login");
  }
  return (
    <>
      <BlogForm />
    </>
  );
};

export default page;
