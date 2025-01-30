"use client";
import React from "react";
import { LuBookmarkPlus } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";
import Link from "next/link";
import { useUser } from "@/app/providers/UserProvider";
import { BlogDeleteDialog } from "..";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/(components)/reusable-ui/dropdown-menu";
interface OptionsBarProps {
  authorID: number;
  blogID: number;
}
const OptionsBar = ({ blogID, authorID }: OptionsBarProps) => {
  const { user } = useUser();

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
        <DropdownMenuContent className="min-w-[170px] bg-black">
          {+user?.id! === authorID && (
            <DropdownMenuItem className="cursor-pointer text-[1rem]" asChild>
              <Link href={`/blog/update/${blogID}`}>Edit</Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            className="cursor-pointer text-[1rem]"
            disabled={+user?.id! === authorID}
          >
            Follow
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-[1rem] "
            disabled={+user?.id! === authorID}
          >
            Mute author
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-[1rem]">
            Hide
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-[1rem] text-red-500"
            disabled={+user?.id! === authorID}
          >
            Report...
          </DropdownMenuItem>
          {+user?.id! === authorID && <BlogDeleteDialog id={blogID} />}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default OptionsBar;
