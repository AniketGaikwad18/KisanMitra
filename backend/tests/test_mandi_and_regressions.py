import io
import pytest
from PIL import Image
from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock

from app.main import app
from app.services.mandi_service import mandi_service
from app.services.mandi_provider import mandi_provider
from app.schemas.mandi import MandiPriceRecord

client = TestClient(app)

# 1. Health check test
def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "kisanmitra" in data["service"].lower()

# 2. Normalization: Valid raw record
def test_mandi_record_normalization_valid():
    raw = {
        "state": "Maharashtra",
        "district": "Pune",
        "market": "Pune APMC",
        "commodity": "Soyabean",
        "variety": "Yellow",
        "grade": "FAQ",
        "arrival_date": "20/09/2026",
        "min_price": "4800",
        "max_price": "5400",
        "modal_price": "5200",
    }
    normalized = mandi_service._normalize_record(raw)
    assert normalized.commodity == "Soybean"
    assert normalized.market == "Pune APMC"
    assert normalized.min_price == 4800.0
    assert normalized.max_price == 5400.0
    assert normalized.modal_price == 5200.0
    assert normalized.unit == "₹/quintal"

# 3. Normalization: Missing modal price (Must be None, NOT replaced with min or max)
def test_mandi_record_normalization_missing_modal():
    raw = {
        "state": "Maharashtra",
        "district": "Pune",
        "market": "Baramati",
        "commodity": "Wheat",
        "min_price": "2400",
        "max_price": "2800",
        "modal_price": None,
    }
    normalized = mandi_service._normalize_record(raw)
    assert normalized.min_price == 2400.0
    assert normalized.max_price == 2800.0
    assert normalized.modal_price is None

# 4. Normalization: Missing min & max prices
def test_mandi_record_normalization_missing_min_max():
    raw = {
        "state": "Maharashtra",
        "district": "Nashik",
        "market": "Lasalgaon",
        "commodity": "Onion",
        "modal_price": "2650",
    }
    normalized = mandi_service._normalize_record(raw)
    assert normalized.min_price is None
    assert normalized.max_price is None
    assert normalized.modal_price == 2650.0

# 5. Statistical Summary Calculation (Factual, no "best mandi" claims)
def test_mandi_summary_computation():
    records = [
        MandiPriceRecord(
            market="Market A",
            district="Pune",
            state="Maharashtra",
            commodity="Soybean",
            min_price=4800.0,
            max_price=5200.0,
            modal_price=5000.0,
        ),
        MandiPriceRecord(
            market="Market B",
            district="Pune",
            state="Maharashtra",
            commodity="Soybean",
            min_price=4900.0,
            max_price=5500.0,
            modal_price=5300.0,
        ),
        MandiPriceRecord(
            market="Market C",
            district="Pune",
            state="Maharashtra",
            commodity="Soybean",
            min_price=4700.0,
            max_price=5100.0,
            modal_price=4900.0,
        ),
    ]
    summary = mandi_service._compute_summary(records)
    assert summary.total_records == 3
    assert summary.min_price_found == 4700.0
    assert summary.max_price_found == 5500.0
    assert summary.highest_modal_market == "Market B"
    assert summary.highest_modal_price == 5300.0
    assert summary.lowest_modal_market == "Market C"
    assert summary.lowest_modal_price == 4900.0
    assert summary.average_modal_price == round((5000.0 + 5300.0 + 4900.0) / 3, 1)

# 6. Valid Mandi Price API Request
def test_get_mandi_prices_endpoint_default():
    response = client.get("/api/mandi/prices?commodity=Soybean&state=Maharashtra&district=Pune")
    assert response.status_code == 200
    data = response.json()
    assert "query" in data
    assert "data_status" in data
    assert "source" in data
    assert "summary" in data
    assert "records" in data
    assert len(data["records"]) > 0

# 7. Commodity and State Filtering
def test_get_mandi_prices_filtering():
    response = client.get("/api/mandi/prices?commodity=Onion&state=Maharashtra&district=Nashik")
    assert response.status_code == 200
    data = response.json()
    assert len(data["records"]) > 0
    for rec in data["records"]:
        assert "onion" in rec["commodity"].lower()

# 8. Provider Timeout and Fallback Handling
def test_mandi_provider_timeout_fallback():
    with patch("httpx.AsyncClient.get", side_effect=Exception("Connection timed out")):
        response = client.get("/api/mandi/prices?commodity=Soybean&state=Maharashtra&district=Pune")
        assert response.status_code == 200
        data = response.json()
        assert data["is_demo"] is True
        assert data["data_status"] == "demo"
        assert len(data["records"]) > 0

# 9. Filter Options Endpoint
def test_get_mandi_filter_options():
    response = client.get("/api/mandi/filters")
    assert response.status_code == 200
    data = response.json()
    assert "commodities" in data
    assert len(data["commodities"]) >= 5
    assert "states" in data
    assert "districts_by_state" in data
    assert "Maharashtra" in data["districts_by_state"]

# 10. Regression: Weather API Endpoint
def test_weather_regression():
    response = client.get("/api/weather?latitude=18.5204&longitude=73.8567&location=Pune")
    assert response.status_code == 200
    data = response.json()
    assert "current" in data
    assert "farm_outlook" in data

# 11. Regression: Soil Health Endpoint
def test_soil_regression():
    payload = {
        "ph": 6.8,
        "nitrogen": 300.0,
        "phosphorus": 35.0,
        "potassium": 220.0,
        "crop": "Soybean",
    }
    response = client.post("/api/soil/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "overall_score" in data

# 12. Regression: Crop Doctor Endpoint
def test_crop_doctor_regression():
    buf = io.BytesIO()
    img = Image.new("RGB", (100, 100), color=(50, 120, 80))
    img.save(buf, format="JPEG")
    buf.seek(0)

    files = {"file": ("crop.jpg", buf.read(), "image/jpeg")}
    response = client.post("/api/crop/analyze", files=files)
    assert response.status_code == 200
    data = response.json()
    assert "is_identified" in data
