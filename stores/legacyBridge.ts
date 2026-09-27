import { useTaskStore, TaskState } from './useTaskStore';
import { useTargetStore, TargetState } from './useTargetStore';
import { usePaceStore, PaceState } from './usePaceStore';
import { useTimerStore, TimerState } from './useTimerStore';
import { useConfigStore, ConfigState } from './useConfigStore';
import { useSyncStore, SyncState } from './useSyncStore';
import type { X29StateDocument, TimerGrouping, TimerChartStyle } from '@/types';

/**
 * Serializes all domain Zustand stores into the canonical 48-key X29StateDocument payload.
 */
export function serializeZustandToStateDocument(): X29StateDocument {
  const task = useTaskStore.getState();
  const target = useTargetStore.getState();
  const pace = usePaceStore.getState();
  const timer = useTimerStore.getState();
  const config = useConfigStore.getState();
  const sync = useSyncStore.getState();

  return {
    tracks: task.tracks,
    tasks: task.tasks,
    customActions: task.customActions,
    syllabusStructure: task.syllabusStructure,
    customSyllabus: task.customSyllabus,
    customPrograms: task.customPrograms,
    programVisibility: task.programVisibility,
    revisionData: task.revisionData,

    monthlyTargetsDatabase: target.monthlyTargetsDatabase,
    weeklyTargetsDatabase: target.weeklyTargetsDatabase,
    dailyTargetsDatabase: target.dailyTargetsDatabase,
    dailyFocusHoursTarget: target.dailyFocusHoursTarget,
    dailyFocusHoursTargetDate: target.dailyFocusHoursTargetDate,
    dailyFocusHoursTargetHistory: target.dailyFocusHoursTargetHistory,

    paceGoals: pace.paceGoals,
    subjectTimeLinks: pace.subjectTimeLinks,
    subjectFocusTargets: pace.subjectFocusTargets,

    timerLogs: timer.timerLogs,
    activeTimerState: timer.activeTimerState,
    timerAnalyticsRange: timer.timerAnalyticsRange,
    timerAnalyticsGrouping: timer.timerAnalyticsGrouping,
    timerAnalyticsChartStyle: timer.timerAnalyticsChartStyle,
    spectraHeatmapRange: timer.spectraHeatmapRange,
    sessionHistoryFilter: timer.sessionHistoryFilter,

    dashboardConfig: config.dashboardConfig,
    scheduleGroups: config.scheduleGroups,
    fiscalLedger: config.fiscalLedger,
    examSessions: config.examSessions,
    examRoutine: config.examRoutine,
    selectedCountdownExamId: config.selectedCountdownExamId,
    passedItems: config.passedItems,
    celebrationTargets: config.celebrationTargets,
    successResults: config.successResults,
    subjectColors: config.subjectColors,
    activeRoutineSet: config.activeRoutineSet,
    scheduleBlocks: [],
    scheduleBlocks2: [],

    _tombstones: sync._tombstones,
    _lastWriteId: sync._lastWriteId,
    lastCommittedWriteId: sync.lastCommittedWriteId,
    lastAppliedCloudTimestamp: sync.lastAppliedCloudTimestamp,
    syncGeneration: sync.syncGeneration,
    localRevision: sync.localRevision,
    lastCommittedRevision: sync.lastCommittedRevision,
    lastLocalEditTime: sync.lastLocalEditTime,
    lastLocalPersistTime: sync.lastLocalPersistTime,
    saveStatus: sync.saveStatus,
    syncSessionId: sync.syncSessionId,
  };
}

/**
 * Hydrates all domain Zustand stores from a canonical X29StateDocument payload.
 */
