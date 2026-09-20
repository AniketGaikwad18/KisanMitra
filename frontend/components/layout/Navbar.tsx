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
import { useTranslation, SupportedLanguage } from "@/lib/i18n";

interface NavbarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

const pageKeyMap: Record<string, { titleKey: string; categoryKey: string }> = {
  "/": { titleKey: "nav.home", categoryKey: "common.brandTagline" },
  "/dashboard": { titleKey: "nav.dashboard", categoryKey: "nav.categoryOverview" },
  "/crop-doctor": { titleKey: "nav.cropDoctor", categoryKey: "nav.categoryPlantHealth" },
  "/soil": { titleKey: "nav.soilHealth", categoryKey: "nav.categoryAgronomy" },
  "/weather": { titleKey: "nav.weather", categoryKey: "nav.categoryForecast" },
  "/mandi": { titleKey: "nav.mandi", categoryKey: "nav.categoryMarketRates" },
  "/schemes": { titleKey: "nav.schemes", categoryKey: "nav.categorySupport" },
  "/crop-guide": { titleKey: "nav.cropGuide", categoryKey: "nav.categoryAdvisory" },
  "/assistant": { titleKey: "nav.assistant", categoryKey: "nav.categoryAdvisory" },
};

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  isSidebarOpen,
}) => {
  const pathname = usePathname() || "/";
  const { language, setLanguage, t, languages, currentLanguageInfo } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const pageInfo = pageKeyMap[pathname] || {
    titleKey: "nav.dashboard",
    categoryKey: "nav.categoryOverview",
  };

  const demoNotifications = [
    {
      id: "1",
      title: t("dashboard.weatherAlert"),
      desc: t("dashboard.weatherAlertDesc"),
      time: "2h ago",
      type: "weather",
    },
    {
      id: "2",
      title: t("soil.title"),
      desc: t("dashboard.farmInsightsSub"),
      time: "Yesterday",
      type: "soil",
    },
    {
      id: "3",
      title: t("mandi.title"),
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
                  {t("common.brandTagline")}
                </span>
              </div>
            </Link>

            {/* Context Breadcrumb (Desktop) */}
            {pathname !== "/" && (
              <div className="hidden md:flex items-center gap-2 pl-4 border-l border-brand-border">
                <span className="text-xs font-semibold text-brand-text-secondary uppercase tracking-wider">
                  {t(pageInfo.categoryKey)}
                </span>
                <span className="text-xs text-brand-text-secondary">/</span>
                <span className="text-sm font-bold text-brand-text">
                  {t(pageInfo.titleKey)}
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
                aria-label={t("nav.notifications")}
                title={t("nav.notifications")}
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
                        {t("nav.farmNotifications")}
                      </span>
                    </div>
                    <Badge variant="warning" size="sm" className="text-[10px]">
                      {t("common.demo")}
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
                      {t("dashboard.overview")} →
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
                aria-label={t("nav.selectLanguage")}
                title={t("nav.selectLanguage")}
              >
                <Globe className="w-4 h-4 text-brand-green" />
                <span>{currentLanguageInfo.nativeName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-brand-text-secondary" />
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-brand-surface rounded-2xl border border-brand-border shadow-elevated py-2 z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-text-secondary border-b border-brand-border/60">
                    {t("nav.selectLanguage")}
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setLanguage(lang.code as SupportedLanguage);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between hover:bg-brand-bg transition-colors ${
                        language === lang.code
                          ? "bg-brand-yellow/25 text-brand-text font-bold"
                          : "text-brand-text"
                      }`}
                    >
                      <span>{lang.nativeName} ({lang.name})</span>
                      {language === lang.code && (
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
                  📍 {t("dashboard.locationPune")}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
