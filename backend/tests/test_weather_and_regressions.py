import io
import pytest
from PIL import Image
from fastapi.testclient import TestClient
from unittest.mock import patch

from app.main import app
from app.core.weather_constants import WMO_WEATHER_CODES, get_weather_info
from app.services.weather_analysis_engine import weather_analysis_engine
from app.schemas.weather import CurrentWeather, TodayWeather, ForecastDay

client = TestClient(app)

# 1. Health check test
def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "kisanmitra" in data["service"].lower()


# 2. Weather code mapping tests
def test_weather_code_mapping():
    # Code 0 = Clear sky
    info_clear = get_weather_info(0)
    assert info_clear["condition"] == "Clear sky"
    assert info_clear["is_rain"] is False

    # Code 63 = Moderate rain
    info_rain = get_weather_info(63)
    assert "rain" in info_rain["condition"].lower()
    assert info_rain["is_rain"] is True

    # Code 95 = Thunderstorm
    info_thunder = get_weather_info(95)
    assert "Thunderstorm" in info_thunder["condition"]

    # Unknown fallback code
    info_unknown = get_weather_info(999)
    assert info_unknown["condition"] == "Clear sky"

# 3. Deterministic Agricultural Alert Engine Tests
def test_rain_alert_generation():
    current = CurrentWeather(
        temperature=25.0,
        feels_like=26.0,
        condition="Moderate rain",
        weather_code=63,
        humidity=85,
        wind_speed=12.0,
        precipitation=4.0,
        is_day=1,
    )
    today = TodayWeather(
        rain_probability=80,
        rainfall=12.0,
        min_temperature=22.0,
        max_temperature=28.0,
    )
    alerts = weather_analysis_engine.generate_agricultural_alerts(current, today, [])
    alert_types = [a.type for a in alerts]
    assert "rain" in alert_types

    outlook = weather_analysis_engine.evaluate_farm_outlook(current, today)
    assert outlook.spray_suitability in ["Caution", "Unfavorable"]
    assert "irrigation" in outlook.irrigation_advice.lower()

def test_high_temperature_alert_generation():
    current = CurrentWeather(
        temperature=40.0,
        feels_like=43.0,
        condition="Clear sky",
        weather_code=0,
        humidity=30,
        wind_speed=10.0,
        precipitation=0.0,
        is_day=1,
    )
    today = TodayWeather(
        rain_probability=5,
        rainfall=0.0,
        min_temperature=28.0,
        max_temperature=41.0,
    )
    alerts = weather_analysis_engine.generate_agricultural_alerts(current, today, [])
    temp_alerts = [a for a in alerts if a.type == "temperature"]
    assert len(temp_alerts) > 0
    assert temp_alerts[0].severity in ["high", "moderate"]

def test_strong_wind_alert_generation():
    current = CurrentWeather(
        temperature=28.0,
        feels_like=28.0,
        condition="Mainly clear",
        weather_code=1,
        humidity=60,
        wind_speed=35.0,
        precipitation=0.0,
        is_day=1,
    )
    today = TodayWeather(
        rain_probability=10,
        rainfall=0.0,
        min_temperature=22.0,
        max_temperature=30.0,
    )
    alerts = weather_analysis_engine.generate_agricultural_alerts(current, today, [])
    wind_alerts = [a for a in alerts if a.type == "wind"]
    assert len(wind_alerts) > 0
    assert wind_alerts[0].severity in ["high", "moderate"]

    outlook = weather_analysis_engine.evaluate_farm_outlook(current, today)
    assert outlook.spray_suitability == "Unfavorable"

def test_favorable_spray_window():
    current = CurrentWeather(
        temperature=24.0,
        feels_like=24.0,
        condition="Mainly clear",
        weather_code=1,
        humidity=60,
        wind_speed=8.0,
        precipitation=0.0,
        is_day=1,
    )
    today = TodayWeather(
        rain_probability=5,
        rainfall=0.0,
        min_temperature=20.0,
        max_temperature=27.0,
    )
    outlook = weather_analysis_engine.evaluate_farm_outlook(current, today)
    assert outlook.spray_suitability == "Favorable"
    assert "favorable" in outlook.spray_recommendation.lower()

# 4. Valid Weather Request API
def test_get_weather_valid_pune():
    response = client.get("/api/weather?latitude=18.5204&longitude=73.8567&location=Pune")
    assert response.status_code == 200
    data = response.json()
    assert "location" in data
    assert data["location"]["name"] == "Pune"
    assert "current" in data
    assert "temperature" in data["current"]
    assert "today" in data
    assert "rain_probability" in data["today"]
    assert "forecast" in data
    assert len(data["forecast"]) >= 5
    assert "farm_outlook" in data
    assert "agricultural_alerts" in data

# 5. Invalid Coordinates Validation Tests
def test_get_weather_invalid_latitude():
    # Lat > 90
    response = client.get("/api/weather?latitude=105.0&longitude=73.8567")
    assert response.status_code == 422

    # Lat < -90
    response = client.get("/api/weather?latitude=-95.0&longitude=73.8567")
    assert response.status_code == 422

def test_get_weather_invalid_longitude():
    # Lon > 180
    response = client.get("/api/weather?latitude=18.5204&longitude=195.0")
    assert response.status_code == 422

    # Lon < -180
    response = client.get("/api/weather?latitude=18.5204&longitude=-195.0")
    assert response.status_code == 422

# 6. Provider Error and Fallback Handling Tests
def test_provider_timeout_fallback():
    with patch("httpx.AsyncClient.get", side_effect=Exception("Connection timed out")):
        response = client.get("/api/weather?latitude=18.5204&longitude=73.8567&location=Pune")
        assert response.status_code == 200
        data = response.json()
        assert data["is_demo"] is True
        assert data["location"]["name"] == "Pune"
        assert len(data["forecast"]) >= 5

# 7. Weather Location Search Endpoint Test
def test_weather_search_endpoint():
    response = client.get("/api/weather/search?q=Pune")
    assert response.status_code == 200
    results = response.json()
    assert isinstance(results, list)
    assert len(results) > 0
    assert any("pune" in r["name"].lower() for r in results)

    # Test query param
    response_query = client.get("/api/weather/search?query=Nashik")
    assert response_query.status_code == 200
    results_query = response_query.json()
    assert isinstance(results_query, list)
    assert len(results_query) > 0

# 8. Regression: Soil Analysis Endpoint
def test_soil_analysis_regression():
    payload = {
        "ph": 6.8,
        "nitrogen": 320.0,
        "phosphorus": 45.0,
        "potassium": 210.0,
        "organic_matter": 0.9,
        "crop": "Soybean",
        "location": "Pune, Maharashtra"
    }
    response = client.post("/api/soil/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "overall_score" in data
    assert data["overall_score"] >= 0 and data["overall_score"] <= 100
    assert "parameters" in data
    assert "ph" in data["parameters"]
    assert data["parameters"]["ph"]["status"] in ["Optimal", "Near neutral", "Normal"]

# 9. Regression: Crop Doctor Endpoint
def test_crop_doctor_regression():
    # Create valid in-memory JPEG image bytes
    buf = io.BytesIO()
    img = Image.new("RGB", (100, 100), color=(73, 109, 137))
    img.save(buf, format="JPEG")
    buf.seek(0)

    files = {"file": ("test.jpg", buf.read(), "image/jpeg")}
    response = client.post("/api/crop/analyze", files=files)
    assert response.status_code == 200
    data = response.json()
    assert "is_identified" in data
    assert "observations" in data
