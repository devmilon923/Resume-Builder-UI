"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bell, Users, User, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthContext";
import Image from "next/image";

const NAV_ITEMS = [
  {
    label: "Feed",
    href: "/home",
    icon: Home,
  },
  {
    label: "Notifications",
    href: "/home/notifications",
    icon: Bell,
  },
  {
    label: "Friends",
    href: "/home/friends",
    icon: Users,
  },
  {
    label: "Profile",
    href: "/home/profile",
    icon: User,
  },
];

export const HomeNavbar = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex h-14 items-center">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            const isProfile = item.label === "Profile";

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-1 flex-col items-center justify-center h-full transition-colors group",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <div className="relative">
                  {isProfile && user ? (
                    <div
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground uppercase overflow-hidden border border-border transition-transform group-hover:scale-110",
                        isActive &&
                          "ring-2 ring-primary ring-offset-2 ring-offset-background",
                      )}
                    >
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <Icon
                      className={cn(
                        "size-5.5 transition-transform duration-200 group-active:scale-90",
                        isActive && "fill-primary/10",
                      )}
                    />
                  )}

                  {item.label === "Notifications" && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2 rounded-full bg-rose-500 ring-2 ring-background" />
                  )}
                </div>

                <span className="hidden sm:block mt-1 text-[0.65rem] font-medium tracking-wide">
                  {item.label}
                </span>

                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
