"use client";

import Link from "next/link";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Dashboard",
    path: "/app/dashboard",
  },
  {
    label: "Account",
    path: "/app/account",
  },
];

export default function AppHeader() {
  const activePathname = usePathname();

  return (
    <header className="flex justify-between items-center border-b border-white/15 py-4  ">
      {/* Logo */}
      <Logo  />

      {/* Navigation */}
      <nav>
        <ul className="flex gap-4">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                href={route.path}
                className={cn(
                  "text-white/80 rounded-md px-4 py-2 text-sm font-medium hover:text-white hover:bg-white/10 focus:text-white focus:bg-white/10 transition-colors duration-200",
                  {
                    "bg-white/20 text-white": route.path === activePathname,
                  }
                )}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}