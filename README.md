# 🌾 KisanMitra — Smarter Decisions. Healthier Farms.

> **AI-Powered Agricultural Decision-Support Platform for Indian Farmers**

[![Hackathon](https://img.shields.io/badge/Hackathon-HACKDAY%201.0-F4D35E?style=for-the-badge&logo=codeforces&logoColor=black)](https://hackday.dev)
[![Theme](https://img.shields.io/badge/Theme-Tech%20for%20a%20Better%20Tomorrow-587A4C?style=for-the-badge)](https://hackday.dev)
[![Frontend](https://img.shields.io/badge/Next.js-14%20App%20Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Backend](https://img.shields.io/badge/FastAPI-Python%203.11-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![Styling](https://img.shields.io/badge/Tailwind%20CSS-Custom%20Design%20System-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

---

## 🎯 Project Overview

**KisanMitra** is developed for **HACKDAY 1.0** under the theme **"Tech for a Better Tomorrow"**.

The core philosophy:
> *"If farmers are better supported today, they can help create a better tomorrow for everyone."*

Farmers are central to food security and society, yet many vital farming decisions require information from scattered, fragmented sources. KisanMitra brings crop health diagnostics, soil intelligence, weather forecasts, official mandi prices, and government schemes together into a unified, farmer-friendly, and accessible platform.

---

## 🚨 The Problem

Indian farmers routinely make high-stakes agricultural decisions with fragmented data:
* **Crop Disease & Health:** Misidentifying leaf symptoms leading to incorrect pesticide purchases and lost crop yield.
* **Soil Health:** Lack of intuitive interpretation of soil test reports (pH, N, P, K) to guide balanced fertilization.
* **Weather Uncertainty:** Raw weather numbers without farm-specific actionable advisories (e.g. spray windows, rain protection).
* **Mandi Price Opacity:** Inability to compare real-time APMC market prices across nearby markets to get fair value.
* **Government Scheme Awareness:** Complex, scattered information about central/state subsidy schemes, eligibility, and documentation.

---

## 💡 The Solution

**KisanMitra** provides a connected decision chain:

```text
What should I grow? (Crop Guide)
        ↓
Is my soil suitable? (Soil Health Intelligence)
        ↓
How should I manage my crop? (Agronomy Handbook)
        ↓
Is my crop healthy / Is there a disease? (AI Crop Doctor)
        ↓
What does the weather mean? (Weather Intelligence)
        ↓
What government support is available? (Govt Schemes)
        ↓
Where can I sell my crop? (Mandi Prices)
```

---

## 🌟 Modules & Features

| Module | Description | Status |
| :--- | :--- | :--- |
| **🌱 AI Crop Doctor** | Computer vision-based disease detection from leaf photos with confidence scoring and remedies using Gemini 1.5 Flash. | **Live & Operational** |
| **🧪 Soil Health Intelligence** | Deterministic agronomic interpretation of pH, N, P, K, and Organic Matter based on standard ICAR benchmarks. | **Live & Operational** |
| **🌦 Weather Intelligence** | Hyperlocal weather forecasts translated into farm activity recommendations, spray windows, and risk alerts via Open-Meteo. | **Live & Operational** |
| **💰 Mandi Prices** | Official APMC market rates, price comparisons, and trend discovery from GOI OGD / AGMARKNET (zero fabricated prices). | **Live & Operational** |
| **🏛️ Govt Schemes** | Curated Central/State agricultural schemes with eligibility, documents, and application links. | *Foundation Ready* |
| **🌾 Location-Based Crop Guide** | Agro-climatic zone advice on sowing, pest mitigation, and harvest practices. | *Foundation Ready* |
| **🌐 Multilingual Support** | Regional language interface & responses (English, Marathi, Hindi, Tamil, Telugu). | *Foundation Ready* |
| **🤖 AI Farmer Assistant** | Context-aware conversational AI assistant tailored to farmer profile and field data. | *Foundation Ready* |


---

## 🌦 Weather Intelligence Module Details

### What It Does
The Weather Intelligence module bridges raw meteorological data with agricultural decision-making. Instead of merely displaying degrees Celsius and rain percentages, KisanMitra translates weather patterns into immediate farm guidance:
* **Foliar Spray Suitability Windows:** Calculates whether current and upcoming wind speeds, rain probabilities, and humidity levels make pesticide/fertilizer spraying safe or susceptible to drift/wash-off.
* **Smart Irrigation Advisories:** Recommends postponing or modifying irrigation schedules based on expected precipitation volume and soil water balance.
* **Agricultural Risk Warnings:** Proactively alerts farmers to extreme heat stress, frost hazards, gale-force winds (crop lodging risk), and high canopy humidity (fungal disease incubation risk).
* **7-Day Agricultural Forecast:** Multi-day planning horizon for planting, weeding, spraying, and harvesting.

### Weather Provider & Architecture
* **Provider:** Open-Meteo Forecast & Geocoding APIs (FastAPI backend acts as the sole external consumer; no direct third-party calls or exposed tokens on frontend).
* **Location Model:** Supports latitude/longitude coordinate pairs with reverse/forward geocoding and standard Indian district presets (Pune, Nashik, Nagpur, Kolhapur, etc.).
* **Default Location:** Pune, Maharashtra (`18.5204° N, 73.8567° E`).

```text
Frontend (Next.js)
       ↓
FastAPI Backend (GET /api/weather)
       ↓
weather_service.py
       ↓
weather_provider.py ───> Open-Meteo Forecast API
       ↓
weather_analysis_engine.py (Deterministic Agricultural Rules)
       ↓
Structured Farm Advisory Response
```

### Backend API Endpoints
1. **Fetch Weather & Farm Outlook:**
   ```http
   GET /api/weather?latitude=18.5204&longitude=73.8567&location=Pune
   ```
2. **Search Farm Locations / Geocoding:**
   ```http
   GET /api/weather/search?q=Nashik
   ```

### Agricultural Intelligence Rules
* **Spray Suitability:**
  * `Favorable`: Wind speed $\le 15\text{ km/h}$, Rain probability $< 30\%$, and Humidity between $45\%–80\%$.
  * `Caution`: Intermediate wind gusts or moderate humidity.
  * `Unfavorable`: Wind speed $> 20\text{ km/h}$, Rain probability $\ge 50\%$, or rainfall $> 1\text{ mm}$.
* **Irrigation Guidance:**
  * Postpone irrigation when rain probability $\ge 60\%$ or expected rainfall $\ge 5\text{ mm}$.
  * Increase hydration during dry spells when daytime temperatures exceed $35^\circ\text{C}$.
* **Agricultural Alerts:**
  * Heavy Rain Warning ($\ge 15\text{ mm}$ precipitation expected).
  * Extreme Heat Warning ($\ge 40^\circ\text{C}$ daytime maximum).
  * High Humidity / Fungal Risk ($\ge 82\%$ canopy humidity).
  * Strong Wind / Crop Lodging Warning ($\ge 38\text{ km/h}$ gale winds).

### ⚠️ Important Agricultural Disclaimer & Limitations
> **Advisory Nature:** Weather forecasts and agricultural impact recommendations are guidance models designed to assist farm planning. Local field microclimates, soil moisture saturation, and crop growth stages should always be taken into account before critical field operations.

---

## 🧪 Soil Health Intelligence Module Details

### What It Does
The Soil Health Intelligence module provides an instant, transparent agronomic interpretation of routine soil testing parameters. It evaluates pH balance, available macronutrients (N, P, K), and optional organic carbon to generate an **Advisory Soil Health Score (0–100)**, parameter classifications, key observations, safe non-prescriptive recommendations, and crop-specific context.

### Input Parameters
* **Soil pH** (`0.0 – 14.0`, Required) — Evaluates soil reaction (acidic, neutral, alkaline).
* **Available Nitrogen (N)** (`kg/ha`, Required) — Classified as Low (<280), Medium (280–560), High (>560).
* **Available Phosphorus (P)** (`kg/ha`, Required) — Classified as Low (<10), Medium (10–25), High (>25).
* **Available Potassium (K)** (`kg/ha`, Required) — Classified as Low (<140), Medium (140–280), High (>280).
* **Organic Matter / Carbon** (`%`, Optional) — Low (<0.50%), Medium (0.50–0.75%), High (>0.75%).
* **Target Crop** (Dropdown, Optional) — E.g., Soybean, Wheat, Rice, Cotton, Maize, Sugarcane, Tomato, Onion.
* **Farm Location** (Optional, Default: *Pune, Maharashtra*).

### API Endpoint
```http
POST /api/soil/analyze
Content-Type: application/json

{
  "ph": 6.5,
  "nitrogen": 280,
  "phosphorus": 22,
  "potassium": 210,
  "organic_matter": 1.8,
  "crop": "Soybean",
  "location": "Pune, Maharashtra"
}
```

### Scoring Concept
* **Explainable Composite Weighting:**
  * *With Organic Matter:* pH (30%) + N (25%) + P (20%) + K (20%) + OM (5%).
  * *Without Organic Matter:* pH (32%) + N (28%) + P (20%) + K (20%) (Score is normalized cleanly so farmers are not penalized if OM is omitted).
* **Rating Bands:**
  * `0–39`: Needs Attention
  * `40–59`: Fair
  * `60–79`: Good
  * `80–100`: Very Good

## 💰 Mandi Price Intelligence Module Details

### What It Does
The Mandi Price Intelligence module allows farmers to track official wholesale market arrivals, minimum/maximum price spreads, and modal (typical) selling prices across APMC mandis. It eliminates market opacity by enabling farmers to benchmark and compare price quotations across neighboring districts before transporting harvested produce.

### Official Data Source & Trust Principle
* **Primary Authority:** Government of India Open Government Data (data.gov.in) & Directorate of Marketing & Inspection (DMI / AGMARKNET) under the Ministry of Agriculture & Farmers Welfare.
* **Dataset:** *"Current Daily Price of Various Commodities from Various Markets (Mandi)"*.
* **Zero Fabricated Prices Guarantee:** Every price quotation is strictly tagged:
  * `Official Market Data`: Direct from live government data endpoints.
  * `Demo Data — Not Live`: Clearly labeled development fallback used only when external APIs or credentials are unavailable during testing.
  * `Market Data Unavailable`: Explicit status when no records exist.

### Backend Architecture & Endpoints
```text
Frontend (Next.js)
       ↓
FastAPI Backend (GET /api/mandi/prices)
       ↓
mandi_service.py
       ↓
mandi_provider.py ───> Government of India OGD API (data.gov.in)
       ↓
Normalized Market Response & Factual Spread Summary
```

1. **Fetch Mandi Prices:**
   ```http
   GET /api/mandi/prices?commodity=Soybean&state=Maharashtra&district=Pune
   ```
2. **Fetch Filter Dropdown Choices:**
   ```http
   GET /api/mandi/filters
   ```

### Factual Market Comparison Policy
KisanMitra presents neutral statistical summaries (e.g. *"Among the returned records, Pune APMC reported the highest modal price of ₹5,200/quintal"*). The platform **never uses subjective claims** like *"Best mandi"* or *"Sell here"* — all selling decisions remain entirely in the hands of the farmer.

---

## 🎨 Visual Identity & Design System

* **Primary Brand Yellow:** `#F4D35E` — Key CTAs, active navigations, and indicators.
* **Background Canvas:** `#FAF9F4` — Warm cream tone preventing eye strain.
* **Surface White:** `#FFFFFF` — Crisp card surfaces with subtle borders.
* **Agricultural Green:** `#587A4C` — Organic, trustworthy nature green.
* **Primary Text:** `#1F2933` — Slate charcoal with WCAG AAA readability.
* **Secondary Text:** `#667085` — Muted warm gray for secondary guidance.
* **Border:** `#E5E1D8` — Soft neutral separation.

---

## 🚀 Local Development Setup

### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

Verify backend endpoints:
* Health: [http://localhost:8000/api/health](http://localhost:8000/api/health)
* Weather: [http://localhost:8000/api/weather](http://localhost:8000/api/weather)
* Mandi Prices: [http://localhost:8000/api/mandi/prices](http://localhost:8000/api/mandi/prices)
* Swagger UI Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗺️ Phased Roadmap (Hackday 1.0)

- [x] **Phase 1: Project Foundation + Architecture + Design System**
- [x] **Phase 2: UI/UX Refinement & Complete Farmer Dashboard**
- [x] **Phase 3: AI Crop Doctor (Gemini 1.5 Flash Vision Integration)**
- [x] **Phase 4: Soil Health Intelligence (Deterministic ICAR Engine)**
- [x] **Phase 5: Weather Intelligence & Farm Alerts**
- [x] **Phase 6: Mandi & Real Market Price Discovery**
- [ ] **Phase 7: Government Schemes Directory**
- [ ] **Phase 8: Location-Based Crop Guide**
- [ ] **Phase 9: Multilingual AI Farmer Assistant**
- [ ] **Phase 10: Final Deployment & Demo Presentation**


