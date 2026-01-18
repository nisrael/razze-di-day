import { DEFAULT_LOCALE } from "../consts";
import type { LANG } from "../consts";

const translations = import.meta.glob<{ default: Record<string, any> }>(
  "../i18n/*.json",
  { eager: true },
);

const ui = new Map<string, any>();
for (const [path, module] of Object.entries(translations)) {
  const lang = path.match(/\/([^/]+)\.json$/)?.[1];
  if (lang) {
    ui.set(lang, module.default);
  }
}

export function useTranslations(lang: LANG | string): any {
  return ui.get(lang) || ui.get(DEFAULT_LOCALE) || {};
}
