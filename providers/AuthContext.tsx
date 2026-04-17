"use client";

import { useLogout, useProfile } from "@/utils/api/endpoints";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
}

interface AuthContextType {
  user: User | null;
  logoutHelper: () => void;
  hasRole: (role: string | string[]) => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const logout = useLogout();
  const { data: user, isLoading } = useProfile();
  const queryClient = useQueryClient();
  const logoutHelper = async () => {
    await logout.mutateAsync();
    // Immediately clear the cached profile so the UI doesn't wait for
    // a refetch that would fail anyway (cookies are gone).
    // queryClient.setQueryData(["profile"], null);
    queryClient.clear();
  };

  const hasRole = (role: string | string[]) => {
    if (!user) return false;

    if (typeof role === "string") {
      return user.role === role;
    }

    return role.includes(user.role);
  };
  return (
    <AuthContext.Provider value={{ user, logoutHelper, hasRole, isLoading }}>
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
