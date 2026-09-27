'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

interface AppShellProps {
  children: React.ReactNode;
  initialRoute?: string;
}

export function AppShell({ children, initialRoute = 'dashboard' }: AppShellProps) {
  const [activeRoute, setActiveRoute] = useState<string>(initialRoute);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Close mobile sidebar on route change or ESC
  const handleNavigate = (route: string) => {
    setActiveRoute(route);
    setIsMobileSidebarOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileSidebarOpen) {
        setIsMobileSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileSidebarOpen]);

  return (
    <div
      id="app-wrapper"
      className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-100 font-sans"
    >
      {/* Desktop Persistent Sidebar */}
      <div className="hidden md:flex shrink-0">
        <Sidebar activeRoute={activeRoute} onNavigate={handleNavigate} />
      </div>

      {/* Mobile Sidebar Backdrop */}
      {isMobileSidebarOpen && (
        <div
          id="sidebar-backdrop"
          data-sidebar-close
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-300 ease-in-out ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          activeRoute={activeRoute}
          onNavigate={handleNavigate}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Mobile Header (rendered on mobile) */}
        <Header onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)} />

        {/* Scrollable Main Panel */}
        <div
          id="main-content-panel"
          className="flex-1 h-full overflow-y-auto flex flex-col p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 min-w-0 pb-20 md:pb-8 custom-scrollbar"
        >
          {children}
        </div>

        {/* Mobile Bottom Navigation */}
        <BottomNav activeRoute={activeRoute} onNavigate={handleNavigate} />
      </div>
    </div>
  );
}
