"use client";
import React, { useContext, useEffect, useMemo } from "react";
import { createContext, useState } from "react";

interface userProps {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
}
interface userContextProps {
  user: userProps | undefined;
  refreshUser: (user?: userProps) => void;
}
//context
const userContext = createContext<userContextProps>({
  user: undefined,
  refreshUser: () => {},
});

//context provider component
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  //user State
  const [user, setUser] = useState<userProps | undefined>({
    id: undefined,
    name: undefined,
    email: undefined,
  });

  //get user from server on initial page load/ page refresh
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    try {
      const res = await fetch("/api/user");
      const user = await res.json();
      setUser(user);
      console.log("fetched user: ", user);
    } catch (error) {}
  };

  //call this to update user state
  const refreshUser = async (user?: userProps) => {
    if (user) {
      setUser(user);
      console.log("user: ", user);
    } else {
      await fetchUser();
    }
  };

  return (
    <userContext.Provider value={{ user, refreshUser }}>
      {children}
    </userContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { useUser, UserProvider };
