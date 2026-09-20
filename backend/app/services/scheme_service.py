"""
Government Schemes Service.
Provides deterministic filtering, search, and detailed retrieval for verified agricultural schemes.
"""

from typing import List, Optional, Dict, Any
from fastapi import HTTPException, status
from app.core.scheme_constants import (
    SCHEME_CATEGORIES,
    SCHEME_STATES,
    VERIFIED_GOVERNMENT_SCHEMES,
)
from app.schemas.scheme import (
    SchemeSummary,
    SchemeDetail,
    SchemeResponse,
    SchemeFilterMeta,
)

class SchemeService:
    def __init__(self):
        self.schemes_data = VERIFIED_GOVERNMENT_SCHEMES

    def _to_summary(self, item: Dict[str, Any]) -> SchemeSummary:
        return SchemeSummary(
            id=item["id"],
            name=item["name"],
            short_description=item["short_description"],
            category=item["category"],
            state=item.get("state", "All India (Central)"),
            target_group=item.get("target_group", []),
            official_url=item["official_url"],
            source_name=item["source_name"],
            last_verified=item.get("last_verified", "2026-09-01"),
        )

    def _to_detail(self, item: Dict[str, Any]) -> SchemeDetail:
        return SchemeDetail(
            id=item["id"],
            name=item["name"],
            short_description=item["short_description"],
            category=item["category"],
            state=item.get("state", "All India (Central)"),
            target_group=item.get("target_group", []),
            official_url=item["official_url"],
            source_name=item["source_name"],
            last_verified=item.get("last_verified", "2026-09-01"),
            eligibility=item.get("eligibility", []),
            benefits=item.get("benefits", []),
            documents=item.get("documents", []),
            application_method=item.get("application_method", "Apply online at the official portal."),
            disclaimer=(
                "Scheme terms, subsidy rates, and budget quotas are subject to revision by respective government ministries. "
                "Always verify application status and eligibility directly on the official portal."
            ),
        )

    async def get_schemes(
        self,
        category: Optional[str] = None,
        state: Optional[str] = None,
        search: Optional[str] = None,
    ) -> SchemeResponse:
        """Filter schemes by category, state, and search term"""
        filtered = self.schemes_data

        # Category Filter
        if category and category.strip() and category.strip().lower() not in ["all", "all categories"]:
            c_clean = category.strip().lower()
            filtered = [s for s in filtered if s["category"].lower() == c_clean]

        # State Filter
        if state and state.strip() and state.strip().lower() not in ["all", "all india", "all states"]:
            s_clean = state.strip().lower()
            filtered = [
                s for s in filtered
                if s.get("state", "").lower() == s_clean or "all india" in s.get("state", "").lower()
            ]

        # Search Query Filter (name, short_description, category, target_group)
        if search and search.strip():
            q = search.strip().lower()
            filtered = [
                s for s in filtered
                if (
                    q in s["name"].lower()
                    or q in s["short_description"].lower()
                    or q in s["category"].lower()
                    or any(q in tg.lower() for tg in s.get("target_group", []))
                    or any(q in el.lower() for el in s.get("eligibility", []))
                )
            ]

        summaries = [self._to_summary(s) for s in filtered]

        return SchemeResponse(
            total=len(summaries),
            categories=SCHEME_CATEGORIES,
            states=SCHEME_STATES,
            schemes=summaries,
        )

    async def get_scheme_by_id(self, scheme_id: str) -> SchemeDetail:
        """Retrieve full details for a single scheme by ID"""
        clean_id = scheme_id.strip().lower()
        for s in self.schemes_data:
            if s["id"].lower() == clean_id:
                return self._to_detail(s)

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Government scheme with ID '{scheme_id}' was not found in the verified directory.",
        )

    def get_filter_meta(self) -> SchemeFilterMeta:
        """Return available category and state filters"""
        return SchemeFilterMeta(
            categories=SCHEME_CATEGORIES,
            states=SCHEME_STATES,
        )

scheme_service = SchemeService()
