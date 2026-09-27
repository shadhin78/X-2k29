/**
 * X-29 Advance: Exam Routine, Countdown & Academic Outcome Interfaces
 */

import { ISODateString, ISODateTimeString, SubjectId, TrackId } from "./common";

export interface ExamSession {
  id: string;
  title: string;
  examDate: ISODateString;
  sessionTime?: string; // e.g. "10:00 AM"
  subjectId?: SubjectId;
  subjectName?: string;
  trackId?: TrackId;
  program?: string;
  name?: string;
  location?: string;
  seatNumber?: string;
  notes?: string;
  createdAt?: number;
}

export type ExamSessionItem = ExamSession;

export interface ExamRoutineItem {
  id: string;
  date: ISODateString;
  time?: string;
  startTime?: string;
  endTime?: string;
  subject: string;
  title?: string;
  code?: string;
  program?: string;
  sessionId?: string;
  paper?: string;
  room?: string;
  trackId?: TrackId;
  status?: string;
}

export interface PassedItemsRegistry {
  programs: string[];
  subjects: string[];
}

export interface CelebrationTargetsRegistry {
  programs: string[];
  subjects: string[];
}

export interface OutcomeResult {
  id: string;
  subject?: string;
  title?: string;
  examDate?: ISODateString;
  date?: ISODateString;
  grade?: string; // e.g. "A+", "4.00"
  cgpa?: number; // e.g. 4.00
  value?: string;
  targetCGPA?: string;
  targetGrade?: string;
  evaluationType?: 'cgpa' | 'grade' | string;
  type?: 'cgpa' | 'achievement' | string;
  status?: 'pass' | 'fail' | string;
  score?: number;
  maxScore?: number;
  notes?: string;
  createdAt?: number;
}

export type SuccessResultItem = OutcomeResult;
