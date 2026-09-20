"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CloudSun, CloudRain, AlertTriangle, Sparkles } from "lucide-react";

export default function WeatherPage() {
  return (
    <AppShell>
      <PageHeader
        title="Weather Intelligence"
        description="Get weather information and farm-relevant alerts."
        icon={<CloudSun className="w-6 h-6 text-brand-green" />}
        badge={<Badge variant="brand">Hyperlocal Forecasts</Badge>}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-8 text-center border-dashed border-2 border-brand-border">
          <div className="w-16 h-16 rounded-2xl bg-brand-yellow/30 text-brand-green mx-auto flex items-center justify-center mb-4">
            <CloudRain className="w-8 h-8 text-brand-green" />
          </div>

          <h3 className="text-xl font-bold text-brand-text mb-2">
            Agricultural Weather Intelligence
          </h3>

          <p className="text-sm text-brand-text-secondary max-w-lg mx-auto mb-6 leading-relaxed">
            Connecting Open-Meteo forecasts with agricultural intelligence: interpreting rain probability, wind speeds, spray window suitability, and extreme weather alerts for your farm coordinates.
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-bg border border-brand-border text-xs font-semibold text-brand-text-secondary">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span>Scheduled for implementation in Weather Intelligence Phase</span>
          </div>
        </Card>

        <div className="p-4 rounded-xl border border-brand-border bg-brand-surface flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-brand-warning flex-shrink-0 mt-0.5" />
          <div className="text-xs text-brand-text-secondary leading-relaxed">
            <strong className="text-brand-text block mb-0.5">Agricultural Impact Philosophy:</strong>
            KisanMitra does not merely display temperature numbers; it highlights <em>&quot;What does this weather mean for the farmer?&quot;</em> to help plan sowing, spraying, and harvesting.
          </div>
        </div>
      </div>
    </AppShell>
  );
}
