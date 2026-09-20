"use client";

import React from "react";
import { Search, RotateCcw, Filter, MapPin, Sprout, Store } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MandiFilterOptions } from "@/types";
import { useTranslation } from "@/lib/i18n";

interface MandiFilterPanelProps {
  commodity: string;
  setCommodity: (val: string) => void;
  state: string;
  setState: (val: string) => void;
  district: string;
  setDistrict: (val: string) => void;
  market: string;
  setMarket: (val: string) => void;
  filterOptions?: MandiFilterOptions | null;
  isLoading: boolean;
  onSearch: (e?: React.FormEvent) => void;
  onReset: () => void;
}

const DEFAULT_COMMODITIES = [
  "Soybean",
  "Wheat",
  "Rice",
  "Cotton",
  "Maize",
  "Onion",
  "Tomato",
  "Sugarcane",
  "Gram (Chana)",
  "Mustard",
  "Potato",
  "Tur (Arhar)",
  "Bajra",
  "Jowar",
  "Groundnut",
];

const DEFAULT_STATES = [
  "Maharashtra",
  "Madhya Pradesh",
  "Punjab",
  "Haryana",
  "Karnataka",
  "Telangana",
  "Gujarat",
  "Rajasthan",
  "Uttar Pradesh",
];

export const MandiFilterPanel: React.FC<MandiFilterPanelProps> = ({
  commodity,
  setCommodity,
  state,
  setState,
  district,
  setDistrict,
  market,
  setMarket,
  filterOptions,
  isLoading,
  onSearch,
  onReset,
}) => {
  const { t } = useTranslation();

  const commoditiesList = filterOptions?.commodities?.length
    ? filterOptions.commodities
    : DEFAULT_COMMODITIES;

  const statesList = filterOptions?.states?.length
    ? filterOptions.states
    : DEFAULT_STATES;

  const districtsList =
    (filterOptions?.districts_by_state && filterOptions.districts_by_state[state]) || [
      "Pune",
      "Nashik",
      "Nagpur",
      "Kolhapur",
      "Solapur",
      "Ahmednagar",
      "Amravati",
      "Chhatrapati Sambhajinagar",
    ];

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setState(newState);
    // Auto-update district to first district of selected state
    if (filterOptions?.districts_by_state && filterOptions.districts_by_state[newState]?.length) {
      setDistrict(filterOptions.districts_by_state[newState][0]);
    } else {
      setDistrict("");
    }
  };

  return (
    <div className="bg-brand-surface rounded-2xl border border-brand-border p-5 shadow-card">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-border/60">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center border border-brand-green/20">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-brand-text">
              {t("mandi.filterTitle")}
            </h3>
            <p className="text-[11px] text-brand-text-secondary">
              {t("mandi.subtitle")}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={onSearch} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Commodity Selector */}
          <div>
            <label className="block text-xs font-bold text-brand-text mb-1 flex items-center gap-1">
              <Sprout className="w-3.5 h-3.5 text-brand-green" />
              {t("mandi.commodityLabel")}
            </label>
            <select
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-brand-border bg-white text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
            >
              {commoditiesList.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* State Selector */}
          <div>
            <label className="block text-xs font-bold text-brand-text mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-green" />
              {t("mandi.stateLabel")}
            </label>
            <select
              value={state}
              onChange={handleStateChange}
              className="w-full px-3 py-2 rounded-xl border border-brand-border bg-white text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
            >
              {statesList.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* District Selector */}
          <div>
            <label className="block text-xs font-bold text-brand-text mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-green" />
              {t("mandi.districtLabel")}
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-brand-border bg-white text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
            >
              <option value="">{t("mandi.allDistricts")}</option>
              {districtsList.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Optional APMC Market Search */}
          <div>
            <label className="block text-xs font-bold text-brand-text mb-1 flex items-center gap-1">
              <Store className="w-3.5 h-3.5 text-brand-green" />
              {t("mandi.marketLabel")}
            </label>
            <input
              type="text"
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              placeholder="e.g. Pune, Baramati..."
              className="w-full px-3 py-2 rounded-xl border border-brand-border bg-white text-sm text-brand-text placeholder:text-brand-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-brand-border/60">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onReset}
            disabled={isLoading}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            {t("common.reset")}
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="sm"
            isLoading={isLoading}
            disabled={isLoading}
            leftIcon={<Search className="w-4 h-4" />}
          >
            {t("mandi.checkPrices")}
          </Button>
        </div>
      </form>
    </div>
  );
};
