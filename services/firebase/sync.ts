import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  Firestore,
  Unsubscribe,
  DocumentSnapshot,
} from 'firebase/firestore';
import { getFirestoreDb, FirebaseClientConfig, defaultFirebaseConfig } from './client';
import { reconcileArrays } from './tombstones';
import {
  serializeZustandToStateDocument,
  hydrateZustandFromStateDocument,
} from '@/stores/legacyBridge';
import { useSyncStore } from '@/stores/useSyncStore';
import type { X29StateDocument, StudyPlanDay } from '@/types';

export class FirestoreSyncService {
  private db: Firestore | null = null;
  private saveDebounceTimer: NodeJS.Timeout | null = null;
  private snapshotUnsubscribe: Unsubscribe | null = null;
  private inFlightWriteId: string = '';
  private lastCommittedWriteId: string = '';
  private debounceDurationMs: number = 180;
  private config: FirebaseClientConfig;

  constructor(config: FirebaseClientConfig = defaultFirebaseConfig) {
    this.config = config;
  }

  /**
   * Initializes the Firestore database connection.
   */
  public init(config?: FirebaseClientConfig): void {
    if (config) {
      this.config = config;
    }
    this.db = getFirestoreDb(this.config);
  }

  /**
   * Generates a unique monotonic write ID for deduplicating self-echoes.
   */
  private generateWriteId(): string {
    return `w_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Schedules a debounced sync write to `x29/state` (180ms debounce).
   */
  public queueSave(delayMs: number = this.debounceDurationMs): void {
    const syncStore = useSyncStore.getState();
    syncStore.recordLocalEdit();
    syncStore.setSaveStatus('saving');

    if (this.saveDebounceTimer) {
      clearTimeout(this.saveDebounceTimer);
    }

    this.saveDebounceTimer = setTimeout(() => {
      this.executeSave();
    }, delayMs);
  }

  /**
   * Executes immediate write to `x29/state` with self-echo tracking.
   */
  public async executeSave(): Promise<boolean> {
    if (!this.db) {
      this.init();
    }
    if (!this.db) return false;

    const syncStore = useSyncStore.getState();
    if (syncStore.isSaving) {
      // Requeue if a write is already in flight
      this.queueSave(100);
      return false;
    }

    syncStore.setIsSaving(true);
    syncStore.setSaveStatus('saving');

    const writeId = this.generateWriteId();
    this.inFlightWriteId = writeId;

    try {
      const payload: X29StateDocument = {
        ...serializeZustandToStateDocument(),
        _lastWriteId: writeId,
        updatedAt: Date.now(),
      } as any;

      const stateDocRef = doc(this.db, 'x29', 'state');
      await setDoc(stateDocRef, payload, { merge: true });

      this.lastCommittedWriteId = writeId;
      syncStore.recordCloudApply(Date.now(), writeId);
      syncStore.setIsSaving(false);
      syncStore.setSaveStatus('saved');
      return true;
    } catch (error) {
      console.error('Firestore save failed:', error);
      syncStore.setIsSaving(false);
      syncStore.setSaveStatus('error');
      return false;
    }
  }

  /**
   * Fetches latest `x29/state` document once directly.
   */
  public async fetchState(): Promise<X29StateDocument | null> {
    if (!this.db) {
      this.init();
    }
    if (!this.db) return null;

    try {
      const stateDocRef = doc(this.db, 'x29', 'state');
      const snap = await getDoc(stateDocRef);

      if (snap.exists()) {
        const data = snap.data() as X29StateDocument;
        hydrateZustandFromStateDocument(data);
        useSyncStore.getState().setHasLoadedFromCloud(true);
        useSyncStore.getState().setCloudDocumentExists(true);
        useSyncStore.getState().setSaveStatus('saved');
        return data;
      } else {
        useSyncStore.getState().setCloudDocumentExists(false);
        return null;
      }
    } catch (error) {
      console.error('Failed to fetch state from Firestore:', error);
      useSyncStore.getState().setSaveStatus('error');
      return null;
    }
  }

  /**
   * Starts realtime snapshot listener on `x29/state` with self-echo rejection.
   */
  public startSnapshotListener(
    onData?: (data: X29StateDocument) => void,
    onError?: (err: Error) => void
  ): Unsubscribe {
    this.stopSnapshotListener();
    if (!this.db) {
      this.init();
    }
    if (!this.db) return () => {};

    const stateDocRef = doc(this.db, 'x29', 'state');

    const unsubscribe = onSnapshot(
      stateDocRef,
      (docSnapshot: DocumentSnapshot) => {
        const syncStore = useSyncStore.getState();

        if (docSnapshot.metadata.hasPendingWrites) {
          // Local echo in flight
          return;
        }

        if (!docSnapshot.exists()) {
          syncStore.setCloudDocumentExists(false);
          return;
        }

        syncStore.setCloudDocumentExists(true);
        const cloudData = docSnapshot.data() as X29StateDocument;

        // SELF-WRITE ECHO SUPPRESSION:
        if (
          cloudData._lastWriteId &&
          (cloudData._lastWriteId === this.lastCommittedWriteId ||
            cloudData._lastWriteId === this.inFlightWriteId)
        ) {
          syncStore.setSaveStatus('saved');
          return;
        }

        // If local state is dirty, reconcile arrays
        if (syncStore.isLocalDirty) {
          const localData = serializeZustandToStateDocument();
          const tombstones = {
            ...(syncStore._tombstones || {}),
            ...(cloudData._tombstones || {}),
          };

          cloudData.tasks = reconcileArrays<StudyPlanDay>(
            localData.tasks || [],
            cloudData.tasks || [],
            tombstones,
            'tasks'
          );
          cloudData.customActions = reconcileArrays(
            localData.customActions || [],
            cloudData.customActions || [],
            tombstones,
            'customActions'
          );
          cloudData.paceGoals = reconcileArrays(
            localData.paceGoals || [],
            cloudData.paceGoals || [],
            tombstones,
            'paceGoals'
          );
          cloudData.timerLogs = reconcileArrays(
            localData.timerLogs || [],
            cloudData.timerLogs || [],
            tombstones,
            'timerLogs'
          );
        }

        // Hydrate reconciled state into Zustand
        hydrateZustandFromStateDocument(cloudData);
        syncStore.setSaveStatus('saved');

        if (onData) {
          onData(cloudData);
        }
      },
      (error) => {
        console.error('Firestore snapshot listener error:', error);
        useSyncStore.getState().setSaveStatus('error');
        if (onError) onError(error);
      }
    );

    this.snapshotUnsubscribe = unsubscribe;
    return unsubscribe;
  }

  /**
   * Unsubscribes from active realtime listener.
   */
  public stopSnapshotListener(): void {
    if (this.snapshotUnsubscribe) {
      this.snapshotUnsubscribe();
      this.snapshotUnsubscribe = null;
    }
  }
}

export const firestoreSyncService = new FirestoreSyncService();
