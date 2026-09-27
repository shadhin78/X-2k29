/**
 * X-29 Advance: Pure Mathematical KPI & Metrics Calculation Engine
 * Replaces and formalizes `js/core/metrics.js` with 100% mathematical parity and strict typing.
 */

import type {
  StudyPlanDay,
  TrackDefinition,
  SyllabusStructure,
  PaceGoal,
  SubjectMetricStat,
  SubjectStatsMap,
  CountdownMetric,
  SuccessScoreMetric,
  GlobalPaceMetric,
  OverallCompletionMetric,
  ComputedMetricsSummary,
} from '@/types';

/**
 * Standardizes pace display to 2 decimal places with consistent unit suffix.
 * Matches legacy `Utils.formatPace`.
 */
export function formatPace(paceVal: number | string | null | undefined, unit: string = 'Ch/Day'): string {
  const num = typeof paceVal === 'number' ? paceVal : parseFloat(String(paceVal));
  if (isNaN(num)) return unit ? `-- ${unit}`.trim() : '--';
  return unit ? `${num.toFixed(2)} ${unit}`.trim() : num.toFixed(2);
}

/**
 * Standardizes CGPA formatting ensuring exactly 2 decimal places.
 * Matches legacy `Utils.formatCgpa`.
 */
export function formatCgpa(val: number | string | null | undefined): string {
  const parsed = typeof val === 'number' ? val : parseFloat(String(val));
  if (isNaN(parsed)) return '';
  return parsed.toFixed(2);
}

/**
 * Recalculates total static chapters across all tracks and taxonomy structures.
 * 100% mathematical parity with legacy `recalculateTotals()`.
 */
export function calculateTotalStaticChapters(
  tracks: TrackDefinition[] = [],
  syllabusStructure: SyllabusStructure = {}
): number {
  let total = 0;
  if (Array.isArray(tracks) && syllabusStructure) {
    tracks.forEach((trackObj) => {
      const trackId = trackObj.id;
      if (Array.isArray(syllabusStructure[trackId])) {
        total += syllabusStructure[trackId].reduce((acc, s) => {
          const count = typeof s.chapters === 'number' ? s.chapters : (Array.isArray(s.chapters) ? s.chapters.length : 0);
          return acc + count;
        }, 0);
      }
    });
  }
  return total;
}

/**
 * Computes countdown metrics (days left and days elapsed).
 * 100% mathematical parity with legacy `updateCountdown()`.
 */
export function calculateCountdown(
  startDate: Date | string | null | undefined,
  endDate: Date | string | null | undefined,
  referenceDate: Date = new Date()
): CountdownMetric {
  if (!startDate || !endDate) {
    return {
      daysLeft: null,
      daysGone: null,
      isGoalReached: false,
      isDeadlineSet: false,
      formattedDaysLeft: 'Not Set',
      formattedDaysGone: 'Not Set',
    };
  }

  const today = new Date(referenceDate);
  const start = new Date(startDate);
  const target = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(target.getTime())) {
    return {
      daysLeft: null,
      daysGone: null,
      isGoalReached: false,
      isDeadlineSet: false,
      formattedDaysLeft: 'Not Set',
      formattedDaysGone: 'Not Set',
    };
  }

  const diffLeft = target.getTime() - today.getTime();
  const isGoalReached = diffLeft <= 0;
  const daysLeft = isGoalReached ? 0 : Math.ceil(diffLeft / (1000 * 60 * 60 * 24));

  const diffGone = today.getTime() - start.getTime();
  const daysGone = Math.max(0, Math.floor(diffGone / (1000 * 60 * 60 * 24)));

  return {
    daysLeft,
    daysGone,
    isGoalReached,
    isDeadlineSet: true,
    formattedDaysLeft: isGoalReached ? 'Goal Reached!' : `${daysLeft} Days`,
    formattedDaysGone: `${daysGone} Days`,
  };
}

/**
 * Computes success score and milestone celebration progress.
 * 100% mathematical parity with legacy `updateSuccessScore()`.
 */
