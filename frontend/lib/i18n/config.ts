export type SupportedLanguage = "en" | "mr" | "hi" | "ta" | "te";

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  locale: string;
  shortLabel: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    locale: "en-IN",
    shortLabel: "EN",
  },
  {
    code: "mr",
    name: "Marathi",
    nativeName: "मराठी",
    locale: "mr-IN",
    shortLabel: "मराठी",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    locale: "hi-IN",
    shortLabel: "हिन्दी",
  },
  {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    locale: "ta-IN",
    shortLabel: "தமிழ்",
  },
  {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
    locale: "te-IN",
    shortLabel: "తెలుగు",
  },
];

export const DEFAULT_LANGUAGE: SupportedLanguage = "en";
export const LANGUAGE_STORAGE_KEY = "kisanmitra_language";
