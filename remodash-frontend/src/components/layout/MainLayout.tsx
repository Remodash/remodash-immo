'use client';

import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
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

export function MainLayout({ 
  children, 
  user, 
  notifications = 0, 
  breadcrumbs = [] 
}: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <Header 
        user={user} 
        notifications={notifications} 
        breadcrumbs={breadcrumbs} 
      />
      
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
        />
        
        {/* Main content */}
        <main className="flex-1 min-h-[calc(100vh-80px)]">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}