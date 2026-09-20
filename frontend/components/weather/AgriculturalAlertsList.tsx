"use client";

import React from "react";
import {
  AlertTriangle,
  CloudRain,
  Thermometer,
  Wind,
  Droplets,
  SprayCan,
  ShieldCheck,
  AlertCircle,
  Info,
} from "lucide-react";
import { AgriculturalAlert } from "@/types";
import { Badge } from "@/components/ui/Badge";

interface AgriculturalAlertsListProps {
  alerts: AgriculturalAlert[];
}

export const AgriculturalAlertsList: React.FC<AgriculturalAlertsListProps> = ({
  alerts,
}) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "rain":
        return <CloudRain className="w-5 h-5 text-blue-600" />;
      case "temperature":
        return <Thermometer className="w-5 h-5 text-amber-600" />;
      case "wind":
        return <Wind className="w-5 h-5 text-sky-600" />;
      case "humidity":
        return <Droplets className="w-5 h-5 text-emerald-600" />;
      case "spray_window":
        return <SprayCan className="w-5 h-5 text-purple-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-brand-warning" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return <Badge variant="danger" size="sm">High Severity</Badge>;
      case "moderate":
        return <Badge variant="warning" size="sm">Moderate</Badge>;
      case "low":
        return <Badge variant="brand" size="sm">Low Risk</Badge>;
      case "info":
      default:
        return <Badge variant="neutral" size="sm">Advisory</Badge>;
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "bg-brand-danger-light/60 border-brand-danger/30";
      case "moderate":
        return "bg-brand-warning-light/60 border-brand-warning/30";
      case "low":
        return "bg-amber-50/50 border-amber-200/60";
      case "info":
      default:
        return "bg-blue-50/40 border-blue-100";
    }
  };

  return (
    <div className="bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-card space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-brand-text">
              Farm Weather Alerts
            </h3>
            <p className="text-xs text-brand-text-secondary">
              Proactive advisory warnings based on current meteorological thresholds
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-brand-text-secondary">
          {alerts.length} {alerts.length === 1 ? "Active Warning" : "Active Warnings"}
        </span>
      </div>

      {/* Alerts List */}
      {alerts.length > 0 ? (
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div
              key={`${alert.type}-${index}`}
              className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${getSeverityBg(
                alert.severity
              )}`}
            >
              <div className="p-2 rounded-lg bg-white/80 border border-black/5 shadow-xs flex-shrink-0 mt-0.5">
                {getAlertIcon(alert.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                  <h4 className="text-sm font-bold text-brand-text">
                    {alert.title}
                  </h4>
                  {getSeverityBadge(alert.severity)}
                </div>

                <p className="text-xs text-brand-text-secondary leading-relaxed">
                  {alert.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 rounded-xl bg-[#F5FBF3] border border-brand-green/20 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center mb-2 border border-brand-green/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-brand-text mb-1">
            No Severe Weather Alerts
          </h4>
          <p className="text-xs text-brand-text-secondary max-w-md">
            No adverse weather risks (heavy rain, extreme heat, or gale winds) are currently detected for your location. Normal field operations can proceed.
          </p>
        </div>
      )}
    </div>
  );
};
