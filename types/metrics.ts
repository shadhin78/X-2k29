/**
 * X-29 Advance: KPI Metrics & Calculation Engine Interfaces
 */

export interface SubjectMetricStat {
  totalChapters: number;
  tasksAssigned: number;
  tasksCompleted: number;
  effectiveChapters: number;
  earliestCompletedDate: Date | null;
  actualPace: number;
}

export type SubjectStatsMap = Record<string, SubjectMetricStat>;

export interface CountdownMetric {
  daysLeft: number | null;
  daysGone: number | null;
  isGoalReached: boolean;
  isDeadlineSet: boolean;
  formattedDaysLeft: string;
  formattedDaysGone: string;
}

export interface SuccessScoreMetric {
  scorePercentage: number;
  passedSubjects: number;
  totalSubjects: number;
  celebrationMet: boolean;
  hasCustomCelebration: boolean;
  corePassed: number;
  coreTotal: number;
}

export interface GlobalPaceMetric {
  totalChapters: number;
  completedChapters: number;
  remainingChapters: number;
  currentPace: number; // Ch/Day
  requiredPace: number; // Ch/Day
  daysNeeded: number;
  projectedFinishDate: Date;
  status: 'no_targets' | 'future' | 'overdue' | 'ahead' | 'behind' | 'completed';
  formattedCurrentPace: string;
  formattedRequiredPace: string;
  comment: {
    text: string;
    icon: string;
    color: string;
  };
}

export interface OverallCompletionMetric {
  percentage: number;
  completedChapters: number;
  totalChapters: number;
}

export interface ComputedMetricsSummary {
  overallCompletion: OverallCompletionMetric;
  subjectStats: SubjectStatsMap;
  countdown: CountdownMetric;
  successScore: SuccessScoreMetric;
  globalPace: GlobalPaceMetric;
}
