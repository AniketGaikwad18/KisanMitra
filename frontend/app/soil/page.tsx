"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { SoilScoreGauge } from "@/components/soil/SoilScoreGauge";
import { ParameterCard } from "@/components/soil/ParameterCard";
import { analyzeSoil } from "@/lib/api";
import { SoilAnalysisRequest, SoilAnalysisResponse } from "@/types";
import { useTranslation } from "@/lib/i18n";
import {
  FlaskConical,
  Sliders,
  Info,
  Sparkles,
  CheckCircle2,
  FileText,
  Upload,
  ArrowRight,
  RotateCcw,
  BookOpen,
  MapPin,
  HelpCircle,
  Lightbulb,
  ShieldCheck,
  Leaf,
  ShieldAlert,
} from "lucide-react";

export default function SoilHealthPage() {
  const { t, formatNumber } = useTranslation();

  // Form State
  const [ph, setPh] = useState<string>("6.5");
  const [nitrogen, setNitrogen] = useState<string>("280");
  const [phosphorus, setPhosphorus] = useState<string>("22");
  const [potassium, setPotassium] = useState<string>("210");
  const [organicMatter, setOrganicMatter] = useState<string>("1.8");
  const [crop, setCrop] = useState<string>("Soybean");
  const [location, setLocation] = useState<string>("Pune, Maharashtra");

  // UI Flow Status
  const [status, setStatus] = useState<
    "idle" | "analyzing" | "success" | "error"
  >("idle");
  const [result, setResult] = useState<SoilAnalysisResponse | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  // Optional Report Upload UI State
  const [reportFileName, setReportFileName] = useState<string | null>(null);

  const cropOptions = [
    "Soybean",
    "Wheat",
    "Rice",
    "Cotton",
    "Maize",
    "Sugarcane",
    "Tomato",
    "Onion",
    "Other",
  ];

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Validate pH
    const phNum = parseFloat(ph);
    if (isNaN(phNum) || ph === "") {
      errors.ph = "Please enter a valid soil pH value.";
    } else if (phNum < 0 || phNum > 14) {
      errors.ph = "Soil pH must be between 0.0 and 14.0.";
    }

    // Validate Nitrogen
    const nNum = parseFloat(nitrogen);
    if (isNaN(nNum) || nitrogen === "") {
      errors.nitrogen = "Please enter Nitrogen value.";
    } else if (nNum < 0) {
      errors.nitrogen = "Nitrogen cannot be negative.";
    }

    // Validate Phosphorus
    const pNum = parseFloat(phosphorus);
    if (isNaN(pNum) || phosphorus === "") {
      errors.phosphorus = "Please enter Phosphorus value.";
    } else if (pNum < 0) {
      errors.phosphorus = "Phosphorus cannot be negative.";
    }

    // Validate Potassium
    const kNum = parseFloat(potassium);
    if (isNaN(kNum) || potassium === "") {
      errors.potassium = "Please enter Potassium value.";
    } else if (kNum < 0) {
      errors.potassium = "Potassium cannot be negative.";
    }

    // Validate Organic Matter (Optional)
    if (organicMatter && organicMatter.trim() !== "") {
      const omNum = parseFloat(organicMatter);
      if (isNaN(omNum) || omNum < 0 || omNum > 100) {
        errors.organicMatter = "Organic Matter must be between 0% and 100%.";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("analyzing");
    setApiError(null);

    const payload: SoilAnalysisRequest = {
      ph: parseFloat(ph),
      nitrogen: parseFloat(nitrogen),
      phosphorus: parseFloat(phosphorus),
      potassium: parseFloat(potassium),
      organic_matter:
        organicMatter && organicMatter.trim() !== ""
          ? parseFloat(organicMatter)
          : null,
      crop: crop || "Soybean",
      location: location || "Pune, Maharashtra",
    };

    try {
      const response = await analyzeSoil(payload);

      if (response.data) {
        setResult(response.data);
        setStatus("success");

        // Save recent score to localStorage for Dashboard integration
        try {
          localStorage.setItem(
            "kisanmitra_last_soil_check",
            JSON.stringify({
              score: response.data.overall_score,
              rating: response.data.rating,
              crop: payload.crop,
              timestamp: new Date().toISOString(),
            })
          );
        } catch {
          // Ignore storage errors
        }
      } else {
        setStatus("error");
        setApiError(
          response.error || "We couldn't analyze these values. Please check your numbers and try again."
        );
      }
    } catch (err: any) {
      setStatus("error");
      setApiError(err.message || "An unexpected error occurred during soil assessment.");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setResult(null);
    setApiError(null);
    setFormErrors({});
  };

  return (
    <AppShell>
      <PageHeader
        title={t("soil.title")}
        description={t("soil.subtitle")}
        icon={<FlaskConical className="w-6 h-6 text-brand-green" />}
        badge={<Badge variant="success">{t("nav.categoryAgronomy")}</Badge>}
      />

      {/* Informational Message */}
      <div className="mb-6 p-3.5 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center gap-3 text-xs sm:text-sm text-brand-text">
        <Info className="w-4 h-4 text-brand-green flex-shrink-0" />
        <span>
          <strong>{t("common.trustNotice")}:</strong> {t("soil.formSub")}
        </span>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* 1. INPUT FORM & REPORT UPLOAD (Visible during IDLE state) */}
        {status === "idle" && (
          <div className="space-y-6">
            <form onSubmit={handleSubmit}>
              <Card className="p-6 sm:p-8 bg-brand-surface border border-brand-border shadow-card space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-brand-border">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-brand-green" />
                    <h2 className="text-lg font-bold text-brand-text">
                      {t("soil.formTitle")}
                    </h2>
                  </div>
                  <span className="text-xs text-brand-text-secondary">
                    * {t("soil.formSub")}
                  </span>
                </div>

                {/* Primary NPK & pH Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Field: Soil pH */}
                  <div>
                    <label
                      htmlFor="ph-input"
                      className="block text-xs font-bold text-brand-text mb-1.5"
                    >
                      {t("soil.phLabel")} <span className="text-brand-danger">*</span>
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <input
                        id="ph-input"
                        type="number"
                        step="0.01"
                        min="0"
                        max="14"
                        value={ph}
                        onChange={(e) => setPh(e.target.value)}
                        placeholder="e.g. 6.5"
                        className={`w-full px-3.5 py-2.5 rounded-xl border bg-brand-bg text-brand-text text-sm outline-none transition-all pr-14 ${
                          formErrors.ph
                            ? "border-brand-danger focus:ring-2 focus:ring-brand-danger"
                            : "border-brand-border focus:border-brand-green focus:bg-white"
                        }`}
                        required
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs font-bold text-brand-text-secondary pointer-events-none">
                        pH
                      </span>
                    </div>
                    {formErrors.ph && (
                      <p className="text-[11px] text-brand-danger mt-1">
                        {formErrors.ph}
                      </p>
                    )}
                    <span className="text-[11px] text-brand-text-secondary block mt-1">
                      {t("soil.phHelp")}
                    </span>
                  </div>

                  {/* Field: Nitrogen (N) */}
                  <div>
                    <label
                      htmlFor="nitrogen-input"
                      className="block text-xs font-bold text-brand-text mb-1.5"
                    >
                      {t("soil.nitrogenLabel")} <span className="text-brand-danger">*</span>
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <input
                        id="nitrogen-input"
                        type="number"
                        step="0.1"
                        min="0"
                        value={nitrogen}
                        onChange={(e) => setNitrogen(e.target.value)}
                        placeholder="e.g. 280"
                        className={`w-full px-3.5 py-2.5 rounded-xl border bg-brand-bg text-brand-text text-sm outline-none transition-all pr-16 ${
                          formErrors.nitrogen
                            ? "border-brand-danger focus:ring-2 focus:ring-brand-danger"
                            : "border-brand-border focus:border-brand-green focus:bg-white"
                        }`}
                        required
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs font-bold text-brand-text-secondary pointer-events-none">
                        {t("soil.nitrogenUnit")}
                      </span>
                    </div>
                    {formErrors.nitrogen && (
                      <p className="text-[11px] text-brand-danger mt-1">
                        {formErrors.nitrogen}
                      </p>
                    )}
                    <span className="text-[11px] text-brand-text-secondary block mt-1">
                      Low: &lt;280 • Medium: 280–560 • High: &gt;560
                    </span>
                  </div>

                  {/* Field: Phosphorus (P) */}
                  <div>
                    <label
                      htmlFor="phosphorus-input"
                      className="block text-xs font-bold text-brand-text mb-1.5"
                    >
                      {t("soil.phosphorusLabel")} <span className="text-brand-danger">*</span>
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <input
                        id="phosphorus-input"
                        type="number"
                        step="0.1"
                        min="0"
                        value={phosphorus}
                        onChange={(e) => setPhosphorus(e.target.value)}
                        placeholder="e.g. 22"
                        className={`w-full px-3.5 py-2.5 rounded-xl border bg-brand-bg text-brand-text text-sm outline-none transition-all pr-16 ${
                          formErrors.phosphorus
                            ? "border-brand-danger focus:ring-2 focus:ring-brand-danger"
                            : "border-brand-border focus:border-brand-green focus:bg-white"
                        }`}
                        required
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs font-bold text-brand-text-secondary pointer-events-none">
                        {t("soil.phosphorusUnit")}
                      </span>
                    </div>
                    {formErrors.phosphorus && (
                      <p className="text-[11px] text-brand-danger mt-1">
                        {formErrors.phosphorus}
                      </p>
                    )}
                    <span className="text-[11px] text-brand-text-secondary block mt-1">
                      Low: &lt;10 • Medium: 10–25 • High: &gt;25
                    </span>
                  </div>

                  {/* Field: Potassium (K) */}
                  <div>
                    <label
                      htmlFor="potassium-input"
                      className="block text-xs font-bold text-brand-text mb-1.5"
                    >
                      {t("soil.potassiumLabel")} <span className="text-brand-danger">*</span>
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <input
                        id="potassium-input"
                        type="number"
                        step="0.1"
                        min="0"
                        value={potassium}
                        onChange={(e) => setPotassium(e.target.value)}
                        placeholder="e.g. 210"
                        className={`w-full px-3.5 py-2.5 rounded-xl border bg-brand-bg text-brand-text text-sm outline-none transition-all pr-16 ${
                          formErrors.potassium
                            ? "border-brand-danger focus:ring-2 focus:ring-brand-danger"
                            : "border-brand-border focus:border-brand-green focus:bg-white"
                        }`}
                        required
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs font-bold text-brand-text-secondary pointer-events-none">
                        {t("soil.potassiumUnit")}
                      </span>
                    </div>
                    {formErrors.potassium && (
                      <p className="text-[11px] text-brand-danger mt-1">
                        {formErrors.potassium}
                      </p>
                    )}
                    <span className="text-[11px] text-brand-text-secondary block mt-1">
                      Low: &lt;140 • Medium: 140–280 • High: &gt;280
                    </span>
                  </div>

                  {/* Field: Organic Matter (Optional) */}
                  <div>
                    <label
                      htmlFor="om-input"
                      className="block text-xs font-bold text-brand-text mb-1.5"
                    >
                      {t("soil.organicMatterLabel")} <span className="text-brand-text-secondary text-[11px] font-normal">{t("soil.organicMatterOptional")}</span>
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <input
                        id="om-input"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={organicMatter}
                        onChange={(e) => setOrganicMatter(e.target.value)}
                        placeholder="e.g. 1.8"
                        className={`w-full px-3.5 py-2.5 rounded-xl border bg-brand-bg text-brand-text text-sm outline-none transition-all pr-12 ${
                          formErrors.organicMatter
                            ? "border-brand-danger focus:ring-2 focus:ring-brand-danger"
                            : "border-brand-border focus:border-brand-green focus:bg-white"
                        }`}
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs font-bold text-brand-text-secondary pointer-events-none">
                        %
                      </span>
                    </div>
                    {formErrors.organicMatter && (
                      <p className="text-[11px] text-brand-danger mt-1">
                        {formErrors.organicMatter}
                      </p>
                    )}
                    <span className="text-[11px] text-brand-text-secondary block mt-1">
                      Low: &lt;0.5% • Medium: 0.5–0.75% • High: &gt;0.75%
                    </span>
                  </div>

                  {/* Field: Target Crop Selection */}
                  <div>
                    <label
                      htmlFor="crop-select"
                      className="block text-xs font-bold text-brand-text mb-1.5"
                    >
                      {t("soil.cropLabel")}
                    </label>
                    <select
                      id="crop-select"
                      value={crop}
                      onChange={(e) => setCrop(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-brand-text text-sm outline-none focus:border-brand-green focus:bg-white transition-all cursor-pointer font-medium"
                    >
                      {cropOptions.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <span className="text-[11px] text-brand-text-secondary block mt-1">
                      {t("cropGuide.subtitle")}
                    </span>
                  </div>
                </div>

                {/* Location Input (Default: Pune, Maharashtra) */}
                <div className="pt-2 border-t border-brand-border/60">
                  <label
                    htmlFor="location-input"
                    className="block text-xs font-bold text-brand-text mb-1.5"
                  >
                    {t("soil.locationLabel")}
                  </label>
                  <div className="relative rounded-xl shadow-sm">
                    <input
                      id="location-input"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Pune, Maharashtra"
                      className="w-full px-3.5 py-2.5 pl-9 rounded-xl border border-brand-border bg-brand-bg text-brand-text text-sm outline-none focus:border-brand-green focus:bg-white transition-all font-medium"
                    />
                    <MapPin className="w-4 h-4 text-brand-green absolute left-3 top-3" />
                  </div>
                </div>

                {/* Submit Action CTA */}
                <div className="pt-4 border-t border-brand-border flex items-center justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="font-bold shadow-md glow-warm w-full sm:w-auto"
                    leftIcon={<FlaskConical className="w-5 h-5 text-brand-text" />}
                  >
                    {t("soil.analyzeButton")}
                  </Button>
                </div>
              </Card>
            </form>

            {/* 2. OPTIONAL SOIL REPORT UPLOAD SECTION (UI PLACEHOLDER) */}
            <Card className="p-6 bg-brand-surface border border-brand-border shadow-card">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-brand-border">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-green" />
                  <h3 className="text-base font-bold text-brand-text">
                    {t("schemes.requiredDocuments")}
                  </h3>
                </div>
                <Badge variant="warning" size="sm" className="text-[10px] font-bold">
                  {t("common.demo")}
                </Badge>
              </div>

              <div className="p-6 rounded-xl border-2 border-dashed border-brand-border bg-brand-bg/50 text-center flex flex-col items-center justify-center">
                <Upload className="w-8 h-8 text-brand-green mb-2 opacity-70" />
                <h4 className="text-sm font-bold text-brand-text">
                  {t("cropDoctor.uploadTitle")} (PDF / JPG / PNG)
                </h4>
                <p className="text-xs text-brand-text-secondary mt-1 max-w-sm">
                  {t("common.trustNotice")}: {t("common.curatedGovt")}
                </p>

                <div className="mt-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled
                    className="cursor-not-allowed opacity-60 text-xs"
                  >
                    {t("cropDoctor.chooseImage")}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* 3. ANALYZING LOADING STATE */}
        {status === "analyzing" && (
          <LoadingState
            message={t("soil.analyzingButton")}
            description={t("soil.subtitle")}
          />
        )}

        {/* 4. ERROR STATE */}
        {status === "error" && (
          <ErrorState
            title={t("common.error")}
            message={apiError || t("common.error")}
            onRetry={handleReset}
          />
        )}

        {/* 5. SUCCESS RESULTS VIEW */}
        {status === "success" && result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            {/* Top Score Banner Gauge */}
            <SoilScoreGauge
              score={result.overall_score}
              rating={result.rating}
            />

            {/* Measured Parameter Cards Grid */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-brand-text">
                  {t("soil.formTitle")}
                </h3>
                <span className="text-xs text-brand-text-secondary">
                  {t("soil.scoreSub")}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* pH Card */}
                <ParameterCard
                  label={t("soil.phLabel")}
                  chemicalSymbol="pH"
                  result={result.parameters.ph}
                  description="Acidity/alkalinity balance for nutrient availability"
                />

                {/* Nitrogen Card */}
                <ParameterCard
                  label={t("soil.nitrogenLabel")}
                  chemicalSymbol="N"
                  result={result.parameters.nitrogen}
                  description="Vital for foliage growth and chlorophyll development"
                />

                {/* Phosphorus Card */}
                <ParameterCard
                  label={t("soil.phosphorusLabel")}
                  chemicalSymbol="P"
                  result={result.parameters.phosphorus}
                  description="Essential for root establishment and energy transfer"
                />

                {/* Potassium Card */}
                <ParameterCard
                  label={t("soil.potassiumLabel")}
                  chemicalSymbol="K"
                  result={result.parameters.potassium}
                  description="Key for disease resistance and moisture regulation"
                />
              </div>

              {/* Organic Matter Card if present */}
              {result.parameters.organic_matter && (
                <div className="mt-4 max-w-sm">
                  <ParameterCard
                    label={t("soil.organicMatterLabel")}
                    chemicalSymbol="OC"
                    result={result.parameters.organic_matter}
                    description="Improves soil microbial activity and moisture holding"
                  />
                </div>
              )}
            </div>

            {/* Observations & Recommendations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Key Observations */}
              <Card className="p-6 bg-brand-surface border border-brand-border shadow-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-brand-border">
                    <CheckCircle2 className="w-5 h-5 text-brand-green" />
                    <h3 className="text-base font-bold text-brand-text">
                      {t("soil.observationsTitle")}
                    </h3>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-brand-text-secondary">
                    {result.observations.map((obs, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{obs}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-border/60 text-[11px] text-brand-text-secondary">
                  {t("common.trustAdvisory")}: {t("common.curatedGovt")}
                </div>
              </Card>

              {/* What You Can Consider */}
              <Card className="p-6 bg-brand-surface border border-brand-border shadow-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-brand-border">
                    <Lightbulb className="w-5 h-5 text-amber-600" />
                    <h3 className="text-base font-bold text-brand-text">
                      {t("soil.recommendationsTitle")}
                    </h3>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-brand-text-secondary">
                    {result.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-brand-yellow/40 text-brand-text font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-border/60 text-[11px] text-brand-text-secondary">
                  {t("common.trustAdvisory")}: {t("soil.disclaimer")}
                </div>
              </Card>
            </div>

            {/* Crop Context Information (If provided) */}
            {result.crop_context && (
              <Card className="p-6 bg-brand-surface border border-brand-border shadow-card">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-brand-border">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-brand-green" />
                    <h3 className="text-base font-bold text-brand-text">
                      {t("soil.cropContextTitle")}: {result.crop_context.crop_name}
                    </h3>
                  </div>
                  <Badge
                    variant={result.crop_context.is_ph_suitable ? "success" : "warning"}
                    size="sm"
                  >
                    {result.crop_context.is_ph_suitable ? t("common.verified") : t("weather.sprayCaution")}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-brand-bg/70 border border-brand-border/60 space-y-1">
                    <span className="text-[11px] font-bold text-brand-text-secondary uppercase tracking-wider block">
                      {t("cropGuide.optimalPh")}
                    </span>
                    <span className="font-extrabold text-brand-text text-sm">
                      {result.crop_context.suitable_ph_range}
                    </span>
                    <p className="text-xs text-brand-text-secondary mt-1">
                      {result.crop_context.soil_notes}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-brand-bg/70 border border-brand-border/60 space-y-1">
                    <span className="text-[11px] font-bold text-brand-text-secondary uppercase tracking-wider block">
                      {t("cropGuide.nutrientManagement")}
                    </span>
                    <span className="font-extrabold text-brand-green text-sm">
                      {result.crop_context.primary_focus}
                    </span>
                    {result.crop_context.considerations.length > 0 && (
                      <p className="text-xs text-brand-text-secondary mt-1">
                        {result.crop_context.considerations[0]}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {/* 15. DATA QUALITY & TRUST SECTION */}
            <div className="p-5 rounded-2xl border border-brand-border bg-brand-surface shadow-subtle space-y-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-brand-warning flex-shrink-0" />
                <h4 className="text-sm font-bold text-brand-text">
                  {t("common.trustAdvisory")}
                </h4>
              </div>

              <p className="text-xs text-brand-text-secondary leading-relaxed">
                {t("soil.disclaimer")}
              </p>

              {result.data_quality_notes && result.data_quality_notes.length > 0 && (
                <div className="pt-2 border-t border-brand-border/60 text-[11px] text-brand-text-secondary space-y-1">
                  {result.data_quality_notes.map((note, i) => (
                    <p key={i}>• {note}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Reset / Edit Button */}
            <div className="flex items-center justify-between pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={handleReset}
                leftIcon={<RotateCcw className="w-4 h-4" />}
                className="font-bold"
              >
                {t("common.retry")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
