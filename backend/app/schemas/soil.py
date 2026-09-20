from typing import List, Optional
from pydantic import BaseModel, Field, field_validator

class SoilAnalysisRequest(BaseModel):
    ph: float = Field(..., ge=0.0, le=14.0, description="Soil pH value between 0.0 and 14.0")
    nitrogen: float = Field(..., ge=0.0, le=5000.0, description="Available Nitrogen in kg/ha")
    phosphorus: float = Field(..., ge=0.0, le=5000.0, description="Available Phosphorus in kg/ha")
    potassium: float = Field(..., ge=0.0, le=5000.0, description="Available Potassium in kg/ha")
    organic_matter: Optional[float] = Field(None, ge=0.0, le=100.0, description="Soil Organic Carbon / Matter percentage (0-100%)")
    crop: Optional[str] = Field("Soybean", description="Target or currently cultivated crop")
    location: Optional[str] = Field("Pune, Maharashtra", description="Farm location / region")

    @field_validator("ph")
    def validate_ph(cls, v):
        if not (0.0 <= v <= 14.0):
            raise ValueError("Soil pH must be between 0.0 and 14.0")
        return round(v, 2)

    @field_validator("nitrogen", "phosphorus", "potassium")
    def validate_nutrients(cls, v):
        if v < 0.0:
            raise ValueError("Nutrient values cannot be negative")
        return round(v, 1)

class SoilParameterResult(BaseModel):
    value: float
    unit: str
    status: str
    severity: str = "normal"  # "normal", "moderate", "warning"
    rating_score: int = 100

class SoilParameters(BaseModel):
    ph: SoilParameterResult
    nitrogen: SoilParameterResult
    phosphorus: SoilParameterResult
    potassium: SoilParameterResult
    organic_matter: Optional[SoilParameterResult] = None

class CropContext(BaseModel):
    crop_name: str
    suitable_ph_range: str
    is_ph_suitable: bool
    primary_focus: str
    soil_notes: str
    considerations: List[str] = []

class SoilAnalysisResponse(BaseModel):
    overall_score: int = Field(..., ge=0, le=100, description="Advisory Soil Health Score from 0 to 100")
    rating: str = Field(..., description="Rating classification: Needs Attention, Fair, Good, or Very Good")
    parameters: SoilParameters
    observations: List[str] = Field(default_factory=list, description="Automated agronomic observations based on entered test values")
    recommendations: List[str] = Field(default_factory=list, description="Farmer-friendly general advisory recommendations")
    crop_context: Optional[CropContext] = None
    data_quality_notes: List[str] = Field(default_factory=list, description="Data entry and method awareness notes")
    disclaimer: str = Field(
        default="Advisory Assessment: This score and guidance are calculated from the values you entered and represent decision-support insights. It does not replace a certified laboratory soil test certificate or localized university agronomy recommendations.",
        description="Standard trust and safety disclaimer"
    )
