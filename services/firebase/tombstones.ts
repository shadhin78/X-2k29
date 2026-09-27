import type { TombstoneMap } from '@/types';

function extractTombstoneTime(val: number | { deletedAt: number; path?: string } | undefined): number {
  if (typeof val === 'number') return val;
  if (val && typeof val.deletedAt === 'number') return val.deletedAt;
  return 0;
}

/**
 * Reconciles two arrays of entities based on timestamp and tombstone markers.
 * Prevents phantom resurrected records while merging concurrent mutations.
 */
export function reconcileArrays<T extends { id?: string | number; updatedAt?: number; createdAt?: number | string; [key: string]: any }>(
  localList: T[],
  cloudList: T[],
  tombstones: TombstoneMap = {},
  scopeKey: string = 'general'
): T[] {
  const mergedMap = new Map<string, { item: T; timestamp: number }>();

  // Helper to generate a stable ID for an item
  const getItemId = (item: T, index: number): string => {
    if (item.id !== undefined && item.id !== null) return String(item.id);
    if ((item as any).subject && (item as any).chapter) {
      return `${(item as any).subject}_ch${(item as any).chapter}`;
    }
    if ((item as any).date && (item as any).title) {
      return `${(item as any).date}_${(item as any).title}`;
    }
    return `${scopeKey}_${index}`;
  };

  const getItemTimestamp = (item: T): number => {
    if (typeof item.updatedAt === 'number') return item.updatedAt;
    if (typeof item.createdAt === 'number') return item.createdAt;
    if (typeof item.createdAt === 'string') {
      const parsed = new Date(item.createdAt).getTime();
      if (!Number.isNaN(parsed)) return parsed;
    }
    return 0;
  };

  // 1. Process cloud items
  cloudList.forEach((cloudItem, idx) => {
    const id = getItemId(cloudItem, idx);
    const tombstoneTime = extractTombstoneTime(tombstones[id] || tombstones[`${scopeKey}_${id}`]);
    const itemTime = getItemTimestamp(cloudItem);

    if (tombstoneTime > 0 && itemTime <= tombstoneTime) {
      // Item was deleted after or concurrently with this timestamp
      return;
    }

    mergedMap.set(id, { item: cloudItem, timestamp: itemTime });
  });

  // 2. Process local items
  localList.forEach((localItem, idx) => {
    const id = getItemId(localItem, idx);
    const tombstoneTime = extractTombstoneTime(tombstones[id] || tombstones[`${scopeKey}_${id}`]);
    const itemTime = getItemTimestamp(localItem);

    if (tombstoneTime > 0 && itemTime <= tombstoneTime) {
      // Item was deleted locally
      return;
    }

    const existing = mergedMap.get(id);
    if (!existing || itemTime >= existing.timestamp) {
      mergedMap.set(id, { item: localItem, timestamp: itemTime });
    }
  });

  return Array.from(mergedMap.values()).map((entry) => entry.item);
}

/**
 * Prunes expired tombstones older than the retention threshold (default 30 days).
 */
export function pruneExpiredTombstones(
  tombstones: TombstoneMap,
  maxAgeMs: number = 30 * 24 * 60 * 60 * 1000
): TombstoneMap {
  const cutoff = Date.now() - maxAgeMs;
  const pruned: TombstoneMap = {};

  Object.entries(tombstones).forEach(([key, val]) => {
    const time = extractTombstoneTime(val);
    if (time > cutoff) {
      pruned[key] = val;
    }
  });

  return pruned;
}
