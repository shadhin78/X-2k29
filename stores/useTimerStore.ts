import { create } from 'zustand';
import type {
  TimerLog,
  ActiveTimerState,
  TimerGrouping,
} from '@/types';

export interface TimerState {
  timerLogs: TimerLog[];
  activeTimerState: ActiveTimerState;
  timerAnalyticsRange: number;
  timerAnalyticsGrouping: TimerGrouping;
  timerAnalyticsChartStyle: 'combo' | 'bar' | 'line';
  spectraHeatmapRange: number;
  sessionHistoryFilter: string;

  // Actions
  setTimerLogs: (logs: TimerLog[]) => void;
  addTimerLog: (log: TimerLog) => void;
  deleteTimerLog: (id: string) => void;
  setActiveTimerState: (state: Partial<ActiveTimerState>) => void;
  startTimer: (subject?: string, mode?: 'stopwatch' | 'countdown', targetDuration?: number) => void;
  pauseTimer: () => void;
  resetActiveTimer: () => void;
  setTimerAnalyticsRange: (range: number) => void;
  setTimerAnalyticsGrouping: (grouping: TimerGrouping) => void;
  setTimerAnalyticsChartStyle: (style: 'combo' | 'bar' | 'line') => void;
  setSpectraHeatmapRange: (range: number) => void;
  setSessionHistoryFilter: (filter: string) => void;
  resetTimerState: () => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  timerLogs: [],
  activeTimerState: {
    isRunning: false,
    mode: 'stopwatch',
    startTime: null,
    elapsedBeforeStart: 0,
    targetDuration: 0,
    selectedSubject: 'General Study',
  },
  timerAnalyticsRange: 180,
  timerAnalyticsGrouping: 'daily',
  timerAnalyticsChartStyle: 'combo',
  spectraHeatmapRange: 365,
  sessionHistoryFilter: 'all',

  setTimerLogs: (timerLogs) => set({ timerLogs }),

  addTimerLog: (log) =>
    set((state) => ({
      timerLogs: [log, ...state.timerLogs],
    })),

  deleteTimerLog: (id) =>
    set((state) => ({
      timerLogs: state.timerLogs.filter((l) => l.id !== id),
    })),

  setActiveTimerState: (timerState) =>
    set((state) => ({
      activeTimerState: { ...state.activeTimerState, ...timerState },
    })),

  startTimer: (subject = 'General Study', mode = 'stopwatch', targetDuration = 0) =>
    set((state) => ({
      activeTimerState: {
        ...state.activeTimerState,
        isRunning: true,
        mode,
        selectedSubject: subject,
        startTime: Date.now(),
        targetDuration,
      },
    })),

  pauseTimer: () =>
    set((state) => {
      if (!state.activeTimerState.isRunning || !state.activeTimerState.startTime) {
        return state;
      }
      const additionalElapsed = Date.now() - state.activeTimerState.startTime;
      return {
        activeTimerState: {
          ...state.activeTimerState,
          isRunning: false,
          startTime: null,
          elapsedBeforeStart: state.activeTimerState.elapsedBeforeStart + additionalElapsed,
        },
      };
    }),

  resetActiveTimer: () =>
    set({
      activeTimerState: {
        isRunning: false,
        mode: 'stopwatch',
        startTime: null,
        elapsedBeforeStart: 0,
        targetDuration: 0,
        selectedSubject: 'General Study',
      },
    }),

  setTimerAnalyticsRange: (timerAnalyticsRange) => set({ timerAnalyticsRange }),
  setTimerAnalyticsGrouping: (timerAnalyticsGrouping) => set({ timerAnalyticsGrouping }),
  setTimerAnalyticsChartStyle: (timerAnalyticsChartStyle) => set({ timerAnalyticsChartStyle }),
  setSpectraHeatmapRange: (spectraHeatmapRange) => set({ spectraHeatmapRange }),
  setSessionHistoryFilter: (sessionHistoryFilter) => set({ sessionHistoryFilter }),

  resetTimerState: () =>
    set({
      timerLogs: [],
      activeTimerState: {
        isRunning: false,
        mode: 'stopwatch',
        startTime: null,
        elapsedBeforeStart: 0,
        targetDuration: 0,
        selectedSubject: 'General Study',
      },
    }),
}));
