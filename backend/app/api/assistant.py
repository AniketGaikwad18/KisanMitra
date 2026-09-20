from fastapi import APIRouter, HTTPException, status
import logging
from app.schemas.assistant import AssistantChatRequest, AssistantResponse
from app.services.assistant_service import assistant_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/assistant", tags=["Contextual AI Farmer Assistant"])

@router.post(
    "/chat",
    response_model=AssistantResponse,
    status_code=status.HTTP_200_OK,
    summary="Chat with Contextual AI Farmer Assistant",
    description="Ask farm questions grounded in farmer context (weather, soil, crop doctor, mandi, schemes, crop guide).",
)
async def chat_with_assistant(payload: AssistantChatRequest) -> AssistantResponse:
    try:
        response = await assistant_service.chat(payload)
        return response
    except ValueError as ve:
        logger.warning(f"Validation error in assistant chat: {ve}")
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(ve),
        )
    except Exception as e:
        logger.error(f"Internal error processing assistant chat: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="The AI assistant is temporarily unavailable. Please try again.",
        )
