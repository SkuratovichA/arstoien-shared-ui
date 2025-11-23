import { ReactNode } from 'react';
import { cn } from '../../../lib/utils';

interface TextProps {
  children: ReactNode;
  className?: string;
}

export function P({ children, className }: TextProps) {
  return <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>{children}</p>;
}

export function Lead({ children, className }: TextProps) {
  return <p className={cn('text-xl text-muted-foreground', className)}>{children}</p>;
}

export function Large({ children, className }: TextProps) {
  return <div className={cn('text-lg font-semibold', className)}>{children}</div>;
}

export function Small({ children, className }: TextProps) {
  return <small className={cn('text-sm font-medium leading-none', className)}>{children}</small>;
}

export function Muted({ children, className }: TextProps) {
  return <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>;
}

export function Code({ children, className }: TextProps) {
  return (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className
      )}
    >
      {children}
    </code>
  );
}
