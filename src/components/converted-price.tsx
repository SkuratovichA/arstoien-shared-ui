import { useExchangeRates } from '../context/exchange-rate-context';
import { useLocale } from '../context/locale-context';
import { formatPrice, LOCALE_MAP } from '../lib/utils';

interface ConvertedPriceProps {
  amount: number;
  fromCurrency: string;
  className?: string;
}

export function ConvertedPrice({ amount, fromCurrency, className = 'text-xs text-muted-foreground' }: ConvertedPriceProps) {
  const { locale, currency } = useLocale();
  const { convertPrice } = useExchangeRates();

  // Don't show conversion if currencies match
  if (fromCurrency === currency) {
    return null;
  }

  const converted = convertPrice(amount, fromCurrency, currency);

  if (converted === null) {
    return null;
  }

  return (
    <div className={className}>
      ≈ {formatPrice(converted, currency, {}, LOCALE_MAP[locale])}
    </div>
  );
}
