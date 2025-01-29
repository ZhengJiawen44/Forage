import React from "react";
import { prisma } from "@/lib/prismaClient";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/token/verifyToken";
import { ProfileContent } from "../(components)";
const page = async () => {
  const cookieStore = await cookies();
  const user = cookieStore.get("token");
  if (!user) {
    redirect("/auth/login");
  }
  const { decodedPayload, errorMessage } = await verifyToken(user?.value!);
  if (errorMessage) {
    console.error(errorMessage);
  }

  const blogs = await prisma.blog.findMany({
    where: { authorID: +decodedPayload.id },
  });
  return (
    <>
      <h1 className="text-[2rem] mb-8">{decodedPayload?.name}</h1>
      <ProfileContent blogs={blogs} />
    </>
  );
};

export default page;
