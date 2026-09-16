import { defaultLocale, isLocale, type Locale } from "./config";
import { en, type Dictionary } from "./en";
import { hi } from "./hi";

const dictionaries: Record<Locale, Dictionary> = { en, hi };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function resolveLocale(value: string | undefined): Locale {
  return value && isLocale(value) ? value : defaultLocale;
}

/** Prefixes an app path with the active locale, e.g. "/shop" -> "/hi/shop". */
export function localePath(locale: Locale, path: string) {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function format(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(values[key] ?? `{${key}}`),
  );
}

export type { Dictionary, Locale };
