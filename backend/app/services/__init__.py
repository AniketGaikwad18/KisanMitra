# backend/app/services/__init__.py
from app.services.crop_service import crop_service
from app.services.soil_service import soil_service
from app.services.weather_service import weather_service
from app.services.mandi_service import mandi_service
from app.services.scheme_service import scheme_service
from app.services.crop_guide_service import crop_guide_service
from app.services.assistant_service import assistant_service

__all__ = [
    "crop_service",
    "soil_service",
    "weather_service",
    "mandi_service",
    "scheme_service",
    "crop_guide_service",
    "assistant_service",
]
