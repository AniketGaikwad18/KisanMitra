"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Landmark, FileCheck, ExternalLink, Sparkles } from "lucide-react";

export default function SchemesPage() {
  return (
    <AppShell>
      <PageHeader
        title="Government Schemes"
        description="Discover agricultural schemes and support available to you."
        icon={<Landmark className="w-6 h-6 text-brand-green" />}
        badge={<Badge variant="brand">Subsidies & Support</Badge>}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-8 text-center border-dashed border-2 border-brand-border">
          <div className="w-16 h-16 rounded-2xl bg-brand-yellow/30 text-brand-green mx-auto flex items-center justify-center mb-4">
            <FileCheck className="w-8 h-8 text-brand-green" />
          </div>

          <h3 className="text-xl font-bold text-brand-text mb-2">
            Central & State Agricultural Schemes Directory
          </h3>

          <p className="text-sm text-brand-text-secondary max-w-lg mx-auto mb-6 leading-relaxed">
            Curated database of verified government schemes (PM-KISAN, PMFBY, Soil Health Card, Solar Pump subsidies, state initiatives) with eligibility criteria, required documents, and direct application links.
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-bg border border-brand-border text-xs font-semibold text-brand-text-secondary">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span>Scheduled for implementation in Government Schemes Phase</span>
          </div>
        </Card>

        <div className="p-4 rounded-xl border border-brand-border bg-brand-surface flex items-start gap-3">
          <ExternalLink className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
          <div className="text-xs text-brand-text-secondary leading-relaxed">
            <strong className="text-brand-text block mb-0.5">Authentic Sources Only:</strong>
            All scheme data will reference official government ministries and state agriculture departments. No fake or outdated schemes will ever be presented as active.
          </div>
        </div>
      </div>
    </AppShell>
  );
}
