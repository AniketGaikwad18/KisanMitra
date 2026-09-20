"""
Mandi Price Intelligence Service.
Handles normalization, factual statistical market summaries, and filter options.
"""

from datetime import datetime
from typing import Dict, Any, List, Optional
import re

from app.core.mandi_constants import (
    MANDI_SOURCE_INFO,
    SUPPORTED_COMMODITIES,
    INDIAN_AGRICULTURAL_STATES,
    DISTRICTS_BY_STATE,
    SAMPLE_MARKETS_BY_DISTRICT,
    COMMODITY_ALIASES,
)
from app.schemas.mandi import (
    MandiQuery,
    MandiPriceRecord,
    MandiSource,
    MandiSummary,
    MandiPriceResponse,
    MandiFilterOptions,
)
from app.services.mandi_provider import mandi_provider

class MandiService:
    def _parse_price(self, val: Any) -> Optional[float]:
        """Safely parse price to float or return None"""
        if val is None:
            return None
        if isinstance(val, (int, float)):
            return float(val) if val > 0 else None
        
        # String cleanup
        cleaned = str(val).replace(",", "").replace("₹", "").strip()
        if not cleaned or cleaned.lower() in ["na", "null", "none", "-", "0"]:
            return None
        
        try:
            # Extract numeric value
            match = re.search(r"[-+]?\d*\.\d+|\d+", cleaned)
            if match:
                parsed = float(match.group())
                return parsed if parsed > 0 else None
        except Exception:
            pass
        return None

    def _normalize_record(self, raw: Dict[str, Any]) -> MandiPriceRecord:
        """Normalize various API field naming conventions into unified MandiPriceRecord"""
        # Field mapping (OGD / AGMARKNET / Fallback formats)
        market = str(raw.get("market") or raw.get("market_name") or raw.get("market_center") or "Unknown Market").strip()
        district = str(raw.get("district") or raw.get("district_name") or "").strip()
        state = str(raw.get("state") or raw.get("state_name") or "").strip()
        
        raw_commodity = str(raw.get("commodity") or raw.get("commodity_name") or "Commodity").strip()
        normalized_commodity = COMMODITY_ALIASES.get(raw_commodity.lower(), raw_commodity)

        variety = raw.get("variety")
        if variety:
            variety = str(variety).strip()

        grade = raw.get("grade")
        if grade:
            grade = str(grade).strip()

        min_p = self._parse_price(raw.get("min_price") or raw.get("min_price_rs"))
        max_p = self._parse_price(raw.get("max_price") or raw.get("max_price_rs"))
        modal_p = self._parse_price(raw.get("modal_price") or raw.get("modal_price_rs"))

        unit = str(raw.get("unit") or "₹/quintal").strip()
        arrival_date = str(raw.get("arrival_date") or raw.get("date") or datetime.now().strftime("%Y-%m-%d")).strip()

        return MandiPriceRecord(
            market=market,
            district=district,
            state=state,
            commodity=normalized_commodity,
            variety=variety,
            grade=grade,
            min_price=min_p,
            max_price=max_p,
            modal_price=modal_p,
            unit=unit,
            arrival_date=arrival_date,
            reported_at=datetime.now().isoformat(),
        )

    def _compute_summary(self, records: List[MandiPriceRecord]) -> MandiSummary:
        """Compute factual statistical summary without subjective selling recommendations"""
        if not records:
            return MandiSummary()

        valid_min_prices = [r.min_price for r in records if r.min_price is not None]
        valid_max_prices = [r.max_price for r in records if r.max_price is not None]
        valid_modal_records = [(r.market, r.modal_price) for r in records if r.modal_price is not None]

        min_p_found = min(valid_min_prices) if valid_min_prices else None
        max_p_found = max(valid_max_prices) if valid_max_prices else None

        highest_modal_mkt = None
        highest_modal_p = None
        lowest_modal_mkt = None
        lowest_modal_p = None
        avg_modal_p = None

        if valid_modal_records:
            # Sort by modal price
            sorted_by_modal = sorted(valid_modal_records, key=lambda x: x[1])
            lowest_modal_mkt, lowest_modal_p = sorted_by_modal[0]
            highest_modal_mkt, highest_modal_p = sorted_by_modal[-1]
            
            modal_sum = sum(p for _, p in valid_modal_records)
            avg_modal_p = round(modal_sum / len(valid_modal_records), 1)

        return MandiSummary(
            total_records=len(records),
            min_price_found=min_p_found,
            max_price_found=max_p_found,
            highest_modal_market=highest_modal_mkt,
            highest_modal_price=highest_modal_p,
            lowest_modal_market=lowest_modal_mkt,
            lowest_modal_price=lowest_modal_p,
            average_modal_price=avg_modal_p,
        )

    async def get_mandi_prices(
        self,
        commodity: Optional[str] = "Soybean",
        state: Optional[str] = "Maharashtra",
        district: Optional[str] = "Pune",
        market: Optional[str] = None,
        limit: int = 50,
    ) -> MandiPriceResponse:
        """
        Main entry point for fetching and normalizing mandi price intelligence.
        """
        raw_records, data_status, is_demo = await mandi_provider.fetch_market_prices(
            commodity=commodity,
            state=state,
            district=district,
            market=market,
            limit=limit,
        )

        normalized_records = [self._normalize_record(r) for r in raw_records]
        summary = self._compute_summary(normalized_records)

        source = MandiSource(
            name=MANDI_SOURCE_INFO["name"],
            url=MANDI_SOURCE_INFO["url"],
            description=MANDI_SOURCE_INFO["description"],
        )

        query = MandiQuery(
            commodity=commodity,
            state=state,
            district=district,
            market=market,
            limit=limit,
        )

        return MandiPriceResponse(
            query=query,
            data_status=data_status,
            is_demo=is_demo,
            source=source,
            updated_at=datetime.now().isoformat(),
            summary=summary,
            records=normalized_records,
        )

    def get_filter_options(self) -> MandiFilterOptions:
        """Return available commodities, states, and districts for dropdown selectors"""
        return MandiFilterOptions(
            commodities=SUPPORTED_COMMODITIES,
            states=INDIAN_AGRICULTURAL_STATES,
            districts_by_state=DISTRICTS_BY_STATE,
            markets_by_district=SAMPLE_MARKETS_BY_DISTRICT,
        )

mandi_service = MandiService()
