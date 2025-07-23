'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, padding = 'md', children, ...props }, ref) => {
    const baseClasses = [
      'bg-white rounded-card shadow-card border border-neutral-200',
    ];

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const classes = cn(
      baseClasses,
      paddings[padding],
      hover && 'card-hover transition-smooth cursor-pointer',
      className
    );

    return (
      <div className={classes} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Sous-composants pour structurer les cards
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  divider?: boolean;
}

export function CardHeader({ className, divider = false, children, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col space-y-1.5',
        divider && 'pb-4 border-b border-neutral-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function CardTitle({ className, as: Component = 'h3', children, ...props }: CardTitleProps) {
  return (
    <Component
      className={cn('text-title-sm font-semibold leading-none tracking-tight text-neutral-900', className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-body-md text-neutral-600', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      {children}
    </div>
  );
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  divider?: boolean;
}

export function CardFooter({ className, divider = false, children, ...props }: CardFooterProps) {
  return (
    <div
      className={cn(
        'flex items-center',
        divider && 'pt-4 border-t border-neutral-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Card };