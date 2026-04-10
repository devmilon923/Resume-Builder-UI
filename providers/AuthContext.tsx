"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  hasRole: (role: string | string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  const hasRole = (role: string | string[]) => {
    if (!user) return false;

    if (typeof role === "string") {
      return user.role === role;
    }

    return role.includes(user.role);
  };
  return (
    <AuthContext.Provider value={{ user, logout, setUser, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
