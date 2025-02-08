import React from "react";
import { GraphContainer } from "../(components)";
import { requireAuth } from "@/lib/authorization/requireAuth";
const page = async () => {
  const decodedPayload = await requireAuth("/");

  return <GraphContainer />;
};

export default page;
