"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import {
  ArrowLeft,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  FileText,
  Gift,
  HelpCircle,
  Clock,
  Landmark,
  Layers,
  Info,
} from "lucide-react";
import { getSchemeById } from "@/lib/api";
import { SchemeDetail } from "@/types";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { useTranslation } from "@/lib/i18n";
import Link from "next/link";

export default function SchemeDetailPage() {
  const { t } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const schemeId = params?.id as string;

  const [scheme, setScheme] = useState<SchemeDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!schemeId) return;

    setIsLoading(true);
    setError(null);

    getSchemeById(schemeId).then((res) => {
      setIsLoading(false);
      if (res.data) {
        setScheme(res.data);
      } else {
        setError(res.error || "Scheme details not found or unavailable.");
      }
    });
  }, [schemeId]);

  return (
    <AppShell>
      {/* Back button */}
      <div className="mb-4">
        <Link
          href="/schemes"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-text-secondary hover:text-brand-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t("schemes.backToAll")}</span>
        </Link>
      </div>

      {isLoading ? (
        <LoadingState message={t("schemes.loadingDetails")} />
      ) : error || !scheme ? (
        <ErrorState
          title={t("schemes.schemeNotFound")}
          message={error || t("schemes.schemeNotFoundDesc")}
          onRetry={() => router.push("/schemes")}
        />
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Main Scheme Header Card */}
          <div className="bg-brand-surface rounded-3xl border border-brand-border p-6 sm:p-8 shadow-card">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <Badge variant="success">{scheme.category}</Badge>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-yellow/20 text-brand-text border border-brand-yellow/40">
                {scheme.state}
              </span>
              {scheme.last_verified && (
                <span className="text-xs text-brand-text-muted flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-green" />
                  {t("schemes.verified", { date: scheme.last_verified })}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-brand-text mb-4 leading-snug">
              {scheme.name}
            </h1>

            <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed bg-brand-bg/50 p-4 rounded-2xl border border-brand-border">
              {scheme.short_description}
            </p>
          </div>

          {/* Trust Notice */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
              {t("schemes.officialNotice")}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-brand-surface rounded-3xl border border-brand-border p-6 sm:p-8 shadow-card">
            <h2 className="text-base font-bold uppercase tracking-wider text-brand-text-secondary mb-4 flex items-center gap-2">
              <Gift className="w-5 h-5 text-brand-green" />
              {t("schemes.keyBenefits")}
            </h2>
            <div className="bg-emerald-500/5 rounded-2xl border border-emerald-500/20 p-5 space-y-3">
              {scheme.benefits && scheme.benefits.length > 0 ? (
                scheme.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm sm:text-base">
                    <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-brand-text leading-relaxed font-medium">{b}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-brand-text-muted italic">
                  {t("schemes.infoOnPortal")}
                </p>
              )}
            </div>
          </div>

          {/* Eligibility & Target Group */}
          <div className="bg-brand-surface rounded-3xl border border-brand-border p-6 sm:p-8 shadow-card space-y-6">
            <div>
              <h2 className="text-base font-bold uppercase tracking-wider text-brand-text-secondary mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-green" />
                {t("schemes.targetGroup")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {scheme.target_group.map((tg, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-brand-green/10 text-brand-green-dark border border-brand-green/20"
                  >
                    ✓ {tg}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-base font-bold uppercase tracking-wider text-brand-text-secondary mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-brand-green" />
                {t("schemes.eligibilityCriteria")}
              </h2>
              <div className="bg-brand-bg/60 rounded-2xl border border-brand-border p-5 space-y-2.5">
                {scheme.eligibility.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm sm:text-base">
                    <span className="w-2 h-2 rounded-full bg-brand-green flex-shrink-0 mt-2" />
                    <span className="text-brand-text leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div className="bg-brand-surface rounded-3xl border border-brand-border p-6 sm:p-8 shadow-card">
            <h2 className="text-base font-bold uppercase tracking-wider text-brand-text-secondary mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-green" />
              {t("schemes.requiredDocuments")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scheme.documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-brand-bg border border-brand-border text-sm font-medium text-brand-text"
                >
                  <FileText className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Application Procedure */}
          <div className="bg-brand-surface rounded-3xl border border-brand-border p-6 sm:p-8 shadow-card">
            <h2 className="text-base font-bold uppercase tracking-wider text-brand-text-secondary mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-brand-green" />
              {t("schemes.howToApply")}
            </h2>
            <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20 text-sm sm:text-base text-brand-text leading-relaxed font-medium">
              {scheme.application_method}
            </div>
          </div>

          {/* Official Portal CTA Card */}
          <div className="bg-gradient-to-br from-brand-surface to-brand-green/5 rounded-3xl border border-brand-green/30 p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-brand-green uppercase tracking-wider mb-1">
                <Landmark className="w-4 h-4" />
                <span>{t("schemes.authoritativeSource", { source: scheme.source_name })}</span>
              </div>
              <p className="text-xs text-brand-text-secondary">
                {t("schemes.curatedNotice")}
              </p>
            </div>

            {scheme.official_url && (
              <a
                href={scheme.official_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-brand-green hover:bg-brand-green-dark text-white font-bold shadow-md hover:shadow-lg transition-all text-sm flex-shrink-0"
              >
                <span>{t("schemes.viewOfficialInfo")}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}
