"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Coins, TrendingUp, ShieldCheck, Sparkles, Store } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function MandiPage() {
  return (
    <AppShell>
      <PageHeader
        title="Mandi Prices"
        description="Explore market prices and compare available markets."
        icon={<Coins className="w-6 h-6 text-brand-green" />}
        badge={<Badge variant="warning">Market Insights</Badge>}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-8 text-center border-dashed border-2 border-brand-border bg-gradient-to-b from-brand-surface to-[#FEFDF7]">
          <div className="w-16 h-16 rounded-2xl bg-brand-yellow/30 text-brand-green mx-auto flex items-center justify-center mb-4 border border-brand-yellow/50">
            <TrendingUp className="w-8 h-8 text-brand-green" />
          </div>

          <h2 className="text-xl font-extrabold text-brand-text mb-2">
            APMC Market & Mandi Price Discovery
          </h2>

          <p className="text-sm text-brand-text-secondary max-w-lg mx-auto mb-6 leading-relaxed">
            Real APMC market rates, commodity filtering, nearby mandi price comparison, and recent price trend analysis across districts and states.
          </p>

          <Button
            variant="primary"
            disabled
            className="cursor-not-allowed opacity-75 font-bold mx-auto"
          >
            Connect Mandi Data Stream (Mandi Phase)
          </Button>

          <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-brand-bg border border-brand-border text-xs font-semibold text-brand-text-secondary">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span>Official Agmarknet / Data.gov.in integration scheduled for Mandi phase</span>
          </div>
        </Card>

        {/* Demo Mandi Price Table Preview */}
        <div className="bg-brand-surface rounded-2xl border border-brand-border p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-brand-green" />
              <h3 className="text-sm font-bold text-brand-text">Sample Nearby Mandi Prices</h3>
            </div>
            <Badge variant="warning" size="sm" className="text-[10px] font-bold">Demo Data</Badge>
          </div>

          <div className="divide-y divide-brand-border/60 text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <span className="font-bold text-brand-text text-sm block">Pune APMC</span>
                <span className="text-brand-text-secondary">Commodity: Soybean (Yellow)</span>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-brand-text text-sm">₹5,420 / q</span>
                <span className="text-brand-green font-semibold block text-[11px]">+₹120 this week</span>
              </div>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <div>
                <span className="font-bold text-brand-text text-sm block">Baramati APMC</span>
                <span className="text-brand-text-secondary">Commodity: Soybean (Yellow)</span>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-brand-text text-sm">₹5,380 / q</span>
                <span className="text-neutral-500 font-semibold block text-[11px]">Stable</span>
              </div>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <div>
                <span className="font-bold text-brand-text text-sm block">Shirur APMC</span>
                <span className="text-brand-text-secondary">Commodity: Soybean (Yellow)</span>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-brand-text text-sm">₹5,450 / q</span>
                <span className="text-brand-green font-semibold block text-[11px]">+₹150 this week</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-brand-border bg-brand-surface flex items-start gap-3 shadow-subtle">
          <ShieldCheck className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
          <div className="text-xs text-brand-text-secondary leading-relaxed">
            <strong className="text-brand-text block mb-0.5">Trust & Integrity Guarantee:</strong>
            KisanMitra never fabricates live market prices. All market information will be sourced from official public data portals (data.gov.in / Agmarknet), and any temporary demonstration rates are explicitly labeled.
          </div>
        </div>
      </div>
    </AppShell>
  );
}
