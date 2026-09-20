import { en } from "./translations/en";
import { mr } from "./translations/mr";
import { hi } from "./translations/hi";
import { ta } from "./translations/ta";
import { te } from "./translations/te";

export interface ValidationReport {
  canonicalKeyCount: number;
  results: {
    language: string;
    keyCount: number;
    missingKeys: string[];
    extraKeys: string[];
    isValid: boolean;
  }[];
  allValid: boolean;
}

export function validateAllTranslations(): ValidationReport {
  const canonicalKeys = Object.keys(en);
  const dictionaries = [
    { lang: "mr", dict: mr },
    { lang: "hi", dict: hi },
    { lang: "ta", dict: ta },
    { lang: "te", dict: te },
  ];

  const results = dictionaries.map(({ lang, dict }) => {
    const currentKeys = Object.keys(dict);
    const missingKeys = canonicalKeys.filter((k) => dict[k] === undefined || dict[k].trim() === "");
    const extraKeys = currentKeys.filter((k) => en[k] === undefined);

    return {
      language: lang,
      keyCount: currentKeys.length,
      missingKeys,
      extraKeys,
      isValid: missingKeys.length === 0,
    };
  });

  const allValid = results.every((r) => r.isValid);

  return {
    canonicalKeyCount: canonicalKeys.length,
    results,
    allValid,
  };
}
