import { describe, it } from 'node:test';
import assert from 'node:assert';
import { useTargetStore } from '../stores/useTargetStore';
import { useTaskStore } from '../stores/useTaskStore';
import { useConfigStore } from '../stores/useConfigStore';
import { calculateAllMetrics } from '../lib/metrics';
import type { DailyTargetItem, WeeklyTargetItem, MonthlyTargetItem } from '../types';

describe('Modern Dashboard Feature & KPI Components Suite', () => {
  it('useTargetStore allows adding and toggling daily targets with instant state change', () => {
    const store = useTargetStore.getState();
    const todayStr = '2026-09-27';

    const testItem: DailyTargetItem = {
      id: 'dt-test-1',
      subject: 'Financial Accounting',
      chapter: 'Ch. 1',
      completed: false,
      dateKey: todayStr,
    };

    store.addDailyTarget(todayStr, testItem);
    const added = useTargetStore.getState().dailyTargetsDatabase[todayStr];
    assert.ok(added);
    assert.strictEqual(added.find((t) => t.id === 'dt-test-1')?.completed, false);

    // Toggle target to true
    useTargetStore.getState().toggleDailyTarget(todayStr, 'dt-test-1', true);
    const toggled = useTargetStore.getState().dailyTargetsDatabase[todayStr];
    assert.strictEqual(toggled.find((t) => t.id === 'dt-test-1')?.completed, true);
  });

  it('useTargetStore allows adding and toggling weekly and monthly targets', () => {
    const store = useTargetStore.getState();
    const weekKey = '21 Sep 2026 - 27 Sep 2026';
    const monthKey = '01 Sep 2026 - 30 Sep 2026';

    const weeklyItem: WeeklyTargetItem = {
      id: 'wt-test-1',
      subject: 'Taxation',
      chapters: [1, 2],
      weekRangeKey: weekKey,
      completed: false,
    };

    const monthlyItem: MonthlyTargetItem = {
      id: 'mt-test-1',
      subject: 'Audit',
      chapters: [1, 2, 3],
      monthRangeKey: monthKey,
      completed: false,
    };

    store.addWeeklyTarget(weekKey, weeklyItem);
    store.addMonthlyTarget(monthKey, monthlyItem);

    assert.strictEqual(useTargetStore.getState().weeklyTargetsDatabase[weekKey][0].completed, false);
    assert.strictEqual(useTargetStore.getState().monthlyTargetsDatabase[monthKey][0].completed, false);

    // Toggle completions
    useTargetStore.getState().toggleWeeklyTarget(weekKey, 'wt-test-1', true);
    useTargetStore.getState().toggleMonthlyTarget(monthKey, 'mt-test-1', true);

    assert.strictEqual(useTargetStore.getState().weeklyTargetsDatabase[weekKey][0].completed, true);
    assert.strictEqual(useTargetStore.getState().monthlyTargetsDatabase[monthKey][0].completed, true);
  });

  it('calculateAllMetrics produces reactive metrics for DashboardView', () => {
    const allSubjects = [
      { subject: 'Financial Accounting', chapters: 10, track: 'ca', program: 'CFAP' },
      { subject: 'Taxation', chapters: 8, track: 'ca', program: 'CFAP' },
    ];

    const tracks = [
      { id: 'ca', label: 'CA', name: 'CA', color: '#3b82f6', icon: 'calculator' },
    ];

    const syllabus = {
      ca: [
        { subject: 'Financial Accounting', chapters: 10, program: 'CFAP' },
        { subject: 'Taxation', chapters: 8, program: 'CFAP' },
      ],
    };

    const summary = calculateAllMetrics(
      allSubjects,
      [],
      tracks,
      syllabus,
      { programs: [], subjects: ['Financial Accounting'] },
      {},
      '2026-09-01',
      '2026-10-31',
      new Date('2026-09-27')
    );

    assert.ok(summary.overallCompletion);
    assert.strictEqual(summary.overallCompletion.totalChapters, 18);
    // Financial Accounting is passed, so its 10 chapters are effective chapters
    assert.strictEqual(summary.overallCompletion.completedChapters, 10);
    assert.strictEqual(summary.overallCompletion.percentage, 56); // 10/18 = 55.55% -> 56%
    assert.strictEqual(summary.successScore.passedSubjects, 1);
    assert.strictEqual(summary.successScore.scorePercentage, 50); // 1 out of 2 passed = 50%
  });

  it('Dashboard configuration correctly synchronizes with useConfigStore', () => {
    useConfigStore.getState().setDashboardConfig({
      topTag: 'TEST-X29',
      mainTitle: 'Modernized Workspace',
      subTitle: 'Fully Reactive Next.js Dashboard',
    });

    const cfg = useConfigStore.getState().dashboardConfig;
    assert.strictEqual(cfg.topTag, 'TEST-X29');
    assert.strictEqual(cfg.mainTitle, 'Modernized Workspace');
    assert.strictEqual(cfg.subTitle, 'Fully Reactive Next.js Dashboard');
  });
});
