"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  CloudSun,
  FlaskConical,
  Sprout,
  Coins,
  ArrowRight,
  TrendingUp,
  Droplets,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const KeyMetricCards: React.FC = () => {
  const [cropStatus, setCropStatus] = useState<{
    crop: string;
    condition: string;
    severity: string;
    isRecent: boolean;
  }>({
    crop: "Soybean",
    condition: "Healthy",
    severity: "Good",
    isRecent: false,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kisanmitra_last_crop_check");
      if (saved) {
        const parsed = JSON.parse(saved);
        setCropStatus({
          crop: parsed.crop || "Soybean",
          condition: parsed.condition || "Healthy",
          severity: parsed.severity || "Good",
          isRecent: true,
        });
      }
    } catch {
      // Ignore
    }
  }, []);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-extrabold text-brand-text tracking-tight">
            Key Farm Indicators
          </h2>
          <p className="text-xs text-brand-text-secondary">
            Essential data streams summarized at a glance
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: WEATHER */}
        <div className="bg-gradient-to-b from-[#FAFDF6] to-white rounded-2xl border border-brand-border p-5 shadow-card hover:border-brand-green/40 hover:shadow-elevated transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary">
                Weather
              </span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:scale-105 transition-transform">
                <CloudSun className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl font-black text-brand-text tracking-tight">
                28°C
              </div>
              <div className="text-sm font-bold text-brand-green">
                Partly Cloudy
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-text-secondary">
              <span className="flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-blue-500" />
                Rain probability
              </span>
              <span className="font-bold text-brand-text">72%</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-brand-border/50">
            <Link
              href="/weather"
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-green hover:underline group-hover:translate-x-0.5 transition-transform"
            >
              <span>View forecast</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* CARD 2: SOIL HEALTH */}
        <div className="bg-gradient-to-b from-[#FDFBF7] to-white rounded-2xl border border-brand-border p-5 shadow-card hover:border-brand-green/40 hover:shadow-elevated transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary">
                Soil Health
              </span>
              <div className="p-2 rounded-xl bg-brand-green/10 text-brand-green border border-brand-green/20 group-hover:scale-105 transition-transform">
                <FlaskConical className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-brand-text tracking-tight">
                  72
                </span>
                <span className="text-sm font-semibold text-brand-text-secondary">
                  / 100
                </span>
              </div>
              <div className="text-sm font-bold text-brand-green flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Good
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="w-full bg-brand-border/60 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-brand-green h-2 rounded-full transition-all duration-500"
                  style={{ width: "72%" }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-brand-text-secondary mt-1">
                <span>Last analysis</span>
                <span className="font-semibold text-brand-text">2 days ago</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-brand-border/50">
            <Link
              href="/soil"
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-green hover:underline group-hover:translate-x-0.5 transition-transform"
            >
              <span>View soil</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* CARD 3: CROP HEALTH (Dynamic AI Scan Sync) */}
        <div className="bg-gradient-to-b from-[#F5FBF3] to-white rounded-2xl border border-brand-border p-5 shadow-card hover:border-brand-green/40 hover:shadow-elevated transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary">
                Crop Health
              </span>
              <div className="p-2 rounded-xl bg-brand-yellow/30 text-brand-green border border-brand-yellow/50 group-hover:scale-105 transition-transform">
                <Sprout className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-black text-brand-green tracking-tight truncate" title={cropStatus.condition}>
                {cropStatus.condition}
              </div>
              <div className="text-sm font-bold text-brand-text truncate">
                {cropStatus.crop}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-text-secondary">
              <span>Last checked</span>
              <span className="font-bold text-brand-text">
                {cropStatus.isRecent ? "Recently scanned" : "Today"}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-brand-border/50">
            <Link
              href="/crop-doctor"
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-green hover:underline group-hover:translate-x-0.5 transition-transform"
            >
              <span>Check crop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* CARD 4: MANDI */}
        <div className="bg-gradient-to-b from-[#FEFDF8] to-white rounded-2xl border border-brand-border p-5 shadow-card hover:border-brand-green/40 hover:shadow-elevated transition-all flex flex-col justify-between group relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary">
                Mandi Price
              </span>
              <Badge variant="warning" size="sm" className="text-[10px] font-bold">
                Demo data
              </Badge>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-bold text-brand-text-secondary">
                Soybean (Pune APMC)
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-brand-text tracking-tight">
                  ₹5,420
                </span>
                <span className="text-xs font-semibold text-brand-text-secondary">
                  /quintal
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-text-secondary">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-brand-green" />
                Trend
              </span>
              <span className="font-bold text-brand-green">+₹120 this week</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-brand-border/50">
            <Link
              href="/mandi"
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-green hover:underline group-hover:translate-x-0.5 transition-transform"
            >
              <span>View markets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
