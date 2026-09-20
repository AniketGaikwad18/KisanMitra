"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Landmark, ShieldAlert, Sparkles, RefreshCw } from "lucide-react";
import { getSchemes, getSchemeFilters, getSchemeById } from "@/lib/api";
import { SchemeSummary, SchemeDetail } from "@/types";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { SchemeCard } from "@/components/schemes/SchemeCard";
import { SchemeDetailModal } from "@/components/schemes/SchemeDetailModal";
import { SchemeFilterBar } from "@/components/schemes/SchemeFilterBar";

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<SchemeSummary[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableStates, setAvailableStates] = useState<string[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");

  const [selectedScheme, setSelectedScheme] = useState<SchemeDetail | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load filter options on mount
  useEffect(() => {
    getSchemeFilters().then((res) => {
      if (res.data) {
        setAvailableCategories(res.data.categories || []);
        setAvailableStates(res.data.states || []);
      }
    });
  }, []);

  // Fetch schemes from API
  const fetchSchemes = useCallback(
    async (category: string, state: string, search: string) => {
      setIsLoading(true);
      setError(null);

      const res = await getSchemes({
        category: category || undefined,
        state: state || undefined,
        search: search || undefined,
      });

      setIsLoading(false);

      if (res.data) {
        setSchemes(res.data.schemes || []);
        setTotalCount(res.data.total || 0);
      } else {
        setError(
          res.error ||
            "Government information is temporarily unavailable. Please check your connection and try again."
        );
      }
    },
    []
  );

  // Debounce search / fetch on filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSchemes(selectedCategory, selectedState, searchQuery);
    }, 200);

    return () => clearTimeout(timer);
  }, [fetchSchemes, selectedCategory, selectedState, searchQuery]);

  const handleSelectScheme = async (summary: SchemeSummary) => {
    setIsLoadingDetail(true);
    setIsDetailModalOpen(true);
    const res = await getSchemeById(summary.id);
    setIsLoadingDetail(false);

    if (res.data) {
      setSelectedScheme(res.data);
    } else {
      // Fallback to basic summary if detail API fails
      setSelectedScheme({
        ...summary,
        eligibility: [],
        benefits: [],
        documents: [],
        application_method: "Please refer to the official government portal for application procedures.",
        last_verified: "Recently Verified",
      });
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedState("");
  };

  return (
    <AppShell>
      {/* Page Header */}
      <PageHeader
        title="Government Schemes"
        description="Find agricultural support available through official government programs."
        badge={
          <Badge variant="success" className="flex items-center gap-1">
            <Landmark className="w-3.5 h-3.5" />
            Verified Government Portals
          </Badge>
        }
      />

      {/* Trust Notice & Safety Advisory */}
      <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          <strong className="font-bold">Trust Advisory:</strong> Scheme information can change. Always verify eligibility and application details on the official government website before applying. All schemes listed below link directly to official Central and State Government departments.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <SchemeFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedState={selectedState}
        onStateChange={setSelectedState}
        availableCategories={availableCategories}
        availableStates={availableStates}
        totalSchemes={totalCount}
        filteredCount={schemes.length}
        onReset={handleResetFilters}
      />

      {/* Content Area */}
      {isLoading ? (
        <LoadingState message="Loading official government schemes..." />
      ) : error ? (
        <ErrorState
          title="Information Unavailable"
          message={error}
          onRetry={() => fetchSchemes(selectedCategory, selectedState, searchQuery)}
        />
      ) : schemes.length === 0 ? (
        <EmptyState
          title="No Schemes Found"
          description={
            searchQuery || selectedCategory || selectedState
              ? "No government schemes matched your search or filters. Try adjusting your query or reset the filters."
              : "No schemes currently available in the database."
          }
          actionLabel="Reset All Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {schemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              onSelect={handleSelectScheme}
            />
          ))}
        </div>
      )}

      {/* Scheme Detail Modal */}
      <SchemeDetailModal
        scheme={selectedScheme}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </AppShell>
  );
}
