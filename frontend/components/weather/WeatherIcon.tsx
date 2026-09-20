import React from "react";
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudLightning,
  CloudSnow,
  Sparkles,
} from "lucide-react";

interface WeatherIconProps {
  code: number;
  condition?: string;
  isDay?: number;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  code,
  isDay = 1,
  className = "w-6 h-6",
}) => {
  // WMO Code categorization
  if (code === 0) {
    return <Sun className={`${className} text-amber-500`} />;
  }
  if (code === 1 || code === 2) {
    return <CloudSun className={`${className} text-amber-500`} />;
  }
  if (code === 3) {
    return <Cloud className={`${className} text-slate-500`} />;
  }
  if (code === 45 || code === 48) {
    return <CloudFog className={`${className} text-slate-400`} />;
  }
  if (code >= 51 && code <= 57) {
    return <CloudDrizzle className={`${className} text-blue-400`} />;
  }
  if (code >= 61 && code <= 65) {
    return <CloudRain className={`${className} text-blue-500`} />;
  }
  if (code >= 66 && code <= 67) {
    return <CloudRainWind className={`${className} text-blue-600`} />;
  }
  if (code >= 71 && code <= 77) {
    return <CloudSnow className={`${className} text-sky-400`} />;
  }
  if (code >= 80 && code <= 82) {
    return <CloudRainWind className={`${className} text-blue-600`} />;
  }
  if (code >= 85 && code <= 86) {
    return <CloudSnow className={`${className} text-sky-400`} />;
  }
  if (code >= 95 && code <= 99) {
    return <CloudLightning className={`${className} text-purple-600`} />;
  }

  return <Sun className={`${className} text-amber-500`} />;
};
