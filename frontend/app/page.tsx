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

export default function LandingPage() {
  const features = [
    {
      icon: <Stethoscope className="w-6 h-6 text-brand-green" />,
      title: "Crop Health",
      desc: "Upload leaf photos to detect diseases early, understand symptoms, and get preventive treatment steps.",
      badge: "AI Vision",
      href: "/crop-doctor",
    },
    {
      icon: <FlaskConical className="w-6 h-6 text-brand-green" />,
      title: "Soil Health",
      desc: "Evaluate pH, Nitrogen, Phosphorus, and Potassium levels to balance fertilizer use and maintain fertile soil.",
      badge: "Nutrient Care",
      href: "/soil",
    },
    {
      icon: <CloudSun className="w-6 h-6 text-brand-green" />,
      title: "Weather Intelligence",
      desc: "Hyperlocal weather forecasts that explain what upcoming weather means for your daily farm activities.",
      badge: "Farm Advisory",
      href: "/weather",
    },
    {
      icon: <Coins className="w-6 h-6 text-brand-green" />,
      title: "Mandi Prices",
      desc: "Compare real APMC market rates across nearby mandis to make informed crop selling decisions.",
      badge: "Market Discovery",
      href: "/mandi",
    },
    {
      icon: <Landmark className="w-6 h-6 text-brand-green" />,
      title: "Government Schemes",
      desc: "Explore Central and State agricultural subsidy programs with clear eligibility guidelines and application steps.",
      badge: "Subsidies",
      href: "/schemes",
    },
    {
      icon: <BotMessageSquare className="w-6 h-6 text-brand-green" />,
      title: "AI Assistant",
      desc: "Ask natural-language agricultural questions in regional Indian languages with full context of your farm.",
      badge: "Multilingual",
      href: "/assistant",
    },
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Tell us about your farm",
      desc: "Provide your location, soil type, and target crops to establish your localized farm profile.",
    },
    {
      step: "02",
      title: "Understand your farm",
      desc: "Get holistic visibility into soil nutrients, upcoming weather risks, and crop health status.",
    },
    {
      step: "03",
      title: "Get useful insights",
      desc: "Receive actionable advisories on sowing, spraying windows, pest remedies, and mandi prices.",
    },
    {
      step: "04",
      title: "Make better decisions",
      desc: "Protect your harvest, reduce input costs, and secure better market returns for your produce.",
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
                🌾 HACKDAY 1.0 — Tech for a Better Tomorrow
              </span>
            </div>

            {/* Main Hero Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-brand-text leading-[1.15]">
              Smarter Decisions. <br className="hidden sm:inline" />
              <span className="text-brand-green underline decoration-brand-yellow decoration-4 underline-offset-8">
                Healthier Farms.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-6 text-lg sm:text-xl text-brand-text-secondary leading-relaxed max-w-2xl mx-auto">
              One simple platform for crop health, soil insights, weather intelligence,
              market information and agricultural support.
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
                  Explore KisanMitra
                </Button>
              </Link>
              <a href="#why-kisanmitra" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold">
                  How KisanMitra Helps
                </Button>
              </a>
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
                <span className="text-xs font-semibold text-brand-text-secondary">Multilingual (5 Languages)</span>
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
              The Agricultural Challenge
            </Badge>
            <h2 className="text-3xl font-extrabold text-brand-text">
              Why KisanMitra?
            </h2>
            <p className="mt-3 text-base text-brand-text-secondary leading-relaxed">
              Every season, farmers must make critical decisions on diseases, weather, soil nutrients, prices, and government schemes. Yet, vital agricultural knowledge is scattered across fragmented apps, complex portals, and unverified groups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-brand-bg border border-brand-border shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-100 text-brand-danger flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-text mb-2">
                  Fragmented Sources
                </h3>
                <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                  Weather in one app, mandi rates in another, and disease guides elsewhere create confusion and delayed farm responses.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-border/60 text-xs font-semibold text-brand-green">
                KisanMitra Solution: Unified Platform
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-brand-bg border border-brand-border shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-brand-warning flex items-center justify-center mb-4">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-text mb-2">
                  Raw Data Without Action
                </h3>
                <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                  Displaying raw numbers like 28°C or 70% humidity isn&apos;t enough—farmers need to know: <em>&quot;What does this weather mean for my crop today?&quot;</em>
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-border/60 text-xs font-semibold text-brand-green">
                KisanMitra Solution: Actionable Advisories
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-brand-bg border border-brand-border shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-green/15 text-brand-green flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-text mb-2">
                  Unverified Guidance
                </h3>
                <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                  Generic chatbots often invent schemes or provide inaccurate diagnoses without transparent confidence ratings.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-border/60 text-xs font-semibold text-brand-green">
                KisanMitra Solution: Verified Decision Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT KISANMITRA PROVIDES (Six Feature Previews) */}
      <section className="py-16 md:py-24 bg-brand-bg border-b border-brand-border/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <Badge variant="brand" className="mb-3">
              Full Suite Capabilities
            </Badge>
            <h2 className="text-3xl font-extrabold text-brand-text">
              What KisanMitra Provides
            </h2>
            <p className="mt-3 text-base text-brand-text-secondary">
              Six core decision-support modules designed specifically for Indian agriculture.
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
                    <span>Explore module</span>
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
              Simple 4-Step Process
            </Badge>
            <h2 className="text-3xl font-extrabold text-brand-text">
              How It Works
            </h2>
            <p className="mt-3 text-base text-brand-text-secondary">
              From understanding your field to harvesting with confidence.
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
              Built to make agricultural information simpler and more accessible.
            </h3>

            <p className="text-sm sm:text-base text-brand-text-secondary max-w-xl mx-auto mb-8 leading-relaxed">
              Empowering Indian farmers with clear, connected, and actionable decision support for every stage of the farming cycle.
            </p>

            <Link href="/dashboard">
              <Button size="lg" variant="primary" className="font-bold px-8 shadow-md glow-warm">
                Explore KisanMitra →
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
            <span className="text-xs text-brand-text-secondary hidden sm:inline">— Smarter Decisions. Healthier Farms.</span>
          </div>
          <p className="text-xs">
            Built for <span className="font-bold text-brand-text">HACKDAY 1.0</span> (Tech for a Better Tomorrow)
          </p>
        </div>
      </footer>
    </div>
  );
}
