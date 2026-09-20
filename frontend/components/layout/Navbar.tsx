"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Globe, User, Menu, X, Sprout } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface NavbarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  isSidebarOpen,
}) => {
  const [selectedLang, setSelectedLang] = useState("EN");
  const [showLangMenu, setShowLangMenu] = useState(false);

  const languages = [
    { code: "EN", label: "English" },
    { code: "MR", label: "मराठी (Marathi)" },
    { code: "HI", label: "हिन्दी (Hindi)" },
    { code: "TA", label: "தமிழ் (Tamil)" },
    { code: "TE", label: "తెలుగు (Telugu)" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-brand-surface border-b border-brand-border/80 shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-brand-text hover:bg-brand-bg focus:outline-none focus:ring-2 focus:ring-brand-green"
              aria-label="Toggle navigation menu"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-brand-yellow flex items-center justify-center border border-[#E2BF42] shadow-sm group-hover:scale-105 transition-transform">
                <span className="text-2xl" role="img" aria-label="Sprout">🌾</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-brand-text">
                    Kisan<span className="text-brand-green">Mitra</span>
                  </span>
                  <Badge variant="brand" size="sm" className="hidden sm:inline-flex text-[10px]">
                    BETA
                  </Badge>
                </div>
                <span className="text-xs text-brand-text-secondary hidden sm:inline-block font-medium">
                  Smarter Decisions. Healthier Farms.
                </span>
              </div>
            </Link>
          </div>

          {/* Right: Language Selector & Farmer Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Selector Dropdown (Placeholder) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-border bg-brand-bg hover:bg-brand-yellow/20 text-brand-text text-sm font-medium transition-colors"
                aria-expanded={showLangMenu}
                aria-haspopup="true"
                title="Select Language (Placeholder)"
              >
                <Globe className="w-4 h-4 text-brand-green" />
                <span className="font-semibold">{selectedLang}</span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-brand-surface rounded-xl border border-brand-border shadow-elevated py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-text-secondary border-b border-brand-border/50">
                    Select Language
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setSelectedLang(lang.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-sm flex items-center justify-between hover:bg-brand-bg transition-colors ${
                        selectedLang === lang.code
                          ? "bg-brand-yellow/25 text-brand-text font-bold"
                          : "text-brand-text"
                      }`}
                    >
                      <span>{lang.label}</span>
                      {selectedLang === lang.code && (
                        <span className="w-2 h-2 rounded-full bg-brand-green" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Farmer Profile Placeholder */}
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-brand-border bg-brand-surface hover:bg-brand-bg transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-green text-white flex items-center justify-center font-bold text-sm shadow-sm">
                F
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-brand-text leading-none">
                  Farmer Ramesh
                </span>
                <span className="text-[11px] text-brand-text-secondary mt-0.5 leading-none">
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
