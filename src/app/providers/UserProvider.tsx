"use client";
import React, { useContext } from "react";
import { createContext, useState } from "react";

interface userProps {
  name: string;
  email: string;
  avatar?: string;
}
interface userContextProps {
  user: userProps | undefined;
  updateUser: (key: keyof userProps, value: string) => void;
}
//context
const userContext = createContext<userContextProps | undefined>(undefined);

//context provider
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<userProps | undefined>({
    name: "",
    email: "",
  });

  function updateUser(key: keyof userProps, value: string) {
    setUser((prev) => {
      if (!prev) {
        console.log("user is not initialized");
        return prev;
      }
      return { ...prev, [key]: value };
    });
  }
  return (
    <userContext.Provider value={{ user, updateUser }}>
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
