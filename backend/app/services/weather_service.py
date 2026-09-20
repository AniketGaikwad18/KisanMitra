"""
Weather Intelligence Service.
Coordinates weather provider data fetching, location validation, and agricultural analysis.
"""

import logging
from datetime import datetime
from typing import Optional, List, Dict, Any
from fastapi import HTTPException
from app.schemas.weather import (
    WeatherResponse,
    WeatherLocation,
    LocationSearchResult,
)
from app.services.weather_provider import weather_provider
from app.services.weather_analysis_engine import weather_analysis_engine
from app.core.weather_constants import DEFAULT_LOCATION, AGRICULTURAL_LOCATIONS_PRESET

logger = logging.getLogger(__name__)

class WeatherService:
    def __init__(self):
        pass

    async def get_weather(
        self,
        latitude: Optional[float] = None,
        longitude: Optional[float] = None,
        location_name: Optional[str] = None,
    ) -> WeatherResponse:
        """
        Fetch weather intelligence for given coordinates or location name.
        Defaults to Pune, Maharashtra if not provided.
        """
        # Resolve location details
        if latitude is None or longitude is None:
            if location_name and location_name.strip().lower() in AGRICULTURAL_LOCATIONS_PRESET:
                preset = AGRICULTURAL_LOCATIONS_PRESET[location_name.strip().lower()]
                latitude = preset["latitude"]
                longitude = preset["longitude"]
                resolved_location = WeatherLocation(**preset)
            else:
                latitude = DEFAULT_LOCATION["latitude"]
                longitude = DEFAULT_LOCATION["longitude"]
                resolved_location = WeatherLocation(
                    name=location_name or DEFAULT_LOCATION["name"],
                    region=DEFAULT_LOCATION["region"],
                    country=DEFAULT_LOCATION["country"],
                    latitude=latitude,
                    longitude=longitude,
                )
        else:
            resolved_location = WeatherLocation(
                name=location_name or "Farm Location",
                region="Maharashtra",
                country="India",
                latitude=latitude,
                longitude=longitude,
            )

        # Validate coordinates bounds
        if not (-90.0 <= latitude <= 90.0):
            raise HTTPException(status_code=400, detail="Latitude must be between -90 and 90 degrees.")
        if not (-180.0 <= longitude <= 180.0):
            raise HTTPException(status_code=400, detail="Longitude must be between -180 and 180 degrees.")

        # Fetch external meteorological data
        raw_data = await weather_provider.fetch_weather_data(latitude, longitude)
        is_demo = raw_data.get("_is_demo", False)

        current_block = raw_data.get("current", {})
        daily_block = raw_data.get("daily", {})

        # Process through agricultural intelligence engine
        current_weather = weather_analysis_engine.parse_current_weather(current_block)
        today_weather, forecast = weather_analysis_engine.parse_today_and_forecast(daily_block)
        farm_outlook = weather_analysis_engine.evaluate_farm_outlook(current_weather, today_weather)
        agricultural_alerts = weather_analysis_engine.generate_agricultural_alerts(
            current_weather, today_weather, forecast
        )

        now_timestamp = datetime.now().strftime("%I:%M %p, %d %b %Y")

        return WeatherResponse(
            location=resolved_location,
            current=current_weather,
            today=today_weather,
            forecast=forecast,
            farm_outlook=farm_outlook,
            agricultural_alerts=agricultural_alerts,
            updated_at=now_timestamp,
            provider="Open-Meteo",
            is_demo=is_demo,
        )

    async def search_locations(self, query: str) -> List[LocationSearchResult]:
        """
        Search for locations / districts by name.
        """
        results = await weather_provider.search_locations(query)
        return [LocationSearchResult(**r) for r in results]

weather_service = WeatherService()
