# X-29 ADVANCE — VISUAL & DESIGN PARITY CHECKLIST

> **Document Version:** 1.0.0  
> **Date:** 2026-09-26  
> **Status:** Active Parity Verification Matrix  
> **Governing Rule:** Target Design $\equiv$ Original Design. Zero unprompted visual modifications permitted.

---

## 1. Global Visual & Aesthetic Standards

| Aesthetic Element | Original Design Specification | Target Modernized Specification | Verification Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Dark Theme** | `#0b0f19` (Deep Cosmic Space) | `#0b0f19` | **BASELINE VERIFIED** | Must match exact background hex across body & shell |
| **Secondary Dark Theme** | `#0f172a` (Deep Slate Surface) | `#0f172a` | **BASELINE VERIFIED** | Card backgrounds and modal backings |
| **Glass Card Surfaces** | `rgba(15, 23, 42, 0.75)` with `backdrop-filter: blur(12px)` | Identical CSS `.glass-card` | **BASELINE VERIFIED** | Preserved in global stylesheet |
| **Primary Accent Color** | Emerald `#10b981` / `#059669` | `#10b981` / `#059669` | **BASELINE VERIFIED** | Used for completion checkboxes, success states |
| **Secondary Accent Color**| Indigo `#6366f1` / Blue `#3b82f6` | `#6366f1` / `#3b82f6` | **BASELINE VERIFIED** | Used for active tab glows, buttons, links |
| **Warning Accent Color** | Amber `#f59e0b` / `#d97706` | `#f59e0b` / `#d97706` | **BASELINE VERIFIED** | Used for offline status, skipped tasks, warnings |
| **Danger Accent Color**  | Rose `#f43f5e` / Red `#ef4444` | `#f43f5e` / `#ef4444` | **BASELINE VERIFIED** | Used for delete buttons, sync errors, overdue |
| **Primary Typography**   | *Outfit*, *Inter*, *Plus Jakarta Sans* | Same via `next/font` | **BASELINE VERIFIED** | Zero font substitution allowed |
| **Monospace Typography** | *JetBrains Mono*, *Chakra Petch*, *Rajdhani*| Same via `next/font` | **BASELINE VERIFIED** | Used for numbers, timers, code tags, velocity |
| **Border Radii**         | `0.75rem` (12px) on cards, `9999px` on pills | Exact pixel parity | **BASELINE VERIFIED** | Sizing discipline strictly enforced |
| **Card Glow & Shadows**  | Custom box-shadows & glowing borders | Identical `.glowing-input` | **BASELINE VERIFIED** | Cyberpunk/futuristic command aesthetic |

---

## 2. Page-by-Page Parity Verification Checklist

### 2.1 Application Shell & Navigation
- **Page / Area:** Global Shell
- **Components:** Top Header, Profile Badge, Sync Status Indicator, Desktop Sidebar, Mobile Drawer, Mobile Bottom Navigation
- **Visual Parity:** Pending Component Migration (Target: Exact Match)
- **Behavior Parity:** Pending Component Migration (Target: Instant switching, mobile drawer auto-close on navigate)
- **Responsive Parity:** Pending Component Migration (Target: Breakpoint at `768px` md)
- **Status:** **PENDING MIGRATION**
- **Notes:** Fullscreen toggle, cloud sync status icons, and user avatar must render identically.

---

### 2.2 Dashboard View (`/dashboard`)
- **Page / Area:** Dashboard
- **Components:** 
  - KPI Stat Cards (Completed Chapters, Velocity, Success Score, Days Left)
  - Daily Checklist Card (Active & Overdue tasks)
  - Weekly Checklist Card (Current ISO week tasks)
  - Monthly Checklist Card (Active monthly targets)
  - Upcoming Exam Countdown Card
  - Passed Subjects Summary Card
- **Visual Parity:** Pending Step 013
- **Behavior Parity:** Pending Step 013 (Instant task toggle, optimistic KPI updates)
- **Responsive Parity:** Pending Step 013 (Grid wraps from 4 columns to 1 column on mobile)
- **Status:** **PENDING MIGRATION**
- **Notes:** Checkbox animations and progress bar fill transitions must be 100% preserved.

---

### 2.3 Spectra Analytics View (`/analytics`)
- **Page / Area:** Spectra Analytics
- **Components:**
  - Velocity Combo Chart (Line + Bar chart with Chart.js)
  - Study Commitment Index Gauge
  - Study Heatmap (GitHub-style 365-day grid with color intensity)
  - Chapter Dependency Map (Interactive matrix with status badges)
  - Time Range Filters (7d, 30d, 90d, 180d, 365d, All)
- **Visual Parity:** Pending Step 017
- **Behavior Parity:** Pending Step 017 (Tooltip hover, filter updates without chart flickering)
- **Responsive Parity:** Pending Step 017 (Horizontal scroll on heatmap on small screens)
- **Status:** **PENDING MIGRATION**
- **Notes:** Canvas background transparency and custom tooltip HTML styling must match.

