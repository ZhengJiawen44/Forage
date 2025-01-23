"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const MenuContainer = () => {
  const [user, setUser] = useState<string>();
  const params = useSearchParams();

  useEffect(() => {
    const refresh = params.get("refresh");
    if (refresh) {
      console.log("user fetch");
      fetchUser().then((user) => {
        setUser(user);
      });
    }
  }, [useSearchParams]);

  return <div>MenuContainer</div>;
};
const fetchUser = async () => {
  const data = await fetch("/api/user");
  const user = await data.json();
  return user;
};
export default MenuContainer;
