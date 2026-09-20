"""
Mandi Price Provider.
Communicates with Government of India Open Government Data (data.gov.in) / AGMARKNET API,
with timeout handling, query filters, and clear development fallback isolation.
"""

import logging
from typing import Dict, Any, List, Optional, Tuple
import httpx

from app.core.config import settings
from app.core.mandi_constants import (
    DEMO_MANDI_RECORDS,
    COMMODITY_ALIASES,
)

logger = logging.getLogger(__name__)

class MandiProvider:
    def __init__(self):
        self.api_url = settings.MANDI_API_URL
        self.api_key = settings.MANDI_API_KEY
        self.timeout = 6.0  # 6 seconds timeout

    def _normalize_commodity_query(self, commodity: Optional[str]) -> Optional[str]:
        if not commodity:
            return None
        cleaned = commodity.strip().lower()
        return COMMODITY_ALIASES.get(cleaned, commodity.strip())

    async def fetch_market_prices(
        self,
        commodity: Optional[str] = None,
        state: Optional[str] = None,
        district: Optional[str] = None,
        market: Optional[str] = None,
        limit: int = 50,
    ) -> Tuple[List[Dict[str, Any]], str, bool]:
        """
        Fetch market price records from OGD AGMARKNET API.
        Returns: (records_list, data_status, is_demo)
        data_status: 'official' | 'demo' | 'unavailable'
        is_demo: bool
        """
        normalized_commodity = self._normalize_commodity_query(commodity)

        # 1. If API Key is available, attempt real live query to data.gov.in
        if self.api_key and self.api_key.strip():
            params: Dict[str, Any] = {
                "api-key": self.api_key.strip(),
                "format": "json",
                "offset": 0,
                "limit": limit,
            }

            if state and state.strip():
                params["filters[state]"] = state.strip()
            if district and district.strip():
                params["filters[district]"] = district.strip()
            if normalized_commodity:
                params["filters[commodity]"] = normalized_commodity
            if market and market.strip():
                params["filters[market]"] = market.strip()

            try:
                async with httpx.AsyncClient(timeout=self.timeout) as client:
                    response = await client.get(self.api_url, params=params)
                    
                    if response.status_code == 200:
                        data = response.json()
                        records = data.get("records", [])
                        logger.info(f"Successfully retrieved {len(records)} official OGD mandi records.")
                        return records, "official", False
                    else:
                        logger.warning(
                            f"OGD Mandi API returned status {response.status_code}: {response.text[:200]}"
                        )
            except Exception as e:
                logger.warning(f"Failed to communicate with official Mandi API: {str(e)}")

        # 2. Development Fallback (When API key is not configured or external service is unreachable)
        logger.info("Using clearly labeled development demo records for Mandi Intelligence.")
        demo_records = self._filter_demo_records(normalized_commodity, state, district, market)
        return demo_records, "demo", True

    def _filter_demo_records(
        self,
        commodity: Optional[str] = None,
        state: Optional[str] = None,
        district: Optional[str] = None,
        market: Optional[str] = None,
    ) -> List[Dict[str, Any]]:
        """Filter demo records to simulate realistic search behavior"""
        results = []
        for r in DEMO_MANDI_RECORDS:
            if commodity and commodity.lower() not in r["commodity"].lower():
                # Check alias or substring
                if r["commodity"].lower() not in commodity.lower():
                    continue
            if state and state.lower() not in r["state"].lower():
                continue
            if district and district.lower() not in r["district"].lower():
                continue
            if market and market.lower() not in r["market"].lower():
                continue
            results.append(r)

        # If strict query returned nothing in demo, return records matching commodity or state
        if not results and (commodity or state):
            for r in DEMO_MANDI_RECORDS:
                if commodity and commodity.lower() in r["commodity"].lower():
                    results.append(r)
                elif state and state.lower() in r["state"].lower():
                    results.append(r)

        return results if results else DEMO_MANDI_RECORDS[:4]

mandi_provider = MandiProvider()
