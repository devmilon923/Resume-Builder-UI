"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface RoleProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
  fallback?: ReactNode;
  publicRoutes?: string[];
}

const DEFAULT_PUBLIC_ROUTES = [
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
];

export function RoleProtectedRoute({
  children,
  requiredRoles = [],
  fallback,
  publicRoutes = DEFAULT_PUBLIC_ROUTES,
}: RoleProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Check if current route is public
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  useEffect(() => {
    // Still loading, don't render anything yet
    if (isLoading) return;

    // If route is public, allow access
    if (isPublicRoute) {
      setIsAuthorized(true);
      return;
    }

    // Not logged in, redirect to login
    if (!user) {
      router.push("/auth/login");
      return;
    }

    // Check if user has required role (if roles are specified)
    if (requiredRoles.length > 0) {
      const hasPermission = requiredRoles.includes(user.role);
      if (!hasPermission) {
        router.push("/unauthorized");
        return;
      }
    }

    // All checks passed
    setIsAuthorized(true);
  }, [user, isLoading, requiredRoles, router, isPublicRoute]);

  // Show loading state while checking permissions
  if (isLoading && !isPublicRoute) {
    return (
      fallback || (
        <div className="flex items-center justify-center p-8">Loading...</div>
      )
    );
  }

  // Show children only if authorized
  if (!isAuthorized) {
    return fallback || null;
  }

  return <>{children}</>;
}
