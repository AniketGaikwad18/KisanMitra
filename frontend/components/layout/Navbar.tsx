"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Globe,
  User,
  Menu,
  X,
  Bell,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface NavbarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

const pageTitles: Record<string, { title: string; category: string }> = {
  "/": { title: "Home", category: "KisanMitra" },
  "/dashboard": { title: "Dashboard", category: "Farm Overview" },
  "/crop-doctor": { title: "Crop Doctor", category: "Plant Health" },
  "/soil": { title: "Soil Health", category: "Agronomy" },
  "/weather": { title: "Weather Intelligence", category: "Forecast" },
  "/mandi": { title: "Mandi Prices", category: "Market Rates" },
  "/schemes": { title: "Government Schemes", category: "Support" },
  "/crop-guide": { title: "Crop Guide", category: "Advisory" },
  "/assistant": { title: "AI Assistant", category: "Advisory" },
};

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  isSidebarOpen,
}) => {
  const pathname = usePathname() || "/";
  const [selectedLang, setSelectedLang] = useState("EN");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const currentPage = pageTitles[pathname] || {
    title: "KisanMitra",
    category: "Farm Support",
  };

  const languages = [
    { code: "EN", label: "English" },
    { code: "MR", label: "मराठी (Marathi)" },
    { code: "HI", label: "हिन्दी (Hindi)" },
    { code: "TA", label: "தமிழ் (Tamil)" },
    { code: "TE", label: "తెలుగు (Telugu)" },
  ];

  const demoNotifications = [
    {
      id: "1",
      title: "Rain Expected Tomorrow",
      desc: "72% probability of showers in Pune region.",
      time: "2h ago",
      type: "weather",
    },
    {
      id: "2",
      title: "Soil Nitrogen Check",
      desc: "Review nutrient recommendations for Soybean.",
      time: "Yesterday",
      type: "soil",
    },
    {
      id: "3",
      title: "Mandi Price Update",
      desc: "Soybean traded at ₹5,420/q in Pune APMC (Demo).",
      time: "2d ago",
      type: "market",
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-brand-surface border-b border-brand-border shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Left: Mobile Toggle, Brand Logo & Breadcrumb */}
          <div className="flex items-center gap-3 md:gap-5">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl text-brand-text hover:bg-brand-bg focus:outline-none focus:ring-2 focus:ring-brand-green"
              aria-label="Toggle navigation drawer"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-brand-yellow flex items-center justify-center border border-[#E2BF42] shadow-sm group-hover:scale-105 transition-transform">
                <span className="text-2xl" role="img" aria-label="Sprout">🌾</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-brand-text">
                    Kisan<span className="text-brand-green">Mitra</span>
                  </span>
                </div>
                <span className="text-[10px] text-brand-text-secondary hidden sm:inline-block font-medium">
                  Smarter Decisions. Healthier Farms.
                </span>
              </div>
            </Link>

            {/* Context Breadcrumb (Desktop) */}
            {pathname !== "/" && (
              <div className="hidden md:flex items-center gap-2 pl-4 border-l border-brand-border">
                <span className="text-xs font-semibold text-brand-text-secondary uppercase tracking-wider">
                  {currentPage.category}
                </span>
                <span className="text-xs text-brand-text-secondary">/</span>
                <span className="text-sm font-bold text-brand-text">
                  {currentPage.title}
                </span>
              </div>
            )}
          </div>

          {/* Right: Notifications, Language Selector & Farmer Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notifications Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowLangMenu(false);
                }}
                className="relative p-2 rounded-xl border border-brand-border bg-brand-bg hover:bg-brand-yellow/20 text-brand-text transition-colors"
                aria-label="View notifications"
                title="Notifications"
              >
                <Bell className="w-4 h-4 text-brand-green" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  3
                </span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-brand-surface rounded-2xl border border-brand-border shadow-elevated p-4 z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-brand-border">
                    <div className="flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-brand-green" />
                      <span className="text-xs font-bold text-brand-text uppercase tracking-wider">
                        Farm Notifications
                      </span>
                    </div>
                    <Badge variant="warning" size="sm" className="text-[10px]">
                      Demo
                    </Badge>
                  </div>

                  <div className="space-y-2.5">
                    {demoNotifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-2.5 rounded-xl bg-brand-bg/70 hover:bg-brand-bg border border-brand-border/60 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <h5 className="text-xs font-bold text-brand-text">{n.title}</h5>
                          <span className="text-[10px] text-brand-text-secondary">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-brand-text-secondary leading-snug">
                          {n.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-2 border-t border-brand-border text-center">
                    <Link
                      href="/dashboard"
                      onClick={() => setShowNotifications(false)}
                      className="text-xs font-bold text-brand-green hover:underline"
                    >
                      View all in Dashboard →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Language Selector: EN ▼ */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowLangMenu(!showLangMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-brand-border bg-brand-bg hover:bg-brand-yellow/20 text-brand-text text-xs sm:text-sm font-semibold transition-colors"
                aria-expanded={showLangMenu}
                aria-haspopup="true"
                title="Select Language"
              >
                <Globe className="w-4 h-4 text-brand-green" />
                <span>{selectedLang}</span>
                <ChevronDown className="w-3.5 h-3.5 text-brand-text-secondary" />
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-brand-surface rounded-2xl border border-brand-border shadow-elevated py-2 z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-text-secondary border-b border-brand-border/60">
                    Language Selection
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setSelectedLang(lang.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between hover:bg-brand-bg transition-colors ${
                        selectedLang === lang.code
                          ? "bg-brand-yellow/25 text-brand-text font-bold"
                          : "text-brand-text"
                      }`}
                    >
                      <span>{lang.label}</span>
                      {selectedLang === lang.code && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Farmer Profile: 👤 Farmer */}
            <Link
              href="/dashboard"
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-brand-border bg-brand-surface hover:bg-brand-bg transition-colors"
              title="Farmer Profile (Demo)"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-green text-white flex items-center justify-center font-bold text-sm shadow-sm">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-brand-text leading-tight">
                  Farmer
                </span>
                <span className="text-[10px] text-brand-text-secondary leading-tight">
                  📍 Pune, MH
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
