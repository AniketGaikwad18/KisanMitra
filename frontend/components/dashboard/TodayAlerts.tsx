"use client";

import React from "react";
import Link from "next/link";
import {
  CloudRain,
  FlaskConical,
  Sprout,
  Coins,
  ArrowRight,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/lib/i18n";

export const TodayAlerts: React.FC = () => {
  const { t } = useTranslation();

  const alerts = [
    {
      id: "weather-alert",
      icon: <CloudRain className="w-5 h-5 text-blue-600" />,
      title: "🌧 " + t("dashboard.weatherAlert"),
      description: t("dashboard.weatherAlertDesc"),
      badge: t("nav.weather"),
      badgeVariant: "brand" as const,
      ctaLabel: t("dashboard.checkWeatherTitle"),
      ctaHref: "/weather",
      bgColor: "bg-blue-50/40 border-blue-200/60",
    },
    {
      id: "soil-alert",
      icon: <FlaskConical className="w-5 h-5 text-amber-600" />,
      title: "🧪 " + t("dashboard.soilCardTitle"),
      description: t("soil.formSub"),
      badge: t("nav.soilHealth"),
      badgeVariant: "warning" as const,
      ctaLabel: t("dashboard.analyzeSoilTitle"),
      ctaHref: "/soil",
      bgColor: "bg-amber-50/40 border-amber-200/60",
    },
    {
      id: "crop-alert",
      icon: <Sprout className="w-5 h-5 text-brand-green" />,
      title: "🌱 " + t("dashboard.cropDoctorCardTitle"),
      description: t("cropDoctor.subtitle"),
      badge: t("nav.cropDoctor"),
      badgeVariant: "success" as const,
      ctaLabel: t("dashboard.checkCropTitle"),
      ctaHref: "/crop-doctor",
      bgColor: "bg-brand-green/5 border-brand-green/20",
    },
    {
      id: "market-alert",
      icon: <Coins className="w-5 h-5 text-yellow-700" />,
      title: "💰 " + t("dashboard.mandiCardTitle"),
      description: t("mandi.subtitle"),
      badge: t("nav.mandi"),
      badgeVariant: "neutral" as const,
      ctaLabel: t("dashboard.checkMandiTitle"),
      ctaHref: "/mandi",
      bgColor: "bg-yellow-50/40 border-yellow-200/60",
    },
  ];

  return (
    <div className="bg-brand-surface rounded-2xl border border-brand-border p-5 sm:p-6 shadow-card mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-brand-border/70">
        <div className="flex items-center gap-2.5">
          <h2 className="text-xl font-extrabold text-brand-text tracking-tight">
            {t("dashboard.todayAlerts")}
          </h2>
          <Badge variant="warning" size="sm" className="text-[10px] font-bold">
            {t("common.demo")}
          </Badge>
        </div>
        <span className="text-xs text-brand-text-secondary">
          {t("dashboard.todayAlertsSub")}
        </span>
      </div>

      {/* Alert Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-xl border ${alert.bgColor} flex flex-col justify-between transition-all hover:shadow-subtle`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white border border-brand-border/60 shadow-subtle flex-shrink-0">
                    {alert.icon}
                  </div>
                  <h3 className="text-sm font-bold text-brand-text">
                    {alert.title}
                  </h3>
                </div>
                <Badge variant={alert.badgeVariant} size="sm" className="text-[10px]">
                  {alert.badge}
                </Badge>
              </div>

              <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed pl-1">
                {alert.description}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-brand-border/40 flex justify-end">
              <Link href={alert.ctaHref}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs font-bold text-brand-green hover:text-brand-green-700 py-1 px-2.5 h-auto"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  {alert.ctaLabel}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center gap-2 text-xs text-brand-text-secondary">
        <Info className="w-4 h-4 text-brand-green flex-shrink-0" />
        <span>
          {t("schemes.trustNoticeTitle")}: {t("common.curatedGovt")}
        </span>
      </div>
    </div>
  );
};
