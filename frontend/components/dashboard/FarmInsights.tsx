"use client";

import React from "react";
import Link from "next/link";
import { CloudRain, FlaskConical, Sprout, ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useTranslation } from "@/lib/i18n";

export const FarmInsights: React.FC = () => {
  const { t } = useTranslation();

  const insights = [
    {
      id: "weather-insight",
      icon: <CloudRain className="w-5 h-5 text-blue-600" />,
      category: "🌧 " + t("nav.weather"),
      text: t("dashboard.weatherAlertDesc"),
      href: "/weather",
      actionText: t("dashboard.checkWeatherTitle"),
    },
    {
      id: "soil-insight",
      icon: <FlaskConical className="w-5 h-5 text-amber-600" />,
      category: "🧪 " + t("nav.soilHealth"),
      text: t("soil.subtitle"),
      href: "/soil",
      actionText: t("dashboard.analyzeSoilTitle"),
    },
    {
      id: "crop-insight",
      icon: <Sprout className="w-5 h-5 text-brand-green" />,
      category: "🌱 " + t("nav.cropDoctor"),
      text: t("cropDoctor.subtitle"),
      href: "/crop-doctor",
      actionText: t("dashboard.checkCropTitle"),
    },
  ];

  return (
    <div className="bg-brand-surface rounded-2xl border border-brand-border p-5 sm:p-6 shadow-card flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-border/70">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-yellow/30 text-brand-text">
              <Sparkles className="w-5 h-5 text-brand-green" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-brand-text">
                {t("dashboard.farmInsightsTitle")}
              </h3>
              <p className="text-[11px] text-brand-text-secondary">
                {t("dashboard.farmInsightsSub")}
              </p>
            </div>
          </div>
          <Badge variant="warning" size="sm" className="text-[10px]">
            {t("common.demo")}
          </Badge>
        </div>

        <div className="space-y-3">
          {insights.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-brand-bg/60 border border-brand-border/60 hover:bg-brand-bg transition-colors flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-white border border-brand-border/50 shadow-subtle flex-shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-text">
                    {item.category}
                  </h4>
                  <p className="text-xs text-brand-text-secondary mt-0.5 leading-snug">
                    {item.text}
                  </p>
                </div>
              </div>

              <Link
                href={item.href}
                className="text-xs font-bold text-brand-green hover:underline flex-shrink-0 whitespace-nowrap mt-1 inline-flex items-center gap-1"
              >
                <span>{item.actionText}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-brand-border/60 text-[11px] text-brand-text-secondary">
        {t("common.trustAdvisory")}: {t("common.curatedGovt")}
      </div>
    </div>
  );
};
