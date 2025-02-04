"use client";
import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";

interface userProps {
  id: string;
  name: string;
  about?: string;
  email: string;
  role: string;
  historyEnabled: boolean;
}
interface userContextProps {
  user: userProps | undefined;
  isLoaded: boolean;
  refreshUser: (user?: userProps) => void;
}
//context
const userContext = createContext<userContextProps>({
  user: undefined,
  isLoaded: false,
  refreshUser: () => {},
});

//context provider component
const UserProvider = ({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser?: userProps;
}) => {
  //user State
  const [user, setUser] = useState<userProps | undefined>();
  const [isLoaded, setIsLoaded] = useState(false);

  //get user from server on page load/reload
  useEffect(() => {
    console.log(initialUser);

    if (initialUser) {
      setIsLoaded(true);
      setUser(initialUser);
      console.log("user loaded from server");
    } else {
      fetchUser();
    }
  }, []);

  //fetchUser Function
  const fetchUser = async () => {
    console.log("user loaded from client");
    try {
      setIsLoaded(false);
      const res = await fetch("/api/user");
      if (!res.ok) {
        setUser(undefined);
        throw new Error(`Error ${res.status} failed to fetch user`);
      }
      const user = await res.json();
      setUser(user);
      console.log("fetched user: ", user);
    } catch (error) {
      setUser(undefined);
      console.log(error);
    } finally {
      setIsLoaded(true);
    }
  };

  //function to update user state
  const refreshUser = async (user?: userProps) => {
    if (user) {
      setUser(user);
      console.log("user: ", user);
    } else {
      await fetchUser();
    }
  };

  return (
    <userContext.Provider value={{ user, refreshUser, isLoaded }}>
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
