import { getWorkspaceDb, X29MutationQueueItem } from './idb';
import {
  serializeZustandToStateDocument,
  hydrateZustandFromStateDocument,
} from '@/stores/legacyBridge';
import { useSyncStore } from '@/stores/useSyncStore';
import type { X29StateDocument } from '@/types';

export const WORKSPACE_DOCUMENT_KEY = 'x29_active_workspace';

export class WorkspaceStorageService {
  private memoryCache: X29StateDocument | null = null;
  private pendingWriteTimer: NodeJS.Timeout | null = null;
  private writeDebounceMs: number = 250;

  /**
   * Cold-boot loader: loads workspace state in <15ms from memory or IndexedDB.
   * Hydrates domain Zustand stores immediately for zero-wait UI rendering.
   */
  public async loadWorkspace(): Promise<X29StateDocument | null> {
    if (this.memoryCache) {
      hydrateZustandFromStateDocument(this.memoryCache);
      return this.memoryCache;
    }

    try {
      const db = await getWorkspaceDb();
      if (!db) {
        // Fallback to localStorage if IDB is not supported
        return this.loadFromLocalStorageFallback();
      }

      const record = await db.get('workspace', WORKSPACE_DOCUMENT_KEY);
      if (record && record.doc) {
        this.memoryCache = record.doc;
        hydrateZustandFromStateDocument(record.doc);
        return record.doc;
      }

      // If IDB is empty, check legacy localStorage migration
      const legacy = this.loadFromLocalStorageFallback();
      if (legacy) {
        await this.persistWorkspaceNow(legacy);
        return legacy;
      }

      return null;
    } catch (err) {
      console.warn('IDB load failed, falling back to localStorage:', err);
      return this.loadFromLocalStorageFallback();
    }
  }

  /**
   * Schedules non-blocking background write to IndexedDB.
   */
  public queuePersist(): void {
    if (this.pendingWriteTimer) {
      clearTimeout(this.pendingWriteTimer);
    }

    this.pendingWriteTimer = setTimeout(() => {
      this.persistWorkspaceNow();
    }, this.writeDebounceMs);
  }

  /**
   * Immediately persists current state to IndexedDB without blocking the main UI thread.
   */
  public async persistWorkspaceNow(customDoc?: X29StateDocument): Promise<boolean> {
    const docToPersist = customDoc || serializeZustandToStateDocument();
    this.memoryCache = docToPersist;

    try {
      const db = await getWorkspaceDb();
      if (!db) {
        return this.persistToLocalStorageFallback(docToPersist);
      }

      await db.put('workspace', {
        key: WORKSPACE_DOCUMENT_KEY,
        doc: docToPersist,
        savedAt: Date.now(),
      });

      useSyncStore.getState().setLastCommittedRevision(useSyncStore.getState().localRevision);
      return true;
    } catch (err) {
      console.warn('IDB write failed, writing to fallback:', err);
      return this.persistToLocalStorageFallback(docToPersist);
    }
  }

  /**
   * Enqueues an offline mutation when network or cloud write fails.
   */
  public async enqueueMutation(type: string, payload: any): Promise<void> {
    try {
      const db = await getWorkspaceDb();
      if (!db) return;

      const item: X29MutationQueueItem = {
        id: `mut_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        timestamp: Date.now(),
        type,
        payload,
      };

      await db.put('mutation_queue', item);
    } catch (err) {
      console.error('Failed to enqueue mutation:', err);
    }
  }

  /**
   * Clears the mutation queue after successful sync replay.
   */
  public async clearMutationQueue(): Promise<void> {
    try {
      const db = await getWorkspaceDb();
      if (!db) return;
      await db.clear('mutation_queue');
    } catch (err) {
      console.error('Failed to clear mutation queue:', err);
    }
  }

  private loadFromLocalStorageFallback(): X29StateDocument | null {
    const storage = typeof window !== 'undefined' && window.localStorage ? window.localStorage : (typeof global !== 'undefined' ? (global as any).localStorage : null);
    if (!storage) return null;
    try {
      const raw = storage.getItem('localDataJSON') || storage.getItem('x29_workspace');
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        this.memoryCache = parsed;
        hydrateZustandFromStateDocument(parsed);
        return parsed;
      }
    } catch {
      return null;
    }
    return null;
  }

  private persistToLocalStorageFallback(doc: X29StateDocument): boolean {
    const storage = typeof window !== 'undefined' && window.localStorage ? window.localStorage : (typeof global !== 'undefined' ? (global as any).localStorage : null);
    if (!storage) return false;
    try {
      storage.setItem('x29_workspace', JSON.stringify(doc));
      return true;
    } catch {
      return false;
    }
  }
}

export const workspaceStorageService = new WorkspaceStorageService();
