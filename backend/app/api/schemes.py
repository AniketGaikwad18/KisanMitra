from typing import Optional
from fastapi import APIRouter, Query, status, HTTPException
from app.schemas.scheme import SchemeResponse, SchemeDetail, SchemeFilterMeta
from app.services.scheme_service import scheme_service

router = APIRouter(prefix="/schemes", tags=["Government Schemes"])

@router.get(
    "",
    response_model=SchemeResponse,
    status_code=status.HTTP_200_OK,
    summary="Get verified agricultural government schemes",
    description="Retrieve government schemes with optional category, state, and text search filters."
)
async def get_schemes(
    category: Optional[str] = Query(None, description="Category filter (e.g. Income Support, Crop Insurance, Credit)"),
    state: Optional[str] = Query(None, description="State filter (e.g. Maharashtra, All India (Central))"),
    search: Optional[str] = Query(None, description="Text search term (e.g. loan, solar, insurance, kisan)")
):
    """
    Search and filter verified government agricultural support programs.
    """
    return await scheme_service.get_schemes(category=category, state=state, search=search)

@router.get(
    "/meta/filters",
    response_model=SchemeFilterMeta,
    status_code=status.HTTP_200_OK,
    summary="Get scheme categories and states metadata",
    description="Returns available filter options for scheme category and state dropdowns."
)
async def get_scheme_filters():
    """
    Retrieve metadata for scheme filter dropdowns.
    """
    return scheme_service.get_filter_meta()

@router.get(
    "/{scheme_id}",
    response_model=SchemeDetail,
    status_code=status.HTTP_200_OK,
    summary="Get detailed government scheme information",
    description="Retrieve full eligibility criteria, benefits breakdown, required documents, and official portal link by scheme ID."
)
async def get_scheme_detail(scheme_id: str):
    """
    Retrieve comprehensive scheme details.
    """
    return await scheme_service.get_scheme_by_id(scheme_id)
