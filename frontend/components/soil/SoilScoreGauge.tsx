import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

export interface SoilScoreGaugeProps {
  score: number;
  rating: string;
}

export const SoilScoreGauge: React.FC<SoilScoreGaugeProps> = ({ score, rating }) => {
  const getRatingTheme = (scoreVal: number) => {
    if (scoreVal < 40) {
      return {
        badgeVariant: "danger" as const,
        textColor: "text-brand-danger",
        barColor: "bg-brand-danger",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        icon: <AlertCircle className="w-5 h-5 text-brand-danger" />,
      };
    } else if (scoreVal < 60) {
      return {
        badgeVariant: "warning" as const,
        textColor: "text-brand-warning",
        barColor: "bg-brand-warning",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        icon: <AlertTriangle className="w-5 h-5 text-brand-warning" />,
      };
    } else if (scoreVal < 80) {
      return {
        badgeVariant: "success" as const,
        textColor: "text-brand-green",
        barColor: "bg-brand-green",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200",
        icon: <CheckCircle2 className="w-5 h-5 text-brand-green" />,
      };
    } else {
      return {
        badgeVariant: "brand" as const,
        textColor: "text-[#44613B]",
        barColor: "bg-[#44613B]",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: <Sparkles className="w-5 h-5 text-[#44613B]" />,
      };
    }
  };

  const theme = getRatingTheme(score);
  const normalizedPercentage = Math.min(100, Math.max(0, score));

  return (
    <div className={`p-6 rounded-2xl border ${theme.borderColor} ${theme.bgColor} flex flex-col md:flex-row items-center justify-between gap-6 shadow-card`}>
      {/* Left Score Block */}
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border border-brand-border flex flex-col items-center justify-center shadow-subtle flex-shrink-0">
          <span className={`text-3xl sm:text-4xl font-black ${theme.textColor} tracking-tight leading-none`}>
            {score}
          </span>
          <span className="text-[11px] font-bold text-brand-text-secondary mt-1">
            / 100
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary">
              Advisory Soil Health Score
            </span>
            <Badge variant={theme.badgeVariant} size="sm" className="font-bold">
              {rating}
            </Badge>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-brand-text">
            Overall Fertility Index
          </h3>

          <p className="text-xs sm:text-sm text-brand-text-secondary mt-0.5 max-w-sm">
            Composite evaluation of pH balance and balanced N, P, K nutrient availability.
          </p>
        </div>
      </div>

      {/* Right Progress Bar & Legend */}
      <div className="w-full md:w-72 flex-shrink-0 space-y-2">
        <div className="flex justify-between text-xs font-semibold text-brand-text">
          <span>Soil Condition</span>
          <span className={theme.textColor}>{rating} ({score}%)</span>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-white h-3 rounded-full overflow-hidden border border-brand-border shadow-inner p-0.5">
          <div
            className={`${theme.barColor} h-2 rounded-full transition-all duration-700 ease-out`}
            style={{ width: `${normalizedPercentage}%` }}
          />
        </div>

        {/* Rating Bands Guide */}
        <div className="flex justify-between text-[10px] text-brand-text-secondary px-0.5 pt-0.5">
          <span className="text-red-600">0–39 Needs Attn</span>
          <span className="text-amber-600">40–59 Fair</span>
          <span className="text-emerald-600">60–79 Good</span>
          <span className="text-green-800 font-semibold">80+ Very Good</span>
        </div>
      </div>
    </div>
  );
};
