"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { FarmAlerts } from "@/components/dashboard/FarmAlerts";
import { SystemHealthIndicator } from "@/components/dashboard/SystemHealthIndicator";
import { Badge } from "@/components/ui/Badge";
import {
  CloudSun,
  FlaskConical,
  Sprout,
  Coins,
  MapPin,
  Calendar,
} from "lucide-react";

export default function DashboardPage() {
  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <AppShell>
      {/* Header Greeting Banner */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text">
              Good morning, Farmer 👋
            </h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-brand-text-secondary">
            <span className="flex items-center gap-1 font-semibold text-brand-text">
              <MapPin className="w-4 h-4 text-brand-green" />
              Pune, Maharashtra
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-brand-text-secondary" />
              {currentDate}
            </span>
          </div>
        </div>

        {/* Live Backend Connection Indicator */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <SystemHealthIndicator />
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-brand-text">Quick Actions</h2>
          <span className="text-xs text-brand-text-secondary">Instant farm workflows</span>
        </div>
        <QuickActions />
      </div>

      {/* 4 Summary Cards (Demo Data) */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-brand-text">Farm Snapshot</h2>
            <Badge variant="neutral" size="sm" className="text-[10px]">
              Overview
            </Badge>
          </div>
          <span className="text-xs text-brand-text-secondary hidden sm:inline">
            Click any card to explore full module
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Weather */}
          <SummaryCard
            title="Weather"
            icon={<CloudSun className="w-5 h-5 text-brand-green" />}
            primaryValue="28°C"
            secondaryValue="Partly Cloudy"
            supportingText="Rain probability: 72%"
            href="/weather"
            badgeText="Hyperlocal"
            badgeVariant="brand"
          />

          {/* Card 2: Soil Health */}
          <SummaryCard
            title="Soil Health"
            icon={<FlaskConical className="w-5 h-5 text-brand-green" />}
            primaryValue="72 / 100"
            secondaryValue="Good Condition"
            supportingText="Nitrogen levels moderate"
            href="/soil"
            badgeText="Score"
            badgeVariant="success"
          />

          {/* Card 3: Crop Health */}
          <SummaryCard
            title="Crop Health"
            icon={<Sprout className="w-5 h-5 text-brand-green" />}
            primaryValue="Healthy"
            secondaryValue="No major threat detected"
            supportingText="Last checked: Today"
            href="/crop-doctor"
            badgeText="Verified"
            badgeVariant="success"
          />

          {/* Card 4: Mandi (EXPLICIT DEMO DATA) */}
          <SummaryCard
            title="Mandi Price"
            icon={<Coins className="w-5 h-5 text-brand-green" />}
            primaryValue="₹5,420 / q"
            secondaryValue="Soybean (Pune APMC)"
            supportingText="Demo data: Market rates simulated"
            href="/mandi"
            isDemoData={true}
          />
        </div>
      </div>

      {/* Demonstration Farm Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FarmAlerts />
        </div>

        {/* Information & Upcoming Features Card */}
        <div className="bg-brand-surface rounded-xl border border-brand-border p-5 md:p-6 shadow-card flex flex-col justify-between">
          <div>
            <Badge variant="brand" size="sm" className="mb-3">
              Phase 1 Active
            </Badge>
            <h3 className="text-base font-bold text-brand-text mb-2">
              KisanMitra Foundation Ready
            </h3>
            <p className="text-xs text-brand-text-secondary leading-relaxed mb-4">
              All architectural routes and design systems are initialized. AI-powered diagnosis, real-time weather integration, and mandi sync are coming in scheduled phases.
            </p>

            <div className="space-y-2 border-t border-brand-border/60 pt-3 text-xs">
              <div className="flex items-center justify-between text-brand-text-secondary">
                <span>Frontend:</span>
                <span className="font-semibold text-brand-green">Next.js App Router (Ready)</span>
              </div>
              <div className="flex items-center justify-between text-brand-text-secondary">
                <span>Backend:</span>
                <span className="font-semibold text-brand-green">FastAPI REST (Ready)</span>
              </div>
              <div className="flex items-center justify-between text-brand-text-secondary">
                <span>Design System:</span>
                <span className="font-semibold text-brand-green">Farmer-First Palette (Ready)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-brand-border/60 text-[11px] text-brand-text-secondary">
            Built with 🌾 for Indian Farmers.
          </div>
        </div>
      </div>
    </AppShell>
  );
}
