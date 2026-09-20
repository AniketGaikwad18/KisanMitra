"""
Government Schemes Service Placeholder.
Curated, verified agricultural schemes and eligibility matching will be implemented in the respective phase.
"""

class SchemeService:
    def __init__(self):
        pass

    async def get_schemes(self, category: str = None, state: str = None):
        """Placeholder for government schemes retrieval."""
        raise NotImplementedError("Scheme service will be implemented in the Schemes phase.")

scheme_service = SchemeService()
