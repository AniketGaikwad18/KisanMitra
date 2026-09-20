"use client";

import React from "react";
import { ExternalLink, ShieldCheck, AlertCircle } from "lucide-react";
import { MandiSource } from "@/types";
import { useTranslation } from "@/lib/i18n";

interface SourceAttributionCardProps {
  source: MandiSource;
  dataStatus: string;
  isDemo: boolean;
}

export const SourceAttributionCard: React.FC<SourceAttributionCardProps> = ({
  source,
  dataStatus,
  isDemo,
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-brand-surface rounded-2xl border border-brand-border p-5 shadow-card space-y-3">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100 flex-shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-brand-text">
              {t("common.officialSource")}
            </h4>
            <p className="text-xs text-brand-text-secondary mt-0.5 font-medium">
              {source.name}
            </p>
          </div>
        </div>

        {source.url && (
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-green hover:underline bg-brand-green/10 px-2.5 py-1 rounded-lg border border-brand-green/20"
          >
            <span>{t("schemes.officialSource")}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      <div className="pt-2 border-t border-brand-border/60 text-xs text-brand-text-secondary leading-relaxed">
        <p className="mb-1">
          {source.description}
        </p>
        <p className="text-[11px] text-brand-text-secondary/80 italic">
          <strong>{t("common.trustNotice")}:</strong> {t("mandi.disclaimer")}
        </p>
      </div>
    </div>
  );
};
