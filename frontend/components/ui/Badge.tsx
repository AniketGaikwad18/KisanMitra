import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "brand" | "success" | "warning" | "danger" | "neutral" | "outline";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "neutral",
  size = "md",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center font-medium rounded-full tracking-wide";

  const sizeStyles = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-xs md:text-sm px-2.5 py-1 gap-1.5",
  };

  const variantStyles = {
    brand: "bg-brand-yellow/30 text-[#846609] border border-[#E8C238]/60 font-semibold",
    success: "bg-brand-green/15 text-brand-green border border-brand-green/30 font-medium",
    warning: "bg-brand-warning/15 text-brand-warning border border-brand-warning/30 font-medium",
    danger: "bg-brand-danger/15 text-brand-danger border border-brand-danger/30 font-medium",
    neutral: "bg-neutral-100 text-brand-text-secondary border border-brand-border font-medium",
    outline: "bg-transparent text-brand-text border border-brand-border font-medium",
  };

  return (
    <span
      className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}
      {...props}
    >
      {children}
    </span>
  );
};
