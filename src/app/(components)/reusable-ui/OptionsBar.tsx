"use client";
import React from "react";
import { LuBookmarkPlus } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/(components)/reusable-ui/dropdown-menu";

const OptionsBar = () => {
  return (
    <div className="flex items-center gap-4 ">
      <button
        onClick={(event) => {
          event.preventDefault();
          console.log("bookmarked");
        }}
        title="bookmark"
        className="p-1 rounded-[7px]  hover:bg-gray-800 transition-colors duration-300"
      >
        <LuBookmarkPlus className="w-5 h-5 md:w-6 md:h-6 hover:text-white" />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger className="p-1 rounded-[7px] hover:bg-gray-800 transition-colors duration-300">
          <SlOptions
            title="options"
            className="w-5 h-5 md:w-6 md:h-6 hover:text-white"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[140px] font-mono font-thin">
          <DropdownMenuItem className="cursor-pointer">Follow</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer whitespace-nowrap">
            Mute author
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Hide</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer text-red-500">
            Report...
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default OptionsBar;
