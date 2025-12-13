export * from './components/ui/alert';
export * from './components/ui/alert-dialog';
export * from './components/ui/avatar';
export * from './components/ui/badge';
export * from './components/ui/button';
export * from './components/ui/card';
export * from './components/ui/checkbox';
export * from './components/ui/dialog';
export * from './components/ui/dropdown-menu';
export * from './components/ui/form';
export * from './components/ui/input';
export * from './components/ui/password-input';
export * from './components/ui/label';
export * from './components/ui/popover';
export * from './components/ui/progress';
export * from './components/ui/radio-group';
export * from './components/ui/scroll-area';
export * from './components/ui/select';
export * from './components/ui/separator';
export * from './components/ui/skeleton';
export * from './components/ui/switch';
export * from './components/ui/table';
export * from './components/ui/tabs';
export * from './components/ui/textarea';
export * from './components/ui/toast';
export * from './components/ui/toaster';
export * from './components/ui/use-toast';

export * from './components/ui/typography';

export { cn, formatPrice, LOCALE_MAP } from './lib/utils';
// NOTE: apolloClient is not exported in the published package
// Each app should create its own apollo client instance
// export { apolloClient } from './lib/apollo-client';
export { createI18n, i18n } from './lib/i18n';
export type { I18nResources } from './lib/i18n';
export { env } from './lib/env';
export type { Env } from './lib/env';

export { createAuthProvider, AuthContext, useAuth } from './context/auth-context';
export type { AuthContextType, AuthDocuments, AuthUser, AuthResponse, CurrentUserResponse } from './context/auth-context';
export { CurrentUserProvider, useUser } from './context/user-context';
export { LocaleProvider, useLocale } from './context/locale-context';
export { ExchangeRateProvider, useExchangeRates } from './context/exchange-rate-context';
export type { ExchangeRate, ExchangeRatesData, ExchangeRateMap } from './services/exchange-rate.service';

export { useDebounce } from './hooks/use-debounce';

export { MobileBottomNav } from './components/mobile-bottom-nav';
export type { MobileBottomNavProps, MobileBottomNavItem } from './components/mobile-bottom-nav';
export { MobileNotificationsSheet } from './components/mobile-notifications-sheet';
export type { MobileNotificationsSheetProps } from './components/mobile-notifications-sheet';
export { LocaleCurrencySelector } from './components/locale-currency-selector';
export { ConvertedPrice } from './components/converted-price';
export { PaginationControls } from './components/pagination-controls';
export { ImageGallery } from './components/image-gallery';
export { FeatureCards } from './components/feature-cards';
export type { Feature } from './components/feature-cards';

// Note: Each app (client, admin-client) should import './styles/globals.css' in their own main.tsx
// to avoid HMR infinite loop issues
export * from "./components/ui/sheet";
export * from './components/ui/slider';
