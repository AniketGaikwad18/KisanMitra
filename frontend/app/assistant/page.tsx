"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BotMessageSquare, MessagesSquare, Languages, Sparkles } from "lucide-react";

export default function AssistantPage() {
  return (
    <AppShell>
      <PageHeader
        title="AI Farmer Assistant"
        description="Ask questions about your farm in natural language."
        icon={<BotMessageSquare className="w-6 h-6 text-brand-green" />}
        badge={<Badge variant="brand">Multilingual AI</Badge>}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-8 text-center border-dashed border-2 border-brand-border">
          <div className="w-16 h-16 rounded-2xl bg-brand-yellow/30 text-brand-green mx-auto flex items-center justify-center mb-4">
            <MessagesSquare className="w-8 h-8 text-brand-green" />
          </div>

          <h3 className="text-xl font-bold text-brand-text mb-2">
            Context-Aware Agricultural Assistant
          </h3>

          <p className="text-sm text-brand-text-secondary max-w-lg mx-auto mb-6 leading-relaxed">
            A conversational partner for farmers that understands regional languages (English, Marathi, Hindi, Tamil, Telugu) and answers questions with full awareness of your farm profile, soil condition, crop health history, and weather.
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-bg border border-brand-border text-xs font-semibold text-brand-text-secondary">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span>Scheduled for implementation in AI Assistant Phase</span>
          </div>
        </Card>

        <div className="p-4 rounded-xl border border-brand-border bg-brand-surface flex items-start gap-3">
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
