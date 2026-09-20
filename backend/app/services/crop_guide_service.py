"""
Crop Guide Service.
Provides comprehensive agronomic guidance, soil compatibility, water planning,
pest mitigation, and harvest practices for major Indian crops.
"""

from typing import List, Optional, Dict, Any
from fastapi import HTTPException, status
from app.core.crop_guide_constants import SUPPORTED_CROP_PROFILES
from app.schemas.crop_guide import (
    CropSummary,
    CropGuideResponse,
    CropListResponse,
    CropSoilInfo,
    CropSowingInfo,
    CropWaterInfo,
    CropNutritionInfo,
    CropPestDisease,
    CropHarvestInfo,
)

class CropGuideService:
    def __init__(self):
        self.profiles = SUPPORTED_CROP_PROFILES

    def _generate_location_context(self, crop_name: str, location: Optional[str]) -> Optional[str]:
        if not location or not location.strip():
            return None
        
        loc_clean = location.strip().lower()
        if "maharashtra" in loc_clean or "pune" in loc_clean or "nashik" in loc_clean or "nagpur" in loc_clean:
            if crop_name.lower() in ["soybean", "cotton", "onion", "sugarcane", "tomato"]:
                return f"Regional Context ({location}): Well-suited for Maharashtra's medium to deep black cotton soils (Vertisols). Align sowing/transplanting with the South-West monsoon accumulation (75–100 mm)."
            else:
                return f"Regional Context ({location}): In Maharashtra, {crop_name} is grown primarily as a Rabi/irrigated crop following Kharif harvest. Ensure assured irrigation during critical flowering stages."
        elif "madhya pradesh" in loc_clean or "indore" in loc_clean or "ujjain" in loc_clean:
            return f"Regional Context ({location}): Prominent in Malwa/Nimar agro-climatic zones. Ensure proper field drainage to prevent root rot during heavy monsoon spells."
        elif "punjab" in loc_clean or "haryana" in loc_clean:
            return f"Regional Context ({location}): Indo-Gangetic alluvial plains offer high yield potential. Pay close attention to CRI irrigation and balanced micronutrient (Zinc/Sulphur) status."
        
        return f"Regional Context ({location}): Sowing dates and irrigation schedules should be fine-tuned to your local district rainfall patterns and KVK recommendations."

    def _build_response(self, data: Dict[str, Any], location: Optional[str] = None) -> CropGuideResponse:
        location_note = self._generate_location_context(data["name"], location)
        
        return CropGuideResponse(
            id=data["id"],
            name=data["name"],
            scientific_name=data["scientific_name"],
            season=data["season"],
            duration_days=data["duration_days"],
            overview=data["overview"],
            soil=CropSoilInfo(**data["soil"]),
            sowing=CropSowingInfo(**data["sowing"]),
            water=CropWaterInfo(**data["water"]),
            nutrition=CropNutritionInfo(**data["nutrition"]),
            pests_and_diseases=[CropPestDisease(**p) for p in data.get("pests_and_diseases", [])],
            prevention=data.get("prevention", []),
            harvest=CropHarvestInfo(**data["harvest"]),
            sources=data.get("sources", []),
            location_context=location_note,
            advisory_notice=data.get(
                "advisory_notice",
                "Crop management guidelines are educational. Local agronomy depends on field soil tests and district weather."
            ),
        )

    def get_crop_list(self) -> CropListResponse:
        """Return list of all supported crops"""
        summaries = [
            CropSummary(
                id=c["id"],
                name=c["name"],
                scientific_name=c["scientific_name"],
                season=c["season"],
                duration_days=c["duration_days"],
                preferred_ph=c["soil"]["preferred_ph"],
            )
            for c in self.profiles
        ]
        return CropListResponse(total=len(summaries), crops=summaries)

    async def get_crop_guide(
        self,
        crop_id: Optional[str] = "soybean",
        location: Optional[str] = None
    ) -> CropGuideResponse:
        """Retrieve full crop guide by crop ID or name"""
        target = (crop_id or "soybean").strip().lower()

        # Handle aliases / name search
        for c in self.profiles:
            if c["id"].lower() == target or c["name"].lower() == target or target in c["name"].lower():
                return self._build_response(c, location)

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Agronomic profile for crop '{crop_id}' was not found. Supported crops: {', '.join([c['name'] for c in self.profiles])}",
        )

crop_guide_service = CropGuideService()
