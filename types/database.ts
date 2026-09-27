/**
 * X-29 Advance: Master Firestore Document & Application State Interfaces
 *
 * Defines the strict, single source of truth for:
 * 1. X29StateDocument (The Firestore payload at `x29/state`)
 * 2. X29AppState (Full runtime state including UI cache)
 */

import { TombstoneMap, TailwindPalette } from "./common";
import { StudyPlanDay, Track, SyllabusStructure, CustomProgram, CustomActionItem, RevisionProgress } from "./task";
import { MonthlyTargetsDatabase, WeeklyTargetsDatabase, DailyTargetsDatabase, DailyFocusTargetHistoryItem } from "./target";
import { TimerLog, ActiveTimerState, TimerGrouping, TimerChartStyle } from "./timer";
import { PaceGoal } from "./pace";
import { ExamSession, ExamRoutineItem, PassedItemsRegistry, CelebrationTargetsRegistry, OutcomeResult } from "./exam";
import { DashboardConfig, ScheduleBlockItem, ScheduleGroup, FiscalLedger } from "./config";

/**
 * The exact document schema persisted to Google Cloud Firestore at path:
 * projects/{project}/databases/{database}/documents/x29/state
 */
export interface X29StateDocument {
  tasks: StudyPlanDay[];
  tracks: Track[];
  customSyllabus: SyllabusStructure;
  syllabusStructure: SyllabusStructure;
  customPrograms: Record<string, CustomProgram[]>;
  customActions: CustomActionItem[];
  paceGoals: PaceGoal[];
  passedItems: PassedItemsRegistry;
  celebrationTargets: CelebrationTargetsRegistry;
  revisionData: RevisionProgress;
  programVisibility: Record<string, boolean>;
  subjectTimeLinks: Record<string, string | number>;
  successResults: OutcomeResult[];
  timerLogs: TimerLog[];
  dailyFocusHoursTarget: number;
  dailyFocusHoursTargetDate: string;
  dailyFocusHoursTargetHistory: DailyFocusTargetHistoryItem[];
  timerAnalyticsRange: number;
  timerAnalyticsGrouping: TimerGrouping | string;
  timerAnalyticsChartStyle: TimerChartStyle | string;
  spectraHeatmapRange: number;
  sessionHistoryFilter: string;
  subjectFocusTargets: Record<string, number>;
  dashboardConfig: DashboardConfig;
  weeklyTargetsDatabase: WeeklyTargetsDatabase;
  monthlyTargetsDatabase: MonthlyTargetsDatabase;
  dailyTargetsDatabase: DailyTargetsDatabase;
  scheduleBlocks: ScheduleBlockItem[];
  scheduleBlocks2: ScheduleBlockItem[];
  scheduleGroups: ScheduleGroup[];
  fiscalLedger: FiscalLedger;
  examSessions: ExamSession[];
  examRoutine: ExamRoutineItem[];
  selectedCountdownExamId: string;
  activeTimerState: ActiveTimerState;
  activeRoutineSet: number;
  subjectColors: Record<string, string>;
  _tombstones?: TombstoneMap;
  _lastWriteId?: string;
  lastCommittedWriteId?: string;
  lastAppliedCloudTimestamp?: number;
  syncGeneration?: number;
  localRevision?: number;
  lastCommittedRevision?: number;
  lastLocalEditTime?: number;
  lastLocalPersistTime?: number;
  saveStatus?: string;
  syncSessionId?: string;
  [key: string]: unknown;
}

/**
 * Full in-memory application state representation including UI cache and lifecycle flags
 */
export interface X29AppState extends X29StateDocument {
  PLAN_START_DATE: Date;
  PLAN_END_DATE: Date;
  globalStartDate: Date | null;
  globalEndDate: Date | null;
  currentFilter: string;
  isAppInitialized: boolean;
  isSyncing: boolean;
  isSaving: boolean;
  needsSave: boolean;
  saveStatus: 'saved' | 'local' | 'saving' | 'error';
  hasLoadedFromCloud: boolean;
  cloudDocumentExists: boolean | null;
  syncGeneration: number;
  syncSessionId: string;
  lastAppliedCloudTimestamp: number;
  isLocalDirty: boolean;
  localRevision: number;
  lastCommittedRevision: number;
  lastLocalEditTime: number;
  lastLocalPersistTime: number;
  serverTimeOffset: number;
  twColors: TailwindPalette;
  dynamicLineColors: string[];
}
