import { describe, it } from 'node:test';
import assert from 'node:assert';
import { reconcileArrays, pruneExpiredTombstones } from '../services/firebase/tombstones';
import { FirestoreSyncService } from '../services/firebase/sync';
import { defaultFirebaseConfig } from '../services/firebase/client';
import { useSyncStore } from '../stores/useSyncStore';

describe('Modular Firebase & Firestore Sync Service Suite', () => {
  it('reconcileArrays merges non-conflicting items and respects timestamps', () => {
    const local = [
      { id: 'task-1', title: 'Task 1 Local Update', updatedAt: 200 },
      { id: 'task-2', title: 'Task 2 Local Only', updatedAt: 150 },
    ];
    const cloud = [
      { id: 'task-1', title: 'Task 1 Stale Cloud', updatedAt: 100 },
      { id: 'task-3', title: 'Task 3 Cloud Only', updatedAt: 180 },
    ];

    const result = reconcileArrays(local, cloud, {}, 'tasks');
    assert.strictEqual(result.length, 3);

    const task1 = result.find((t) => t.id === 'task-1');
    assert.strictEqual(task1?.title, 'Task 1 Local Update');

    const task2 = result.find((t) => t.id === 'task-2');
    assert.ok(task2);

    const task3 = result.find((t) => t.id === 'task-3');
    assert.ok(task3);
  });

  it('reconcileArrays suppresses resurrected records when tombstones are active', () => {
    const local: Array<{ id: string; title: string; updatedAt: number }> = [];
    const cloud = [
      { id: 'task-deleted', title: 'Ghost Task', updatedAt: 100 },
      { id: 'task-active', title: 'Active Task', updatedAt: 150 },
    ];

    const tombstones = {
      'task-deleted': 120, // Deleted at timestamp 120 > cloud updatedAt 100
    };

    const result = reconcileArrays(local, cloud, tombstones, 'tasks');
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].id, 'task-active');
  });

  it('pruneExpiredTombstones drops tombstones beyond retention horizon', () => {
    const now = Date.now();
    const tombstones = {
      recent: now - 1000,
      old: now - 40 * 24 * 60 * 60 * 1000, // 40 days old
    };

    const pruned = pruneExpiredTombstones(tombstones, 30 * 24 * 60 * 60 * 1000);
    assert.ok('recent' in pruned);
    assert.strictEqual('old' in pruned, false);
  });

  it('FirestoreSyncService creates instance with default config and tracks status', () => {
    const service = new FirestoreSyncService(defaultFirebaseConfig);
    assert.ok(service);

    useSyncStore.getState().setSaveStatus('saved');
    assert.strictEqual(useSyncStore.getState().saveStatus, 'saved');

    service.queueSave(50);
    assert.strictEqual(useSyncStore.getState().saveStatus, 'saving');
    assert.strictEqual(useSyncStore.getState().isLocalDirty, true);
  });
});
