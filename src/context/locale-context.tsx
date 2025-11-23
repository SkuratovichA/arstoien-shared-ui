import { createContext, use, useState, useEffect, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from './auth-context';

interface LocaleContextType<TLocale extends string, TCurrency extends string> {
  locale: TLocale;
  currency: TCurrency;
  locales: readonly TLocale[];
  currencies: readonly TCurrency[];
  localeNames: Record<TLocale, string>;
  currencySymbols: Record<TCurrency, string>;
  setLocale: (locale: TLocale) => void;
  setCurrency: (currency: TCurrency) => void;
  updatePreferences: (locale: TLocale, currency: TCurrency) => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LocaleContext = createContext<LocaleContextType<any, any> | undefined>(undefined);

interface LocaleProviderProps<TLocale extends string, TCurrency extends string> {
  locales: readonly TLocale[];
  currencies: readonly TCurrency[];
  localeNames: Record<TLocale, string>;
  currencySymbols: Record<TCurrency, string>;
  defaultLocale: TLocale;
  defaultCurrency: TCurrency;
  updateUserPreferences?: (locale: TLocale, currency: TCurrency) => Promise<void>;
}

export const LocaleProvider = <TLocale extends string, TCurrency extends string>({
  children,
  locales,
  currencies,
  localeNames,
  currencySymbols,
  defaultLocale,
  defaultCurrency,
  updateUserPreferences,
}: PropsWithChildren<LocaleProviderProps<TLocale, TCurrency>>) => {
  const { user } = useAuth();
  const { i18n } = useTranslation();

  // Initialize from user preferences, localStorage, or browser
  const getInitialLocale = (): TLocale => {
    if (user?.preferredLocale) {
      return user.preferredLocale as TLocale;
    }
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('preferredLocale');
      if (stored) {
        return stored as TLocale;
      }
      // Detect from browser
      const browserLang = navigator.language.split('-')[0];
      return browserLang as TLocale;
    }
    return defaultLocale;
  };

  const getInitialCurrency = (): TCurrency => {
    if (user?.preferredCurrency) {
      return user.preferredCurrency as TCurrency;
    }
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('preferredCurrency');
      if (stored) {
        return stored as TCurrency;
      }
    }
    return defaultCurrency;
  };

  const [locale, setLocaleState] = useState<TLocale>(getInitialLocale);
  const [currency, setCurrencyState] = useState<TCurrency>(getInitialCurrency);

  // Update locale
  const setLocale = (newLocale: TLocale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLocale', newLocale);
    }
  };

  // Update currency
  const setCurrency = (newCurrency: TCurrency) => {
    setCurrencyState(newCurrency);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredCurrency', newCurrency);
    }
  };

  // Update both preferences and sync with server if authenticated
  const updatePreferences = async (newLocale: TLocale, newCurrency: TCurrency) => {
    setLocale(newLocale);
    setCurrency(newCurrency);

    if (user && updateUserPreferences) {
      try {
        await updateUserPreferences(newLocale, newCurrency);
      } catch (error) {
        console.error('Failed to update user preferences on server:', error);
      }
    }
  };

  // Sync i18n when locale changes
  useEffect(() => {
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  // Sync with user preferences when user changes
  useEffect(() => {
    if (user?.preferredLocale) {
      setLocaleState(user.preferredLocale as TLocale);
    }
    if (user?.preferredCurrency) {
      setCurrencyState(user.preferredCurrency as TCurrency);
    }
  }, [user?.preferredLocale, user?.preferredCurrency]);

  return (
    <LocaleContext.Provider value={{
      locale,
      currency,
      locales,
      currencies,
      localeNames,
      currencySymbols,
      setLocale,
      setCurrency,
      updatePreferences
    }}>
      {children}
    </LocaleContext.Provider>
  );
};

/**
 * Hook to access locale and currency preferences
 */
export const useLocale = <TLocale extends string, TCurrency extends string>() => {
  const context = use(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context as LocaleContextType<TLocale, TCurrency>;
};
