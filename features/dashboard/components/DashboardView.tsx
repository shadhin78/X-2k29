'use client';

import React, { useMemo } from 'react';
import { useTaskStore } from '@/stores/useTaskStore';
import { useTargetStore } from '@/stores/useTargetStore';
import { useConfigStore } from '@/stores/useConfigStore';
import { usePaceStore } from '@/stores/usePaceStore';
import { useTimerStore } from '@/stores/useTimerStore';
import { calculateAllMetrics } from '@/lib/metrics';
import { PaceTimelineCard } from './PaceTimelineCard';
import { GlobalCompletionCard } from './GlobalCompletionCard';
import { FocusHeatmapCard } from './FocusHeatmapCard';
import { OutcomeSummaryCard } from './OutcomeSummaryCard';
import { DailyChecklistCard } from './DailyChecklistCard';
import { WeeklyChecklistCard } from './WeeklyChecklistCard';
import { MonthlyChecklistCard } from './MonthlyChecklistCard';
import { UpcomingExamCard } from './UpcomingExamCard';
import { PassedSubjectsCard } from './PassedSubjectsCard';

interface DashboardViewProps {
  onNavigate?: (route: string) => void;
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  // Store selectors
  const tasks = useTaskStore((s) => s.tasks);
  const tracks = useTaskStore((s) => s.tracks);
  const syllabusStructure = useTaskStore((s) => s.syllabusStructure);

  const passedItems = useConfigStore((s) => s.passedItems);
  const celebrationTargets = useConfigStore((s) => s.celebrationTargets);
  const examRoutine = useConfigStore((s) => s.examRoutine);
  const examSessions = useConfigStore((s) => s.examSessions);
  const successResults = useConfigStore((s) => s.successResults);
  const dashboardConfig = useConfigStore((s) => s.dashboardConfig);

  const dailyTargetsDatabase = useTargetStore((s) => s.dailyTargetsDatabase);
  const weeklyTargetsDatabase = useTargetStore((s) => s.weeklyTargetsDatabase);
  const monthlyTargetsDatabase = useTargetStore((s) => s.monthlyTargetsDatabase);
  const toggleDailyTarget = useTargetStore((s) => s.toggleDailyTarget);
  const toggleWeeklyTarget = useTargetStore((s) => s.toggleWeeklyTarget);
  const toggleMonthlyTarget = useTargetStore((s) => s.toggleMonthlyTarget);

  const timerLogs = useTimerStore((s) => s.timerLogs);

  // Compute flattened subjects list
  const allSubjects = useMemo(() => {
    const list: Array<{ subject: string; chapters?: number; track?: string; program?: string }> = [];
    tracks.forEach((t) => {
      const items = syllabusStructure[t.id];
      if (Array.isArray(items)) {
        items.forEach((s) => {
          const chCount = typeof s.chapters === 'number' ? s.chapters : (Array.isArray(s.chapters) ? s.chapters.length : 0);
          list.push({
            subject: s.subject,
            chapters: chCount,
            track: t.id,
            program: s.program,
          });
        });
      }
    });
    return list;
  }, [tracks, syllabusStructure]);

  // Compute live mathematical metrics snapshot
  const metrics = useMemo(() => {
    return calculateAllMetrics(
      allSubjects,
      tasks,
      tracks,
      syllabusStructure,
      passedItems,
      celebrationTargets,
      dashboardConfig?.trendStartDate || null,
      dashboardConfig?.trendEndDate || null,
      new Date()
    );
  }, [
    allSubjects,
    tasks,
    tracks,
    syllabusStructure,
    passedItems,
    celebrationTargets,
    dashboardConfig?.trendStartDate,
    dashboardConfig?.trendEndDate,
  ]);

  // Derive passed subjects list
  const passedProgs = passedItems?.programs || [];
  const passedSubs = passedItems?.subjects || [];
  const passedSubjectList = useMemo(() => {
    return allSubjects.filter((s: { subject: string; program?: string }) => {
      if (!s || !s.subject) return false;
      return (
        passedSubs.includes(s.subject) ||
        (s.program ? passedProgs.includes(s.program) : false)
      );
    });
  }, [allSubjects, passedSubs, passedProgs]);

  const handleNavigate = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else if (typeof window !== 'undefined' && (window as any).switchPage) {
      (window as any).switchPage(route);
    }
  };

  return (
    <div id="page-dashboard" className="space-y-6 md:space-y-8 animate-page-enter">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span
              id="dash-top-tag"
              className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400"
            >
              {dashboardConfig?.topTag || 'X-29'}
            </span>
          </div>
          <h1
            id="dash-main-title"
            className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white"
          >
            {dashboardConfig?.mainTitle || 'Command Center'}
          </h1>
          <p
            id="dash-sub-title"
            className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400"
          >
            {dashboardConfig?.subTitle || 'Dynamic Multi-Track Execution & Tracking Dashboard'}
          </p>
        </div>

        {/* Global Summary Badges */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Success Score
            </span>
            <span className="text-sm font-black text-slate-900 dark:text-white font-mono tabular-nums">
              {metrics.successScore.scorePercentage}%
            </span>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Time Left
            </span>
            <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 font-mono tabular-nums">
              {metrics.countdown.formattedDaysLeft}
            </span>
          </div>
        </div>
      </div>

      {/* 3x3 Responsive Bento Dashboard Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-6">
        {/* Row 1: Primary Metrics & Progress */}
        <PaceTimelineCard
          globalPace={metrics.globalPace}
          countdown={metrics.countdown}
          trendStartDate={dashboardConfig?.trendStartDate}
          onNavigatePace={() => handleNavigate('paces-management')}
        />

        <GlobalCompletionCard
          overallCompletion={metrics.overallCompletion}
          onNavigateSubjects={() => handleNavigate('subjects')}
        />

        <FocusHeatmapCard
          timerLogs={timerLogs}
          onNavigateAnalytics={() => handleNavigate('spectra-analytics')}
        />

        {/* Row 2: Multi-Tier Checklists (Daily, Weekly, Monthly) */}
        <DailyChecklistCard
          dailyTargetsDatabase={dailyTargetsDatabase}
          onToggleTarget={(dk, tid, comp) => toggleDailyTarget(dk, tid, comp)}
          onNavigateDailyActions={() => handleNavigate('daily-actions')}
        />

        <WeeklyChecklistCard
          weeklyTargetsDatabase={weeklyTargetsDatabase}
          onToggleTarget={(wk, tid, comp) => toggleWeeklyTarget(wk, tid, comp)}
          onNavigateWeeklyActions={() => handleNavigate('daily-actions')}
        />

        <MonthlyChecklistCard
          monthlyTargetsDatabase={monthlyTargetsDatabase}
          onToggleTarget={(mk, tid, comp) => toggleMonthlyTarget(mk, tid, comp)}
          onNavigateMonthlyActions={() => handleNavigate('daily-actions')}
        />

        {/* Row 3: Outcomes, Routine & Pass Exemptions */}
        <OutcomeSummaryCard
          results={successResults}
          onNavigateOutcome={() => handleNavigate('outcome')}
        />

        <UpcomingExamCard
          exams={examRoutine}
          sessions={examSessions}
          onNavigateExam={() => handleNavigate('exam')}
        />

        <PassedSubjectsCard
          passedSubjects={passedSubjectList}
          totalSubjectsCount={allSubjects.length}
          onNavigateOutcome={() => handleNavigate('outcome')}
        />
      </div>
    </div>
  );
}
