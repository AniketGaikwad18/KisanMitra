"""
Open-Meteo Weather API Provider & Geocoding Client.
Handles external API communication with timeouts, normalization, and development fallback.
"""

import logging
from datetime import datetime, date, timedelta
from typing import Dict, Any, List, Optional
import httpx
from app.core.config import settings
from app.core.weather_constants import (
    WMO_WEATHER_CODES,
    DEFAULT_LOCATION,
    AGRICULTURAL_LOCATIONS_PRESET,
)

logger = logging.getLogger(__name__)

class WeatherProvider:
    def __init__(self):
        self.forecast_api_url = settings.WEATHER_API_URL or "https://api.open-meteo.com/v1/forecast"
        self.geocoding_api_url = "https://geocoding-api.open-meteo.com/v1/search"
        self.timeout_seconds = 10.0

    async def fetch_weather_data(self, latitude: float, longitude: float) -> Dict[str, Any]:
        """
        Fetch current and 7-day daily forecast data from Open-Meteo.
        """
        params = {
            "latitude": latitude,
            "longitude": longitude,
            "current": "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m",
            "daily": "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max,sunrise,sunset",
            "timezone": "auto"
        }

        try:
            async with httpx.AsyncClient(timeout=self.timeout_seconds) as client:
                response = await client.get(self.forecast_api_url, params=params)

            if response.status_code == 200:
                data = response.json()
                data["_is_demo"] = False
                return data
            else:
                logger.warning(f"Open-Meteo forecast API returned status {response.status_code}: {response.text}")
                return self._mock_weather_data(latitude, longitude)

        except Exception as e:
            logger.warning(f"Failed to fetch weather from Open-Meteo ({str(e)}). Using reliable fallback.")
            return self._mock_weather_data(latitude, longitude)

    async def search_locations(self, query: str) -> List[Dict[str, Any]]:
        """
        Search for cities/districts by name using Open-Meteo Geocoding API with preset fallbacks.
        """
        clean_query = query.strip().lower()
        if not clean_query:
            return [DEFAULT_LOCATION]

        # Check local agricultural presets first for ultra-fast response
        preset_matches = []
        for key, loc in AGRICULTURAL_LOCATIONS_PRESET.items():
            if clean_query in key or clean_query in loc["name"].lower():
                preset_matches.append(loc)

        if preset_matches:
            return preset_matches

        try:
            params = {
                "name": query,
                "count": 5,
                "language": "en",
                "format": "json"
            }
            async with httpx.AsyncClient(timeout=5.0) as client:
                response = await client.get(self.geocoding_api_url, params=params)

            if response.status_code == 200:
                data = response.json()
                results = []
                for item in data.get("results", []):
                    results.append({
                        "name": item.get("name", query),
                        "region": item.get("admin1", item.get("country", "India")),
                        "country": item.get("country", "India"),
                        "latitude": round(item.get("latitude", 18.5204), 4),
                        "longitude": round(item.get("longitude", 73.8567), 4)
                    })
                if results:
                    return results

        except Exception as e:
            logger.warning(f"Geocoding search failed: {str(e)}")

        # Fallback to default
        return [DEFAULT_LOCATION]

    def _mock_weather_data(self, latitude: float, longitude: float) -> Dict[str, Any]:
        """
        Deterministic development fallback when external network is unavailable.
        """
        today = date.today()
        dates = [(today + timedelta(days=i)).isoformat() for i in range(7)]
        
        return {
            "_is_demo": True,
            "latitude": latitude,
            "longitude": longitude,
            "current": {
                "temperature_2m": 28.4,
                "relative_humidity_2m": 72,
                "apparent_temperature": 29.8,
                "is_day": 1,
                "precipitation": 0.2,
                "weather_code": 2,  # Partly cloudy
                "wind_speed_10m": 12.5,
            },
            "daily": {
                "time": dates,
                "weather_code": [2, 61, 80, 2, 1, 0, 2],
                "temperature_2m_max": [29.5, 27.8, 26.5, 30.2, 31.0, 31.5, 30.0],
                "temperature_2m_min": [22.4, 21.8, 21.0, 22.0, 22.5, 23.0, 22.2],
                "precipitation_sum": [3.2, 8.5, 12.0, 0.0, 0.0, 0.0, 1.2],
                "precipitation_probability_max": [72, 80, 85, 20, 10, 5, 25],
                "wind_speed_10m_max": [14.0, 18.2, 16.5, 11.0, 9.5, 10.0, 12.0],
                "uv_index_max": [6.2, 4.5, 4.0, 7.8, 8.2, 8.5, 7.0],
                "sunrise": [f"{d}T06:15" for d in dates],
                "sunset": [f"{d}T18:45" for d in dates]
            }
        }

weather_provider = WeatherProvider()
