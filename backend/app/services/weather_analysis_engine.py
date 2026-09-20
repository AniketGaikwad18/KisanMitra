"""
Agricultural Weather Analysis Engine.
Translates raw meteorological variables into actionable agricultural farm advisories,
spray windows, irrigation planning, and risk alerts.
"""

from datetime import datetime, date
from typing import Dict, Any, List, Tuple
from app.core.weather_constants import WMO_WEATHER_CODES, ALERT_THRESHOLDS
from app.schemas.weather import (
    CurrentWeather,
    TodayWeather,
    ForecastDay,
    AgriculturalAlert,
    FarmOutlook,
)

class WeatherAnalysisEngine:
    def map_weather_code(self, code: int) -> Tuple[str, str]:
        """Map WMO weather code to condition string and icon name"""
        info = WMO_WEATHER_CODES.get(code, {"condition": "Partly cloudy", "icon": "CloudSun"})
        return info["condition"], info["icon"]

    def parse_current_weather(self, current_data: Dict[str, Any]) -> CurrentWeather:
        """Parse raw current data block from Open-Meteo"""
        code = int(current_data.get("weather_code", 2))
        condition, _ = self.map_weather_code(code)

        return CurrentWeather(
            temperature=round(float(current_data.get("temperature_2m", 28.0)), 1),
            feels_like=round(float(current_data.get("apparent_temperature", 29.0)), 1),
            condition=condition,
            weather_code=code,
            humidity=int(current_data.get("relative_humidity_2m", 70)),
            wind_speed=round(float(current_data.get("wind_speed_10m", 10.0)), 1),
            precipitation=round(float(current_data.get("precipitation", 0.0)), 1),
            is_day=int(current_data.get("is_day", 1)),
        )

    def parse_today_and_forecast(
        self, daily_data: Dict[str, Any]
    ) -> Tuple[TodayWeather, List[ForecastDay]]:
        """Parse 7-day daily forecast and extract today's summary"""
        times = daily_data.get("time", [])
        weather_codes = daily_data.get("weather_code", [])
        temp_maxs = daily_data.get("temperature_2m_max", [])
        temp_mins = daily_data.get("temperature_2m_min", [])
        precip_sums = daily_data.get("precipitation_sum", [])
        precip_probs = daily_data.get("precipitation_probability_max", [])
        wind_maxs = daily_data.get("wind_speed_10m_max", [])
        uv_maxs = daily_data.get("uv_index_max", [])
        sunrises = daily_data.get("sunrise", [])
        sunsets = daily_data.get("sunset", [])

        # Parse Today
        today_rain_prob = int(precip_probs[0]) if precip_probs else 0
        today_rainfall = round(float(precip_sums[0]), 1) if precip_sums else 0.0
        today_min_temp = round(float(temp_mins[0]), 1) if temp_mins else 22.0
        today_max_temp = round(float(temp_maxs[0]), 1) if temp_maxs else 30.0
        today_uv = float(uv_maxs[0]) if uv_maxs and uv_maxs[0] is not None else None
        today_sunrise = sunrises[0].split("T")[1] if sunrises and "T" in sunrises[0] else "06:15"
        today_sunset = sunsets[0].split("T")[1] if sunsets and "T" in sunsets[0] else "18:45"

        today = TodayWeather(
            rain_probability=today_rain_prob,
            rainfall=today_rainfall,
            min_temperature=today_min_temp,
            max_temperature=today_max_temp,
            uv_index_max=today_uv,
            sunrise=today_sunrise,
            sunset=today_sunset,
        )

        # Parse 7-day forecast
        forecast_days = []
        for i in range(len(times)):
            d_str = times[i]
            try:
                d_obj = datetime.strptime(d_str, "%Y-%m-%d").date()
                day_name = "Today" if i == 0 else d_obj.strftime("%A")
            except Exception:
                day_name = f"Day {i+1}"

            code = int(weather_codes[i]) if i < len(weather_codes) else 2
            cond, _ = self.map_weather_code(code)

            forecast_days.append(
                ForecastDay(
                    date=d_str,
                    day_name=day_name,
                    condition=cond,
                    weather_code=code,
                    min_temperature=round(float(temp_mins[i]), 1) if i < len(temp_mins) else 20.0,
                    max_temperature=round(float(temp_maxs[i]), 1) if i < len(temp_maxs) else 30.0,
                    rain_probability=int(precip_probs[i]) if i < len(precip_probs) and precip_probs[i] is not None else 0,
                    rainfall=round(float(precip_sums[i]), 1) if i < len(precip_sums) and precip_sums[i] is not None else 0.0,
                    wind_speed=round(float(wind_maxs[i]), 1) if i < len(wind_maxs) and wind_maxs[i] is not None else 10.0,
                )
            )

        return today, forecast_days

    def evaluate_farm_outlook(
        self, current: CurrentWeather, today: TodayWeather
    ) -> FarmOutlook:
        """Derive overall agricultural outlook, spray windows, and irrigation advice"""
        # 1. Spray Suitability
        if current.wind_speed > 20.0 or today.rain_probability >= 50 or today.rainfall > 1.0:
            spray_suit = "Unfavorable"
            spray_rec = "Foliar spraying not recommended today due to risk of spray drift or wash-off."
        elif current.wind_speed <= 15.0 and today.rain_probability < 30 and 45 <= current.humidity <= 80:
            spray_suit = "Favorable"
            spray_rec = "Favorable conditions for foliar nutrient sprays and crop protection in morning hours."
        else:
            spray_suit = "Caution"
            spray_rec = "Check local wind gusts before commencing foliar applications."

        # 2. Irrigation Advice
        if today.rain_probability >= 60 or today.rainfall >= 5.0:
            irrigation_advice = "Postpone scheduled irrigation; natural rainfall is anticipated."
        elif today.max_temperature >= 35.0 and today.rain_probability < 25:
            irrigation_advice = "High daytime temperatures expected. Consider evening or drip irrigation to prevent moisture stress."
        elif current.humidity < 40 and today.rain_probability < 20:
            irrigation_advice = "Dry atmospheric conditions; monitor soil moisture in shallow-rooted crops."
        else:
            irrigation_advice = "Normal irrigation schedule recommended. Check root-zone moisture before watering."

        # 3. Overall Summary
        if today.rain_probability >= 60:
            summary = "Showers expected today. Prioritize field drainage checks and delay fertilizer broadcasting."
        elif today.max_temperature >= 36.0:
            summary = "Warm and dry conditions today. Ensure adequate hydration for active crops."
        else:
            summary = "Moderate and stable weather today. Favorable for routine field scouting and crop maintenance."

        return FarmOutlook(
            summary=summary,
            spray_suitability=spray_suit,
            spray_recommendation=spray_rec,
            irrigation_advice=irrigation_advice,
        )

    def generate_agricultural_alerts(
        self, current: CurrentWeather, today: TodayWeather, forecast: List[ForecastDay]
    ) -> List[AgriculturalAlert]:
        """Generate structured agricultural warning and advisory alerts"""
        alerts = []
        now_str = datetime.now().strftime("%I:%M %p")

        # 1. Heavy Rain
        if today.rainfall >= ALERT_THRESHOLDS["heavy_rain_mm"]:
            alerts.append(
                AgriculturalAlert(
                    type="rain",
                    severity="high",
                    title="🌧 Heavy Rainfall Alert",
                    message=f"Heavy rainfall ({today.rainfall} mm) expected today. Ensure drainage channels are clear to prevent waterlogging.",
                    timestamp=now_str,
                )
            )
        elif today.rain_probability >= ALERT_THRESHOLDS["high_rain_prob_pct"]:
            alerts.append(
                AgriculturalAlert(
                    type="rain",
                    severity="moderate",
                    title="🌧 Rain Expected Today",
                    message=f"Rain probability is {today.rain_probability}%. Review irrigation and avoid foliar fertilizer application.",
                    timestamp=now_str,
                )
            )

        # 2. Extreme Heat
        if today.max_temperature >= ALERT_THRESHOLDS["extreme_heat_c"]:
            alerts.append(
                AgriculturalAlert(
                    type="temperature",
                    severity="high",
                    title="☀️ Extreme Heat Alert",
                    message=f"High temperatures of {today.max_temperature}°C expected. Protect young nursery seedlings and check mulch coverage.",
                    timestamp=now_str,
                )
            )
        elif today.max_temperature >= ALERT_THRESHOLDS["high_temp_c"]:
            alerts.append(
                AgriculturalAlert(
                    type="temperature",
                    severity="moderate",
                    title="☀️ Warm Conditions",
                    message=f"Daytime temperature will reach {today.max_temperature}°C. Monitor crops for afternoon moisture stress.",
                    timestamp=now_str,
                )
            )

        # 3. Low Temperature / Frost Risk
        if today.min_temperature <= ALERT_THRESHOLDS["frost_risk_c"]:
            alerts.append(
                AgriculturalAlert(
                    type="temperature",
                    severity="high",
                    title="❄️ Frost Risk Caution",
                    message=f"Low night temperatures ({today.min_temperature}°C) pose frost risk to sensitive vegetable and fruit crops.",
                    timestamp=now_str,
                )
            )
        elif today.min_temperature <= ALERT_THRESHOLDS["low_temp_c"]:
            alerts.append(
                AgriculturalAlert(
                    type="temperature",
                    severity="low",
                    title="❄️ Cool Night Advisory",
                    message=f"Overnight temperature around {today.min_temperature}°C. Normal for winter crops like wheat and gram.",
                    timestamp=now_str,
                )
            )

        # 4. Wind Speed
        if current.wind_speed >= ALERT_THRESHOLDS["strong_gale_kmh"]:
            alerts.append(
                AgriculturalAlert(
                    type="wind",
                    severity="high",
                    title="💨 Strong Gale Warning",
                    message=f"Strong winds ({current.wind_speed} km/h) may cause lodging in tall crops (maize/sugarcane) or fruit drop.",
                    timestamp=now_str,
                )
            )
        elif current.wind_speed >= ALERT_THRESHOLDS["high_wind_kmh"]:
            alerts.append(
                AgriculturalAlert(
                    type="wind",
                    severity="moderate",
                    title="💨 Gusty Winds",
                    message=f"Wind speed ({current.wind_speed} km/h) exceeds safe limits for chemical spray operations.",
                    timestamp=now_str,
                )
            )

        # 5. Humidity / Fungal Risk
        if current.humidity >= ALERT_THRESHOLDS["high_humidity_pct"]:
            alerts.append(
                AgriculturalAlert(
                    type="humidity",
                    severity="moderate",
                    title="💧 High Humidity Advisory",
                    message=f"Canopy humidity is {current.humidity}%. Humid conditions favor fungal spore proliferation; inspect crops for early leaf spots.",
                    timestamp=now_str,
                )
            )

        # Ensure at least 1 informative alert exists if conditions are peaceful
        if not alerts:
            alerts.append(
                AgriculturalAlert(
                    type="irrigation",
                    severity="info",
                    title="🌱 Stable Agricultural Weather",
                    message="Weather parameters are within normal seasonal range. Suitable for general field operations and crop scouting.",
                    timestamp=now_str,
                )
            )

        return alerts

weather_analysis_engine = WeatherAnalysisEngine()
