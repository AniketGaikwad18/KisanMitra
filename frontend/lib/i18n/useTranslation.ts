"use client";

import { useContext } from "react";
import { I18nContext } from "./I18nProvider";
import { SUPPORTED_LANGUAGES, LanguageInfo } from "./config";

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }

  const currentLanguageInfo =
    SUPPORTED_LANGUAGES.find((l) => l.code === context.language) || SUPPORTED_LANGUAGES[0];

  return {
    ...context,
    currentLanguage: context.language,
    currentLanguageInfo,
    languages: SUPPORTED_LANGUAGES,
  };
};
