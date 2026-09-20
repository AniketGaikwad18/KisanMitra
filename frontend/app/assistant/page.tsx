"use client";

import React, { useState, useEffect, useRef } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/lib/i18n";
import { sendAssistantMessage, getWeather, getMandiPrices } from "@/lib/api";
import {
  FarmerContext,
  ChatMessage,
  AssistantResponse,
  WeatherResponse,
} from "@/types";
import {
  BotMessageSquare,
  Sparkles,
  Send,
  CloudRain,
  Leaf,
  FlaskConical,
  Stethoscope,
  TrendingUp,
  FileText,
  BookOpen,
  MapPin,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Trash2,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  HelpCircle,
  Lightbulb,
} from "lucide-react";

const SUPPORTED_CROPS = [
  "Soybean",
  "Wheat",
  "Cotton",
  "Rice",
  "Tomato",
  "Onion",
  "Maize",
  "Sugarcane",
];

const CHAT_STORAGE_KEY = "kisanmitra_assistant_chat_history";

export default function AssistantPage() {
  const { t, language } = useTranslation();

  // Active farm context state
  const [activeCrop, setActiveCrop] = useState<string>("Soybean");
  const [locationName, setLocationName] = useState<string>("Pune");
  const [stateName, setStateName] = useState<string>("Maharashtra");
  const [farmerContext, setFarmerContext] = useState<FarmerContext>({});
  const [isContextLoading, setIsContextLoading] = useState<boolean>(true);
  const [isContextDrawerOpen, setIsContextDrawerOpen] = useState<boolean>(false);

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState<string>("");
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 1. Harvest Farmer Context from local storage & active APIs
  const harvestFarmContext = async (targetCropName: string = activeCrop) => {
    setIsContextLoading(true);
    const ctx: FarmerContext = {
      language: language,
    };

    // A. Location context
    let locName = "Pune";
    let stName = "Maharashtra";
    let lat = 18.5204;
    let lon = 73.8567;

    try {
      const savedLoc = localStorage.getItem("kisanmitra_weather_location");
      if (savedLoc) {
        const parsedLoc = JSON.parse(savedLoc);
        if (parsedLoc.name) locName = parsedLoc.name;
        if (parsedLoc.state || parsedLoc.region)
          stName = parsedLoc.state || parsedLoc.region;
        if (parsedLoc.latitude) lat = parsedLoc.latitude;
        if (parsedLoc.longitude) lon = parsedLoc.longitude;
      }
    } catch {
      // fallback to defaults
    }

    setLocationName(locName);
    setStateName(stName);
    ctx.location = {
      name: locName,
      state: stName,
      district: locName,
    };

    // B. Crop context
    ctx.crop = {
      name: targetCropName,
      stage: "Vegetative / Growth Stage",
    };

    // C. Soil context from latest test
    try {
      const savedSoil = localStorage.getItem("kisanmitra_last_soil_check");
      if (savedSoil) {
        const parsedSoil = JSON.parse(savedSoil);
        ctx.soil = {
          score: parsedSoil.score,
          rating: parsedSoil.rating,
          ph: parsedSoil.ph,
          nitrogen: parsedSoil.nitrogen,
          phosphorus: parsedSoil.phosphorus,
          potassium: parsedSoil.potassium,
          organic_matter: parsedSoil.organic_matter,
          observations: parsedSoil.observations,
        };
      }
    } catch {
      // no saved soil test
    }

    // D. Crop Doctor context from latest scan
    try {
      const savedCropCheck = localStorage.getItem("kisanmitra_last_crop_check");
      if (savedCropCheck) {
        const parsedCrop = JSON.parse(savedCropCheck);
        ctx.crop_health = {
          crop: parsedCrop.crop,
          condition: parsedCrop.condition,
          severity: parsedCrop.severity,
          confidence: parsedCrop.confidence,
          observations: parsedCrop.observations,
        };
      }
    } catch {
      // no saved crop scan
    }

    // E. Weather context from API
    try {
      const weatherRes = await getWeather({
        latitude: lat,
        longitude: lon,
        location: locName,
      });
      if (weatherRes.data) {
        const w = weatherRes.data;
        ctx.weather = {
          temperature: Math.round(w.current.temperature),
          condition: w.current.condition,
          rain_probability: w.today.rain_probability,
          humidity: w.current.humidity,
          alerts: w.agricultural_alerts.map((a) => a.title || a.message),
        };
      }
    } catch {
      // Weather API unavailable
    }

    // F. Mandi price context
    try {
      const mandiRes = await getMandiPrices({
        commodity: targetCropName,
        state: stName,
        limit: 1,
      });
      if (mandiRes.data && mandiRes.data.records.length > 0) {
        const rec = mandiRes.data.records[0];
        ctx.market = {
          commodity: rec.commodity,
          market: rec.market,
          modal_price: rec.modal_price || undefined,
          is_demo: mandiRes.data.is_demo,
        };
      }
    } catch {
      // Mandi API unavailable
    }

    setFarmerContext(ctx);
    setIsContextLoading(false);
  };

  // Load chat history and context on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(CHAT_STORAGE_KEY);
      if (savedHistory) {
        setMessages(JSON.parse(savedHistory));
      }
    } catch {
      // ignore
    }

    harvestFarmContext(activeCrop);
  }, []);

  // Update language in context when language changes
  useEffect(() => {
    setFarmerContext((prev) => ({
      ...prev,
      language: language,
    }));
  }, [language]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Handle crop change
  const handleCropChange = (crop: string) => {
    setActiveCrop(crop);
    harvestFarmContext(crop);
  };

  // Send message handler
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isThinking) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: "user",
      text: query,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputQuery("");
    setIsThinking(true);

    try {
      const response = await sendAssistantMessage({
        message: query,
        context: farmerContext,
        language: language,
      });

      if (response.data) {
        const assistantMessage: ChatMessage = {
          id: `msg-${Date.now()}-assistant`,
          sender: "assistant",
          text: response.data.answer,
          timestamp: new Date().toISOString(),
          responseData: response.data,
        };
        const nextMessages = [...updatedMessages, assistantMessage];
        setMessages(nextMessages);
        try {
          localStorage.setItem(
            CHAT_STORAGE_KEY,
            JSON.stringify(nextMessages.slice(-10))
          );
        } catch {
          // ignore storage error
        }
      } else {
        throw new Error(response.error || "Failed to get response");
      }
    } catch {
      const errorMessage: ChatMessage = {
        id: `msg-${Date.now()}-error`,
        sender: "assistant",
        text: t("assistant.error"),
        timestamp: new Date().toISOString(),
        isError: true,
      };
      const nextMessages = [...updatedMessages, errorMessage];
      setMessages(nextMessages);
    } finally {
      setIsThinking(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  // Clear chat
  const handleClearChat = () => {
    setMessages([]);
    localStorage.removeItem(CHAT_STORAGE_KEY);
  };

  // Dynamic suggested questions based on active context
  const suggestedQuestions = [
    `Should I irrigate my ${activeCrop} field today?`,
    `What does today's weather mean for my ${activeCrop} crop?`,
    "My soil test was completed. What should I prioritize for nutrition?",
    `What common diseases affect ${activeCrop} and how can I prevent them?`,
    `What government schemes are available for ${activeCrop} farming in ${stateName}?`,
    `What are the latest reported mandi prices for ${activeCrop}?`,
  ];

  // Render context tag badge
  const renderContextTag = (tag: string) => {
    switch (tag) {
      case "weather":
        return (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200"
          >
            <CloudRain className="w-3.5 h-3.5" />
            {t("assistant.tagWeather")}
          </span>
        );
      case "crop":
        return (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
          >
            <Leaf className="w-3.5 h-3.5" />
            {t("assistant.tagCrop")}
          </span>
        );
      case "soil":
        return (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            {t("assistant.tagSoil")}
          </span>
        );
      case "crop_health":
      case "crop_doctor":
        return (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            {t("assistant.tagCropDoctor")}
          </span>
        );
      case "market":
      case "mandi":
        return (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            {t("assistant.tagMandi")}
          </span>
        );
      case "schemes":
        return (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200"
          >
            <FileText className="w-3.5 h-3.5" />
            {t("assistant.tagSchemes")}
          </span>
        );
      case "crop_guide":
        return (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200"
          >
            <BookOpen className="w-3.5 h-3.5" />
            {t("assistant.tagCropGuide")}
          </span>
        );
      case "location":
        return (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200"
          >
            <MapPin className="w-3.5 h-3.5" />
            {t("assistant.tagLocation")}
          </span>
        );
      default:
        return (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200"
          >
            {tag}
          </span>
        );
    }
  };

  return (
    <AppShell>
      <PageHeader
        title={t("assistant.title")}
        description={t("assistant.subtitle")}
        icon={<BotMessageSquare className="w-6 h-6 text-brand-green" />}
        badge={<Badge variant="brand">{t("assistant.badge")}</Badge>}
        action={
          messages.length > 0 ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearChat}
              className="text-xs text-brand-text-secondary hover:text-red-600 hover:border-red-200"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" />
              {t("assistant.clearChat")}
            </Button>
          ) : undefined
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ========================================================= */}
        {/* LEFT COLUMN: CURRENT FARM CONTEXT SUMMARY PANEL           */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-4 sm:p-5 border-brand-border bg-white shadow-card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-text">
                    {t("assistant.contextTitle")}
                  </h3>
                  <p className="text-[11px] text-brand-text-secondary">
                    {t("assistant.contextDesc")}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => harvestFarmContext(activeCrop)}
                disabled={isContextLoading}
                className="p-1.5 h-auto text-brand-text-secondary hover:text-brand-green"
                title="Refresh farm context"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${
                    isContextLoading ? "animate-spin text-brand-green" : ""
                  }`}
                />
              </Button>
            </div>

            {/* Mobile Context Drawer Toggle */}
            <button
              onClick={() => setIsContextDrawerOpen(!isContextDrawerOpen)}
              className="lg:hidden w-full flex items-center justify-between py-2 px-3 bg-brand-surface rounded-xl text-xs font-semibold text-brand-text mb-2 border border-brand-border"
            >
              <span>{isContextDrawerOpen ? "Hide Farm Data" : "View Active Farm Data"}</span>
              {isContextDrawerOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {/* Context Data Fields (Always visible on desktop, toggleable on mobile) */}
            <div
              className={`space-y-3 pt-2 ${
                isContextDrawerOpen ? "block" : "hidden lg:block"
              }`}
            >
              {/* Location */}
              <div className="flex items-start justify-between p-2.5 rounded-xl bg-brand-surface/60 border border-brand-border/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-text-secondary shrink-0" />
                  <div>
                    <span className="text-xs font-medium text-brand-text-secondary block">
                      {t("assistant.contextLocation")}
                    </span>
                    <span className="text-xs font-bold text-brand-text">
                      {farmerContext.location?.name}, {farmerContext.location?.state}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {t("assistant.available")}
                </span>
              </div>

              {/* Active Crop Selector */}
              <div className="p-2.5 rounded-xl bg-brand-surface/60 border border-brand-border/60">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs font-medium text-brand-text-secondary">
                      {t("assistant.contextCrop")}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {t("assistant.available")}
                  </span>
                </div>
                <select
                  value={activeCrop}
                  onChange={(e) => handleCropChange(e.target.value)}
                  className="w-full text-xs font-bold text-brand-text bg-white border border-brand-border rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-green"
                >
                  {SUPPORTED_CROPS.map((crop) => (
                    <option key={crop} value={crop}>
                      {crop}
                    </option>
                  ))}
                </select>
              </div>

              {/* Soil Health */}
              <div className="flex items-start justify-between p-2.5 rounded-xl bg-brand-surface/60 border border-brand-border/60">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="text-xs font-medium text-brand-text-secondary block">
                      {t("assistant.contextSoil")}
                    </span>
                    {farmerContext.soil ? (
                      <span className="text-xs font-bold text-brand-text">
                        Score: {farmerContext.soil.score}/100 • pH: {farmerContext.soil.ph}
                      </span>
                    ) : (
                      <span className="text-xs text-brand-text-secondary italic">
                        {t("assistant.notAvailable")}
                      </span>
                    )}
                  </div>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    farmerContext.soil
                      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                      : "text-slate-500 bg-slate-100 border-slate-200"
                  }`}
                >
                  {farmerContext.soil
                    ? t("assistant.available")
                    : t("assistant.notAvailable")}
                </span>
              </div>

              {/* Current Weather */}
              <div className="flex items-start justify-between p-2.5 rounded-xl bg-brand-surface/60 border border-brand-border/60">
                <div className="flex items-center gap-2">
                  <CloudRain className="w-4 h-4 text-sky-600 shrink-0" />
                  <div>
                    <span className="text-xs font-medium text-brand-text-secondary block">
                      {t("assistant.contextWeather")}
                    </span>
                    {farmerContext.weather ? (
                      <span className="text-xs font-bold text-brand-text">
                        {farmerContext.weather.temperature}°C • Rain: {farmerContext.weather.rain_probability}%
                      </span>
                    ) : (
                      <span className="text-xs text-brand-text-secondary italic">
                        {t("assistant.notAvailable")}
                      </span>
                    )}
                  </div>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    farmerContext.weather
                      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                      : "text-slate-500 bg-slate-100 border-slate-200"
                  }`}
                >
                  {farmerContext.weather
                    ? t("assistant.available")
                    : t("assistant.notAvailable")}
                </span>
              </div>

              {/* Crop Doctor Health Diagnosis */}
              <div className="flex items-start justify-between p-2.5 rounded-xl bg-brand-surface/60 border border-brand-border/60">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-rose-600 shrink-0" />
                  <div>
                    <span className="text-xs font-medium text-brand-text-secondary block">
                      {t("assistant.contextCropHealth")}
                    </span>
                    {farmerContext.crop_health ? (
                      <span className="text-xs font-bold text-brand-text">
                        {farmerContext.crop_health.condition} ({farmerContext.crop_health.severity})
                      </span>
                    ) : (
                      <span className="text-xs text-brand-text-secondary italic">
                        {t("assistant.notAvailable")}
                      </span>
                    )}
                  </div>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    farmerContext.crop_health
                      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                      : "text-slate-500 bg-slate-100 border-slate-200"
                  }`}
                >
                  {farmerContext.crop_health
                    ? t("assistant.available")
                    : t("assistant.notAvailable")}
                </span>
              </div>

              {/* Mandi Market Data */}
              <div className="flex items-start justify-between p-2.5 rounded-xl bg-brand-surface/60 border border-brand-border/60">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div>
                    <span className="text-xs font-medium text-brand-text-secondary block">
                      {t("assistant.contextMandi")}
                    </span>
                    {farmerContext.market?.modal_price ? (
                      <span className="text-xs font-bold text-brand-text">
                        ₹{farmerContext.market.modal_price}/q ({farmerContext.market.market})
                      </span>
                    ) : (
                      <span className="text-xs text-brand-text-secondary italic">
                        {t("assistant.notAvailable")}
                      </span>
                    )}
                  </div>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    farmerContext.market
                      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                      : "text-slate-500 bg-slate-100 border-slate-200"
                  }`}
                >
                  {farmerContext.market
                    ? t("assistant.available")
                    : t("assistant.notAvailable")}
                </span>
              </div>
            </div>
          </Card>

          {/* Assistant Principles Card */}
          <div className="p-4 bg-brand-surface/80 rounded-2xl border border-brand-border/70 text-xs text-brand-text-secondary space-y-2">
            <div className="flex items-center gap-2 font-bold text-brand-text">
              <Lightbulb className="w-4 h-4 text-brand-green" />
              <span>Grounded Agricultural Intelligence</span>
            </div>
            <p className="leading-relaxed">
              KisanMitra synthesizes your active weather, soil tests, crop guide, and market data so you get specific agronomic answers instead of generic guesses.
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: INTERACTIVE CONVERSATION CHAT               */}
        {/* ========================================================= */}
        <div className="lg:col-span-8 flex flex-col h-[650px] bg-white rounded-2xl border border-brand-border shadow-card overflow-hidden">
          {/* Messages Stream Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-brand-surface/30 to-white">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-yellow/30 text-brand-green flex items-center justify-center border border-brand-yellow/60">
                  <BotMessageSquare className="w-7 h-7 text-brand-green" />
                </div>
                <div className="max-w-md">
                  <h3 className="text-base font-bold text-brand-text mb-1">
                    {t("assistant.emptyChatTitle")}
                  </h3>
                  <p className="text-xs text-brand-text-secondary leading-relaxed">
                    {t("assistant.emptyChatPrompt")}
                  </p>
                </div>

                {/* Suggested Questions Grid */}
                <div className="w-full max-w-lg pt-2 space-y-2 text-left">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-text px-1">
                    <HelpCircle className="w-3.5 h-3.5 text-brand-green" />
                    <span>{t("assistant.suggestedQuestionsTitle")}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(q)}
                        className="text-left p-2.5 rounded-xl bg-white border border-brand-border text-xs font-medium text-brand-text hover:border-brand-green hover:bg-brand-surface/60 transition-all shadow-subtle flex items-center justify-between group"
                      >
                        <span className="pr-2">{q}</span>
                        <Send className="w-3.5 h-3.5 text-brand-text-secondary group-hover:text-brand-green shrink-0 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Render Chat Messages */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-brand-green text-white rounded-br-none shadow-subtle"
                      : msg.isError
                      ? "bg-rose-50 border border-rose-200 text-rose-800 rounded-bl-none"
                      : "bg-brand-surface border border-brand-border text-brand-text rounded-bl-none shadow-subtle"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Assistant Context Attribution & Follow-up Details */}
                  {msg.responseData && (
                    <div className="mt-3 pt-3 border-t border-brand-border/70 space-y-2.5">
                      {/* Context Tags */}
                      {msg.responseData.context_used &&
                        msg.responseData.context_used.length > 0 && (
                          <div>
                            <span className="text-[11px] font-bold text-brand-text-secondary block mb-1.5">
                              {t("assistant.basedOn")}:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {msg.responseData.context_used.map((tag) =>
                                renderContextTag(tag)
                              )}
                            </div>
                          </div>
                        )}

                      {/* Useful Next Step */}
                      {msg.responseData.follow_up_question && (
                        <div className="p-2.5 bg-brand-yellow/20 rounded-xl border border-brand-yellow/40 flex items-start gap-2 text-xs text-brand-text font-medium">
                          <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-amber-900 block text-[11px]">
                              {t("assistant.usefulNextStep")}:
                            </span>
                            <span>{msg.responseData.follow_up_question}</span>
                          </div>
                        </div>
                      )}

                      {/* Knowledge Sources links */}
                      {msg.responseData.sources &&
                        msg.responseData.sources.length > 0 && (
                          <div className="space-y-1">
                            {msg.responseData.sources
                              .filter((s) => s.url)
                              .map((source, sIdx) => (
                                <a
                                  key={sIdx}
                                  href={source.url!}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-green hover:underline"
                                >
                                  <span>{source.label}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              ))}
                          </div>
                        )}

                      {/* Confidence & Demo Notice Footer */}
                      <div className="flex items-center justify-between pt-1 text-[10px] text-brand-text-secondary">
                        <span className="flex items-center gap-1">
                          <span className="font-semibold">{t("assistant.confidence")}:</span>
                          <span
                            className={`font-bold capitalize ${
                              msg.responseData.confidence === "high"
                                ? "text-emerald-700"
                                : msg.responseData.confidence === "moderate"
                                ? "text-amber-700"
                                : "text-slate-600"
                            }`}
                          >
                            {msg.responseData.confidence === "high"
                              ? t("assistant.confidenceHigh")
                              : msg.responseData.confidence === "moderate"
                              ? t("assistant.confidenceModerate")
                              : t("assistant.confidenceLimited")}
                          </span>
                        </span>
                        {msg.responseData.is_demo && (
                          <span className="font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {t("assistant.demoNotice")}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Timestamp */}
                <span className="text-[10px] text-brand-text-secondary mt-1 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}

            {/* Thinking / Loading Animation Bubble */}
            {isThinking && (
              <div className="flex flex-col items-start">
                <div className="rounded-2xl rounded-bl-none p-3.5 bg-brand-surface border border-brand-border text-xs text-brand-text shadow-subtle flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
                  <span className="font-medium text-brand-text-secondary animate-pulse">
                    {t("assistant.thinking")}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions bar when chatting */}
          {messages.length > 0 && (
            <div className="px-4 py-2 border-t border-brand-border bg-brand-surface/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-bold text-brand-text-secondary shrink-0">
                Quick:
              </span>
              {suggestedQuestions.slice(0, 3).map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  disabled={isThinking}
                  className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white border border-brand-border text-[11px] font-medium text-brand-text hover:border-brand-green hover:bg-brand-surface transition-colors shrink-0 disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Box Area */}
          <div className="p-3 sm:p-4 bg-white border-t border-brand-border">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={t("assistant.inputPlaceholder")}
                disabled={isThinking}
                maxLength={1000}
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-brand-surface border border-brand-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green text-brand-text placeholder:text-brand-text-secondary disabled:opacity-60"
              />
              <Button
                type="submit"
                variant="primary"
                disabled={!inputQuery.trim() || isThinking}
                className="px-4 py-2.5 h-auto text-xs sm:text-sm shrink-0 rounded-xl"
              >
                <Send className="w-4 h-4 mr-1.5" />
                <span>{t("assistant.send")}</span>
              </Button>
            </form>
            <p className="text-[10px] text-brand-text-secondary text-center mt-2">
              {t("assistant.disclaimer")}
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
