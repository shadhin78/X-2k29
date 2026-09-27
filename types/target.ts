/**
 * X-29 Advance: Multi-Tier Targets System Interfaces (Monthly, Weekly, Daily)
 */

import { DateKey, RangeKey, ISODateString, SubjectId, TrackId } from "./common";

export interface MonthlyTargetItem {
  id: string;
  subject: string;
  chapters: Array<number | string>;
  program?: string;
  track?: TrackId;
  totalSize?: number;
  completed?: boolean;
  completedSize?: number;
  monthRangeKey?: RangeKey;
  allocatedDays?: Record<string, number>; // dayKey -> fraction or size
  weeklyBindings?: Record<string, string>; // chapter -> weekKey
  notes?: string;
  createdAt?: number;
  updatedAt?: number;
  [key: string]: unknown;
}

export interface MonthlyTargetsDatabase {
  [monthRangeKey: RangeKey]: MonthlyTargetItem[];
}

export interface WeeklyTargetItem {
  id: string;
  subject: string;
  chapters: Array<number | string>;
  program?: string;
  track?: TrackId;
  weekRangeKey: RangeKey;
  parentMonthlyTargetId?: string;
  completed?: boolean;
  targetHours?: number;
  completedHours?: number;
  targetCount?: number;
  notes?: string;
  createdAt?: number;
  updatedAt?: number;
  [key: string]: unknown;
}

export interface WeeklyTargetsDatabase {
  [weekRangeKey: RangeKey]: WeeklyTargetItem[];
}

export interface DailyTargetItem {
  id: string;
  subject: string;
  chapter?: number | string;
  program?: string;
  track?: TrackId;
  targetHours?: number;
  completedHours?: number;
  completed?: boolean;
  notes?: string;
  parentWeeklyTargetId?: string;
  parentMonthlyTargetId?: string;
  dateKey: DateKey; // e.g. "23 Sep 2026"
  createdAt?: number;
  updatedAt?: number;
  [key: string]: unknown;
}

export interface DailyTargetsDatabase {
  [dateKey: DateKey]: DailyTargetItem[];
}

export interface DailyFocusTargetHistoryItem {
  date: ISODateString;
  targetHours: number;
  recordedAt: number;
}
