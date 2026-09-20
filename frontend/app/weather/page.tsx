"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { CloudSun, RefreshCw, AlertTriangle, ShieldCheck } from "lucide-react";
import { getWeather } from "@/lib/api";
import { WeatherResponse, WeatherLocation } from "@/types";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { CurrentWeatherCard } from "@/components/weather/CurrentWeatherCard";
import { FarmOutlookCard } from "@/components/weather/FarmOutlookCard";
import { AgriculturalAlertsList } from "@/components/weather/AgriculturalAlertsList";
import { ForecastTimeline } from "@/components/weather/ForecastTimeline";
import { LocationSelectorModal } from "@/components/weather/LocationSelectorModal";
import { useTranslation } from "@/lib/i18n";

const DEFAULT_LOCATION: WeatherLocation = {
  name: "Pune",
  region: "Maharashtra",
  country: "India",
  latitude: 18.5204,
  longitude: 73.8567,
};

const STORAGE_KEY = "kisanmitra_weather_location";

export default function WeatherPage() {
  const { t } = useTranslation();
  const [location, setLocation] = useState<WeatherLocation>(DEFAULT_LOCATION);
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);

  // Load saved location on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.latitude && parsed.longitude && parsed.name) {
          setLocation(parsed);
        }
      }
    } catch {
      // Storage access fail
    }
  }, []);

  const fetchWeather = useCallback(async (loc: WeatherLocation) => {
    setIsLoading(true);
    setError(null);

    const res = await getWeather({
      latitude: loc.latitude,
      longitude: loc.longitude,
      location: loc.name,
    });

    setIsLoading(false);

    if (res.data) {
      setWeatherData(res.data);
      // Persist location
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
      } catch {
        // Ignore storage error
      }
    } else {
      setError(
        res.error ||
          "We couldn't retrieve weather data right now. Please check your connection and try again."
      );
    }
  }, []);

  // Fetch when location changes
  useEffect(() => {
    fetchWeather(location);
  }, [location, fetchWeather]);

  const handleSelectLocation = (newLoc: {
    name: string;
    region?: string;
    country?: string;
    latitude: number;
    longitude: number;
  }) => {
    const updatedLocation: WeatherLocation = {
      name: newLoc.name,
      region: newLoc.region || "Maharashtra",
      country: newLoc.country || "India",
      latitude: newLoc.latitude,
      longitude: newLoc.longitude,
    };
    setLocation(updatedLocation);
  };

  const handleRefresh = () => {
    fetchWeather(location);
  };

  return (
    <AppShell>
      <PageHeader
        title={t("weather.title")}
        description={t("weather.subtitle")}
        icon={<CloudSun className="w-6 h-6 text-brand-green" />}
        badge={<Badge variant="brand">{t("nav.categoryForecast")}</Badge>}
      />

      <div className="max-w-5xl mx-auto space-y-6 pb-12">
        {/* Loading State */}
        {isLoading && !weatherData && (
          <LoadingState
            message={t("common.loading")}
            description={t("weather.subtitle")}
          />
        )}

        {/* Error State */}
        {error && !weatherData && (
          <ErrorState
            title={t("common.error")}
            message={error}
            onRetry={handleRefresh}
          />
        )}

        {/* Loaded Weather Content */}
        {weatherData && (
          <div className="space-y-6">
            {/* 1. Current Weather Card */}
            <CurrentWeatherCard
              weather={weatherData}
              isLoading={isLoading}
              onRefresh={handleRefresh}
              onChangeLocation={() => setIsLocationModalOpen(true)}
            />

            {/* 2. Today's Farm Outlook (Agricultural Translation) */}
            <FarmOutlookCard outlook={weatherData.farm_outlook} />

            {/* 3. Farm Alerts List */}
            <AgriculturalAlertsList alerts={weatherData.agricultural_alerts} />

            {/* 4. 7-Day Forecast */}
            <ForecastTimeline forecast={weatherData.forecast} />

            {/* 5. General Agricultural Advisory Disclaimer */}
            <div className="p-4 rounded-xl border border-brand-border bg-brand-surface flex items-start gap-3 shadow-subtle">
              <ShieldCheck className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
              <div className="text-xs text-brand-text-secondary leading-relaxed">
                <strong className="text-brand-text block mb-0.5">
                  {t("common.trustNotice")}:
                </strong>
                {t("weather.disclaimer")}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Location Selector Modal */}
      <LocationSelectorModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={location}
        onSelectLocation={handleSelectLocation}
      />
    </AppShell>
  );
}
