"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Coins, RefreshCw, AlertTriangle, Store, HelpCircle } from "lucide-react";
import { getMandiPrices, getMandiFilters } from "@/lib/api";
import {
  MandiPriceResponse,
  MandiFilterOptions,
  MandiPriceRecord,
} from "@/types";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { MandiFilterPanel } from "@/components/mandi/MandiFilterPanel";
import { MandiPriceCard } from "@/components/mandi/MandiPriceCard";
import { MandiComparisonTable } from "@/components/mandi/MandiComparisonTable";
import { SourceAttributionCard } from "@/components/mandi/SourceAttributionCard";

const STORAGE_KEY = "kisanmitra_mandi_filters";

export default function MandiPage() {
  const [commodity, setCommodity] = useState<string>("Soybean");
  const [state, setState] = useState<string>("Maharashtra");
  const [district, setDistrict] = useState<string>("Pune");
  const [market, setMarket] = useState<string>("");

  const [filterOptions, setFilterOptions] = useState<MandiFilterOptions | null>(null);
  const [priceData, setPriceData] = useState<MandiPriceResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load saved filters on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.commodity) setCommodity(parsed.commodity);
        if (parsed.state) setState(parsed.state);
        if (parsed.district !== undefined) setDistrict(parsed.district);
        if (parsed.market) setMarket(parsed.market);
      }
    } catch {
      // Storage access error
    }

    // Load filter options from backend
    getMandiFilters().then((res) => {
      if (res.data) {
        setFilterOptions(res.data);
      }
    });
  }, []);

  const fetchPrices = useCallback(
    async (
      comm: string,
      st: string,
      dist: string,
      mkt: string
    ) => {
      setIsLoading(true);
      setError(null);

      const res = await getMandiPrices({
        commodity: comm || undefined,
        state: st || undefined,
        district: dist || undefined,
        market: mkt || undefined,
        limit: 50,
      });

      setIsLoading(false);

      if (res.data) {
        setPriceData(res.data);
        // Persist filter preferences
        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ commodity: comm, state: st, district: dist, market: mkt })
          );
        } catch {
          // Ignore
        }
      } else {
        setError(
          res.error ||
            "Market data is temporarily unavailable. Please check your connection and try again."
        );
      }
    },
    []
  );

  // Initial load
  useEffect(() => {
    fetchPrices(commodity, state, district, market);
  }, []); // Run on initial mount

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    fetchPrices(commodity, state, district, market);
  };

  const handleReset = () => {
    setCommodity("Soybean");
    setState("Maharashtra");
    setDistrict("Pune");
    setMarket("");
    fetchPrices("Soybean", "Maharashtra", "Pune", "");
  };

  const primaryRecord: MandiPriceRecord | null =
    priceData && priceData.records.length > 0 ? priceData.records[0] : null;

  return (
    <AppShell>
      <PageHeader
        title="Mandi Prices"
        description="Check reported market prices before making selling decisions."
        icon={<Coins className="w-6 h-6 text-brand-green" />}
        badge={<Badge variant="brand">APMC Market Intelligence</Badge>}
      />

      <div className="max-w-5xl mx-auto space-y-6 pb-12">
        {/* 1. Filter Panel */}
        <MandiFilterPanel
          commodity={commodity}
          setCommodity={setCommodity}
          state={state}
          setState={setState}
          district={district}
          setDistrict={setDistrict}
          market={market}
          setMarket={setMarket}
          filterOptions={filterOptions}
          isLoading={isLoading}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        {/* 2. Loading State */}
        {isLoading && !priceData && (
          <LoadingState
            message="Checking market prices..."
            description={`Retrieving APMC market arrival reports for ${commodity} in ${district || state}...`}
          />
        )}

        {/* 3. Error State */}
        {error && !priceData && (
          <ErrorState
            title="Market Data Temporarily Unavailable"
            message={error}
            onRetry={() => fetchPrices(commodity, state, district, market)}
          />
        )}

        {/* 4. Loaded Content */}
        {priceData && (
          <div className="space-y-6">
            {priceData.records.length > 0 && primaryRecord ? (
              <>
                {/* Highlight Summary Card for Primary / Top Market */}
                <MandiPriceCard
                  primaryRecord={primaryRecord}
                  dataStatus={priceData.data_status}
                  isDemo={priceData.is_demo}
                  summary={priceData.summary}
                />

                {/* Multi-Market Comparison Table */}
                <MandiComparisonTable
                  records={priceData.records}
                  summary={priceData.summary}
                />
              </>
            ) : (
              /* Empty State (No records for selection) */
              <div className="p-8 text-center bg-brand-surface rounded-2xl border border-brand-border shadow-card space-y-3">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 text-neutral-500 mx-auto flex items-center justify-center">
                  <Store className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-brand-text">
                  No Market Records Found
                </h3>
                <p className="text-xs text-brand-text-secondary max-w-md mx-auto">
                  No arrival records were reported for <strong>{commodity}</strong> in{" "}
                  <strong>{district ? `${district}, ` : ""}{state}</strong> on recent trading dates.
                  Try searching for a neighboring district or resetting filters.
                </p>
              </div>
            )}

            {/* Source Attribution & Advisory Notice */}
            <SourceAttributionCard
              source={priceData.source}
              dataStatus={priceData.data_status}
              isDemo={priceData.is_demo}
            />
          </div>
        )}
      </div>
    </AppShell>
  );
}
