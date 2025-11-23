import { ReactNode } from 'react';
import { cn } from '../../../lib/utils';

interface HeadingProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function H1({ children, className, as = 'h1' }: HeadingProps) {
  const Component = as;
  return (
    <Component
      className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}
    >
      {children}
    </Component>
  );
}

export function H2({ children, className, as = 'h2' }: HeadingProps) {
  const Component = as;
  return (
    <Component
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}
    >
      {children}
    </Component>
  );
}

export function H3({ children, className, as = 'h3' }: HeadingProps) {
  const Component = as;
  return (
    <Component className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)}>
      {children}
    </Component>
  );
}

export function H4({ children, className, as = 'h4' }: HeadingProps) {
  const Component = as;
  return (
    <Component className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)}>
      {children}
    </Component>
  );
}
