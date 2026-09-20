import React from "react";
import { CloudRain, FlaskConical, Sprout, TrendingUp, Info } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const FarmAlerts: React.FC = () => {
  const alerts = [
    {
      id: "1",
      icon: <CloudRain className="w-5 h-5 text-blue-600" />,
      title: "🌧 Rain expected tomorrow",
      description: "Moderate rain shower predicted in Pune region. Avoid foliar fertilizer application today.",
      time: "2 hours ago",
      type: "warning" as const,
    },
    {
      id: "2",
      icon: <FlaskConical className="w-5 h-5 text-brand-warning" />,
      title: "🧪 Soil nitrogen may require attention",
      description: "Previous test suggests nitrogen is low for the vegetative growth stage of your soybean crop.",
      time: "Yesterday",
      type: "info" as const,
    },
    {
      id: "3",
      icon: <Sprout className="w-5 h-5 text-brand-green" />,
      title: "🌱 Crop health check recommended",
      description: "It has been 7 days since your last leaf scan. Routine checks prevent pest proliferation.",
      time: "3 days ago",
      type: "success" as const,
    },
    {
      id: "4",
      icon: <TrendingUp className="w-5 h-5 text-amber-600" />,
      title: "💰 Market price information updated",
      description: "Soybean price in Pune APMC increased by ₹120/quintal over previous week's average.",
      time: "4 days ago",
      type: "neutral" as const,
    },
  ];

  return (
    <div className="bg-brand-surface rounded-xl border border-brand-border p-5 md:p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-brand-text">Farm Advisory Alerts</h3>
          <Badge variant="warning" size="sm" className="text-[10px]">
            Demo Examples
          </Badge>
        </div>
        <span className="text-xs text-brand-text-secondary hidden sm:inline">
          Demonstration Content Only
        </span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="p-3.5 rounded-xl border border-brand-border/70 bg-brand-bg/40 hover:bg-brand-bg transition-colors flex items-start gap-3.5"
          >
            <div className="p-2 rounded-lg bg-white border border-brand-border/60 shadow-subtle flex-shrink-0 mt-0.5">
              {alert.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-brand-text">{alert.title}</h4>
                <span className="text-[11px] text-brand-text-secondary whitespace-nowrap">
                  {alert.time}
                </span>
              </div>
              <p className="text-xs text-brand-text-secondary mt-1 leading-relaxed">
                {alert.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center gap-2 text-xs text-brand-text-secondary">
        <Info className="w-4 h-4 text-brand-green flex-shrink-0" />
        <span>
          Real-time farm alerts will automatically sync with your location and crop profiles in upcoming phases.
        </span>
      </div>
    </div>
  );
};
