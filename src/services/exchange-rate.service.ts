/**
 * Exchange Rate Service
 * Handles currency conversion with caching for optimal performance
 */

export interface ExchangeRate {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
}

export interface ExchangeRatesData {
  rates: ExchangeRate[];
  validUntil: Date;
}

export interface ExchangeRateMap {
  [fromCurrency: string]: {
    [toCurrency: string]: number;
  };
}

const CACHE_KEY = 'exchange_rates_cache';
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Convert flat rate array to nested map for O(1) lookup
 */
export function buildRateMap(rates: ExchangeRate[]): ExchangeRateMap {
  const map: ExchangeRateMap = {};

  for (const rate of rates) {
    if (!map[rate.fromCurrency]) {
      map[rate.fromCurrency] = {};
    }
    map[rate.fromCurrency][rate.toCurrency] = rate.rate;
  }

  return map;
}

/**
 * Convert price from one currency to another
 */
export function convertPrice(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rateMap: ExchangeRateMap
): number | null {
  // Same currency, no conversion needed
  if (fromCurrency === toCurrency) {
    return amount;
  }

  // Look up rate
  const rate = rateMap[fromCurrency]?.[toCurrency];
  if (!rate) {
    console.warn(`[ExchangeRateService] No rate found for ${fromCurrency} -> ${toCurrency}`);
    return null;
  }

  // Convert: divide by rate (rate is how many CZK = 1 EUR, so to convert EUR to CZK, multiply)
  // Actually the rate from backend is already the correct rate for division
  return amount / rate;
}

/**
 * Save rates to localStorage for offline fallback
 */
export function saveCacheToLocalStorage(data: ExchangeRatesData): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      rates: data.rates,
      validUntil: data.validUntil.toISOString(),
    }));
  } catch (error) {
    console.warn('[ExchangeRateService] Failed to save cache to localStorage:', error);
  }
}

/**
 * Load rates from localStorage
 */
export function loadCacheFromLocalStorage(): ExchangeRatesData | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const parsed = JSON.parse(cached);
    const validUntil = new Date(parsed.validUntil);

    // Check if cache is expired
    if (validUntil < new Date()) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return {
      rates: parsed.rates,
      validUntil,
    };
  } catch (error) {
    console.warn('[ExchangeRateService] Failed to load cache from localStorage:', error);
    return null;
  }
}

/**
 * Check if cached rates are still valid
 */
export function isCacheValid(validUntil: Date): boolean {
  return validUntil > new Date();
}

/**
 * Calculate when cache should be refreshed (with some buffer before expiry)
 */
export function getCacheRefreshTime(validUntil: Date): Date {
  // Refresh 30 seconds before expiry
  return new Date(validUntil.getTime() - 30 * 1000);
}
