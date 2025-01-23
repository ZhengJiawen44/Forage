import React from "react";
import SearchBar from "@/app/(components)/dashboard/SearchBar";
import { RiPenNibLine } from "react-icons/ri";
import Menu from "./Menu";
import Link from "next/link";
import { cookies } from "next/headers";
import { TbUserCircle } from "react-icons/tb";
import MenuContainer from "./MenuContainer";
const Index = async () => {
  //is user logged in?
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  return (
    <div
      className="shadow-lg shadow-black/30 w-full border-b-[1px]
  py-2 sm:py-3 flex items-center gap-3 justify-between px-3 lg:px-[3rem] bg-item"
    >
      <div className="flex max-w-[70%] sm:min-w-[50%] items-center gap-3 ">
        <h1 className="sm:text-[1.7rem] mr-1">
          <Link href={"/"} className="font-amita">
            Forage
          </Link>
        </h1>
        <SearchBar />
      </div>
      <div className="flex items-center gap-7 w-fit ">
        <Link
          aria-label="create a new blog"
          className="flex gap-2 items-center mt-1 text-item-foreground hover:text-white"
          href={token ? "/blog/new" : "/auth/login"}
        >
          <RiPenNibLine className="h-5 w-5" />
          <p className="text-[0.9rem]">write</p>
        </Link>
        {token ? (
          <Menu />
        ) : (
          <Link href="/auth/login">
            <TbUserCircle
              className="h-8 w-8 hover:text-item-foreground"
              strokeWidth={1}
            />
          </Link>
        )}
      </div>
      <MenuContainer token={token?.value} />
    </div>
  );
};

export default Index;
