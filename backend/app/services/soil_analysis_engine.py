"""
Deterministic Soil Health Analysis Engine.

Calculates explainable soil fertility scores, classifies soil test metrics,
generates agronomic observations, safe recommendations, and crop-aware context
without relying on stochastic LLM calculations.
"""

from typing import Dict, Any, List, Optional
from app.core.soil_constants import (
    NITROGEN_THRESHOLDS,
    PHOSPHORUS_THRESHOLDS,
    POTASSIUM_THRESHOLDS,
    ORGANIC_MATTER_THRESHOLDS,
    PH_CLASSIFICATIONS,
    CROP_AGRONOMIC_PROFILES,
)
from app.schemas.soil import (
    SoilAnalysisRequest,
    SoilAnalysisResponse,
    SoilParameters,
    SoilParameterResult,
    CropContext,
)

class SoilAnalysisEngine:
    def classify_ph(self, ph: float) -> Dict[str, Any]:
        """Classify pH value into agronomic classification and sub-score"""
        for rule in PH_CLASSIFICATIONS:
            if ph <= rule["max"]:
                return {
                    "value": ph,
                    "unit": "pH",
                    "status": rule["status"],
                    "severity": rule["severity"],
                    "rating_score": rule["score"]
                }
        # Fallback for unexpected values
        return {
            "value": ph,
            "unit": "pH",
            "status": "Extreme pH",
            "severity": "warning",
            "rating_score": 30
        }

    def classify_nutrient(self, value: float, thresholds: Dict[str, float], nutrient_name: str) -> Dict[str, Any]:
        """Classify N, P, or K into Low, Medium, or High with advisory score"""
        low_max = thresholds["low_max"]
        medium_max = thresholds["medium_max"]

        if value < low_max:
            return {
                "value": value,
                "unit": "kg/ha",
                "status": "Low",
                "severity": "moderate",
                "rating_score": 50
            }
        elif value <= medium_max:
            return {
                "value": value,
                "unit": "kg/ha",
                "status": "Medium",
                "severity": "normal",
                "rating_score": 95
            }
        else:
            return {
                "value": value,
                "unit": "kg/ha",
                "status": "High",
                "severity": "normal",
                "rating_score": 85
            }

    def classify_organic_matter(self, om: Optional[float]) -> Optional[Dict[str, Any]]:
        """Classify soil organic carbon / matter percentage if provided"""
        if om is None:
            return None

        low_max = ORGANIC_MATTER_THRESHOLDS["low_max"]
        medium_max = ORGANIC_MATTER_THRESHOLDS["medium_max"]

        if om < low_max:
            return {
                "value": om,
                "unit": "%",
                "status": "Low",
                "severity": "moderate",
                "rating_score": 55
            }
        elif om <= medium_max:
            return {
                "value": om,
                "unit": "%",
                "status": "Medium",
                "severity": "normal",
                "rating_score": 85
            }
        else:
            return {
                "value": om,
                "unit": "%",
                "status": "High",
                "severity": "normal",
                "rating_score": 100
            }

    def calculate_overall_score(
        self,
        ph_res: Dict[str, Any],
        n_res: Dict[str, Any],
        p_res: Dict[str, Any],
        k_res: Dict[str, Any],
        om_res: Optional[Dict[str, Any]]
    ) -> int:
        """
        Calculate explainable 0-100 soil health score using weighted composite scoring.
        Normalizes weights when Organic Matter is omitted.
        """
        if om_res is not None:
            # Weighted with OM: pH (30%), N (25%), P (20%), K (20%), OM (5%)
            raw_score = (
                ph_res["rating_score"] * 0.30 +
                n_res["rating_score"] * 0.25 +
                p_res["rating_score"] * 0.20 +
                k_res["rating_score"] * 0.20 +
                om_res["rating_score"] * 0.05
            )
        else:
            # Normalized without OM: pH (32%), N (28%), P (20%), K (20%)
            raw_score = (
                ph_res["rating_score"] * 0.32 +
                n_res["rating_score"] * 0.28 +
                p_res["rating_score"] * 0.20 +
                k_res["rating_score"] * 0.20
            )

        return int(round(max(0, min(100, raw_score))))

    def get_rating_label(self, score: int) -> str:
        """Map score to human-readable rating"""
        if score < 40:
            return "Needs Attention"
        elif score < 60:
            return "Fair"
        elif score < 80:
            return "Good"
        else:
            return "Very Good"

    def generate_observations(
        self,
        req: SoilAnalysisRequest,
        ph_res: Dict[str, Any],
        n_res: Dict[str, Any],
        p_res: Dict[str, Any],
        k_res: Dict[str, Any],
        om_res: Optional[Dict[str, Any]]
    ) -> List[str]:
        """Generate structured agronomic observations from classified metrics"""
        obs = []

        # pH observation
        obs.append(f"Soil pH is {req.ph} ({ph_res['status']}).")

        # Nitrogen observation
        if n_res["status"] == "Low":
            obs.append(f"Available Nitrogen ({req.nitrogen} kg/ha) is Low, which may limit vegetative biomass development.")
        elif n_res["status"] == "Medium":
            obs.append(f"Available Nitrogen ({req.nitrogen} kg/ha) is in the adequate Medium range for balanced growth.")
        else:
            obs.append(f"Available Nitrogen ({req.nitrogen} kg/ha) is High, which provides strong initial canopy vigor.")

        # Phosphorus observation
        if p_res["status"] == "Low":
            obs.append(f"Available Phosphorus ({req.phosphorus} kg/ha) is Low; early root establishment may require attention.")
        elif p_res["status"] == "Medium":
            obs.append(f"Available Phosphorus ({req.phosphorus} kg/ha) is Medium, supporting healthy root development.")
        else:
            obs.append(f"Available Phosphorus ({req.phosphorus} kg/ha) is High, ensuring strong root system support.")

        # Potassium observation
        if k_res["status"] == "Low":
            obs.append(f"Available Potassium ({req.potassium} kg/ha) is Low, which may impact disease resistance and grain/pod filling.")
        elif k_res["status"] == "Medium":
            obs.append(f"Available Potassium ({req.potassium} kg/ha) is Medium, providing good overall crop resilience.")
        else:
            obs.append(f"Available Potassium ({req.potassium} kg/ha) is High, supporting optimal moisture regulation and crop quality.")

        # Organic matter observation
        if om_res is not None:
            obs.append(f"Soil Organic Carbon ({om_res['value']}%) is {om_res['status']}.")
        else:
            obs.append("Organic matter percentage was not provided in this assessment.")

        return obs

    def generate_recommendations(
        self,
        req: SoilAnalysisRequest,
        ph_res: Dict[str, Any],
        n_res: Dict[str, Any],
        p_res: Dict[str, Any],
        k_res: Dict[str, Any],
        om_res: Optional[Dict[str, Any]]
    ) -> List[str]:
        """
        Generate safe, general farmer-friendly recommendations.
        DO NOT provide exact chemical prescriptions or dosages.
        """
        recs = []

        # pH recommendations
        if "Strongly acidic" in ph_res["status"]:
            recs.append("The soil is acidic. Consider consulting a local agricultural extension officer regarding agricultural lime application based on a full lab test.")
        elif "Strongly alkaline" in ph_res["status"]:
            recs.append("The soil is strongly alkaline. Consider discussing gypsum application and organic matter addition with a local agronomy advisor to improve structure.")
        elif "Near neutral" in ph_res["status"]:
            recs.append("Soil pH is in an ideal range for nutrient uptake. Maintain current soil conservation practices.")

        # Nitrogen recommendations
        if n_res["status"] == "Low":
            recs.append("Nitrogen is low. Consider incorporating well-decomposed FYM (Farmyard Manure), vermicompost, or green manuring, and review nitrogen scheduling with an agronomist.")
        elif n_res["status"] == "High":
            recs.append("Nitrogen is high. Avoid excessive nitrogen applications that can cause lodging or increased pest vulnerability.")

        # Phosphorus recommendations
        if p_res["status"] == "Low":
            recs.append("Phosphorus appears low. Review basal phosphorus management and consider bio-fertilizers like Phosphate Solubilizing Bacteria (PSB) to improve uptake.")

        # Potassium recommendations
        if k_res["status"] == "Low":
            recs.append("Potassium appears low. Review potassium management for crop flowering and pod/grain development with a local agricultural expert.")

        # Organic Matter recommendations
        if om_res is None or om_res["status"] == "Low":
            recs.append("Incorporate organic carbon through compost, crop residue recycling, or cover crops to improve soil microbial activity and moisture retention.")

        # Universal monitoring recommendation
        recs.append("Conduct a periodic certified laboratory soil test every 2–3 seasons to monitor long-term fertility trends.")

        return recs

    def build_crop_context(self, crop_name: Optional[str], ph: float) -> Optional[CropContext]:
        """Build crop-specific agronomic notes and pH suitability"""
        if not crop_name:
            return None

        # Lookup in crop agronomic profiles or fallback to 'Other'
        profile = CROP_AGRONOMIC_PROFILES.get(crop_name) or CROP_AGRONOMIC_PROFILES.get("Other")
        if not profile:
            return None

        min_ph = profile["suitable_ph_min"]
        max_ph = profile["suitable_ph_max"]
        is_suitable = min_ph <= ph <= max_ph

        return CropContext(
            crop_name=crop_name,
            suitable_ph_range=f"{min_ph} – {max_ph}",
            is_ph_suitable=is_suitable,
            primary_focus=profile["primary_nutrient_focus"],
            soil_notes=profile["soil_notes"],
            considerations=profile["considerations"]
        )

    def analyze(self, req: SoilAnalysisRequest) -> SoilAnalysisResponse:
        """Execute complete soil intelligence analysis pipeline"""
        ph_res = self.classify_ph(req.ph)
        n_res = self.classify_nutrient(req.nitrogen, NITROGEN_THRESHOLDS, "Nitrogen")
        p_res = self.classify_nutrient(req.phosphorus, PHOSPHORUS_THRESHOLDS, "Phosphorus")
        k_res = self.classify_nutrient(req.potassium, POTASSIUM_THRESHOLDS, "Potassium")
        om_res = self.classify_organic_matter(req.organic_matter)

        overall_score = self.calculate_overall_score(ph_res, n_res, p_res, k_res, om_res)
        rating_label = self.get_rating_label(overall_score)

        observations = self.generate_observations(req, ph_res, n_res, p_res, k_res, om_res)
        recommendations = self.generate_recommendations(req, ph_res, n_res, p_res, k_res, om_res)
        crop_context = self.build_crop_context(req.crop, req.ph)

        data_quality_notes = [
            "Threshold classifications are based on standard ICAR Indian agricultural soil testing benchmarks (Alkaline Permanganate for N, Olsen/Bray for P, Ammonium Acetate for K).",
            "Actual fertilizer requirements depend on soil texture, irrigation status, target yield, and state agricultural university recommendations."
        ]
        if req.organic_matter is None:
            data_quality_notes.append("Organic matter was omitted; overall score was normalized without penalty.")

        parameters = SoilParameters(
            ph=SoilParameterResult(**ph_res),
            nitrogen=SoilParameterResult(**n_res),
            phosphorus=SoilParameterResult(**p_res),
            potassium=SoilParameterResult(**k_res),
            organic_matter=SoilParameterResult(**om_res) if om_res else None
        )

        return SoilAnalysisResponse(
            overall_score=overall_score,
            rating=rating_label,
            parameters=parameters,
            observations=observations,
            recommendations=recommendations,
            crop_context=crop_context,
            data_quality_notes=data_quality_notes,
            disclaimer="Advisory Assessment: This score and guidance are calculated from the values you entered and represent decision-support insights. It does not replace a certified laboratory soil test certificate or localized university agronomy recommendations."
        )

soil_analysis_engine = SoilAnalysisEngine()
