import { SupportedLanguage } from "./config";

export type TranslationDictionary = Record<string, string>;

export interface I18nContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (
    key: string,
    paramsOrFallback?: Record<string, string | number> | string,
    fallback?: string
  ) => string;
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
  formatDate: (date: Date | string | number, options?: Intl.DateTimeFormatOptions) => string;
  isLoaded: boolean;
}
