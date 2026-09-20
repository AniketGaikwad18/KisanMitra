# 🛠️ Technology Stack

KisanMitra is built with a clean, high-performance, modern full-stack architecture that prioritizes developer velocity, accessibility, type safety, and real-time responsiveness.

---

## 📊 Technology Stack Matrix

| Architectural Layer | Technologies & Frameworks | Key Responsibilities & Capabilities |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 14** (App Router), **React 18** | Server & Client Components, fast static page generation, responsive routing, dynamic layout shells. |
| **Language (Frontend)** | **TypeScript 5.6** | Complete static type safety, end-to-end interface contracts with backend schemas. |
| **Styling & Design System** | **Tailwind CSS 3.4**, **clsx**, **tailwind-merge** | Custom farm-tailored design system tokens (Brand Yellow, Brand Green, Cream), high-contrast accessibility. |
| **Iconography & UI Assets** | **Lucide React** | Lightweight, accessible SVG icons for intuitive agricultural actions. |
| **Internationalization (i18n)** | **Custom React Context Engine** | Instant client-side localization across 5 Indian languages (*English, Marathi, Hindi, Tamil, Telugu*) with 300+ keys. |
| **Backend REST API** | **FastAPI 0.115**, **Python 3.11**, **Uvicorn** | High-performance asynchronous API endpoints, auto-generated OpenAPI / Swagger documentation (`/docs`). |
| **Data Validation & Schemas** | **Pydantic v2**, **Pydantic-Settings** | Strict runtime payload validation, request filtering, and environment management. |
| **AI Vision & Reasoning** | **Google Gemini 1.5 Flash** (via Backend REST) | Multimodal visual crop disease diagnosis, context-grounded natural language agricultural reasoning. |
| **Meteorological Intelligence** | **Open-Meteo Forecast & Geocoding APIs** | Hyperlocal 7-day agricultural weather data, precipitation probabilities, and wind velocities. |
| **Market Price Discovery** | **data.gov.in / AGMARKNET API** | Real-time APMC wholesale arrival rates, modal prices, and multi-market comparison spreads. |
| **Knowledge Retrieval (RAG)** | **Deterministic Hybrid Retrieval Engine** | Dynamic factual context retrieval against Government Schemes and ICAR Crop Agronomy Guides. |
| **Database & Persistence Ready** | **Supabase / PostgreSQL (Schema-Ready)**, Client-Side `localStorage` | Fast offline client-side state synchronization; backend structured for direct Supabase PostgreSQL integration. |
| **Testing & Quality Assurance** | **Pytest**, **AnyIO**, **TSX** | Automated backend unit & regression test suite (68 tests), i18n translation parity validator. |

---

## 🔒 Security Architecture Highlights

* **Zero Frontend Secret Exposure:** No API keys (`GEMINI_API_KEY`, `MANDI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) are exposed to the browser or stored in `localStorage`.
* **Prompt Injection Defense:** External user context is isolated as reference data blocks rather than system execution instructions.
* **Isolated Offline Fallbacks:** Deterministic mock generators guarantee continuous functionality during hackathon judging if network or external API quotas are constrained.
