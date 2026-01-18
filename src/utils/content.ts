import { getEntry } from "astro:content";
import { DEFAULT_LOCALE, LOCALES } from "../consts";

/**
 * Attempts to fetch a content entry for the current language.
 * If not found, attempts to fetch the entry for the default locale.
 *
 * @param collection The name of the content collection
 * @param id The content entry ID (e.g., "en/motivation" or "en")
 * @returns An object containing the entry (if found) and a boolean indicating if it's a fallback
 */
export async function getLocalizedContent(
    collection: any,
    id: string
) {
    const parts = id.split("/");
    const originalLang = parts[0];

    let entry = await getEntry(collection, id);
    let isFallback = false;

    const isKnownLocale = (LOCALES as readonly string[]).includes(originalLang);

    if (!entry && originalLang !== DEFAULT_LOCALE && isKnownLocale) {
        // Replace the language prefix (e.g., "en/" or just "en") with the default locale
        const fallbackId = id.replace(new RegExp(`^${originalLang}(\\/|$)`), `${DEFAULT_LOCALE}$1`);

        entry = await getEntry(collection, fallbackId);
        if (entry) {
            isFallback = true;
        }
    }

    return { entry, isFallback };
}