export function hydrateZustandFromStateDocument(doc: Partial<X29StateDocument>): void {
  if (!doc) return;

  // 1. Task store
  useTaskStore.setState({
    ...(doc.tracks && { tracks: doc.tracks }),
    ...(doc.tasks && { tasks: doc.tasks }),
    ...(doc.customActions && { customActions: doc.customActions }),
    ...(doc.syllabusStructure && { syllabusStructure: doc.syllabusStructure }),
    ...(doc.customSyllabus && { customSyllabus: doc.customSyllabus }),
    ...(doc.customPrograms && { customPrograms: doc.customPrograms }),
    ...(doc.programVisibility && { programVisibility: doc.programVisibility }),
    ...(doc.revisionData && { revisionData: doc.revisionData }),
  } as Partial<TaskState>);

  // 2. Target store
  useTargetStore.setState({
    ...(doc.monthlyTargetsDatabase && { monthlyTargetsDatabase: doc.monthlyTargetsDatabase }),
    ...(doc.weeklyTargetsDatabase && { weeklyTargetsDatabase: doc.weeklyTargetsDatabase }),
    ...(doc.dailyTargetsDatabase && { dailyTargetsDatabase: doc.dailyTargetsDatabase }),
    ...(doc.dailyFocusHoursTarget !== undefined && { dailyFocusHoursTarget: doc.dailyFocusHoursTarget }),
    ...(doc.dailyFocusHoursTargetDate && { dailyFocusHoursTargetDate: doc.dailyFocusHoursTargetDate }),
    ...(doc.dailyFocusHoursTargetHistory && { dailyFocusHoursTargetHistory: doc.dailyFocusHoursTargetHistory }),
  } as Partial<TargetState>);

  // 3. Pace store
  usePaceStore.setState({
    ...(doc.paceGoals && { paceGoals: doc.paceGoals }),
    ...(doc.subjectTimeLinks && { subjectTimeLinks: doc.subjectTimeLinks }),
    ...(doc.subjectFocusTargets && { subjectFocusTargets: doc.subjectFocusTargets }),
  } as Partial<PaceState>);

  // 4. Timer store
  useTimerStore.setState({
    ...(doc.timerLogs && { timerLogs: doc.timerLogs }),
    ...(doc.activeTimerState && { activeTimerState: doc.activeTimerState }),
    ...(doc.timerAnalyticsRange !== undefined && { timerAnalyticsRange: doc.timerAnalyticsRange }),
    ...(doc.timerAnalyticsGrouping && { timerAnalyticsGrouping: doc.timerAnalyticsGrouping as TimerGrouping }),
    ...(doc.timerAnalyticsChartStyle && { timerAnalyticsChartStyle: doc.timerAnalyticsChartStyle as TimerChartStyle }),
    ...(doc.spectraHeatmapRange !== undefined && { spectraHeatmapRange: doc.spectraHeatmapRange }),
    ...(doc.sessionHistoryFilter && { sessionHistoryFilter: doc.sessionHistoryFilter }),
  } as Partial<TimerState>);

  // 5. Config store
  useConfigStore.setState({
    ...(doc.dashboardConfig && { dashboardConfig: doc.dashboardConfig }),
    ...(doc.scheduleGroups && { scheduleGroups: doc.scheduleGroups }),
    ...(doc.fiscalLedger && { fiscalLedger: doc.fiscalLedger }),
    ...(doc.examSessions && { examSessions: doc.examSessions }),
    ...(doc.examRoutine && { examRoutine: doc.examRoutine }),
    ...(doc.selectedCountdownExamId && { selectedCountdownExamId: doc.selectedCountdownExamId }),
    ...(doc.passedItems && { passedItems: doc.passedItems }),
    ...(doc.celebrationTargets && { celebrationTargets: doc.celebrationTargets }),
    ...(doc.successResults && { successResults: doc.successResults }),
    ...(doc.subjectColors && { subjectColors: doc.subjectColors }),
    ...(doc.activeRoutineSet !== undefined && { activeRoutineSet: doc.activeRoutineSet }),
  } as Partial<ConfigState>);

  // 6. Sync store
  const syncUpdates: Partial<SyncState> = {};
  if (doc._tombstones) syncUpdates._tombstones = doc._tombstones;
  if (doc._lastWriteId) syncUpdates._lastWriteId = doc._lastWriteId;
  if (doc.lastCommittedWriteId) syncUpdates.lastCommittedWriteId = doc.lastCommittedWriteId;
  if (doc.lastAppliedCloudTimestamp !== undefined) syncUpdates.lastAppliedCloudTimestamp = doc.lastAppliedCloudTimestamp;
  if (doc.syncGeneration !== undefined) syncUpdates.syncGeneration = doc.syncGeneration;
  if (doc.localRevision !== undefined) syncUpdates.localRevision = doc.localRevision;
  if (doc.lastCommittedRevision !== undefined) syncUpdates.lastCommittedRevision = doc.lastCommittedRevision;
  if (doc.lastLocalEditTime !== undefined) syncUpdates.lastLocalEditTime = doc.lastLocalEditTime;
  if (doc.lastLocalPersistTime !== undefined) syncUpdates.lastLocalPersistTime = doc.lastLocalPersistTime;
  if (doc.saveStatus) syncUpdates.saveStatus = doc.saveStatus as any;
  if (doc.syncSessionId) syncUpdates.syncSessionId = doc.syncSessionId;

  useSyncStore.setState(syncUpdates);
}