export function calculateSuccessScore(
  tracks: TrackDefinition[] = [],
  syllabusStructure: SyllabusStructure = {},
  passedItems: { programs?: string[]; subjects?: string[] } = {},
  celebrationTargets: { programs?: string[]; subjects?: string[] } = {}
): SuccessScoreMetric {
  const passedPrograms = passedItems.programs || [];
  const passedSubjectsList = passedItems.subjects || [];

  let totalSubs = 0;
  let passedSubs = 0;

  if (Array.isArray(tracks) && syllabusStructure) {
    tracks.map((t) => t.id).forEach((trackId) => {
      if (syllabusStructure[trackId]) {
        syllabusStructure[trackId].forEach((s) => {
          totalSubs++;
          if (
            passedPrograms.includes(s.program) ||
            passedSubjectsList.includes(s.subject)
          ) {
            passedSubs++;
          }
        });
      }
    });
  }

  const scorePercentage = totalSubs > 0 ? Math.round((passedSubs / totalSubs) * 100) : 0;

  const hasCustomCelebration = Boolean(
    (celebrationTargets.programs && celebrationTargets.programs.length > 0) ||
    (celebrationTargets.subjects && celebrationTargets.subjects.length > 0)
  );

  let coreTotal = 0;
  let corePassed = 0;
  let celebrationMet = false;

  if (hasCustomCelebration) {
    const requiredSubjectSet = new Set<string>();
    const requiredPrograms = celebrationTargets.programs || [];
    const targetSubjects = celebrationTargets.subjects || [];

    if (Array.isArray(tracks) && syllabusStructure) {
      tracks.map((t) => t.id).forEach((trackId) => {
        if (syllabusStructure[trackId]) {
          syllabusStructure[trackId].forEach((s) => {
            if (
              requiredPrograms.includes(s.program) ||
              targetSubjects.includes(s.subject)
            ) {
              requiredSubjectSet.add(s.subject);
            }
          });
        }
      });
    }

    coreTotal = requiredSubjectSet.size;

    requiredSubjectSet.forEach((subName) => {
      let isPassed = passedSubjectsList.includes(subName);
      if (!isPassed && syllabusStructure) {
        for (const tid in syllabusStructure) {
          const matched = syllabusStructure[tid]?.find((s) => s.subject === subName);
          if (matched && passedPrograms.includes(matched.program)) {
            isPassed = true;
            break;
          }
        }
      }
      if (isPassed) corePassed++;
    });

    celebrationMet = coreTotal > 0 && corePassed === coreTotal;
  } else {
    coreTotal = totalSubs;
    corePassed = passedSubs;
    celebrationMet = scorePercentage === 100 && totalSubs > 0;
  }

  return {
    scorePercentage,
    passedSubjects: passedSubs,
    totalSubjects: totalSubs,
    celebrationMet,
    hasCustomCelebration,
    corePassed,
    coreTotal,
  };
}

/**
 * Calculates per-subject statistics including completed chapters, effective chapters,
 * and historical actual velocity.
 * 100% mathematical parity with legacy `updateMetrics()`.
 */
