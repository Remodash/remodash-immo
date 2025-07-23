'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false, 
    icon: Icon, 
    iconPosition = 'left',
    fullWidth = false,
    children, 
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = [
      'inline-flex items-center justify-center rounded-md font-medium transition-smooth',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
    ];

    const variants = {
      primary: [
        'bg-primary-900 text-white hover:bg-primary-800',
        'focus:ring-primary-500',
      ],
      secondary: [
        'bg-neutral-500 text-white hover:bg-neutral-600',
        'focus:ring-neutral-500',
      ],
      success: [
        'bg-success-600 text-white hover:bg-success-700',
        'focus:ring-success-500',
      ],
      danger: [
        'bg-danger-600 text-white hover:bg-danger-700',
        'focus:ring-danger-500',
      ],
      outline: [
        'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50',
        'focus:ring-primary-500',
      ],
      ghost: [
        'text-neutral-700 hover:bg-neutral-100',
        'focus:ring-primary-500',
      ],
    };

    const sizes = {
      sm: 'h-8 px-3 text-label-sm gap-1.5',
      md: 'h-10 px-4 text-body-md gap-2',
      lg: 'h-12 px-6 text-subtitle-sm gap-2',
    };

    const classes = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className
    );

    return (
      <button
        className={classes}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Chargement...
          </>
        ) : (
          <>
            {Icon && iconPosition === 'left' && (
              <Icon className="h-4 w-4" />
            )}
            {children}
            {Icon && iconPosition === 'right' && (
              <Icon className="h-4 w-4" />
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };