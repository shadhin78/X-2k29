/**
 * X-29 Advance: Tasks, Tracks, and Syllabus Domain Interfaces
 */

import { ISODateString, TaskId, TrackId, SubjectId, ProgramId } from "./common";

export interface TrackTaskItem {
  subject: string;
  chapter: number | string;
  completed: boolean;
  skipped?: boolean;
  isRevision?: boolean;
  notes?: string;
  timeSpentMinutes?: number;
  [key: string]: unknown;
}

export interface StudyPlanDay {
  id: TaskId;
  date: ISODateString;
  type?: 'study' | 'rest' | 'revision' | string;
  dayOfWeek?: string;
  isHoliday?: boolean;
  holidayName?: string;
  isRevisionDay?: boolean;
  [trackTasksKey: `${string}Tasks`]: TrackTaskItem[] | unknown;
}

export type TrackDefinition = Track;

export interface Track {
  id: TrackId;
  label: string;
  color: string;
  name?: string;
  description?: string;
  icon?: string;
  order?: number;
}

export interface CustomProgram {
  name: string;
  track?: TrackId;
  description?: string;
  color?: string;
}

export interface SubjectSyllabusItem {
  program: string;
  subject: string;
  chapters: number | string[];
  track?: TrackId;
  priority?: 'high' | 'medium' | 'low';
}

export interface SyllabusStructure {
  [trackId: string]: SubjectSyllabusItem[];
}

export interface CustomActionItem {
  id: string;
  title: string;
  date: ISODateString;
  completed: boolean;
  trackId?: TrackId;
  subjectId?: SubjectId;
  category?: string;
}

export interface RevisionProgress {
  active: string[];
  progress: Record<string, number[]>; // subject -> array of completed revision chapters
}
