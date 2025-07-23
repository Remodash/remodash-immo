'use client';

import { cn } from '@/lib/utils';
import { getStatusColor } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'sm' | 'md';
  status?: string; // Pour utiliser getStatusColor automatiquement
  pulse?: boolean;
}

export function Badge({ 
  className, 
  variant = 'neutral', 
  size = 'md', 
  status,
  pulse = false,
  children, 
  ...props 
}: BadgeProps) {
  // Si un status est fourni, utiliser getStatusColor pour déterminer la variante
  const finalVariant = status ? getStatusColor(status) as BadgeProps['variant'] : variant;

  const baseClasses = [
    'inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap',
    'text-white',
  ];

  const variants = {
    primary: 'bg-primary-900',
    secondary: 'bg-secondary-500',
    success: 'bg-success-600',
    warning: 'bg-warning-500',
    danger: 'bg-danger-600',
    neutral: 'bg-neutral-500',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-label-sm',
    md: 'px-2.5 py-1 text-label-md',
  };

  const classes = cn(
    baseClasses,
    variants[finalVariant || 'neutral'],
    sizes[size],
    pulse && 'pulse-status',
    className
  );

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}

// Composant spécialisé pour les statuts avec traduction automatique
export function StatusBadge({ status, ...props }: Omit<BadgeProps, 'children'> & { status: string }) {
  const statusLabels: Record<string, string> = {
    // Locataires
    'actif': 'Actif',
    'depart_annonce': 'Départ annoncé',
    'parti': 'Parti',
    'impayes': 'Impayés',
    
    // Logements
    'occupe': 'Occupé',
    'vacant': 'Vacant',
    'travaux': 'Travaux',
    'bloque': 'Bloqué',
    
    // Pré-EDL
    'a_planifier': 'À planifier',
    'en_cours': 'En cours',
    'termine': 'Terminé',
    'valide': 'Validé',
    
    // Diagnostics
    'planifie': 'Planifié',
    'valide_gt': 'Validé GT',
    'approuve_ra': 'Approuvé RA',
    
    // Travaux
    'en_attente': 'En attente',
    'valide_gt': 'Validé GT',
    'approuve': 'Approuvé',
    'receptionne': 'Réceptionné',
    
    // Priorités
    'urgent': 'Urgent',
    'normal': 'Normal',
    'faible': 'Faible',
  };

  return (
    <Badge status={status} {...props}>
      {statusLabels[status.toLowerCase()] || status}
    </Badge>
  );
}