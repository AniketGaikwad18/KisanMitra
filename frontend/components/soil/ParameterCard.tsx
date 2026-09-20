import React from "react";
import { Badge } from "@/components/ui/Badge";
import { SoilParameterResult } from "@/types";

export interface ParameterCardProps {
  label: string;
  chemicalSymbol?: string;
  result: SoilParameterResult;
  description?: string;
}

export const ParameterCard: React.FC<ParameterCardProps> = ({
  label,
  chemicalSymbol,
  result,
  description,
}) => {
  const getStatusBadge = (status: string, severity: string) => {
    switch (status.toLowerCase()) {
      case "low":
        return <Badge variant="warning" size="sm">Low</Badge>;
      case "medium":
      case "near neutral":
      case "slightly acidic":
      case "slightly alkaline":
        return <Badge variant="success" size="sm">{status}</Badge>;
      case "high":
        return <Badge variant="brand" size="sm">High</Badge>;
      case "strongly acidic":
      case "strongly alkaline":
        return <Badge variant="danger" size="sm">{status}</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-brand-surface border border-brand-border shadow-card flex flex-col justify-between hover:border-brand-green/40 transition-all">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-extrabold text-brand-text">
              {label}
            </span>
            {chemicalSymbol && (
              <span className="text-[11px] font-bold text-brand-text-secondary bg-brand-bg px-1.5 py-0.5 rounded border border-brand-border">
                {chemicalSymbol}
              </span>
            )}
          </div>
          {getStatusBadge(result.status, result.severity)}
        </div>

        <div className="flex items-baseline gap-1.5 my-2">
          <span className="text-2xl sm:text-3xl font-black text-brand-text tracking-tight">
            {result.value}
          </span>
          <span className="text-xs font-bold text-brand-text-secondary">
            {result.unit}
          </span>
        </div>

        {description && (
          <p className="text-[11px] text-brand-text-secondary leading-snug mt-1">
            {description}
          </p>
        )}
      </div>

      <div className="mt-3 pt-2.5 border-t border-brand-border/50 flex items-center justify-between text-[11px] text-brand-text-secondary">
        <span>Assessed Status</span>
        <span className="font-bold text-brand-text">{result.status}</span>
      </div>
    </div>
  );
};
