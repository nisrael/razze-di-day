import { LOCALE_MAP } from "../consts";

export function getNextDIDayDate(referenceDate: Date = new Date()): Date {
    const nextMonth = new Date(
        referenceDate.getFullYear(),
        referenceDate.getMonth() + 1,
        1,
    );

    const firstDay = nextMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const daysUntilSunday = firstDay === 0 ? 0 : 7 - firstDay;
    nextMonth.setDate(nextMonth.getDate() + daysUntilSunday);

    return nextMonth;
}

export function formatDIDayDate(date: Date, lang: string = "de"): string {
    getNextDIDayDate;
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
    };

    return date.toLocaleDateString(LOCALE_MAP[lang] || LOCALE_MAP.de, options);
}

export function getNextDIDayInfo(lang: string = "de", referenceDate?: Date) {
    const date = getNextDIDayDate(referenceDate);
    const formatted = formatDIDayDate(date, lang);
    return { date, formatted };
}
