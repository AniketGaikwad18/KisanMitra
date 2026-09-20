# backend/app/schemas/__init__.py
from app.schemas.health import HealthResponse
from app.schemas.crop import CropAnalysisResponse
from app.schemas.soil import (
    SoilAnalysisRequest,
    SoilAnalysisResponse,
    SoilParameters,
    SoilParameterResult,
    CropContext,
)
from app.schemas.weather import (
    WeatherLocation,
    CurrentWeather,
    TodayWeather,
    ForecastDay,
    AgriculturalAlert,
    FarmOutlook,
    WeatherResponse,
    LocationSearchResult,
)

__all__ = [
    "HealthResponse",
    "CropAnalysisResponse",
    "SoilAnalysisRequest",
    "SoilAnalysisResponse",
    "SoilParameters",
    "SoilParameterResult",
    "CropContext",
    "WeatherLocation",
    "CurrentWeather",
    "TodayWeather",
    "ForecastDay",
    "AgriculturalAlert",
    "FarmOutlook",
    "WeatherResponse",
    "LocationSearchResult",
]
