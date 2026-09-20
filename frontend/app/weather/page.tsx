"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CloudSun, CloudRain, AlertTriangle, Sparkles, Wind, Droplets, Thermometer, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
        <Card className="p-8 text-center border-dashed border-2 border-brand-border bg-gradient-to-b from-brand-surface to-[#F8FBFE]">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-4 border border-blue-100">
            <CloudRain className="w-8 h-8 text-blue-600" />
          </div>

          <h2 className="text-xl font-extrabold text-brand-text mb-2">
            Agricultural Weather Intelligence
          </h2>

          <p className="text-sm text-brand-text-secondary max-w-lg mx-auto mb-6 leading-relaxed">
            Connecting Open-Meteo forecasts with agricultural intelligence: interpreting rain probability, wind speeds, spray window suitability, and extreme weather alerts for your farm coordinates.
          </p>

          <Button
            variant="primary"
            disabled
            className="cursor-not-allowed opacity-75 font-bold mx-auto"
          >
            Connect Weather API (Weather Phase)
          </Button>

          <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-brand-bg border border-brand-border text-xs font-semibold text-brand-text-secondary">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span>Open-Meteo integration and agricultural spray advisory logic scheduled for Weather phase</span>
          </div>
        </Card>

        {/* Demo Forecast Card Preview */}
        <div className="bg-brand-surface rounded-2xl border border-brand-border p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-brand-text">Sample Forecast Preview (Pune, Maharashtra)</h3>
            <Badge variant="warning" size="sm" className="text-[10px]">Demo Data</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center gap-3">
              <Thermometer className="w-6 h-6 text-blue-600" />
              <div>
                <span className="text-[11px] text-brand-text-secondary block">Temperature</span>
                <span className="text-base font-bold text-brand-text">28°C (Max: 31°C)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center gap-3">
              <Droplets className="w-6 h-6 text-blue-600" />
              <div>
                <span className="text-[11px] text-brand-text-secondary block">Rain Probability</span>
                <span className="text-base font-bold text-brand-text">72% (Showers expected)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center gap-3">
              <Wind className="w-6 h-6 text-blue-600" />
              <div>
                <span className="text-[11px] text-brand-text-secondary block">Wind Speed</span>
                <span className="text-base font-bold text-brand-text">14 km/h (Safe for spray)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-brand-border bg-brand-surface flex items-start gap-3 shadow-subtle">
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
