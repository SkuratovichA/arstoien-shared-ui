import i18n, { type i18n as I18nInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

export interface I18nResources {
  [key: string]: {
    translation: Record<string, string>;
  };
}

/**
 * Factory function to initialize i18n with injected translation resources
 * This allows apps to provide their own translations without shared-ui having hardcoded files
 *
 * @param resources - Translation resources object, e.g., { en: { translation: {...} }, cs: { translation: {...} } }
 * @param defaultLanguage - Default language to use (defaults to 'en')
 * @returns Initialized i18n instance
 */
export function createI18n(resources: I18nResources, defaultLanguage: string = 'en'): I18nInstance {
  const i18nInstance = i18n.createInstance();

  i18nInstance.use(initReactI18next).init({
    resources,
    lng: defaultLanguage,
    fallbackLng: 'en',
    nsSeparator: false,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

  return i18nInstance;
}

// Export default i18n instance for backward compatibility
// Apps should call createI18n() and pass their own translations
export { i18n };
