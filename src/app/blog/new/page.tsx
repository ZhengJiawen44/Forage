import React from "react";
import { BlogForm } from "@/app/(components)";
import { requireAuth } from "@/lib/authorization/requireAuth";
const page = async () => {
  //is a user logged in?
  await requireAuth("/auth/login");
  return (
    <>
      <BlogForm />
    </>
  );
};

export default page;
