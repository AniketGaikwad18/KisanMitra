"use client";

import React from "react";
import { Calendar, Droplets, Wind, CloudRain } from "lucide-react";
import { ForecastDay } from "@/types";
import { WeatherIcon } from "./WeatherIcon";
import { Badge } from "@/components/ui/Badge";

interface ForecastTimelineProps {
  forecast: ForecastDay[];
}

export const ForecastTimeline: React.FC<ForecastTimelineProps> = ({ forecast }) => {
  const formatDate = (dateStr: string) => {
    try {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-card space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-brand-text">
              7-Day Agricultural Forecast
            </h3>
            <p className="text-xs text-brand-text-secondary">
              Plan planting, weeding, spraying, and harvesting schedules
            </p>
          </div>
        </div>
        <Badge variant="outline" size="sm">
          Multi-Day Outlook
        </Badge>
      </div>

      {/* Forecast Cards Container (Responsive Grid / Scroll) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 overflow-x-auto pb-2">
        {forecast.map((day, idx) => {
          const isToday = idx === 0;
          return (
            <div
              key={day.date}
              className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all min-w-[120px] ${
                isToday
                  ? "bg-brand-green/5 border-brand-green/40 shadow-xs ring-1 ring-brand-green/20"
                  : "bg-white border-brand-border hover:border-brand-green/30 hover:bg-neutral-50/50"
              }`}
            >
              {/* Day & Date Header */}
              <div className="text-center pb-2 border-b border-brand-border/60">
                <span className="text-xs font-black text-brand-text block">
                  {isToday ? "Today" : day.day_name}
                </span>
                <span className="text-[10px] text-brand-text-secondary font-medium block">
                  {formatDate(day.date)}
                </span>
              </div>

              {/* Weather Icon & Condition */}
              <div className="flex flex-col items-center justify-center py-3">
                <WeatherIcon
                  code={day.weather_code}
                  condition={day.condition}
                  className="w-8 h-8 mb-1.5"
                />
                <span className="text-[11px] font-bold text-brand-text text-center line-clamp-1" title={day.condition}>
                  {day.condition}
                </span>
              </div>

              {/* Temperatures */}
              <div className="flex items-center justify-center gap-2 py-1.5 bg-neutral-50 rounded-lg text-xs font-bold my-1">
                <span className="text-brand-text">
                  {Math.round(day.max_temperature)}°
                </span>
                <span className="text-brand-text-secondary/70 font-normal">
                  /
                </span>
                <span className="text-brand-text-secondary font-medium">
                  {Math.round(day.min_temperature)}°
                </span>
              </div>

              {/* Rain Probability & Rainfall */}
              <div className="space-y-1 pt-2 border-t border-brand-border/60 text-[10px] text-brand-text-secondary">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-blue-500" />
                    <span>Rain</span>
                  </span>
                  <span className={`font-bold ${day.rain_probability > 50 ? "text-blue-600 font-black" : "text-brand-text"}`}>
                    {day.rain_probability}%
                  </span>
                </div>

                {day.rainfall > 0 && (
                  <div className="flex items-center justify-between text-blue-600 font-semibold">
                    <span className="flex items-center gap-1">
                      <CloudRain className="w-3 h-3" />
                      <span>Amount</span>
                    </span>
                    <span>{day.rainfall}mm</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Wind className="w-3 h-3 text-sky-500" />
                    <span>Wind</span>
                  </span>
                  <span className="font-semibold text-brand-text">
                    {Math.round(day.wind_speed)}k
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
