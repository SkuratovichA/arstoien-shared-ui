import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { Badge } from './ui/badge';

export interface MobileBottomNavItem {
  icon: LucideIcon;
  label: string;
  to?: string;
  onClick?: () => void;
  badge?: number | string;
  LinkComponent?: React.ComponentType<{ to: string; className: string; children: ReactNode }>;
}

export interface MobileBottomNavProps {
  items: MobileBottomNavItem[];
}

export function MobileBottomNav({ items }: MobileBottomNavProps) {
  // Map number of items to Tailwind grid-cols class
  // Tailwind requires full class names at build time, so we can't use dynamic strings
  const gridColsMap: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8',
  };

  const gridCols = gridColsMap[items.length] || 'grid-cols-5';

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-card">
      <div className={`grid ${gridCols} gap-1 p-2`}>
        {items.map((item, index) => {
          const Icon = item.icon;
          const className = 'flex flex-col items-center justify-center py-2 px-1 relative';

          const content = (
            <>
              <Icon className="h-5 w-5 mb-1" />
              {item.badge !== undefined && (
                <Badge className="absolute top-0 right-2 h-4 w-4 flex items-center justify-center p-0 text-[10px]">
                  {typeof item.badge === 'number' && item.badge > 9 ? '9+' : item.badge}
                </Badge>
              )}
              <span className="text-xs">{item.label}</span>
            </>
          );

          if (item.to && item.LinkComponent) {
            const LinkComp = item.LinkComponent;
            return (
              <LinkComp key={index} to={item.to} className={className}>
                {content}
              </LinkComp>
            );
          }

          if (item.onClick) {
            return (
              <button key={index} onClick={item.onClick} className={className}>
                {content}
              </button>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
