"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import {
  Compass,
  MapPin,
  Sprout,
  Droplets,
  FlaskConical,
  Bug,
  ShieldCheck,
  Wheat,
  Info,
  BookOpen,
  AlertTriangle,
  Layers,
  Sparkles,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { getCropGuideList, getCropGuide } from "@/lib/api";
import { CropSummary, CropGuideResponse } from "@/types";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { CropSelector } from "@/components/crop-guide/CropSelector";
import { CropSectionCard } from "@/components/crop-guide/CropSectionCard";
import { PestsAndDiseasesList } from "@/components/crop-guide/PestsAndDiseasesList";

const PRESET_LOCATIONS = [
  "Pune, Maharashtra",
  "Nashik, Maharashtra",
  "Nagpur, Maharashtra",
  "Indore, Madhya Pradesh",
  "Ludhiana, Punjab",
  "Karnal, Haryana",
  "Guntur, Andhra Pradesh",
  "All India (General)",
];

function CropGuideContent() {
  const searchParams = useSearchParams();
  const initialCropParam = searchParams.get("crop") || "soybean";
  const initialLocationParam = searchParams.get("location") || "Pune, Maharashtra";

  const [cropsList, setCropsList] = useState<CropSummary[]>([]);
  const [selectedCropId, setSelectedCropId] = useState<string>(initialCropParam);
  const [location, setLocation] = useState<string>(initialLocationParam);
  const [guideData, setGuideData] = useState<CropGuideResponse | null>(null);

  const [isLoadingList, setIsLoadingList] = useState<boolean>(true);
  const [isLoadingGuide, setIsLoadingGuide] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load available crops on mount
  useEffect(() => {
    setIsLoadingList(true);
    getCropGuideList().then((res) => {
      setIsLoadingList(false);
      if (res.data && res.data.crops) {
        setCropsList(res.data.crops);
        // If initial crop is not in list, fallback to first
        if (
          !res.data.crops.some(
            (c) => c.id.toLowerCase() === initialCropParam.toLowerCase()
          ) &&
          res.data.crops.length > 0
        ) {
          setSelectedCropId(res.data.crops[0].id);
        }
      }
    });
  }, [initialCropParam]);

  // Fetch crop guide data whenever crop or location changes
  const fetchGuide = useCallback(async (cropId: string, loc: string) => {
    if (!cropId) return;
    setIsLoadingGuide(true);
    setError(null);

    const res = await getCropGuide({
      crop: cropId,
      location: loc || undefined,
    });

    setIsLoadingGuide(false);

    if (res.data) {
      setGuideData(res.data);
    } else {
      setError(
        res.error ||
          "No crop guide is available for this crop yet. Please select another crop."
      );
    }
  }, []);

  useEffect(() => {
    if (selectedCropId) {
      fetchGuide(selectedCropId, location);
    }
  }, [fetchGuide, selectedCropId, location]);

  const handleSelectCrop = (cropId: string) => {
    setSelectedCropId(cropId);
  };

  return (
    <AppShell>
      {/* Header */}
      <PageHeader
        title="Crop Guide"
        description="Practical crop information for better farm decisions."
        badge={
          <Badge variant="success" className="flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" />
            Agronomic Decision Support
          </Badge>
        }
      />

      {/* Safety / Educational Disclaimer Banner */}
      <div className="mb-6 p-4 rounded-2xl bg-brand-yellow/20 border border-brand-yellow/50 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-brand-text leading-relaxed">
          <strong className="font-bold">Educational Notice:</strong> This guide provides general scientific agronomy recommendations curated from ICAR and State Agricultural University research. It is designed to support farm planning, not substitute for a certified local agricultural extension officer.
        </div>
      </div>

      {/* Crop Selector Bar */}
      {isLoadingList ? (
        <div className="h-16 bg-brand-surface rounded-2xl animate-pulse mb-6 border border-brand-border" />
      ) : cropsList.length > 0 ? (
        <CropSelector
          crops={cropsList}
          selectedCropId={selectedCropId}
          onSelectCrop={handleSelectCrop}
        />
      ) : null}

      {/* Location Context Selector */}
      <div className="bg-brand-surface rounded-2xl border border-brand-border p-4 mb-6 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-brand-green flex-shrink-0" />
          <span className="text-xs font-bold text-brand-text-secondary uppercase tracking-wider">
            Location Context:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full sm:w-auto px-3 py-1.5 rounded-xl border border-brand-border bg-brand-bg text-xs font-semibold text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-green"
          >
            {PRESET_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                📍 {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Guide Content */}
      {isLoadingGuide ? (
        <LoadingState message={`Loading agronomic guide for ${selectedCropId}...`} />
      ) : error ? (
        <ErrorState
          title="Guide Unavailable"
          message={error}
          onRetry={() => fetchGuide(selectedCropId, location)}
        />
      ) : !guideData ? (
        <EmptyState
          title="No Crop Selected"
          description="Please choose a crop profile from the list above."
        />
      ) : (
        <div className="space-y-6 mb-10">
          {/* Crop Overview Card */}
          <div className="bg-brand-surface rounded-3xl border border-brand-border p-6 sm:p-8 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl" role="img" aria-label="Crop">
                  🌾
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-text">
                  {guideData.name}
                </h2>
              </div>

              {guideData.location_context && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-bg text-brand-text-secondary border border-brand-border flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-brand-green" />
                  {guideData.location_context}
                </span>
              )}
            </div>

            <p className="text-base sm:text-lg text-brand-text leading-relaxed bg-brand-bg/50 p-5 rounded-2xl border border-brand-border/60">
              {guideData.overview}
            </p>
          </div>

          {/* Grid Layout: Soil & Sowing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 🌱 Soil Conditions */}
            <CropSectionCard
              title="🌱 Soil & pH Requirements"
              icon={Layers}
              iconColor="text-emerald-700"
              iconBg="bg-emerald-500/10"
            >
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900">
                    Optimal Soil pH:
                  </span>
                  <span className="text-sm font-black text-emerald-800 px-2.5 py-0.5 rounded-md bg-emerald-100 border border-emerald-200">
                    {guideData.soil.preferred_ph}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary block mb-1.5">
                    Suitable Soil Types:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {guideData.soil.soil_type.map((st, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-brand-bg text-brand-text border border-brand-border"
                      >
                        {st}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary block mb-1">
                    Drainage & Texture:
                  </span>
                  <p className="text-xs sm:text-sm text-brand-text leading-relaxed">
                    {guideData.soil.drainage}
                  </p>
                </div>
              </div>
            </CropSectionCard>

            {/* 🌾 Sowing & Planting */}
            <CropSectionCard
              title="🌾 Sowing & Planting Guidance"
              icon={Calendar}
              iconColor="text-amber-700"
              iconBg="bg-amber-500/10"
            >
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <span className="text-xs font-bold text-amber-900 block mb-0.5">
                    General Sowing Window:
                  </span>
                  <span className="text-sm font-bold text-amber-800">
                    {guideData.sowing.general_window}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary block mb-1.5">
                    Sowing Practices & Seed Prep:
                  </span>
                  <div className="space-y-2">
                    {guideData.sowing.notes.map((note, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-2" />
                        <span className="text-brand-text leading-relaxed">{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CropSectionCard>
          </div>

          {/* Grid Layout: Water & Nutrition */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 💧 Water Management */}
            <CropSectionCard
              title="💧 Water & Irrigation Considerations"
              icon={Droplets}
              iconColor="text-blue-700"
              iconBg="bg-blue-500/10"
            >
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/20">
                  <span className="text-xs font-bold text-blue-900 block mb-0.5">
                    Water Requirements:
                  </span>
                  <span className="text-sm font-medium text-blue-950">
                    {guideData.water.requirements}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary block mb-1.5">
                    Critical Irrigation Stages:
                  </span>
                  <div className="space-y-2">
                    {guideData.water.notes.map((note, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                        <span className="text-brand-text leading-relaxed">{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CropSectionCard>

            {/* 🧪 Nutrient Management */}
            <CropSectionCard
              title="🧪 Nutrient & Fertility Management"
              icon={FlaskConical}
              iconColor="text-purple-700"
              iconBg="bg-purple-500/10"
            >
              <div className="space-y-4">
                <p className="text-xs text-brand-text-secondary leading-relaxed">
                  Balanced fertilization ensures strong root development and grain/fruit filling.
                </p>

                <div className="space-y-2.5">
                  {guideData.nutrition.general_considerations.map((note, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2.5 rounded-xl bg-purple-500/5 border border-purple-500/15 text-xs sm:text-sm text-brand-text"
                    >
                      <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CropSectionCard>
          </div>

          {/* 🐛 Pests and Diseases */}
          <div className="bg-brand-surface rounded-3xl border border-brand-border p-6 sm:p-8 shadow-card">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-brand-border">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700">
                <Bug className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-text">
                  🐛 Common Pests, Diseases & Integrated Management (IPM)
                </h3>
                <p className="text-xs text-brand-text-secondary">
                  Early detection and cultural/biological practices prevent crop losses.
                </p>
              </div>
            </div>

            <PestsAndDiseasesList items={guideData.pests_and_diseases} />
          </div>

          {/* Grid Layout: Prevention & Harvest */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 🛡 Preventive Practices */}
            <CropSectionCard
              title="🛡 Agronomic Preventive Practices"
              icon={ShieldCheck}
              iconColor="text-emerald-700"
              iconBg="bg-emerald-500/10"
            >
              <div className="space-y-2.5">
                {guideData.prevention.map((prev, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <span className="w-2 h-2 rounded-full bg-brand-green flex-shrink-0 mt-1.5" />
                    <span className="text-brand-text leading-relaxed">{prev}</span>
                  </div>
                ))}
              </div>
            </CropSectionCard>

            {/* 🌾 Harvest Guidance */}
            <CropSectionCard
              title="🌾 Harvest & Post-Harvest Guidance"
              icon={Wheat}
              iconColor="text-amber-700"
              iconBg="bg-amber-500/10"
            >
              <div className="space-y-4">
                {guideData.harvest.maturity_signs && (
                  <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20">
                    <span className="text-xs font-bold text-amber-900 block mb-0.5">
                      Maturity Indicators:
                    </span>
                    <p className="text-xs sm:text-sm text-brand-text leading-relaxed">
                      {guideData.harvest.maturity_signs}
                    </p>
                  </div>
                )}

                {guideData.harvest.general_guidance && (
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary block mb-1">
                      Harvesting Methods:
                    </span>
                    <p className="text-xs sm:text-sm text-brand-text leading-relaxed">
                      {guideData.harvest.general_guidance}
                    </p>
                  </div>
                )}

                {guideData.harvest.post_harvest && (
                  <div className="pt-2 border-t border-brand-border/60">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary block mb-1">
                      Post-Harvest & Storage:
                    </span>
                    <p className="text-xs sm:text-sm text-brand-text leading-relaxed">
                      {guideData.harvest.post_harvest}
                    </p>
                  </div>
                )}
              </div>
            </CropSectionCard>
          </div>

          {/* Sources and Attribution */}
          <div className="bg-brand-surface rounded-2xl border border-brand-border p-5 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-brand-text-secondary uppercase tracking-wider mb-1">
                <BookOpen className="w-4 h-4 text-brand-green" />
                <span>Agricultural Knowledge Sources</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                {guideData.sources.map((src, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium px-2.5 py-1 rounded-lg bg-brand-bg text-brand-text border border-brand-border"
                  >
                    {src}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-right sm:max-w-xs">
              <span className="text-[11px] font-semibold text-brand-text-muted">
                Curated scientific agronomy references. Always confirm local micro-conditions with your Krishi Vigyan Kendra (KVK).
              </span>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

export default function CropGuidePage() {
  return (
    <Suspense
      fallback={
        <AppShell>
          <LoadingState message="Loading crop guide..." />
        </AppShell>
      }
    >
      <CropGuideContent />
    </Suspense>
  );
}
