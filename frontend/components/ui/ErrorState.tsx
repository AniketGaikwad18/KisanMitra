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
  message = "We could not load the requested information. Please check your connection and try again.",
  onRetry,
  className,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "flex flex-col items-center justify-center py-12 px-4 text-center rounded-xl bg-brand-surface border border-brand-danger/20",
          className
        )
      )}
    >
      <div className="p-3.5 bg-brand-danger-light text-brand-danger rounded-full mb-3.5">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h4 className="text-lg font-semibold text-brand-text mb-1">{title}</h4>
      <p className="text-sm text-brand-text-secondary max-w-md mb-5 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};
