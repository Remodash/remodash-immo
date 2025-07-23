'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: number | string;
  height?: number | string;
  lines?: number; // Pour variant="text"
}

export function Skeleton({ 
  className, 
  variant = 'rectangular', 
  width,
  height,
  lines = 1,
  ...props 
}: SkeletonProps) {
  const baseClasses = [
    'shimmer bg-neutral-200 rounded',
  ];

  const variants = {
    text: 'h-4 rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2" {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              variants.text,
              index === lines - 1 && 'w-3/4', // Dernière ligne plus courte
              className
            )}
            style={style}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        baseClasses,
        variants[variant],
        className
      )}
      style={style}
      {...props}
    />
  );
}

// Composants spécialisés
export function SkeletonCard() {
  return (
    <div className="p-6 bg-white rounded-card shadow-card border border-neutral-200">
      <div className="flex items-center space-x-4 mb-4">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" className="mt-2" />
        </div>
      </div>
      <Skeleton variant="text" lines={3} />
    </div>
  );
}

export function SkeletonKPI() {
  return (
    <div className="p-6 bg-white rounded-card shadow-card border border-neutral-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="text" width="30%" height={32} className="mt-2" />
          <Skeleton variant="text" width="40%" className="mt-2" />
        </div>
        <Skeleton variant="rectangular" width={48} height={48} />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={`header-${index}`} variant="text" width="80%" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div 
          key={`row-${rowIndex}`} 
          className="grid gap-4 py-2" 
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={`cell-${rowIndex}-${colIndex}`} variant="text" />
          ))}
        </div>
      ))}
    </div>
  );
}