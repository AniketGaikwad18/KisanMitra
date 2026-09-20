"use client";

import React from "react";
import Link from "next/link";
import {
  Stethoscope,
  FlaskConical,
  CloudSun,
  Coins,
  Compass,
  Landmark,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export const DashboardQuickActions: React.FC = () => {
  const { t } = useTranslation();

  const actions = [
    {
      label: t("dashboard.checkCropTitle"),
      subtitle: t("dashboard.checkCropSub"),
      href: "/crop-doctor",
      icon: <Stethoscope className="w-6 h-6 text-brand-green" />,
    },
    {
      label: t("dashboard.analyzeSoilTitle"),
      subtitle: t("dashboard.analyzeSoilSub"),
      href: "/soil",
      icon: <FlaskConical className="w-6 h-6 text-brand-green" />,
    },
    {
      label: t("dashboard.checkWeatherTitle"),
      subtitle: t("dashboard.checkWeatherSub"),
      href: "/weather",
      icon: <CloudSun className="w-6 h-6 text-brand-green" />,
    },
    {
      label: t("dashboard.checkMandiTitle"),
      subtitle: t("dashboard.checkMandiSub"),
      href: "/mandi",
      icon: <Coins className="w-6 h-6 text-brand-green" />,
    },
    {
      label: t("dashboard.cropGuideTitle"),
      subtitle: t("dashboard.cropGuideSub"),
      href: "/crop-guide",
      icon: <Compass className="w-6 h-6 text-brand-green" />,
    },
    {
      label: t("dashboard.schemesTitle"),
      subtitle: t("dashboard.schemesSub"),
      href: "/schemes",
      icon: <Landmark className="w-6 h-6 text-brand-green" />,
    },
  ];

  return (
    <div className="mb-8">
      <div className="mb-4">
        <h2 className="text-xl font-extrabold text-brand-text tracking-tight">
          {t("dashboard.quickActionsTitle")}
        </h2>
        <p className="text-xs text-brand-text-secondary">
          {t("dashboard.quickActionsSub")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {actions.map((act) => (
          <Link key={act.label} href={act.href} className="block group">
            <div className="h-full p-4 sm:p-5 rounded-2xl border border-brand-border bg-brand-surface hover:border-brand-green/50 hover:shadow-card hover:-translate-y-0.5 active:scale-[0.99] transition-all flex flex-col justify-between">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-brand-yellow/20 flex items-center justify-center border border-brand-yellow/40 group-hover:bg-brand-yellow transition-colors flex-shrink-0">
                  {act.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-brand-text group-hover:text-brand-green transition-colors">
                    {act.label}
                  </h3>
                  <p className="text-xs text-brand-text-secondary mt-0.5 leading-snug">
                    {act.subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-brand-border/40 flex items-center justify-between text-xs font-bold text-brand-green">
                <span>{t("common.startAction")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
