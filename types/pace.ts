/**
 * X-29 Advance: Pace Management & Velocity Estimator Domain Interfaces
 */

import { ISODateString, TrackId, SubjectId, ProgramId } from "./common";

export interface PaceGoal {
  id: string;
  title: string;
  startDate: ISODateString;
  targetDate: ISODateString;
  targetChapters: number;
  completedChapters?: number;
  trackId?: TrackId;
  programId?: ProgramId;
  subjectId?: SubjectId;
  scopeType?: 'global' | 'track' | 'program' | 'subject';
  requiredVelocity?: number; // Chapters / Day
  currentVelocity?: number; // Chapters / Day
  notes?: string;
  createdAt?: number;
}

export interface PaceVelocityCalculation {
  velocity: number; // e.g. 2.50 Ch/Day
  requiredVelocity: number;
  daysRemaining: number;
  daysElapsed: number;
  projectedFinishDate: string;
  status: 'ahead' | 'on_track' | 'behind' | 'critical';
}

export interface IndependentPacesConfig {
  tracks: Record<string, number>;
  programs: Record<string, number>;
  subjects: Record<string, number>;
}
