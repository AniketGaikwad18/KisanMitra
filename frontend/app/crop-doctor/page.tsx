"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Stethoscope, UploadCloud, ShieldAlert, Sparkles, Camera } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CropDoctorPage() {
  return (
    <AppShell>
      <PageHeader
        title="AI Crop Doctor"
        description="Upload a crop image to identify possible crop health issues."
        icon={<Stethoscope className="w-6 h-6 text-brand-green" />}
        badge={<Badge variant="brand">AI Vision Module</Badge>}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Upload Portal Placeholder */}
        <Card className="p-8 text-center border-dashed border-2 border-brand-border bg-gradient-to-b from-brand-surface to-[#FEFDF9]">
          <div className="w-16 h-16 rounded-2xl bg-brand-yellow/30 text-brand-green mx-auto flex items-center justify-center mb-4 border border-brand-yellow/50">
            <UploadCloud className="w-8 h-8 text-brand-green" />
          </div>

          <h2 className="text-xl font-extrabold text-brand-text mb-2">
            AI Crop Health Diagnostic Portal
          </h2>

          <p className="text-sm text-brand-text-secondary max-w-lg mx-auto mb-6 leading-relaxed">
            Upload a clear photo of your plant or leaf. The AI Crop Doctor will identify visible symptoms, calculate confidence levels, and suggest organic and preventive remedies.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="outline"
              disabled
              leftIcon={<Camera className="w-4 h-4 text-brand-green" />}
              className="cursor-not-allowed opacity-75"
            >
              Take Photo (Phase 3)
            </Button>
            <Button
              variant="primary"
              disabled
              leftIcon={<UploadCloud className="w-4 h-4 text-brand-text" />}
              className="cursor-not-allowed opacity-75 font-bold"
            >
              Upload Leaf Image (Phase 3)
            </Button>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-brand-bg border border-brand-border text-xs font-semibold text-brand-text-secondary">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span>Computer Vision & Disease Detection logic scheduled for AI Crop Doctor phase</span>
          </div>
        </Card>

        {/* Empty State Demonstration */}
        <EmptyState
          title="No crop analysis scans yet"
          description="Your previous disease diagnoses and leaf health scans will appear here once submitted."
        />

        {/* Safety & Medical Notice Principle */}
        <div className="p-4 rounded-xl border border-brand-border bg-brand-surface flex items-start gap-3 shadow-subtle">
          <ShieldAlert className="w-5 h-5 text-brand-warning flex-shrink-0 mt-0.5" />
          <div className="text-xs text-brand-text-secondary leading-relaxed">
            <strong className="text-brand-text block mb-0.5">Assisted Decision Support Notice:</strong>
            AI detection is an assisted prediction designed to aid farmers and does not replace certified laboratory pathology testing or local agricultural extension officer guidance.
          </div>
        </div>
      </div>
    </AppShell>
  );
}
