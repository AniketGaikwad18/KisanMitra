"use client";

import React from "react";
import { Bug, AlertCircle, ShieldAlert, CheckCircle2 } from "lucide-react";
import { CropPestDisease } from "@/types";

interface PestsAndDiseasesListProps {
  items: CropPestDisease[];
}

export const PestsAndDiseasesList: React.FC<PestsAndDiseasesListProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-sm text-brand-text-muted italic p-4 bg-brand-bg rounded-xl border border-brand-border">
        No major pest profiles recorded for this crop.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="p-5 rounded-2xl bg-brand-surface border border-brand-border hover:border-amber-400/60 transition-colors shadow-subtle flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-700">
                <Bug className="w-4 h-4" />
              </div>
              <h4 className="text-base font-bold text-brand-text leading-snug">{item.name}</h4>
            </div>

            {item.description && (
              <p className="text-xs text-brand-text-secondary mb-3 leading-relaxed">
                {item.description}
              </p>
            )}

            {item.symptoms && (
              <div className="mb-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
                <span className="text-xs font-bold text-amber-900 block mb-1">
                  Identified Symptoms:
                </span>
                <p className="text-xs text-brand-text leading-relaxed">{item.symptoms}</p>
              </div>
            )}
          </div>

          {item.management && (
            <div className="mt-2 pt-3 border-t border-brand-border/60">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-brand-green-dark block mb-0.5">
                    Safe IPM Guidance:
                  </span>
                  <p className="text-xs text-brand-text-secondary leading-relaxed">
                    {item.management}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
