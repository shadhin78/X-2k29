'use client';

import React from 'react';
import {
  LayoutGrid,
  BarChart3,
  Timer,
  CheckSquare2,
  CalendarDays,
  BookOpen,
  Zap,
  Sliders,
  Award,
  CalendarClock,
  X,
  Download,
  CloudCheck,
  User,
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'btn-nav-dashboard', label: 'Dashboard', icon: LayoutGrid, route: 'dashboard' },
  { id: 'btn-nav-spectra-analytics', label: 'Analytics', icon: BarChart3, route: 'spectra-analytics' },
  { id: 'btn-nav-timer', label: 'Focus', icon: Timer, route: 'timer' },
  { id: 'btn-nav-daily-actions', label: 'Daily Actions', icon: CheckSquare2, route: 'daily-actions' },
  { id: 'btn-nav-schedule', label: 'Daily Schedule', icon: CalendarDays, route: 'schedule' },
  { id: 'btn-nav-subjects', label: 'Subjects', icon: BookOpen, route: 'subjects' },
  { id: 'btn-nav-paces-management', label: 'Pace Management', icon: Zap, route: 'paces-management' },
  { id: 'btn-nav-master-config', label: 'Master Config', icon: Sliders, route: 'master-config' },
  { id: 'btn-nav-outcome', label: 'Outcome', icon: Award, route: 'outcome' },
  { id: 'btn-nav-exam', label: 'Exam Routine', icon: CalendarClock, route: 'exam' },
];

interface SidebarProps {
  activeRoute: string;
  onNavigate: (route: string) => void;
  onCloseMobile?: () => void;
}

export function Sidebar({ activeRoute, onNavigate, onCloseMobile }: SidebarProps) {
  return (
    <aside
      id="sidebar-container"
      className="flex flex-col w-72 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shrink-0 select-none z-50"
    >
      <div className="flex flex-col h-full min-h-0 justify-between p-5 md:p-6 overflow-y-auto custom-scrollbar">
        {/* Top Section */}
        <div className="space-y-6 pt-2">
          {/* Branding Tag with Aura Glow */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative group flex-1">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-600 opacity-70 blur-xl animate-aura pointer-events-none" />
              <div className="relative px-5 py-3 bg-slate-950/80 border border-white/10 backdrop-blur-md rounded-2xl shadow-2xl flex items-center justify-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                <span
                  id="dash-top-tag"
                  className="text-sm md:text-base font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400 drop-shadow-sm font-outfit"
                >
                  X-29
                </span>
              </div>
            </div>

            {/* Close button for mobile */}
            {onCloseMobile && (
              <button
                id="sidebar-close-btn"
                data-sidebar-close
                onClick={onCloseMobile}
                className="md:hidden p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl transition-all active:scale-95 shrink-0"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation List */}
          <nav className="flex flex-col gap-2 mt-6 border-t border-slate-100 dark:border-slate-800/60 pt-5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeRoute === item.route;
              return (
                <button
                  key={item.id}
                  id={item.id}
                  data-switch-page={item.route}
                  onClick={() => onNavigate(item.route)}
                  className={`w-full text-left border-2 px-4 py-2.5 rounded-2xl font-black text-xs transition-all duration-200 active:scale-98 flex items-center gap-3 cursor-pointer ${
                    isActive
                      ? 'border-indigo-500/70 bg-indigo-500/10 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                      : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:translate-x-1'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Sync & Profile */}
        <div className="mt-6 space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          {/* Sync Status Badge */}
          <div
            id="sync-status"
            className="flex items-center justify-center space-x-1.5 px-3 py-1.5 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/80"
          >
            <CloudCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span id="sync-text" className="text-[9px] font-black uppercase tracking-widest text-emerald-400">
              Cloud Synced
            </span>
          </div>

          {/* Profile Card */}
          <div
            id="profile-card-btn"
            data-account-settings-trigger
            className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors group"
          >
            <div
              id="profile-avatar"
              className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white uppercase text-sm shrink-0 shadow-sm"
            >
              X
            </div>
            <div className="flex-1 min-w-0">
              <span id="profile-name" className="block text-xs font-black truncate text-slate-800 dark:text-slate-200">
                X-29
              </span>
              <span id="profile-email" className="block text-[9px] font-semibold text-slate-400 truncate">
                Private Workspace
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
