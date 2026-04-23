"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bell, Users, User, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthContext";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

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
    icon: User,
    isProfile: true,
  },
];

export const HomeNavbar = () => {
  const pathname = usePathname();
  const { user, logoutHelper } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    logoutHelper();
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex h-14 items-center">
          {NAV_ITEMS.map((item, index) => {
            const isProfile = "isProfile" in item && item.isProfile;
            const href = "href" in item ? item.href : "/home/profile";
            const label = "label" in item ? item.label : "";
            const isActive = pathname === href;
            const Icon = item.icon;

            if (isProfile && user) {
              return (
                <div
                  key={index}
                  className="relative flex flex-1 flex-col items-center justify-center h-full"
                  ref={menuRef}
                >
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={cn(
                      "relative flex flex-col items-center justify-center w-full h-full transition-colors group outline-none",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <div className="relative">
                      <div
                        className={cn(
                          "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground uppercase overflow-hidden border border-black transition-transform group-hover:scale-110",
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
                    </div>

                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary" />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <div className="absolute top-full mt-2 right-0 min-w-[180px] overflow-hidden rounded-xl border border-border bg-background/95 p-1 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-3 py-2 border-b border-border/50">
                        <p className="text-xs font-semibold truncate">
                          {user.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/home/profile"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs transition-colors hover:bg-accent hover:text-accent-foreground rounded-md group"
                        >
                          <Settings className="size-3.5 text-muted-foreground group-hover:text-foreground" />
                          <span>Profile Settings</span>
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-xs transition-colors hover:bg-rose-500/10 hover:text-rose-500 rounded-md group text-left"
                        >
                          <LogOut className="size-3.5  text-muted-foreground group-hover:text-rose-500" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative flex flex-1 flex-col items-center justify-center h-full transition-colors group",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <div className="relative">
                  <Icon
                    className={cn(
                      "size-5.5 transition-transform duration-200 group-active:scale-90",
                      isActive && "fill-primary/10",
                    )}
                  />

                  {label === "Notifications" && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2 rounded-full bg-rose-500 ring-2 ring-background" />
                  )}
                </div>

                <span className="hidden sm:block mt-1 text-[0.65rem] font-medium tracking-wide">
                  {label}
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
