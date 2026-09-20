import os
import json
import base64
import re
import logging
from typing import Optional, Dict, Any
import httpx
from app.core.config import settings

logger = logging.getLogger(__name__)

CROP_SYSTEM_PROMPT = """
You are KisanMitra's AI Crop Doctor, an expert agricultural plant pathologist assisting Indian farmers.
Analyze the provided crop/leaf image carefully and return a JSON object with the following fields:

{
  "is_identified": boolean (true if a recognizable crop or plant is detected, false if the image is not a plant, is too blurry, or cannot be analyzed),
  "crop": string (name of the crop in English, e.g. "Tomato", "Soybean", "Rice", "Wheat", "Cotton", "Potato", "Chilli", "Sugarcane", "Maize", or null if not identifiable),
  "possible_condition": string (name of the disease, pest, nutrient symptom, or "Healthy" if no disease is found, or "Uncertain / Not Identified" if not determinable),
  "confidence": number (float between 0.0 and 1.0 representing model confidence estimate, or null if indeterminable),
  "confidence_text": string (e.g. "91% (High Confidence)" or "65% (Moderate Confidence)" or "Not available"),
  "severity": string (one of: "Healthy", "Mild", "Moderate", "Severe", or "Unknown"),
  "observations": [
    string (specific visible symptoms on leaf, stem, or fruit observed in the image)
  ],
  "explanation": string (farmer-friendly plain explanation of what the visible patterns indicate),
  "recommended_actions": [
    string (safe, general cultural/organic steps to manage the issue, e.g. removing infected leaves, adjusting irrigation; DO NOT invent exact chemical prescriptions or brand dosages)
  ],
  "preventive_guidance": [
    string (preventive agricultural practices like crop rotation, adequate spacing, farm sanitation)
  ],
  "additional_information_needed": [
    string (factors that would help confirm the diagnosis, e.g. "Crop age / stage", "Recent rainfall / humidity")
  ]
}

SAFETY AND ACCURACY GUIDELINES:
1. If the image is blurry, dark, unrelated to agriculture, or not a plant, set "is_identified": false and provide constructive suggestions in "explanation" on how to take a better photo.
2. Never claim 100% absolute certainty.
3. Keep observations strictly grounded in what is visually evident in the image.
4. Return ONLY valid raw JSON.
"""

