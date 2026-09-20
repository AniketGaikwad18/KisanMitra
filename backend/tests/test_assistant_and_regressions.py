import pytest
from fastapi.testclient import TestClient
from unittest.mock import AsyncMock, patch
from app.main import app

client = TestClient(app)

# ---------------------------------------------------------
# 1. Base Request & Validation Tests
# ---------------------------------------------------------

def test_assistant_empty_context():
    response = client.post(
        "/api/assistant/chat",
        json={
            "message": "What general agronomy advice do you have?",
            "context": None,
            "language": "en"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "answer" in data
    assert data["language"] == "en"
    assert isinstance(data["sources"], list)
    assert "disclaimer" in data

def test_assistant_missing_message():
    response = client.post(
        "/api/assistant/chat",
        json={
            "context": None,
            "language": "en"
        }
    )
    assert response.status_code == 422

def test_assistant_whitespace_message():
    response = client.post(
        "/api/assistant/chat",
        json={
            "message": "    ",
            "context": None,
            "language": "en"
        }
    )
    assert response.status_code == 422

def test_assistant_excessively_long_message():
    long_msg = "A" * 1200
    response = client.post(
        "/api/assistant/chat",
        json={
            "message": long_msg,
            "context": None,
            "language": "en"
        }
    )
    assert response.status_code == 422

def test_assistant_invalid_language_falls_back():
    response = client.post(
        "/api/assistant/chat",
        json={
            "message": "Should I irrigate?",
            "context": None,
            "language": "invalid_lang_code"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["language"] == "en"

# ---------------------------------------------------------
# 2. Context-Specific Tests
# ---------------------------------------------------------

def test_assistant_weather_and_irrigation_context():
    payload = {
        "message": "Should I irrigate my field today?",
        "context": {
            "location": {"name": "Pune", "state": "Maharashtra"},
            "crop": {"name": "Soybean"},
            "weather": {
                "temperature": 28,
                "condition": "Rain Showers",
                "rain_probability": 75,
                "rainfall": 12,
                "humidity": 80,
                "wind_speed": 14,
                "spray_suitability": "Caution",
                "irrigation_advice": "Postpone irrigation due to high rain probability.",
                "alerts": ["Heavy Rain Expected"]
            }
        },
        "language": "en"
    }
    response = client.post("/api/assistant/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "weather" in data["context_used"] or "crop" in data["context_used"]
    assert any(s["type"] == "weather" for s in data["sources"])
    assert "irrigate" in data["answer"].lower() or "rain" in data["answer"].lower() or "soil" in data["answer"].lower()

def test_assistant_soil_context():
    payload = {
        "message": "My soil has low nitrogen. What should I consider?",
        "context": {
            "location": {"name": "Pune", "state": "Maharashtra"},
            "crop": {"name": "Soybean"},
            "soil": {
                "score": 68,
                "rating": "Fair",
                "ph": 6.5,
                "nitrogen": "Low",
                "phosphorus": "Medium",
                "potassium": "High",
                "organic_matter": 1.2,
                "observations": ["Nitrogen level is deficient."]
            }
        },
        "language": "en"
    }
    response = client.post("/api/assistant/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "soil" in data["context_used"]
    assert any(s["type"] == "soil" for s in data["sources"])

def test_assistant_crop_health_context():
    payload = {
        "message": "What is wrong with my soybean leaves?",
        "context": {
            "location": {"name": "Pune", "state": "Maharashtra"},
            "crop": {"name": "Soybean"},
            "crop_health": {
                "crop": "Soybean",
                "condition": "Cercospora Leaf Blight",
                "severity": "Moderate",
                "confidence": 0.88,
                "observations": ["Reddish purple angular lesions on upper leaf surfaces"],
                "is_demo": False
            }
        },
        "language": "en"
    }
    response = client.post("/api/assistant/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "crop_health" in data["context_used"]
    assert any(s["type"] == "crop_doctor" for s in data["sources"])

def test_assistant_mandi_context():
    payload = {
        "message": "What are current soybean market prices in Pune?",
        "context": {
            "location": {"name": "Pune", "state": "Maharashtra"},
            "crop": {"name": "Soybean"},
            "market": {
                "commodity": "Soybean",
                "market": "Pune APMC",
                "min_price": 4900,
                "max_price": 5400,
                "modal_price": 5200,
                "unit": "₹/quintal",
                "arrival_date": "2026-09-20",
                "data_status": "demo",
                "is_demo": True
            }
        },
        "language": "en"
    }
    response = client.post("/api/assistant/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "mandi" in data["context_used"]
    assert any(s["type"] == "mandi" for s in data["sources"])

def test_assistant_scheme_context():
    payload = {
        "message": "What government schemes provide crop insurance for farmers?",
        "context": {
            "location": {"name": "Pune", "state": "Maharashtra"},
            "crop": {"name": "Soybean"}
        },
        "language": "en"
    }
    response = client.post("/api/assistant/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "schemes" in data["context_used"]
    assert any(s["type"] == "schemes" for s in data["sources"])

def test_assistant_crop_guide_context():
    payload = {
        "message": "What is the recommended seed rate and sowing spacing for soybean?",
        "context": {
            "location": {"name": "Pune", "state": "Maharashtra"},
            "crop": {"name": "Soybean"}
        },
        "language": "en"
    }
    response = client.post("/api/assistant/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "crop_guide" in data["context_used"]
    assert any(s["type"] == "crop_guide" for s in data["sources"])

# ---------------------------------------------------------
# 3. Multilingual Tests
# ---------------------------------------------------------

@pytest.mark.parametrize("lang_code", ["mr", "hi", "ta", "te", "en"])
def test_assistant_multilingual_responses(lang_code):
    payload = {
        "message": "Should I irrigate today?",
        "context": {
            "location": {"name": "Pune", "state": "Maharashtra"},
            "crop": {"name": "Soybean"}
        },
        "language": lang_code
    }
    response = client.post("/api/assistant/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["language"] == lang_code
    assert len(data["answer"]) > 10

# ---------------------------------------------------------
# 4. Mocked Gemini Response Test
# ---------------------------------------------------------

def test_assistant_gemini_mocked_success():
    with patch("app.services.gemini_service.gemini_service.generate_farmer_response", new_callable=AsyncMock) as mock_gen:
        mock_gen.return_value = {
            "answer": "Based on current rainfall probability of 75%, delay irrigation for 24 hours.",
            "confidence": "high",
            "follow_up_question": "Would you like to check tomorrow's wind speed?",
            "is_demo": False
        }

        payload = {
            "message": "Should I irrigate?",
            "context": {
                "weather": {"rain_probability": 75, "temperature": 29}
            },
            "language": "en"
        }
        response = client.post("/api/assistant/chat", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["answer"] == "Based on current rainfall probability of 75%, delay irrigation for 24 hours."
        assert data["follow_up_question"] == "Would you like to check tomorrow's wind speed?"
        assert data["is_demo"] is False

# ---------------------------------------------------------
# 5. Regression Tests Across All Modules
# ---------------------------------------------------------

def test_regression_health():
    res = client.get("/api/health")
    assert res.status_code == 200
    assert res.json()["status"] == "ok"

def test_regression_soil():
    payload = {
        "ph": 6.5,
        "nitrogen": 280,
        "phosphorus": 22,
        "potassium": 210,
        "organic_matter": 1.5,
        "crop": "Soybean",
        "location": "Pune, Maharashtra"
    }
    res = client.post("/api/soil/analyze", json=payload)
    assert res.status_code == 200
    assert "overall_score" in res.json()

def test_regression_weather():
    res = client.get("/api/weather?latitude=18.5204&longitude=73.8567&location=Pune")
    assert res.status_code == 200
    assert "current" in res.json()
    assert "farm_outlook" in res.json()

def test_regression_mandi():
    res = client.get("/api/mandi/prices?commodity=Soybean&state=Maharashtra")
    assert res.status_code == 200
    assert "records" in res.json()

def test_regression_schemes():
    res = client.get("/api/schemes")
    assert res.status_code == 200
    assert "schemes" in res.json()

def test_regression_crop_guide():
    res = client.get("/api/crop-guide/crops")
    assert res.status_code == 200
    assert "crops" in res.json()
