import { createContext, PropsWithChildren, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { buildRateMap, convertPrice as convertPriceUtil, ExchangeRate, ExchangeRateMap, isCacheValid, loadCacheFromLocalStorage, saveCacheToLocalStorage } from '../services/exchange-rate.service';
import { useQuery } from '@apollo/client/react';
import { OperationVariables, TypedDocumentNode } from '@apollo/client';

// Mock data for testing (approximates real CZK rates as of Nov 2024)
const MOCK_EXCHANGE_RATES: ExchangeRate[] = [
  { fromCurrency: 'CZK', toCurrency: 'EUR', rate: 25.0 },
  { fromCurrency: 'CZK', toCurrency: 'USD', rate: 23.0 },
  { fromCurrency: 'CZK', toCurrency: 'PLN', rate: 5.5 },
  { fromCurrency: 'EUR', toCurrency: 'CZK', rate: 0.04 },
  { fromCurrency: 'EUR', toCurrency: 'USD', rate: 1.09 },
  { fromCurrency: 'EUR', toCurrency: 'PLN', rate: 4.35 },
  { fromCurrency: 'USD', toCurrency: 'CZK', rate: 0.043 },
  { fromCurrency: 'USD', toCurrency: 'EUR', rate: 0.92 },
  { fromCurrency: 'USD', toCurrency: 'PLN', rate: 4.0 },
  { fromCurrency: 'PLN', toCurrency: 'CZK', rate: 0.18 },
  { fromCurrency: 'PLN', toCurrency: 'EUR', rate: 0.23 },
  { fromCurrency: 'PLN', toCurrency: 'USD', rate: 0.25 },
];

// Enable mock mode via localStorage for testing
const USE_MOCK_RATES = typeof window !== 'undefined' && localStorage.getItem('USE_MOCK_EXCHANGE_RATES') === 'true';

interface ExchangeRatesQueryResult {
  exchangeRates: {
    rates: ExchangeRate[];
    validUntil: string;
  };
}

interface ExchangeRateContextType {
  rateMap: ExchangeRateMap | null;
  rates: ExchangeRate[] | null;
  validUntil: Date | null;
  loading: boolean;
  error: Error | null;
  convertPrice: (amount: number, from: string, to: string) => number | null;
  refetch: () => void;
}

const ExchangeRateContext = createContext<ExchangeRateContextType | undefined>(undefined);

type ExchangeRateProviderProps<T extends ExchangeRatesQueryResult, S> = {
  exchangeRatesQuery: TypedDocumentNode<T, S>;
  children: ReactNode;
}

export const ExchangeRateProvider =
  <T extends ExchangeRatesQueryResult, S>
  ({ children, exchangeRatesQuery }: PropsWithChildren<ExchangeRateProviderProps<T, S>>) => {
  // Load from localStorage synchronously during initialization
  const initialCache = (() => {
    if (USE_MOCK_RATES) {
      return {
        rates: MOCK_EXCHANGE_RATES,
        validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      };
    }

    const cached = loadCacheFromLocalStorage();
    if (cached && isCacheValid(cached.validUntil)) {
      return cached;
    }

    return null;
  })();

  const [rateMap, setRateMap] = useState<ExchangeRateMap | null>(
    initialCache ? buildRateMap(initialCache.rates) : null
  );
  const [rates, setRates] = useState<ExchangeRate[] | null>(
    initialCache ? initialCache.rates : null
  );
  const [validUntil, setValidUntil] = useState<Date | null>(
    initialCache ? initialCache.validUntil : null
  );
  const [error, setError] = useState<Error | null>(null);

  // Fetch from server
  const { data, loading, error: queryError, refetch: refetchQuery } = useQuery<ExchangeRatesQueryResult>(
    exchangeRatesQuery,
    {
      skip: USE_MOCK_RATES,
      fetchPolicy: rateMap ? 'cache-first' : 'network-only',
      pollInterval: 60 * 1000,
    }
  );

    // Handle data from query
  useEffect(() => {
    if (USE_MOCK_RATES || !data?.exchangeRates) {
      return;
    }
    const exchangeRates = data.exchangeRates.rates;
    const validUntilDate = new Date(data.exchangeRates.validUntil);

    setRates(exchangeRates);
    const newRateMap = buildRateMap(exchangeRates);
    setRateMap(newRateMap);
    setValidUntil(validUntilDate);
    setError(null);

    // Save to localStorage
    saveCacheToLocalStorage({
      rates: exchangeRates,
      validUntil: validUntilDate,
    });
  }, [data]);

    // Handle query errors
  useEffect(() => {
    if (!queryError) {
      return;
    }
    setError(queryError as Error);

    // If we have cached rates, keep using them
    if (!rateMap) {
      setError(new Error('Failed to load exchange rates'));
    }
  }, [queryError, rateMap]);

  // Convert price helper
  const convertPrice = useCallback(
    (amount: number, from: string, to: string): number | null => {
      if (!rateMap) {
        return null;
      }

      return convertPriceUtil(amount, from, to, rateMap);
    },
    [rateMap]
  );

  const refetch = useCallback(() => {
    refetchQuery();
  }, [refetchQuery]);

  return (
    <ExchangeRateContext.Provider
      value={{
        rateMap,
        rates,
        validUntil,
        loading: loading && !rateMap, // Only show loading if we don't have cached rates
        error,
        convertPrice,
        refetch,
      }}
    >
      {children}
    </ExchangeRateContext.Provider>
  );
};

export const useExchangeRates = () => {
  const context = useContext(ExchangeRateContext);
  if (context === undefined) {
    throw new Error('useExchangeRates must be used within an ExchangeRateProvider');
  }
  return context;
};
