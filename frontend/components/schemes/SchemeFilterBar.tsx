"use client";

import React from "react";
import { Search, Filter, RotateCcw, Landmark, MapPin } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface SchemeFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedState: string;
  onStateChange: (st: string) => void;
  availableCategories: string[];
  availableStates: string[];
  totalSchemes: number;
  filteredCount: number;
  onReset: () => void;
}

export const SchemeFilterBar: React.FC<SchemeFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedState,
  onStateChange,
  availableCategories,
  availableStates,
  totalSchemes,
  filteredCount,
  onReset,
}) => {
  const { t } = useTranslation();
  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "" || selectedState !== "";

  return (
    <div className="bg-brand-surface rounded-2xl border border-brand-border p-4 sm:p-5 shadow-card mb-6">
      {/* Search and Primary Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
        {/* Search Input */}
        <div className="md:col-span-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-text-muted">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t("schemes.searchPlaceholder")}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-sm text-brand-text placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
          />
        </div>

        {/* Category Dropdown */}
        <div className="md:col-span-3">
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-sm font-medium text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all cursor-pointer"
            >
              <option value="">{t("schemes.allCategories")}</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* State Dropdown */}
        <div className="md:col-span-3">
          <div className="relative">
            <select
              value={selectedState}
              onChange={(e) => onStateChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-sm font-medium text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all cursor-pointer"
            >
              <option value="">{t("schemes.allStates")}</option>
              {availableStates.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Quick Category Filter Pills */}
      <div className="mt-4 pt-3.5 border-t border-brand-border flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <span className="text-xs font-bold text-brand-text-secondary mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-brand-green" />
            {t("schemes.category")}:
          </span>
          <button
            type="button"
            onClick={() => onCategoryChange("")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              selectedCategory === ""
                ? "bg-brand-green text-white shadow-sm"
                : "bg-brand-bg text-brand-text-secondary hover:bg-brand-border/60 hover:text-brand-text"
            }`}
          >
            {t("schemes.all")}
          </button>
          {availableCategories.slice(0, 6).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(selectedCategory === cat ? "" : cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-brand-green text-white shadow-sm"
                  : "bg-brand-bg text-brand-text-secondary hover:bg-brand-border/60 hover:text-brand-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Counter & Reset Button */}
        <div className="flex items-center gap-3 ml-auto text-xs text-brand-text-secondary">
          <span>
            {t("schemes.showing", {
              filtered: filteredCount.toString(),
              total: totalSchemes.toString(),
            })}
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              {t("schemes.reset")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
