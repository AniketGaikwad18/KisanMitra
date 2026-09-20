from typing import Optional, List
from fastapi import APIRouter, Query, status, HTTPException
from app.schemas.weather import WeatherResponse, LocationSearchResult
from app.services.weather_service import weather_service

router = APIRouter(prefix="/weather", tags=["Weather Intelligence"])

@router.get(
    "",
    response_model=WeatherResponse,
    status_code=status.HTTP_200_OK,
    summary="Get agricultural weather intelligence and forecasts",
    description="Fetches current weather, 7-day forecast, spray windows, and farm-specific agricultural alerts from Open-Meteo."
)
async def get_weather(
    latitude: Optional[float] = Query(None, ge=-90.0, le=90.0, description="Latitude coordinate"),
    longitude: Optional[float] = Query(None, ge=-180.0, le=180.0, description="Longitude coordinate"),
    location: Optional[str] = Query(None, description="Location / district name (e.g., Pune, Nashik)")
):
    """
    Retrieve real-time weather and agricultural interpretations.
    Defaults to Pune, Maharashtra if coordinates are omitted.
    """
    try:
        return await weather_service.get_weather(latitude, longitude, location)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not retrieve weather intelligence right now. Please try again."
        )

@router.get(
    "/search",
    response_model=List[LocationSearchResult],
    status_code=status.HTTP_200_OK,
    summary="Search farm locations by name",
    description="Search for Indian agricultural cities/districts by name for weather tracking."
)
async def search_locations(
    query: Optional[str] = Query(None, description="Location search term"),
    q: Optional[str] = Query(None, description="Short alias for location search term")
):
    """
    Search agricultural location coordinates.
    """
    search_term = q or query or ""
    if not search_term or len(search_term.strip()) < 1:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Search query 'q' or 'query' must be at least 1 character long."
        )
    return await weather_service.search_locations(search_term.strip())

