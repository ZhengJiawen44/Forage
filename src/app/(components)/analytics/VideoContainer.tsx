import React from "react";
import { prisma } from "@/lib/prismaClient";
const VideoContainer = async () => {
  const blogs = await prisma.blog.findMany({ where: {} });
  return <div>VideoContainer</div>;
};

export default VideoContainer;
