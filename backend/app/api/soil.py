from fastapi import APIRouter, status, HTTPException
from app.schemas.soil import SoilAnalysisRequest, SoilAnalysisResponse
from app.services.soil_service import soil_service

router = APIRouter(prefix="/soil", tags=["Soil Health Intelligence"])

@router.post(
    "/analyze",
    response_model=SoilAnalysisResponse,
    status_code=status.HTTP_200_OK,
    summary="Analyze soil test parameters",
    description="Calculate an advisory soil health score, classify pH and NPK levels, generate agronomic observations, safe recommendations, and crop context based on standard ICAR benchmarks."
)
async def analyze_soil_parameters(request: SoilAnalysisRequest):
    """
    Receive soil test values (pH, Nitrogen, Phosphorus, Potassium, optional Organic Matter),
    validate inputs, and return structured soil health intelligence.
    """
    try:
        result = await soil_service.analyze_soil(request)
        return result
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Soil health intelligence calculation encountered an unexpected error."
        )
