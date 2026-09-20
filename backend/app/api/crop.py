from fastapi import APIRouter, File, UploadFile, status
from app.schemas.crop import CropAnalysisResponse
from app.services.crop_service import crop_service

router = APIRouter(prefix="/crop", tags=["AI Crop Doctor"])

@router.post(
    "/analyze",
    response_model=CropAnalysisResponse,
    status_code=status.HTTP_200_OK,
    summary="Analyze crop/leaf image with AI Vision",
    description="Upload a crop leaf image (JPG, PNG, WEBP, max 10MB) to receive an AI-assisted condition assessment, observed symptoms, and actionable recommendations."
)
async def analyze_crop_image(file: UploadFile = File(..., description="Crop leaf photo for AI diagnosis")):
    """
    Handle crop image upload, validate file, and return structured AI pathology assessment.
    """
    result = await crop_service.analyze_crop(file)
    return result
