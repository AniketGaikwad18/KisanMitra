# Phase 6: Mandi & Real Market Price Discovery

## 🎯 Phase Objective
Integrate real-time wholesale agricultural commodity price discovery from Government of India Open Government Data (data.gov.in) and the AGMARKNET ecosystem, providing multi-market price comparisons and transparent live vs. demo data tracking with zero fabricated prices.

---

## 🛠️ What Was Implemented

### 1. Data Provider & Live Aggregation
* **Mandi Provider:** Built [`backend/app/services/mandi_provider.py`](file:///c:/Users/Aniket19/OneDrive/Desktop/KisanMitra/backend/app/services/mandi_provider.py) communicating with the official data.gov.in APMC wholesale price resource API (`9ef84268-d588-465a-a308-a864a43d0070`).
* **Mandi Service:** Built [`backend/app/services/mandi_service.py`](file:///c:/Users/Aniket19/OneDrive/Desktop/KisanMitra/backend/app/services/mandi_service.py) handling dynamic filtering (commodity, state, district, market), modal price calculation, price spread analysis, and fallback handling.

### 2. Data Trust & Status Transparency
* **Zero Fabricated Prices:** Every record returned contains explicit provenance metadata:
  * `data_status`: `official` (live government records) or `demo` (offline development sample).
  * `is_demo`: Boolean flag consumed across frontend badges and AI Assistant grounding.
  * Source Attribution: Explicit links to data.gov.in / AGMARKNET.

### 3. Backend Mandi API
* **Endpoints:**
  * `GET /api/mandi/prices`: Filtered APMC price records and summary metrics.
  * `GET /api/mandi/filters`: Dynamic lists of supported commodities, states, and markets.
* **Schemas:** [`MandiPriceResponse`](file:///c:/Users/Aniket19/OneDrive/Desktop/KisanMitra/backend/app/schemas/mandi.py) containing records, modal/min/max prices, price units (₹/quintal), and arrival dates.

### 4. Frontend Mandi Intelligence Hub
* **Filter Panel:** Real-time selector for Commodity (*Soybean, Wheat, Cotton, Rice, Tomato, Onion, Maize, Sugarcane*), State, District, and APMC Market.
* **Primary Highlight Card:** Large modal price callout, price range bar (min to max), and arrival date.
* **Multi-Market Comparison Table:** Comparative table comparing prices across nearby APMC markets to help farmers select optimal selling points.
* **Source Attribution Card:** Official source stamp with dataset link and demo status disclaimer when offline.

---

## 📁 Important Files & Components
* `backend/app/api/mandi.py`
* `backend/app/schemas/mandi.py`
* `backend/app/services/mandi_service.py`
* `backend/app/services/mandi_provider.py`
* `frontend/app/mandi/page.tsx`
* `frontend/components/mandi/MandiFilterPanel.tsx`
* `frontend/components/mandi/MandiPriceCard.tsx`
* `frontend/components/mandi/MandiComparisonTable.tsx`
* `frontend/components/mandi/SourceAttributionCard.tsx`

---

## 🧪 Testing & Validation
* Verified API response structures with live government data format.
* Verified filter cascading (State -> District -> Market).
* Verified local persistence (`kisanmitra_mandi_filters`) for Dashboard and AI Assistant integration.

---

## 🏁 Final Result
Transparent wholesale price discovery that empowers farmers with market leverage and eliminates middlemen opacity.
