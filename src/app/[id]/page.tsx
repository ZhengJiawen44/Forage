import { Value } from "@prisma/client/runtime/library";
import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;

  console.log(id);

  return <div>{id}</div>;
};

export default page;
