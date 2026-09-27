'use client';

import React from 'react';
import { Award, ExternalLink, Plus } from 'lucide-react';
import type { SuccessResultItem } from '@/types';
import { formatCgpa } from '@/lib/metrics';

interface OutcomeSummaryCardProps {
  results: SuccessResultItem[];
  onNavigateOutcome?: () => void;
  onAddResult?: () => void;
}

export function OutcomeSummaryCard({
  results = [],
  onNavigateOutcome,
  onAddResult,
}: OutcomeSummaryCardProps) {
  // Compute overall stats
  let targetSum = 0;
  let targetCount = 0;
  let actualSum = 0;
  let actualCount = 0;

  const validItems = results.filter(Boolean);

  validItems.forEach((item) => {
    if (item.targetCGPA && !isNaN(parseFloat(item.targetCGPA))) {
      targetSum += parseFloat(item.targetCGPA);
      targetCount++;
    }
    if (item.value && !isNaN(parseFloat(item.value))) {
      actualSum += parseFloat(item.value);
      actualCount++;
    }
  });

  const avgTarget = targetCount > 0 ? targetSum / targetCount : null;
  const avgActual = actualCount > 0 ? actualSum / actualCount : null;

  let overallStatusText = 'No Results';
  let overallBadgeClass =
    'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700';

  if (actualCount > 0 && targetCount > 0 && avgActual !== null && avgTarget !== null) {
    if (avgActual >= avgTarget) {
      overallStatusText = 'Goal Met';
      overallBadgeClass =
        'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50 shadow-xs';
    } else {
      overallStatusText = 'In Progress';
      overallBadgeClass =
        'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/50 shadow-xs';
    }
  } else if (actualCount > 0) {
    overallStatusText = 'Logged';
    overallBadgeClass =
      'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/50 shadow-xs';
  }

  return (
    <div
      id="dashboard-outcome-section"
      className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm flex flex-col select-none h-[225px] md:h-[250px] min-h-[225px] md:min-h-[250px] transition-all hover:shadow-md"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-100 dark:border-slate-700/60 shrink-0 gap-1.5">
        <div className="flex items-center space-x-2.5 min-w-0 flex-1">
          <div className="p-1.5 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400 rounded-xl shrink-0 border border-yellow-100 dark:border-yellow-800/40 shadow-xs">
            <Award className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs md:text-sm font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 truncate">
              Outcome & CGPA
            </h3>
            <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-extrabold truncate">
              [ Name • Target • Actual ]
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 shrink-0">
          <span
            id="db-outcome-overall-badge"
            className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border font-mono ${overallBadgeClass}`}
          >
            {overallStatusText}
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

      {/* Program Breakdown List */}
      <div
        id="db-outcome-program-list"
        className="space-y-1.5 overflow-y-auto pr-1 flex-1 min-h-0 custom-scrollbar text-[10px] mt-1"
      >
        {validItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center py-4 text-center select-none">
            <Award className="w-6 h-6 text-slate-400 mb-1 opacity-50" />
            <p className="text-xs font-black text-slate-600 dark:text-slate-300">
              No results logged yet
            </p>
            <p className="text-[9px] text-slate-400 mt-0.5 mb-2.5">
              Input your BBA, CA or program scores
            </p>
            <button
              onClick={onAddResult || onNavigateOutcome}
              className="text-[9px] font-black uppercase tracking-wider px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl transition-all active:scale-95 shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Result</span>
            </button>
          </div>
        ) : (
          validItems.map((item, idx) => {
            const hasTgt = Boolean(item.targetCGPA && item.targetCGPA !== 'none');
            const actVal = item.value ? parseFloat(item.value) : NaN;
            const tgtVal = item.targetCGPA ? parseFloat(item.targetCGPA) : NaN;
            const isGoalMet = hasTgt && !isNaN(actVal) && !isNaN(tgtVal) && actVal >= tgtVal;

            const tgtDisplay = hasTgt ? formatCgpa(tgtVal) : '—';
            const actDisplay = !isNaN(actVal) ? formatCgpa(actVal) : item.grade || '—';

            return (
              <div
                key={item.id || idx}
                className="p-2 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all flex items-center justify-between gap-2 shadow-2xs select-none"
              >
                {/* Name */}
                <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-yellow-500 shadow-[0_0_6px_rgba(234,179,8,0.6)]" />
                  <div className="min-w-0">
                    <span className="font-black text-xs text-slate-800 dark:text-slate-100 truncate block leading-tight">
                      {item.title || item.subject || 'Program'}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[8px] font-extrabold uppercase text-slate-400">
                        {item.evaluationType === 'grade' ? 'Grade' : 'CGPA'}
                      </span>
                      {hasTgt ? (
                        isGoalMet ? (
                          <span className="text-[7px] font-black px-1.5 py-0.25 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded border border-emerald-200 dark:border-emerald-800/50 font-mono">
                            MET
                          </span>
                        ) : (
                          <span className="text-[7px] font-black px-1.5 py-0.25 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded border border-rose-200 dark:border-rose-800/50 font-mono">
                            NOT MET
                          </span>
                        )
                      ) : (
                        <span className="text-[7px] font-black px-1.5 py-0.25 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded border border-blue-200 dark:border-blue-800/50 font-mono">
                          LOGGED
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Target */}
                <div className="flex flex-col items-center px-2.5 py-1 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-800/40 shrink-0 min-w-[76px] text-center">
                  <span className="text-[8px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 leading-none">
                    Target
                  </span>
                  <span className="text-xs font-black text-slate-800 dark:text-slate-200 leading-tight mt-0.5 font-mono tabular-nums">
                    {tgtDisplay}
                  </span>
                </div>

                {/* Actual */}
                <div
                  className={`flex flex-col items-center px-2.5 py-1 rounded-xl ${
                    isGoalMet
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200/50 dark:border-emerald-800/40'
                      : 'bg-slate-100/80 dark:bg-slate-800/80 border-slate-200/50 dark:border-slate-700/50'
                  } border shrink-0 min-w-[76px] text-center`}
                >
                  <span
                    className={`text-[8px] font-black uppercase tracking-wider ${
                      isGoalMet
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-500 dark:text-slate-400'
                    } leading-none`}
                  >
                    Actual
                  </span>
                  <span
                    className={`text-xs font-black ${
                      isGoalMet
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-900 dark:text-white'
                    } leading-tight mt-0.5 font-mono tabular-nums`}
                  >
                    {actDisplay}
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
