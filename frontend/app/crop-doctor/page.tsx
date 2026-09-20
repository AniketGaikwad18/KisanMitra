"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { ErrorState } from "@/components/ui/ErrorState";
import { analyzeCropImage } from "@/lib/api";
import { CropAnalysisResult } from "@/types";
import {
  Stethoscope,
  UploadCloud,
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldAlert,
  RotateCcw,
  Eye,
  Lightbulb,
  ShieldCheck,
  HelpCircle,
  ImageIcon,
  Activity,
  FileCheck,
} from "lucide-react";

export default function CropDoctorPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "selected" | "analyzing" | "success" | "uncertain" | "error"
  >("idle");
  const [result, setResult] = useState<CropAnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URLs on unmount or file change
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileSelect = (file: File) => {
    setErrorMessage(null);

    // Validate mime type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setStatus("error");
      setErrorMessage("Please upload a valid crop image in JPG, PNG, or WEBP format.");
      return;
    }

    // Validate size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setStatus("error");
      setErrorMessage(`File too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Please upload an image smaller than 10 MB.`);
      return;
    }

    // Generate preview
    const url = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(url);
    setStatus("selected");
    setResult(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleRemoveImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setStatus("idle");
    setResult(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setStatus("analyzing");
    setErrorMessage(null);

    try {
      const response = await analyzeCropImage(selectedFile);

      if (response.data) {
        setResult(response.data);
        if (response.data.is_identified === false) {
          setStatus("uncertain");
        } else {
          setStatus("success");
          // Optionally save recent scan to localStorage for Dashboard integration
          try {
            localStorage.setItem(
              "kisanmitra_last_crop_check",
              JSON.stringify({
                crop: response.data.crop || "Soybean",
                condition: response.data.possible_condition || "Healthy",
                severity: response.data.severity || "Good",
                timestamp: new Date().toISOString(),
              })
            );
          } catch {
            // Ignore storage errors
          }
        }
      } else {
        setStatus("error");
        setErrorMessage(
          response.error || "The crop analysis service is temporarily unavailable. Please try again."
        );
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong during diagnosis.");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getSeverityBadge = (severity?: string) => {
    switch (severity?.toLowerCase()) {
      case "healthy":
      case "good":
        return <Badge variant="success" size="md">Healthy</Badge>;
      case "mild":
        return <Badge variant="brand" size="md">Mild Severity</Badge>;
      case "moderate":
        return <Badge variant="warning" size="md">Moderate Severity</Badge>;
      case "severe":
        return <Badge variant="danger" size="md">High Severity</Badge>;
      default:
        return <Badge variant="neutral" size="md">{severity || "Unknown"}</Badge>;
    }
  };

  return (
    <AppShell>
      <PageHeader
        title="AI Crop Doctor"
        description="Upload a clear photo of your crop or leaf and get an AI-assisted health assessment."
        icon={<Stethoscope className="w-6 h-6 text-brand-green" />}
        badge={<Badge variant="brand">Gemini Vision AI</Badge>}
      />

      {/* Best Results Tip Banner */}
      <div className="mb-6 p-3.5 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center gap-3 text-xs sm:text-sm text-brand-text">
        <Info className="w-4 h-4 text-brand-green flex-shrink-0" />
        <span>
          <strong>Tip for best results:</strong> Upload a clear, well-lit image showing the affected part of the leaf, stem, or fruit.
        </span>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/jpg"
          className="hidden"
          onChange={handleInputChange}
        />

        {/* 1. UPLOAD & PREVIEW AREA */}
        {status === "idle" && (
          <Card
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`p-8 sm:p-12 text-center border-2 border-dashed transition-all cursor-pointer ${
              isDragOver
                ? "border-brand-green bg-brand-green/5 scale-[1.01]"
                : "border-brand-border hover:border-brand-green/50 bg-brand-surface"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-yellow/30 text-brand-green mx-auto flex items-center justify-center mb-4 border border-brand-yellow/50">
              <UploadCloud className="w-8 h-8 text-brand-green" />
            </div>

            <h2 className="text-xl font-extrabold text-brand-text mb-2">
              Upload your crop image
            </h2>

            <p className="text-sm text-brand-text-secondary max-w-sm mx-auto mb-6 leading-relaxed">
              Drag &amp; drop a leaf photo or click below to select from your device.
            </p>

            <Button
              type="button"
              variant="primary"
              size="md"
              className="font-bold shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Choose Image
            </Button>

            <div className="mt-6 text-xs text-brand-text-secondary font-medium">
              Supported formats: <span className="font-semibold text-brand-text">JPG • PNG • WEBP</span> (Max 10 MB)
            </div>
          </Card>
        )}

        {/* 2. SELECTED / PREVIEW STATE */}
        {status === "selected" && previewUrl && selectedFile && (
          <Card className="p-6 sm:p-8 bg-brand-surface border border-brand-border shadow-card">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Image Preview Box */}
              <div className="w-full md:w-64 h-56 rounded-xl border border-brand-border bg-brand-bg overflow-hidden relative shadow-subtle flex-shrink-0 flex items-center justify-center">
                <Image
                  src={previewUrl}
                  alt="Crop preview"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details & Action Buttons */}
              <div className="flex-1 w-full flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <Badge variant="brand" size="sm">
                      Ready for Diagnosis
                    </Badge>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="text-brand-text-secondary hover:text-brand-danger p-1 rounded-lg transition-colors"
                      title="Remove image"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-brand-text mt-2 truncate">
                    {selectedFile.name}
                  </h3>
                  <p className="text-xs text-brand-text-secondary mt-0.5">
                    File size: {formatFileSize(selectedFile.size)} • Format: {selectedFile.type.split("/")[1]?.toUpperCase()}
                  </p>
                </div>

                <div className="p-3 bg-brand-bg rounded-xl border border-brand-border/60 text-xs text-brand-text-secondary">
                  Ready to analyze symptoms with AI plant pathology models.
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto font-bold glow-warm shadow-md"
                    onClick={handleAnalyze}
                    leftIcon={<Stethoscope className="w-5 h-5" />}
                  >
                    🔍 Analyze Crop
                  </Button>

                  <Button
                    variant="outline"
                    size="md"
                    className="w-full sm:w-auto"
                    onClick={handleRemoveImage}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* 3. ANALYZING LOADING STATE */}
        {status === "analyzing" && (
          <Card className="p-10 sm:p-14 text-center bg-brand-surface border border-brand-border shadow-card">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="w-20 h-20 rounded-2xl bg-brand-yellow/30 flex items-center justify-center border border-brand-yellow/50 animate-pulse">
                <Stethoscope className="w-10 h-10 text-brand-green" />
              </div>
              <div className="absolute inset-0 rounded-2xl border-2 border-brand-green border-t-transparent animate-spin" />
            </div>

            <h3 className="text-xl font-extrabold text-brand-text mb-2">
              🌱 Analyzing your crop...
            </h3>

            <p className="text-sm text-brand-text-secondary max-w-md mx-auto mb-6 leading-relaxed">
              Our AI is examining the leaf image for disease symptoms, pest marks, and nutrient deficiencies. This may take a few seconds.
            </p>

            <div className="max-w-xs mx-auto bg-brand-border/50 h-2 rounded-full overflow-hidden">
              <div className="bg-brand-green h-2 rounded-full w-3/4 animate-[pulse_1.5s_ease-in-out_infinite]" />
            </div>
          </Card>
        )}

        {/* 4. ERROR STATE */}
        {status === "error" && (
          <ErrorState
            title="Analysis Could Not Proceed"
            message={errorMessage || "Please try uploading a clear crop image again."}
            onRetry={handleRemoveImage}
          />
        )}

        {/* 5. UNCERTAIN / UNKNOWN CASE */}
        {status === "uncertain" && result && (
          <Card className="p-8 bg-brand-surface border border-brand-border shadow-card">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-brand-warning flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <HelpCircle className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-extrabold text-brand-text text-center mb-2">
              We couldn&apos;t confidently identify a crop condition
            </h3>

            <p className="text-sm text-brand-text-secondary text-center max-w-lg mx-auto mb-6 leading-relaxed">
              {result.explanation || "The image might be blurry, poorly lit, or not clearly showing recognizable plant foliage."}
            </p>

            <div className="max-w-md mx-auto p-4 rounded-xl bg-brand-bg border border-brand-border mb-6 text-xs text-brand-text space-y-2">
              <div className="font-bold text-brand-text flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Try uploading:</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-brand-text-secondary">
                <li>A clearer, focused image of the affected plant</li>
                <li>A closer photo highlighting specific leaf lesions or spots</li>
                <li>An image taken in bright, natural daylight</li>
              </ul>
            </div>

            <div className="text-center">
              <Button
                variant="primary"
                onClick={handleRemoveImage}
                leftIcon={<RotateCcw className="w-4 h-4" />}
                className="font-bold"
              >
                Upload Another Photo
              </Button>
            </div>
          </Card>
        )}

        {/* 6. SUCCESS RESULT VIEW */}
        {status === "success" && result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            {/* Top Primary Diagnosis Header Card */}
            <Card className="p-6 sm:p-8 bg-brand-surface border border-brand-border shadow-card">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-brand-border">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge variant="brand" size="sm" className="font-bold">
                      AI-assisted prediction
                    </Badge>
                    {result.is_demo && (
                      <Badge variant="warning" size="sm" className="text-[10px] font-bold">
                        Demo Analysis
                      </Badge>
                    )}
                    {getSeverityBadge(result.severity)}
                  </div>

                  <div className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary mt-1">
                    Identified Crop: <span className="text-brand-text text-sm font-extrabold">{result.crop || "Unknown Plant"}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-brand-text mt-1">
                    {result.possible_condition || "Condition Identified"}
                  </h2>
                </div>

                {/* AI Confidence Meter */}
                {result.confidence !== null && result.confidence !== undefined && (
                  <div className="p-4 rounded-xl bg-brand-bg border border-brand-border text-center md:text-right flex-shrink-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-text-secondary block mb-1">
                      AI Model Confidence
                    </span>
                    <div className="text-2xl font-black text-brand-green">
                      {result.confidence_text || `${Math.round(result.confidence * 100)}%`}
                    </div>
                    {/* Confidence Visual Bar */}
                    <div className="w-36 bg-brand-border/60 h-2 rounded-full mt-2 overflow-hidden mx-auto md:ml-auto md:mr-0">
                      <div
                        className="bg-brand-green h-2 rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(100, Math.round(result.confidence * 100))}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* What the AI observed */}
              {result.observations && result.observations.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="w-5 h-5 text-brand-green" />
                    <h3 className="text-base font-bold text-brand-text">
                      What the AI observed
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {result.observations.map((obs, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-brand-bg/60 border border-brand-border/60 flex items-start gap-2.5 text-xs sm:text-sm text-brand-text"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                        <span>{obs}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What this may mean (Explanation) */}
              {result.explanation && (
                <div className="mt-6 p-4 rounded-xl bg-[#FAF8EE] border border-[#E9E3C8] text-xs sm:text-sm text-brand-text">
                  <div className="flex items-center gap-2 font-bold mb-1.5 text-[#7A610A]">
                    <Lightbulb className="w-4 h-4" />
                    <span>What this may mean</span>
                  </div>
                  <p className="leading-relaxed text-brand-text-secondary">
                    {result.explanation}
                  </p>
                </div>
              )}
            </Card>

            {/* Recommended Actions & Prevention Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* What you can consider doing */}
              <Card className="p-6 bg-brand-surface border border-brand-border shadow-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-brand-border">
                    <Activity className="w-5 h-5 text-brand-green" />
                    <h3 className="text-base font-bold text-brand-text">
                      What you can consider doing
                    </h3>
                  </div>

                  {result.recommended_actions && result.recommended_actions.length > 0 ? (
                    <ul className="space-y-2.5 text-xs sm:text-sm text-brand-text-secondary">
                      {result.recommended_actions.map((act, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-brand-green/10 text-brand-green font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="leading-relaxed">{act}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-brand-text-secondary">
                      Maintain regular crop monitoring and consultation.
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-brand-border/60 text-[11px] text-brand-text-secondary">
                  General cultural advice. Avoid unverified chemical applications.
                </div>
              </Card>

              {/* Preventive Guidance */}
              <Card className="p-6 bg-brand-surface border border-brand-border shadow-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-brand-border">
                    <ShieldCheck className="w-5 h-5 text-brand-green" />
                    <h3 className="text-base font-bold text-brand-text">
                      Prevention & Long-term Care
                    </h3>
                  </div>

                  {result.preventive_guidance && result.preventive_guidance.length > 0 ? (
                    <ul className="space-y-2.5 text-xs sm:text-sm text-brand-text-secondary">
                      {result.preventive_guidance.map((prev, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{prev}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-brand-text-secondary">
                      Practice standard crop rotation and clean field sanitation.
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-brand-border/60 text-[11px] text-brand-text-secondary">
                  Protective measures to stop disease spread across seasons.
                </div>
              </Card>
            </div>

            {/* Additional Context Needed (If any) */}
            {result.additional_information_needed && result.additional_information_needed.length > 0 && (
              <div className="p-4 rounded-xl bg-brand-surface border border-brand-border text-xs text-brand-text flex items-start gap-3 shadow-subtle">
                <FileCheck className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-brand-text block mb-1">
                    Helpful variables for deeper diagnosis:
                  </strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {result.additional_information_needed.map((infoItem, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-brand-bg border border-brand-border text-[11px] text-brand-text-secondary"
                      >
                        {infoItem}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action Bar (Scan Another) */}
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="primary"
                size="md"
                className="font-bold"
                onClick={handleRemoveImage}
                leftIcon={<RotateCcw className="w-4 h-4" />}
              >
                Scan Another Crop Image
              </Button>
            </div>

            {/* 23. IMPORTANT DISCLAIMER */}
            <div className="p-4 rounded-xl border border-brand-border bg-brand-surface flex items-start gap-3 shadow-subtle">
              <ShieldAlert className="w-5 h-5 text-brand-warning flex-shrink-0 mt-0.5" />
              <div className="text-xs text-brand-text-secondary leading-relaxed">
                <strong className="text-brand-text block mb-0.5">AI-assisted assessment:</strong>
                {result.disclaimer ||
                  "This result is not a definitive agricultural diagnosis. Confirm important treatment decisions with a qualified agricultural professional or trusted agricultural authority."}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
