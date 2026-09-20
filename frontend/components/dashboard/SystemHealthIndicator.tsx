"use client";

import React, { useEffect, useState } from "react";
import { getBackendHealth } from "@/lib/api";
import { HealthResponse } from "@/types";
import { Activity, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export const SystemHealthIndicator: React.FC = () => {
  const { t } = useTranslation();
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getBackendHealth();
      if (res.data && res.data.status === "ok") {
        setHealth(res.data);
      } else {
        setError(res.error || "Backend unreachable");
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-brand-border bg-brand-surface text-xs shadow-subtle">
      <div className="flex items-center gap-1.5">
        <Activity className="w-3.5 h-3.5 text-brand-green" />
        <span className="font-semibold text-brand-text">API:</span>
      </div>

      {loading ? (
        <span className="text-brand-text-secondary flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping" />
          {t("common.loading")}
        </span>
      ) : health ? (
        <span className="text-brand-green font-bold flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
          {t("common.verified")} ({health.service})
        </span>
      ) : (
        <span className="text-brand-danger font-medium flex items-center gap-1" title={error || "Offline"}>
          <AlertCircle className="w-3.5 h-3.5 text-brand-danger" />
          {t("common.error")}
        </span>
      )}

      <button
        onClick={checkHealth}
        className="p-1 text-brand-text-secondary hover:text-brand-text hover:bg-brand-bg rounded transition-colors"
        title={t("common.retry")}
      >
        <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
      </button>
    </div>
  );
};
