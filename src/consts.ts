export const DEFAULT_LOCALE = "de";
export const LOCALES = ["de", "en"] as const;
export type LANG = (typeof LOCALES)[number];

export const LOCALE_MAP: { [key: string]: string } = {
  de: "de-DE",
  en: "en-US",
};

export const LOCALE_NAMES: { [key: string]: string } = {
  de: "Deutsch",
  en: "English",
};