export function calculateSubjectStats(
  allSubjects: Array<{ subject: string; chapters?: number; track?: string; program?: string }>,
  tasks: StudyPlanDay[] = [],
  tracks: TrackDefinition[] = [],
  passedItems: { programs?: string[]; subjects?: string[] } = {},
  referenceDate: Date = new Date(),
  sizeProgressResolver?: (trackId: string, subject: string, chapterStr: string) => { isSizeBased: boolean; total: number; completed: number } | null
): SubjectStatsMap {
  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);
  const msPerDay = 1000 * 60 * 60 * 24;

  const passedPrograms = passedItems.programs || [];
  const passedSubjects = passedItems.subjects || [];

  const subjectStats: SubjectStatsMap = {};

  allSubjects.forEach((sObj) => {
    const sub = sObj.subject;
    const totalSyllabusChapters = sObj.chapters || 0;
    const trackId = sObj.track || 'ca';

    const isFrozen =
      passedSubjects.includes(sub) ||
      (sObj.program ? passedPrograms.includes(sObj.program) : false);

    let skippedChapters = 0;
    let completedChapters = 0;
    let earliestCompletedDate: Date | null = null;

    const subTasks: Array<{ dayObj: StudyPlanDay; taskObj: any; trackId: string }> = [];

    if (Array.isArray(tasks)) {
      tasks
        .filter((t) => t.type === 'study')
        .forEach((t) => {
          if (Array.isArray(tracks)) {
            tracks.forEach((track) => {
              const key = `${track.id}Tasks` as keyof StudyPlanDay;
              const trackTasks = t[key];
              if (Array.isArray(trackTasks)) {
                trackTasks.forEach((b: any) => {
                  if (b.subject === sub) {
                    subTasks.push({ dayObj: t, taskObj: b, trackId: track.id });
                  }
                });
              }
            });
          }
        });
    }

    const tasksAssigned = subTasks.filter((x) => !x.taskObj.skipped).length;

    if (totalSyllabusChapters > 0) {
      for (let chNum = 1; chNum <= totalSyllabusChapters; chNum++) {
        const matchedTaskItem = subTasks.find((x) => {
          const chStr = x.taskObj.chapter;
          if (chStr === `Ch. ${chNum}` || chStr === `Ch.${chNum}` || chStr === String(chNum)) return true;
          const match = chStr ? String(chStr).match(/(\d+)(?!.*\d)/) : null;
          return match && parseInt(match[0], 10) === chNum;
        });

        if (matchedTaskItem && matchedTaskItem.taskObj.skipped) {
          skippedChapters++;
        } else if (matchedTaskItem && matchedTaskItem.taskObj.completed) {
          completedChapters += 1;
          let d: Date | null = matchedTaskItem.taskObj.completedAt ? new Date(matchedTaskItem.taskObj.completedAt) : null;
          if (!d || isNaN(d.getTime())) {
            d = matchedTaskItem.dayObj.date ? new Date(matchedTaskItem.dayObj.date) : null;
          }
          if (d && !isNaN(d.getTime())) {
            if (!earliestCompletedDate || d < earliestCompletedDate) {
              earliestCompletedDate = d;
            }
          }
        } else if (sizeProgressResolver) {
          const prog = sizeProgressResolver(trackId, sub, `Ch. ${chNum}`);
          if (prog && prog.isSizeBased && prog.total > 0 && prog.completed > 0) {
            completedChapters += Math.min(1, prog.completed / prog.total);
          }
        }
      }
    } else {
      subTasks.forEach((x) => {
        if (x.taskObj.skipped) {
          skippedChapters++;
        } else if (x.taskObj.completed) {
          completedChapters += 1;
          let d: Date | null = x.taskObj.completedAt ? new Date(x.taskObj.completedAt) : null;
          if (!d || isNaN(d.getTime())) {
            d = x.dayObj.date ? new Date(x.dayObj.date) : null;
          }
          if (d && !isNaN(d.getTime())) {
            if (!earliestCompletedDate || d < earliestCompletedDate) {
              earliestCompletedDate = d;
            }
          }
        }
      });
    }

    const totalActiveChapters = Math.max(0, totalSyllabusChapters - skippedChapters);
    const effectiveChapters = isFrozen ? totalActiveChapters : Math.min(totalActiveChapters, completedChapters);

    let actualPace = 0;
    if (earliestCompletedDate) {
      const start = new Date(earliestCompletedDate);
      start.setHours(0, 0, 0, 0);
      if (start <= today) {
        const daysElapsed = Math.floor((today.getTime() - start.getTime()) / msPerDay) + 1;
        actualPace = effectiveChapters / daysElapsed;
      }
    }

    subjectStats[sub] = {
      totalChapters: totalActiveChapters,
      tasksAssigned,
      tasksCompleted: completedChapters,
      effectiveChapters,
      earliestCompletedDate,
      actualPace,
    };
  });

  return subjectStats;
}

