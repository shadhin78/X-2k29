'use client';

import React from 'react';
import { LayoutGrid, BarChart3, Timer, CheckSquare2, CalendarDays } from 'lucide-react';

interface BottomNavProps {
  activeRoute: string;
  onNavigate: (route: string) => void;
}

const PRIMARY_MOBILE_ROUTES = [
  { route: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { route: 'spectra-analytics', label: 'Analytics', icon: BarChart3 },
  { route: 'timer', label: 'Focus', icon: Timer },
  { route: 'daily-actions', label: 'Actions', icon: CheckSquare2 },
  { route: 'schedule', label: 'Schedule', icon: CalendarDays },
];

export function BottomNav({ activeRoute, onNavigate }: BottomNavProps) {
  return (
    <nav
      id="mobile-bottom-nav"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-2 py-1.5 shadow-lg select-none"
    >
      {PRIMARY_MOBILE_ROUTES.map((item) => {
        const Icon = item.icon;
        const isActive = activeRoute === item.route;
        return (
          <button
            key={item.route}
            data-switch-page={item.route}
            onClick={() => onNavigate(item.route)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
              isActive
                ? 'text-indigo-400 font-bold scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
