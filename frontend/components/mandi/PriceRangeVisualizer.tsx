import React from "react";

interface PriceRangeVisualizerProps {
  minPrice?: number | null;
  maxPrice?: number | null;
  modalPrice?: number | null;
  unit?: string;
  className?: string;
  compact?: boolean;
}

export const PriceRangeVisualizer: React.FC<PriceRangeVisualizerProps> = ({
  minPrice,
  maxPrice,
  modalPrice,
  unit = "₹/q",
  className = "",
  compact = false,
}) => {
  if (minPrice === undefined || minPrice === null || maxPrice === undefined || maxPrice === null) {
    if (modalPrice) {
      return (
        <div className={`text-xs text-brand-text-secondary ${className}`}>
          Modal: <strong className="text-brand-text font-bold">₹{modalPrice.toLocaleString("en-IN")}</strong>
        </div>
      );
    }
    return <span className="text-xs text-brand-text-secondary">—</span>;
  }

  // Calculate modal position percentage between min and max
  const range = maxPrice - minPrice;
  let modalPct = 50;
  if (range > 0 && modalPrice && modalPrice >= minPrice && modalPrice <= maxPrice) {
    modalPct = Math.round(((modalPrice - minPrice) / range) * 100);
  }

  if (compact) {
    return (
      <div className={`space-y-1 ${className}`}>
        <div className="relative w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
          <div className="absolute inset-y-0 bg-brand-green/30 rounded-full left-0 right-0" />
          {modalPrice && (
            <div
              className="absolute top-0 bottom-0 w-2 bg-brand-green rounded-full -ml-1 shadow-xs"
              style={{ left: `${Math.min(Math.max(modalPct, 5), 95)}%` }}
            />
          )}
        </div>
        <div className="flex items-center justify-between text-[10px] text-brand-text-secondary font-medium">
          <span>₹{minPrice.toLocaleString("en-IN")}</span>
          {modalPrice && (
            <span className="font-bold text-brand-text">
              ₹{modalPrice.toLocaleString("en-IN")}
            </span>
          )}
          <span>₹{maxPrice.toLocaleString("en-IN")}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-3 rounded-xl bg-neutral-50/80 border border-brand-border/60 space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-xs text-brand-text-secondary font-medium">
        <span>
          Min: <strong className="text-brand-text">₹{minPrice.toLocaleString("en-IN")}</strong>
        </span>
        {modalPrice && (
          <span className="px-2 py-0.5 rounded-md bg-brand-green/10 text-brand-green font-extrabold border border-brand-green/20">
            Modal: ₹{modalPrice.toLocaleString("en-IN")}
          </span>
        )}
        <span>
          Max: <strong className="text-brand-text">₹{maxPrice.toLocaleString("en-IN")}</strong>
        </span>
      </div>

      <div className="relative w-full h-2 bg-neutral-200 rounded-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-brand-green/40 to-amber-200 rounded-full" />
        {modalPrice && (
          <div
            className="absolute -top-1 w-4 h-4 bg-brand-green rounded-full border-2 border-white shadow-md transform -translate-x-1/2"
            style={{ left: `${Math.min(Math.max(modalPct, 8), 92)}%` }}
            title={`Modal Price: ₹${modalPrice}`}
          />
        )}
      </div>

      <div className="flex items-center justify-between text-[10px] text-brand-text-secondary/70">
        <span>Lower Bound</span>
        <span>Typical Trading Point</span>
        <span>Upper Bound</span>
      </div>
    </div>
  );
};
