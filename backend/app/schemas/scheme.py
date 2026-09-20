from typing import List, Optional
from pydantic import BaseModel, Field

class SchemeSummary(BaseModel):
    id: str = Field(..., description="Unique scheme identifier")
    name: str = Field(..., description="Official scheme title")
    short_description: str = Field(..., description="Concise summary of purpose and benefit")
    category: str = Field(..., description="Scheme thematic category")
    state: str = Field("All India (Central)", description="Geographic applicability (Central or State)")
    target_group: List[str] = Field(default_factory=list, description="Eligible beneficiary groups")
    official_url: str = Field(..., description="Verified official government portal link")
    source_name: str = Field(..., description="Official department/ministry attribution")
    last_verified: str = Field(..., description="Date of last data verification")

class SchemeDetail(SchemeSummary):
    eligibility: List[str] = Field(default_factory=list, description="Detailed eligibility criteria points")
    benefits: List[str] = Field(default_factory=list, description="Financial and non-financial benefits")
    documents: List[str] = Field(default_factory=list, description="List of required application documents")
    application_method: str = Field(..., description="Step-by-step application guidance")
    disclaimer: str = Field(
        "Scheme terms and budgetary allocations are subject to government guidelines. Always verify details on the official portal before applying.",
        description="Statutory advisory notice"
    )

class SchemeResponse(BaseModel):
    total: int = Field(..., description="Total schemes matching filter criteria")
    categories: List[str] = Field(default_factory=list, description="Available category filters")
    states: List[str] = Field(default_factory=list, description="Available state filters")
    schemes: List[SchemeSummary] = Field(default_factory=list, description="Matching scheme summaries")

class SchemeFilterMeta(BaseModel):
    categories: List[str] = Field(default_factory=list, description="All scheme categories")
    states: List[str] = Field(default_factory=list, description="All participating states")
