'use client';

import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import type { OverallCompletionMetric } from '@/types';

interface GlobalCompletionCardProps {
  overallCompletion: OverallCompletionMetric;
  onNavigateSubjects?: () => void;
}

export function GlobalCompletionCard({
  overallCompletion,
  onNavigateSubjects,
}: GlobalCompletionCardProps) {
  const { percentage, completedChapters, totalChapters } = overallCompletion;

  // SVG circular gauge calculation
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      id="dashboard-global-completion"
      className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm flex flex-col select-none h-[225px] md:h-[250px] min-h-[225px] md:min-h-[250px] transition-all hover:shadow-md"
    >
      <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-100 dark:border-slate-700/60 shrink-0 gap-1.5">
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 truncate">
              Global Completion
            </h3>
            <span className="text-[8px] text-slate-400 uppercase tracking-wider block font-black truncate">
              Syllabus Overview
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 shrink-0">
          <button
            onClick={onNavigateSubjects}
            data-switch-page="subjects"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-xl transition-all active:scale-95 shrink-0 cursor-pointer"
            title="Go to Subjects"
            aria-label="Go to Subjects"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Completion Info & Circular Gauge */}
      <div className="flex-1 flex flex-col justify-between mt-2.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <span
              id="db-progress-text"
              className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 drop-shadow-sm leading-none font-mono tabular-nums"
            >
              {percentage}%
            </span>
            <span
              id="db-progress-detail"
              className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1 truncate font-mono tabular-nums"
            >
              {completedChapters} / {totalChapters} Chapters Completed
            </span>
          </div>

          {/* SVG Circular Progress Ring */}
          <button
            onClick={onNavigateSubjects}
            data-switch-page="subjects"
            className="relative shrink-0 flex items-center justify-center bg-slate-50 dark:bg-slate-900/30 p-1 rounded-full border border-slate-100 dark:border-slate-800/80 hover:scale-105 active:scale-95 transition-all focus:outline-none cursor-pointer group shadow-sm w-14 h-14"
            title="Go to Subjects Page"
          >
            <svg className="w-12 h-12 -rotate-90 transform" viewBox="0 0 48 48">
              <circle
                className="text-slate-200 dark:text-slate-700"
                strokeWidth="4"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="24"
                cy="24"
              />
              <circle
                className="text-blue-500 transition-all duration-1000 ease-out"
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="24"
                cy="24"
              />
            </svg>
            <span className="absolute text-[10px] font-black text-slate-700 dark:text-slate-200 font-mono">
              {percentage}%
            </span>
          </button>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200/50 dark:border-slate-800/30 mt-2">
          <div
            id="db-progress-bar"
            style={{ width: `${percentage}%` }}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(99,102,241,0.4)]"
          />
        </div>

        <button
          onClick={onNavigateSubjects}
          data-switch-page="subjects"
          className="mt-2.5 w-full py-2 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-700/80 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 active:scale-95 transition-all shadow-sm cursor-pointer"
        >
          View Subject Details
        </button>
      </div>
    </div>
  );
}
