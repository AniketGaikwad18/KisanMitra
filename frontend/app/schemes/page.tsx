"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Landmark, FileCheck, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SchemesPage() {
  const sampleSchemes = [
    {
      title: "PM-KISAN Samman Nidhi",
      desc: "Direct income support of ₹6,000 per year in three equal installments for eligible farmer families.",
      benefit: "₹6,000 / year",
      category: "Central Scheme",
    },
    {
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      desc: "Comprehensive crop insurance cover against non-preventable natural risks from pre-sowing to post-harvest.",
      benefit: "Full Crop Insurance",
      category: "Insurance",
    },
    {
      title: "PM-KUSUM Solar Agriculture Pump Scheme",
      desc: "Subsidies up to 60% for installing standalone solar agricultural water pumps.",
      benefit: "Up to 60% Subsidy",
      category: "Solar / Energy",
    },
  ];

  return (
    <AppShell>
      <PageHeader
        title="Government Schemes"
        description="Discover agricultural schemes and support available to you."
        icon={<Landmark className="w-6 h-6 text-brand-green" />}
        badge={<Badge variant="brand">Subsidies & Support</Badge>}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-8 text-center border-dashed border-2 border-brand-border bg-gradient-to-b from-brand-surface to-[#FDFDF9]">
          <div className="w-16 h-16 rounded-2xl bg-brand-yellow/30 text-brand-green mx-auto flex items-center justify-center mb-4 border border-brand-yellow/50">
            <FileCheck className="w-8 h-8 text-brand-green" />
          </div>

          <h2 className="text-xl font-extrabold text-brand-text mb-2">
            Central & State Agricultural Schemes Directory
          </h2>

          <p className="text-sm text-brand-text-secondary max-w-lg mx-auto mb-6 leading-relaxed">
            Curated database of verified government schemes with eligibility criteria, required documents, and direct application links.
          </p>

          <Button
            variant="primary"
            disabled
            className="cursor-not-allowed opacity-75 font-bold mx-auto"
          >
            Explore Schemes Database (Schemes Phase)
          </Button>

          <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-brand-bg border border-brand-border text-xs font-semibold text-brand-text-secondary">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span>Scheme eligibility matching engine scheduled for Government Schemes phase</span>
          </div>
        </Card>

        {/* Preview of Top Verified Schemes */}
        <div className="bg-brand-surface rounded-2xl border border-brand-border p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-brand-text">Featured Agricultural Support Programs (Demo)</h3>
            <Badge variant="success" size="sm" className="text-[10px]">Verified Programs</Badge>
          </div>

          <div className="space-y-3">
            {sampleSchemes.map((s, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-brand-bg/60 border border-brand-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-brand-text">{s.title}</h4>
                    <Badge variant="neutral" size="sm" className="text-[10px]">{s.category}</Badge>
                  </div>
                  <p className="text-xs text-brand-text-secondary leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-extrabold text-brand-green block">{s.benefit}</span>
                  <span className="text-[11px] text-brand-text-secondary">Active Scheme</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-brand-border bg-brand-surface flex items-start gap-3 shadow-subtle">
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
