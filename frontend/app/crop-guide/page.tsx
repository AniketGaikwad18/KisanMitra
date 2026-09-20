"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Compass, BookOpen, MapPin, Sparkles, Calendar, Droplet, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CropGuidePage() {
  const cropAdvisories = [
    {
      phase: "Vegetative Growth (Days 20–45)",
      irrigation: "Light irrigation every 7–10 days depending on monsoon showers.",
      nutrients: "Foliar spray of 19:19:19 (NPK) @ 1kg/acre to boost branching.",
      pestAlert: "Inspect for stem fly & semilooper larvae on underside of leaves.",
    },
  ];

  return (
    <AppShell>
      <PageHeader
        title="Location-Based Crop Guide"
        description="Explore crop guidance based on your location and crop."
        icon={<Compass className="w-6 h-6 text-brand-green" />}
        badge={<Badge variant="success">Localized Agronomy</Badge>}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-8 text-center border-dashed border-2 border-brand-border bg-gradient-to-b from-brand-surface to-[#F7FBF6]">
          <div className="w-16 h-16 rounded-2xl bg-brand-green/15 text-brand-green mx-auto flex items-center justify-center mb-4 border border-brand-green/30">
            <BookOpen className="w-8 h-8 text-brand-green" />
          </div>

          <h2 className="text-xl font-extrabold text-brand-text mb-2">
            Agro-Climatic Crop Advisory Handbook
          </h2>

          <p className="text-sm text-brand-text-secondary max-w-lg mx-auto mb-6 leading-relaxed">
            Get personalized sowing timelines, irrigation requirements, intercropping recommendations, pest mitigation schedules, and harvesting techniques tailored to your agro-climatic zone.
          </p>

          <Button
            variant="primary"
            disabled
            className="cursor-not-allowed opacity-75 font-bold mx-auto"
          >
            Customize Crop Plan (Crop Guide Phase)
          </Button>

          <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-brand-bg border border-brand-border text-xs font-semibold text-brand-text-secondary">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span>Agro-climatic agronomy handbook scheduled for Crop Guide phase</span>
          </div>
        </Card>

        {/* Demo Stage Guide Preview */}
        <div className="bg-brand-surface rounded-2xl border border-brand-border p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-green" />
              <h3 className="text-sm font-bold text-brand-text">Active Stage Advisory: Soybean (Kharif • Pune)</h3>
            </div>
            <Badge variant="warning" size="sm" className="text-[10px]">Demo Data</Badge>
          </div>

          {cropAdvisories.map((ca, i) => (
            <div key={i} className="p-4 rounded-xl bg-brand-bg/70 border border-brand-border/60 space-y-2.5 text-xs">
              <div className="font-bold text-sm text-brand-text flex items-center justify-between">
                <span>Phase: {ca.phase}</span>
                <Badge variant="brand" size="sm">Current Stage</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <div className="p-2.5 rounded-lg bg-white border border-brand-border/50">
                  <span className="font-bold text-brand-text block mb-0.5 flex items-center gap-1">
                    <Droplet className="w-3.5 h-3.5 text-blue-500" />
                    Irrigation Guidance
                  </span>
                  <p className="text-brand-text-secondary">{ca.irrigation}</p>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-brand-border/50">
                  <span className="font-bold text-brand-text block mb-0.5 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-brand-green" />
                    Pest & Disease Advisory
                  </span>
                  <p className="text-brand-text-secondary">{ca.pestAlert}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl border border-brand-border bg-brand-surface flex items-start gap-3 shadow-subtle">
          <MapPin className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
          <div className="text-xs text-brand-text-secondary leading-relaxed">
            <strong className="text-brand-text block mb-0.5">Localized Knowledge Goal:</strong>
            Moving away from generic agricultural advice by grounding crop guidance in region-specific soil types, seasonal kharif/rabi rainfall patterns, and state agronomy practices.
          </div>
        </div>
      </div>
    </AppShell>
  );
}
