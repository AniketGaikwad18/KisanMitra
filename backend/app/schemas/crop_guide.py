from typing import List, Optional, Dict
from pydantic import BaseModel, Field

class CropSoilInfo(BaseModel):
    preferred_ph: str = Field(..., description="Recommended soil pH range")
    soil_type: List[str] = Field(default_factory=list, description="Ideal soil texture classifications")
    drainage: str = Field(..., description="Soil drainage and aeration requirements")

class CropSowingInfo(BaseModel):
    general_window: str = Field(..., description="Optimal seasonal sowing / transplanting window")
    seed_rate: str = Field(..., description="Recommended seed rate per hectare or acre")
    spacing: str = Field(..., description="Row-to-row and plant-to-plant spacing")
    depth: str = Field(..., description="Sowing seed depth")
    notes: List[str] = Field(default_factory=list, description="Seed treatment and nursery guidelines")

class CropWaterInfo(BaseModel):
    requirements: str = Field(..., description="Total water requirement throughout lifecycle")
    critical_stages: List[str] = Field(default_factory=list, description="Growth phases highly sensitive to moisture stress")
    irrigation_methods: List[str] = Field(default_factory=list, description="Recommended irrigation layouts")
    notes: List[str] = Field(default_factory=list, description="Water management tips")

class CropNutritionInfo(BaseModel):
    general_considerations: List[str] = Field(default_factory=list, description="Macro & micronutrient application guidelines")
    organic_practices: List[str] = Field(default_factory=list, description="Organic manures, bio-fertilizers, and green manuring")

class CropPestDisease(BaseModel):
    name: str = Field(..., description="Pest or disease common and scientific name")
    type: str = Field("pest", description="Classification: 'pest', 'disease', or 'fungal'")
    symptoms: str = Field(..., description="Visual signs and damage symptoms on plant parts")
    management: str = Field(..., description="Safe integrated pest management (IPM) guidelines")

class CropHarvestInfo(BaseModel):
    maturity_signs: str = Field(..., description="Visual and physical indicators of crop maturity")
    general_guidance: str = Field(..., description="Harvest timing and harvesting techniques")
    post_harvest: str = Field(..., description="Drying, moisture targets, curing, and storage guidelines")

class CropSummary(BaseModel):
    id: str = Field(..., description="Crop slug ID (e.g. soybean, wheat)")
    name: str = Field(..., description="Common crop name")
    scientific_name: str = Field(..., description="Botanical name")
    season: str = Field(..., description="Cropping season (Kharif, Rabi, etc.)")
    duration_days: str = Field(..., description="Crop duration from sowing to maturity")
    preferred_ph: str = Field(..., description="Suitable pH range")

class CropGuideResponse(BaseModel):
    id: str = Field(..., description="Unique crop identifier")
    name: str = Field(..., description="Crop common name")
    scientific_name: str = Field(..., description="Botanical name")
    season: str = Field(..., description="Growing season")
    duration_days: str = Field(..., description="Maturity duration")
    overview: str = Field(..., description="Comprehensive agronomic overview")
    soil: CropSoilInfo = Field(..., description="Soil and pH requirements")
    sowing: CropSowingInfo = Field(..., description="Sowing and seed management")
    water: CropWaterInfo = Field(..., description="Water and irrigation guidance")
    nutrition: CropNutritionInfo = Field(..., description="Fertilizer and nutrient considerations")
    pests_and_diseases: List[CropPestDisease] = Field(default_factory=list, description="Major pests and diseases")
    prevention: List[str] = Field(default_factory=list, description="Preventive agronomy and crop hygiene practices")
    harvest: CropHarvestInfo = Field(..., description="Maturity, harvesting, and post-harvest care")
    sources: List[str] = Field(default_factory=list, description="Attribution to agricultural research institutes")
    location_context: Optional[str] = Field(None, description="Contextual note based on farmer's selected location")
    advisory_notice: str = Field(
        "This crop guide is for agricultural decision support. Sowing windows, pest thresholds, and irrigation frequencies must be adapted to local rainfall, microclimate, and advice from local Krishi Vigyan Kendras (KVK).",
        description="Agricultural advisory disclaimer"
    )

class CropListResponse(BaseModel):
    total: int = Field(..., description="Total crops supported")
    crops: List[CropSummary] = Field(default_factory=list, description="Summary list of supported crops")
