'use client';

import { useState } from 'react';
import { Bell, ChevronDown, Settings, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface HeaderProps {
  user?: {
    firstName: string;
    lastName: string;
    role: string;
    avatar?: string;
  };
  notifications?: number;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
}

export function Header({ user, notifications = 0, breadcrumbs = [] }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo et titre */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div>
                <h1 className="text-title-md font-bold text-primary-900">Remodash</h1>
                <p className="text-label-sm text-neutral-600">Gestion Immobilière Intelligente</p>
              </div>
            </div>
          </div>

          {/* Breadcrumb navigation */}
          {breadcrumbs.length > 0 && (
            <nav className="hidden md:flex items-center space-x-2 text-body-md">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {index > 0 && (
                    <span className="text-neutral-400">/</span>
                  )}
                  {crumb.href ? (
                    <a
                      href={crumb.href}
                      className="text-neutral-600 hover:text-primary-900 transition-colors"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-neutral-900 font-medium">{crumb.label}</span>
                  )}
                </div>
              ))}
            </nav>
          )}

          {/* Actions droite */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-neutral-600 hover:text-primary-900 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge
                    size="sm"
                    variant="danger"
                    className="absolute -top-1 -right-1 h-5 w-5 text-xs flex items-center justify-center"
                  >
                    {notifications > 99 ? '99+' : notifications}
                  </Badge>
                )}
              </button>

              {/* Menu notifications (dropdown) */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-neutral-200">
                    <h3 className="text-subtitle-sm font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications > 0 ? (
                      <div className="py-2">
                        {/* Ici on afficherait la liste des notifications */}
                        <div className="px-4 py-2 text-center text-neutral-500 text-body-sm">
                          {notifications} nouvelle{notifications > 1 ? 's' : ''} notification{notifications > 1 ? 's' : ''}
                        </div>
                      </div>
                    ) : (
                      <div className="px-4 py-8 text-center text-neutral-500 text-body-sm">
                        Aucune nouvelle notification
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Menu utilisateur */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-primary-900 rounded-full flex items-center justify-center">
                      <span className="text-white text-label-md font-medium">
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                      </span>
                    </div>
                  )}
                  <div className="hidden md:block text-left">
                    <div className="text-body-md font-medium text-neutral-900">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className="text-label-sm text-neutral-600 capitalize">
                      {user?.role}
                    </div>
                  </div>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-neutral-400 transition-transform",
                  showUserMenu && "rotate-180"
                )} />
              </button>

              {/* Dropdown menu utilisateur */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-neutral-200">
                    <div className="text-subtitle-sm font-semibold text-neutral-900">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className="text-label-sm text-neutral-600 capitalize">
                      {user?.role}
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <a
                      href="/profil"
                      className="flex items-center space-x-3 px-4 py-2 text-body-md text-neutral-700 hover:bg-neutral-100 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span>Mon profil</span>
                    </a>
                    
                    <a
                      href="/parametres"
                      className="flex items-center space-x-3 px-4 py-2 text-body-md text-neutral-700 hover:bg-neutral-100 transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Paramètres</span>
                    </a>
                  </div>
                  
                  <div className="border-t border-neutral-200 pt-2">
                    <button
                      className="flex items-center space-x-3 px-4 py-2 text-body-md text-danger-600 hover:bg-danger-50 transition-colors w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}