"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Stethoscope, UploadCloud, ShieldAlert, Sparkles } from "lucide-react";

export default function CropDoctorPage() {
  return (
    <AppShell>
      <PageHeader
        title="Crop Doctor"
        description="Upload a crop image to identify possible crop health issues."
        icon={<Stethoscope className="w-6 h-6 text-brand-green" />}
        badge={<Badge variant="brand">AI Vision Module</Badge>}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Main Placeholder Card */}
        <Card className="p-8 text-center border-dashed border-2 border-brand-border">
          <div className="w-16 h-16 rounded-2xl bg-brand-yellow/30 text-brand-green mx-auto flex items-center justify-center mb-4">
            <UploadCloud className="w-8 h-8 text-brand-green" />
          </div>

          <h3 className="text-xl font-bold text-brand-text mb-2">
            AI Crop Health Diagnostic Portal
          </h3>

          <p className="text-sm text-brand-text-secondary max-w-lg mx-auto mb-6 leading-relaxed">
            In the upcoming Crop Doctor phase, farmers will be able to snap or upload a photo of infected leaves/crops to receive assisted disease identification, confidence ratings, and organic/chemical remedies.
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-bg border border-brand-border text-xs font-semibold text-brand-text-secondary">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span>Scheduled for implementation in Phase 2</span>
          </div>
        </Card>

        {/* Safety & Medical Notice Principle */}
        <div className="p-4 rounded-xl border border-brand-border bg-brand-surface flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-brand-warning flex-shrink-0 mt-0.5" />
          <div className="text-xs text-brand-text-secondary leading-relaxed">
            <strong className="text-brand-text block mb-0.5">Assisted Decision Support Notice:</strong>
            AI detection is an assisted prediction designed to aid farmers and does not replace certified laboratory pathology testing or local agricultural officer guidance.
          </div>
        </div>
      </div>
    </AppShell>
  );
}
