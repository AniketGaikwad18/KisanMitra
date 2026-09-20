import React from "react";
import { Loader2 } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface LoadingStateProps {
  message?: string;
  description?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading information...",
  description,
  className,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "flex flex-col items-center justify-center py-12 px-4 text-center rounded-xl bg-brand-surface border border-brand-border/60",
          className
        )
      )}
    >
      <div className="p-3.5 bg-brand-yellow/30 text-brand-text rounded-full mb-3.5 animate-pulse">
        <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
      </div>
      <h4 className="text-lg font-semibold text-brand-text mb-1">{message}</h4>
      {description && (
        <p className="text-sm text-brand-text-secondary max-w-sm">{description}</p>
      )}
    </div>
  );
};
