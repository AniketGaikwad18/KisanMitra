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
| **🌦 Weather Intelligence** | Hyperlocal weather forecasts translated into farm activity recommendations and spray windows. | *Foundation Ready* |
| **💰 Mandi Prices** | Official APMC market rates, price comparisons, and trend discovery (zero fabricated prices). | *Foundation Ready* |
| **🏛️ Govt Schemes** | Curated Central/State agricultural schemes with eligibility, documents, and application links. | *Foundation Ready* |
| **🌾 Location-Based Crop Guide** | Agro-climatic zone advice on sowing, pest mitigation, and harvest practices. | *Foundation Ready* |
| **🌐 Multilingual Support** | Regional language interface & responses (English, Marathi, Hindi, Tamil, Telugu). | *Foundation Ready* |
| **🤖 AI Farmer Assistant** | Context-aware conversational AI assistant tailored to farmer profile and field data. | *Foundation Ready* |

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

### Future Soil-Report Extraction
The frontend includes an upload zone supporting PDF, JPG, and PNG documents. Automated OCR document parsing and field extraction are designed to plug directly into this module in a future enhancement phase.

### ⚠️ Important Advisory Notice & Limitations
> **Advisory Assessment Only:** This module provides decision-support guidance based on standard ICAR Indian agricultural interpretation benchmarks. It is **not a certified soil testing laboratory report** and does not provide exact chemical prescription dosages. Actual nutrient requirements depend on soil texture, regional rainfall, target yield, and localized agricultural university recommendations.

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
- [ ] **Phase 5: Weather Intelligence & Farm Alerts**
- [ ] **Phase 6: Mandi & Real Market Price Discovery**
- [ ] **Phase 7: Government Schemes Directory**
- [ ] **Phase 8: Location-Based Crop Guide**
- [ ] **Phase 9: Multilingual AI Farmer Assistant**
- [ ] **Phase 10: Final Deployment & Demo Presentation**
