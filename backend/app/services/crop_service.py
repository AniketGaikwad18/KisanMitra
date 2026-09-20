import io
import logging
from typing import Tuple
from PIL import Image
from fastapi import HTTPException, UploadFile
from app.schemas.crop import CropAnalysisResponse
from app.services.gemini_service import gemini_service

logger = logging.getLogger(__name__)

# Constants
MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB
ALLOWED_MIME_TYPES = {
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp"
}

class CropService:
    def __init__(self):
        pass

    async def validate_and_read_image(self, file: UploadFile) -> Tuple[bytes, str]:
        """
        Validate uploaded image format, size, and ensure it can be decoded.
        """
        if not file:
            raise HTTPException(status_code=400, detail="No image file provided.")

        content_type = file.content_type.lower() if file.content_type else ""
        if content_type not in ALLOWED_MIME_TYPES:
            # Check filename extension as fallback
            filename = (file.filename or "").lower()
            if filename.endswith((".jpg", ".jpeg")):
                content_type = "image/jpeg"
            elif filename.endswith(".png"):
                content_type = "image/png"
            elif filename.endswith(".webp"):
                content_type = "image/webp"
            else:
                raise HTTPException(
                    status_code=400,
                    detail="Unsupported image format. Please upload a JPG, PNG, or WEBP image."
                )

        # Read file contents
        try:
            image_bytes = await file.read()
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to read upload file: {str(e)}")

        # Check file size
        if len(image_bytes) == 0:
            raise HTTPException(status_code=400, detail="Uploaded file is empty.")

        if len(image_bytes) > MAX_FILE_SIZE_BYTES:
            raise HTTPException(
                status_code=400,
                detail=f"File too large ({len(image_bytes)/(1024*1024):.1f} MB). Maximum allowed size is 10 MB."
            )

        # Validate image can be decoded
        try:
            with Image.open(io.BytesIO(image_bytes)) as img:
                img.verify()
        except Exception:
            raise HTTPException(
                status_code=400,
                detail="Invalid or corrupted image file. Please upload a valid image."
            )

        return image_bytes, content_type

    async def analyze_crop(self, file: UploadFile) -> CropAnalysisResponse:
        """
        Full crop diagnosis flow: validate file, invoke Gemini vision, return structured response.
        """
        image_bytes, mime_type = await self.validate_and_read_image(file)

        try:
            raw_result = await gemini_service.analyze_crop_image(image_bytes, mime_type)
            
            # Construct strongly typed response
            response = CropAnalysisResponse(
                is_identified=raw_result.get("is_identified", True),
                crop=raw_result.get("crop"),
                possible_condition=raw_result.get("possible_condition"),
                confidence=raw_result.get("confidence"),
                confidence_text=raw_result.get("confidence_text"),
                severity=raw_result.get("severity", "Moderate"),
                observations=raw_result.get("observations", []),
                explanation=raw_result.get("explanation", ""),
                recommended_actions=raw_result.get("recommended_actions", []),
                preventive_guidance=raw_result.get("preventive_guidance", []),
                additional_information_needed=raw_result.get("additional_information_needed", []),
                disclaimer=raw_result.get(
                    "disclaimer",
                    "AI-assisted assessment: This result is not a definitive agricultural diagnosis. Confirm important treatment decisions with a qualified agricultural professional or trusted agricultural authority."
                ),
                is_demo=raw_result.get("is_demo", False),
                error=raw_result.get("error")
            )
            return response

        except Exception as e:
            logger.error(f"Crop analysis service error: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail="The crop analysis service encountered an error. Please try again."
            )

crop_service = CropService()
