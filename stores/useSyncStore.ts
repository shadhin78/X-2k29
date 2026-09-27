import { create } from 'zustand';
import type { TombstoneMap } from '@/types';

export type SyncStatus = 'saved' | 'saving' | 'offline' | 'error' | 'local';

export interface SyncState {
  isSyncing: boolean;
  isSaving: boolean;
  needsSave: boolean;
  saveStatus: SyncStatus;
  hasLoadedFromCloud: boolean;
  cloudDocumentExists: boolean | null;
  syncGeneration: number;
  lastAppliedCloudTimestamp: number;
  isLocalDirty: boolean;
  localRevision: number;
  lastCommittedRevision: number;
  lastLocalEditTime: number;
  lastLocalPersistTime: number;
  _lastWriteId: string;
  lastCommittedWriteId: string;
  syncSessionId: string;
  _tombstones: TombstoneMap;

  // Actions
  setIsSyncing: (isSyncing: boolean) => void;
  setIsSaving: (isSaving: boolean) => void;
  setNeedsSave: (needsSave: boolean) => void;
  setSaveStatus: (saveStatus: SyncStatus) => void;
  setHasLoadedFromCloud: (loaded: boolean) => void;
  setCloudDocumentExists: (exists: boolean | null) => void;
  incrementLocalRevision: () => void;
  setLastCommittedRevision: (rev: number) => void;
  recordLocalEdit: () => void;
  recordCloudApply: (timestamp: number, writeId: string) => void;
  addTombstone: (key: string, deletedAt?: number) => void;
  clearTombstones: () => void;
  setTombstones: (tombstones: TombstoneMap) => void;
  resetSyncState: () => void;
}

export const useSyncStore = create<SyncState>((set) => ({
  isSyncing: false,
  isSaving: false,
  needsSave: false,
  saveStatus: 'saved',
  hasLoadedFromCloud: false,
  cloudDocumentExists: null,
  syncGeneration: 0,
  lastAppliedCloudTimestamp: 0,
  isLocalDirty: false,
  localRevision: 0,
  lastCommittedRevision: 0,
  lastLocalEditTime: 0,
  lastLocalPersistTime: 0,
  _lastWriteId: '',
  lastCommittedWriteId: '',
  syncSessionId: '',
  _tombstones: {},

  setIsSyncing: (isSyncing) => set({ isSyncing }),
  setIsSaving: (isSaving) => set({ isSaving }),
  setNeedsSave: (needsSave) => set({ needsSave }),
  setSaveStatus: (saveStatus) => set({ saveStatus }),
  setHasLoadedFromCloud: (hasLoadedFromCloud) => set({ hasLoadedFromCloud }),
  setCloudDocumentExists: (cloudDocumentExists) => set({ cloudDocumentExists }),

  incrementLocalRevision: () =>
    set((state) => ({
      localRevision: state.localRevision + 1,
      isLocalDirty: true,
      lastLocalEditTime: Date.now(),
    })),

  setLastCommittedRevision: (lastCommittedRevision) =>
    set({
      lastCommittedRevision,
      isLocalDirty: false,
      lastLocalPersistTime: Date.now(),
    }),

  recordLocalEdit: () =>
    set((state) => ({
      isLocalDirty: true,
      needsSave: true,
      lastLocalEditTime: Date.now(),
      localRevision: state.localRevision + 1,
    })),

  recordCloudApply: (lastAppliedCloudTimestamp, lastCommittedWriteId) =>
    set((state) => ({
      lastAppliedCloudTimestamp,
      lastCommittedWriteId,
      hasLoadedFromCloud: true,
      syncGeneration: state.syncGeneration + 1,
      isLocalDirty: false,
      saveStatus: 'saved',
    })),

  addTombstone: (key, deletedAt = Date.now()) =>
    set((state) => ({
      _tombstones: {
        ...state._tombstones,
        [key]: deletedAt,
      },
    })),

  clearTombstones: () => set({ _tombstones: {} }),
  setTombstones: (_tombstones) => set({ _tombstones }),

  resetSyncState: () =>
    set({
      isSyncing: false,
      isSaving: false,
      needsSave: false,
      saveStatus: 'saved',
      isLocalDirty: false,
      _tombstones: {},
    }),
}));
