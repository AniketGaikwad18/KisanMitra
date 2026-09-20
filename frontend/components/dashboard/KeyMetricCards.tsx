"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  CloudSun,
  FlaskConical,
  Sprout,
  Coins,
  ArrowRight,
  TrendingUp,
  Droplets,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

import { getWeather, getMandiPrices } from "@/lib/api";

export const KeyMetricCards: React.FC = () => {
  const [weatherStatus, setWeatherStatus] = useState<{
    temperature: number | null;
    condition: string;
    rainProbability: number | null;
    locationName: string;
    isLoading: boolean;
    isUnavailable: boolean;
  }>({
    temperature: 28,
    condition: "Partly Cloudy",
    rainProbability: 72,
    locationName: "Pune",
    isLoading: true,
    isUnavailable: false,
  });

  const [mandiStatus, setMandiStatus] = useState<{
    commodity: string;
    market: string;
    modalPrice: number | null;
    unit: string;
    isDemo: boolean;
    dataStatus: string;
    isUnavailable: boolean;
    arrivalDate: string;
  }>({
    commodity: "Soybean",
    market: "Pune APMC",
    modalPrice: 5200,
    unit: "₹/quintal",
    isDemo: true,
    dataStatus: "demo",
    isUnavailable: false,
    arrivalDate: "2026-09-20",
  });


  const [cropStatus, setCropStatus] = useState<{
    crop: string;
    condition: string;
    severity: string;
    isRecent: boolean;
  }>({
    crop: "Soybean",
    condition: "Healthy",
    severity: "Good",
    isRecent: false,
  });

  const [soilStatus, setSoilStatus] = useState<{
    score: number;
    rating: string;
    isRecent: boolean;
  }>({
    score: 72,
    rating: "Good",
    isRecent: false,
  });

  useEffect(() => {
    let isMounted = true;

    // Fetch live weather
    const fetchLiveWeather = async () => {
      try {
        let lat = 18.5204;
        let lon = 73.8567;
        let locName = "Pune";

        const savedLoc = localStorage.getItem("kisanmitra_weather_location");
        if (savedLoc) {
          const parsed = JSON.parse(savedLoc);
          if (parsed.latitude && parsed.longitude) {
            lat = parsed.latitude;
            lon = parsed.longitude;
            locName = parsed.name || locName;
          }
        }

        const res = await getWeather({
          latitude: lat,
          longitude: lon,
          location: locName,
        });

        if (!isMounted) return;

        if (res.data) {
          setWeatherStatus({
            temperature: Math.round(res.data.current.temperature),
            condition: res.data.current.condition,
            rainProbability: res.data.today.rain_probability,
            locationName: res.data.location.name,
            isLoading: false,
            isUnavailable: false,
          });
        } else {
          setWeatherStatus((prev) => ({
            ...prev,
            isLoading: false,
            isUnavailable: true,
          }));
        }
      } catch {
        if (isMounted) {
          setWeatherStatus((prev) => ({
            ...prev,
            isLoading: false,
            isUnavailable: true,
          }));
        }
      }
    };

    fetchLiveWeather();

    // Fetch live Mandi price
    const fetchLiveMandi = async () => {
      try {
        let comm = "Soybean";
        let st = "Maharashtra";
        let dist = "Pune";

        const savedFilters = localStorage.getItem("kisanmitra_mandi_filters");
        if (savedFilters) {
          const parsed = JSON.parse(savedFilters);
          if (parsed.commodity) comm = parsed.commodity;
          if (parsed.state) st = parsed.state;
          if (parsed.district) dist = parsed.district;
        }

        const res = await getMandiPrices({
          commodity: comm,
          state: st,
          district: dist,
          limit: 10,
        });

        if (!isMounted) return;

        const data = res.data;
        if (data && data.records && data.records.length > 0) {
          const top = data.records[0];
          setMandiStatus({
            commodity: top.commodity,
            market: top.market,
            modalPrice: top.modal_price ?? top.max_price ?? 5200,
            unit: top.unit,
            isDemo: data.is_demo,
            dataStatus: data.data_status,
            isUnavailable: false,
            arrivalDate: top.arrival_date || "Today",
          });
        } else if (data) {
          setMandiStatus((prev) => ({
            ...prev,
            isUnavailable: false,
            isDemo: data.is_demo,
            dataStatus: data.data_status,
          }));
        } else {
          setMandiStatus((prev) => ({
            ...prev,
            isUnavailable: true,
          }));
        }

      } catch {
        if (isMounted) {
          setMandiStatus((prev) => ({
            ...prev,
            isUnavailable: true,
          }));
        }
      }
    };

    fetchLiveMandi();

    try {
      // Hydrate crop scan
      const savedCrop = localStorage.getItem("kisanmitra_last_crop_check");
      if (savedCrop) {
        const parsed = JSON.parse(savedCrop);

        setCropStatus({
          crop: parsed.crop || "Soybean",
          condition: parsed.condition || "Healthy",
          severity: parsed.severity || "Good",
          isRecent: true,
        });
      }

      // Hydrate soil assessment
      const savedSoil = localStorage.getItem("kisanmitra_last_soil_check");
      if (savedSoil) {
        const parsedSoil = JSON.parse(savedSoil);
        setSoilStatus({
          score: parsedSoil.score || 72,
          rating: parsedSoil.rating || "Good",
          isRecent: true,
        });
      }
    } catch {
      // Ignore storage errors
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-extrabold text-brand-text tracking-tight">
            Key Farm Indicators
          </h2>
          <p className="text-xs text-brand-text-secondary">
            Essential data streams summarized at a glance
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: WEATHER (Live API Data) */}
        <div className="bg-gradient-to-b from-[#FAFDF6] to-white rounded-2xl border border-brand-border p-5 shadow-card hover:border-brand-green/40 hover:shadow-elevated transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary">
                Weather ({weatherStatus.locationName})
              </span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:scale-105 transition-transform">
                <CloudSun className="w-5 h-5" />
              </div>
            </div>

            {weatherStatus.isUnavailable ? (
              <div className="space-y-1 py-1">
                <div className="text-lg font-bold text-brand-danger">
                  Weather unavailable
                </div>
                <div className="text-xs text-brand-text-secondary">
                  Unable to connect to live provider
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="text-3xl font-black text-brand-text tracking-tight">
                  {weatherStatus.temperature !== null ? `${weatherStatus.temperature}°C` : "..."}
                </div>
                <div className="text-sm font-bold text-brand-green truncate" title={weatherStatus.condition}>
                  {weatherStatus.condition}
                </div>
              </div>
            )}

            <div className="mt-3 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-text-secondary">
              <span className="flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-blue-500" />
                Rain probability
              </span>
              <span className="font-bold text-brand-text">
                {weatherStatus.isUnavailable
                  ? "—"
                  : `${weatherStatus.rainProbability ?? 0}%`}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-brand-border/50">
            <Link
              href="/weather"
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-green hover:underline group-hover:translate-x-0.5 transition-transform"
            >
              <span>View forecast</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* CARD 2: SOIL HEALTH (Dynamic Hydration) */}
        <div className="bg-gradient-to-b from-[#FDFBF7] to-white rounded-2xl border border-brand-border p-5 shadow-card hover:border-brand-green/40 hover:shadow-elevated transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary">
                Soil Health
              </span>
              <div className="p-2 rounded-xl bg-brand-green/10 text-brand-green border border-brand-green/20 group-hover:scale-105 transition-transform">
                <FlaskConical className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-brand-text tracking-tight">
                  {soilStatus.score}
                </span>
                <span className="text-sm font-semibold text-brand-text-secondary">
                  / 100
                </span>
              </div>
              <div className="text-sm font-bold text-brand-green flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                {soilStatus.rating}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="w-full bg-brand-border/60 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-brand-green h-2 rounded-full transition-all duration-500"
                  style={{ width: `${soilStatus.score}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-brand-text-secondary mt-1">
                <span>Last analysis</span>
                <span className="font-semibold text-brand-text">
                  {soilStatus.isRecent ? "Recently assessed" : "2 days ago"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-brand-border/50">
            <Link
              href="/soil"
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-green hover:underline group-hover:translate-x-0.5 transition-transform"
            >
              <span>View soil</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* CARD 3: CROP HEALTH */}
        <div className="bg-gradient-to-b from-[#F5FBF3] to-white rounded-2xl border border-brand-border p-5 shadow-card hover:border-brand-green/40 hover:shadow-elevated transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary">
                Crop Health
              </span>
              <div className="p-2 rounded-xl bg-brand-yellow/30 text-brand-green border border-brand-yellow/50 group-hover:scale-105 transition-transform">
                <Sprout className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-black text-brand-green tracking-tight truncate" title={cropStatus.condition}>
                {cropStatus.condition}
              </div>
              <div className="text-sm font-bold text-brand-text truncate">
                {cropStatus.crop}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-text-secondary">
              <span>Last checked</span>
              <span className="font-bold text-brand-text">
                {cropStatus.isRecent ? "Recently scanned" : "Today"}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-brand-border/50">
            <Link
              href="/crop-doctor"
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-green hover:underline group-hover:translate-x-0.5 transition-transform"
            >
              <span>Check crop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* CARD 4: MANDI (Live API Data & Trust Tag) */}
        <div className="bg-gradient-to-b from-[#FEFDF8] to-white rounded-2xl border border-brand-border p-5 shadow-card hover:border-brand-green/40 hover:shadow-elevated transition-all flex flex-col justify-between group relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary">
                Mandi Price
              </span>
              {mandiStatus.isUnavailable ? (
                <Badge variant="danger" size="sm" className="text-[10px] font-bold">
                  Unavailable
                </Badge>
              ) : mandiStatus.isDemo ? (
                <Badge variant="warning" size="sm" className="text-[10px] font-bold">
                  Demo data
                </Badge>
              ) : (
                <Badge variant="success" size="sm" className="text-[10px] font-bold">
                  Official data
                </Badge>
              )}
            </div>

            {mandiStatus.isUnavailable ? (
              <div className="space-y-1 py-1">
                <div className="text-lg font-bold text-brand-danger">
                  Market data unavailable
                </div>
                <div className="text-xs text-brand-text-secondary">
                  Unable to connect to market source
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="text-sm font-bold text-brand-text-secondary truncate">
                  {mandiStatus.commodity} ({mandiStatus.market})
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-brand-text tracking-tight">
                    {mandiStatus.modalPrice !== null
                      ? `₹${mandiStatus.modalPrice.toLocaleString("en-IN")}`
                      : "—"}
                  </span>
                  <span className="text-xs font-semibold text-brand-text-secondary">
                    / {mandiStatus.unit.replace("₹/", "")}
                  </span>
                </div>
              </div>
            )}

            <div className="mt-3 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-text-secondary">
              <span className="flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-brand-green" />
                Modal quotation
              </span>
              <span className="font-bold text-brand-text">
                {mandiStatus.isUnavailable ? "—" : mandiStatus.arrivalDate}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-brand-border/50">
            <Link
              href="/mandi"
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-green hover:underline group-hover:translate-x-0.5 transition-transform"
            >
              <span>View markets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
