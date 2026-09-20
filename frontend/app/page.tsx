"use client";

import React from "react";
import Link from "next/link";
import {
  Sprout,
  Stethoscope,
  FlaskConical,
  CloudSun,
  Coins,
  Landmark,
  BotMessageSquare,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Layers,
  Search,
  Compass,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Navbar } from "@/components/layout/Navbar";
import { useTranslation } from "@/lib/i18n";

export default function LandingPage() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Stethoscope className="w-6 h-6 text-brand-green" />,
      title: t("landing.featureCropDoctorTitle"),
      desc: t("landing.featureCropDoctorDesc"),
      badge: t("nav.aiVisionBadge"),
      href: "/crop-doctor",
    },
    {
      icon: <FlaskConical className="w-6 h-6 text-brand-green" />,
      title: t("landing.featureSoilTitle"),
      desc: t("landing.featureSoilDesc"),
      badge: t("nav.soilHealth"),
      href: "/soil",
    },
    {
      icon: <CloudSun className="w-6 h-6 text-brand-green" />,
      title: t("landing.featureWeatherTitle"),
      desc: t("landing.featureWeatherDesc"),
      badge: t("nav.categoryForecast"),
      href: "/weather",
    },
    {
      icon: <Coins className="w-6 h-6 text-brand-green" />,
      title: t("landing.featureMandiTitle"),
      desc: t("landing.featureMandiDesc"),
      badge: t("nav.categoryMarketRates"),
      href: "/mandi",
    },
    {
      icon: <Landmark className="w-6 h-6 text-brand-green" />,
      title: t("landing.featureSchemesTitle"),
      desc: t("landing.featureSchemesDesc"),
      badge: t("nav.categorySupport"),
      href: "/schemes",
    },
    {
      icon: <Compass className="w-6 h-6 text-brand-green" />,
      title: t("landing.featureCropGuideTitle"),
      desc: t("landing.featureCropGuideDesc"),
      badge: t("nav.cropGuide"),
      href: "/crop-guide",
    },
    {
      icon: <BotMessageSquare className="w-6 h-6 text-brand-green" />,
      title: t("landing.featureAssistantTitle"),
      desc: t("landing.featureAssistantDesc"),
      badge: t("nav.aiBadge"),
      href: "/assistant",
    },
  ];

  const workflowSteps = [
    {
      step: "01",
      title: t("landing.step1Title"),
      desc: t("landing.step1Desc"),
    },
    {
      step: "02",
      title: t("landing.step2Title"),
      desc: t("landing.step2Desc"),
    },
    {
      step: "03",
      title: t("landing.step3Title"),
      desc: t("landing.step3Desc"),
    },
    {
      step: "04",
      title: t("landing.step4Title"),
      desc: t("landing.step4Desc"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text pattern-wheat">
      {/* Top Header */}
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Hackathon Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow/30 border border-[#E8C238]/60 mb-6 shadow-subtle">
              <span className="text-xs sm:text-sm font-bold text-[#7D6008]">
                {t("landing.heroBadge")}
              </span>
            </div>

            {/* Main Hero Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-brand-text leading-[1.15]">
              {t("landing.heroTitle1")} <br className="hidden sm:inline" />
              <span className="text-brand-green underline decoration-brand-yellow decoration-4 underline-offset-8">
                {t("landing.heroTitle2")}
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-6 text-lg sm:text-xl text-brand-text-secondary leading-relaxed max-w-2xl mx-auto">
              {t("landing.heroSubtitle")}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto shadow-md glow-warm font-bold"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  {t("landing.ctaDashboard")}
                </Button>
              </Link>
              <Link href="/crop-doctor" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold">
                  {t("landing.ctaExplore")}
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-brand-border/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0" />
                <span className="text-xs font-semibold text-brand-text-secondary">Farmer-first UI</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0" />
                <span className="text-xs font-semibold text-brand-text-secondary">Assisted AI Predictions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0" />
                <span className="text-xs font-semibold text-brand-text-secondary">5 Indian Languages</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0" />
                <span className="text-xs font-semibold text-brand-text-secondary">Verified Public Data</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY KISANMITRA? (Fragmented Information Problem) */}
      <section id="why-kisanmitra" className="py-16 md:py-20 bg-brand-surface border-b border-brand-border/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge variant="brand" className="mb-3">
              {t("landing.whyKisanMitraSub")}
            </Badge>
            <h2 className="text-3xl font-extrabold text-brand-text">
              {t("landing.whyKisanMitra")}
            </h2>
            <p className="mt-3 text-base text-brand-text-secondary leading-relaxed">
              {t("landing.heroSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-brand-bg border border-brand-border shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-100 text-brand-danger flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-text mb-2">
                  {t("landing.step1Title")}
                </h3>
                <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                  {t("landing.step1Desc")}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-border/60 text-xs font-semibold text-brand-green">
                KisanMitra: Unified Platform
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-brand-bg border border-brand-border shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-brand-warning flex items-center justify-center mb-4">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-text mb-2">
                  {t("landing.step2Title")}
                </h3>
                <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                  {t("landing.step2Desc")}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-border/60 text-xs font-semibold text-brand-green">
                KisanMitra: Actionable Advisories
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-brand-bg border border-brand-border shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-green/15 text-brand-green flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-text mb-2">
                  {t("landing.step3Title")}
                </h3>
                <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                  {t("landing.step3Desc")}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-border/60 text-xs font-semibold text-brand-green">
                KisanMitra: Verified Decision Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT KISANMITRA PROVIDES (Feature Cards) */}
      <section className="py-16 md:py-24 bg-brand-bg border-b border-brand-border/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <Badge variant="brand" className="mb-3">
              KisanMitra Decision Suite
            </Badge>
            <h2 className="text-3xl font-extrabold text-brand-text">
              {t("landing.whyKisanMitra")}
            </h2>
            <p className="mt-3 text-base text-brand-text-secondary">
              {t("landing.whyKisanMitraSub")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Link key={i} href={f.href} className="block group">
                <Card
                  hoverable
                  className="h-full flex flex-col justify-between border-brand-border group-hover:border-brand-green/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-brand-yellow/20 border border-brand-yellow/40 group-hover:bg-brand-yellow transition-colors">
                        {f.icon}
                      </div>
                      <Badge variant="neutral" size="sm">
                        {f.badge}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-brand-text group-hover:text-brand-green transition-colors">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm text-brand-text-secondary leading-relaxed">
                      {f.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-bold text-brand-green">
                    <span>{t("common.open")}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (4-Step Workflow) */}
      <section className="py-16 md:py-20 bg-brand-surface border-b border-brand-border/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="success" className="mb-3">
              {t("landing.howItWorksTitle")}
            </Badge>
            <h2 className="text-3xl font-extrabold text-brand-text">
              {t("landing.howItWorksTitle")}
            </h2>
            <p className="mt-3 text-base text-brand-text-secondary">
              {t("landing.howItWorksSub")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflowSteps.map((ws, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-brand-bg border border-brand-border flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-yellow text-brand-text font-black text-sm flex items-center justify-center border border-[#E2BF42] mb-4 shadow-subtle">
                    {ws.step}
                  </div>
                  <h3 className="text-base font-bold text-brand-text mb-2">
                    {ws.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                    {ws.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-border/50 text-[11px] font-semibold text-brand-green">
                  Step {i + 1} of 4
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FARMER-FIRST MESSAGE & FINAL CTA */}
      <section className="py-16 md:py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-brand-surface via-brand-surface to-[#F9F5EA] rounded-3xl border border-brand-border p-8 sm:p-12 shadow-card text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-yellow flex items-center justify-center border border-[#E2BF42] mx-auto mb-6 shadow-sm">
              <Sprout className="w-8 h-8 text-brand-green" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-text tracking-tight mb-3">
              {t("landing.ctaReadyTitle")}
            </h3>

            <p className="text-sm sm:text-base text-brand-text-secondary max-w-xl mx-auto mb-8 leading-relaxed">
              {t("landing.ctaReadySubtitle")}
            </p>

            <Link href="/dashboard">
              <Button size="lg" variant="primary" className="font-bold px-8 shadow-md glow-warm">
                {t("landing.ctaDashboard")} →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-brand-surface border-t border-brand-border text-center text-xs sm:text-sm text-brand-text-secondary">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌾</span>
            <span className="font-bold text-brand-text">KisanMitra</span>
            <span className="text-xs text-brand-text-secondary hidden sm:inline">— {t("common.brandTagline")}</span>
          </div>
          <p className="text-xs">
            Built for <span className="font-bold text-brand-text">HACKDAY 1.0</span> (Tech for a Better Tomorrow)
          </p>
        </div>
      </footer>
    </div>
  );
}

