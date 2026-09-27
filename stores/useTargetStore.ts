import { create } from 'zustand';
import type {
  MonthlyTargetsDatabase,
  WeeklyTargetsDatabase,
  DailyTargetsDatabase,
  MonthlyTargetItem,
  WeeklyTargetItem,
  DailyTargetItem,
  DailyFocusTargetHistoryItem,
} from '@/types';

export interface TargetState {
  monthlyTargetsDatabase: MonthlyTargetsDatabase;
  weeklyTargetsDatabase: WeeklyTargetsDatabase;
  dailyTargetsDatabase: DailyTargetsDatabase;
  dailyFocusHoursTarget: number;
  dailyFocusHoursTargetDate: string;
  dailyFocusHoursTargetHistory: DailyFocusTargetHistoryItem[];
  currentDadbTab: 'date' | 'action' | 'trend';
  currentGhmTab: string;

  // Actions
  setMonthlyTargetsDatabase: (db: MonthlyTargetsDatabase) => void;
  setWeeklyTargetsDatabase: (db: WeeklyTargetsDatabase) => void;
  setDailyTargetsDatabase: (db: DailyTargetsDatabase) => void;
  addMonthlyTarget: (monthKey: string, item: MonthlyTargetItem) => void;
  addWeeklyTarget: (weekKey: string, item: WeeklyTargetItem) => void;
  addDailyTarget: (dateKey: string, item: DailyTargetItem) => void;
  deleteMonthlyTarget: (monthKey: string, targetId: string) => void;
  deleteWeeklyTarget: (weekKey: string, targetId: string) => void;
  deleteDailyTarget: (dateKey: string, targetId: string) => void;
  toggleMonthlyTarget: (monthKey: string, targetId: string, completed?: boolean) => void;
  toggleWeeklyTarget: (weekKey: string, targetId: string, completed?: boolean) => void;
  toggleDailyTarget: (dateKey: string, targetId: string, completed?: boolean) => void;
  setDailyFocusHoursTarget: (target: number, date?: string) => void;
  addFocusHoursHistory: (item: DailyFocusTargetHistoryItem) => void;
  setCurrentDadbTab: (tab: 'date' | 'action' | 'trend') => void;
  setCurrentGhmTab: (tab: string) => void;
  resetTargets: () => void;
}

export const useTargetStore = create<TargetState>((set) => ({
  monthlyTargetsDatabase: {},
  weeklyTargetsDatabase: {},
  dailyTargetsDatabase: {},
  dailyFocusHoursTarget: 0,
  dailyFocusHoursTargetDate: '',
  dailyFocusHoursTargetHistory: [],
  currentDadbTab: 'date',
  currentGhmTab: 'overview',

  setMonthlyTargetsDatabase: (monthlyTargetsDatabase) => set({ monthlyTargetsDatabase }),
  setWeeklyTargetsDatabase: (weeklyTargetsDatabase) => set({ weeklyTargetsDatabase }),
  setDailyTargetsDatabase: (dailyTargetsDatabase) => set({ dailyTargetsDatabase }),

  addMonthlyTarget: (monthKey, item) =>
    set((state) => {
      const existing = state.monthlyTargetsDatabase[monthKey] || [];
      const updated = [...existing.filter((t) => t.id !== item.id), item];
      return {
        monthlyTargetsDatabase: {
          ...state.monthlyTargetsDatabase,
          [monthKey]: updated,
        },
      };
    }),

  addWeeklyTarget: (weekKey, item) =>
    set((state) => {
      const existing = state.weeklyTargetsDatabase[weekKey] || [];
      const updated = [...existing.filter((t) => t.id !== item.id), item];
      return {
        weeklyTargetsDatabase: {
          ...state.weeklyTargetsDatabase,
          [weekKey]: updated,
        },
      };
    }),

  addDailyTarget: (dateKey, item) =>
    set((state) => {
      const existing = state.dailyTargetsDatabase[dateKey] || [];
      const updated = [...existing.filter((t) => t.id !== item.id), item];
      return {
        dailyTargetsDatabase: {
          ...state.dailyTargetsDatabase,
          [dateKey]: updated,
        },
      };
    }),

  deleteMonthlyTarget: (monthKey, targetId) =>
    set((state) => {
      const existing = state.monthlyTargetsDatabase[monthKey] || [];
      return {
        monthlyTargetsDatabase: {
          ...state.monthlyTargetsDatabase,
          [monthKey]: existing.filter((t) => t.id !== targetId),
        },
      };
    }),

  deleteWeeklyTarget: (weekKey, targetId) =>
    set((state) => {
      const existing = state.weeklyTargetsDatabase[weekKey] || [];
      return {
        weeklyTargetsDatabase: {
          ...state.weeklyTargetsDatabase,
          [weekKey]: existing.filter((t) => t.id !== targetId),
        },
      };
    }),

  deleteDailyTarget: (dateKey, targetId) =>
    set((state) => {
      const existing = state.dailyTargetsDatabase[dateKey] || [];
      return {
        dailyTargetsDatabase: {
          ...state.dailyTargetsDatabase,
          [dateKey]: existing.filter((t) => t.id !== targetId),
        },
      };
    }),

  toggleMonthlyTarget: (monthKey, targetId, completed) =>
    set((state) => {
      const existing = state.monthlyTargetsDatabase[monthKey] || [];
      return {
        monthlyTargetsDatabase: {
          ...state.monthlyTargetsDatabase,
          [monthKey]: existing.map((t) =>
            t.id === targetId ? { ...t, completed: completed !== undefined ? completed : !t.completed } : t
          ),
        },
      };
    }),

  toggleWeeklyTarget: (weekKey, targetId, completed) =>
    set((state) => {
      const existing = state.weeklyTargetsDatabase[weekKey] || [];
      return {
        weeklyTargetsDatabase: {
          ...state.weeklyTargetsDatabase,
          [weekKey]: existing.map((t) =>
            t.id === targetId ? { ...t, completed: completed !== undefined ? completed : !t.completed } : t
          ),
        },
      };
    }),

  toggleDailyTarget: (dateKey, targetId, completed) =>
    set((state) => {
      const existing = state.dailyTargetsDatabase[dateKey] || [];
      return {
        dailyTargetsDatabase: {
          ...state.dailyTargetsDatabase,
          [dateKey]: existing.map((t) =>
            t.id === targetId ? { ...t, completed: completed !== undefined ? completed : !t.completed } : t
          ),
        },
      };
    }),

  setDailyFocusHoursTarget: (dailyFocusHoursTarget, date) =>
    set({
      dailyFocusHoursTarget,
      dailyFocusHoursTargetDate: date || new Date().toISOString().split('T')[0],
    }),

  addFocusHoursHistory: (item) =>
    set((state) => ({
      dailyFocusHoursTargetHistory: [...state.dailyFocusHoursTargetHistory, item],
    })),

  setCurrentDadbTab: (currentDadbTab) => set({ currentDadbTab }),
  setCurrentGhmTab: (currentGhmTab) => set({ currentGhmTab }),

  resetTargets: () =>
    set({
      monthlyTargetsDatabase: {},
      weeklyTargetsDatabase: {},
      dailyTargetsDatabase: {},
      dailyFocusHoursTarget: 0,
      dailyFocusHoursTargetDate: '',
      dailyFocusHoursTargetHistory: [],
    }),
}));
