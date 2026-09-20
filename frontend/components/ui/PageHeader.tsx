import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  badge,
  action,
  icon,
  className,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "mb-6 pb-4 border-b border-brand-border flex flex-col md:flex-row md:items-center md:justify-between gap-4",
          className
        )
      )}
    >
      <div className="flex items-start gap-3.5">
        {icon && (
          <div className="p-3 bg-brand-yellow/30 text-brand-text rounded-xl border border-brand-yellow/50 flex-shrink-0 shadow-sm mt-0.5">
            {icon}
          </div>
        )}
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-brand-text">
              {title}
            </h1>
            {badge}
          </div>
          {description && (
            <p className="mt-1.5 text-base text-brand-text-secondary max-w-3xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
      {action && <div className="flex items-center gap-2.5 flex-shrink-0">{action}</div>}
    </div>
  );
};