class GeminiService:
    def __init__(self):
        self.api_key = self._get_api_key()

    def _get_api_key(self) -> str:
        key = settings.GEMINI_API_KEY or os.environ.get("GEMINI_API_KEY", "")
        if key and key.strip() and key != "your-gemini-api-key":
            return key.strip()
        return ""

    @property
    def is_configured(self) -> bool:
        return bool(self._get_api_key())

    async def analyze_crop_image(self, image_bytes: bytes, mime_type: str = "image/jpeg") -> Dict[str, Any]:
        """
        Analyze a crop image using Gemini Vision via REST API with structured JSON output.
        Falls back to MockCropAnalyzer if GEMINI_API_KEY is not configured or fails.
        """
        api_key = self._get_api_key()

        if not api_key:
            logger.info("Gemini API key not configured. Using isolated development fallback (MockCropAnalyzer).")
            return self._mock_crop_analysis(image_bytes, mime_type)

        try:
            # Encode image to base64
            base64_image = base64.b64encode(image_bytes).decode("utf-8")

            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"

            payload = {
                "contents": [
                    {
                        "parts": [
                            {"text": CROP_SYSTEM_PROMPT},
                            {"text": "Please analyze this crop leaf image and return the structured JSON assessment."},
                            {
                                "inline_data": {
                                    "mime_type": mime_type,
                                    "data": base64_image
                                }
                            }
                        ]
                    }
                ],
                "generationConfig": {
                    "temperature": 0.2,
                    "responseMimeType": "application/json"
                }
            }

            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(url, json=payload)

            if response.status_code != 200:
                logger.warning(f"Gemini API returned status {response.status_code}: {response.text}")
                mock_res = self._mock_crop_analysis(image_bytes, mime_type)
                mock_res["error"] = "Gemini API service temporarily unavailable. Showing demo analysis."
                return mock_res

            response_data = response.json()
            candidates = response_data.get("candidates", [])
            if not candidates:
                raise ValueError("No candidates returned by Gemini Vision.")

            candidate = candidates[0]
            content = candidate.get("content", {})
            parts = content.get("parts", [])
            if not parts:
                raise ValueError("Empty content parts in Gemini response.")

            raw_text = parts[0].get("text", "").strip()
            json_str = self._extract_json(raw_text)
            parsed_data = json.loads(json_str)
            parsed_data["is_demo"] = False
            return parsed_data

        except Exception as e:
            logger.warning(f"Gemini API call exception: {str(e)}. Falling back to mock analyzer.")
            mock_res = self._mock_crop_analysis(image_bytes, mime_type)
            mock_res["error"] = "Gemini analysis failed or connection timed out. Showing demo analysis."
            return mock_res

    def _extract_json(self, text: str) -> str:
        """Extract JSON substring if wrapped in markdown codeblocks"""
        text = text.strip()
        if text.startswith("```json"):
            text = text[7:]
        elif text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
        text = text.strip()

        match = re.search(r'\{.*\}', text, re.DOTALL)
        if match:
            return match.group(0)
        return text

    def _mock_crop_analysis(self, image_bytes: bytes, mime_type: str) -> Dict[str, Any]:
        """
        Isolated development fallback when GEMINI_API_KEY is absent.
        Clearly marked as is_demo=True.
        """
        byte_len = len(image_bytes)

        if byte_len % 3 == 0:
            return {
                "is_identified": True,
                "crop": "Soybean",
                "possible_condition": "Cercospora Leaf Blight (Purple Seed Stain)",
                "confidence": 0.89,
                "confidence_text": "89% (High Confidence)",
                "severity": "Moderate",
                "observations": [
                    "Reddish-purple angular lesions visible on upper leaf surfaces",
                    "Early stage leaf bronzing and slight puckering",
                    "Vein discoloration along primary foliage"
                ],
                "explanation": "The visible symptoms are characteristic of Cercospora leaf blight, a common fungal disease in soybean during humid conditions.",
                "recommended_actions": [
                    "Avoid overhead irrigation to minimize canopy moisture",
                    "Remove and destroy severely blighted crop residue after harvest",
                    "Monitor adjacent rows for rapid lesion spread"
                ],
                "preventive_guidance": [
                    "Use certified disease-free soybean seed varieties (e.g., JS 335 resistant lines)",
                    "Practice minimum 2-year crop rotation with non-host crops like maize or sorghum",
                    "Ensure adequate field drainage"
                ],
                "additional_information_needed": [
                    "Current growth stage (flowering vs pod fill)",
                    "Recent canopy humidity and consecutive wet days"
                ],
                "disclaimer": "AI-assisted assessment: This result is not a definitive agricultural diagnosis. Confirm important treatment decisions with a qualified agricultural professional or trusted agricultural authority.",
                "is_demo": True
            }
        elif byte_len % 3 == 1:
            return {
                "is_identified": True,
                "crop": "Tomato",
                "possible_condition": "Early Blight (Alternaria solani)",
                "confidence": 0.92,
                "confidence_text": "92% (High Confidence)",
                "severity": "Moderate",
                "observations": [
                    "Dark brown concentric ring spots (target-board pattern) on lower leaves",
                    "Chlorotic yellowing around leaf margins surrounding lesions",
                    "Lower canopy foliage starting to senesce prematurely"
                ],
                "explanation": "The visible concentric target lesions with yellow chlorotic halos strongly match Early Blight caused by Alternaria solani.",
                "recommended_actions": [
                    "Prune and dispose of infected lower leaves touching the soil",
                    "Water strictly at the base of the plant using drip irrigation",
                    "Ensure adequate plant staking to improve air circulation"
                ],
                "preventive_guidance": [
                    "Apply organic straw or plastic mulch around plant bases to prevent soil splash",
                    "Rotate crops annually with non-solanaceous crops",
                    "Maintain 60cm row spacing for optimal air movement"
                ],
                "additional_information_needed": [
                    "Plant age in days",
                    "Recent nighttime temperatures and morning dew duration"
                ],
                "disclaimer": "AI-assisted assessment: This result is not a definitive agricultural diagnosis. Confirm important treatment decisions with a qualified agricultural professional or trusted agricultural authority.",
                "is_demo": True
            }
        else:
            return {
                "is_identified": True,
                "crop": "Cotton",
                "possible_condition": "Bacterial Blight (Angular Leaf Spot)",
                "confidence": 0.86,
                "confidence_text": "86% (High Confidence)",
                "severity": "Mild",
                "observations": [
                    "Small water-soaked angular lesions bound by leaf veinlets",
                    "Lesions turning dark reddish-brown with age",
                    "Upper foliage remains largely intact"
                ],
                "explanation": "Visible water-soaked angular spots delimited by leaf veins are typical of early Xanthomonas bacterial blight on cotton foliage.",
                "recommended_actions": [
                    "Avoid entering the field when foliage is wet to prevent bacterial spread",
                    "Ensure balanced potash nutrition to boost natural plant immunity",
                    "Monitor for any blackarm lesions on stems"
                ],
                "preventive_guidance": [
                    "Use acid-delinted and certified seeds",
                    "Practice deep summer ploughing to eradicate infected plant debris",
                    "Maintain recommended field sanitation"
                ],
                "additional_information_needed": [
                    "Irrigation method used",
                    "Variety name and sowing date"
                ],
                "disclaimer": "AI-assisted assessment: This result is not a definitive agricultural diagnosis. Confirm important treatment decisions with a qualified agricultural professional or trusted agricultural authority.",
                "is_demo": True
            }

gemini_service = GeminiService()
