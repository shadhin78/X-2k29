'use client';

import React from 'react';
import { GraduationCap, ExternalLink, Plus } from 'lucide-react';
import type { ExamRoutineItem, ExamSessionItem } from '@/types';
import { getSubjectColor } from '@/lib/colors';

interface UpcomingExamCardProps {
  exams: ExamRoutineItem[];
  sessions?: ExamSessionItem[];
  onNavigateExam?: () => void;
  onScheduleExam?: () => void;
}

export function UpcomingExamCard({
  exams = [],
  sessions = [],
  onNavigateExam,
  onScheduleExam,
}: UpcomingExamCardProps) {
  const now = Date.now();

  const getExamTimestamp = (dateStr?: string, timeStr?: string): number => {
    if (!dateStr) return NaN;
    const parts = dateStr.split('-');
    if (parts.length !== 3) return NaN;
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    let hours = 0;
    let minutes = 0;
    if (timeStr) {
      const timeParts = timeStr.split(':');
      hours = parseInt(timeParts[0], 10) || 0;
      minutes = parseInt(timeParts[1], 10) || 0;
    }
    return new Date(year, month, day, hours, minutes, 0, 0).getTime();
  };

  const upcomingList = exams
    .filter((e) => e && (e.subject || e.title) && e.date)
    .map((e) => {
      const timeMs = getExamTimestamp(e.date, e.startTime || e.time);
      return { ...e, timeMs };
    })
    .filter((e) => !isNaN(e.timeMs) && e.timeMs > now - 7200000)
    .sort((a, b) => a.timeMs - b.timeMs);

  const count = upcomingList.length;

  return (
    <div
      id="dashboard-upcoming-exams-section"
      className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm flex flex-col select-none h-[225px] md:h-[250px] min-h-[225px] md:min-h-[250px] transition-all hover:shadow-md"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-100 dark:border-slate-700/60 shrink-0 gap-1.5">
        <div className="flex items-center space-x-2.5 min-w-0 flex-1">
          <div className="p-1.5 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 rounded-xl shrink-0 border border-rose-100 dark:border-rose-800/40 shadow-xs">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs md:text-sm font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 truncate">
              Upcoming Exams
            </h3>
            <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-extrabold truncate">
              [ Subject • Date • Countdown ]
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 shrink-0">
          <span
            id="db-upcoming-exams-count-badge"
            className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border font-mono ${
              count > 0
                ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800/50 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            {count > 0 ? `${count} Upcoming` : 'No Exams'}
          </span>
          <button
            onClick={onNavigateExam}
            data-switch-page="exam"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-xl transition-all active:scale-95 shrink-0 cursor-pointer"
            title="Go to Exam Routine Page"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* List */}
      <div
        id="db-upcoming-exams-list"
        className="space-y-1.5 overflow-y-auto pr-1 flex-1 min-h-0 custom-scrollbar text-[10px] mt-1"
      >
        {upcomingList.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center py-4 text-center select-none">
            <GraduationCap className="w-6 h-6 text-slate-400 mb-1 opacity-60" />
            <p className="text-xs font-black text-slate-600 dark:text-slate-300">
              No upcoming exams
            </p>
            <p className="text-[9px] text-slate-400 mt-0.5 mb-2.5">
              Schedule subjects & exam routine
            </p>
            <button
              onClick={onScheduleExam || onNavigateExam}
              className="text-[9px] font-black uppercase tracking-wider px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-all active:scale-95 shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Schedule Exam</span>
            </button>
          </div>
        ) : (
          upcomingList.map((ex) => {
            const subjName = ex.subject || ex.title || 'General';
            const color = getSubjectColor(subjName);
            const parentSession = sessions.find((s) => s.id === ex.sessionId);
            const sessionTag = parentSession
              ? parentSession.name
                ? `${parentSession.program} - ${parentSession.name}`
                : parentSession.program
              : ex.program && ex.program !== 'Non-Program'
              ? ex.program
              : 'Custom';

            const dt = new Date(ex.timeMs);
            const diffMs = ex.timeMs - now;
            const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
            const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));

            let countdownBadge = (
              <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50 shrink-0 inline-flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                <span>{diffDays > 0 ? `${diffDays}d ${diffHours % 24}h` : `${diffHours}h left`}</span>
              </span>
            );

            if (diffMs <= 0 && diffMs > -7200000) {
              countdownBadge = (
                <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-md bg-rose-500 text-white animate-pulse shrink-0 font-mono">
                  ● Live Today
                </span>
              );
            }

            return (
              <div
                key={ex.id}
                className="p-2 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 select-none shadow-2xs"
              >
                <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] sm:text-[11px] font-black text-slate-800 dark:text-slate-100 truncate block">
                      {subjName}
                    </span>
                    <div className="flex items-center gap-1.5 text-[8px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-0.5 truncate">
                      <span className="text-rose-500/80 font-black truncate max-w-[90px] sm:max-w-[120px]">
                        {sessionTag}
                      </span>
                      <span>•</span>
                      <span className="truncate font-mono">
                        {dt.toLocaleDateString(undefined, {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                {countdownBadge}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
