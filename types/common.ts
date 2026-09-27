/**
 * X-29 Advance: Common Utility and Shared Types
 */

export type ISODateString = string; // e.g. "2026-09-27"
export type ISODateTimeString = string; // e.g. "2026-09-27T14:30:00.000Z"
export type DateKey = string; // e.g. "23 Sep 2026" or "2026-09-23"
export type RangeKey = string; // e.g. "01 Sep 2026 - 30 Sep 2026"

export type ChapterStatus = 'pending' | 'completed' | 'revision' | 'skipped';

export type TaskId = string | number;
export type SubjectId = string;
export type TrackId = string;
export type ProgramId = string;

export interface ColorScheme {
  hex: string;
  border: string;
  btn: string;
  bgLt: string;
  borderLt: string;
  text: string;
  iconBg: string;
  iconColor: string;
}

export type TailwindPalette = Record<string, ColorScheme>;

export interface TombstoneMap {
  [deletedId: string]: number | { deletedAt: number; path?: string };
}
