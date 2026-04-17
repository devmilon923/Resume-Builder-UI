"use client";
import { ReactNode, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";

export default function ProtectUserRoute({
  children,
}: {
  children: ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/auth/login");
      } else if (user.role !== "user") {
        router.push("/unauthorized");
      }
    }
  }, [isLoading, user, router]);

  if (isLoading) return <>Loading</>;

  if (user?.role === "user") {
    return <>{children}</>;
  }
  
  return null;
}

