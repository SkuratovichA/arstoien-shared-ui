import { useTranslation } from 'react-i18next';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';

export interface MobileNotificationsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNotificationsSheet({ open, onOpenChange }: MobileNotificationsSheetProps) {
  const { t } = useTranslation();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[60vh]">
        <SheetHeader>
          <SheetTitle>{t('Notifications')}</SheetTitle>
          <SheetDescription>{t('Your recent notifications')}</SheetDescription>
        </SheetHeader>
        <div className="mt-6 p-4 text-sm text-muted-foreground text-center">
          {t('No new notifications')}
        </div>
      </SheetContent>
    </Sheet>
  );
}
