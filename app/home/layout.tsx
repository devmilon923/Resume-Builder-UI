import type { Metadata } from "next";
import ProtectUserRoute from "@/providers/ProtectUser";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectUserRoute>{children}</ProtectUserRoute>;
}
