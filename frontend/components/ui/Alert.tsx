import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Info, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "danger";
  title?: string;
  icon?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
  className,
  variant = "info",
  title,
  icon,
  children,
  ...props
}) => {
  const iconMap = {
    info: <Info className="w-5 h-5 text-brand-green flex-shrink-0" />,
    success: <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-brand-warning flex-shrink-0" />,
    danger: <AlertCircle className="w-5 h-5 text-brand-danger flex-shrink-0" />,
  };

  const variantStyles = {
    info: "bg-brand-green/10 border-brand-green/30 text-brand-text",
    success: "bg-brand-green-50 border-brand-green/30 text-brand-text",
    warning: "bg-brand-warning-light border-brand-warning/30 text-brand-text",
    danger: "bg-brand-danger-light border-brand-danger/30 text-brand-text",
  };

  return (
    <div
      role="alert"
      className={twMerge(
        clsx(
          "flex gap-3 p-4 rounded-xl border text-sm md:text-base transition-all",
          variantStyles[variant],
          className
        )
      )}
      {...props}
    >
      <div className="mt-0.5">{icon || iconMap[variant]}</div>
      <div className="flex-1">
        {title && <h4 className="font-semibold text-brand-text mb-1">{title}</h4>}
        <div className="text-brand-text-secondary">{children}</div>
      </div>
    </div>
  );
};
