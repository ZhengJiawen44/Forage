"use client";
import React, { useEffect, useState } from "react";
import { IoPause, IoPlay, IoTrashOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { useToast } from "@/hooks/use-toast";
import { RxCross2 } from "react-icons/rx";
import clsx from "clsx";
import { useUser } from "@/app/providers/UserProvider";
import MenuLoading from "./MenuLoading";
//this is the data recieved from the server, but cleaned and organized for consumption
interface HistoryRecord {
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
  setSearchResults: React.Dispatch<
    React.SetStateAction<HistoryRecord[] | undefined>
  >;
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
  const { user, isLoaded, refreshUser } = useUser();

  const handleSearch = async (keyword: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/history?search=${keyword}`, {
        method: "GET",
      });
      if (!res.ok) {
        toast({
          title: `${res.status} error`,
          description: "an unknown error occured",
        });
        return;
      }
      const { formattedHistory } = await res.json();
      if (!formattedHistory) {
        setShowSearch(true);
        setSearchResults(undefined);
      } else {
        setShowSearch(true);
        setSearchResults(formattedHistory);
      }
    } catch (error) {
      if (error instanceof Error)
        toast({ title: "error", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const toggleHistory = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/pause-history`, {
        method: "PATCH",
        body: JSON.stringify({ pauseHistory: !user?.historyEnabled }),
      });
      const body = await res.json();
      if (!res.ok) {
        toast({
          title: `${res.status} error`,
          description: "an unknown error occured",
        });
        return;
      }
      toast({ title: "success", description: body.message });
      refreshUser();
    } catch (error) {
      toast({
        title: "error",
        description:
          error instanceof Error ? error.message : "an unknown error occured",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchInput?.length <= 0) {
      setShowSearch(false);
    }
  }, [searchInput]);

  if (!isLoaded || !user?.id) {
    return <MenuLoading />;
  }

  return (
    <>
      <div className="flex flex-col gap-8 mb-14">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(searchInput);
          }}
        >
          <div className="relative">
            <input
              name="keyword"
              type="search"
              placeholder="Search history"
              value={searchInput}
              className="pl-7 w-full outline-none bg-transparent border-b border-b-item-foreground
            pb-1 placeholder-item-foreground focus:placeholder-item-foreground/70 focus:border-b-white 
            transition-all duration-200 focus:outline-none active:outline-none search-cancel:appearance-none"
              onChange={(e) => {
                setSearchInput(e.currentTarget.value);
              }}
            />
            <button
              className="absolute left-0 top-1/2 -translate-y-[60%]"
              type="submit"
            >
              <FiSearch className="w-7 h-7 hover:text-white hover:cursor-pointer p-1" />
            </button>
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
                }}
              />
            </div>
          </div>
        </form>

        <div className="flex flex-col gap-4">
          <ActionButton
            onClick={handleDeleteAll}
            icon={<IoTrashOutline className="w-5 h-5" />}
          >
            Clear all history
          </ActionButton>

          <ActionButton
            onClick={toggleHistory}
            icon={
              user.historyEnabled ? (
                <IoPause className="w-5 h-5" />
              ) : (
                <IoPlay className="w-5 h-5" />
              )
            }
          >
            {user.historyEnabled ? "Pause all history" : "Resume all history"}
          </ActionButton>
        </div>
      </div>
    </>
  );
};

const ActionButton = ({
  onClick,
  icon,
  children,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center align-middle gap-2 w-fit rounded-full p-2 px-4 hover:bg-accent"
    >
      <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
      {children}
    </button>
  );
};
export default HistoryMenu;
