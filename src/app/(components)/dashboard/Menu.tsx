import React from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/(components)/reusable-ui/dropdown-menu";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { TbHistory } from "react-icons/tb";
import { TbUser } from "react-icons/tb";
import { TbLibrary } from "react-icons/tb";
import { TbChartLine } from "react-icons/tb";

interface menuProps {
  userName: string;
  userEmail: string;
}
const Menu = ({ userEmail, userName }: menuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <HiOutlineUserCircle className="w-8 h-8" strokeWidth={1} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#252525] border-[#575757] min-w-[16rem]">
        <DropdownMenuItem className="flex justify-start items-center gap-2 h-fit focus:bg-[#383838] mb-1">
          <TbHistory className="w-[1.2rem] h-[1.2rem]" strokeWidth="1" />
          <p className="text-[0.9rem]">History</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-start items-center gap-2 h-fit focus:bg-[#383838] mb-1">
          <TbUser className="w-[1.2rem] h-[1.2rem]" strokeWidth="1" />
          <Link href="/profile" className="text-[0.9rem]">
            Profile
          </Link>
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
          <p>{userEmail}</p>
        </DropdownMenuItem>
        <p className="text-[.7rem] text-muted-foreground pl-2 pb-2 "></p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
