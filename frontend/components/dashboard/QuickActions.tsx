import React from "react";
import Link from "next/link";
import { Stethoscope, FlaskConical, CloudSun, Coins } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const QuickActions: React.FC = () => {
  const actions = [
    {
      label: "Check Crop",
      href: "/crop-doctor",
      icon: <Stethoscope className="w-5 h-5 text-brand-green" />,
      description: "AI leaf disease detection",
      variant: "primary" as const,
    },
    {
      label: "Analyze Soil",
      href: "/soil",
      icon: <FlaskConical className="w-5 h-5 text-brand-green" />,
      description: "NPK & pH insights",
      variant: "outline" as const,
    },
    {
      label: "Check Weather",
      href: "/weather",
      icon: <CloudSun className="w-5 h-5 text-brand-green" />,
      description: "Forecast & advisory alerts",
      variant: "outline" as const,
    },
    {
      label: "View Mandi",
      href: "/mandi",
      icon: <Coins className="w-5 h-5 text-brand-green" />,
      description: "Market price discovery",
      variant: "outline" as const,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {actions.map((action) => (
        <Link key={action.label} href={action.href} className="block group">
          <div className="h-full p-4 rounded-xl border border-brand-border bg-brand-surface hover:border-brand-green/50 hover:shadow-card hover:-translate-y-0.5 transition-all flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-lg bg-brand-yellow/20 group-hover:bg-brand-yellow transition-colors flex-shrink-0">
                {action.icon}
              </div>
              <div>
                <span className="font-bold text-sm md:text-base text-brand-text group-hover:text-brand-green transition-colors">
                  {action.label}
                </span>
                <p className="text-[11px] text-brand-text-secondary line-clamp-1">
                  {action.description}
                </p>
              </div>
            </div>
            <div className="w-full mt-2 pt-2 border-t border-brand-border/40 text-right">
              <span className="text-xs font-semibold text-brand-green group-hover:underline">
                Open →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
