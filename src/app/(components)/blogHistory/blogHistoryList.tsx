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
  userID: number;
  blogID: number;
  readAt: Date;
  title: string;
  thumbnail: string | null;
  description: string | null;
}

interface historyList {
  historyList: historyRecord[];
}

const BlogHistoryList = ({ historyList }: historyList) => {
  const { toast } = useToast();
  const [history, setHistory] = useState(historyList);
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<historyRecord[]>([]);
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

      <BlogHistorySidebar
        setSearchResults={setSearchResults}
        setLoading={setLoading}
        setShowSearch={setShowSearch}
      />

      <div className="p-4 sticky top-0">
        <ImSpinner8
          className={clsx(
            "mr-0 ml-auto animate-spin w-7 h-7 ",
            !loading && "hidden"
          )}
        />
      </div>

      {!showSearch
        ? history.map((record: historyRecord) => (
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
                  <CardTitle href={`/blog/${record.id}`}>
                    {record.title}
                  </CardTitle>
                  <RxCross2
                    className="w-6 h-6 mt-1 text-item-foreground 
              hover:text-white hover:cursor-pointer  rounded-full hover:bg-[#27272a]"
                    onClick={() => HandleDelete(record.blogID)}
                  />
                </CardHeader>
                <CardBody>{record.description}</CardBody>
              </CardPane>
            </CardContainer>
          ))
        : searchResults.map((record: historyRecord) => (
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
                  <CardTitle href={`/blog/${record.id}`}>
                    {record.title}
                  </CardTitle>
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
