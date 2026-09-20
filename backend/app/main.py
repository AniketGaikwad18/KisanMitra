from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.health import router as health_router
from app.api.crop import router as crop_router
from app.api.soil import router as soil_router
from app.api.weather import router as weather_router
from app.api.mandi import router as mandi_router
from app.api.schemes import router as schemes_router
from app.api.crop_guide import router as crop_guide_router
from app.api.assistant import router as assistant_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="KisanMitra API - Smarter Decisions. Healthier Farms.",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(health_router, prefix="/api", tags=["Health"])
app.include_router(crop_router, prefix="/api", tags=["AI Crop Doctor"])
app.include_router(soil_router, prefix="/api", tags=["Soil Health Intelligence"])
app.include_router(weather_router, prefix="/api", tags=["Weather Intelligence"])
app.include_router(mandi_router, prefix="/api", tags=["Mandi Price Intelligence"])
app.include_router(schemes_router, prefix="/api", tags=["Government Schemes"])
app.include_router(crop_guide_router, prefix="/api", tags=["Location-Based Crop Guide"])
app.include_router(assistant_router, prefix="/api", tags=["Contextual AI Farmer Assistant"])

@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "Welcome to KisanMitra API",
        "tagline": "Smarter Decisions. Healthier Farms.",
        "version": settings.VERSION,
        "docs": "/docs",
        "health": "/api/health",
        "endpoints": {
            "health": "/api/health",
            "crop_analyze": "/api/crop/analyze [POST]",
            "soil_analyze": "/api/soil/analyze [POST]",
            "weather": "/api/weather [GET]",
            "weather_search": "/api/weather/search [GET]",
            "mandi_prices": "/api/mandi/prices [GET]",
            "mandi_filters": "/api/mandi/filters [GET]",
            "schemes": "/api/schemes [GET]",
            "crop_guide": "/api/crop-guide [GET]",
            "crop_guide_crops": "/api/crop-guide/crops [GET]",
            "assistant_chat": "/api/assistant/chat [POST]"
        }
    }



if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
