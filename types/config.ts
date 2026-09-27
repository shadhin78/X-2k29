/**
 * X-29 Advance: Dashboard Configuration, Schedule & Settings Interfaces
 */

import { IndependentPacesConfig } from "./pace";
import { TailwindPalette } from "./common";

export interface DashboardConfig {
  topTag: string; // "X-29"
  mainTitle: string; // "X-29 Dashboard"
  subTitle: string;
  trendStartDate: string;
  trendEndDate: string;
  showDaysRemaining: boolean;
  independentPaces?: IndependentPacesConfig;
}

export interface ScheduleBlockItem {
  id: string;
  time: string; // e.g. "08:00 - 09:30"
  activity: string;
  category?: 'study' | 'break' | 'exam' | 'habit' | 'routine';
  completed?: boolean;
  notes?: string;
}

export interface ScheduleGroup {
  id: string;
  name: string;
  blocks: ScheduleBlockItem[];
  isActive?: boolean;
}

export interface FiscalTransaction {
  id: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  note?: string;
}

export interface FiscalLedger {
  transactions: FiscalTransaction[];
  budgets: unknown[];
  vaults: unknown[];
}
