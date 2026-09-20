import React from "react";
import Link from "next/link";
import {
  CloudRain,
  FlaskConical,
  Sprout,
  Coins,
  ArrowRight,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const TodayAlerts: React.FC = () => {
  const alerts = [
    {
      id: "weather-alert",
      icon: <CloudRain className="w-5 h-5 text-blue-600" />,
      title: "🌧 Rain Expected",
      description: "Rain may be expected in the next 24 hours.",
      badge: "Weather",
      badgeVariant: "brand" as const,
      ctaLabel: "View weather",
      ctaHref: "/weather",
      bgColor: "bg-blue-50/40 border-blue-200/60",
    },
    {
      id: "soil-alert",
      icon: <FlaskConical className="w-5 h-5 text-amber-600" />,
      title: "🧪 Soil Attention",
      description: "Your last soil analysis showed that nitrogen may require attention.",
      badge: "Soil",
      badgeVariant: "warning" as const,
      ctaLabel: "View soil",
      ctaHref: "/soil",
      bgColor: "bg-amber-50/40 border-amber-200/60",
    },
    {
      id: "crop-alert",
      icon: <Sprout className="w-5 h-5 text-brand-green" />,
      title: "🌱 Crop Check",
      description: "It may be a good time to check your crop health.",
      badge: "Crop",
      badgeVariant: "success" as const,
      ctaLabel: "Check crop",
      ctaHref: "/crop-doctor",
      bgColor: "bg-brand-green/5 border-brand-green/20",
    },
    {
      id: "market-alert",
      icon: <Coins className="w-5 h-5 text-yellow-700" />,
      title: "💰 Market Update",
      description: "Market information is available for your selected crop.",
      badge: "Market (Demo)",
      badgeVariant: "neutral" as const,
      ctaLabel: "View markets",
      ctaHref: "/mandi",
      bgColor: "bg-yellow-50/40 border-yellow-200/60",
    },
  ];

  return (
    <div className="bg-brand-surface rounded-2xl border border-brand-border p-5 sm:p-6 shadow-card mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-brand-border/70">
        <div className="flex items-center gap-2.5">
          <h2 className="text-xl font-extrabold text-brand-text tracking-tight">
            Today&apos;s Alerts
          </h2>
          <Badge variant="warning" size="sm" className="text-[10px] font-bold">
            Demo Updates
          </Badge>
        </div>
        <span className="text-xs text-brand-text-secondary">
          Demonstration farm notifications
        </span>
      </div>

      {/* Alert Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-xl border ${alert.bgColor} flex flex-col justify-between transition-all hover:shadow-subtle`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white border border-brand-border/60 shadow-subtle flex-shrink-0">
                    {alert.icon}
                  </div>
                  <h3 className="text-sm font-bold text-brand-text">
                    {alert.title}
                  </h3>
                </div>
                <Badge variant={alert.badgeVariant} size="sm" className="text-[10px]">
                  {alert.badge}
                </Badge>
              </div>

              <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed pl-1">
                {alert.description}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-brand-border/40 flex justify-end">
              <Link href={alert.ctaHref}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs font-bold text-brand-green hover:text-brand-green-700 py-1 px-2.5 h-auto"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  {alert.ctaLabel}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center gap-2 text-xs text-brand-text-secondary">
        <Info className="w-4 h-4 text-brand-green flex-shrink-0" />
        <span>
          Real-time alerts will automatically synchronize with your farm coordinates in upcoming phases.
        </span>
      </div>
    </div>
  );
};
