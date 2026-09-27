'use client';

import React, { useState } from 'react';
import { LayoutGrid, ExternalLink } from 'lucide-react';
import type { TimerLog } from '@/types';

interface FocusHeatmapCardProps {
  timerLogs?: TimerLog[];
  onNavigateAnalytics?: () => void;
}

export function FocusHeatmapCard({
  timerLogs = [],
  onNavigateAnalytics,
}: FocusHeatmapCardProps) {
  const [selectedCell, setSelectedCell] = useState<{ date: string; hours: number } | null>(null);

  // Generate 8-week grid (~56 days)
  const days: Array<{ dateStr: string; hours: number; intensity: number }> = [];
  const now = new Date();
  const logMap: Record<string, number> = {};

  timerLogs.forEach((log) => {
    if (!log.date) return;
    const key = log.date.split('T')[0];
    const hrs = typeof log.duration === 'number' ? log.duration / 3600 : 0;
    logMap[key] = (logMap[key] || 0) + hrs;
  });

  for (let i = 55; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().split('T')[0];
    const hours = logMap[dateStr] || 0;
    let intensity = 0;
    if (hours > 4) intensity = 4;
    else if (hours > 2.5) intensity = 3;
    else if (hours > 1) intensity = 2;
    else if (hours > 0) intensity = 1;

    days.push({ dateStr, hours, intensity });
  }

  const getCellBg = (intensity: number) => {
    switch (intensity) {
      case 4:
        return 'bg-fuchsia-600 dark:bg-fuchsia-500';
      case 3:
        return 'bg-fuchsia-500/80 dark:bg-fuchsia-500/80';
      case 2:
        return 'bg-fuchsia-400/60 dark:bg-fuchsia-500/50';
      case 1:
        return 'bg-fuchsia-300/40 dark:bg-fuchsia-500/25';
      default:
        return 'bg-slate-100 dark:bg-slate-800/80';
    }
  };

  return (
    <div
      id="dashboard-heatmap-section"
      className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm flex flex-col select-none h-[225px] md:h-[250px] min-h-[225px] md:min-h-[250px] transition-all hover:shadow-md"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-100 dark:border-slate-700/60 shrink-0 gap-1.5">
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <div className="p-1.5 bg-fuchsia-50 dark:bg-fuchsia-950/30 text-fuchsia-600 dark:text-fuchsia-400 rounded-lg shrink-0">
            <LayoutGrid className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 truncate">
              Focus Heatmap
            </h3>
            <span className="text-[8px] text-slate-400 uppercase tracking-wider block font-black truncate">
              2 Month Grid
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 shrink-0">
          {selectedCell && (
            <div
              id="dash-hm-selected-detail"
              className="text-[9px] font-black text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-50/80 dark:bg-fuchsia-950/50 px-2 py-0.5 rounded-lg border border-fuchsia-500/20 shadow-xs flex items-center gap-1 font-mono"
            >
              <span>{selectedCell.date}</span>: {selectedCell.hours.toFixed(1)}h
            </div>
          )}
          <button
            onClick={onNavigateAnalytics}
            data-switch-page="spectra-analytics"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-xl transition-all active:scale-95 shrink-0 cursor-pointer"
            title="Go to Analytics Heatmap"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 flex flex-col justify-center overflow-hidden py-1 w-full min-h-0">
        <div
          id="dashboard-focus-heatmap-grid"
          className="grid grid-flow-col grid-rows-7 gap-1.5 w-full h-full items-center justify-between"
        >
          {days.map((d, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCell({ date: d.dateStr, hours: d.hours })}
              className={`w-3.5 h-3.5 rounded-[4px] transition-all hover:scale-125 hover:ring-2 hover:ring-fuchsia-400 cursor-pointer ${getCellBg(
                d.intensity
              )}`}
              title={`${d.dateStr}: ${d.hours.toFixed(1)} hours`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
