"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface CropSectionCardProps {
  title: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  children: React.ReactNode;
  className?: string;
}

export const CropSectionCard: React.FC<CropSectionCardProps> = ({
  title,
  icon: Icon,
  iconColor = "text-brand-green",
  iconBg = "bg-brand-green/10",
  children,
  className = "",
}) => {
  return (
    <div
      className={`bg-brand-surface rounded-2xl sm:rounded-3xl border border-brand-border p-5 sm:p-6 shadow-subtle hover:border-brand-green/40 transition-colors ${className}`}
    >
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-brand-border/60">
        <div className={`p-2.5 rounded-xl ${iconBg} ${iconColor} flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-brand-text">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
};
