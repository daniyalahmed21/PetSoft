"use client";
import Link from "next/link";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const AppHeader = () => {
  const activePathname = usePathname();
  console.log(activePathname);
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
  return (
    <header className="pt-4 pb-4  flex justify-between items-center border-b border-white/20">
      <Logo />
      <ul className="flex gap-2 text-sm">
        {routes.map((route, index) => (
          <li key={index}>
            <Link
              className={cn(
                "text-white/70 rounded-sm px-3 py-2 hover:text-white focus:text-white",
                { "bg-black/10": activePathname === route.path }
              )}
              href={route.path}
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default AppHeader;
