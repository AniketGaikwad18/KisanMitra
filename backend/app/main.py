from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.health import router as health_router
from app.api.crop import router as crop_router

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
            "crop_analyze": "/api/crop/analyze [POST]"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
