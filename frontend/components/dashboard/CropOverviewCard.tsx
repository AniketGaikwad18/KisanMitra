import React from "react";
import Link from "next/link";
import { Sprout, MapPin, Sun, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const CropOverviewCard: React.FC = () => {
  return (
    <div className="bg-brand-surface rounded-2xl border border-brand-border p-5 sm:p-6 shadow-card flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-border/70">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-green/10 text-brand-green">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-brand-text">Your Crop</h3>
              <p className="text-[11px] text-brand-text-secondary">Primary active field</p>
            </div>
          </div>
          <Badge variant="brand" size="sm">
            Active Crop
          </Badge>
        </div>

        {/* Crop Profile Information */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between p-3 rounded-xl bg-brand-bg border border-brand-border/60">
            <span className="text-xs font-semibold text-brand-text-secondary">Crop Name:</span>
            <span className="text-sm font-bold text-brand-text">Soybean (JS 335)</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="p-2.5 rounded-xl bg-brand-bg/70 border border-brand-border/50">
              <span className="text-[11px] text-brand-text-secondary block">Growing Season</span>
              <span className="font-bold text-brand-text mt-0.5 flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                Kharif
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-brand-bg/70 border border-brand-border/50">
              <span className="text-[11px] text-brand-text-secondary block">Location</span>
              <span className="font-bold text-brand-text mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-green" />
                Pune, MH
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-brand-green/5 border border-brand-green/20">
            <span className="text-xs font-semibold text-brand-text-secondary">Crop Health Status:</span>
            <span className="text-xs font-bold text-brand-green flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-brand-green" />
              Good (Healthy)
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-brand-border/60">
        <Link
          href="/crop-guide"
          className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold text-brand-green hover:underline py-1.5 rounded-lg hover:bg-brand-bg transition-colors"
        >
          <span>View localized crop advisory</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
