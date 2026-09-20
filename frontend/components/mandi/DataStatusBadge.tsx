import React from "react";
import { ShieldCheck, AlertTriangle, AlertCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface DataStatusBadgeProps {
  status: "official" | "demo" | "unavailable" | string;
  isDemo?: boolean;
  className?: string;
}

export const DataStatusBadge: React.FC<DataStatusBadgeProps> = ({
  status,
  isDemo = false,
  className = "",
}) => {
  if (status === "official" && !isDemo) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs ${className}`}
      >
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
        <span>Official Market Data</span>
      </span>
    );
  }

  if (status === "demo" || isDemo) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 shadow-xs ${className}`}
        title="Development fallback data - not live government market prices"
      >
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
        <span>Demo Data — Not Live</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200 ${className}`}
    >
      <AlertCircle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
      <span>Market Data Unavailable</span>
    </span>
  );
};
