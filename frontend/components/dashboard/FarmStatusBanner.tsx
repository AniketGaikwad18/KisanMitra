"use client";

import React from "react";
import { Sprout, CheckCircle2, MapPin, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useTranslation } from "@/lib/i18n";

export const FarmStatusBanner: React.FC = () => {
  const { t, formatDate } = useTranslation();
  const currentDate = formatDate(new Date(), {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-gradient-to-r from-brand-surface via-brand-surface to-[#F7F4E9] rounded-2xl border border-brand-border p-5 sm:p-6 shadow-card mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left: Greeting & Location */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text tracking-tight">
              {t("dashboard.greeting")} 👋
            </h1>
          </div>
          <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed">
            {t("dashboard.subtitle")}
          </p>

          <div className="flex items-center gap-3 text-xs sm:text-sm text-brand-text-secondary mt-2.5 flex-wrap">
            <span className="flex items-center gap-1 font-semibold text-brand-text">
              <MapPin className="w-4 h-4 text-brand-green" />
              Pune, Maharashtra
            </span>
            <span className="text-brand-border">•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-brand-text-secondary" />
              {currentDate}
            </span>
          </div>
        </div>

        {/* Right: Your Farm Today Summary Capsule */}
        <div className="bg-white rounded-xl border border-brand-border p-4 shadow-subtle flex items-center gap-4 flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center border border-brand-green/20">
            <Sprout className="w-6 h-6" />
          </div>

          <div className="space-y-0.5 text-xs">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-brand-text-secondary">
              {t("dashboard.activeCropProfile")}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-brand-text text-sm">Crop: Soybean</span>
              <Badge variant="success" size="sm" className="gap-1 font-bold">
                <CheckCircle2 className="w-3 h-3" />
                {t("dashboard.statusGood")}
              </Badge>
            </div>
            <div className="text-[11px] text-brand-text-secondary flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {t("weather.today")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
