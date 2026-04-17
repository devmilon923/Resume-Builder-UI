"use client";

import { useProfile } from "@/utils/api/endpoints";
import { useQueryClient } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import {
  createContext,
  ReactNode,
  useContext,
} from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
  hasRole: (role: string | string[]) => boolean;
  isLoading: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const cookies = useCookies()
  const { data: user, isLoading } = useProfile();
  const queryClient = useQueryClient();
  const logout = () => {
    cookies.remove("token");
    cookies.remove("refreshToken");
    queryClient.clear()
  };

  const hasRole = (role: string | string[]) => {
    if (!user) return false;

    if (typeof role === "string") {
      return user.role === role;
    }

    return role.includes(user.role);
  };
  return (
    <AuthContext.Provider value={{ user, logout, hasRole, isLoading }}>
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
