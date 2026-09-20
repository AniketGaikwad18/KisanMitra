"use client";

import React, { useEffect } from "react";
import {
  X,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Gift,
  HelpCircle,
  Clock,
  Landmark,
  AlertTriangle,
  Info,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SchemeDetail } from "@/types";
import { useTranslation } from "@/lib/i18n";

interface SchemeDetailModalProps {
  scheme: SchemeDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  scheme,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !scheme) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative bg-brand-surface w-full max-w-3xl rounded-2xl sm:rounded-3xl border border-brand-border shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="scheme-modal-title"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-brand-border bg-brand-bg/50 flex items-start justify-between gap-4 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="success">{scheme.category}</Badge>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-yellow/20 text-brand-text border border-brand-yellow/40">
                {scheme.state}
              </span>
              {scheme.last_verified && (
                <span className="text-[11px] text-brand-text-muted flex items-center gap-1">
                  <Clock className="w-3 h-3 text-brand-green" />
                  {t("schemes.verified", { date: scheme.last_verified })}
                </span>
              )}
            </div>
            <h2
              id="scheme-modal-title"
              className="text-xl sm:text-2xl font-black text-brand-text leading-tight"
            >
              {scheme.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-brand-text-secondary hover:text-brand-text hover:bg-brand-border/40 focus:outline-none focus:ring-2 focus:ring-brand-green transition-colors"
            aria-label={t("common.close")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-brand-text">
          {/* Trust Notice Alert */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed font-medium">
              {t("schemes.officialNotice")}
            </div>
          </div>

          {/* About / Description */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-text-secondary mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-brand-green" />
              {t("schemes.aboutScheme")}
            </h3>
            <p className="text-sm sm:text-base text-brand-text leading-relaxed bg-brand-bg/40 p-4 rounded-xl border border-brand-border/60">
              {scheme.short_description}
            </p>
          </div>

          {/* Target Group */}
          {scheme.target_group && scheme.target_group.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-text-secondary mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-green" />
                {t("schemes.targetGroup")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {scheme.target_group.map((tg, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-3 py-1 rounded-lg bg-brand-green/10 text-brand-green-dark border border-brand-green/20"
                  >
                    ✓ {tg}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-text-secondary mb-2.5 flex items-center gap-2">
              <Gift className="w-4 h-4 text-brand-green" />
              {t("schemes.keyBenefits")}
            </h3>
            <div className="bg-emerald-500/5 rounded-xl border border-emerald-500/20 p-4 space-y-2">
              {scheme.benefits && scheme.benefits.length > 0 ? (
                scheme.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-brand-text leading-relaxed">{b}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-brand-text-muted italic">
                  {t("schemes.infoOnPortal")}
                </p>
              )}
            </div>
          </div>

          {/* Eligibility */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-text-secondary mb-2.5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-green" />
              {t("schemes.whoMayBeEligible")}
            </h3>
            <div className="bg-brand-bg/60 rounded-xl border border-brand-border p-4 space-y-2">
              {scheme.eligibility && scheme.eligibility.length > 0 ? (
                scheme.eligibility.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0 mt-2" />
                    <span className="text-brand-text leading-relaxed">{item}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-brand-text-muted italic">
                  {t("schemes.infoOnPortal")}
                </p>
              )}
            </div>
          </div>

          {/* Required Documents */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-text-secondary mb-2.5 flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-green" />
              {t("schemes.requiredDocuments")}
            </h3>
            <div className="bg-brand-bg/60 rounded-xl border border-brand-border p-4">
              {scheme.documents && scheme.documents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {scheme.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-brand-surface border border-brand-border/70 text-xs font-medium text-brand-text"
                    >
                      <FileText className="w-3.5 h-3.5 text-brand-green flex-shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-brand-text-muted italic">
                  {t("schemes.infoOnPortal")}
                </p>
              )}
            </div>
          </div>

          {/* How to Apply */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-text-secondary mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-green" />
              {t("schemes.howToApply")}
            </h3>
            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 text-sm text-brand-text leading-relaxed">
              {scheme.application_method}
            </div>
          </div>

          {/* Source Attribution & Data Origin */}
          <div className="p-3.5 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-between gap-3 text-xs text-brand-text-secondary">
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-brand-green" />
              <span>
                {t("mandi.source")}: <strong className="text-brand-text">{scheme.source_name}</strong>
              </span>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-brand-surface border border-brand-border">
              {t("schemes.curatedFromGovt")}
            </span>
          </div>
        </div>

        {/* Footer with Primary CTA */}
        <div className="p-4 sm:p-5 border-t border-brand-border bg-brand-bg/80 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 sticky bottom-0 z-20 backdrop-blur-md">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-brand-border text-sm font-semibold text-brand-text hover:bg-brand-surface transition-colors"
          >
            {t("common.close")}
          </button>

          {scheme.official_url && (
            <a
              href={scheme.official_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <span>{t("schemes.viewOfficialInfo")}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
