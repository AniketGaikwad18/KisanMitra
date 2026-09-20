"use client";

import React from "react";
import { Sprout } from "lucide-react";
import { CropSummary } from "@/types";
import { useTranslation } from "@/lib/i18n";

interface CropSelectorProps {
  crops: CropSummary[];
  selectedCropId: string;
  onSelectCrop: (cropId: string) => void;
}

const CROP_EMOJIS: Record<string, string> = {
  soybean: "🌱",
  wheat: "🌾",
  rice: "🍚",
  cotton: "🧶",
  maize: "🌽",
  sugarcane: "🎋",
  tomato: "🍅",
  onion: "🧅",
};

export const CropSelector: React.FC<CropSelectorProps> = ({
  crops,
  selectedCropId,
  onSelectCrop,
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-brand-surface rounded-2xl border border-brand-border p-3 sm:p-4 shadow-subtle mb-6">
      <div className="flex items-center gap-2 mb-2.5 px-1">
        <Sprout className="w-4 h-4 text-brand-green" />
        <span className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary">
          {t("cropGuide.selectCrop")}
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {crops.map((crop) => {
          const isSelected = selectedCropId.toLowerCase() === crop.id.toLowerCase();
          const emoji = CROP_EMOJIS[crop.id.toLowerCase()] || "🌿";

          return (
            <button
              key={crop.id}
              type="button"
              onClick={() => onSelectCrop(crop.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-150 flex-shrink-0 ${
                isSelected
                  ? "bg-brand-green text-white shadow-md scale-[1.02]"
                  : "bg-brand-bg text-brand-text hover:bg-brand-border/60 hover:text-brand-green-dark border border-brand-border/80"
              }`}
            >
              <span className="text-lg leading-none" role="img" aria-label={crop.name}>
                {emoji}
              </span>
              <span>{crop.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
