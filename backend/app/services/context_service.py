"""
Context Service for KisanMitra AI Farmer Assistant.
Normalizes, filters, and analyzes farmer context availability and question relevance.
"""

from typing import Dict, Any, List, Set, Tuple, Optional
from app.schemas.assistant import FarmerContext

class ContextService:
    WEATHER_KEYWORDS = {
        "weather", "rain", "rainy", "rainfall", "irrigate", "irrigation", "water",
        "spray", "spraying", "temperature", "temp", "hot", "heat", "cold", "frost",
        "wind", "windy", "humidity", "humid", "cloud", "cloudy", "forecast", "climate", "storm"
    }

    SOIL_KEYWORDS = {
        "soil", "ph", "nitrogen", "phosphorus", "potassium", "npk", "fertilizer",
        "fertility", "organic matter", "carbon", "manure", "compost", "urea", "dap", "nutrients"
    }

    CROP_HEALTH_KEYWORDS = {
        "disease", "sick", "leaf", "leaves", "spot", "spots", "blight", "rust",
        "rot", "wilt", "pest", "pests", "insect", "insects", "fungus", "fungal",
        "infection", "symptom", "symptoms", "damage", "yellow", "yellowing", "brown", "dying"
    }

    MARKET_KEYWORDS = {
        "price", "prices", "mandi", "market", "rate", "rates", "apmc", "sell", "selling",
        "quintal", "rupee", "rupees", "cost", "worth", "bhav", "wholesale"
    }

    SCHEME_KEYWORDS = {
        "scheme", "schemes", "subsidy", "subsidies", "government", "govt", "support",
        "loan", "loans", "pm-kisan", "pmkisan", "pmfby", "fasal bima", "grant", "yojana", "yojna"
    }

    CROP_GUIDE_KEYWORDS = {
        "sow", "sowing", "seed", "seeds", "plant", "planting", "spacing", "depth",
        "variety", "varieties", "harvest", "harvesting", "maturity", "yield", "growth",
        "duration", "crop", "crops", "cultivation", "agronomy"
    }

    def extract_available_context(self, context: Optional[FarmerContext]) -> Dict[str, Any]:
        """
        Inspects FarmerContext and extracts non-empty, genuine data dictionaries.
        Never fabricates or hallucinates missing data.
        """
        if not context:
            return {}

        available = {}

        if context.location and (context.location.name or context.location.state):
            loc_dict = context.location.model_dump(exclude_none=True)
            if loc_dict:
                available["location"] = loc_dict

        if context.crop and context.crop.name:
            available["crop"] = context.crop.model_dump(exclude_none=True)

        if context.soil and (context.soil.score is not None or context.soil.ph is not None or context.soil.nitrogen):
            soil_dict = context.soil.model_dump(exclude_none=True)
            if soil_dict:
                available["soil"] = soil_dict

        if context.crop_health and (context.crop_health.condition or context.crop_health.observations):
            ch_dict = context.crop_health.model_dump(exclude_none=True)
            if ch_dict:
                available["crop_health"] = ch_dict

        if context.weather and (context.weather.temperature is not None or context.weather.condition or context.weather.rain_probability is not None):
            weather_dict = context.weather.model_dump(exclude_none=True)
            if weather_dict:
                available["weather"] = weather_dict

        if context.market and (context.market.commodity or context.market.modal_price is not None):
            market_dict = context.market.model_dump(exclude_none=True)
            if market_dict:
                available["market"] = market_dict

        return available

    def determine_relevant_topics(self, question: str) -> Set[str]:
        """
        Determines relevant domain topics from the user question using keyword matching.
        """
        lower_q = question.lower()
        words = set(lower_q.replace("?", "").replace(",", "").replace(".", "").split())

        relevant = set()

        if any(w in words or w in lower_q for w in self.WEATHER_KEYWORDS):
            relevant.add("weather")

        if any(w in words or w in lower_q for w in self.SOIL_KEYWORDS):
            relevant.add("soil")

        if any(w in words or w in lower_q for w in self.CROP_HEALTH_KEYWORDS):
            relevant.add("crop_health")

        if any(w in words or w in lower_q for w in self.MARKET_KEYWORDS):
            relevant.add("market")

        if any(w in words or w in lower_q for w in self.SCHEME_KEYWORDS):
            relevant.add("schemes")

        if any(w in words or w in lower_q for w in self.CROP_GUIDE_KEYWORDS):
            relevant.add("crop_guide")

        # If general question with crop context, default to general farm context
        if not relevant:
            relevant.add("general")

        return relevant

    def filter_and_format_context(
        self,
        available: Dict[str, Any],
        relevant_topics: Set[str],
        retrieved_knowledge: Optional[Dict[str, Any]] = None
    ) -> Tuple[List[str], str]:
        """
        Formats available and relevant context into a clean, structured context string for Gemini prompt.
        Returns: (context_used_tags, formatted_context_text)
        """
        context_used = []
        lines = []

        # Location context
        if "location" in available:
            loc = available["location"]
            loc_str = f"Location: {loc.get('name', 'Unknown')}, {loc.get('state', '')}"
            lines.append(f"📍 {loc_str}")
            context_used.append("location")

        # Crop context
        if "crop" in available:
            c = available["crop"]
            crop_str = f"Active Crop: {c.get('name', 'General')}"
            if c.get("variety"):
                crop_str += f" ({c['variety']})"
            if c.get("season"):
                crop_str += f", Season: {c['season']}"
            lines.append(f"🌱 {crop_str}")
            context_used.append("crop")

        # Weather context
        if "weather" in available and ("weather" in relevant_topics or "general" in relevant_topics or "crop_guide" in relevant_topics):
            w = available["weather"]
            w_details = []
            if w.get("temperature") is not None:
                w_details.append(f"{w['temperature']}°C")
            if w.get("condition"):
                w_details.append(w['condition'])
            if w.get("rain_probability") is not None:
                w_details.append(f"Rain probability: {w['rain_probability']}%")
            if w.get("rainfall") is not None and w["rainfall"] > 0:
                w_details.append(f"Expected rain: {w['rainfall']} mm")
            if w.get("humidity") is not None:
                w_details.append(f"Humidity: {w['humidity']}%")
            if w.get("wind_speed") is not None:
                w_details.append(f"Wind: {w['wind_speed']} km/h")
            if w.get("spray_suitability"):
                w_details.append(f"Foliar Spray: {w['spray_suitability']}")
            if w.get("irrigation_advice"):
                w_details.append(f"Irrigation guidance: {w['irrigation_advice']}")

            lines.append(f"🌦 Current Weather: {', '.join(w_details)}")
            if w.get("alerts") and len(w["alerts"]) > 0:
                lines.append(f"   Agricultural Alerts: {'; '.join(w['alerts'])}")
            context_used.append("weather")

        # Soil context
        if "soil" in available and ("soil" in relevant_topics or "general" in relevant_topics or "crop_guide" in relevant_topics):
            s = available["soil"]
            s_details = []
            if s.get("score") is not None:
                s_details.append(f"Score: {s['score']}/100 ({s.get('rating', '')})")
            if s.get("ph") is not None:
                s_details.append(f"pH: {s['ph']}")
            if s.get("nitrogen"):
                s_details.append(f"Nitrogen: {s['nitrogen']}")
            if s.get("phosphorus"):
                s_details.append(f"Phosphorus: {s['phosphorus']}")
            if s.get("potassium"):
                s_details.append(f"Potassium: {s['potassium']}")
            if s.get("organic_matter") is not None:
                s_details.append(f"Organic Matter: {s['organic_matter']}%")

            lines.append(f"🧪 Soil Health: {', '.join(s_details)}")
            if s.get("observations") and len(s["observations"]) > 0:
                lines.append(f"   Key Observations: {'; '.join(s['observations'][:2])}")
            context_used.append("soil")

        # Crop Doctor context
        if "crop_health" in available and ("crop_health" in relevant_topics or "general" in relevant_topics):
            ch = available["crop_health"]
            ch_details = []
            if ch.get("crop"):
                ch_details.append(f"Crop: {ch['crop']}")
            if ch.get("condition"):
                ch_details.append(f"Possible condition: {ch['condition']}")
            if ch.get("severity"):
                ch_details.append(f"Severity: {ch['severity']}")
            if ch.get("confidence") is not None:
                ch_details.append(f"Visual Confidence: {int(ch['confidence'] * 100)}%")

            lines.append(f"🌿 AI Crop Doctor Assessment: {', '.join(ch_details)}")
            if ch.get("observations") and len(ch["observations"]) > 0:
                lines.append(f"   Visual Symptoms: {'; '.join(ch['observations'][:2])}")
            context_used.append("crop_health")

        # Market / Mandi context
        if "market" in available and ("market" in relevant_topics or "general" in relevant_topics):
            m = available["market"]
            m_details = []
            if m.get("commodity"):
                m_details.append(f"Commodity: {m['commodity']}")
            if m.get("market"):
                m_details.append(f"Market: {m['market']}")
            if m.get("modal_price") is not None:
                m_details.append(f"Modal Price: ₹{m['modal_price']} {m.get('unit', '₹/quintal')}")
            if m.get("min_price") is not None and m.get("max_price") is not None:
                m_details.append(f"Range: ₹{m['min_price']} - ₹{m['max_price']}")
            if m.get("data_status") == "demo" or m.get("is_demo"):
                m_details.append("[Demo Market Data — Not Live]")

            lines.append(f"💰 Mandi Market Context: {', '.join(m_details)}")
            context_used.append("mandi")

        # Retrieved Knowledge (Schemes or Crop Guide)
        if retrieved_knowledge:
            if "schemes" in retrieved_knowledge and retrieved_knowledge["schemes"]:
                lines.append("\n🏛️ Relevant Government Schemes Knowledge:")
                for sc in retrieved_knowledge["schemes"][:2]:
                    lines.append(f"- Scheme: {sc.get('name')} (Source: {sc.get('source_name', 'Govt Portal')})")
                    if sc.get("short_description"):
                        lines.append(f"  Summary: {sc['short_description']}")
                    if sc.get("benefits"):
                        lines.append(f"  Benefits: {'; '.join(sc['benefits'][:2])}")
                    if sc.get("eligibility"):
                        lines.append(f"  Eligibility: {'; '.join(sc['eligibility'][:2])}")
                context_used.append("schemes")

            if "crop_guide" in retrieved_knowledge and retrieved_knowledge["crop_guide"]:
                cg = retrieved_knowledge["crop_guide"]
                lines.append(f"\n🌾 ICAR Crop Agronomy Reference ({cg.get('name', 'Crop')}):")
                if cg.get("soil"):
                    lines.append(f"- Optimal Soil: pH {cg['soil'].get('preferred_ph', '6.0-7.5')}, Types: {', '.join(cg['soil'].get('soil_type', []))}")
                if cg.get("sowing"):
                    lines.append(f"- Sowing Window: {cg['sowing'].get('general_window', 'Seasonal')}")
                if cg.get("water"):
                    lines.append(f"- Water Needs: {cg['water'].get('requirements', 'Standard')} (Critical stages: {', '.join(cg['water'].get('critical_stages', [])[:2])})")
                if cg.get("nutrition") and cg["nutrition"].get("general_considerations"):
                    lines.append(f"- Nutrition Considerations: {'; '.join(cg['nutrition']['general_considerations'][:2])}")
                if cg.get("pests_and_diseases"):
                    pests = [p.get("name") for p in cg["pests_and_diseases"] if p.get("name")]
                    if pests:
                        lines.append(f"- Known Pests/Diseases: {', '.join(pests[:3])}")
                context_used.append("crop_guide")

        formatted_text = "\n".join(lines) if lines else "No farm-specific context available."
        return list(dict.fromkeys(context_used)), formatted_text

context_service = ContextService()
