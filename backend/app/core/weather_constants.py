"""
Weather Intelligence Constants, WMO Weather Code Mappings, and Agricultural Presets.
"""

# WMO Weather interpretation codes (WW)
# Source: World Meteorological Organization & Open-Meteo
WMO_WEATHER_CODES = {
    0: {"condition": "Clear sky", "icon": "Sun", "severity": "normal"},
    1: {"condition": "Mainly clear", "icon": "Sun", "severity": "normal"},
    2: {"condition": "Partly cloudy", "icon": "CloudSun", "severity": "normal"},
    3: {"condition": "Overcast", "icon": "Cloud", "severity": "normal"},
    45: {"condition": "Foggy", "icon": "CloudFog", "severity": "moderate"},
    48: {"condition": "Depositing rime fog", "icon": "CloudFog", "severity": "moderate"},
    51: {"condition": "Light drizzle", "icon": "CloudDrizzle", "severity": "normal"},
    53: {"condition": "Moderate drizzle", "icon": "CloudDrizzle", "severity": "normal"},
    55: {"condition": "Dense drizzle", "icon": "CloudDrizzle", "severity": "moderate"},
    56: {"condition": "Light freezing drizzle", "icon": "CloudDrizzle", "severity": "moderate"},
    57: {"condition": "Dense freezing drizzle", "icon": "CloudDrizzle", "severity": "warning"},
    61: {"condition": "Slight rain", "icon": "CloudRain", "severity": "normal"},
    63: {"condition": "Moderate rain", "icon": "CloudRain", "severity": "moderate"},
    65: {"condition": "Heavy rain", "icon": "CloudRain", "severity": "warning"},
    66: {"condition": "Light freezing rain", "icon": "CloudRain", "severity": "moderate"},
    67: {"condition": "Heavy freezing rain", "icon": "CloudRain", "severity": "warning"},
    71: {"condition": "Slight snow fall", "icon": "CloudSnow", "severity": "moderate"},
    73: {"condition": "Moderate snow fall", "icon": "CloudSnow", "severity": "warning"},
    75: {"condition": "Heavy snow fall", "icon": "CloudSnow", "severity": "warning"},
    77: {"condition": "Snow grains", "icon": "CloudSnow", "severity": "moderate"},
    80: {"condition": "Slight rain showers", "icon": "CloudRain", "severity": "normal"},
    81: {"condition": "Moderate rain showers", "icon": "CloudRain", "severity": "moderate"},
    82: {"condition": "Violent rain showers", "icon": "CloudRain", "severity": "warning"},
    85: {"condition": "Slight snow showers", "icon": "CloudSnow", "severity": "moderate"},
    86: {"condition": "Heavy snow showers", "icon": "CloudSnow", "severity": "warning"},
    95: {"condition": "Thunderstorm", "icon": "CloudLightning", "severity": "warning"},
    96: {"condition": "Thunderstorm with slight hail", "icon": "CloudLightning", "severity": "warning"},
    99: {"condition": "Thunderstorm with heavy hail", "icon": "CloudLightning", "severity": "warning"},
}

# Centralized helper to lookup WMO code info
def get_weather_info(code: int) -> dict:
    default_info = {"condition": "Clear sky", "icon": "Sun", "severity": "normal"}
    info = WMO_WEATHER_CODES.get(code, default_info)
    is_rain = code in [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99]
    return {
        "condition": info["condition"],
        "icon": info["icon"],
        "severity": info["severity"],
        "is_rain": is_rain,
    }



# Major Agricultural Districts & Market Hubs in India (Quick Presets)
DEFAULT_LOCATION = {
    "name": "Pune",
    "region": "Maharashtra",
    "country": "India",
    "latitude": 18.5204,
    "longitude": 73.8567,
}

AGRICULTURAL_LOCATIONS_PRESET = {
    "pune": {"name": "Pune", "region": "Maharashtra", "country": "India", "latitude": 18.5204, "longitude": 73.8567},
    "nashik": {"name": "Nashik", "region": "Maharashtra", "country": "India", "latitude": 19.9975, "longitude": 73.7898},
    "nagpur": {"name": "Nagpur", "region": "Maharashtra", "country": "India", "latitude": 21.1458, "longitude": 79.0882},
    "kolhapur": {"name": "Kolhapur", "region": "Maharashtra", "country": "India", "latitude": 16.7050, "longitude": 74.2433},
    "aurangabad": {"name": "Chhatrapati Sambhajinagar", "region": "Maharashtra", "country": "India", "latitude": 19.8762, "longitude": 75.3433},
    "sambhajinagar": {"name": "Chhatrapati Sambhajinagar", "region": "Maharashtra", "country": "India", "latitude": 19.8762, "longitude": 75.3433},
    "amravati": {"name": "Amravati", "region": "Maharashtra", "country": "India", "latitude": 20.9374, "longitude": 77.7796},
    "solapur": {"name": "Solapur", "region": "Maharashtra", "country": "India", "latitude": 17.6599, "longitude": 75.9064},
    "indore": {"name": "Indore", "region": "Madhya Pradesh", "country": "India", "latitude": 22.7196, "longitude": 75.8577},
    "hyderabad": {"name": "Hyderabad", "region": "Telangana", "country": "India", "latitude": 17.3850, "longitude": 78.4867},
    "bengaluru": {"name": "Bengaluru", "region": "Karnataka", "country": "India", "latitude": 12.9716, "longitude": 77.5946},
    "delhi": {"name": "New Delhi", "region": "Delhi", "country": "India", "latitude": 28.6139, "longitude": 77.2090},
    "chennai": {"name": "Chennai", "region": "Tamil Nadu", "country": "India", "latitude": 13.0827, "longitude": 80.2707},
    "ludhiana": {"name": "Ludhiana", "region": "Punjab", "country": "India", "latitude": 30.9010, "longitude": 75.8573},
}

# Agricultural Thresholds for Alerts
ALERT_THRESHOLDS = {
    "heavy_rain_mm": 15.0,
    "high_rain_prob_pct": 70,
    "high_temp_c": 36.0,
    "extreme_heat_c": 40.0,
    "low_temp_c": 12.0,
    "frost_risk_c": 5.0,
    "high_wind_kmh": 22.0,
    "strong_gale_kmh": 38.0,
    "high_humidity_pct": 82,
}
