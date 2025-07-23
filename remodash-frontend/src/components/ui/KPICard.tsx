'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent } from './Card';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    period: string;
  };
  icon?: React.ComponentType<{ className?: string }>;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';
  onClick?: () => void;
}

export function KPICard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color = 'primary',
  onClick 
}: KPICardProps) {
  const colorClasses = {
    primary: {
      bg: 'bg-primary-50',
      icon: 'text-primary-600',
      value: 'text-primary-900',
    },
    secondary: {
      bg: 'bg-secondary-50',
      icon: 'text-secondary-600',
      value: 'text-secondary-900',
    },
    success: {
      bg: 'bg-success-50',
      icon: 'text-success-600',
      value: 'text-success-900',
    },
    warning: {
      bg: 'bg-warning-50',
      icon: 'text-warning-600',
      value: 'text-warning-900',
    },
    danger: {
      bg: 'bg-danger-50',
      icon: 'text-danger-600',
      value: 'text-danger-900',
    },
    neutral: {
      bg: 'bg-neutral-50',
      icon: 'text-neutral-600',
      value: 'text-neutral-900',
    },
  };

  const changeIcon = change ? (
    change.type === 'increase' ? TrendingUp :
    change.type === 'decrease' ? TrendingDown :
    Minus
  ) : null;

  const changeColor = change ? (
    change.type === 'increase' ? 'text-success-600' :
    change.type === 'decrease' ? 'text-danger-600' :
    'text-neutral-500'
  ) : '';

  return (
    <Card 
      hover={!!onClick} 
      className={cn(onClick && 'cursor-pointer')}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-body-md font-medium text-neutral-600 mb-1">
              {title}
            </p>
            <p className={cn(
              "text-3xl font-bold mb-2",
              colorClasses[color].value
            )}>
              {value}
            </p>
            
            {change && (
              <div className="flex items-center space-x-1">
                {changeIcon && (
                  <changeIcon className={cn("h-4 w-4", changeColor)} />
                )}
                <span className={cn("text-body-sm font-medium", changeColor)}>
                  {change.value > 0 ? '+' : ''}{change.value}%
                </span>
                <span className="text-body-sm text-neutral-500">
                  {change.period}
                </span>
              </div>
            )}
          </div>
          
          {Icon && (
            <div className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center",
              colorClasses[color].bg
            )}>
              <Icon className={cn("h-6 w-6", colorClasses[color].icon)} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}