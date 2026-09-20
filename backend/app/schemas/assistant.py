from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, field_validator

class LocationContext(BaseModel):
    name: Optional[str] = Field(default=None, description="District or city name")
    state: Optional[str] = Field(default=None, description="State name")
    latitude: Optional[float] = Field(default=None, description="Latitude")
    longitude: Optional[float] = Field(default=None, description="Longitude")

class CropContextInfo(BaseModel):
    name: Optional[str] = Field(default=None, description="Crop name (e.g. Soybean, Wheat)")
    variety: Optional[str] = Field(default=None, description="Crop variety")
    season: Optional[str] = Field(default=None, description="Growing season (Kharif/Rabi/Zaid)")

class SoilContextInfo(BaseModel):
    score: Optional[float] = Field(default=None, description="Soil health score (0-100)")
    rating: Optional[str] = Field(default=None, description="Rating band (e.g. Good, Fair)")
    ph: Optional[float] = Field(default=None, description="Soil pH value")
    nitrogen: Optional[str] = Field(default=None, description="Nitrogen status (Low/Medium/High)")
    phosphorus: Optional[str] = Field(default=None, description="Phosphorus status (Low/Medium/High)")
    potassium: Optional[str] = Field(default=None, description="Potassium status (Low/Medium/High)")
    organic_matter: Optional[float] = Field(default=None, description="Organic matter percentage")
    observations: Optional[List[str]] = Field(default_factory=list, description="Key soil observations")

class CropHealthContextInfo(BaseModel):
    crop: Optional[str] = Field(default=None, description="Diagnosed crop name")
    condition: Optional[str] = Field(default=None, description="Diagnosed possible condition or disease")
    severity: Optional[str] = Field(default=None, description="Severity (Healthy/Mild/Moderate/Severe)")
    confidence: Optional[float] = Field(default=None, description="AI diagnosis confidence estimate (0-1)")
    observations: Optional[List[str]] = Field(default_factory=list, description="Observed visual symptoms")
    is_demo: Optional[bool] = Field(default=False, description="Whether diagnosis is a demo output")

class WeatherContextInfo(BaseModel):
    temperature: Optional[float] = Field(default=None, description="Current temperature in Celsius")
    condition: Optional[str] = Field(default=None, description="Weather condition description")
    rain_probability: Optional[float] = Field(default=None, description="Today's rain probability percentage")
    rainfall: Optional[float] = Field(default=None, description="Expected precipitation in mm")
    humidity: Optional[float] = Field(default=None, description="Relative humidity percentage")
    wind_speed: Optional[float] = Field(default=None, description="Wind speed in km/h")
    spray_suitability: Optional[str] = Field(default=None, description="Foliar spray suitability (Favorable/Caution/Unfavorable)")
    irrigation_advice: Optional[str] = Field(default=None, description="Irrigation guidance summary")
    alerts: Optional[List[str]] = Field(default_factory=list, description="Active agricultural alerts")
    is_demo: Optional[bool] = Field(default=False, description="Whether weather data is demo")

class MarketContextInfo(BaseModel):
    commodity: Optional[str] = Field(default=None, description="Mandi commodity name")
    market: Optional[str] = Field(default=None, description="Reported APMC market name")
    min_price: Optional[float] = Field(default=None, description="Minimum reported price in INR")
    max_price: Optional[float] = Field(default=None, description="Maximum reported price in INR")
    modal_price: Optional[float] = Field(default=None, description="Modal (typical) selling price in INR")
    unit: Optional[str] = Field(default="₹/quintal", description="Price unit")
    arrival_date: Optional[str] = Field(default=None, description="Reported arrival date")
    data_status: Optional[str] = Field(default="official", description="official | demo | unavailable")
    is_demo: Optional[bool] = Field(default=False, description="Whether market data is demo")

class FarmerContext(BaseModel):
    language: Optional[str] = Field(default="en", description="Farmer preferred language code (en/mr/hi/ta/te)")
    location: Optional[LocationContext] = Field(default=None, description="Farmer geographic location")
    crop: Optional[CropContextInfo] = Field(default=None, description="Active crop context")
    soil: Optional[SoilContextInfo] = Field(default=None, description="Recent soil health test results")
    crop_health: Optional[CropHealthContextInfo] = Field(default=None, description="Recent AI Crop Doctor diagnostic results")
    weather: Optional[WeatherContextInfo] = Field(default=None, description="Current hyperlocal weather & farm outlook")
    market: Optional[MarketContextInfo] = Field(default=None, description="Current APMC mandi price context")

class AssistantChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000, description="Farmer natural language query")
    context: Optional[FarmerContext] = Field(default=None, description="Structured available farm context")
    language: Optional[str] = Field(default="en", description="Response language code (en, mr, hi, ta, te)")

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: str) -> str:
        trimmed = v.strip()
        if not trimmed:
            raise ValueError("Message cannot be empty or whitespace only.")
        if len(trimmed) > 1000:
            raise ValueError("Message exceeds maximum allowed length of 1000 characters.")
        return trimmed

    @field_validator("language")
    @classmethod
    def validate_language(cls, v: Optional[str]) -> str:
        allowed = {"en", "mr", "hi", "ta", "te"}
        if not v or v.lower() not in allowed:
            return "en"
        return v.lower()

class SourceMetadata(BaseModel):
    type: str = Field(..., description="Source type (weather, soil, crop_doctor, mandi, schemes, crop_guide, general)")
    label: str = Field(..., description="Farmer-friendly label")
    source_name: Optional[str] = Field(default=None, description="Authoritative source origin (e.g. data.gov.in, ICAR, Open-Meteo)")
    url: Optional[str] = Field(default=None, description="Optional official link")

class AssistantResponse(BaseModel):
    answer: str = Field(..., description="Grounded, farmer-friendly response")
    language: str = Field(default="en", description="Language of response")
    confidence: str = Field(default="moderate", description="Communication confidence indicator: high | moderate | limited")
    context_used: List[str] = Field(default_factory=list, description="KisanMitra context sources utilized")
    sources: List[SourceMetadata] = Field(default_factory=list, description="Grounding attribution sources")
    follow_up_question: Optional[str] = Field(default=None, description="Optional clarifying or helpful next question")
    disclaimer: str = Field(default="AI agricultural guidance. Consult local agricultural officers for critical decisions.")
    is_demo: bool = Field(default=False, description="True if response was generated via development fallback")
