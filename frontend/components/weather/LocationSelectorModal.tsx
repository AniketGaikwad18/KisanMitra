"use client";

import React, { useState } from "react";
import { Search, MapPin, X, Loader2, Navigation, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { searchWeatherLocations } from "@/lib/api";
import { LocationSearchResult, WeatherLocation } from "@/types";

interface LocationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation?: WeatherLocation;
  onSelectLocation: (loc: { name: string; region?: string; country?: string; latitude: number; longitude: number }) => void;
}

const PRESET_LOCATIONS = [
  { name: "Pune", region: "Maharashtra", latitude: 18.5204, longitude: 73.8567 },
  { name: "Nashik", region: "Maharashtra", latitude: 19.9975, longitude: 73.7898 },
  { name: "Nagpur", region: "Maharashtra", latitude: 21.1458, longitude: 79.0882 },
  { name: "Kolhapur", region: "Maharashtra", latitude: 16.7050, longitude: 74.2433 },
  { name: "Chhatrapati Sambhajinagar", region: "Maharashtra", latitude: 19.8762, longitude: 75.3433 },
  { name: "Amravati", region: "Maharashtra", latitude: 20.9320, longitude: 77.7523 },
  { name: "Solapur", region: "Maharashtra", latitude: 17.6599, longitude: 75.9064 },
  { name: "Mumbai", region: "Maharashtra", latitude: 19.0760, longitude: 72.8777 },
];

export const LocationSelectorModal: React.FC<LocationSelectorModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<LocationSearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return;

    setIsSearching(true);
    setHasSearched(true);
    const res = await searchWeatherLocations(searchQuery.trim());
    setIsSearching(false);
    if (res.data) {
      setSearchResults(res.data);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelect = (loc: { name: string; region?: string; country?: string; latitude: number; longitude: number }) => {
    onSelectLocation(loc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-brand-surface rounded-2xl border border-brand-border shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        {/* Header */}
        <div className="p-5 border-b border-brand-border flex items-center justify-between bg-gradient-to-r from-brand-bg to-brand-surface">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center border border-brand-green/20">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 id="modal-headline" className="text-base font-extrabold text-brand-text">
                Select Farm Location
              </h3>
              <p className="text-xs text-brand-text-secondary">
                Search any city or select an agricultural region
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-brand-text-secondary hover:text-brand-text hover:bg-neutral-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-5 border-b border-brand-border">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-brand-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city (e.g. Pune, Nashik, Nagpur)..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-brand-border bg-white text-sm text-brand-text placeholder:text-brand-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
                autoFocus
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={isSearching || searchQuery.trim().length < 2}
              isLoading={isSearching}
            >
              Search
            </Button>
          </form>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Search Results */}
          {hasSearched && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary mb-2.5">
                Search Results ({searchResults.length})
              </h4>
              {isSearching ? (
                <div className="flex items-center justify-center py-6 gap-2 text-xs text-brand-text-secondary">
                  <Loader2 className="w-4 h-4 animate-spin text-brand-green" />
                  <span>Searching locations...</span>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-1.5">
                  {searchResults.map((result, idx) => {
                    const isSelected =
                      currentLocation &&
                      Math.abs(currentLocation.latitude - result.latitude) < 0.05 &&
                      Math.abs(currentLocation.longitude - result.longitude) < 0.05;

                    return (
                      <button
                        key={`${result.name}-${result.latitude}-${idx}`}
                        onClick={() => handleSelect(result)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-brand-green/10 border-brand-green text-brand-text font-bold"
                            : "bg-white border-brand-border hover:border-brand-green/40 hover:bg-neutral-50 text-brand-text"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Navigation className="w-4 h-4 text-brand-green flex-shrink-0" />
                          <div>
                            <span className="text-sm font-bold block">{result.name}</span>
                            <span className="text-xs text-brand-text-secondary">
                              {result.region ? `${result.region}, ` : ""}
                              {result.country} ({result.latitude.toFixed(2)}°, {result.longitude.toFixed(2)}°)
                            </span>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-brand-green flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-brand-text-secondary bg-neutral-50 rounded-xl border border-dashed border-brand-border">
                  No locations found for &ldquo;{searchQuery}&rdquo;. Try another spelling or select from common regions below.
                </div>
              )}
            </div>
          )}

          {/* Quick Presets */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary mb-2.5">
              Agricultural Regions & Presets
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_LOCATIONS.map((preset) => {
                const isSelected =
                  currentLocation &&
                  Math.abs(currentLocation.latitude - preset.latitude) < 0.05 &&
                  Math.abs(currentLocation.longitude - preset.longitude) < 0.05;

                return (
                  <button
                    key={preset.name}
                    onClick={() => handleSelect(preset)}
                    className={`p-3 text-left rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-brand-green/10 border-brand-green text-brand-green font-bold shadow-sm"
                        : "bg-white border-brand-border hover:border-brand-green/40 hover:bg-neutral-50 text-brand-text"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold block">{preset.name}</span>
                      <span className="text-[10px] text-brand-text-secondary">{preset.region}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-brand-green flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-brand-border bg-neutral-50 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