/**
 * Initializes transparent bi-directional bridge between window.AppState and Zustand stores.
 * Allows legacy procedural code and tests to read/write window.AppState while syncing to Zustand.
 */
export function initLegacyAppStateBridge(): void {
  if (typeof window === 'undefined' && typeof global === 'undefined') return;
  const root = (typeof window !== 'undefined' ? window : global) as any;

  if (!root.AppState) {
    root.AppState = {};
  }

  // Populate root.AppState initially
  const initialDoc = serializeZustandToStateDocument();
  Object.assign(root.AppState, initialDoc);

  // Subscribe to changes in stores to keep root.AppState in sync
  useTaskStore.subscribe((state) => {
    root.AppState.tasks = state.tasks;
    root.AppState.tracks = state.tracks;
    root.AppState.customActions = state.customActions;
    root.AppState.syllabusStructure = state.syllabusStructure;
    root.AppState.customSyllabus = state.customSyllabus;
    root.AppState.customPrograms = state.customPrograms;
    root.AppState.programVisibility = state.programVisibility;
    root.AppState.revisionData = state.revisionData;
  });

  useTargetStore.subscribe((state) => {
    root.AppState.monthlyTargetsDatabase = state.monthlyTargetsDatabase;
    root.AppState.weeklyTargetsDatabase = state.weeklyTargetsDatabase;
    root.AppState.dailyTargetsDatabase = state.dailyTargetsDatabase;
    root.AppState.dailyFocusHoursTarget = state.dailyFocusHoursTarget;
    root.AppState.dailyFocusHoursTargetDate = state.dailyFocusHoursTargetDate;
    root.AppState.dailyFocusHoursTargetHistory = state.dailyFocusHoursTargetHistory;
  });

  usePaceStore.subscribe((state) => {
    root.AppState.paceGoals = state.paceGoals;
    root.AppState.subjectTimeLinks = state.subjectTimeLinks;
    root.AppState.subjectFocusTargets = state.subjectFocusTargets;
  });

  useTimerStore.subscribe((state) => {
    root.AppState.timerLogs = state.timerLogs;
    root.AppState.activeTimerState = state.activeTimerState;
    root.AppState.timerAnalyticsRange = state.timerAnalyticsRange;
    root.AppState.timerAnalyticsGrouping = state.timerAnalyticsGrouping;
    root.AppState.timerAnalyticsChartStyle = state.timerAnalyticsChartStyle;
    root.AppState.spectraHeatmapRange = state.spectraHeatmapRange;
    root.AppState.sessionHistoryFilter = state.sessionHistoryFilter;
  });

  useConfigStore.subscribe((state) => {
    root.AppState.dashboardConfig = state.dashboardConfig;
    root.AppState.scheduleGroups = state.scheduleGroups;
    root.AppState.fiscalLedger = state.fiscalLedger;
    root.AppState.examSessions = state.examSessions;
    root.AppState.examRoutine = state.examRoutine;
    root.AppState.selectedCountdownExamId = state.selectedCountdownExamId;
    root.AppState.passedItems = state.passedItems;
    root.AppState.celebrationTargets = state.celebrationTargets;
    root.AppState.successResults = state.successResults;
    root.AppState.subjectColors = state.subjectColors;
    root.AppState.activeRoutineSet = state.activeRoutineSet;
  });

  useSyncStore.subscribe((state) => {
    root.AppState._tombstones = state._tombstones;
    root.AppState._lastWriteId = state._lastWriteId;
    root.AppState.lastCommittedWriteId = state.lastCommittedWriteId;
    root.AppState.lastAppliedCloudTimestamp = state.lastAppliedCloudTimestamp;
    root.AppState.syncGeneration = state.syncGeneration;
    root.AppState.localRevision = state.localRevision;
    root.AppState.lastCommittedRevision = state.lastCommittedRevision;
    root.AppState.lastLocalEditTime = state.lastLocalEditTime;
    root.AppState.lastLocalPersistTime = state.lastLocalPersistTime;
    root.AppState.saveStatus = state.saveStatus;
    root.AppState.syncSessionId = state.syncSessionId;
  });
}
