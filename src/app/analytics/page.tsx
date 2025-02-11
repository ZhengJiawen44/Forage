import React from "react";
import { GraphContainer } from "../(components)";
import { requireAuth } from "@/lib/authorization/requireAuth";
import { prisma } from "@/lib/prismaClient";
import { AnalyticRecord } from "@/types";

const page = async () => {
  const { id } = await requireAuth();

  //method 1: fetch blogs for user and get their analytics-slow,multiple queries
  //method 2: change db schema to include user id-duplicate data, undesirable schema
  //method 3: get all blog analytics of the user using joins between blog analytics table and user table where user id = authorID

  // method 3 implementation
  const rawAnalytics = await prisma.blogAnalytics.findMany({
    select: {
      id: true,
      blogID: true,
      date: true,
      views: true,
      reads: true,
      totalHoursRead: true,
    },
    where: {
      blog: {
        authorID: id,
      },
    },
  });

  //convert prisma decimal to javascript number
  const analytics: AnalyticRecord[] = rawAnalytics.map((record) => {
    return { ...record, totalHoursRead: record.totalHoursRead.toNumber() };
  });
  return <GraphContainer analytics={analytics} />;
};

export default page;
