import { create } from 'zustand';
import type {
  StudyPlanDay,
  Track,
  CustomActionItem,
  SyllabusStructure,
  CustomProgram,
  RevisionProgress,
} from '@/types';

export interface TaskState {
  tasks: StudyPlanDay[];
  tracks: Track[];
  customActions: CustomActionItem[];
  syllabusStructure: SyllabusStructure;
  customSyllabus: SyllabusStructure;
  customPrograms: Record<string, CustomProgram[]>;
  programVisibility: Record<string, boolean>;
  revisionData: RevisionProgress;
  editingTask: any | null;
  currentFilter: string;
  isInitialLoad: boolean;

  // Actions
  setTasks: (tasks: StudyPlanDay[]) => void;
  updateTask: (taskIndex: number, updatedDay: StudyPlanDay) => void;
  setTracks: (tracks: Track[]) => void;
  setCustomActions: (actions: CustomActionItem[]) => void;
  setSyllabusStructure: (structure: SyllabusStructure) => void;
  setCustomSyllabus: (syllabus: SyllabusStructure) => void;
  setCustomPrograms: (programs: Record<string, CustomProgram[]>) => void;
  setProgramVisibility: (visibility: Record<string, boolean>) => void;
  setRevisionData: (data: RevisionProgress) => void;
  setEditingTask: (task: any | null) => void;
  setCurrentFilter: (filter: string) => void;
  resetTasks: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  tracks: [],
  customActions: [],
  syllabusStructure: {},
  customSyllabus: {},
  customPrograms: {},
  programVisibility: {},
  revisionData: { active: [], progress: {} },
  editingTask: null,
  currentFilter: 'All',
  isInitialLoad: true,

  setTasks: (tasks) => set({ tasks }),
  updateTask: (taskIndex, updatedDay) =>
    set((state) => {
      const nextTasks = [...state.tasks];
      nextTasks[taskIndex] = updatedDay;
      return { tasks: nextTasks };
    }),
  setTracks: (tracks) => set({ tracks }),
  setCustomActions: (customActions) => set({ customActions }),
  setSyllabusStructure: (syllabusStructure) => set({ syllabusStructure }),
  setCustomSyllabus: (customSyllabus) => set({ customSyllabus }),
  setCustomPrograms: (customPrograms) => set({ customPrograms }),
  setProgramVisibility: (programVisibility) => set({ programVisibility }),
  setRevisionData: (revisionData) => set({ revisionData }),
  setEditingTask: (editingTask) => set({ editingTask }),
  setCurrentFilter: (currentFilter) => set({ currentFilter }),
  resetTasks: () =>
    set({
      tasks: [],
      tracks: [],
      customActions: [],
      syllabusStructure: {},
      customSyllabus: {},
      customPrograms: {},
      programVisibility: {},
      revisionData: { active: [], progress: {} },
      editingTask: null,
    }),
}));
