import { openDB, IDBPDatabase } from 'idb';
import type { X29StateDocument, TimerLog } from '@/types';

export const X29_IDB_DATABASE_NAME = 'x29_workspace_db';
export const X29_IDB_VERSION = 1;

export interface X29MutationQueueItem {
  id: string;
  timestamp: number;
  type: string;
  payload: any;
}

export interface X29Schema {
  workspace: {
    key: string;
    value: {
      key: string;
      doc: X29StateDocument;
      savedAt: number;
    };
  };
  timer_logs: {
    key: string;
    value: TimerLog;
    indexes: {
      'by-date': string;
      'by-subject': string;
    };
  };
  mutation_queue: {
    key: string;
    value: X29MutationQueueItem;
  };
}

let dbPromise: Promise<IDBPDatabase<X29Schema>> | null = null;

/**
 * Gets or initializes the IndexedDB database instance with typed object stores.
 */
export function getWorkspaceDb(): Promise<IDBPDatabase<X29Schema>> | null {
  if (typeof window === 'undefined' && typeof indexedDB === 'undefined') {
    return null;
  }

  if (!dbPromise) {
    dbPromise = openDB<X29Schema>(X29_IDB_DATABASE_NAME, X29_IDB_VERSION, {
      upgrade(db) {
        // 1. Workspace document store
        if (!db.objectStoreNames.contains('workspace')) {
          db.createObjectStore('workspace', { keyPath: 'key' });
        }

        // 2. High-volume timer logs store with indexes
        if (!db.objectStoreNames.contains('timer_logs')) {
          const timerStore = db.createObjectStore('timer_logs', { keyPath: 'id' });
          timerStore.createIndex('by-date', 'date');
          timerStore.createIndex('by-subject', 'subject');
        }

        // 3. Offline mutation queue store
        if (!db.objectStoreNames.contains('mutation_queue')) {
          db.createObjectStore('mutation_queue', { keyPath: 'id' });
        }
      },
    });
  }

  return dbPromise;
}
