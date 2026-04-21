"use client";
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";

export default function ProtectUserRoute({
  children,
}: {
  children: ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const { user, isLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && isMounted) {
      if (!user) {
        router.push("/auth/login");
      } else if (user.role !== "user") {
        router.push("/unauthorized");
      }
    }
  }, [isLoading, user, router, isMounted]);

  if (!isMounted || isLoading) return <>Loading</>;

  if (user?.role === "user") {
    return <>{children}</>;
  }

  return null;
}
