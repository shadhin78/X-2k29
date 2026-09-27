import { create } from 'zustand';
import type {
  DashboardConfig,
  ScheduleGroup,
  FiscalLedger,
  ExamSession,
  ExamRoutineItem,
  PassedItemsRegistry,
  CelebrationTargetsRegistry,
  OutcomeResult,
} from '@/types';

export interface ConfigState {
  dashboardConfig: DashboardConfig;
  scheduleGroups: ScheduleGroup[];
  fiscalLedger: FiscalLedger;
  examSessions: ExamSession[];
  examRoutine: ExamRoutineItem[];
  selectedCountdownExamId: string;
  passedItems: PassedItemsRegistry;
  celebrationTargets: CelebrationTargetsRegistry;
  successResults: OutcomeResult[];
  editingResultId: string | null;
  subjectColors: Record<string, string>;
  activeRoutineSet: number;
  serverTimeOffset: number;
  PLAN_START_DATE: Date;
  PLAN_END_DATE: Date;

  // Actions
  setDashboardConfig: (config: Partial<DashboardConfig>) => void;
  setScheduleGroups: (groups: ScheduleGroup[]) => void;
  setFiscalLedger: (ledger: FiscalLedger) => void;
  setExamSessions: (sessions: ExamSession[]) => void;
  setExamRoutine: (routine: ExamRoutineItem[]) => void;
  setSelectedCountdownExamId: (id: string) => void;
  setPassedItems: (items: PassedItemsRegistry) => void;
  setCelebrationTargets: (targets: CelebrationTargetsRegistry) => void;
  setSuccessResults: (results: OutcomeResult[]) => void;
  setEditingResultId: (id: string | null) => void;
  setSubjectColors: (colors: Record<string, string>) => void;
  setActiveRoutineSet: (setNum: number) => void;
  setPlanDates: (start: Date, end: Date) => void;
  resetConfig: () => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  dashboardConfig: {
    topTag: 'X-29',
    mainTitle: 'X-29 Dashboard',
    subTitle: '',
    trendStartDate: '',
    trendEndDate: '',
    showDaysRemaining: false,
    independentPaces: { tracks: {}, programs: {}, subjects: {} },
  },
  scheduleGroups: [],
  fiscalLedger: { transactions: [], budgets: [], vaults: [] },
  examSessions: [],
  examRoutine: [],
  selectedCountdownExamId: 'auto',
  passedItems: { programs: [], subjects: [] },
  celebrationTargets: { programs: [], subjects: [] },
  successResults: [],
  editingResultId: null,
  subjectColors: {},
  activeRoutineSet: 1,
  serverTimeOffset: 0,
  PLAN_START_DATE: new Date(),
  PLAN_END_DATE: new Date(Date.now() + 10 * 30 * 24 * 60 * 60 * 1000),

  setDashboardConfig: (config) =>
    set((state) => ({
      dashboardConfig: { ...state.dashboardConfig, ...config },
    })),

  setScheduleGroups: (scheduleGroups) => set({ scheduleGroups }),
  setFiscalLedger: (fiscalLedger) => set({ fiscalLedger }),
  setExamSessions: (examSessions) => set({ examSessions }),
  setExamRoutine: (examRoutine) => set({ examRoutine }),
  setSelectedCountdownExamId: (selectedCountdownExamId) => set({ selectedCountdownExamId }),
  setPassedItems: (passedItems) => set({ passedItems }),
  setCelebrationTargets: (celebrationTargets) => set({ celebrationTargets }),
  setSuccessResults: (successResults) => set({ successResults }),
  setEditingResultId: (editingResultId) => set({ editingResultId }),
  setSubjectColors: (subjectColors) => set({ subjectColors }),
  setActiveRoutineSet: (activeRoutineSet) => set({ activeRoutineSet }),
  setPlanDates: (PLAN_START_DATE, PLAN_END_DATE) => set({ PLAN_START_DATE, PLAN_END_DATE }),

  resetConfig: () =>
    set({
      dashboardConfig: {
        topTag: 'X-29',
        mainTitle: 'X-29 Dashboard',
        subTitle: '',
        trendStartDate: '',
        trendEndDate: '',
        showDaysRemaining: false,
        independentPaces: { tracks: {}, programs: {}, subjects: {} },
      },
      scheduleGroups: [],
      fiscalLedger: { transactions: [], budgets: [], vaults: [] },
      examSessions: [],
      examRoutine: [],
      passedItems: { programs: [], subjects: [] },
      celebrationTargets: { programs: [], subjects: [] },
      successResults: [],
      editingResultId: null,
    }),
}));
