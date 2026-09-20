"use client";

import React from "react";
import {
  Sprout,
  SprayCan,
  Droplet,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Lightbulb,
} from "lucide-react";
import { FarmOutlook } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { useTranslation } from "@/lib/i18n";

interface FarmOutlookCardProps {
  outlook: FarmOutlook;
}

export const FarmOutlookCard: React.FC<FarmOutlookCardProps> = ({ outlook }) => {
  const { t } = useTranslation();
  const { summary, spray_suitability, spray_recommendation, irrigation_advice } = outlook;

  const getSprayConfig = (suitability: string) => {
    switch (suitability) {
      case "Favorable":
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
          badgeVariant: "success" as const,
          bgColor: "bg-emerald-50/80 border-emerald-200",
          textColor: "text-emerald-800",
          title: t("weather.sprayFavorable"),
        };
      case "Caution":
        return {
          icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
          badgeVariant: "warning" as const,
          bgColor: "bg-amber-50/80 border-amber-200",
          textColor: "text-amber-800",
          title: t("weather.sprayCaution"),
        };
      case "Unfavorable":
        return {
          icon: <XCircle className="w-5 h-5 text-red-600" />,
          badgeVariant: "danger" as const,
          bgColor: "bg-red-50/80 border-red-200",
          textColor: "text-red-800",
          title: t("weather.sprayUnfavorable"),
        };
      default:
        return {
          icon: <HelpCircle className="w-5 h-5 text-slate-600" />,
          badgeVariant: "neutral" as const,
          bgColor: "bg-slate-50 border-slate-200",
          textColor: "text-slate-800",
          title: suitability,
        };
    }
  };

  const sprayConfig = getSprayConfig(spray_suitability);

  return (
    <div className="bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-card space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-brand-yellow/30 text-brand-green flex items-center justify-center border border-brand-yellow/50">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-brand-text">
              {t("weather.farmOutlookTitle")}
            </h3>
            <p className="text-xs text-brand-text-secondary">
              {t("weather.subtitle")}
            </p>
          </div>
        </div>
        <Badge variant="brand" size="sm">
          {t("common.verified")}
        </Badge>
      </div>

      {/* Main Advisory Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-brand-bg to-brand-surface border border-brand-border/80 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
        <div className="text-sm text-brand-text leading-relaxed">
          <strong className="block text-xs uppercase tracking-wider text-brand-text-secondary mb-1">
            {t("common.trustNotice")}
          </strong>
          {summary}
        </div>
      </div>

      {/* Two Pillars: Spraying & Irrigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Spray Window Suitability */}
        <div className={`p-4 rounded-xl border ${sprayConfig.bgColor} flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <SprayCan className="w-4 h-4 text-brand-text" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-text">
                  {t("weather.spraySuitability")}
                </span>
              </div>
              <Badge variant={sprayConfig.badgeVariant} size="sm">
                {spray_suitability}
              </Badge>
            </div>
            <p className="text-xs text-brand-text leading-relaxed font-medium">
              {spray_recommendation}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-black/5 flex items-center gap-1.5 text-[11px] text-brand-text-secondary">
            {sprayConfig.icon}
            <span>{sprayConfig.title}</span>
          </div>
        </div>

        {/* Irrigation Advice */}
        <div className="p-4 rounded-xl border bg-blue-50/70 border-blue-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Droplet className="w-4 h-4 text-blue-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-text">
                  {t("weather.irrigationAdviceTitle")}
                </span>
              </div>
              <Badge variant="brand" size="sm">
                {t("common.disclaimer")}
              </Badge>
            </div>
            <p className="text-xs text-brand-text leading-relaxed font-medium">
              {irrigation_advice}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-blue-200/60 flex items-center gap-1.5 text-[11px] text-blue-700 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>{t("cropGuide.waterManagement")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
