from typing import Optional
from fastapi import APIRouter, Query, status, HTTPException
from app.schemas.mandi import MandiPriceResponse, MandiFilterOptions
from app.services.mandi_service import mandi_service

router = APIRouter(prefix="/mandi", tags=["Mandi Price Intelligence"])

@router.get(
    "/prices",
    response_model=MandiPriceResponse,
    status_code=status.HTTP_200_OK,
    summary="Get agricultural market arrival and modal prices",
    description="Fetches reported APMC mandi prices with min, max, and modal price quotations from official Government of India (AGMARKNET/OGD) sources."
)
async def get_mandi_prices(
    commodity: Optional[str] = Query("Soybean", description="Crop/commodity name (e.g. Soybean, Wheat, Onion)"),
    state: Optional[str] = Query("Maharashtra", description="State name (e.g. Maharashtra, Madhya Pradesh)"),
    district: Optional[str] = Query("Pune", description="District name (e.g. Pune, Nashik, Nagpur)"),
    market: Optional[str] = Query(None, description="Optional specific APMC market name"),
    limit: Optional[int] = Query(50, ge=1, le=100, description="Max records to return")
):
    """
    Retrieve reported wholesale mandi price data for crops and locations.
    """
    try:
        return await mandi_service.get_mandi_prices(
            commodity=commodity,
            state=state,
            district=district,
            market=market,
            limit=limit or 50,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Could not retrieve mandi prices at this time: {str(e)}"
        )

@router.get(
    "/filters",
    response_model=MandiFilterOptions,
    status_code=status.HTTP_200_OK,
    summary="Get available search filter options",
    description="Returns list of supported agricultural commodities, states, and district mappings."
)
async def get_filter_options():
    """
    Retrieve filter choices for UI dropdowns.
    """
    return mandi_service.get_filter_options()
