"use client";
import React, { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { IllustratedMessage } from "@/app/(components)/index";
import HistoryCard from "./HistoryCard";
import HistoryMenu from "./HistoryMenu";
import { useToast } from "@/hooks/use-toast";
import clsx from "clsx";

interface HistoryRecord {
  id: number;
  userID: number;
  blogID: number;
  readAt: Date;
  title: string;
  thumbnail: string | null;
  description: string | null;
}

interface HistoryListProps {
  historyList: HistoryRecord[];
}

const HistoryList = ({ historyList }: HistoryListProps) => {
  const { toast } = useToast();
  const [history, setHistory] = useState(historyList);
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<HistoryRecord[]>();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (blogID: number) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/history/${blogID}`, { method: "DELETE" });

      if (res.status === 400) {
        toast({
          title: "Bad request",
          description: "Could not delete history for this blog!",
        });
        return;
      }
      if (!res.ok) {
        toast({ title: "Error", description: "An unexpected error happened" });
        return;
      }

      setHistory((records) =>
        records.filter((record) => record.blogID !== blogID)
      );
      setSearchResults((records) =>
        records?.filter((record) => record.blogID !== blogID)
      );

      const { message } = await res.json();
      toast({ title: "History removed", description: message });
    } catch (error) {
      console.log(error);
      toast({ title: "Error", description: "An unexpected error happened" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/history`, { method: "DELETE" });

      if (res.status === 404) {
        toast({
          title: "No blogs deleted",
          description: "There are no history left for user",
        });
        return;
      }
      if (!res.ok) {
        toast({ title: "Error", description: "An unexpected error happened" });
        return;
      }

      setHistory([]);
      const { message } = await res.json();
      toast({ title: "History removed", description: message });
    } catch (error) {
      console.log(error);
      toast({ title: "Error", description: "An unexpected error happened" });
    } finally {
      setLoading(false);
    }
  };

  const renderHistoryCards = () => {
    let recordsToShow;
    if (showSearch) {
      console.log(searchResults);
    }
    if (showSearch && searchResults) {
      recordsToShow = searchResults;
    } else if (showSearch && !searchResults) {
      return (
        <div className="w-fit m-auto p-4">no results match your search</div>
      );
    } else {
      recordsToShow = history;
    }
    return (
      <>
        <IllustratedMessage
          src="/SnowmanPokeTree.svg"
          className={clsx("mt-0", historyList.length >= 1 && "hidden")}
        >
          You did not read anything
        </IllustratedMessage>

        {recordsToShow.map((record) => (
          <HistoryCard
            key={record.id}
            record={record}
            HandleDelete={handleDelete}
          />
        ))}
      </>
    );
  };

  return (
    <>
      <h1 className="text-2xl mb-8">History</h1>
      <HistoryMenu
        handleDeleteAll={handleDeleteAll}
        setSearchResults={setSearchResults}
        setLoading={setLoading}
        setShowSearch={setShowSearch}
      />

      <div className="p-4 sticky top-0">
        <ImSpinner8
          className={clsx(
            "mr-0 ml-auto animate-spin w-7 h-7",
            !loading && "hidden"
          )}
        />
      </div>
      {renderHistoryCards()}
    </>
  );
};

export default HistoryList;
