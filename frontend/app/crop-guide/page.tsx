"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Compass, BookOpen, MapPin, Sparkles } from "lucide-react";

export default function CropGuidePage() {
  return (
    <AppShell>
      <PageHeader
        title="Location-Based Crop Guide"
        description="Explore crop guidance based on your location and crop."
        icon={<Compass className="w-6 h-6 text-brand-green" />}
        badge={<Badge variant="success">Localized Agronomy</Badge>}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-8 text-center border-dashed border-2 border-brand-border">
          <div className="w-16 h-16 rounded-2xl bg-brand-green/15 text-brand-green mx-auto flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-brand-green" />
          </div>

          <h3 className="text-xl font-bold text-brand-text mb-2">
            Agro-Climatic Crop Advisory Handbook
          </h3>

          <p className="text-sm text-brand-text-secondary max-w-lg mx-auto mb-6 leading-relaxed">
            Get personalized sowing timelines, irrigation requirements, intercropping recommendations, pest mitigation schedules, and harvesting techniques tailored to your agro-climatic zone.
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-bg border border-brand-border text-xs font-semibold text-brand-text-secondary">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span>Scheduled for implementation in Crop Guide Phase</span>
          </div>
        </Card>

        <div className="p-4 rounded-xl border border-brand-border bg-brand-surface flex items-start gap-3">
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
