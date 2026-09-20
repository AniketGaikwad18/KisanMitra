import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./Button";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message = "Please check your connection and try again.",
  onRetry,
  className,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "flex flex-col items-center justify-center py-12 px-6 text-center rounded-2xl bg-brand-surface border border-brand-danger/30 shadow-card",
          className
        )
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-brand-danger-light flex items-center justify-center text-brand-danger mb-4 border border-brand-danger/20">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h4 className="text-base font-bold text-brand-text mb-1">{title}</h4>
      <p className="text-xs sm:text-sm text-brand-text-secondary max-w-md mb-6 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-4 h-4 text-brand-green" />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};
