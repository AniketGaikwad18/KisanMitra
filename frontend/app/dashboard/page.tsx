"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { FarmStatusBanner } from "@/components/dashboard/FarmStatusBanner";
import { TodayAlerts } from "@/components/dashboard/TodayAlerts";
import { KeyMetricCards } from "@/components/dashboard/KeyMetricCards";
import { DashboardQuickActions } from "@/components/dashboard/DashboardQuickActions";
import { CropOverviewCard } from "@/components/dashboard/CropOverviewCard";
import { FarmInsights } from "@/components/dashboard/FarmInsights";
import { SystemHealthIndicator } from "@/components/dashboard/SystemHealthIndicator";
import { useTranslation } from "@/lib/i18n";

export default function DashboardPage() {
  const { t } = useTranslation();

  return (
    <AppShell>
      {/* Top Health Status Bar */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary">
          {t("dashboard.overview")}
        </div>
        <SystemHealthIndicator />
      </div>

      {/* 1. Farm Context & Status Banner */}
      <FarmStatusBanner />

      {/* 2. Important Alerts (Today's Alerts) */}
      <TodayAlerts />

      {/* 3, 4, 5, 6. Key Information Cards (Weather, Soil, Crop Health, Mandi) */}
      <KeyMetricCards />

      {/* 7. Quick Actions (What would you like to do?) */}
      <DashboardQuickActions />

      {/* 8. Additional Insights & Active Crop Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <CropOverviewCard />
        <FarmInsights />
      </div>
    </AppShell>
  );
}