/**
 * Calculates global pace and requirement metrics.
 * 100% mathematical parity with legacy `updateMetrics()`.
 */
export function calculateGlobalPace(
  subjectStats: SubjectStatsMap,
  paceGoals: PaceGoal[] = [],
  globalStartDate?: Date | string | null,
  globalEndDate?: Date | string | null,
  referenceDate: Date = new Date()
): GlobalPaceMetric {
  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);
  const msPerDay = 1000 * 60 * 60 * 24;

  let scopeTotalChapters = 0;
  let scopeCompleted = 0;

  Object.values(subjectStats).forEach((stat) => {
    scopeTotalChapters += stat.totalChapters;
    scopeCompleted += stat.effectiveChapters;
  });

  const remaining = Math.max(0, scopeTotalChapters - scopeCompleted);

  // If no deadline bounds set
  if (!globalStartDate || !globalEndDate) {
    let earliestDate: Date | null = null;
    Object.values(subjectStats).forEach((stat) => {
      if (stat.earliestCompletedDate) {
        if (!earliestDate || stat.earliestCompletedDate < earliestDate) {
          earliestDate = stat.earliestCompletedDate;
        }
      }
    });

    let globalCurPace = 0;
    const start = earliestDate ? new Date(earliestDate) : new Date(today);
    start.setHours(0, 0, 0, 0);

    if (earliestDate && start <= today) {
      const daysElapsed = Math.floor((today.getTime() - start.getTime()) / msPerDay) + 1;
      globalCurPace = scopeCompleted / daysElapsed;
    }

    const daysNeeded = globalCurPace > 0 ? Math.ceil(remaining / globalCurPace) : 0;
    const projectedDate =
      scopeTotalChapters === 0 || globalCurPace <= 0
        ? new Date(0)
        : new Date(today.getTime() + (remaining / globalCurPace) * msPerDay);

    let status: GlobalPaceMetric['status'] = 'no_targets';
    if (scopeTotalChapters === 0) status = 'no_targets';
    else if (remaining <= 0) status = 'completed';
    else if (globalCurPace > 0) status = 'ahead';

    return {
      totalChapters: scopeTotalChapters,
      completedChapters: scopeCompleted,
      remainingChapters: remaining,
      currentPace: globalCurPace,
      requiredPace: 0,
      daysNeeded,
      projectedFinishDate: projectedDate,
      status,
      formattedCurrentPace: formatPace(globalCurPace),
      formattedRequiredPace: '--',
      comment: {
        text: 'No global pace goal is set. Actual pace is calculating dynamically from your first completed chapter.',
        icon: '📊',
        color: 'text-blue-600 dark:text-blue-400',
      },
    };
  }

  // Global bounds exist
  const start = new Date(globalStartDate);
  start.setHours(0, 0, 0, 0);
  const end = new Date(globalEndDate);
  end.setHours(23, 59, 59, 999);

  let earliestDate: Date | null = null;
  Object.values(subjectStats).forEach((stat) => {
    if (stat.earliestCompletedDate) {
      if (!earliestDate || stat.earliestCompletedDate < earliestDate) {
        earliestDate = stat.earliestCompletedDate;
      }
    }
  });

  let globalCurPace = 0;
  if (earliestDate && start <= today) {
    const eDate: Date = earliestDate;
    const paceStart = eDate.getTime() > start.getTime() ? start : eDate;
    const daysElapsed = Math.max(1, Math.floor((today.getTime() - paceStart.getTime()) / msPerDay) + 1);
    globalCurPace = scopeCompleted / daysElapsed;
  }

  let globalReqPace = 0;
  if (today < start) {
    const totalDays = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / msPerDay));
    globalReqPace = remaining / totalDays;
  } else if (today <= end) {
    const daysLeft = Math.max(1, Math.ceil((end.getTime() - today.getTime()) / msPerDay));
    globalReqPace = remaining / daysLeft;
  } else {
    globalReqPace = remaining; // Overdue
  }

  const daysNeeded = globalCurPace > 0 ? Math.ceil(remaining / globalCurPace) : 0;
  const projectedDate =
    scopeTotalChapters === 0 || globalCurPace <= 0
      ? new Date(0)
      : new Date(today.getTime() + (remaining / globalCurPace) * msPerDay);

  let status: GlobalPaceMetric['status'] = 'no_targets';
  let comment = {
    text: 'No pace goals are mapped.',
    icon: '📭',
    color: 'text-slate-500',
  };

  if (scopeTotalChapters === 0) {
    status = 'no_targets';
  } else if (today < start) {
    status = 'future';
    comment = {
      text: "Your assigned timelines haven't started yet. Get ready to begin when the time comes!",
      icon: '⏳',
      color: 'text-blue-600 dark:text-blue-400',
    };
  } else if (today > end && remaining > 0) {
    status = 'overdue';
    comment = {
      text: 'The target timeline has expired but tasks remain. You are currently overdue!',
      icon: '⏰',
      color: 'text-red-600 dark:text-red-400',
    };
  } else if (remaining <= 0 && scopeTotalChapters > 0) {
    status = 'completed';
    comment = {
      text: 'Target timelines completely finished! Outstanding achievement.',
      icon: '🏆',
      color: 'text-emerald-600 dark:text-emerald-400',
    };
  } else if (globalCurPace >= globalReqPace && globalCurPace > 0) {
    status = 'ahead';
    comment = {
      text: 'Excellent pace! You are on track to beat your aggregated deadlines.',
      icon: '🚀',
      color: 'text-emerald-600 dark:text-emerald-400',
    };
  } else {
    status = 'behind';
    comment = {
      text: "You're falling behind the required pace. Time to double down on studies!",
      icon: '⚠️',
      color: 'text-orange-600 dark:text-orange-400',
    };
  }

  return {
    totalChapters: scopeTotalChapters,
    completedChapters: scopeCompleted,
    remainingChapters: remaining,
    currentPace: globalCurPace,
    requiredPace: globalReqPace,
    daysNeeded,
    projectedFinishDate: projectedDate,
    status,
    formattedCurrentPace: formatPace(globalCurPace),
    formattedRequiredPace: formatPace(globalReqPace),
    comment,
  };
}

