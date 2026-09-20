"""
Assistant Service for KisanMitra Contextual AI Farmer Assistant.
Coordinates context collection, hybrid knowledge retrieval, grounded prompt construction, and Gemini generation.
"""

import logging
from typing import List
from app.schemas.assistant import (
    AssistantChatRequest,
    AssistantResponse,
    SourceMetadata,
)
from app.services.context_service import context_service
from app.services.retrieval_service import retrieval_service
from app.services.gemini_service import gemini_service

logger = logging.getLogger(__name__)

DISCLAIMER_TEXT = (
    "AI-assisted agricultural guidance. Field recommendations are decision-support aids. "
    "Confirm critical inputs with a certified local agricultural extension officer or Krishi Vigyan Kendra (KVK)."
)

SOURCE_REGISTRY = {
    "weather": SourceMetadata(
        type="weather",
        label="Weather & Farm Outlook",
        source_name="Open-Meteo Meteorological Forecast",
        url="https://open-meteo.com",
    ),
    "soil": SourceMetadata(
        type="soil",
        label="Soil Health Assessment",
        source_name="ICAR Soil Testing Benchmarks",
    ),
    "crop_health": SourceMetadata(
        type="crop_doctor",
        label="AI Crop Doctor Visual Assessment",
        source_name="Gemini 1.5 Flash Vision",
    ),
    "mandi": SourceMetadata(
        type="mandi",
        label="Mandi Wholesale Prices",
        source_name="Government of India Open Government Data (data.gov.in)",
        url="https://data.gov.in",
    ),
    "schemes": SourceMetadata(
        type="schemes",
        label="Verified Government Schemes",
        source_name="Ministry of Agriculture & myScheme Portal",
        url="https://myscheme.gov.in",
    ),
    "crop_guide": SourceMetadata(
        type="crop_guide",
        label="Crop Agronomy Handbook",
        source_name="ICAR & State Agricultural Universities",
    ),
}

class AssistantService:
    async def chat(self, request: AssistantChatRequest) -> AssistantResponse:
        """
        Process farmer natural language message with contextual grounding.
        """
        message = request.message.strip()
        language = request.language or "en"

        # 1. Extract genuinely available context
        available_context = context_service.extract_available_context(request.context)

        # 2. Determine relevant topics based on question keywords
        relevant_topics = context_service.determine_relevant_topics(message)

        # 3. Retrieve structured knowledge (Schemes, Crop Guide)
        retrieved_knowledge = await retrieval_service.retrieve_relevant_knowledge(
            message, available_context, relevant_topics
        )

        # 4. Format combined context into prompt block
        context_used, context_str = context_service.filter_and_format_context(
            available_context, relevant_topics, retrieved_knowledge
        )

        # 5. Generate grounded response from Gemini / Mock fallback
        gemini_result = await gemini_service.generate_farmer_response(
            question=message,
            context_str=context_str,
            language=language,
        )

        # 6. Build attribution sources
        sources: List[SourceMetadata] = []
        for ctx_key in context_used:
            if ctx_key in SOURCE_REGISTRY:
                sources.append(SOURCE_REGISTRY[ctx_key])

        if not sources:
            sources.append(
                SourceMetadata(
                    type="general",
                    label="KisanMitra Agronomy Knowledge",
                    source_name="General Agricultural Principles",
                )
            )

        # 7. Confidence communication indicator
        confidence = gemini_result.get("confidence", "moderate")
        if not context_used or len(context_used) <= 1:
            confidence = "limited"
        elif len(context_used) >= 2 and not gemini_result.get("is_demo"):
            confidence = "high"

        return AssistantResponse(
            answer=gemini_result.get("answer", "Here is agricultural guidance based on your query."),
            language=language,
            confidence=confidence,
            context_used=context_used,
            sources=sources,
            follow_up_question=gemini_result.get("follow_up_question"),
            disclaimer=DISCLAIMER_TEXT,
            is_demo=gemini_result.get("is_demo", False),
        )

assistant_service = AssistantService()
