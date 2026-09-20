"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BotMessageSquare, MessagesSquare, Languages, Sparkles, Send, Mic } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AssistantPage() {
  const samplePrompts = [
    {
      lang: "English",
      text: "What should I do if my tomato leaves have brown spots?",
    },
    {
      lang: "मराठी (Marathi)",
      text: "माझ्या सोयाबीनच्या पिकावर पिवळे डाग पडत आहेत, काय करावे?",
    },
    {
      lang: "हिन्दी (Hindi)",
      text: "बारिश के बाद सोयाबीन में खाद कब डालना चाहिए?",
    },
  ];

  return (
    <AppShell>
      <PageHeader
        title="AI Farmer Assistant"
        description="Ask questions about your farm in natural language."
        icon={<BotMessageSquare className="w-6 h-6 text-brand-green" />}
        badge={<Badge variant="brand">Multilingual AI</Badge>}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-8 text-center border-dashed border-2 border-brand-border bg-gradient-to-b from-brand-surface to-[#FDFDF8]">
          <div className="w-16 h-16 rounded-2xl bg-brand-yellow/30 text-brand-green mx-auto flex items-center justify-center mb-4 border border-brand-yellow/50">
            <MessagesSquare className="w-8 h-8 text-brand-green" />
          </div>

          <h2 className="text-xl font-extrabold text-brand-text mb-2">
            Context-Aware Agricultural Assistant
          </h2>

          <p className="text-sm text-brand-text-secondary max-w-lg mx-auto mb-6 leading-relaxed">
            A conversational partner for farmers that understands regional languages (English, Marathi, Hindi, Tamil, Telugu) and answers questions with full awareness of your farm profile, soil condition, crop health history, and weather.
          </p>

          {/* Assistant Input Box Demo */}
          <div className="max-w-xl mx-auto p-2 bg-white rounded-2xl border border-brand-border shadow-subtle flex items-center gap-2 mb-4">
            <input
              type="text"
              disabled
              placeholder="Ask your farming query in any language... (Assistant Phase)"
              className="flex-1 px-3 py-2 text-xs sm:text-sm bg-transparent outline-none text-brand-text placeholder:text-brand-text-secondary disabled:cursor-not-allowed"
            />
            <Button
              variant="outline"
              size="sm"
              disabled
              className="cursor-not-allowed opacity-60 p-2 h-auto"
            >
              <Mic className="w-4 h-4 text-brand-green" />
            </Button>
            <Button
              variant="primary"
              size="sm"
              disabled
              className="cursor-not-allowed opacity-60 p-2 h-auto"
            >
              <Send className="w-4 h-4 text-brand-text" />
            </Button>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-brand-bg border border-brand-border text-xs font-semibold text-brand-text-secondary">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span>Gemini conversational AI and multilingual NLP scheduled for AI Assistant phase</span>
          </div>
        </Card>

        {/* Demo Sample Regional Queries */}
        <div className="bg-brand-surface rounded-2xl border border-brand-border p-5 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-brand-text">Sample Supported Regional Questions</h3>
            <Badge variant="neutral" size="sm" className="text-[10px]">Multilingual</Badge>
          </div>

          <div className="space-y-2.5">
            {samplePrompts.map((p, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-brand-bg/60 border border-brand-border/60 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Badge variant="brand" size="sm" className="text-[10px]">{p.lang}</Badge>
                  <span className="font-semibold text-brand-text">&quot;{p.text}&quot;</span>
                </div>
                <span className="text-[11px] text-brand-green font-bold flex-shrink-0">Demo</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-brand-border bg-brand-surface flex items-start gap-3 shadow-subtle">
          <Languages className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
          <div className="text-xs text-brand-text-secondary leading-relaxed">
            <strong className="text-brand-text block mb-0.5">Not a Generic Chatbot:</strong>
            KisanMitra AI Assistant acts as a specialized agronomy decision-support agent rather than a generic chatbot clone, directly leveraging your farm data to provide actionable agricultural remedies.
          </div>
        </div>
      </div>
    </AppShell>
  );
}
