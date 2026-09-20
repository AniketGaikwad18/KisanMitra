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
  Landmark,
  Compass,
  BotMessageSquare,
  ChevronRight,
  Sparkles,
  Sprout,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: undefined,
  },
  {
    name: "Crop Doctor",
    href: "/crop-doctor",
    icon: Stethoscope,
    badge: "AI Vision",
  },
  {
    name: "Soil Health",
    href: "/soil",
    icon: FlaskConical,
    badge: undefined,
  },
  {
    name: "Weather",
    href: "/weather",
    icon: CloudSun,
    badge: undefined,
  },
  {
    name: "Mandi",
    href: "/mandi",
    icon: Coins,
    badge: undefined,
  },
  {
    name: "Schemes",
    href: "/schemes",
    icon: Landmark,
    badge: undefined,
  },
  {
    name: "Crop Guide",
    href: "/crop-guide",
    icon: Compass,
    badge: undefined,
  },
  {
    name: "AI Assistant",
    href: "/assistant",
    icon: BotMessageSquare,
    badge: "AI",
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation Panel */}
      <aside
        className={twMerge(
          clsx(
            "fixed inset-y-0 left-0 z-40 w-64 md:w-68 bg-brand-surface border-r border-brand-border flex flex-col justify-between transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 shadow-subtle",
            isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
          )
        )}
      >
        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3.5 py-5">
          <div className="mb-3 px-3">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-text-secondary">
              Navigation
            </span>
          </div>

          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={twMerge(
                    clsx(
                      "group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150",
                      isActive
                        ? "bg-brand-yellow text-brand-text font-bold shadow-sm border border-[#E2BF42]"
                        : "text-brand-text hover:bg-brand-bg hover:text-brand-green"
                    )
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={twMerge(
                        clsx(
                          "w-5 h-5 transition-colors",
                          isActive
                            ? "text-brand-text"
                            : "text-brand-text-secondary group-hover:text-brand-green"
                        )
                      )}
                    />
                    <span>{item.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span
                        className={twMerge(
                          clsx(
                            "text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md",
                            isActive
                              ? "bg-white/80 text-brand-text"
                              : "bg-brand-green/10 text-brand-green border border-brand-green/20"
                          )
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight
                      className={twMerge(
                        clsx(
                          "w-4 h-4 transition-transform",
                          isActive
                            ? "text-brand-text opacity-100"
                            : "text-neutral-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                        )
                      )}
                    />
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Hackathon Tag */}
        <div className="p-3.5 border-t border-brand-border bg-brand-bg/50">
          <div className="p-3 bg-brand-surface rounded-xl border border-brand-border/80">
            <div className="flex items-center gap-2 mb-1">
              <Sprout className="w-4 h-4 text-brand-green" />
              <span className="text-xs font-bold text-brand-text">
                KisanMitra Decision Suite
              </span>
            </div>
            <p className="text-[11px] text-brand-text-secondary leading-snug">
              Built for Indian Farmers • <span className="font-semibold text-brand-green">HACKDAY 1.0</span>
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
