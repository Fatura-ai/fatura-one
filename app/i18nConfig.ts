export type LangCode = "en" | "sv" | "ar" | "fr" | "de" | "es";

export type LangConfig = {
  code: LangCode;
  label: string;
  enabled: boolean;
};

/**
 * Central language configuration.
 *
 * - SUPPORTED_LANGS lists all potential languages.
 * - enabled === true means "active in UI right now".
 * - For now only English and Swedish are enabled.
 * - Arabic, French, German, Spanish are defined but disabled (future use).
 */
export const SUPPORTED_LANGS: LangConfig[] = [
  { code: "en", label: "English",  enabled: true },
  { code: "sv", label: "Svenska",  enabled: true },
  { code: "ar", label: "العربية", enabled: false },
  { code: "fr", label: "Français", enabled: false },
  { code: "de", label: "Deutsch",  enabled: false },
  { code: "es", label: "Español",  enabled: false },
];

export const DEFAULT_LANG: LangCode = "en";

/**
 * Convenience list of currently enabled languages.
 * This is what LangSelector should render for users.
 */
export const ENABLED_LANGS: LangConfig[] = SUPPORTED_LANGS.filter(
  (l) => l.enabled
);