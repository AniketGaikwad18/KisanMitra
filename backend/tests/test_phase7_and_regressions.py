import io
import pytest
from PIL import Image
from fastapi.testclient import TestClient

from app.main import app
from app.core.scheme_constants import VERIFIED_GOVERNMENT_SCHEMES
from app.core.crop_guide_constants import SUPPORTED_CROP_PROFILES

client = TestClient(app)

# ============================================================
# PART A: GOVERNMENT SCHEMES TESTS (1-8)
# ============================================================

# 1. List schemes
def test_list_schemes_endpoint():
    response = client.get("/api/schemes")
    assert response.status_code == 200
    data = response.json()
    assert "total" in data
    assert "schemes" in data
    assert data["total"] == len(VERIFIED_GOVERNMENT_SCHEMES)
    assert len(data["schemes"]) >= 8

    # Verify summary structure
    first = data["schemes"][0]
    assert "id" in first
    assert "name" in first
    assert "short_description" in first
    assert "category" in first
    assert "target_group" in first
    assert "state" in first
    assert "official_url" in first
    assert "source_name" in first

# 2. Search schemes
def test_search_schemes():
    # Search for insurance
    res_ins = client.get("/api/schemes?search=insurance")
    assert res_ins.status_code == 200
    data_ins = res_ins.json()
    assert data_ins["total"] > 0
    assert any("pmfby" in s["id"] for s in data_ins["schemes"])

    # Search for loan / credit
    res_loan = client.get("/api/schemes?search=kcc")
    assert res_loan.status_code == 200
    data_loan = res_loan.json()
    assert data_loan["total"] > 0
    assert any("kcc" in s["id"] for s in data_loan["schemes"])

    # Search for soil
    res_soil = client.get("/api/schemes?search=soil")
    assert res_soil.status_code == 200
    data_soil = res_soil.json()
    assert data_soil["total"] > 0
    assert any("soil" in s["id"] for s in data_soil["schemes"])

# 3. Category filtering
def test_category_filtering():
    res = client.get("/api/schemes?category=Crop%20Insurance")
    assert res.status_code == 200
    data = res.json()
    assert data["total"] >= 1
    for s in data["schemes"]:
        assert s["category"] == "Crop Insurance"

    res_inc = client.get("/api/schemes?category=Income%20Support")
    assert res_inc.status_code == 200
    data_inc = res_inc.json()
    assert data_inc["total"] >= 1
    for s in data_inc["schemes"]:
        assert s["category"] == "Income Support"

# 4. State filtering
def test_state_filtering():
    res_mh = client.get("/api/schemes?state=Maharashtra")
    assert res_mh.status_code == 200
    data_mh = res_mh.json()
    assert data_mh["total"] >= 1
    for s in data_mh["schemes"]:
        assert "Maharashtra" in s["state"] or "All India" in s["state"]

    res_all = client.get("/api/schemes?state=All%20India%20(Central)")
    assert res_all.status_code == 200
    data_all = res_all.json()
    assert data_all["total"] >= 5

# 5. Scheme detail
def test_scheme_detail():
    response = client.get("/api/schemes/pm-kisan")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "pm-kisan"
    assert "Pradhan Mantri Kisan Samman Nidhi" in data["name"]
    assert len(data["eligibility"]) > 0
    assert len(data["benefits"]) > 0
    assert len(data["documents"]) > 0
    assert "application_method" in data
    assert data["official_url"].startswith("https://")
    assert data["source_name"] != ""
    assert data["last_verified"] != ""

# 6. Unknown scheme
def test_unknown_scheme_id():
    response = client.get("/api/schemes/unknown-fake-scheme-999")
    assert response.status_code == 404
    data = response.json()
    assert "detail" in data

# 7. Empty results
def test_scheme_empty_results():
    response = client.get("/api/schemes?search=xyznonexistentquery987654321")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 0
    assert len(data["schemes"]) == 0

# 8. Source metadata & Official URL presence
def test_scheme_source_metadata():
    response = client.get("/api/schemes")
    data = response.json()
    for scheme in data["schemes"]:
        assert scheme["official_url"] is not None
        assert scheme["official_url"].startswith("http")
        assert scheme["source_name"] is not None
        assert len(scheme["source_name"].strip()) > 0

    # Test scheme filter metadata endpoint
    meta_res = client.get("/api/schemes/meta/filters")
    assert meta_res.status_code == 200
    meta = meta_res.json()
    assert "categories" in meta
    assert len(meta["categories"]) >= 5
    assert "states" in meta

# ============================================================
# PART B: CROP GUIDE TESTS (9-15)
# ============================================================

