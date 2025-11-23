import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a price value with currency
 * @param price - The price to format (can be null/undefined)
 * @param currency - The currency code (defaults to 'CZK')
 * @param options - Additional Intl.NumberFormat options
 * @param locale - The locale to use for formatting (defaults to 'cs-CZ')
 * @returns Formatted price string, or empty string if price is null/undefined
 */
export function formatPrice(
  price: number | null | undefined,
  currency: string = 'CZK',
  options?: Intl.NumberFormatOptions,
  locale: string = 'cs-CZ'
): string {
  if (price === null || price === undefined) return '';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency || 'CZK',
    ...options,
  }).format(price);
}

/**
 * Map of locale codes to Intl locale identifiers
 */
export const LOCALE_MAP: Record<string, string> = {
  en: 'en-US',
  cs: 'cs-CZ',
  sk: 'sk-SK',
};
