"""
Soil Health Intelligence Service.
Coordinates soil data processing and analysis engine execution.
"""

from app.schemas.soil import SoilAnalysisRequest, SoilAnalysisResponse
from app.services.soil_analysis_engine import soil_analysis_engine

class SoilService:
    def __init__(self):
        pass

    async def analyze_soil(self, req: SoilAnalysisRequest) -> SoilAnalysisResponse:
        """
        Analyze soil test parameters using the deterministic agricultural scoring engine.
        """
        return soil_analysis_engine.analyze(req)

soil_service = SoilService()
