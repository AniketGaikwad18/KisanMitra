"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FlaskConical, Sliders, Info, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SoilHealthPage() {
  return (
    <AppShell>
      <PageHeader
        title="Soil Health"
        description="Understand your soil and receive useful crop-care insights."
        icon={<FlaskConical className="w-6 h-6 text-brand-green" />}
        badge={<Badge variant="success">Agronomy Engine</Badge>}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-8 text-center border-dashed border-2 border-brand-border bg-gradient-to-b from-brand-surface to-[#FBFDFB]">
          <div className="w-16 h-16 rounded-2xl bg-brand-green/15 text-brand-green mx-auto flex items-center justify-center mb-4 border border-brand-green/30">
            <Sliders className="w-8 h-8 text-brand-green" />
          </div>

          <h2 className="text-xl font-extrabold text-brand-text mb-2">
            Soil Nutrient & pH Analysis Hub
          </h2>

          <p className="text-sm text-brand-text-secondary max-w-lg mx-auto mb-6 leading-relaxed">
            Input soil parameters such as pH, Nitrogen (N), Phosphorus (P), and Potassium (K) to receive customized fertilizer dosages, organic amendment suggestions, and soil condition ratings.
          </p>

          <Button
            variant="primary"
            disabled
            className="cursor-not-allowed opacity-75 font-bold mx-auto"
          >
            Enter Soil Test Parameters (Upcoming Phase)
          </Button>

          <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-brand-bg border border-brand-border text-xs font-semibold text-brand-text-secondary">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span>Soil algorithm and nutrient calculator scheduled for Soil Health phase</span>
          </div>
        </Card>

        {/* Demo Parameter Overview Preview */}
        <div className="bg-brand-surface rounded-2xl border border-brand-border p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-brand-text">Sample Soil Health Profile (Demo)</h3>
            <Badge variant="warning" size="sm" className="text-[10px]">Demo Data</Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-brand-bg border border-brand-border/60">
              <span className="text-[11px] text-brand-text-secondary block">pH Level</span>
              <span className="text-lg font-black text-brand-text">6.8</span>
              <span className="text-[10px] text-brand-green font-bold block mt-0.5">Optimal</span>
            </div>
            <div className="p-3 rounded-xl bg-brand-bg border border-brand-border/60">
              <span className="text-[11px] text-brand-text-secondary block">Nitrogen (N)</span>
              <span className="text-lg font-black text-brand-text">240 kg/ha</span>
              <span className="text-[10px] text-amber-600 font-bold block mt-0.5">Moderate</span>
            </div>
            <div className="p-3 rounded-xl bg-brand-bg border border-brand-border/60">
              <span className="text-[11px] text-brand-text-secondary block">Phosphorus (P)</span>
              <span className="text-lg font-black text-brand-text">18 kg/ha</span>
              <span className="text-[10px] text-brand-green font-bold block mt-0.5">Good</span>
            </div>
            <div className="p-3 rounded-xl bg-brand-bg border border-brand-border/60">
              <span className="text-[11px] text-brand-text-secondary block">Potassium (K)</span>
              <span className="text-lg font-black text-brand-text">310 kg/ha</span>
              <span className="text-[10px] text-brand-green font-bold block mt-0.5">High</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-brand-border bg-brand-surface flex items-start gap-3 shadow-subtle">
          <Info className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
          <div className="text-xs text-brand-text-secondary leading-relaxed">
            <strong className="text-brand-text block mb-0.5">Decision Support Notice:</strong>
            Soil health recommendations are decision-support guidelines based on standard ICAR/agricultural standards and do not represent certified soil laboratory test certificates.
          </div>
        </div>
      </div>
    </AppShell>
  );
}
