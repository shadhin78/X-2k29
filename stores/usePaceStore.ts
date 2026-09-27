import { create } from 'zustand';
import type {
  PaceGoal,
  PaceVelocityCalculation,
  IndependentPacesConfig,
} from '@/types';

export interface PaceState {
  paceGoals: PaceGoal[];
  editingPaceId: string | null;
  latestPaceData: PaceVelocityCalculation | null;
  activeTrendGoalId: string | null;
  activeSingleSubjectTrend: string | null;
  trendTimeFilter: string;
  trendDatasetVisibility: { actual: boolean; target: boolean };
  subjectTimeLinks: Record<string, string | number>;
  subjectFocusTargets: Record<string, number>;
  independentPaces: IndependentPacesConfig;

  // Actions
  setPaceGoals: (goals: PaceGoal[]) => void;
  upsertPaceGoal: (goal: PaceGoal) => void;
  deletePaceGoal: (goalId: string) => void;
  setEditingPaceId: (id: string | null) => void;
  setLatestPaceData: (data: PaceVelocityCalculation | null) => void;
  setActiveTrendGoalId: (id: string | null) => void;
  setActiveSingleSubjectTrend: (subject: string | null) => void;
  setTrendTimeFilter: (filter: string) => void;
  setTrendDatasetVisibility: (visibility: { actual: boolean; target: boolean }) => void;
  setSubjectTimeLinks: (links: Record<string, string | number>) => void;
  setSubjectFocusTargets: (targets: Record<string, number>) => void;
  setIndependentPaces: (paces: IndependentPacesConfig) => void;
  resetPaces: () => void;
}

export const usePaceStore = create<PaceState>((set) => ({
  paceGoals: [],
  editingPaceId: null,
  latestPaceData: null,
  activeTrendGoalId: null,
  activeSingleSubjectTrend: null,
  trendTimeFilter: 'ALL',
  trendDatasetVisibility: { actual: true, target: true },
  subjectTimeLinks: {},
  subjectFocusTargets: {},
  independentPaces: { tracks: {}, programs: {}, subjects: {} },

  setPaceGoals: (paceGoals) => set({ paceGoals }),

  upsertPaceGoal: (goal) =>
    set((state) => {
      const idx = state.paceGoals.findIndex((g) => g.id === goal.id);
      if (idx >= 0) {
        const next = [...state.paceGoals];
        next[idx] = goal;
        return { paceGoals: next };
      }
      return { paceGoals: [...state.paceGoals, goal] };
    }),

  deletePaceGoal: (goalId) =>
    set((state) => ({
      paceGoals: state.paceGoals.filter((g) => g.id !== goalId),
      editingPaceId: state.editingPaceId === goalId ? null : state.editingPaceId,
      activeTrendGoalId: state.activeTrendGoalId === goalId ? null : state.activeTrendGoalId,
    })),

  setEditingPaceId: (editingPaceId) => set({ editingPaceId }),
  setLatestPaceData: (latestPaceData) => set({ latestPaceData }),
  setActiveTrendGoalId: (activeTrendGoalId) => set({ activeTrendGoalId }),
  setActiveSingleSubjectTrend: (activeSingleSubjectTrend) => set({ activeSingleSubjectTrend }),
  setTrendTimeFilter: (trendTimeFilter) => set({ trendTimeFilter }),
  setTrendDatasetVisibility: (trendDatasetVisibility) => set({ trendDatasetVisibility }),
  setSubjectTimeLinks: (subjectTimeLinks) => set({ subjectTimeLinks }),
  setSubjectFocusTargets: (subjectFocusTargets) => set({ subjectFocusTargets }),
  setIndependentPaces: (independentPaces) => set({ independentPaces }),

  resetPaces: () =>
    set({
      paceGoals: [],
      editingPaceId: null,
      latestPaceData: null,
      activeTrendGoalId: null,
      activeSingleSubjectTrend: null,
      subjectTimeLinks: {},
      subjectFocusTargets: {},
      independentPaces: { tracks: {}, programs: {}, subjects: {} },
    }),
}));
