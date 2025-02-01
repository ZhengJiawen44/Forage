import React from "react";
import { IoPause } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { useToast } from "@/hooks/use-toast";
const blogHistorySidebar = () => {
  const { toast } = useToast();
  const handleSearchBarEnter = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const submit = event.key === "Enter";
    if (submit === true) {
      const { keyword } = Object.fromEntries(
        new FormData(event.currentTarget.form!)
      );

      console.log(`/api/history?search=${keyword}`);

      const res = await fetch(`/api/history?search=${keyword}`, {
        method: "GET",
      });
      if (!res.ok) {
        toast({ title: "error", description: "an unknown error occured" });
      }
      const { blogs } = await res.json();
      console.log(blogs);
    }
  };

  return (
    <div className="flex flex-col gap-8 mb-14">
      <form>
        <div className="relative">
          <input
            name="keyword"
            type="string"
            placeholder="Search history"
            className="pl-7 w-full outline-none bg-transparent border-b border-b-item-foreground
            pb-1 placeholder-item-foreground focus:placeholder-item-foreground/70 focus:border-b-white 
            transition-all duration-200 focus:outline-none active:outline-none "
            onKeyDown={(e) => {
              e.key === "Enter" && handleSearchBarEnter(e);
            }}
          />
          <div className="absolute left-0 top-1/2 -translate-y-[60%]">
            <FiSearch className="w-7 h-7 hover:text-white hover:cursor-pointer p-1" />
          </div>
        </div>
      </form>

      <div className="flex flex-col gap-4">
        <button className="flex items-center align-middle gap-2 w-fit rounded-full p-2 px-4 hover:bg-accent">
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

export default blogHistorySidebar;
