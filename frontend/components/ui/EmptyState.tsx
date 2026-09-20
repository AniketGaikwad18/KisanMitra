import React from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "./Button";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No crop analysis yet",
  description = "Upload a crop image to get started.",
  icon,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "flex flex-col items-center justify-center py-12 px-6 text-center rounded-2xl bg-brand-surface border-2 border-dashed border-brand-border/90 shadow-card",
          className
        )
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-brand-yellow/25 text-brand-green flex items-center justify-center mb-4 border border-brand-yellow/40">
        {icon || <UploadCloud className="w-7 h-7 text-brand-green" />}
      </div>
      <h4 className="text-base font-bold text-brand-text mb-1">{title}</h4>
      <p className="text-xs sm:text-sm text-brand-text-secondary max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
