"use client";

import React from "react";
import {
  MapPin,
  RefreshCw,
  Droplets,
  Wind,
  Thermometer,
  CloudRain,
  Sun,
  Sunset,
  Sunrise,
  Clock,
  Compass,
} from "lucide-react";
import { WeatherResponse } from "@/types";
import { WeatherIcon } from "./WeatherIcon";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface CurrentWeatherCardProps {
  weather: WeatherResponse;
  isLoading: boolean;
  onRefresh: () => void;
  onChangeLocation: () => void;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  weather,
  isLoading,
  onRefresh,
  onChangeLocation,
}) => {
  const { current, today, location, updated_at, is_demo } = weather;

  // Format timestamp
  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-[#FAFDF9] to-[#F3F9F1] rounded-2xl border border-brand-border p-6 shadow-card hover:shadow-elevated transition-all">
      {/* Top Location & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-brand-border/60">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-brand-green/10 text-brand-green border border-brand-green/20">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-brand-text">
                {location.name}
              </h2>
              {location.region && (
                <span className="text-xs font-semibold text-brand-text-secondary">
                  ({location.region}, {location.country})
                </span>
              )}
              {is_demo && (
                <Badge variant="warning" size="sm">
                  Offline Demo
                </Badge>
              )}
            </div>
            <p className="text-[11px] text-brand-text-secondary">
              Coordinates: {location.latitude.toFixed(2)}°N, {location.longitude.toFixed(2)}°E
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onChangeLocation}
            className="text-xs font-bold text-brand-green hover:underline px-3 py-1.5 rounded-lg bg-brand-green/10 border border-brand-green/20 hover:bg-brand-green/20 transition-all flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Change location</span>
          </button>

          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            className="text-xs h-8 px-2.5"
            title="Refresh weather data"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-brand-green ${
                isLoading ? "animate-spin" : ""
              }`}
            />
          </Button>
        </div>
      </div>

      {/* Main Temperature and Current Condition Display */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 pb-6 items-center">
        {/* Left Side: Big Temperature and Condition */}
        <div className="md:col-span-6 flex items-center gap-5">
          <div className="p-4 rounded-3xl bg-amber-50/80 border border-amber-100 flex items-center justify-center shadow-subtle">
            <WeatherIcon
              code={current.weather_code}
              condition={current.condition}
              isDay={current.is_day}
              className="w-14 h-14"
            />
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl md:text-6xl font-black text-brand-text tracking-tight">
                {Math.round(current.temperature)}°
              </span>
              <span className="text-2xl font-bold text-brand-text-secondary">
                C
              </span>
            </div>

            <div className="text-lg font-extrabold text-brand-green mt-1">
              {current.condition}
            </div>

            <div className="text-xs font-semibold text-brand-text-secondary mt-0.5">
              Feels like {Math.round(current.feels_like)}°C • High: {Math.round(today.max_temperature)}° / Low: {Math.round(today.min_temperature)}°
            </div>
          </div>
        </div>

        {/* Right Side: Key Meteorological Indicators Grid */}
        <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* Rain Probability */}
          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex flex-col justify-between">
            <div className="flex items-center justify-between text-blue-600 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Rain Prob.</span>
              <Droplets className="w-4 h-4" />
            </div>
            <div className="text-lg font-black text-brand-text">
              {today.rain_probability}%
            </div>
            <span className="text-[10px] text-brand-text-secondary">
              {today.rainfall > 0 ? `${today.rainfall} mm expected` : "No heavy precipitation"}
            </span>
          </div>

          {/* Humidity */}
          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-600 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Humidity</span>
              <Droplets className="w-4 h-4" />
            </div>
            <div className="text-lg font-black text-brand-text">
              {current.humidity}%
            </div>
            <span className="text-[10px] text-brand-text-secondary">
              {current.humidity > 80 ? "High humidity" : current.humidity < 40 ? "Dry atmosphere" : "Moderate moisture"}
            </span>
          </div>

          {/* Wind Speed */}
          <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-100 flex flex-col justify-between">
            <div className="flex items-center justify-between text-sky-600 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Wind</span>
              <Wind className="w-4 h-4" />
            </div>
            <div className="text-lg font-black text-brand-text">
              {current.wind_speed} <span className="text-xs font-normal">km/h</span>
            </div>
            <span className="text-[10px] text-brand-text-secondary">
              {current.wind_speed <= 15 ? "Gentle breeze" : "Breezy conditions"}
            </span>
          </div>

          {/* Precipitation Amount */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-600 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Rainfall</span>
              <CloudRain className="w-4 h-4" />
            </div>
            <div className="text-lg font-black text-brand-text">
              {today.rainfall} <span className="text-xs font-normal">mm</span>
            </div>
            <span className="text-[10px] text-brand-text-secondary">Today total</span>
          </div>

          {/* Sunrise / Sunset */}
          <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100 flex flex-col justify-between col-span-2 sm:col-span-2">
            <div className="flex items-center justify-between text-amber-700 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Sun Hours</span>
              <Sun className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-brand-text">
              <span className="flex items-center gap-1">
                <Sunrise className="w-3.5 h-3.5 text-amber-500" />
                {today.sunrise ? formatTime(today.sunrise) : "06:15 AM"}
              </span>
              <span className="flex items-center gap-1">
                <Sunset className="w-3.5 h-3.5 text-orange-500" />
                {today.sunset ? formatTime(today.sunset) : "06:30 PM"}
              </span>
            </div>
            <span className="text-[10px] text-brand-text-secondary mt-0.5">
              UV Index: {today.uv_index_max ? today.uv_index_max : "Moderate"}
            </span>
          </div>
        </div>
      </div>

      {/* Freshness Footer */}
      <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-text-secondary">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-brand-green" />
          <span>Updated at: <strong className="text-brand-text">{formatTime(updated_at)}</strong></span>
        </span>
        <span className="text-[11px]">Source: Open-Meteo & Agricultural Engine</span>
      </div>
    </div>
  );
};
