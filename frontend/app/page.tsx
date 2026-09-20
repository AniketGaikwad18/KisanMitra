import React from "react";
import Link from "next/link";
import {
  Sprout,
  Stethoscope,
  FlaskConical,
  CloudSun,
  Coins,
  Landmark,
  Compass,
  BotMessageSquare,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Languages,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Navbar } from "@/components/layout/Navbar";

export default function LandingPage() {
  const features = [
    {
      icon: <Stethoscope className="w-6 h-6 text-brand-green" />,
      title: "AI Crop Doctor",
      desc: "Upload leaf photos for assisted disease detection, visible observations, and preventive remedies.",
      badge: "Vision AI",
      href: "/crop-doctor",
    },
    {
      icon: <FlaskConical className="w-6 h-6 text-brand-green" />,
      title: "Soil Health Insights",
      desc: "Interpret pH and NPK values combined with crop and location data for balanced fertilization.",
      badge: "Agronomy",
      href: "/soil",
    },
    {
      icon: <CloudSun className="w-6 h-6 text-brand-green" />,
      title: "Weather Intelligence",
      desc: "Hyperlocal weather forecasts translated into actionable farm advisories and spray windows.",
      badge: "Real-time",
      href: "/weather",
    },
    {
      icon: <Coins className="w-6 h-6 text-brand-green" />,
      title: "Mandi / Market Prices",
      desc: "Discover real APMC prices, price trends, and nearby markets for transparent crop selling.",
      badge: "Market Data",
      href: "/mandi",
    },
    {
      icon: <Landmark className="w-6 h-6 text-brand-green" />,
      title: "Government Schemes",
      desc: "Verified Central and State agricultural subsidy programs with clear eligibility and document lists.",
      badge: "Verified",
      href: "/schemes",
    },
    {
      icon: <BotMessageSquare className="w-6 h-6 text-brand-green" />,
      title: "AI Farmer Assistant",
      desc: "Context-aware conversational assistance answering farm queries in regional Indian languages.",
      badge: "Multilingual",
      href: "/assistant",
    },
  ];

  const highlights = [
    "Farmer-first design built with high readability and touch targets",
    "Assisted predictions with honest confidence levels and zero false certainty",
    "Multilingual access in English, Marathi, Hindi, Tamil & Telugu",
    "Unified agricultural decision chain from sowing to market sale",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text pattern-wheat">
      {/* Top Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Hackathon Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-yellow/30 border border-[#E8C238]/60 mb-6">
              <span className="text-sm font-semibold text-[#7D6008]">
                🌾 HACKDAY 1.0 — Tech for a Better Tomorrow
              </span>
            </div>

            {/* Hero Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-text leading-[1.15]">
              Smarter Decisions. <br className="hidden sm:inline" />
              <span className="text-brand-green underline decoration-brand-yellow decoration-4 underline-offset-8">
                Healthier Farms.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="mt-6 text-lg sm:text-xl text-brand-text-secondary leading-relaxed">
              KisanMitra brings crop health, soil insights, weather intelligence,
              market information and agricultural support together in one
              farmer-friendly platform.
            </p>

            {/* CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto shadow-md glow-warm"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Explore KisanMitra
                </Button>
              </Link>
              <a href="#features" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  How it helps
                </Button>
              </a>
            </div>

            {/* Trust highlights */}
            <div className="mt-12 pt-8 border-t border-brand-border/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-brand-text-secondary leading-snug">
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="py-16 md:py-24 bg-brand-surface border-b border-brand-border/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <Badge variant="brand" className="mb-3">
              Comprehensive Platform
            </Badge>
            <h2 className="text-3xl font-extrabold text-brand-text">
              Unified Decision Support for Indian Farmers
            </h2>
            <p className="mt-3 text-base text-brand-text-secondary">
              Connecting critical agricultural decisions into one seamless, accessible workflow.
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

                  <div className="mt-6 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-semibold text-brand-green">
                    <span>Learn module details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Decision Workflow Philosophy */}
      <section className="py-16 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-brand-surface rounded-2xl border border-brand-border p-6 sm:p-10 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-brand-green" />
              <h3 className="text-2xl font-bold text-brand-text">
                The KisanMitra Decision Chain
              </h3>
            </div>
            <p className="text-sm text-brand-text-secondary mb-6 leading-relaxed">
              Every farming season asks a series of interconnected questions. KisanMitra connects each step so farmers are never left searching across disjointed platforms.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-brand-bg rounded-xl border border-brand-border flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-brand-yellow font-bold text-xs flex items-center justify-center text-brand-text">1</span>
                <span className="font-semibold text-brand-text">What should I grow?</span>
              </div>
              <div className="p-3 bg-brand-bg rounded-xl border border-brand-border flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-brand-yellow font-bold text-xs flex items-center justify-center text-brand-text">2</span>
                <span className="font-semibold text-brand-text">Is my soil suitable?</span>
              </div>
              <div className="p-3 bg-brand-bg rounded-xl border border-brand-border flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-brand-yellow font-bold text-xs flex items-center justify-center text-brand-text">3</span>
                <span className="font-semibold text-brand-text">How to manage my crop?</span>
              </div>
              <div className="p-3 bg-brand-bg rounded-xl border border-brand-border flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-brand-yellow font-bold text-xs flex items-center justify-center text-brand-text">4</span>
                <span className="font-semibold text-brand-text">Is there a disease?</span>
              </div>
              <div className="p-3 bg-brand-bg rounded-xl border border-brand-border flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-brand-yellow font-bold text-xs flex items-center justify-center text-brand-text">5</span>
                <span className="font-semibold text-brand-text">What does weather mean?</span>
              </div>
              <div className="p-3 bg-brand-bg rounded-xl border border-brand-border flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-brand-yellow font-bold text-xs flex items-center justify-center text-brand-text">6</span>
                <span className="font-semibold text-brand-text">Where can I sell my crop?</span>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link href="/dashboard">
                <Button variant="primary" size="md">
                  Launch Dashboard →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-brand-surface border-t border-brand-border text-center text-sm text-brand-text-secondary">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌾</span>
            <span className="font-bold text-brand-text">KisanMitra</span>
            <span className="text-xs text-brand-text-secondary">— Smarter Decisions. Healthier Farms.</span>
          </div>
          <p className="text-xs">
            Built for <span className="font-bold text-brand-text">HACKDAY 1.0</span> (Tech for a Better Tomorrow)
          </p>
        </div>
      </footer>
    </div>
  );
}
