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

Farmers are central to food security and society, yet many vital farming decisions require information from scattered, fragmented sources. KisanMitra brings crop health diagnostics, soil insights, weather intelligence, official mandi prices, and government schemes together into a unified, farmer-friendly, and accessible platform.

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
Is my soil suitable? (Soil Health)
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

## 🌟 Planned Features & Modules

| Module | Description | Status |
| :--- | :--- | :--- |
| **🌱 AI Crop Doctor** | Computer vision-based disease detection from leaf photos with confidence scoring and remedies. | *Foundation Ready* |
| **🧪 Soil Health** | NPK, pH, and soil property evaluation combined with target crop needs for balanced nutrient advice. | *Foundation Ready* |
| **🌦 Weather Intelligence** | Hyperlocal weather forecasts translated into farm activity recommendations. | *Foundation Ready* |
| **💰 Mandi Prices** | Official APMC market rates, price comparisons, and trend discovery (zero fabricated prices). | *Foundation Ready* |
| **🏛️ Govt Schemes** | Curated Central/State agricultural schemes with eligibility, documents, and application links. | *Foundation Ready* |
| **🌾 Location-Based Crop Guide** | Agro-climatic zone advice on sowing, pest mitigation, and harvest practices. | *Foundation Ready* |
| **🌐 Multilingual Support** | Regional language interface & responses (English, Marathi, Hindi, Tamil, Telugu). | *Foundation Ready* |
| **🤖 AI Farmer Assistant** | Context-aware conversational AI assistant tailored to farmer profile and field data. | *Foundation Ready* |

---

## 🎨 Visual Identity & Design System

KisanMitra uses a bespoke agricultural design system prioritizing high readability, touch-friendly UI, and warm aesthetics:

* **Primary Brand Yellow:** `#F4D35E` — Used for primary CTAs, active navigations, and key indicators.
* **Background Canvas:** `#FAF9F4` — Warm cream tone preventing eye strain.
* **Surface White:** `#FFFFFF` — Crisp card surfaces with subtle borders.
* **Agricultural Green:** `#587A4C` — Organic, trustworthy nature green.
* **Primary Text:** `#1F2933` — Slate charcoal with WCAG AAA readability.
* **Secondary Text:** `#667085` — Muted warm gray for secondary guidance.
* **Border:** `#E5E1D8` — Soft neutral separation.

---

## 🏗️ Architecture

A clean, modular-monolith architecture optimized for speed, reliability, and maintainability:

```text
┌────────────────────────────────────────────────────────┐
│               Next.js 14 Frontend                      │
│     (App Router, TypeScript, Tailwind CSS)             │
└──────────────────────────┬─────────────────────────────┘
                           │ REST API
                           ▼
┌────────────────────────────────────────────────────────┐
│               FastAPI Backend (Python)                 │
│      ├── Health & System Endpoints                     │
│      ├── Crop Diagnosis Service (Placeholder)          │
│      ├── Soil Analysis Service (Placeholder)           │
│      ├── Weather Intelligence Service (Placeholder)    │
│      ├── Mandi Pricing Service (Placeholder)           │
│      ├── Schemes Service (Placeholder)                 │
│      └── AI Assistant Service (Placeholder)            │
└──────────────────────────┬─────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
┌──────────────────────────┐ ┌──────────────────────────┐
│   External Public APIs   │ │  Supabase / PostgreSQL   │
│ (Open-Meteo, Data.gov.in)│ │  (Database & Storage)    │
└──────────────────────────┘ └──────────────────────────┘
```

---

## 📁 Project Structure

```text
KisanMitra/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx            # Global HTML & fonts
│   │   ├── page.tsx              # Landing page
│   │   ├── globals.css           # Tailwind & brand tokens
│   │   ├── dashboard/page.tsx    # Dashboard shell
│   │   ├── crop-doctor/page.tsx  # Crop Doctor portal
│   │   ├── soil/page.tsx         # Soil Health portal
│   │   ├── weather/page.tsx      # Weather Intelligence
│   │   ├── mandi/page.tsx        # Mandi Prices
│   │   ├── schemes/page.tsx      # Government Schemes
│   │   ├── crop-guide/page.tsx   # Crop Guide
│   │   └── assistant/page.tsx    # AI Assistant
│   ├── components/
│   │   ├── layout/               # Navbar, Sidebar, AppShell
│   │   ├── ui/                   # Button, Card, Badge, Alert, PageHeader, States
│   │   └── dashboard/            # SummaryCard, QuickActions, FarmAlerts, Health
│   ├── lib/
│   │   └── api.ts                # API client with health checker
│   ├── types/                    # TypeScript interfaces
│   ├── tailwind.config.ts        # Custom brand palette
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── health.py         # GET /api/health
│   │   ├── core/
│   │   │   └── config.py         # Pydantic Settings & CORS
│   │   ├── schemas/
│   │   │   └── health.py         # Pydantic models
│   │   ├── services/             # Modular service placeholders
│   │   └── main.py               # FastAPI entry point
│   └── requirements.txt
│
├── .env.example                  # Environment configuration template
├── .gitignore
└── README.md
```

---

## 🚀 Local Development Setup

### 1. Prerequisites
* **Node.js**: v18+ (Tested on v22.23.1)
* **Python**: 3.10+ (Tested on 3.11.15)

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
pip install -r requirements.txt

# Start FastAPI dev server
uvicorn app.main:app --reload --port 8000
```

Verify backend health:
```bash
curl http://localhost:8000/api/health
# Response: {"status":"ok","service":"kisanmitra-api"}
```

API Documentation:
* Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
* ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

### 3. Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start Next.js dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

Copy `.env.example` to `.env` or set environment variables:

```ini
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000

# Backend / Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# AI Intelligence
GEMINI_API_KEY=your-gemini-api-key

# Weather
WEATHER_API_URL=https://api.open-meteo.com/v1/forecast

# Mandi Data
MANDI_API_URL=https://api.data.gov.in/resource
MANDI_API_KEY=your-data-gov-in-api-key
```

---

## 🗺️ Phased Roadmap (Hackday 1.0)

- [x] **Phase 1: Project Foundation + Architecture + Design System**
- [ ] **Phase 2: AI Crop Doctor (Vision Diagnosis & Remedies)**
- [ ] **Phase 3: Soil Health & Nutrient Analysis**
- [ ] **Phase 4: Weather Intelligence & Farm Alerts**
- [ ] **Phase 5: Mandi & Real Market Price Discovery**
- [ ] **Phase 6: Government Schemes Directory**
- [ ] **Phase 7: Location-Based Crop Guide**
- [ ] **Phase 8: Multilingual AI Farmer Assistant**
- [ ] **Phase 9: Full End-to-End Testing & Integration**
- [ ] **Phase 10: Final Deployment & Demo Presentation**
