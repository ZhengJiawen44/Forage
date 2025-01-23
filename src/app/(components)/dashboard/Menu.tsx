import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/(components)/reusable-ui/dropdown-menu";
import { TbUserCircle } from "react-icons/tb";
import { TbHistory } from "react-icons/tb";
import { TbUser } from "react-icons/tb";
import { TbLibrary } from "react-icons/tb";
import { TbChartLine } from "react-icons/tb";

const Menu = () => {
  // const user = await fetch("/api/user");
  // const body = await user.json();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <TbUserCircle className="w-8 h-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#252525] border-[#575757] min-w-[16rem]">
        <DropdownMenuItem className="flex justify-start items-center gap-2 h-fit focus:bg-[#383838] mb-1">
          <TbHistory className="w-[1.2rem] h-[1.2rem]" strokeWidth="1" />
          <p className="text-[0.9rem]">History</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-start items-center gap-2 h-fit focus:bg-[#383838] mb-1">
          <TbUser className="w-[1.2rem] h-[1.2rem]" strokeWidth="1" />
          <p className="text-[0.9rem]">Profile</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-start items-center gap-2 h-fit focus:bg-[#383838] mb-1">
          <TbLibrary className="w-[1.2rem] h-[1.2rem]" strokeWidth="0.8" />
          <p className="text-[0.9rem]">Story</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-start items-center gap-2 h-fit focus:bg-[#383838]">
          <TbChartLine className="w-[1.2rem] h-[1.2rem]" strokeWidth="1" />
          <p className="text-[0.9rem]">Analytics</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="border border-[#464646] my-4" />
        <DropdownMenuItem className="focus:bg-[#383838] mb-4">
          <p className="text-[0.9rem]">Settings</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-[#383838]">
          <p className="text-[0.9rem]">Sign Out</p>
        </DropdownMenuItem>
        <p className="text-[.7rem] text-muted-foreground pl-2 pb-2 "></p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
