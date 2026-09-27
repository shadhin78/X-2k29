import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  useTaskStore,
  useTargetStore,
  usePaceStore,
  useTimerStore,
  useConfigStore,
  useSyncStore,
  serializeZustandToStateDocument,
  hydrateZustandFromStateDocument,
  initLegacyAppStateBridge,
} from '../stores/index';
import type { StudyPlanDay, MonthlyTargetItem } from '../types/index';

describe('Zustand Modular Stores & Legacy Bridge Suite', () => {
  it('useTaskStore initializes with default state and mutates tasks correctly', () => {
    const { setTasks, resetTasks } = useTaskStore.getState();
    resetTasks();

    const sampleDay: StudyPlanDay = {
      id: 'task-day-1',
      date: '2026-10-01',
      dayOfWeek: 'Thu',
      track1Tasks: [
        {
          subject: 'Financial Accounting',
          chapter: '1',
          completed: false,
          isRevision: false,
        },
      ],
    };

    setTasks([sampleDay]);
    assert.strictEqual(useTaskStore.getState().tasks.length, 1);
    assert.strictEqual(useTaskStore.getState().tasks[0].id, 'task-day-1');

    resetTasks();
    assert.strictEqual(useTaskStore.getState().tasks.length, 0);
  });

  it('useTargetStore accurately handles multi-tier targets insertion and deletion', () => {
    const { addMonthlyTarget, deleteMonthlyTarget, setDailyFocusHoursTarget, resetTargets } =
      useTargetStore.getState();
    resetTargets();

    const targetItem: MonthlyTargetItem = {
      id: 'mt-1',
      subject: 'Financial Accounting',
      chapters: [1, 2, 3],
      totalSize: 3,
      completed: false,
      monthRangeKey: '2026-10',
    };

    addMonthlyTarget('2026-10', targetItem);

    const mtdb = useTargetStore.getState().monthlyTargetsDatabase;
    assert.ok(mtdb['2026-10']);
    assert.strictEqual(mtdb['2026-10'].length, 1);
    assert.strictEqual(mtdb['2026-10'][0].subject, 'Financial Accounting');

    setDailyFocusHoursTarget(6, '2026-10-01');
    assert.strictEqual(useTargetStore.getState().dailyFocusHoursTarget, 6);
    assert.strictEqual(useTargetStore.getState().dailyFocusHoursTargetDate, '2026-10-01');

    deleteMonthlyTarget('2026-10', 'mt-1');
    assert.strictEqual(useTargetStore.getState().monthlyTargetsDatabase['2026-10'].length, 0);
  });

  it('useTimerStore tracks active timer and logs without drift', () => {
    const { startTimer, pauseTimer, addTimerLog, resetTimerState } = useTimerStore.getState();
    resetTimerState();

    startTimer('Corporate Law', 'countdown', 1500);
    const active = useTimerStore.getState().activeTimerState;
    assert.strictEqual(active.isRunning, true);
    assert.strictEqual(active.selectedSubject, 'Corporate Law');
    assert.strictEqual(active.mode, 'countdown');

    pauseTimer();
    const paused = useTimerStore.getState().activeTimerState;
    assert.strictEqual(paused.isRunning, false);
    assert.strictEqual(paused.startTime, null);

    addTimerLog({
      id: 'log-1',
      subject: 'Corporate Law',
      startTime: 1000,
      endTime: 2000,
      duration: 1000,
      date: '2026-10-01',
      mode: 'countdown',
    });

    assert.strictEqual(useTimerStore.getState().timerLogs.length, 1);
    assert.strictEqual(useTimerStore.getState().timerLogs[0].id, 'log-1');
  });

  it('serialization and hydration preserve the 48-key X29StateDocument schema', () => {
    const doc = serializeZustandToStateDocument();
    assert.strictEqual(typeof doc, 'object');
    assert.ok('tasks' in doc);
    assert.ok('tracks' in doc);
    assert.ok('monthlyTargetsDatabase' in doc);
    assert.ok('timerLogs' in doc);
    assert.ok('dashboardConfig' in doc);
    assert.ok('_tombstones' in doc);

    hydrateZustandFromStateDocument({
      dailyFocusHoursTarget: 8,
      dashboardConfig: {
        topTag: 'X-29-TURBO',
        mainTitle: 'Custom Modern Title',
        subTitle: 'Sub',
        trendStartDate: '',
        trendEndDate: '',
        showDaysRemaining: true,
        independentPaces: { tracks: {}, programs: {}, subjects: {} },
      },
    });

    assert.strictEqual(useTargetStore.getState().dailyFocusHoursTarget, 8);
    assert.strictEqual(useConfigStore.getState().dashboardConfig.topTag, 'X-29-TURBO');
  });

  it('legacy bridge synchronizes Zustand mutations to window.AppState', () => {
    initLegacyAppStateBridge();
    const root = (typeof window !== 'undefined' ? window : global) as any;
    assert.ok(root.AppState);

    useConfigStore.getState().setDashboardConfig({ topTag: 'BRIDGE-TEST-PASS' });
    assert.strictEqual(root.AppState.dashboardConfig.topTag, 'BRIDGE-TEST-PASS');
  });
});
