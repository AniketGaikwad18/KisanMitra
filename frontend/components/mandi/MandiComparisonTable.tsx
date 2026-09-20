"use client";

import React, { useState, useMemo } from "react";
import {
  ArrowUpDown,
  Coins,
  MapPin,
  Calendar,
  Layers,
  ArrowUpRight,
  Sparkles,
  Info,
} from "lucide-react";
import { MandiPriceRecord, MandiSummary } from "@/types";
import { PriceRangeVisualizer } from "./PriceRangeVisualizer";
import { Badge } from "@/components/ui/Badge";
import { useTranslation } from "@/lib/i18n";

interface MandiComparisonTableProps {
  records: MandiPriceRecord[];
  summary?: MandiSummary;
}

type SortField = "modal_price" | "min_price" | "max_price" | "market" | "arrival_date";
type SortOrder = "asc" | "desc";

export const MandiComparisonTable: React.FC<MandiComparisonTableProps> = ({
  records,
  summary,
}) => {
  const { t, formatNumber } = useTranslation();
  const [sortField, setSortField] = useState<SortField>("modal_price");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const sortedRecords = useMemo(() => {
    const list = [...records];
    return list.sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      if (valA === undefined || valA === null) valA = sortOrder === "asc" ? Infinity : -Infinity;
      if (valB === undefined || valB === null) valB = sortOrder === "asc" ? Infinity : -Infinity;

      if (typeof valA === "string") {
        return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortOrder === "asc" ? valA - valB : valB - valA;
    });
  }, [records, sortField, sortOrder]);

  if (!records || records.length === 0) {
    return null;
  }

  return (
    <div className="bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-card space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-brand-yellow/30 text-brand-green flex items-center justify-center border border-brand-yellow/50">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-brand-text">
              {t("mandi.comparisonTitle")}
            </h3>
            <p className="text-xs text-brand-text-secondary">
              {t("mandi.comparingMarkets", { count: records.length.toString() })}
            </p>
          </div>
        </div>

        {summary?.highest_modal_market && summary?.highest_modal_price && (
          <div className="text-xs text-brand-text-secondary bg-neutral-50 px-3 py-1.5 rounded-xl border border-brand-border/60 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-brand-green flex-shrink-0" />
            <span>
              {t("mandi.highestModal")}: <strong className="text-brand-text font-bold">₹{formatNumber(summary.highest_modal_price)}</strong> ({summary.highest_modal_market})
            </span>
          </div>
        )}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-brand-border text-xs font-bold text-brand-text-secondary uppercase tracking-wider bg-neutral-50/50">
              <th
                onClick={() => handleSort("market")}
                className="py-3 px-3 cursor-pointer hover:text-brand-text transition-colors rounded-l-lg"
              >
                <div className="flex items-center gap-1">
                  <span>{t("mandi.marketMandi")}</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3">{t("mandi.varietyGrade")}</th>
              <th
                onClick={() => handleSort("min_price")}
                className="py-3 px-3 cursor-pointer hover:text-brand-text transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>{t("mandi.minPrice")}</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort("modal_price")}
                className="py-3 px-3 cursor-pointer hover:text-brand-text transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>{t("mandi.modalPrice")}</span>
                  <ArrowUpDown className="w-3 h-3 text-brand-green" />
                </div>
              </th>
              <th
                onClick={() => handleSort("max_price")}
                className="py-3 px-3 cursor-pointer hover:text-brand-text transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>{t("mandi.maxPrice")}</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3 w-40">{t("mandi.priceSpectrum")}</th>
              <th
                onClick={() => handleSort("arrival_date")}
                className="py-3 px-3 cursor-pointer hover:text-brand-text transition-colors rounded-r-lg"
              >
                <div className="flex items-center gap-1">
                  <span>{t("mandi.date")}</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border/60">
            {sortedRecords.map((item, idx) => {
              const isHighest =
                summary?.highest_modal_price &&
                item.modal_price === summary.highest_modal_price;

              return (
                <tr
                  key={`${item.market}-${item.commodity}-${idx}`}
                  className={`hover:bg-brand-bg/40 transition-colors ${
                    isHighest ? "bg-[#FAFDF8]" : ""
                  }`}
                >
                  {/* Market & District */}
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-brand-text flex items-center gap-1.5">
                      <span>{item.market}</span>
                      {isHighest && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-green/10 text-brand-green border border-brand-green/20">
                          {t("mandi.highestModalBadge")}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-brand-text-secondary">
                      {item.district ? `${item.district}, ` : ""}{item.state}
                    </span>
                  </td>

                  {/* Variety / Grade */}
                  <td className="py-3.5 px-3 text-xs text-brand-text-secondary">
                    {item.variety || t("mandi.general")}
                    {item.grade ? ` (${item.grade})` : ""}
                  </td>

                  {/* Min Price */}
                  <td className="py-3.5 px-3 font-semibold text-brand-text text-xs">
                    {item.min_price !== null && item.min_price !== undefined
                      ? `₹${formatNumber(item.min_price)}`
                      : "—"}
                  </td>

                  {/* Modal Price */}
                  <td className="py-3.5 px-3">
                    <span className="text-base font-black text-brand-green block">
                      {item.modal_price !== null && item.modal_price !== undefined
                        ? `₹${formatNumber(item.modal_price)}`
                        : "—"}
                    </span>
                    <span className="text-[10px] text-brand-text-secondary">
                      {item.unit}
                    </span>
                  </td>

                  {/* Max Price */}
                  <td className="py-3.5 px-3 font-semibold text-brand-text text-xs">
                    {item.max_price !== null && item.max_price !== undefined
                      ? `₹${formatNumber(item.max_price)}`
                      : "—"}
                  </td>

                  {/* Visual Spectrum */}
                  <td className="py-3.5 px-3">
                    <PriceRangeVisualizer
                      minPrice={item.min_price}
                      maxPrice={item.max_price}
                      modalPrice={item.modal_price}
                      compact
                    />
                  </td>

                  {/* Arrival Date */}
                  <td className="py-3.5 px-3 text-xs text-brand-text-secondary whitespace-nowrap">
                    {item.arrival_date || "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards Layout */}
      <div className="block md:hidden space-y-3">
        {sortedRecords.map((item, idx) => {
          const isHighest =
            summary?.highest_modal_price &&
            item.modal_price === summary.highest_modal_price;

          return (
            <div
              key={`mobile-${item.market}-${idx}`}
              className={`p-4 rounded-xl border transition-all ${
                isHighest
                  ? "bg-[#FAFDF8] border-brand-green/40 shadow-xs"
                  : "bg-white border-brand-border"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="text-sm font-bold text-brand-text flex items-center gap-1.5 flex-wrap">
                    <span>{item.market}</span>
                    {isHighest && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-brand-green/10 text-brand-green border border-brand-green/20">
                        {t("mandi.highestModalBadge")}
                      </span>
                    )}
                  </h4>
                  <span className="text-xs text-brand-text-secondary">
                    {item.district ? `${item.district}, ` : ""}{item.state}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-lg font-black text-brand-green block">
                    {item.modal_price !== null && item.modal_price !== undefined
                      ? `₹${formatNumber(item.modal_price)}`
                      : "—"}
                  </span>
                  <span className="text-[10px] text-brand-text-secondary">
                    {item.unit}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-brand-border/60 my-2">
                <div>
                  <span className="text-[10px] text-brand-text-secondary block">{t("mandi.minPrice")}</span>
                  <span className="font-bold text-brand-text">
                    {item.min_price !== null && item.min_price !== undefined
                      ? `₹${formatNumber(item.min_price)}`
                      : "—"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-brand-text-secondary block">{t("mandi.maxPrice")}</span>
                  <span className="font-bold text-brand-text">
                    {item.max_price !== null && item.max_price !== undefined
                      ? `₹${formatNumber(item.max_price)}`
                      : "—"}
                  </span>
                </div>
              </div>

              <PriceRangeVisualizer
                minPrice={item.min_price}
                maxPrice={item.max_price}
                modalPrice={item.modal_price}
                compact
              />

              <div className="mt-2 text-[10px] text-brand-text-secondary flex justify-between">
                <span>{t("mandi.variety")}: {item.variety || "FAQ"}</span>
                <span>{t("mandi.reported")}: {item.arrival_date || t("mandi.today")}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