---

### 2.4 Focus & Timer View (`/focus`)
- **Page / Area:** Focus Timer
- **Components:**
  - Stopwatch & Countdown Clock display
  - Preset Duration Buttons (25m, 45m, 60m, 90m, Custom)
  - Subject Tag Selector
  - Sound synthesis chime controls
  - Immersive Fullscreen Overlay Mode
  - Session History Table & Daily Focus Target Bar
- **Visual Parity:** Pending Step 016
- **Behavior Parity:** Pending Step 016 (Sub-second drift compensation, audio chimes on completion)
- **Responsive Parity:** Pending Step 016 (Fullscreen fills entire viewport on both mobile and desktop)
- **Status:** **PENDING MIGRATION**
- **Notes:** Hardware-accelerated transforms (`translate3d`) must be used for fullscreen.

---

### 2.5 Daily Actions & Targets View (`/daily-actions`)
- **Page / Area:** Daily Actions & Targets
- **Components:**
  - Daily Habits Checklist
  - Daily Action Items table
  - Monthly Targets Summary Table (MTDB)
  - Weekly Targets Grid (WTDB)
  - Monthly Target Setup Navigation
- **Visual Parity:** Pending Step 015
- **Behavior Parity:** Pending Step 015 (Auto-spread allocations, progress calculation)
- **Responsive Parity:** Pending Step 015 (Responsive card wrapping)
- **Status:** **PENDING MIGRATION**
- **Notes:** Multi-tier cascade integrity must be preserved.

---

### 2.6 Daily Schedule View (`/schedule`)
- **Page / Area:** Daily Schedule
- **Components:**
  - Routine Set 1 vs. Routine Set 2 switcher
  - Daily Timeblock List (Hour-by-hour visual schedule)
  - Active Time Slot live indicator
  - Timeblock Add/Edit Modal
- **Visual Parity:** Pending Step 018
- **Behavior Parity:** Pending Step 018 (Auto-highlighting slot based on current system time)
- **Responsive Parity:** Pending Step 018 (Mobile vertical timeline view)
- **Status:** **PENDING MIGRATION**
- **Notes:** Border highlight pulse on active slot must match `.animate-pulse`.

---

### 2.7 Subjects & Syllabus View (`/subjects`)
- **Page / Area:** Subjects Syllabus
- **Components:**
  - Academic Track Selector Tabs
  - Subject Cards with canonical colors
  - Chapter Progression Checklist
  - Chapter Status Indicators (Unstarted, In Progress, Completed, Revision)
  - Quick Search Filter
- **Visual Parity:** Pending Step 019
- **Behavior Parity:** Pending Step 019 (Chapter toggle, revision mode activation)
- **Responsive Parity:** Pending Step 019 (Card layout adapts across screen sizes)
- **Status:** **PENDING MIGRATION**
- **Notes:** Canonical subject colors (`getSubjectColor()`) must match hex codes.

---

### 2.8 Pace Management View (`/pace`)
- **Page / Area:** Pace Management
- **Components:**
  - Subject Pace Goal Cards
  - Velocity Estimators (Chapters / Day required)
  - Target Deadline Date Picker
  - Timeline Projection Chart
- **Visual Parity:** Pending Step 020
- **Behavior Parity:** Pending Step 020 (Strict 2-decimal-place velocity calculation)
- **Responsive Parity:** Pending Step 020 (Stacking on mobile)
- **Status:** **PENDING MIGRATION**
- **Notes:** Number formatting must strictly output `X.XX Ch/Day`.

---

### 2.9 Master Config & Settings View (`/settings`)
- **Page / Area:** Master Config
- **Components:**
  - Tracks & Subjects Tree Manager
  - Priority Matrix Configurator
  - Custom Programs & Syllabus Structure Editor
  - Cloud Sync Manual Trigger & Local Storage Cleaner
- **Visual Parity:** Pending Step 023
- **Behavior Parity:** Pending Step 023 (Safe deletion modal, orphan protection)
- **Responsive Parity:** Pending Step 023 (Form input scaling)
- **Status:** **PENDING MIGRATION**
- **Notes:** Zero startup null reference errors (`updateManageDropdown` permanently eliminated).

---

### 2.10 Outcome & Results View (`/outcome`)
- **Page / Area:** Outcome & Results
- **Components:**
  - Passed Subjects Checklist
  - Exam Results & Score Input Cards
  - CGPA Calculation Widget
  - Passing Grade Rules Configuration
  - Confetti Celebration Milestone Trigger
- **Visual Parity:** Pending Step 022
- **Behavior Parity:** Pending Step 022 (Calculations strictly matching legacy formulas)
- **Responsive Parity:** Pending Step 022 (Responsive cards)
- **Status:** **PENDING MIGRATION**
- **Notes:** Confetti particle count and canvas layering must match.

