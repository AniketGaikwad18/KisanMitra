from fastapi import APIRouter
from app.schemas.health import HealthResponse

router = APIRouter()

@router.get("/health", response_model=HealthResponse, summary="Service Health Check")
async def get_health():
    """
    Health check endpoint to verify backend service availability.
    """
    return HealthResponse(
        status="ok",
        service="kisanmitra-api"
    )
