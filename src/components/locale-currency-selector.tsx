import { useTranslation } from 'react-i18next';
import { useLocale } from '../context/locale-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Globe } from 'lucide-react';

export function LocaleCurrencySelector() {
  const { t, i18n } = useTranslation();
  const { locale, currency, locales, currencies, localeNames, currencySymbols, updatePreferences } = useLocale();

  const handleLocaleChange = async (newLocale: string) => {
    await i18n.changeLanguage(newLocale);
    // Use updatePreferences to save to backend for authenticated users
    await updatePreferences(newLocale, currency);
  };

  const handleCurrencyChange = async (newCurrency: string) => {
    // Use updatePreferences to save to backend for authenticated users
    await updatePreferences(locale, newCurrency);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Globe className="h-5 w-5" />
          <span className="sr-only">{t('Language and Currency')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>{t('Language')}</DropdownMenuLabel>
        {locales.map((localeOption) => (
          <DropdownMenuItem
            key={localeOption}
            onClick={() => handleLocaleChange(localeOption)}
            className={locale === localeOption ? 'bg-accent' : ''}
          >
            <span className="flex items-center justify-between w-full">
              {localeNames[localeOption]}
              {locale === localeOption && <span className="text-primary">✓</span>}
            </span>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuLabel>{t('Currency')}</DropdownMenuLabel>
        {currencies.map((currencyOption) => (
          <DropdownMenuItem
            key={currencyOption}
            onClick={() => handleCurrencyChange(currencyOption)}
            className={currency === currencyOption ? 'bg-accent' : ''}
          >
            <span className="flex items-center justify-between w-full">
              {currencyOption} ({currencySymbols[currencyOption]})
              {currency === currencyOption && <span className="text-primary">✓</span>}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