---

### 2.11 Exam Routine View (`/exam`)
- **Page / Area:** Exam Routine
- **Components:**
  - Exam Timetable Grid
  - Paper Dates, Times, and Duration badges
  - Countdown Timers per Paper
  - Routine Configuration Form
- **Visual Parity:** Pending Step 021
- **Behavior Parity:** Pending Step 021 (Live ticking countdown per paper)
- **Responsive Parity:** Pending Step 021 (Table wraps gracefully on mobile)
- **Status:** **PENDING MIGRATION**
- **Notes:** Date/Time format standardization strictly maintained.

---

## 3. The 40 Modals Parity Inventory

Every one of the 40 modals originally embedded in `index.html` must maintain exact element ID, styling, and behavior when migrated into Radix dialog components:

| # | Modal Element ID | Functional Responsibility | Status |
| :--- | :--- | :--- | :--- |
| 1 | `#edit-task-modal` | Edit task title, date, subject, chapter | **PENDING** |
| 2 | `#skip-task-modal` | Toggle skipped status with reason | **PENDING** |
| 3 | `#delete-task-modal` | Shift subsequent tasks and confirm deletion | **PENDING** |
| 4 | `#add-custom-task-modal` | Create custom study task | **PENDING** |
| 5 | `#edit-schedule-modal` | Add/Edit daily schedule timeblock | **PENDING** |
| 6 | `#delete-schedule-modal` | Remove schedule timeblock | **PENDING** |
| 7 | `#add-pace-goal-modal` | Set target deadline and calculate velocity | **PENDING** |
| 8 | `#edit-pace-goal-modal` | Adjust velocity target | **PENDING** |
| 9 | `#delete-pace-goal-modal` | Unlink pace goal from subject | **PENDING** |
| 10 | `#add-monthly-target-modal`| Allocate chapters to a specific month | **PENDING** |
| 11 | `#edit-monthly-target-modal`| Edit monthly target chapter count | **PENDING** |
| 12 | `#delete-monthly-target-modal`| Delete target with cascade prompt | **PENDING** |
| 13 | `#add-weekly-target-modal` | Allocate chapters to ISO calendar week | **PENDING** |
| 14 | `#edit-weekly-target-modal` | Edit weekly allocation | **PENDING** |
| 15 | `#delete-weekly-target-modal`| Delete weekly target | **PENDING** |
| 16 | `#add-daily-target-modal`  | Allocate chapters to specific date | **PENDING** |
| 17 | `#edit-daily-target-modal` | Edit daily allocation | **PENDING** |
| 18 | `#delete-daily-target-modal`| Delete daily target | **PENDING** |
| 19 | `#add-track-modal`        | Create new academic track | **PENDING** |
| 20 | `#edit-track-modal`       | Edit track name and icon | **PENDING** |
| 21 | `#delete-track-modal`     | Remove academic track with safety check | **PENDING** |
| 22 | `#add-subject-modal`      | Add subject to academic track | **PENDING** |
| 23 | `#edit-subject-modal`     | Edit subject code, name, and color | **PENDING** |
| 24 | `#delete-subject-modal`   | Delete subject with dependency check | **PENDING** |
| 25 | `#add-chapter-modal`      | Add chapter to subject syllabus | **PENDING** |
| 26 | `#edit-chapter-modal`     | Edit chapter title and order | **PENDING** |
| 27 | `#delete-chapter-modal`   | Delete chapter | **PENDING** |
| 28 | `#add-exam-session-modal` | Create upcoming exam session | **PENDING** |
| 29 | `#edit-exam-session-modal`| Edit exam dates and session metadata | **PENDING** |
| 30 | `#delete-exam-session-modal`| Delete exam session | **PENDING** |
| 31 | `#add-exam-routine-modal` | Add exam paper to routine | **PENDING** |
| 32 | `#edit-exam-routine-modal`| Edit paper date, time, and room | **PENDING** |
| 33 | `#delete-exam-routine-modal`| Delete paper from routine | **PENDING** |
| 34 | `#dadb-modal`             | Daily Action Daily Budget config dialog | **PENDING** |
| 35 | `#timer-alarm-modal`      | Fullscreen focus timer completion alarm | **PENDING** |
| 36 | `#timer-log-edit-modal`   | Edit logged focus session duration/notes | **PENDING** |
| 37 | `#timer-log-delete-modal` | Delete historic timer session log | **PENDING** |
| 38 | `#outcome-pass-config-modal`| Configure passing threshold rules | **PENDING** |
| 39 | `#outcome-celebration-modal`| Trigger celebratory milestone preview | **PENDING** |
| 40 | `#universal-confirm-modal`| Universal safety deletion confirmation | **PENDING** |
