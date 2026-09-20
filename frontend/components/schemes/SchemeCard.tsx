"use client";

import React from "react";
import { Landmark, ExternalLink, Users, FileText, ChevronRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SchemeSummary } from "@/types";
import { useTranslation } from "@/lib/i18n";

interface SchemeCardProps {
  scheme: SchemeSummary;
  onSelect: (scheme: SchemeSummary) => void;
}

const CATEGORY_COLORS: Record<string, "success" | "brand" | "warning" | "neutral" | "outline"> = {
  "Income Support": "success",
  "Crop Insurance": "brand",
  "Credit": "warning",
  "Irrigation": "outline",
  "Soil Health": "success",
  "Equipment": "warning",
  "Seeds": "success",
  "Agriculture Infrastructure": "neutral",
  "State Support": "brand",
};

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, onSelect }) => {
  const { t } = useTranslation();
  const badgeVariant = CATEGORY_COLORS[scheme.category] || "neutral";

  return (
    <div
      onClick={() => onSelect(scheme)}
      className="group bg-brand-surface rounded-2xl border border-brand-border p-5 hover:border-brand-green/60 hover:shadow-card hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Header: Category & State Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <Badge variant={badgeVariant}>
            {scheme.category}
          </Badge>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-bg text-brand-text-secondary border border-brand-border">
            {scheme.state}
          </span>
        </div>

        {/* Scheme Name */}
        <h3 className="text-lg font-bold text-brand-text group-hover:text-brand-green transition-colors leading-snug mb-2">
          {scheme.name}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-brand-text-secondary line-clamp-3 mb-4 leading-relaxed">
          {scheme.short_description}
        </p>

        {/* Target Group */}
        {scheme.target_group && scheme.target_group.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1.5 text-xs text-brand-text-muted mb-1.5 font-medium">
              <Users className="w-3.5 h-3.5 text-brand-green" />
              <span>{t("schemes.targetGroup")}:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {scheme.target_group.map((tg, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-brand-yellow/20 text-brand-text border border-brand-yellow/30"
                >
                  {tg}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA & Source info */}
      <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between mt-2">
        <span className="text-xs text-brand-text-muted flex items-center gap-1">
          <Landmark className="w-3 h-3 text-brand-text-secondary" />
          <span className="truncate max-w-[130px] sm:max-w-[160px]">{scheme.source_name}</span>
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(scheme);
          }}
          className="inline-flex items-center gap-1 text-xs font-bold text-brand-green group-hover:text-brand-green-dark transition-colors py-1 px-2.5 rounded-lg group-hover:bg-brand-green/10"
        >
          <span>{t("schemes.viewDetails")}</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
