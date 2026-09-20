import React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "./Button";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "flex flex-col items-center justify-center py-12 px-4 text-center rounded-xl bg-brand-surface border border-dashed border-brand-border",
          className
        )
      )}
    >
      <div className="p-4 bg-brand-yellow/20 text-brand-green rounded-2xl mb-4">
        {icon || <Sparkles className="w-8 h-8 text-brand-green" />}
      </div>
      <h4 className="text-lg font-semibold text-brand-text mb-1">{title}</h4>
      <p className="text-sm text-brand-text-secondary max-w-sm mb-5 leading-relaxed">
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