/**
 * Pure master calculation orchestrator compiling the full state into a ComputedMetricsSummary.
 */
export function calculateAllMetrics(
  allSubjects: Array<{ subject: string; chapters?: number; track?: string; program?: string }>,
  tasks: StudyPlanDay[] = [],
  tracks: TrackDefinition[] = [],
  syllabusStructure: SyllabusStructure = {},
  passedItems: { programs?: string[]; subjects?: string[] } = {},
  celebrationTargets: { programs?: string[]; subjects?: string[] } = {},
  globalStartDate?: Date | string | null,
  globalEndDate?: Date | string | null,
  referenceDate: Date = new Date()
): ComputedMetricsSummary {
  const subjectStats = calculateSubjectStats(
    allSubjects,
    tasks,
    tracks,
    passedItems,
    referenceDate
  );

  let scopeTotalChapters = 0;
  let scopeCompleted = 0;
  Object.values(subjectStats).forEach((stat) => {
    scopeTotalChapters += stat.totalChapters;
    scopeCompleted += stat.effectiveChapters;
  });

  const percentage = scopeTotalChapters > 0 ? Math.round((scopeCompleted / scopeTotalChapters) * 100) : 0;

  const countdown = calculateCountdown(globalStartDate, globalEndDate, referenceDate);
  const successScore = calculateSuccessScore(tracks, syllabusStructure, passedItems, celebrationTargets);
  const globalPace = calculateGlobalPace(subjectStats, [], globalStartDate, globalEndDate, referenceDate);

  return {
    overallCompletion: {
      percentage,
      completedChapters: Math.round(scopeCompleted),
      totalChapters: scopeTotalChapters,
    },
    subjectStats,
    countdown,
    successScore,
    globalPace,
  };
}
