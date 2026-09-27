'use client';

import React from 'react';
import { CalendarRange, Check, ExternalLink } from 'lucide-react';
import type { WeeklyTargetsDatabase, WeeklyTargetItem } from '@/types';
import { getSubjectColor } from '@/lib/colors';

interface WeeklyChecklistCardProps {
  weeklyTargetsDatabase: WeeklyTargetsDatabase;
  onToggleTarget: (weekKey: string, targetId: string, completed: boolean) => void;
  onNavigateWeeklyActions?: () => void;
}

export function WeeklyChecklistCard({
  weeklyTargetsDatabase = {},
  onToggleTarget,
  onNavigateWeeklyActions,
}: WeeklyChecklistCardProps) {
  const weekKeys = Object.keys(weeklyTargetsDatabase);
  const activeWeekKey = weekKeys.length > 0 ? weekKeys[0] : 'Current Week';

  const items: Array<{ target: WeeklyTargetItem; weekKey: string; isCurrent: boolean }> = [];

  // Active week targets
  (weeklyTargetsDatabase[activeWeekKey] || []).forEach((target) => {
    items.push({ target, weekKey: activeWeekKey, isCurrent: true });
  });

  // Previous uncompleted targets
  weekKeys.slice(1).forEach((wk) => {
    (weeklyTargetsDatabase[wk] || []).forEach((target) => {
      if (!target.completed) {
        items.push({ target, weekKey: wk, isCurrent: false });
      }
    });
  });

  const totalTargets = items.length;
  const completedTargets = items.filter((x) => x.target.completed).length;
  const pct = totalTargets > 0 ? Math.round((completedTargets / totalTargets) * 100) : 0;
  const pastPendingCount = items.filter((x) => !x.isCurrent).length;

  const weekLabel =
    pastPendingCount > 0
      ? `Week: ${activeWeekKey} (+${pastPendingCount} Pending)`
      : `Week: ${activeWeekKey}`;

  return (
    <div
      id="dashboard-weekly-targets-section"
      className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm flex flex-col select-none h-[225px] md:h-[250px] min-h-[225px] md:min-h-[250px] transition-all hover:shadow-md"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-100 dark:border-slate-700/60 shrink-0 gap-1.5">
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <div className="p-1.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-lg shrink-0">
            <CalendarRange className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-grow">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 truncate">
              Weekly Targets
            </h3>
            <span
              id="db-weekly-checklist-range"
              className="text-[7px] text-slate-400 uppercase tracking-wider block font-black truncate"
            >
              {weekLabel}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 shrink-0">
          <span
            id="db-weekly-checklist-pct"
            className="text-xs font-black text-emerald-600 dark:text-emerald-400 font-mono tabular-nums"
          >
            {pct}%
          </span>
          <button
            onClick={onNavigateWeeklyActions}
            data-switch-page="daily-actions"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-xl transition-all active:scale-95 shrink-0 cursor-pointer"
            title="Go to Weekly Targets"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-700/50 h-2.5 rounded-full overflow-hidden mb-2.5 shadow-inner border border-slate-200/50 dark:border-slate-600/30 relative">
        <div
          id="db-weekly-checklist-progress"
          style={{ width: `${pct}%` }}
          className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full rounded-full transition-all duration-500 ease-out relative"
        >
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/40 rounded-full" />
        </div>
      </div>

      {/* Targets List */}
      <div
        id="db-weekly-targets-checklist"
        className="space-y-1.5 overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 text-[10px] flex-1 mt-1"
      >
        {items.length === 0 ? (
          <div className="col-span-full py-8 text-center text-slate-400 font-bold uppercase text-[9px] tracking-widest flex flex-col items-center justify-center">
            <span>No Weekly Targets Set</span>
          </div>
        ) : (
          items.map(({ target, weekKey, isCurrent }) => {
            const isCompleted = Boolean(target.completed);
            const color = getSubjectColor(target.subject);
            const activeStyle = isCompleted
              ? {
                  backgroundColor: `${color}cc`,
                  borderColor: color,
                  color: 'white',
                  boxShadow: `0 4px 12px ${color}33`,
                }
              : {};

            const chList = Array.isArray(target.chapters) ? target.chapters.join(', ') : '';

            return (
              <button
                key={target.id}
                onClick={() => onToggleTarget(weekKey, target.id, !isCompleted)}
                style={activeStyle}
                className={`flex items-center justify-between p-2 md:p-2.5 rounded-xl border font-black transition-all duration-300 active:scale-95 text-left w-full gap-1.5 cursor-pointer ${
                  isCompleted
                    ? 'text-white border-transparent'
                    : 'bg-slate-50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 border-slate-200/50 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center space-x-1.5 min-w-0 flex-1">
                  <div
                    className={`p-1 rounded-lg shrink-0 ${
                      isCompleted
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60'
                    }`}
                  >
                    <CalendarRange className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 leading-tight">
                    <span
                      className={`block text-[10px] md:text-xs font-black truncate ${
                        isCompleted ? 'line-through opacity-75' : ''
                      }`}
                    >
                      {target.subject} {chList ? `(${chList})` : ''}
                    </span>
                    <span
                      className={`block text-[8px] md:text-[9px] uppercase font-bold tracking-widest truncate ${
                        isCompleted ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {target.program || target.track || 'Weekly Plan'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0 gap-0.5">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                      isCompleted ? 'border-white bg-white/20' : 'border-slate-300 dark:border-slate-600 bg-transparent'
                    }`}
                  >
                    {isCompleted && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                  </div>
                  {!isCurrent && (
                    <span className="inline-block px-1 rounded-[3px] text-[6px] font-black uppercase tracking-widest bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700/50">
                      {weekKey.split(' - ')[0]}
                    </span>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