# 9. List supported crops
def test_list_supported_crops():
    response = client.get("/api/crop-guide/crops")
    assert response.status_code == 200
    data = response.json()
    assert "total" in data
    assert "crops" in data
    assert data["total"] == 8
    crop_ids = [c["id"] for c in data["crops"]]
    assert "soybean" in crop_ids
    assert "wheat" in crop_ids
    assert "rice" in crop_ids
    assert "cotton" in crop_ids
    assert "maize" in crop_ids
    assert "sugarcane" in crop_ids
    assert "tomato" in crop_ids
    assert "onion" in crop_ids

# 10. Get soybean guide
def test_get_soybean_guide():
    # Via path param
    res_path = client.get("/api/crop-guide/soybean")
    assert res_path.status_code == 200
    data = res_path.json()
    assert data["name"] == "Soybean"
    assert data["id"] == "soybean"
    assert "soil" in data
    assert "sowing" in data
    assert "water" in data
    assert "nutrition" in data
    assert "pests_and_diseases" in data
    assert len(data["pests_and_diseases"]) > 0
    assert "prevention" in data
    assert len(data["prevention"]) > 0
    assert "harvest" in data
    assert "sources" in data
    assert "advisory_notice" in data

    # Via query param
    res_query = client.get("/api/crop-guide?crop=soybean")
    assert res_query.status_code == 200
    assert res_query.json()["name"] == "Soybean"

# 11. Get another crop (Wheat & Rice & Cotton)
def test_get_other_crops_guide():
    for crop_id in ["wheat", "rice", "cotton", "onion", "tomato"]:
        res = client.get(f"/api/crop-guide/{crop_id}")
        assert res.status_code == 200
        data = res.json()
        assert data["name"].lower() == crop_id.lower() or data["id"] == crop_id
        assert len(data["sources"]) > 0

# 12. Unknown crop
def test_unknown_crop_guide():
    response = client.get("/api/crop-guide/dragonfruit-xyz")
    assert response.status_code == 404
    data = response.json()
    assert "detail" in data

    response_query = client.get("/api/crop-guide?crop=dragonfruit-xyz")
    assert response_query.status_code == 404

# 13. Location parameter
def test_crop_guide_location_parameter():
    response = client.get("/api/crop-guide?crop=soybean&location=Pune,%20Maharashtra")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Soybean"
    assert data["location_context"] is not None
    assert "Maharashtra" in data["location_context"]

# 14. Source metadata
def test_crop_guide_sources():
    response = client.get("/api/crop-guide/wheat")
    assert response.status_code == 200
    data = response.json()
    assert len(data["sources"]) > 0
    assert any("ICAR" in s or "IARI" in s or "Directorate" in s or "Agricultural" in s for s in data["sources"])

# 15. Advisory disclaimer
def test_crop_guide_advisory_notice():
    response = client.get("/api/crop-guide/cotton")
    assert response.status_code == 200
    data = response.json()
    assert "advisory_notice" in data
    assert len(data["advisory_notice"]) > 0

# ============================================================
# REGRESSIONS (16-20)
# ============================================================

# 16. Regression: Crop Doctor
def test_regression_crop_doctor():
    buf = io.BytesIO()
    img = Image.new("RGB", (100, 100), color=(60, 140, 70))
    img.save(buf, format="JPEG")
    buf.seek(0)

    files = {"file": ("leaf.jpg", buf.read(), "image/jpeg")}
    response = client.post("/api/crop/analyze", files=files)
    assert response.status_code == 200
    data = response.json()
    assert "is_identified" in data
    assert "recommended_actions" in data

# 17. Regression: Soil Health
def test_regression_soil_health():
    payload = {
        "ph": 6.5,
        "nitrogen": 280.0,
        "phosphorus": 30.0,
        "potassium": 210.0,
        "crop": "Soybean",
    }
    response = client.post("/api/soil/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "overall_score" in data
    assert "parameters" in data
    assert "recommendations" in data

# 18. Regression: Weather
def test_regression_weather():
    response = client.get("/api/weather?latitude=18.5204&longitude=73.8567&location=Pune")
    assert response.status_code == 200
    data = response.json()
    assert "current" in data
    assert "forecast" in data
    assert "farm_outlook" in data

# 19. Regression: Mandi Prices
def test_regression_mandi_prices():
    response = client.get("/api/mandi/prices?commodity=Soybean&state=Maharashtra&district=Pune")
    assert response.status_code == 200
    data = response.json()
    assert "summary" in data
    assert "records" in data
    assert len(data["records"]) > 0

# 20. Health Endpoint
def test_regression_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "kisanmitra" in data["service"].lower()
