"use client";

import { createContext } from "react";
import { User } from "@prisma/client";

interface UserContextType {
  user: User | null; // User can be null if not logged in
}

// Create context with default value as null
export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ user, children }: { user: User | null; children: React.ReactNode }) => {
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};