import React from "react";
import { Loader2, Sprout } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "@/lib/i18n";

export interface LoadingStateProps {
  message?: string;
  description?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message,
  description,
  className,
}) => {
  const { t } = useTranslation();

  const displayMessage = message || t("common.loading");
  const displayDescription = description;

  return (
    <div
      className={twMerge(
        clsx(
          "flex flex-col items-center justify-center py-12 px-6 text-center rounded-2xl bg-brand-surface border border-brand-border shadow-card",
          className
        )
      )}
    >
      <div className="relative mb-4">
        <div className="w-14 h-14 rounded-2xl bg-brand-yellow/30 flex items-center justify-center border border-brand-yellow/50">
          <Sprout className="w-7 h-7 text-brand-green animate-bounce" />
        </div>
        <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-sm">
          <Loader2 className="w-4 h-4 animate-spin text-brand-green" />
        </div>
      </div>
      <h4 className="text-base font-bold text-brand-text mb-1">{displayMessage}</h4>
      {displayDescription && (
        <p className="text-xs sm:text-sm text-brand-text-secondary max-w-sm leading-relaxed">
          {displayDescription}
        </p>
      )}
    </div>
  );
};
