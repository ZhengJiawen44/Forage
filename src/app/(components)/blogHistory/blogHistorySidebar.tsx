import React from "react";
import { IoPause } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
const blogHistorySidebar = () => {
  return (
    <div className="flex flex-col gap-8 mb-14">
      <div className="relative ">
        <input
          type="string"
          placeholder="Search history"
          className="pl-7 w-full outline-none bg-transparent border-b border-b-item-foreground
       pb-1 placeholder-item-foreground focus:placeholder-item-foreground/70 focus:border-b-white 
       transition-all duration-200 focus:outline-none active:outline-none "
        />
        <div className="absolute left-0 top-1/2 -translate-y-[60%]">
          <FiSearch className="w-7 h-7 hover:text-white hover:cursor-pointer p-1" />
        </div>
      </div>
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
