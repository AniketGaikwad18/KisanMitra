from typing import Optional
from fastapi import APIRouter, Query, status, HTTPException
from app.schemas.crop_guide import CropGuideResponse, CropListResponse
from app.services.crop_guide_service import crop_guide_service

router = APIRouter(prefix="/crop-guide", tags=["Location-Based Crop Guide"])

@router.get(
    "",
    response_model=CropGuideResponse,
    status_code=status.HTTP_200_OK,
    summary="Get agronomic crop management guide",
    description="Retrieve comprehensive sowing, soil, water, nutrition, pest management, and harvest guidance for a specific crop and location."
)
async def get_crop_guide(
    crop: Optional[str] = Query("soybean", description="Crop name or ID (e.g. soybean, wheat, rice, cotton, maize, onion, tomato, sugarcane)"),
    location: Optional[str] = Query(None, description="Optional farmer location / district (e.g. Pune, Maharashtra)")
):
    """
    Retrieve full agronomic guide for selected crop.
    """
    return await crop_guide_service.get_crop_guide(crop_id=crop, location=location)

@router.get(
    "/crops",
    response_model=CropListResponse,
    status_code=status.HTTP_200_OK,
    summary="List all supported crop profiles",
    description="Returns list of all available crops with botanical names, seasons, duration, and pH suitability."
)
async def list_supported_crops():
    """
    Retrieve list of all supported crop profiles.
    """
    return crop_guide_service.get_crop_list()

@router.get(
    "/{crop_id}",
    response_model=CropGuideResponse,
    status_code=status.HTTP_200_OK,
    summary="Get crop guide by crop ID",
    description="Retrieve full agronomic guide for a specific crop slug ID."
)
async def get_crop_guide_by_id(
    crop_id: str,
    location: Optional[str] = Query(None, description="Optional farmer location context")
):
    """
    Retrieve crop guide by path ID.
    """
    return await crop_guide_service.get_crop_guide(crop_id=crop_id, location=location)
