'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  helper?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text',
    label,
    error,
    success,
    icon: Icon,
    iconPosition = 'left',
    helper,
    id,
    ...props 
  }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const hasIcon = !!Icon;
    const hasError = !!error;
    const hasSuccess = !!success;

    const baseClasses = [
      'flex h-10 w-full rounded-md border bg-white px-3 py-2',
      'text-body-md placeholder:text-neutral-400',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'transition-colors',
    ];

    const stateClasses = {
      default: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500',
      error: 'border-danger-500 focus:border-danger-500 focus:ring-danger-500',
      success: 'border-success-500 focus:border-success-500 focus:ring-success-500',
    };

    const iconClasses = {
      left: hasIcon ? 'pl-10' : '',
      right: hasIcon ? 'pr-10' : '',
    };

    const currentState = hasError ? 'error' : hasSuccess ? 'success' : 'default';

    const inputClasses = cn(
      baseClasses,
      stateClasses[currentState],
      iconClasses[iconPosition],
      className
    );

    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-label-md font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {hasIcon && iconPosition === 'left' && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Icon className="h-4 w-4 text-neutral-400" />
            </div>
          )}
          
          <input
            type={type}
            className={inputClasses}
            ref={ref}
            id={inputId}
            {...props}
          />
          
          {hasIcon && iconPosition === 'right' && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Icon className="h-4 w-4 text-neutral-400" />
            </div>
          )}
        </div>

        {(error || success || helper) && (
          <div className="space-y-1">
            {error && (
              <p className="text-label-sm text-danger-600 flex items-center gap-1">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </p>
            )}
            
            {success && (
              <p className="text-label-sm text-success-600 flex items-center gap-1">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {success}
              </p>
            )}
            
            {helper && !error && !success && (
              <p className="text-label-sm text-neutral-500">{helper}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };