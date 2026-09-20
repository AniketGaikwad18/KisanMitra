"""
Retrieval Service (RAG Abstraction) for KisanMitra AI Farmer Assistant.
Provides deterministic structured knowledge retrieval across Government Schemes and Crop Agronomy Guides.
Vector semantic embeddings (e.g., Chroma / FAISS) can be plugged in behind this interface in future phases.
"""

import logging
from typing import Dict, Any, Optional, Set, List
from app.services.scheme_service import scheme_service
from app.services.crop_guide_service import crop_guide_service

logger = logging.getLogger(__name__)

SUPPORTED_CROPS = ["soybean", "wheat", "rice", "cotton", "maize", "sugarcane", "tomato", "onion"]

class RetrievalService:
    """
    Hybrid deterministic knowledge retrieval for grounding farmer assistant responses.
    """

    async def retrieve_relevant_knowledge(
        self,
        question: str,
        available_context: Dict[str, Any],
        relevant_topics: Set[str]
    ) -> Dict[str, Any]:
        """
        Retrieves factual knowledge snippets relevant to the farmer's question.
        """
        retrieved: Dict[str, Any] = {}
        lower_q = question.lower()

        # 1. Scheme Knowledge Retrieval
        if "schemes" in relevant_topics:
            try:
                state = available_context.get("location", {}).get("state")
                category = None
                if any(w in lower_q for w in ["insurance", "bima", "loss", "damage"]):
                    category = "Crop Insurance"
                elif any(w in lower_q for w in ["income", "cash", "direct", "pm-kisan", "pmkisan", "6000"]):
                    category = "Income Support"
                elif any(w in lower_q for w in ["loan", "credit", "kcc", "interest"]):
                    category = "Credit"
                elif any(w in lower_q for w in ["water", "irrigation", "drip", "sprinkler", "sinchayee"]):
                    category = "Irrigation"
                elif any(w in lower_q for w in ["soil", "npk", "card"]):
                    category = "Soil Health"

                schemes_res = await scheme_service.get_schemes(category=category, state=state, search=question if not category else None)
                if schemes_res and schemes_res.schemes:
                    retrieved["schemes"] = [
                        {
                            "name": s.name,
                            "category": s.category,
                            "state": s.state,
                            "short_description": s.short_description,
                            "target_group": s.target_group,
                            "official_url": s.official_url,
                            "source_name": s.source_name,
                        }
                        for s in schemes_res.schemes[:3]
                    ]
            except Exception as e:
                logger.warning(f"Error retrieving schemes: {e}")

        # 2. Crop Guide Knowledge Retrieval
        if "crop_guide" in relevant_topics or "crop_health" in relevant_topics or "soil" in relevant_topics or "weather" in relevant_topics:
            try:
                target_crop = None
                # Check active context crop first
                if "crop" in available_context and available_context["crop"].get("name"):
                    c_name = available_context["crop"]["name"].lower()
                    for sc in SUPPORTED_CROPS:
                        if sc in c_name:
                            target_crop = sc
                            break

                # Check query text if not in context
                if not target_crop:
                    for sc in SUPPORTED_CROPS:
                        if sc in lower_q:
                            target_crop = sc
                            break

                if target_crop:
                    guide_res = await crop_guide_service.get_crop_guide(target_crop)
                    if guide_res:
                        retrieved["crop_guide"] = {
                            "name": guide_res.name,
                            "overview": guide_res.overview,
                            "soil": guide_res.soil.model_dump() if guide_res.soil else None,
                            "sowing": guide_res.sowing.model_dump() if guide_res.sowing else None,
                            "water": guide_res.water.model_dump() if guide_res.water else None,
                            "nutrition": guide_res.nutrition.model_dump() if guide_res.nutrition else None,
                            "pests_and_diseases": [p.model_dump() for p in guide_res.pests_and_diseases] if guide_res.pests_and_diseases else None,
                            "prevention": guide_res.prevention,
                            "harvest": guide_res.harvest.model_dump() if guide_res.harvest else None,
                            "sources": guide_res.sources,
                        }
            except Exception as e:
                logger.warning(f"Error retrieving crop guide: {e}")

        return retrieved

retrieval_service = RetrievalService()
