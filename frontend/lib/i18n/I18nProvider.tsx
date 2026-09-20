"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import {
  SupportedLanguage,
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
} from "./config";
import { I18nContextType, TranslationDictionary } from "./types";
import { en } from "./translations/en";
import { mr } from "./translations/mr";
import { hi } from "./translations/hi";
import { ta } from "./translations/ta";
import { te } from "./translations/te";

const TRANSLATION_MAP: Record<SupportedLanguage, TranslationDictionary> = {
  en,
  mr,
  hi,
  ta,
  te,
};

const LOCALE_MAP: Record<SupportedLanguage, string> = {
  en: "en-IN",
  mr: "mr-IN",
  hi: "hi-IN",
  ta: "ta-IN",
  te: "te-IN",
};

export const I18nContext = createContext<I18nContextType>({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  t: (key: string, paramsOrFallback?: Record<string, string | number> | string, fallback?: string) => {
    let text = en[key] || (typeof paramsOrFallback === "string" ? paramsOrFallback : fallback) || key;
    if (typeof paramsOrFallback === "object" && paramsOrFallback !== null) {
      Object.entries(paramsOrFallback).forEach(([k, v]) => {
        text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
      });
    }
    return text;
  },
  formatNumber: (value: number) => String(value),
  formatDate: (date: Date | string | number) => String(date),
  isLoaded: false,
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Initialize from localStorage safely on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY) as SupportedLanguage | null;
      if (savedLang && SUPPORTED_LANGUAGES.some((l) => l.code === savedLang)) {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang;
      } else {
        document.documentElement.lang = DEFAULT_LANGUAGE;
      }
    } catch {
      // Storage access blocked or unavailable
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const setLanguage = useCallback((newLang: SupportedLanguage) => {
    if (!SUPPORTED_LANGUAGES.some((l) => l.code === newLang)) return;
    setLanguageState(newLang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    } catch {
      // Storage write error
    }
  }, []);

  // Translation lookup with fallback and interpolation
  const t = useCallback(
    (
      key: string,
      paramsOrFallback?: Record<string, string | number> | string,
      fallback?: string
    ): string => {
      let params: Record<string, string | number> | undefined;
      let defaultFallback: string | undefined;

      if (typeof paramsOrFallback === "string") {
        defaultFallback = paramsOrFallback;
      } else if (typeof paramsOrFallback === "object" && paramsOrFallback !== null) {
        params = paramsOrFallback;
        defaultFallback = fallback;
      }

      const dict = TRANSLATION_MAP[language] || en;
      let rawText = "";

      if (dict && dict[key] !== undefined && dict[key].trim() !== "") {
        rawText = dict[key];
      } else if (en[key] !== undefined && en[key].trim() !== "") {
        // Fallback to canonical English
        rawText = en[key];
      } else {
        rawText = defaultFallback !== undefined ? defaultFallback : key;
      }

      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          rawText = rawText.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
        });
      }

      return rawText;
    },
    [language]
  );

  // Locale-aware number formatting
  const formatNumber = useCallback(
    (value: number, options?: Intl.NumberFormatOptions): string => {
      try {
        const locale = LOCALE_MAP[language] || "en-IN";
        return new Intl.NumberFormat(locale, options).format(value);
      } catch {
        return String(value);
      }
    },
    [language]
  );

  // Locale-aware date formatting
  const formatDate = useCallback(
    (date: Date | string | number, options?: Intl.DateTimeFormatOptions): string => {
      try {
        const d = date instanceof Date ? date : new Date(date);
        if (isNaN(d.getTime())) return String(date);
        const locale = LOCALE_MAP[language] || "en-IN";
        return new Intl.DateTimeFormat(locale, options).format(d);
      } catch {
        return String(date);
      }
    },
    [language]
  );

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      formatNumber,
      formatDate,
      isLoaded,
    }),
    [language, setLanguage, t, formatNumber, formatDate, isLoaded]
  );

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
};
