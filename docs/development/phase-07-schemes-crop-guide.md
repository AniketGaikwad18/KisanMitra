# Phase 7: Government Schemes & Location-Based Crop Guide

## 🎯 Phase Objective
Provide verified, curated access to Central and State agricultural support schemes (subsidies, insurance, credit, income support) and structured ICAR agronomic guidance tailored to crops and agro-climatic zones.

---

## 🛠️ What Was Implemented

### 1. Government Schemes Intelligence
* **Verified Database:** Curated authoritative government schemes in [`backend/app/services/scheme_service.py`](file:///c:/Users/Aniket19/OneDrive/Desktop/KisanMitra/backend/app/services/scheme_service.py) including:
  * **PMFBY:** Pradhan Mantri Fasal Bima Yojana (Comprehensive Crop Insurance).
  * **PM-KISAN:** Pradhan Mantri Kisan Samman Nidhi (Direct Income Support of ₹6,000/year).
  * **KCC:** Kisan Credit Card (Subsidized crop loans at 4% effective interest).
  * **PMKSY:** Pradhan Mantri Krishi Sinchayee Yojana (Micro-irrigation & Drip Subsidies).
  * **State Schemes:** Maharashtra Magel Tyala Shet Tale, Sub-Mission on Agricultural Mechanization (SMAM).
* **Detailed Scheme Data:** Categories, target groups, eligibility criteria, required documents, application process, and official portal links (`myscheme.gov.in`).
* **Backend Schemes API:** `GET /api/schemes`, `GET /api/schemes/{id}`, `GET /api/schemes/meta/filters` in [`backend/app/api/schemes.py`](file:///c:/Users/Aniket19/OneDrive/Desktop/KisanMitra/backend/app/api/schemes.py).

### 2. Location-Based Crop Agronomy Handbook
* **Agronomy Guide Service:** Built [`backend/app/services/crop_guide_service.py`](file:///c:/Users/Aniket19/OneDrive/Desktop/KisanMitra/backend/app/services/crop_guide_service.py) containing structured ICAR agronomic guidelines for 8 staple and cash crops:
  * *Soybean, Wheat, Cotton, Rice, Tomato, Onion, Maize, Sugarcane*.
* **Data Taxonomy:** Optimal soil types & pH range, sowing windows & seed spacing, critical water requirements, fertilizer split schedules, major pests & diseases, prevention practices, and harvesting indicators.
* **Backend Crop Guide API:** `GET /api/crop-guide/crops`, `GET /api/crop-guide/{crop_id}` in [`backend/app/api/crop_guide.py`](file:///c:/Users/Aniket19/OneDrive/Desktop/KisanMitra/backend/app/api/crop_guide.py).

### 3. Frontend Schemes & Crop Guide Hubs
* **Schemes Page (`app/schemes/page.tsx`, `app/schemes/[id]/page.tsx`):** Category filter chips, search bar, state filter, detailed scheme modal with document checklist, and direct official application buttons.
* **Crop Guide Page (`app/crop-guide/page.tsx`):** Crop selector tabs, agro-climatic location selector, section cards for Soil, Sowing, Water, Nutrition, Pests & Diseases, and Harvest.

---

## 📁 Important Files & Components
* `backend/app/api/schemes.py`
* `backend/app/api/crop_guide.py`
* `backend/app/schemas/schemes.py`
* `backend/app/schemas/crop_guide.py`
* `backend/app/services/scheme_service.py`
* `backend/app/services/crop_guide_service.py`
* `frontend/app/schemes/page.tsx`
* `frontend/app/schemes/[id]/page.tsx`
* `frontend/app/crop-guide/page.tsx`

---

## 🧪 Testing & Validation
* Verified scheme search, category filters, and detail endpoints.
* Verified crop guide lookups across all 8 supported crops with location context.
* Verified schema validation and RAG knowledge retrieval availability for the AI Assistant.

---

## 🏁 Final Result
Farmers gain instant, unhindered access to official government entitlements and scientific agronomy handbooks.
