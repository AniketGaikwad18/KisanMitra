from typing import List, Optional
from pydantic import BaseModel, Field

class WeatherLocation(BaseModel):
    name: str = Field("Pune", description="City or district name")
    region: str = Field("Maharashtra", description="State or administrative region")
    country: str = Field("India", description="Country name")
    latitude: float = Field(..., ge=-90.0, le=90.0, description="Latitude coordinate")
    longitude: float = Field(..., ge=-180.0, le=180.0, description="Longitude coordinate")

class CurrentWeather(BaseModel):
    temperature: float = Field(..., description="Current temperature in Celsius")
    feels_like: float = Field(..., description="Apparent temperature in Celsius")
    condition: str = Field(..., description="Human-readable condition (e.g., Partly cloudy)")
    weather_code: int = Field(..., description="WMO weather interpretation code")
    humidity: int = Field(..., ge=0, le=100, description="Relative humidity percentage")
    wind_speed: float = Field(..., ge=0.0, description="Wind speed in km/h")
    precipitation: float = Field(..., ge=0.0, description="Current precipitation in mm")
    is_day: int = Field(1, description="1 if day, 0 if night")

class TodayWeather(BaseModel):
    rain_probability: int = Field(..., ge=0, le=100, description="Maximum precipitation probability for today")
    rainfall: float = Field(..., ge=0.0, description="Total expected daily precipitation in mm")
    min_temperature: float = Field(..., description="Minimum temperature in Celsius")
    max_temperature: float = Field(..., description="Maximum temperature in Celsius")
    uv_index_max: Optional[float] = Field(None, description="Peak UV index")
    sunrise: Optional[str] = Field(None, description="Sunrise time string")
    sunset: Optional[str] = Field(None, description="Sunset time string")

class ForecastDay(BaseModel):
    date: str = Field(..., description="Date (YYYY-MM-DD)")
    day_name: str = Field(..., description="Day name (e.g., Monday)")
    condition: str = Field(..., description="Expected weather condition")
    weather_code: int = Field(..., description="WMO weather code")
    min_temperature: float = Field(..., description="Day low temperature in Celsius")
    max_temperature: float = Field(..., description="Day high temperature in Celsius")
    rain_probability: int = Field(..., ge=0, le=100, description="Rainfall probability percentage")
    rainfall: float = Field(..., ge=0.0, description="Expected precipitation in mm")
    wind_speed: float = Field(..., ge=0.0, description="Maximum wind speed in km/h")

class AgriculturalAlert(BaseModel):
    type: str = Field(..., description="Alert category: rain, temperature, wind, humidity, spray_window, irrigation")
    severity: str = Field(..., description="Severity level: info, low, moderate, high")
    title: str = Field(..., description="Short farmer-friendly alert title")
    message: str = Field(..., description="Actionable farm recommendation and advisory")
    timestamp: str = Field(..., description="Time of assessment")

class FarmOutlook(BaseModel):
    summary: str = Field(..., description="Concise overall agricultural impact summary")
    spray_suitability: str = Field(..., description="Foliar spray suitability: Favorable, Caution, or Unfavorable")
    spray_recommendation: str = Field(..., description="Advice on chemical/foliar spray operations")
    irrigation_advice: str = Field(..., description="Advice on irrigation and field moisture management")

class WeatherResponse(BaseModel):
    location: WeatherLocation
    current: CurrentWeather
    today: TodayWeather
    forecast: List[ForecastDay] = Field(default_factory=list, description="5-7 day weather forecast")
    farm_outlook: FarmOutlook
    agricultural_alerts: List[AgriculturalAlert] = Field(default_factory=list, description="Generated agricultural advisories")
    updated_at: str
    provider: str = "Open-Meteo"
    is_demo: bool = False

class LocationSearchResult(BaseModel):
    name: str
    region: str
    country: str
    latitude: float
    longitude: float
