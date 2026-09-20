"""
Soil Health Intelligence Constants & Agronomic Thresholds.

Standard Indian agricultural soil test interpretation thresholds 
based on ICAR (Indian Council of Agricultural Research) guidelines.
Interpretation depends on regional soil types, laboratory extraction methods,
and target crops. These thresholds serve as an advisory guideline.
"""

# Available Nitrogen (N) in kg/ha (Alkaline Permanganate method standard)
NITROGEN_THRESHOLDS = {
    "low_max": 280.0,      # < 280 kg/ha is Low
    "medium_max": 560.0,   # 280 - 560 kg/ha is Medium, > 560 is High
}

# Available Phosphorus (P) in kg/ha (Olsen / Bray method standard)
PHOSPHORUS_THRESHOLDS = {
    "low_max": 10.0,       # < 10 kg/ha is Low
    "medium_max": 25.0,    # 10 - 25 kg/ha is Medium, > 25 is High
}

# Available Potassium (K) in kg/ha (Ammonium Acetate method standard)
POTASSIUM_THRESHOLDS = {
    "low_max": 140.0,      # < 140 kg/ha is Low
    "medium_max": 280.0,   # 140 - 280 kg/ha is Medium, > 280 is High
}

# Soil Organic Carbon / Organic Matter (%)
ORGANIC_MATTER_THRESHOLDS = {
    "low_max": 0.50,       # < 0.50% is Low
    "medium_max": 0.75,    # 0.50% - 0.75% is Medium, > 0.75% is High
}

# pH Classification Scale
PH_CLASSIFICATIONS = [
    {"max": 5.5, "status": "Strongly acidic", "severity": "warning", "score": 45},
    {"max": 6.0, "status": "Moderately acidic", "severity": "moderate", "score": 70},
    {"max": 6.5, "status": "Slightly acidic", "severity": "normal", "score": 90},
    {"max": 7.3, "status": "Near neutral", "severity": "normal", "score": 100},
    {"max": 7.8, "status": "Slightly alkaline", "severity": "normal", "score": 90},
    {"max": 8.4, "status": "Moderately alkaline", "severity": "moderate", "score": 70},
    {"max": 14.0, "status": "Strongly alkaline", "severity": "warning", "score": 40},
]

# Crop Specific Agronomic Parameters
CROP_AGRONOMIC_PROFILES = {
    "Soybean": {
        "suitable_ph_min": 6.0,
        "suitable_ph_max": 7.5,
        "primary_nutrient_focus": "Phosphorus and Rhizobium nodulation",
        "soil_notes": "Prefers well-drained loamy soil with active organic matter for nitrogen-fixing nodules.",
        "considerations": [
            "Soybean is a legume that fixes atmospheric nitrogen; excessive nitrogen fertilizer can inhibit root nodule development.",
            "Adequate available phosphorus is critical for early root establishment and pod formation."
        ]
    },
    "Wheat": {
        "suitable_ph_min": 6.0,
        "suitable_ph_max": 7.5,
        "primary_nutrient_focus": "Balanced Nitrogen and Phosphorus",
        "soil_notes": "Thrives in loamy to clay loam soils with neutral to slightly alkaline pH.",
        "considerations": [
            "Balanced nitrogen timing at crown root initiation and tillering stages is vital for grain yield.",
            "Phosphorus should be placed near the seed zone at sowing time."
        ]
    },
    "Rice": {
        "suitable_ph_min": 5.5,
        "suitable_ph_max": 7.0,
        "primary_nutrient_focus": "Nitrogen and Zinc availability",
        "soil_notes": "Tolerates slightly acidic to neutral soils with high water retention capacity (clayey loams).",
        "considerations": [
            "Submerged wetland soils experience altered nutrient availability; split nitrogen doses enhance efficiency.",
            "Monitor zinc availability if soil pH is above 7.0."
        ]
    },
    "Cotton": {
        "suitable_ph_min": 6.5,
        "suitable_ph_max": 8.0,
        "primary_nutrient_focus": "Potassium for boll development and fiber quality",
        "soil_notes": "Deep black cotton soils (vertisols) with good water holding capacity are ideal.",
        "considerations": [
            "Potassium demand peaks during boll development; deficiency can cause premature senescence.",
            "Avoid waterlogged conditions which restrict root respiration."
        ]
    },
    "Maize": {
        "suitable_ph_min": 5.8,
        "suitable_ph_max": 7.2,
        "primary_nutrient_focus": "High Nitrogen feeder",
        "soil_notes": "Requires deep, fertile, well-drained soils rich in organic matter.",
        "considerations": [
            "Maize is a heavy feeder requiring steady nitrogen availability from knee-high to tasseling stage.",
            "Sensitive to soil salinity and waterlogging."
        ]
    },
    "Sugarcane": {
        "suitable_ph_min": 6.5,
        "suitable_ph_max": 8.0,
        "primary_nutrient_focus": "High Potassium and Nitrogen demands",
        "soil_notes": "Medium to heavy deep soils with good drainage and adequate organic carbon.",
        "considerations": [
            "Long-duration crop requiring organic manure replenishment between ratoon crops.",
            "Potassium improves sugar recovery and cane stalk strength."
        ]
    },
    "Tomato": {
        "suitable_ph_min": 6.0,
        "suitable_ph_max": 6.8,
        "primary_nutrient_focus": "Calcium, Potassium, and Phosphorus",
        "soil_notes": "Light to medium loam soils with high organic matter and good drainage.",
        "considerations": [
            "Calcium availability and steady moisture prevent Blossom End Rot.",
            "Excessive nitrogen leads to leafy vegetative growth at the expense of fruit set."
        ]
    },
    "Onion": {
        "suitable_ph_min": 6.0,
        "suitable_ph_max": 7.0,
        "primary_nutrient_focus": "Sulfur and Phosphorus for bulb size and pungency",
        "soil_notes": "Friable, well-drained sandy loam to clay loam rich in organic matter.",
        "considerations": [
            "Shallow root system requires nutrients readily available in the top 15–20 cm soil layer.",
            "Phosphorus application at transplanting aids vigorous root establishment."
        ]
    },
    "Other": {
        "suitable_ph_min": 6.0,
        "suitable_ph_max": 7.5,
        "primary_nutrient_focus": "Balanced NPK and Organic Carbon",
        "soil_notes": "General agricultural soils with good drainage and balanced organic fertility.",
        "considerations": [
            "Maintain soil organic carbon through regular compost/FYM addition.",
            "Follow local state university agronomy recommendations for specific crop cycles."
        ]
    }
}
