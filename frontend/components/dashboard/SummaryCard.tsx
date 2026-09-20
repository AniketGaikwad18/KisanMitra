import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowUpRight } from "lucide-react";

export interface SummaryCardProps {
  title: string;
  icon: React.ReactNode;
  primaryValue: string;
  secondaryValue: string;
  supportingText?: string;
  href: string;
  badgeText?: string;
  badgeVariant?: "brand" | "success" | "warning" | "danger" | "neutral";
  isDemoData?: boolean;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  icon,
  primaryValue,
  secondaryValue,
  supportingText,
  href,
  badgeText,
  badgeVariant = "neutral",
  isDemoData = false,
}) => {
  return (
    <Link href={href} className="block group">
      <Card hoverable className="h-full flex flex-col justify-between relative overflow-hidden">
        <div>
          <CardHeader className="mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-brand-yellow/20 text-brand-green border border-brand-yellow/40 group-hover:bg-brand-yellow transition-colors">
                {icon}
              </div>
              <div>
                <CardTitle className="text-base font-bold">{title}</CardTitle>
                {isDemoData && (
                  <Badge variant="warning" size="sm" className="mt-0.5 text-[10px]">
                    Demo Data
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {badgeText && !isDemoData && (
                <Badge variant={badgeVariant} size="sm">
                  {badgeText}
                </Badge>
              )}
              <div className="p-1 rounded-lg text-brand-text-secondary group-hover:text-brand-green group-hover:bg-brand-bg transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="mt-2">
            <div className="text-2xl md:text-3xl font-extrabold text-brand-text tracking-tight">
              {primaryValue}
            </div>
            <div className="text-sm font-semibold text-brand-green mt-1">
              {secondaryValue}
            </div>
            {supportingText && (
              <p className="text-xs text-brand-text-secondary mt-2 border-t border-brand-border/60 pt-2">
                {supportingText}
              </p>
            )}
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};
