# 🤖 AI Farmer Assistant Pipeline

## Context-Aware Conversational Agronomy

The AI Farmer Assistant is the conversational nexus of KisanMitra. Unlike standard chatbots that provide generic textbook advice, the KisanMitra Assistant grounds its reasoning in real-time, multi-dimensional farm context.

---

## 🔄 End-to-End Assistant Pipeline

```mermaid
sequenceDiagram
    autonumber
    actor Farmer as 👨‍🌾 Farmer
    participant UI as 📱 Next.js Assistant UI
    participant API as ⚡ FastAPI (/api/assistant/chat)
    participant CtxService as 🧠 Context Service
    participant RAG as 📚 Retrieval Service (RAG)
    participant Gemini as 🤖 Gemini 1.5 Flash
    participant Fallback as 🛡️ Deterministic Mock Fallback

    Farmer->>UI: Enters query ("Should I irrigate my soybean field today?")
    UI->>UI: Harvests active context (Weather, Soil, Mandi, Crop Diagnosis)
    UI->>API: POST /api/assistant/chat (message, context, language)
    
    API->>CtxService: Extract genuinely available context
    CtxService-->>API: Filtered non-empty context
    
    API->>CtxService: Determine relevant topics via keyword matcher
    CtxService-->>API: Relevant topics (e.g. ['weather', 'crop_guide'])
    
    API->>RAG: Retrieve relevant factual knowledge (Schemes, ICAR Guide)
    RAG-->>API: Factual agronomic knowledge snippets
    
    API->>CtxService: Filter & format context into prompt string
    CtxService-->>API: Tagged context block (Prompt Injection Protected)
    
    alt Gemini API Key Available
        API->>Gemini: POST generateContent (System Prompt + Context + Farmer Query)
        Gemini-->>API: Structured JSON (Answer, Confidence, Follow-up)
    else Offline / API Key Absent
        API->>Fallback: Generate deterministic multilingual mock response
        Fallback-->>API: Structured JSON (Answer, Confidence, Follow-up, is_demo=true)
    end
    
    API->>API: Attach Attribution Source Badges (Weather, ICAR, data.gov.in)
    API-->>UI: AssistantResponse Payload
    UI-->>Farmer: Render grounded response, confidence badge & follow-up chips
```

---

## 🛡️ Grounding & Prompt Injection Safeguards

1. **Context Isolation:** Farm parameters are enclosed within explicit reference markers (`AVAILABLE KISANMITRA FARM CONTEXT`) with explicit system instructions to treat context as reference data rather than instructions.
2. **Missing Data Transparency:** If a specific metric (e.g. soil nitrogen or leaf scan) is absent from the farmer's profile, the assistant acknowledges the data gap without inventing numbers.
3. **Safety Boundaries:**
   * Probabilistic phrasing for plant health (*"Observed symptoms suggest possible..."*).
   * Strict ban on dangerous chemical formulations or unverified pesticide mixing.
   * Prohibition of yield or future price guarantees.
   * Mandatory recommendation to consult local Krishi Vigyan Kendra (KVK) officers for critical interventions.
