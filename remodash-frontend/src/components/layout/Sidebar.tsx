'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Users, 
  Building, 
  Clipboard, 
  Search, 
  Wrench, 
  Truck, 
  BarChart3, 
  Bell, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  children?: SidebarItem[];
}

const navigationItems: SidebarItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    label: 'Locataires',
    href: '/locataires',
    icon: Users,
    badge: 3, // Exemple: 3 nouvelles demandes
  },
  {
    label: 'Logements',
    href: '/logements',
    icon: Building,
    children: [
      { label: 'Tous les logements', href: '/logements', icon: Building },
      { label: 'Logements vacants', href: '/logements/vacants', icon: Building },
    ],
  },
  {
    label: 'Pré-EDL',
    href: '/pre-edl',
    icon: Clipboard,
    badge: 5, // Exemple: 5 EDL en attente
  },
  {
    label: 'Diagnostics',
    href: '/diagnostics',
    icon: Search,
  },
  {
    label: 'Travaux',
    href: '/travaux',
    icon: Wrench,
    badge: 2, // Exemple: 2 validations en attente
  },
  {
    label: 'Prestataires',
    href: '/prestataires',
    icon: Truck,
  },
  {
    label: 'Rapports',
    href: '/rapports',
    icon: BarChart3,
  },
  {
    label: 'Notifications',
    href: '/notifications',
    icon: Bell,
    badge: 12, // Exemple: 12 notifications non lues
  },
  {
    label: 'Paramètres',
    href: '/parametres',
    icon: Settings,
  },
];

interface SidebarProps {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed = false, onCollapsedChange }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const isExpanded = (href: string) => expandedItems.includes(href);

  return (
    <aside className={cn(
      "bg-white border-r border-neutral-200 flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-60"
    )}>
      {/* Header sidebar avec toggle */}
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <span className="text-subtitle-md font-semibold text-neutral-900">
              Navigation
            </span>
          )}
          <button
            onClick={() => onCollapsedChange?.(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4 text-neutral-600" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-neutral-600" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => (
          <div key={item.href}>
            <SidebarLink
              item={item}
              isActive={isActive(item.href)}
              collapsed={collapsed}
              isExpanded={isExpanded(item.href)}
              onToggleExpanded={() => toggleExpanded(item.href)}
            />
            
            {/* Children navigation */}
            {item.children && !collapsed && isExpanded(item.href) && (
              <div className="ml-4 mt-1 space-y-1">
                {item.children.map((child) => (
                  <SidebarLink
                    key={child.href}
                    item={child}
                    isActive={isActive(child.href)}
                    collapsed={false}
                    isChild={true}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}

interface SidebarLinkProps {
  item: SidebarItem;
  isActive: boolean;
  collapsed: boolean;
  isChild?: boolean;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
}

function SidebarLink({ 
  item, 
  isActive, 
  collapsed, 
  isChild = false,
  isExpanded = false,
  onToggleExpanded 
}: SidebarLinkProps) {
  const hasChildren = item.children && item.children.length > 0;
  const Icon = item.icon;

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren && !collapsed) {
      e.preventDefault();
      onToggleExpanded?.();
    }
  };

  return (
    <a
      href={item.href}
      onClick={handleClick}
      className={cn(
        "flex items-center justify-between rounded-lg px-3 py-2.5 text-body-md font-medium transition-colors group",
        isActive 
          ? "bg-primary-900 text-white" 
          : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900",
        collapsed && "justify-center",
        isChild && "text-body-sm py-2"
      )}
    >
      <div className="flex items-center space-x-3">
        <Icon className={cn(
          "h-5 w-5 flex-shrink-0",
          isActive ? "text-white" : "text-neutral-500 group-hover:text-neutral-700"
        )} />
        
        {!collapsed && (
          <span className="truncate">{item.label}</span>
        )}
      </div>

      {!collapsed && (
        <div className="flex items-center space-x-2">
          {/* Badge de notification */}
          {item.badge && item.badge > 0 && (
            <Badge
              size="sm"
              variant={isActive ? "secondary" : "danger"}
              className="text-xs"
            >
              {item.badge > 99 ? '99+' : item.badge}
            </Badge>
          )}
          
          {/* Icône d'expansion pour les items avec enfants */}
          {hasChildren && (
            <ChevronRight className={cn(
              "h-4 w-4 transition-transform",
              isExpanded && "rotate-90",
              isActive ? "text-white" : "text-neutral-400"
            )} />
          )}
        </div>
      )}
    </a>
  );
}