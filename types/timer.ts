/**
 * X-29 Advance: Focus Timer & Timer Analytics Domain Interfaces
 */

import { ISODateString } from "./common";

export type TimerMode = 'stopwatch' | 'countdown' | 'pomodoro';
export type TimerGrouping = 'daily' | 'weekly' | 'monthly';
export type TimerChartStyle = 'combo' | 'bar' | 'line';

export interface TimerLog {
  id: string;
  subject: string;
  duration: number; // in seconds
  startTime: number; // unix timestamp in ms
  endTime?: number; // unix timestamp in ms
  date: ISODateString; // e.g. "2026-09-27"
  mode?: TimerMode;
  notes?: string;
  tags?: string[];
  trackId?: string;
}

export interface ActiveTimerState {
  isRunning: boolean;
  mode: TimerMode;
  startTime: number | null;
  elapsedBeforeStart: number;
  targetDuration: number; // in seconds
  selectedSubject: string;
}

export interface TimerAnalyticsSettings {
  range: number; // e.g. 180 days
  grouping: TimerGrouping;
  chartStyle: TimerChartStyle;
  heatmapRange: number; // e.g. 365 days
  historyFilter: string; // 'all' or subject name
}
