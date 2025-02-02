"use client";
import React, { useEffect, useState } from "react";
import { IoPause } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { useToast } from "@/hooks/use-toast";
import { RxCross2 } from "react-icons/rx";
import clsx from "clsx";

//this is the data recieved from the server, but cleaned and organized for consumption
interface historyRecord {
  id: number;
  userID: number;
  blogID: number;
  readAt: Date;
  title: string;
  thumbnail: string | null;
  description: string | null;
}
interface HistoryMenuProps {
  handleDeleteAll: () => Promise<void>;
  setSearchResults: React.Dispatch<React.SetStateAction<historyRecord[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const HistoryMenu = ({
  handleDeleteAll,
  setSearchResults,
  setLoading,
  setShowSearch,
}: HistoryMenuProps) => {
  const { toast } = useToast();
  const [searchInput, setSearchInput] = useState("");
  //function for when user hits enter on the search bar
  const handleSearchBarEnter = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    try {
      setLoading(true);
      //obtain the form data that the element is embedded in
      const { keyword } = Object.fromEntries(
        new FormData(event.currentTarget.form!)
      );
      const res = await fetch(`/api/history?search=${keyword}`, {
        method: "GET",
      });
      if (!res.ok) {
        toast({ title: "error", description: "an unknown error occured" });
        return;
      }
      const formattedHistory: historyRecord[] = await res.json();

      setShowSearch(true);
      setSearchResults(formattedHistory);
    } catch (error) {
      if (error instanceof Error)
        toast({ title: "error", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchInput.length < 1 || !searchInput) {
      setShowSearch(false);
    }
  }, [searchInput]);

  return (
    <div className="flex flex-col gap-8 mb-14">
      <form>
        <div className="relative">
          <input
            name="keyword"
            type="string"
            placeholder="Search history"
            value={searchInput}
            className="pl-7 w-full outline-none bg-transparent border-b border-b-item-foreground
            pb-1 placeholder-item-foreground focus:placeholder-item-foreground/70 focus:border-b-white 
            transition-all duration-200 focus:outline-none active:outline-none "
            onKeyDown={(e) => {
              e.key === "Enter" && handleSearchBarEnter(e);
            }}
            onChange={(e) => {
              setSearchInput(e.currentTarget.value);
            }}
          />
          <div className="absolute left-0 top-1/2 -translate-y-[60%]">
            <FiSearch className="w-7 h-7 hover:text-white hover:cursor-pointer p-1" />
          </div>
          <div
            className={clsx(
              "absolute right-0 top-1/2 -translate-y-[60%]",
              !searchInput && "hidden"
            )}
          >
            <RxCross2
              className="w-7 h-7 hover:text-white hover:cursor-pointer p-1"
              onClick={() => {
                setSearchInput("");
                setShowSearch(false);
              }}
            />
          </div>
        </div>
      </form>

      <div className="flex flex-col gap-4">
        <button
          onClick={handleDeleteAll}
          className="flex items-center align-middle gap-2 w-fit rounded-full p-2 px-4 hover:bg-accent"
        >
          <IoTrashOutline className="w-5 h-5" />
          Clear all history
        </button>
        <button className="flex items-center align-middle gap-2 w-fit rounded-full p-2 px-4 hover:bg-accent">
          <IoPause className="w-5 h-5" />
          Pause all history
        </button>
      </div>
    </div>
  );
};

export default HistoryMenu;
