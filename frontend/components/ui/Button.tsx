import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none rounded-lg";

    const variantStyles = {
      primary:
        "bg-brand-yellow text-brand-text hover:bg-brand-yellow-500 active:bg-brand-yellow-600 font-semibold shadow-sm border border-[#E2BF42]",
      secondary:
        "bg-brand-green text-white hover:bg-brand-green-600 active:bg-brand-green-700 font-semibold shadow-sm",
      outline:
        "border border-brand-border bg-brand-surface text-brand-text hover:bg-brand-bg hover:border-brand-green active:bg-neutral-100",
      ghost:
        "text-brand-text hover:bg-brand-bg hover:text-brand-green active:bg-neutral-200",
      danger:
        "bg-brand-danger text-white hover:bg-red-700 active:bg-red-800 shadow-sm",
    };

    const sizeStyles = {
      sm: "text-sm px-3 py-1.5 gap-1.5",
      md: "text-base px-4 py-2.5 gap-2",
      lg: "text-lg px-6 py-3.5 gap-2.5 font-semibold",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(
          clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
