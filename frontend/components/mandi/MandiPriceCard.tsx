"use client";

import React from "react";
import { Coins, Calendar, MapPin, Tag, TrendingUp, Info } from "lucide-react";
import { MandiPriceRecord, MandiSummary } from "@/types";
import { DataStatusBadge } from "./DataStatusBadge";
import { PriceRangeVisualizer } from "./PriceRangeVisualizer";
import { Badge } from "@/components/ui/Badge";
import { useTranslation } from "@/lib/i18n";

interface MandiPriceCardProps {
  primaryRecord: MandiPriceRecord;
  dataStatus: string;
  isDemo: boolean;
  summary?: MandiSummary;
}

export const MandiPriceCard: React.FC<MandiPriceCardProps> = ({
  primaryRecord,
  dataStatus,
  isDemo,
  summary,
}) => {
  const { t, formatNumber } = useTranslation();
  const {
    commodity,
    variety,
    grade,
    market,
    district,
    state,
    min_price,
    max_price,
    modal_price,
    unit,
    arrival_date,
  } = primaryRecord;

  return (
    <div className="bg-gradient-to-br from-white via-[#FAFDF8] to-[#F5FBF3] rounded-2xl border border-brand-border p-6 shadow-card hover:shadow-elevated transition-all space-y-5">
      {/* Top Header & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-brand-border/60">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-green">
              {t("mandi.title")}
            </span>
            <DataStatusBadge status={dataStatus} isDemo={isDemo} />
          </div>
          <h2 className="text-2xl font-black text-brand-text mt-0.5">
            {commodity}
          </h2>
          <div className="flex items-center gap-2 text-xs text-brand-text-secondary mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-brand-green" />
            <span>
              {market} • {district ? `${district}, ` : ""}{state}
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[11px] text-brand-text-secondary block">
            {t("mandi.reportedDate")}
          </span>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-text bg-white px-2.5 py-1 rounded-lg border border-brand-border shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-brand-green" />
            <span>{arrival_date || t("weather.today")}</span>
          </div>
        </div>
      </div>

      {/* Main Modal Price & Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Modal Price Highlight */}
        <div className="md:col-span-6 space-y-1">
          <span className="text-xs font-bold text-brand-text-secondary uppercase tracking-wider block">
            {t("mandi.modalPrice")}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black text-brand-text tracking-tight">
              {modal_price !== null && modal_price !== undefined
                ? `₹${formatNumber(modal_price)}`
                : "N/A"}
            </span>
            <span className="text-sm font-bold text-brand-text-secondary">
              / {unit.replace("₹/", "")}
            </span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            {variety && (
              <Badge variant="neutral" size="sm">
                Variety: {variety}
              </Badge>
            )}
            {grade && (
              <Badge variant="outline" size="sm">
                Grade: {grade}
              </Badge>
            )}
          </div>
        </div>

        {/* Min & Max Cards */}
        <div className="md:col-span-6 grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex flex-col justify-between">
            <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
              {t("mandi.minPrice")}
            </span>
            <div className="text-xl font-black text-brand-text mt-1">
              {min_price !== null && min_price !== undefined
                ? `₹${formatNumber(min_price)}`
                : "—"}
            </div>
            <span className="text-[10px] text-brand-text-secondary mt-0.5">
              {t("mandi.minPrice")}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex flex-col justify-between">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              {t("mandi.maxPrice")}
            </span>
            <div className="text-xl font-black text-brand-text mt-1">
              {max_price !== null && max_price !== undefined
                ? `₹${formatNumber(max_price)}`
                : "—"}
            </div>
            <span className="text-[10px] text-brand-text-secondary mt-0.5">
              {t("mandi.maxPrice")}
            </span>
          </div>
        </div>
      </div>

      {/* Price Range Visualizer */}
      <PriceRangeVisualizer
        minPrice={min_price}
        maxPrice={max_price}
        modalPrice={modal_price}
        unit={unit}
      />
    </div>
  );
};
