'use client';

import React from 'react';
import { Zap, ExternalLink } from 'lucide-react';
import { formatPace } from '@/lib/metrics';
import type { GlobalPaceMetric, CountdownMetric } from '@/types';

interface PaceTimelineCardProps {
  globalPace: GlobalPaceMetric;
  countdown: CountdownMetric;
  trendStartDate?: string;
  onNavigatePace?: () => void;
}

export function PaceTimelineCard({
  globalPace,
  countdown,
  trendStartDate,
  onNavigatePace,
}: PaceTimelineCardProps) {
  const reqPaceStr = globalPace.requiredPace > 0 ? formatPace(globalPace.requiredPace) : '--';
  const actPaceStr = globalPace.currentPace > 0 ? formatPace(globalPace.currentPace) : '--';
  const daysLeftStr = countdown.isDeadlineSet ? countdown.formattedDaysLeft : '--';
  const daysPassedStr = countdown.isDeadlineSet ? countdown.formattedDaysGone : '--';

  const estFinishStr =
    globalPace.totalChapters === 0
      ? 'No Target'
      : globalPace.remainingChapters <= 0
      ? 'Finished'
      : globalPace.currentPace <= 0
      ? 'No Data'
      : globalPace.projectedFinishDate.getTime() > 0
      ? globalPace.projectedFinishDate.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      : '--';

  const daysNeededStr =
    globalPace.daysNeeded > 0 ? `${globalPace.daysNeeded} Days Needed` : '--';

  const baselineStr = trendStartDate || 'Active Plan';

  return (
    <div
      id="dashboard-pace-section"
      className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm flex flex-col select-none h-[225px] md:h-[250px] min-h-[225px] md:min-h-[250px] transition-all hover:shadow-md"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-100 dark:border-slate-700/60 shrink-0 gap-1.5">
        <div className="flex items-center space-x-2.5 min-w-0 flex-1">
          <div className="p-1.5 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl shrink-0 border border-indigo-100 dark:border-indigo-800/40 shadow-xs">
            <Zap className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs md:text-sm font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 truncate">
              Pace & Timeline
            </h3>
            <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-extrabold truncate">
              Overview & Baseline
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 shrink-0">
          <button
            onClick={onNavigatePace}
            data-switch-page="paces-management"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-xl transition-all active:scale-95 shrink-0 cursor-pointer"
            title="Go to Pace Management"
            aria-label="Go to Pace Management"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2x2 Metric Grid */}
      <div className="grid grid-cols-2 gap-2 flex-1 min-h-0 py-0.5">
        {/* Required Pace Block */}
        <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-700/60 p-2.5 rounded-2xl flex flex-col justify-between leading-tight min-h-0 hover:border-indigo-500/30 transition-colors">
          <div className="min-w-0">
            <span className="block text-[10px] md:text-[11px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider leading-none mb-0.5 truncate">
              Req. Pace
            </span>
            <div
              id="db-target-req-pace"
              className="text-xs sm:text-sm md:text-base font-black text-slate-900 dark:text-white mt-1 truncate tracking-tight font-mono tabular-nums"
            >
              {reqPaceStr}
            </div>
          </div>
          <div
            id="db-global-days-left"
            className="text-[9px] md:text-[10px] text-blue-500 dark:text-blue-400 font-extrabold uppercase tracking-wider mt-0.5 truncate font-mono tabular-nums"
          >
            {daysLeftStr}
          </div>
        </div>

        {/* Actual Pace Block */}
        <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-700/60 p-2.5 rounded-2xl flex flex-col justify-between leading-tight min-h-0 hover:border-emerald-500/30 transition-colors">
          <div className="min-w-0">
            <span className="block text-[10px] md:text-[11px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider leading-none mb-0.5 truncate">
              Actual Pace
            </span>
            <div
              id="db-current-pace-stat"
              className="text-xs sm:text-sm md:text-base font-black text-slate-900 dark:text-white mt-1 truncate tracking-tight font-mono tabular-nums"
            >
              {actPaceStr}
            </div>
          </div>
          <div
            id="db-global-days-passed"
            className="text-[9px] md:text-[10px] text-emerald-500 dark:text-emerald-400 font-extrabold uppercase tracking-wider mt-0.5 truncate font-mono tabular-nums"
          >
            {daysPassedStr}
          </div>
        </div>

        {/* Est. Finish Block */}
        <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-700/60 p-2.5 rounded-2xl flex flex-col justify-between leading-tight min-h-0 hover:border-indigo-500/30 transition-colors">
          <div className="min-w-0">
            <span className="block text-[10px] md:text-[11px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider leading-none mb-0.5 truncate">
              Est. Finish
            </span>
            <div
              id="db-projected-finish"
              className="text-xs sm:text-sm md:text-base font-black text-slate-900 dark:text-white mt-1 break-words tracking-tight"
            >
              {estFinishStr}
            </div>
          </div>
          <div
            id="db-global-days-needed"
            className="text-[9px] md:text-[10px] text-indigo-500 dark:text-indigo-400 font-extrabold uppercase tracking-wider mt-0.5 truncate font-mono tabular-nums"
          >
            {daysNeededStr}
          </div>
        </div>

        {/* Global Baseline Block */}
        <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-700/60 p-2.5 rounded-2xl flex flex-col justify-between leading-tight min-h-0 hover:border-fuchsia-500/30 transition-colors">
          <div className="min-w-0">
            <span className="block text-[10px] md:text-[11px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider leading-none mb-0.5 truncate">
              Global Baseline
            </span>
            <div
              id="db-pace-timeline-info"
              className="text-xs sm:text-xs md:text-sm font-black text-slate-900 dark:text-white mt-1 break-words tracking-tight truncate"
            >
              {baselineStr}
            </div>
          </div>
          <div
            id="db-target-status-label"
            className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-wider mt-0.5 break-words truncate"
          >
            {globalPace.comment.text}
          </div>
        </div>
      </div>
    </div>
  );
}
