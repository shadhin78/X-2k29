import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { WorkspaceStorageService, WORKSPACE_DOCUMENT_KEY } from '../services/storage/workspaceStorage';
import { serializeZustandToStateDocument, hydrateZustandFromStateDocument } from '../stores/legacyBridge';
import { useConfigStore } from '../stores/useConfigStore';
import { useTargetStore } from '../stores/useTargetStore';

describe('IndexedDB & Workspace Storage Service Suite', () => {
  let mockStorage: Record<string, string> = {};

  beforeEach(() => {
    mockStorage = {};
    (global as any).localStorage = {
      getItem: (k: string) => mockStorage[k] || null,
      setItem: (k: string, v: string) => {
        mockStorage[k] = v;
      },
      removeItem: (k: string) => {
        delete mockStorage[k];
      },
      clear: () => {
        mockStorage = {};
      },
    };
  });

  it('WorkspaceStorageService initializes and persists state safely', async () => {
    const service = new WorkspaceStorageService();
    useConfigStore.getState().setDashboardConfig({ topTag: 'X29-IDB-TEST' });

    const stateDoc = serializeZustandToStateDocument();
    const success = await service.persistWorkspaceNow(stateDoc);

    assert.strictEqual(success, true);
    assert.ok(mockStorage['x29_workspace']);
    const saved = JSON.parse(mockStorage['x29_workspace']);
    assert.strictEqual(saved.dashboardConfig.topTag, 'X29-IDB-TEST');
  });

  it('cold-boot loader hydrates Zustand stores from stored workspace document', async () => {
    const service = new WorkspaceStorageService();
    const testDoc = {
      ...serializeZustandToStateDocument(),
      dailyFocusHoursTarget: 7.5,
      dashboardConfig: {
        topTag: 'COLD-BOOT-VERIFIED',
        mainTitle: 'X-29 Dashboard',
        subTitle: '',
        trendStartDate: '',
        trendEndDate: '',
        showDaysRemaining: false,
        independentPaces: { tracks: {}, programs: {}, subjects: {} },
      },
    };

    mockStorage['x29_workspace'] = JSON.stringify(testDoc);

    const loaded = await service.loadWorkspace();
    assert.ok(loaded);
    assert.strictEqual(loaded.dailyFocusHoursTarget, 7.5);
    assert.strictEqual(useTargetStore.getState().dailyFocusHoursTarget, 7.5);
    assert.strictEqual(useConfigStore.getState().dashboardConfig.topTag, 'COLD-BOOT-VERIFIED');
  });

  it('handles corrupted storage payload gracefully without crashing', async () => {
    const service = new WorkspaceStorageService();
    mockStorage['x29_workspace'] = '{malformed_json...';

    const loaded = await service.loadWorkspace();
    assert.strictEqual(loaded, null);
  });
});
