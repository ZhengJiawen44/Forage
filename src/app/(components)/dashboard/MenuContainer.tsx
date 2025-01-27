"use client";
import Menu from "./Menu";

import { useUser } from "@/app/providers/UserProvider";
import { TbUser } from "react-icons/tb";
export const dynamic = "force-dynamic";
const MenuContainer = () => {
  const { user } = useUser();
  console.log(user);

  if (user?.name && user.email) {
    return <Menu userName={user.name} userEmail={user.email} />;
  } else {
    return <TbUser />;
  }
};

export default MenuContainer;
