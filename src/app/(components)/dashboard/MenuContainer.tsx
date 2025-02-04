"use client";
import Menu from "./Menu";
import { RiPenNibLine } from "react-icons/ri";
import { useUser } from "@/app/providers/UserProvider";
import Link from "next/link";
export const dynamic = "force-dynamic";
const MenuContainer = () => {
  const { user } = useUser();

  return (
    <>
      <Link
        aria-label="create a new blog"
        className="flex gap-2 items-center"
        href={user?.id ? "/blog/new" : "/auth/login"}
      >
        <RiPenNibLine className="h-5 w-5" />
        <p className="">write</p>
      </Link>
      {user?.id ? (
        <Menu userName={user?.name!} userEmail={user?.name!} />
      ) : (
        <Link
          href="/auth/login"
          className="py-[0.5px] p-3 bg-[#E2E0C8] rounded-xl text-black font-semi-bold"
        >
          Sign in
        </Link>
      )}
    </>
  );
};

export default MenuContainer;
