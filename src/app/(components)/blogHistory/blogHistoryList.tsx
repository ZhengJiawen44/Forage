"use client";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { ImSpinner8 } from "react-icons/im";
import { BlogHistorySidebar } from "@/app/(components)/index";

import {
  CardContainer,
  CardBody,
  CardHeader,
  CardPane,
  CardTitle,
} from "@/app/(components)/index";
import { useToast } from "@/hooks/use-toast";
import clsx from "clsx";

interface historyRecord {
  id: number;
  readAt: Date;
  blogID: number;
  title: string;
  length: number;
  thumbnail: string | null;
  description: string | null;
  content: string;
  authorID: number;
  createdAt: Date;
}

interface historyList {
  historyList: historyRecord[];
}

const BlogHistoryList = ({ historyList }: historyList) => {
  const { toast } = useToast();
  const [history, setHistory] = useState(historyList);
  const [loading, setLoading] = useState(false);

  const HandleDelete = async (blogID: number) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/history/${blogID}`, { method: "DELETE" });
      if (!res.ok) {
        toast({ title: "error", description: "an unexpected error happened" });
      }
      setHistory((records) => {
        return records.filter((record) => {
          return record.blogID !== blogID;
        });
      });

      const { message } = await res.json();
      toast({ title: "history removed", description: message });
    } catch (error) {
      console.log(error);
      toast({ title: "error", description: "an unexpected error happened" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="text-[2rem] mb-8">History</h1>

      <BlogHistorySidebar />

      <div className="p-4 sticky top-0">
        <ImSpinner8
          className={clsx(
            "mr-0 ml-auto animate-spin w-7 h-7 ",
            !loading && "hidden"
          )}
        />
      </div>

      {history.map((record: historyRecord) => (
        <CardContainer key={record.id} className="pb-0">
          <CardPane className="flex-[1]">
            {record.thumbnail && (
              <img
                src={record.thumbnail}
                className="w-full rounded-[6px] aspect-video object-cover"
              />
            )}
          </CardPane>
          <CardPane className="flex-[3]">
            <CardHeader className="justify-between">
              <CardTitle href={`/blog/${record.id}`}>{record.title}</CardTitle>
              <RxCross2
                className="w-6 h-6 mt-1 text-item-foreground 
              hover:text-white hover:cursor-pointer  rounded-full hover:bg-[#27272a]"
                onClick={() => HandleDelete(record.blogID)}
              />
            </CardHeader>
            <CardBody>{record.description}</CardBody>
          </CardPane>
        </CardContainer>
      ))}
    </>
  );
};

export default BlogHistoryList;
