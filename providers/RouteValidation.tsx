"use client";

import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface RoleProtectedRouteProps {
  children: ReactNode;
  requiredRoles: string[];
}

export function RoleProtectedRoute({
  children,
  requiredRoles,
}: RoleProtectedRouteProps) {
  const { user, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      router.push("/auth/login");
      return;
    }

    // Redirect if no permission
    if (!hasRole(requiredRoles)) {
      router.push("/unauthorized");
      return;
    }
  }, [user, hasRole, requiredRoles, router]);

  // Show loading while checking
  if (!user || !hasRole(requiredRoles)) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
