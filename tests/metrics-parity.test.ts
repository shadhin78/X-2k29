import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  calculateTotalStaticChapters,
  calculateCountdown,
  calculateSuccessScore,
  calculateSubjectStats,
  calculateGlobalPace,
  calculateAllMetrics,
  formatPace,
  formatCgpa,
} from '../lib/metrics';
import type { TrackDefinition, SyllabusStructure, StudyPlanDay } from '../types';

describe('TypeScript KPI Metrics Calculation Engine Parity Suite', () => {
  const sampleTracks: TrackDefinition[] = [
    { id: 'ca', label: 'Chartered Accountancy', name: 'Chartered Accountancy', color: '#3b82f6', icon: 'calculator' },
    { id: 'bcs', label: 'BCS Cadre', name: 'BCS Cadre', color: '#10b981', icon: 'landmark' },
  ];

  const sampleSyllabus: SyllabusStructure = {
    ca: [
      { subject: 'Financial Accounting', chapters: 10, program: 'CFAP' },
      { subject: 'Taxation', chapters: 8, program: 'CFAP' },
    ],
    bcs: [
      { subject: 'Bangla Literature', chapters: 5, program: 'Prelims' },
      { subject: 'English Grammar', chapters: 4, program: 'Prelims' },
    ],
  };

  it('calculateTotalStaticChapters matches legacy formula (5 + 4 + 10 + 8 = 27)', () => {
    const total = calculateTotalStaticChapters(sampleTracks, sampleSyllabus);
    assert.strictEqual(total, 27);
  });

  it('calculateCountdown computes days left and elapsed accurately', () => {
    const refDate = new Date('2026-06-15T12:00:00.000Z');
    const start = new Date('2026-06-01T00:00:00.000Z');
    const end = new Date('2026-06-30T23:59:59.999Z');

    const countdown = calculateCountdown(start, end, refDate);
    assert.strictEqual(countdown.isDeadlineSet, true);
    assert.strictEqual(countdown.isGoalReached, false);
    assert.strictEqual(countdown.daysGone, 14); // 14 days elapsed
    assert.strictEqual(countdown.daysLeft, 16); // 16 days left until June 30 end
    assert.strictEqual(countdown.formattedDaysLeft, '16 Days');
    assert.strictEqual(countdown.formattedDaysGone, '14 Days');
  });

  it('calculateCountdown handles goal reached when reference date passes end date', () => {
    const refDate = new Date('2026-07-05T12:00:00.000Z');
    const start = new Date('2026-06-01T00:00:00.000Z');
    const end = new Date('2026-06-30T23:59:59.999Z');

    const countdown = calculateCountdown(start, end, refDate);
    assert.strictEqual(countdown.isGoalReached, true);
    assert.strictEqual(countdown.daysLeft, 0);
    assert.strictEqual(countdown.formattedDaysLeft, 'Goal Reached!');
  });

  it('calculateSuccessScore calculates percentage of passed subjects', () => {
    const passed = { programs: [], subjects: ['Bangla Literature', 'Financial Accounting'] };
    const score = calculateSuccessScore(sampleTracks, sampleSyllabus, passed, {});

    // Total subjects = 4. Passed = 2. 2/4 = 50%
    assert.strictEqual(score.totalSubjects, 4);
    assert.strictEqual(score.passedSubjects, 2);
    assert.strictEqual(score.scorePercentage, 50);
    assert.strictEqual(score.celebrationMet, false);
  });

  it('calculateSuccessScore triggers celebration when custom milestone targets are met', () => {
    const passed = { programs: [], subjects: ['Financial Accounting'] };
    const celeb = { programs: [], subjects: ['Financial Accounting'] };

    const score = calculateSuccessScore(sampleTracks, sampleSyllabus, passed, celeb);
    assert.strictEqual(score.hasCustomCelebration, true);
    assert.strictEqual(score.coreTotal, 1);
    assert.strictEqual(score.corePassed, 1);
    assert.strictEqual(score.celebrationMet, true);
  });

  it('calculateSubjectStats computes effective chapters, completed chapters, and pace', () => {
    const refDate = new Date('2026-06-10T00:00:00.000Z');
    const allSubjects = [
      { subject: 'Financial Accounting', chapters: 10, track: 'ca', program: 'CFAP' },
    ];

    const sampleTasks: StudyPlanDay[] = [
      {
        id: 1,
        date: '2026-06-01',
        type: 'study',
        caTasks: [
          { subject: 'Financial Accounting', chapter: 'Ch. 1', completed: true, completedAt: '2026-06-01T10:00:00.000Z' },
          { subject: 'Financial Accounting', chapter: 'Ch. 2', completed: true, completedAt: '2026-06-05T10:00:00.000Z' },
          { subject: 'Financial Accounting', chapter: 'Ch. 3', completed: false },
        ],
      },
    ];

    const stats = calculateSubjectStats(allSubjects, sampleTasks, sampleTracks, {}, refDate);
    const subStat = stats['Financial Accounting'];

    assert.ok(subStat);
    assert.strictEqual(subStat.totalChapters, 10);
    assert.strictEqual(subStat.tasksCompleted, 2);
    assert.strictEqual(subStat.effectiveChapters, 2);
    assert.ok(subStat.actualPace > 0);
  });

  it('calculateAllMetrics produces unified dashboard metrics summary', () => {
    const allSubjects = [
      { subject: 'Financial Accounting', chapters: 10, track: 'ca', program: 'CFAP' },
      { subject: 'Taxation', chapters: 8, track: 'ca', program: 'CFAP' },
    ];

    const summary = calculateAllMetrics(
      allSubjects,
      [],
      sampleTracks,
      sampleSyllabus,
      {},
      {},
      '2026-06-01',
      '2026-06-30',
      new Date('2026-06-10')
    );

    assert.ok(summary.overallCompletion);
    assert.strictEqual(summary.overallCompletion.totalChapters, 18);
    assert.strictEqual(summary.overallCompletion.completedChapters, 0);
    assert.strictEqual(summary.overallCompletion.percentage, 0);
    assert.ok(summary.globalPace);
    assert.strictEqual(summary.countdown.isDeadlineSet, true);
  });

  it('formatPace and formatCgpa enforce 2-decimal-place precision', () => {
    assert.strictEqual(formatPace(1.5), '1.50 Ch/Day');
    assert.strictEqual(formatPace(0), '0.00 Ch/Day');
    assert.strictEqual(formatPace(null), '-- Ch/Day');
    assert.strictEqual(formatCgpa(3.8), '3.80');
    assert.strictEqual(formatCgpa(4), '4.00');
    assert.strictEqual(formatCgpa(''), '');
  });
});
