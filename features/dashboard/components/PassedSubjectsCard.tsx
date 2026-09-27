'use client';

import React from 'react';
import { ShieldCheck, Check, ExternalLink, Sliders } from 'lucide-react';
import { getSubjectColor } from '@/lib/colors';

export interface PassedSubjectInfo {
  subject: string;
  program?: string;
  chapters?: number;
}

interface PassedSubjectsCardProps {
  passedSubjects: PassedSubjectInfo[];
  totalSubjectsCount?: number;
  onNavigateOutcome?: () => void;
}

export function PassedSubjectsCard({
  passedSubjects = [],
  totalSubjectsCount = 0,
  onNavigateOutcome,
}: PassedSubjectsCardProps) {
  const count = passedSubjects.length;
  const total = Math.max(count, totalSubjectsCount);
  const successPct = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div
      id="dashboard-passed-subjects-section"
      className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm flex flex-col select-none h-[225px] md:h-[250px] min-h-[225px] md:min-h-[250px] transition-all hover:shadow-md"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-100 dark:border-slate-700/60 shrink-0 gap-1.5">
        <div className="flex items-center space-x-2.5 min-w-0 flex-1">
          <div className="p-1.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0 border border-emerald-100 dark:border-emerald-800/40 shadow-xs">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs md:text-sm font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 truncate">
              Passed Subjects
            </h3>
            <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-extrabold truncate">
              Status & Exemptions
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 shrink-0">
          <span
            id="db-passed-subjects-rate-badge"
            className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border font-mono ${
              count > 0
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            {successPct}%
          </span>
          <span
            id="db-passed-subjects-count-badge"
            className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border font-mono ${
              count > 0
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            {count} Passed
          </span>
          <button
            onClick={onNavigateOutcome}
            data-switch-page="outcome"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-xl transition-all active:scale-95 shrink-0 cursor-pointer"
            title="Go to Outcome Page"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* List */}
      <div
        id="db-passed-subjects-list"
        className="space-y-1.5 overflow-y-auto pr-1 flex-1 min-h-0 custom-scrollbar text-[10px] mt-1"
      >
        {passedSubjects.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center py-4 text-center select-none">
            <ShieldCheck className="w-6 h-6 text-slate-400 mb-1 opacity-60" />
            <p className="text-xs font-black text-slate-600 dark:text-slate-300">
              No passed subjects yet
            </p>
            <p className="text-[9px] text-slate-400 mt-0.5 mb-2.5">
              Configure pass & freeze criteria in Outcome
            </p>
            <button
              onClick={onNavigateOutcome}
              className="text-[9px] font-black uppercase tracking-wider px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all active:scale-95 shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Manage Pass / Freeze</span>
            </button>
          </div>
        ) : (
          passedSubjects.map((s, idx) => {
            const color = getSubjectColor(s.subject);
            return (
              <div
                key={idx}
                className="p-2 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 select-none shadow-2xs"
              >
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
                  />
                  <div className="min-w-0">
                    <span
                      className="text-[10px] sm:text-[11px] font-black text-slate-800 dark:text-slate-100 truncate block leading-tight"
                      title={s.subject}
                    >
                      {s.subject}
                    </span>
                    <div className="flex items-center gap-1 text-[7.5px] sm:text-[8px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-0.5 truncate">
                      <span className="text-emerald-600 dark:text-emerald-400 font-black truncate max-w-[65px] sm:max-w-[85px]">
                        {s.program || 'Custom'}
                      </span>
                      <span>•</span>
                      <span className="truncate">{s.chapters || 0} Ch</span>
                    </div>
                  </div>
                </div>
                <div className="shrink-0">
                  <span className="text-[7.5px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 inline-flex items-center gap-0.5 font-mono">
                    <Check className="w-2 h-2 stroke-[3]" />
                    <span>Pass</span>
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
