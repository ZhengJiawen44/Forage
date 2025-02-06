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
  const renderContent = () => {
    let recordsToShow;
    let duplicateDate = new Date(0);
    duplicateDate.setHours(0, 0, 0, 0);

    if (showSearch && searchResults) {
      recordsToShow = renderSearchResults();
    } else {
      recordsToShow = renderHistory();
    }
    return (
      <>
        {history.length < 1 || (showSearch && recordsToShow.length < 1) ? (
          <IllustratedMessage src="/SnowmanPokeTree.svg" className="mt-0">
            {history.length < 1
              ? "there are no history available"
              : "no result that matches your search"}
          </IllustratedMessage>
        ) : (
          ""
        )}

        {recordsToShow.map((record) => {
          const currDate = record.readAt;

          const { displayDate, newDuplicateDate } = getDisplayDate(
            new Date(currDate),
            duplicateDate
          );
          duplicateDate = newDuplicateDate;
          return (
            <React.Fragment key={record.id}>
              <div className={displayDate ? "py-4 pb-7 text-2xl" : ""}>
                {displayDate}
              </div>
              <HistoryCard record={record} HandleDelete={handleDelete} />
            </React.Fragment>
          );
        })}
      </>
    );
  };

  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">History</h1>
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
      {renderContent()}
    </>
  );

  function renderSearchResults() {
    if (!searchResults) return [];
    return searchResults;
  }
  function renderHistory() {
    return history;
  }
  function getDisplayDate(currDate: Date, duplicateDate: Date) {
    console.log(currDate);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthNames = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let newDuplicateDate = duplicateDate;
    let displayDate;
    currDate.setHours(0, 0, 0, 0);

    if (currDate.getTime() !== newDuplicateDate.getTime()) {
      //if date is unique
      const weekDates = getWeekDates();
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const isThisWeek = weekDates.some((date) => {
        return date.getTime() === currDate.getTime();
      });
      if (isThisWeek) {
        if (currDate.getDate() === today.getDate()) {
          displayDate = "Today";
        } else if (currDate.getDate() === yesterday.getDate()) {
          displayDate = "Yesterday";
        } else {
          displayDate = days[currDate.getDay()];
        }
      } else {
        displayDate = `${
          monthNames[currDate.getMonth()]
        } ${currDate.getDate()}, ${currDate.getFullYear()}`;
      }

      newDuplicateDate = currDate;
    } else {
      displayDate = "";
    }
    return { displayDate, newDuplicateDate };
  }

  function getWeekDates() {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Adjust to get Monday (if Sunday, go back 6 days, if Monday go back 0, etc)
    const monday = new Date(today);
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));

    // Create array of 7 days starting from Monday
    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      //truly timeless date comparison
      date.setHours(0, 0, 0, 0);
      return date;
    });

    return weekDates;
  }
};

export default HistoryList;
