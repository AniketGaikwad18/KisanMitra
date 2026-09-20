"""
Crop Guide Service Placeholder.
Location and season-based crop advisory will be implemented in the respective phase.
"""

class CropGuideService:
    def __init__(self):
        pass

    async def get_crop_recommendations(self, location: str, season: str, soil_type: str):
        """Placeholder for localized crop guidance."""
        raise NotImplementedError("Crop guide service will be implemented in the Crop Guide phase.")

crop_guide_service = CropGuideService()
