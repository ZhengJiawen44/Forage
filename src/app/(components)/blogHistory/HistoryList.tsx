"use client";
import React, { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { IllustratedMessage } from "@/app/(components)/index";
import HistoryCard from "./HistoryCard";
import HistoryMenu from "./HistoryMenu";
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

interface historyListProps {
  historyList: historyRecord[];
}

const HistoryList = ({ historyList }: historyListProps) => {
  const { toast } = useToast();
  const [history, setHistory] = useState(historyList);
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<historyRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const HandleDelete = async (blogID: number) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/history/${blogID}`, { method: "DELETE" });

      if (res.status === 400) {
        toast({
          title: "bad request",
          description: "could not delete history for this blog!",
        });
        return;
      }
      if (!res.ok) {
        toast({ title: "error", description: "an unexpected error happened" });
        return;
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
  const HandleDeleteAll = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/history`, { method: "DELETE" });
      if (res.status === 404) {
        toast({
          title: "no blogs deleted",
          description: "there are no history left for user",
        });
        return;
      }
      if (!res.ok) {
        toast({ title: "error", description: "an unexpected error happened" });
        return;
      }
      setHistory([]);
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
      <HistoryMenu
        handleDeleteAll={HandleDeleteAll}
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

      <IllustratedMessage
        src="/SnowmanPokeTree.svg"
        className={clsx("mt-0", historyList.length >= 1 && "hidden")}
      >
        you did not read anything
      </IllustratedMessage>

      {!showSearch
        ? history.map((record: historyRecord) => (
            <HistoryCard
              key={record.id}
              record={record}
              HandleDelete={HandleDelete}
            />
          ))
        : searchResults.map((record: historyRecord) => (
            <HistoryCard
              key={record.id}
              record={record}
              HandleDelete={HandleDelete}
            />
          ))}
    </>
  );
};

export default HistoryList;
