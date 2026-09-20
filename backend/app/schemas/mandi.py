from typing import List, Optional, Dict
from pydantic import BaseModel, Field

class MandiQuery(BaseModel):
    commodity: Optional[str] = Field(None, description="Crop or commodity name (e.g., Soybean, Wheat)")
    state: Optional[str] = Field(None, description="Indian State name (e.g., Maharashtra)")
    district: Optional[str] = Field(None, description="District name (e.g., Pune, Nashik)")
    market: Optional[str] = Field(None, description="APMC Market name (e.g., Pune, Baramati)")
    limit: Optional[int] = Field(50, ge=1, le=100, description="Max number of records to return")

class MandiPriceRecord(BaseModel):
    market: str = Field(..., description="Name of the APMC Mandi / Market")
    district: str = Field(..., description="District where the mandi is located")
    state: str = Field(..., description="State where the mandi is located")
    commodity: str = Field(..., description="Standardized commodity name")
    variety: Optional[str] = Field(None, description="Commodity variety (e.g., Yellow, Lokwan, Hybrid)")
    grade: Optional[str] = Field(None, description="Quality grade (e.g., FAQ, Medium, Large)")
    min_price: Optional[float] = Field(None, description="Reported minimum price")
    max_price: Optional[float] = Field(None, description="Reported maximum price")
    modal_price: Optional[float] = Field(None, description="Reported modal (most frequent/typical) price")
    unit: str = Field("₹/quintal", description="Price quotation unit")
    arrival_date: Optional[str] = Field(None, description="Date of market arrival reported by mandi")
    reported_at: Optional[str] = Field(None, description="Timestamp when record was compiled")

class MandiSource(BaseModel):
    name: str = Field(..., description="Name of the data authority/provider")
    url: str = Field(..., description="Official reference URL")
    description: str = Field(..., description="Attribution and dataset context")

class MandiSummary(BaseModel):
    total_records: int = Field(0, description="Total matching market records returned")
    min_price_found: Optional[float] = Field(None, description="Lowest price among returned records")
    max_price_found: Optional[float] = Field(None, description="Highest price among returned records")
    highest_modal_market: Optional[str] = Field(None, description="Market with highest reported modal price")
    highest_modal_price: Optional[float] = Field(None, description="Highest reported modal price")
    lowest_modal_market: Optional[str] = Field(None, description="Market with lowest reported modal price")
    lowest_modal_price: Optional[float] = Field(None, description="Lowest reported modal price")
    average_modal_price: Optional[float] = Field(None, description="Average modal price across returned markets")

class MandiPriceResponse(BaseModel):
    query: MandiQuery = Field(..., description="Echo of query filters applied")
    data_status: str = Field(
        ...,
        description="Data trust indicator: 'official' (live GOI OGD/AGMARKNET data), 'demo' (development fallback), or 'unavailable'"
    )
    is_demo: bool = Field(False, description="Flag indicating whether data is demo fallback")
    source: MandiSource = Field(..., description="Attribution of data origin")
    updated_at: str = Field(..., description="Timestamp of data response")
    summary: MandiSummary = Field(..., description="Factual statistical summary of returned records")
    records: List[MandiPriceRecord] = Field(default_factory=list, description="List of normalized market records")

class MandiFilterOptions(BaseModel):
    commodities: List[str] = Field(default_factory=list, description="List of supported crops/commodities")
    states: List[str] = Field(default_factory=list, description="List of available Indian States")
    districts_by_state: Dict[str, List[str]] = Field(default_factory=dict, description="District options keyed by State")
    markets_by_district: Dict[str, List[str]] = Field(default_factory=dict, description="Sample markets keyed by District")
