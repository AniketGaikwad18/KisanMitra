"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Stethoscope,
  FlaskConical,
  CloudSun,
  Coins,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const mobileNavItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Crop Doctor",
    href: "/crop-doctor",
    icon: Stethoscope,
  },
  {
    name: "Soil",
    href: "/soil",
    icon: FlaskConical,
  },
  {
    name: "Weather",
    href: "/weather",
    icon: CloudSun,
  },
  {
    name: "Mandi",
    href: "/mandi",
    icon: Coins,
  },
];

export const BottomNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-surface/95 backdrop-blur-md border-t border-brand-border px-2 py-1 shadow-elevated safe-area-bottom"
    >
      <div className="flex items-center justify-around">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={twMerge(
                clsx(
                  "flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-150 min-w-[56px] text-center",
                  isActive
                    ? "text-brand-text font-bold"
                    : "text-brand-text-secondary hover:text-brand-green"
                )
              )}
            >
              <div
                className={twMerge(
                  clsx(
                    "p-1.5 rounded-lg transition-colors mb-0.5",
                    isActive
                      ? "bg-brand-yellow text-brand-text shadow-sm border border-[#E2BF42]"
                      : "text-brand-text-secondary"
                  )
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] tracking-tight leading-tight line-clamp-1">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
