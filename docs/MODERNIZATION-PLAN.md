# X-29 ADVANCE — MASTER MODERNIZATION ROADMAP

> **Document Version:** 1.0.0  
> **Date:** 2026-09-26  
> **Status:** Active Master Roadmap  
> **Repository:** X-29 Advance  
> **Execution Rule:** One numbered step at a time. Never execute without explicit command.

---

## 1. Roadmap Overview & Status Matrix

| Step | Title | Dependencies | Status |
| :--- | :--- | :--- | :--- |
| **STEP 001** | Architecture Audit & System Inventory | None | **COMPLETED** |
| **STEP 002** | Performance Baseline & Metric Profiling | STEP 001 | **COMPLETED** |
| **STEP 003** | Safety Checkpoints & Backup Verification | STEP 002 | **NOT STARTED** |
| **STEP 004** | Next.js 16 & TypeScript Build Pipeline Setup | STEP 003 | **NOT STARTED** |
| **STEP 005** | Tailwind Build Pipeline & Global Styles Modernization | STEP 004 | **NOT STARTED** |
| **STEP 006** | Core TypeScript Type System & Data Interfaces | STEP 004 | **NOT STARTED** |
| **STEP 007** | Next.js App Router Shell & Layout Structure | STEP 005, STEP 006 | **NOT STARTED** |
| **STEP 008** | Shared UI Primitives & Radix Dialog System | STEP 007 | **NOT STARTED** |
| **STEP 009** | Zustand Modular State Management Layer | STEP 006 | **NOT STARTED** |
| **STEP 010** | Modular Firebase & Firestore Sync Layer | STEP 006, STEP 009 | **NOT STARTED** |
| **STEP 011** | IndexedDB Local-First Persistence Layer | STEP 009, STEP 010 | **NOT STARTED** |
| **STEP 012** | Mathematical KPI & Metrics Calculation Engine Migration | STEP 006, STEP 009 | **NOT STARTED** |
| **STEP 013** | Dashboard Feature & KPI Cards Migration | STEP 008, STEP 012 | **NOT STARTED** |
| **STEP 014** | Task Engine & Study Plan Management Migration | STEP 009, STEP 012 | **NOT STARTED** |
| **STEP 015** | Multi-Tier Targets System Migration (Monthly, Weekly, Daily) | STEP 009, STEP 014 | **NOT STARTED** |
| **STEP 016** | Focus Timer & Procedural Audio Engine Migration | STEP 008, STEP 009 | **NOT STARTED** |
| **STEP 017** | Spectra Analytics & Heatmap Visualization Migration | STEP 009, STEP 012 | **NOT STARTED** |
| **STEP 018** | Daily Schedule & Timeblocking Routine Migration | STEP 009 | **NOT STARTED** |
| **STEP 019** | Subjects Syllabus & Chapter Progress Migration | STEP 009, STEP 014 | **NOT STARTED** |
| **STEP 020** | Pace Management & Velocity Estimator Migration | STEP 009, STEP 012 | **NOT STARTED** |
| **STEP 021** | Exam Routine & Countdown Timetable Migration | STEP 009 | **NOT STARTED** |
| **STEP 022** | Outcomes, Celebrations & Passing Grades Migration | STEP 009, STEP 012 | **NOT STARTED** |
| **STEP 023** | Master Config, Tracks & Priority Settings Migration | STEP 009 | **NOT STARTED** |
| **STEP 024** | Habits Tracker & Daily Check-in Migration | STEP 009 | **NOT STARTED** |
| **STEP 025** | 40 Modal Dialogs Full Migration & Parity Verification | STEP 008, STEP 013-024 | **NOT STARTED** |
| **STEP 026** | Monolithic `index.html` Shell Elimination | STEP 025 | **NOT STARTED** |
| **STEP 027** | Legacy JavaScript Files Decomposition & Pruning | STEP 026 | **NOT STARTED** |
| **STEP 028** | Client JavaScript Reduction & Dynamic Code-Splitting | STEP 027 | **NOT STARTED** |
| **STEP 029** | Firebase Realtime Optimization & Network Batching | STEP 010, STEP 028 | **NOT STARTED** |
| **STEP 030** | Mobile Touch & Low-End Android Optimization | STEP 028 | **NOT STARTED** |
| **STEP 031** | Progressive Web App (PWA) & Serwist Service Worker | STEP 028 | **NOT STARTED** |
| **STEP 032** | Offline Sync & Conflict Resolution Hardening | STEP 011, STEP 031 | **NOT STARTED** |
| **STEP 033** | Accessibility (a11y) & Keyboard Navigation Hardening | STEP 025, STEP 030 | **NOT STARTED** |
| **STEP 034** | Production Build & Bundle Optimization | STEP 028-033 | **NOT STARTED** |
| **STEP 035** | Full End-to-End Regression Verification | STEP 034 | **NOT STARTED** |
| **STEP 036** | Final Legacy Cleanup & Production Validation | STEP 035 | **NOT STARTED** |

---

## 2. Detailed Step Specifications

---

### STEP 001 — Architecture Audit & System Inventory
- **Objective:** Conduct a complete, non-destructive audit of all 168 workspace files, directory trees, file sizes, lines of code, database rules, dependencies, and automated tests.
- **Why Required:** To ensure comprehensive structural understanding before any code is modified.
- **Dependencies:** None.
- **Files/Modules Involved:** All repository files; `docs/CURRENT-STATE.md`, `docs/ARCHITECTURE.md`, `docs/RULES.md`.
- **Detailed Implementation Plan:**
  1. Inspect directory hierarchy and file counts by extension.
  2. Identify top largest modules and architectural bottlenecks.
  3. Validate existing test suite (`npm test`).
  4. Inspect Firestore document model and security rules (`firestore.rules`).
  5. Initialize clean Git tracking and document all findings.
- **Risk:** None (Read-only inspection).
- **Validation Method:** All test suites pass (14/14 suites, 57/57 tests); Git repository initialized with clean commit `fd26c21`.
- **Completion Criteria:** Comprehensive `docs/CURRENT-STATE.md` and updated `docs/ARCHITECTURE.md` committed.
- **Status:** **COMPLETED**

---

### STEP 002 — Performance Baseline & Metric Profiling
- **Objective:** Document an exact, reproducible performance baseline measuring build sizes, script sizes, request counts, Core Web Vitals (FCP, LCP, CLS, TTI, TBT), and network footprint.
- **Why Required:** Guarantees that future modernization produces measurable, empirical performance gains.
- **Dependencies:** STEP 001.
- **Files/Modules Involved:** `docs/PERFORMANCE.md`, `docs/PERFORMANCE-BASELINE.md`.
- **Detailed Implementation Plan:**
  1. Calculate exact byte size and line count of all JS (3,023.58 KB), HTML (1,015.82 KB), and CSS (52.22 KB).
  2. Measure initial network transfer payload (5.02 MB across 47 requests).
  3. Document lab lighthouse metrics (FCP 14.6s, LCP 29.9s, TTI 30.0s, TBT 750ms).
  4. Record Firestore operations profile (1 snapshot listener on `x29/state`).
- **Risk:** None (Measurement only).
- **Validation Method:** `docs/PERFORMANCE.md` established with complete metrics table.
- **Completion Criteria:** Permanent baseline documented and cross-verified.
- **Status:** **COMPLETED**

---

### STEP 003 — Safety Checkpoints & Backup Verification
- **Objective:** Verify and execute cloud database snapshot verification using `scripts/verify-backup.js` and establish an immutable Git rollback checkpoint.
- **Why Required:** Guarantees zero risk of data loss before introducing new dependencies or framework configuration.
- **Dependencies:** STEP 002.
- **Files/Modules Involved:** `scripts/backup.js`, `scripts/verify-backup.js`, Git repository.
- **Detailed Implementation Plan:**
  1. Run dry-run verification of backup integrity scripts.
  2. Verify that `firebase-service-account.json` remains strictly ignored by Git and inaccessible via HTTP.
  3. Verify Firestore document `x29/state` connectivity.
  4. Tag a safety release checkpoint in Git (`checkpoint-pre-framework`).
- **Risk:** Network timeout during Firestore read.
- **Validation Method:** Backup verification script completes with exit code 0; Git tree is 100% clean.
- **Completion Criteria:** Safety tag created and verified.
- **Status:** **NOT STARTED**

---

### STEP 004 — Next.js 16 & TypeScript Build Pipeline Setup
- **Objective:** Install and configure Next.js 16 (App Router), React 19, and TypeScript 5 without breaking the existing static Node server or existing tests.
- **Why Required:** Establishes the modern bundling engine capable of React Server Components, tree-shaking, and code-splitting.
- **Dependencies:** STEP 003.
- **Files/Modules Involved:** `package.json`, `tsconfig.json`, `next.config.ts`.
- **Detailed Implementation Plan:**
  1. Install Next.js, React, React DOM, and TypeScript dev dependencies.
  2. Configure `tsconfig.json` with strict type checking and `@/*` path aliases.
  3. Configure `next.config.ts` with standalone output, reactStrictMode, and compression.
  4. Add build scripts in `package.json` while keeping existing `npm test` functional.
- **Risk:** Version incompatibilities between React 19 and existing Firebase packages.
- **Validation Method:** `npm run build` or `compile_applet` succeeds cleanly.
- **Completion Criteria:** Next.js build passes with zero errors; legacy static server continues to operate side-by-side.
- **Status:** **NOT STARTED**

---

### STEP 005 — Tailwind Build Pipeline & Global Styles Modernization
- **Objective:** Replace runtime CDN Tailwind (`cdn.tailwindcss.com`) with build-time Tailwind CSS PostCSS pipeline, importing existing custom classes from `css/style.css`.
- **Why Required:** Eliminates 300ms+ of render-blocking JavaScript evaluation on every page load.
- **Dependencies:** STEP 004.
- **Files/Modules Involved:** `app/globals.css`, `tailwind.config.ts`, `postcss.config.mjs`, `css/style.css`.
- **Detailed Implementation Plan:**
  1. Configure Tailwind CSS build pipeline.
  2. Import all legacy CSS variables, custom classes (`.glass-card`, `.cyber-badge`, `.glowing-input`, `.shimmer-progress`), and animations into `app/globals.css`.
  3. Verify that every custom utility and theme color matches the legacy CSS exact hex values.
- **Risk:** CSS specificity clashes between Tailwind utility resets and legacy styles.
- **Validation Method:** Visual inspection of sample styled card; zero missing class warnings.
- **Completion Criteria:** Build-time CSS generates cleanly without runtime CDN.
- **Status:** **NOT STARTED**

---

### STEP 006 — Core TypeScript Type System & Data Interfaces
- **Objective:** Create complete, strict TypeScript interfaces for all domain models, Firestore documents, targets, tasks, syllabus, timer logs, and state.
- **Why Required:** Eliminates implicit `any` types and guarantees 100% type safety during code migration.
- **Dependencies:** STEP 004.
- **Files/Modules Involved:** `types/database.ts`, `types/task.ts`, `types/target.ts`, `types/timer.ts`, `types/config.ts`, `types/pace.ts`.
- **Detailed Implementation Plan:**
  1. Define `X29StateDocument` interface matching the exact 48 keys of `x29/state`.
  2. Define `Task`, `Track`, `Subject`, `Chapter`, `SyllabusStructure`.
  3. Define `MonthlyTarget`, `WeeklyTarget`, `DailyTarget` cascade interfaces.
  4. Define `TimerLog`, `ActiveTimerState`, `ExamSession`, `OutcomeResult`.
- **Risk:** Misrepresenting legacy loose types (e.g., numbers stored as strings).
- **Validation Method:** TypeScript compiler passes with `strict: true` and zero errors.
- **Completion Criteria:** All domain types exported and documented in `types/`.
- **Status:** **NOT STARTED**

---

### STEP 007 — Next.js App Router Shell & Layout Structure
- **Objective:** Create the persistent application shell inside `app/(main)/layout.tsx` containing the Header, Sidebar, Bottom Navigation, and Font Loader via `next/font`.
- **Why Required:** Replaces the static monolithic layout in `index.html` with an efficient, streamed Server Component shell.
- **Dependencies:** STEP 005, STEP 006.
- **Files/Modules Involved:** `app/layout.tsx`, `app/(main)/layout.tsx`, `components/shell/Header.tsx`, `components/shell/Sidebar.tsx`, `components/shell/BottomNav.tsx`.
- **Detailed Implementation Plan:**
  1. Load Google Fonts (*Outfit*, *Inter*, *JetBrains Mono*, *Rajdhani*) via `next/font/google` to eliminate external font HTTP requests.
  2. Build `Header` component replicating profile badge, sync status indicator, and quick actions.
  3. Build `Sidebar` component replicating active tab indicators, collapse toggling, and clean navigation links.
  4. Build responsive mobile drawer and bottom navigation bar.
- **Risk:** Navigation flash or layout shift during route transitions.
- **Validation Method:** Shell renders with exact pixel dimensions, colors, and responsive behavior.
- **Completion Criteria:** Shell layout matches original design with zero visual discrepancy.
- **Status:** **NOT STARTED**

---

### STEP 008 — Shared UI Primitives & Radix Dialog System
- **Objective:** Implement accessible UI primitives (Dialog, DropdownMenu, Tooltip, Tabs) using `@radix-ui/react-*`, styled identically to legacy custom elements.
- **Why Required:** Provides the foundation to eliminate 40 inline modal DOM structures from the main shell.
- **Dependencies:** STEP 007.
- **Files/Modules Involved:** `components/ui/dialog.tsx`, `components/ui/dropdown-menu.tsx`, `components/ui/tooltip.tsx`, `components/ui/tabs.tsx`.
- **Detailed Implementation Plan:**
  1. Implement accessible Modal/Dialog wrapper with backdrop blur (`rgba(11, 15, 25, 0.8)`), smooth enter/exit animations, and focus trap.
  2. Implement Dropdown Menu preserving dark styling and hover glow.
  3. Implement Tooltips replacing legacy imperative tooltip helpers (`hideChapterTooltip`).
- **Risk:** Modal styling differing from legacy `.glass-card` styling.
- **Validation Method:** Test modal opening, backdrop clicking, ESC key dismissal, and mobile viewport alignment.
- **Completion Criteria:** Accessible primitives ready for drop-in modal migration.
- **Status:** **NOT STARTED**

---

### STEP 009 — Zustand Modular State Management Layer
- **Objective:** Replace the monolithic `window.AppState` with domain-specific Zustand stores (`useTaskStore`, `useTargetStore`, `usePaceStore`, `useTimerStore`, `useConfigStore`, `useSyncStore`).
- **Why Required:** Eliminates global variable mutation, circular re-render loops, and manual reentrancy flags.
- **Dependencies:** STEP 006.
- **Files/Modules Involved:** `stores/useTaskStore.ts`, `stores/useTargetStore.ts`, `stores/usePaceStore.ts`, `stores/useTimerStore.ts`, `stores/useConfigStore.ts`, `stores/useSyncStore.ts`.
- **Detailed Implementation Plan:**
  1. Create modular stores with typed actions and reactive selectors.
  2. Implement cross-store event coordination (e.g., task toggle notifying target store and sync store).
  3. Implement legacy bridge so any remaining legacy scripts can safely read/write through Zustand.
- **Risk:** State divergence during gradual migration.
- **Validation Method:** Unit tests verifying optimistic updates, rollback capability, and state serialization.
- **Completion Criteria:** All domain stores fully typed, unit tested, and functional.
- **Status:** **NOT STARTED**

---

### STEP 010 — Modular Firebase & Firestore Sync Layer
- **Objective:** Port the advanced synchronization engine from `js/firebase.js` into a modern TypeScript service with debounced writes, optimistic updates, tombstone tracking, and self-echo avoidance.
- **Why Required:** Ensures cloud data consistency with zero regression of Firestore data.
- **Dependencies:** STEP 006, STEP 009.
- **Files/Modules Involved:** `services/firebase/client.ts`, `services/firebase/sync.ts`, `services/firebase/tombstones.ts`.
- **Detailed Implementation Plan:**
  1. Initialize modular Firebase 12.x app with Firestore targeting `x29/state`.
  2. Implement 180ms debounced auto-save with `_lastWriteId` tracking.
  3. Port tombstone reconciliation algorithm for deleted tasks and targets.
  4. Bind sync lifecycle events to `useSyncStore` for live status indicators (Saving, Saved, Local, Offline, Error).
- **Risk:** Multiple tabs causing race conditions or duplicate writes.
- **Validation Method:** Automated tests verifying write deduplication, snapshot echo suppression, and tombstone reconciliation.
- **Completion Criteria:** Clean TypeScript sync service passing all existing Firebase sync tests.
- **Status:** **NOT STARTED**

---

### STEP 011 — IndexedDB Local-First Persistence Layer
- **Objective:** Implement non-blocking IndexedDB storage (`idb`) replacing synchronous `localStorage`.
- **Why Required:** Prevents main-thread UI freezing when persisting multi-megabyte study plans and timer logs.
- **Dependencies:** STEP 009, STEP 010.
- **Files/Modules Involved:** `services/storage/idb.ts`, `services/storage/workspaceStorage.ts`.
- **Detailed Implementation Plan:**
  1. Set up IndexedDB schema with `workspace`, `timer_logs`, and `mutation_queue` object stores.
  2. Implement instant cold-boot cache loader (<15ms).
  3. Implement asynchronous background persistence on state mutation.
- **Risk:** IndexedDB quota or private browsing mode limitations.
- **Validation Method:** Verify cold-boot from IDB in offline mode; verify zero `localStorage` size overflow.
- **Completion Criteria:** App boots instantly from IDB cache with seamless cloud re-validation.
- **Status:** **NOT STARTED**

---

### STEP 012 — Mathematical KPI & Metrics Calculation Engine Migration
- **Objective:** Port all KPI calculations from `js/core/metrics.js` into pure TypeScript functions with 100% mathematical parity.
- **Why Required:** Guarantees that Total Chapters, Success Score, Countdown, Subject Progress, and Velocity values never drift.
- **Dependencies:** STEP 006, STEP 009.
- **Files/Modules Involved:** `lib/metrics.ts`, `tests/metrics-parity.test.ts`.
- **Detailed Implementation Plan:**
  1. Port `recalculateTotals()`, `updateCountdown()`, `updateSuccessScore()`, and `calculateSubjectProgress()`.
  2. Ensure exact floating-point rounding (2 decimal places for velocities and CGPA).
  3. Write exhaustive regression tests comparing legacy output vs. new TypeScript engine for 100 sample states.
- **Risk:** Subtle rounding or null-handling discrepancies.
- **Validation Method:** 100% test pass on existing `tests/tasks-metrics-dashboard.test.js` and `tests/data-consistency.test.js`.
- **Completion Criteria:** Metrics engine fully ported, strictly typed, and verified with identical numerical outputs.
- **Status:** **NOT STARTED**

---

### STEP 013 — Dashboard Feature & KPI Cards Migration
- **Objective:** Migrate the main Dashboard view into React components (`features/dashboard/`), including KPI summary cards, Daily Checklist, Weekly Checklist, Monthly Checklist, and Upcoming Exam card.
- **Why Required:** Modernizes the most frequently viewed screen for instant rendering and high responsiveness.
- **Dependencies:** STEP 008, STEP 012.
- **Files/Modules Involved:** `app/(main)/dashboard/page.tsx`, `features/dashboard/components/*`.
- **Detailed Implementation Plan:**
  1. Recreate KPI Cards (Completed Chapters, Velocity, Success Score, Days Left) with identical styles.
  2. Recreate interactive Checklist Cards with instant completion toggles.
  3. Recreate Upcoming Exam countdown widget and Passed Subjects summary card.
  4. Ensure zero reentrancy loops or unnecessary re-renders.
- **Risk:** Visual layout differences or missing filter dropdown states.
- **Validation Method:** Visual comparison against original Dashboard; all interactive toggles function identically.
- **Completion Criteria:** Dashboard page fully migrated with 100% visual and behavioral parity.
- **Status:** **NOT STARTED**

---

### STEP 014 — Task Engine & Study Plan Management Migration
- **Objective:** Migrate task scheduling, task toggling, date shifting, holiday avoidance, and revision tracking from `js/features/tasks/taskEngine.js` into typed React hooks and components.
- **Why Required:** Eliminates the 92 KB monolithic imperative task engine.
- **Dependencies:** STEP 009, STEP 012.
- **Files/Modules Involved:** `features/tasks/components/*`, `features/tasks/hooks/*`.
- **Detailed Implementation Plan:**
  1. Port `generateStudyPlan()` and `rebuildTaskDates()`.
  2. Port `handleTaskToggle()`, `toggleSkipTask()`, and `deleteTask()`.
  3. Port revision mode toggle and chapter revision progress.
  4. Integrate with `useTaskStore` and `useTargetStore`.
- **Risk:** Task date calculation off-by-one errors across leap years or holidays.
- **Validation Method:** All 36 tests in `tests/tasks-metrics-dashboard.test.js` pass cleanly.
- **Completion Criteria:** Task engine fully operational in React with identical date alignment logic.
- **Status:** **NOT STARTED**

---

### STEP 015 — Multi-Tier Targets System Migration (Monthly, Weekly, Daily)
- **Objective:** Modernize the multi-tier targets hierarchy (`monthlyTargets.js`, `weeklyTargets.js`, `dailyTargets.js`, and `monthly target setup.js`) into modular components and hooks.
- **Why Required:** Deconstructs the largest JS modules in the application (>640 KB combined).
- **Dependencies:** STEP 009, STEP 014.
- **Files/Modules Involved:** `features/targets/components/*`, `features/targets/hooks/*`.
- **Detailed Implementation Plan:**
  1. Port Monthly Targets Database (MTDB) allocation algorithms, auto-spread, and trend calculations.
  2. Port Weekly Targets Database (WTDB) ISO week binding and multi-week badges.
  3. Port Daily Targets calendar auto-sync and cascade deletion/orphan cleaning.
  4. Eliminate code duplication between `monthlyTargets.js` and `monthly target setup.js`.
- **Risk:** Cascade deletion bugs corrupting linked weekly or daily target records.
- **Validation Method:** All tests in `tests/monthly-targets.test.js`, `tests/weekly-targets.test.js`, and `tests/daily-targets.test.js` pass (42/42 tests).
- **Completion Criteria:** Targets hierarchy fully migrated with zero data cascade discrepancies.
- **Status:** **NOT STARTED**

---

### STEP 016 — Focus Timer & Procedural Audio Engine Migration
- **Objective:** Modernize `timerService.js` (113 KB, 2,495 lines) into a high-precision React timer hook, procedural Web Audio synthesizer, and immersive fullscreen overlay.
- **Why Required:** Eliminates clock drift, audio distortion, and monolithic spaghetti code in the focus timer.
- **Dependencies:** STEP 008, STEP 009.
- **Files/Modules Involved:** `features/focus/components/*`, `features/focus/hooks/useTimer.ts`, `services/audio/synthesizer.ts`.
- **Detailed Implementation Plan:**
  1. Build Web Worker-based timer engine with `performance.now()` precision drift compensation.
  2. Replicate procedural Web Audio chime sounds (no external audio file dependencies).
  3. Build fullscreen immersive view matching exact styling and hardware-accelerated transforms.
  4. Implement session logging, tag filtering, and streak calculation.
- **Risk:** Timer freezing when browser tab is backgrounded.
- **Validation Method:** Verify timer counts accurately across 10-minute backgrounded tab test; audio chimes trigger on completion.
- **Completion Criteria:** Focus timer operational with zero drift and 100% feature parity.
- **Status:** **NOT STARTED**

---

### STEP 017 — Spectra Analytics & Heatmap Visualization Migration
- **Objective:** Modernize `spectra.js`, `chapterMap.js`, and `heatmap.js` into dynamically imported React Chart.js and SVG matrix components.
- **Why Required:** Drastically reduces initial bundle size by lazy-loading heavy charting code only on `/analytics`.
- **Dependencies:** STEP 009, STEP 012.
- **Files/Modules Involved:** `app/(main)/analytics/page.tsx`, `features/analytics/components/*`.
- **Detailed Implementation Plan:**
  1. Recreate Spectra velocity line/bar combo chart using dynamic `react-chartjs-2`.
  2. Recreate GitHub-style study activity heatmap with customizable date ranges.
  3. Recreate interactive Chapter Dependency Map matrix with status colors and tooltips.
  4. Ensure charts are destroyed cleanly on unmount to prevent canvas memory leaks.
- **Risk:** Chart animation stutter or canvas memory leaks during rapid tab switching.
- **Validation Method:** All tests in `tests/analytics-visualization.test.js` pass; canvas memory verified in dev tools.
- **Completion Criteria:** Analytics page renders identically with smooth 60fps animations.
- **Status:** **NOT STARTED**

---

### STEP 018 — Daily Schedule & Timeblocking Routine Migration
- **Objective:** Migrate `scheduleRoutine.js` and `scheduleSlot.js` into clean React components managing daily routines, timeblock schedules, and active slot tracking.
- **Why Required:** Modernizes daily schedule management with instant slot switching.
- **Dependencies:** STEP 009.
- **Files/Modules Involved:** `app/(main)/schedule/page.tsx`, `features/schedule/components/*`.
- **Detailed Implementation Plan:**
  1. Recreate routine sets (Routine Set 1 vs 2) with active slot highlighting.
  2. Implement timeblock editor with validation and collision detection.
  3. Implement live clock indicator highlighting the current time slot.
- **Risk:** Timezone offset bugs altering scheduled hour calculations.
- **Validation Method:** Verify active slot updates correctly based on system clock; routine switching works instantaneously.
- **Completion Criteria:** Schedule feature operational with exact visual parity.
- **Status:** **NOT STARTED**

---

### STEP 019 — Subjects Syllabus & Chapter Progress Migration
- **Objective:** Migrate `pages/Subjects/Subjects.js` and syllabus taxonomies into interactive React components.
- **Why Required:** Replaces imperative innerHTML generation of subject chapters and progress bars.
- **Dependencies:** STEP 009, STEP 014.
- **Files/Modules Involved:** `app/(main)/subjects/page.tsx`, `features/subjects/components/*`.
- **Detailed Implementation Plan:**
  1. Recreate track/subject selector navigation with canonical subject colors.
  2. Recreate chapter list with completion badges, revision indicators, and pace goals.
  3. Implement fast search filtering and chapter status breakdown.
- **Risk:** Inconsistent chapter count between taxonomy and task engine.
- **Validation Method:** Verify 18 chapters for Financial Accounting across all views as enforced by `tests/data-consistency.test.js`.
- **Completion Criteria:** Subjects view renders instantly with verified single source of truth.
- **Status:** **NOT STARTED**

---

### STEP 020 — Pace Management & Velocity Estimator Migration
- **Objective:** Migrate `paceManager.js` and `paceEstimator.js` into typed React components and estimation algorithms.
- **Why Required:** Modernizes velocity calculations and deadline goal bindings.
- **Dependencies:** STEP 009, STEP 012.
- **Files/Modules Involved:** `app/(main)/pace/page.tsx`, `features/pace/components/*`.
- **Detailed Implementation Plan:**
  1. Recreate pace goal cards showing required velocity (Ch/Day) and target finish date.
  2. Implement velocity adjustment sliders and automatic timeline re-calculation.
  3. Enforce exact 2-decimal-place formatting for velocity units.
- **Risk:** Mathematical rounding error in required chapters per day.
- **Validation Method:** All tests in `tests/pace-outcome.test.js` pass cleanly.
- **Completion Criteria:** Pace management fully operational with exact velocity calculations.
- **Status:** **NOT STARTED**

---

### STEP 021 — Exam Routine & Countdown Timetable Migration
- **Objective:** Migrate `examRoutine.js` and `countdown.js` into clean React components managing exam timetables and dashboard countdowns.
- **Why Required:** Modernizes exam scheduling and countdown widgets.
- **Dependencies:** STEP 009.
- **Files/Modules Involved:** `app/(main)/exam/page.tsx`, `features/exam/components/*`.
- **Detailed Implementation Plan:**
  1. Recreate exam timetable grid with paper dates, times, and subject codes.
  2. Recreate countdown timer widget with Days, Hours, Minutes, Seconds display.
  3. Implement routine switcher and exam session manager.
- **Risk:** Date parsing inconsistency across browsers (Safari vs Chromium).
- **Validation Method:** Standardized exam date/time formatting verified via tests.
- **Completion Criteria:** Exam routine renders identically with live ticking countdown.
- **Status:** **NOT STARTED**

---

### STEP 022 — Outcomes, Celebrations & Passing Grades Migration
- **Objective:** Migrate `outcomeResults.js`, `outcomeCelebration.js`, and `outcomePassConfig.js` into React components.
- **Why Required:** Deconstructs 150 KB+ of outcome logic and DOM manipulation.
- **Dependencies:** STEP 009, STEP 012.
- **Files/Modules Involved:** `app/(main)/outcome/page.tsx`, `features/outcome/components/*`.
- **Detailed Implementation Plan:**
  1. Recreate grade entry and CGPA calculator with strict 2-decimal precision.
  2. Recreate celebration milestone triggers with canvas-confetti bursts.
  3. Recreate pass configuration rules per academic track.
- **Risk:** CGPA calculation discrepancy on custom grading scales.
- **Validation Method:** All tests in `tests/pace-outcome.test.js` pass cleanly.
- **Completion Criteria:** Outcome module operational with exact grade outputs and celebration effects.
- **Status:** **NOT STARTED**

---

### STEP 023 — Master Config, Tracks & Priority Settings Migration
- **Objective:** Migrate `masterConfig.js`, `tracksConfig.js`, and `priorityConfig.js` into modern settings forms.
- **Why Required:** Eliminates legacy startup DOM errors (`updateManageDropdown`) and modernizes settings management.
- **Dependencies:** STEP 009.
- **Files/Modules Involved:** `app/(main)/settings/page.tsx`, `features/config/components/*`.
- **Detailed Implementation Plan:**
  1. Recreate Academic Tracks manager (Add/Edit/Reorder tracks and subjects).
  2. Recreate Priority Matrix configuration.
  3. Recreate Custom Programs and Syllabus Structure tree editor.
- **Risk:** Accidental track deletion causing orphaned task records.
- **Validation Method:** All tests in `tests/config-tracks.test.js` pass cleanly.
- **Completion Criteria:** Settings fully functional with safe deletion guards.
- **Status:** **NOT STARTED**

---

### STEP 024 — Habits Tracker & Daily Check-in Migration
- **Objective:** Migrate `dailyTracker.js` and `dadbModal.js` into clean React habit components.
- **Why Required:** Deconstructs 100 KB+ of habit tracking and streak calculation logic.
- **Dependencies:** STEP 009.
- **Files/Modules Involved:** `features/habits/components/*`.
- **Detailed Implementation Plan:**
  1. Recreate daily habit check-in checklist with instant completion toggles.
  2. Recreate streak counters and consistency badges.
  3. Recreate DADB (Daily Action Daily Budget) modal dialogue.
- **Risk:** Midnight date rollover desynchronizing habit checkboxes.
- **Validation Method:** Verify habits persist across simulated midnight date rollover.
- **Completion Criteria:** Habit tracker fully migrated with verified streak tracking.
- **Status:** **NOT STARTED**

---

### STEP 025 — 40 Modal Dialogs Full Migration & Parity Verification
- **Objective:** Extract and migrate all 40 distinct modal dialogues currently embedded inside `index.html` into typed, on-demand React portal dialogs using the Radix system built in STEP 008.
- **Why Required:** Prunes over 350 KB of static DOM overhead from initial page load.
- **Dependencies:** STEP 008, STEP 013-024.
- **Files/Modules Involved:** `components/modals/*`, `tests/modals.test.js`.
- **Detailed Implementation Plan:**
  1. Systematically migrate each modal: Edit Task, Skip Task, Delete Task, Add Target, Edit Target, Focus Alarm, DADB, Track Config, Exam Edit, etc.
  2. Preserve exact HTML element IDs, class names, button styling, and keyboard shortcuts (ESC to close, Enter to submit).
  3. Test universal dismissal and event delegation.
- **Risk:** Missing input fields or broken form submission handlers.
- **Validation Method:** All 40 modals pass automated modal verification in `tests/modals.test.js`.
- **Completion Criteria:** All 40 modals migrated to on-demand React portals with zero missing elements.
- **Status:** **NOT STARTED**

---

### STEP 026 — Monolithic `index.html` Shell Elimination
- **Objective:** Switch the default application entry point from legacy `index.html` to the Next.js App Router root layout and pages.
- **Why Required:** Permanently eliminates the 592 KB monolithic HTML file.
- **Dependencies:** STEP 025.
- **Files/Modules Involved:** `index.html`, `server.js`, `next.config.ts`.
- **Detailed Implementation Plan:**
  1. Verify all routes (`/dashboard`, `/analytics`, `/focus`, `/daily-actions`, `/schedule`, `/targets`, `/subjects`, `/pace`, `/settings`, `/outcome`, `/exam`) render cleanly via Next.js.
  2. Update server routing to serve Next.js application on port 3000.
  3. Archive `index.html` safely.
- **Risk:** Broken static asset paths or 404 on deep links.
- **Validation Method:** Full regression suite passes on new Next.js entry point.
- **Completion Criteria:** Application boots directly through Next.js App Router with zero reference to `index.html`.
- **Status:** **NOT STARTED**

---

### STEP 027 — Legacy JavaScript Files Decomposition & Pruning
- **Objective:** Safely decommission and archive the 25 legacy unbundled JavaScript scripts in `js/features/`, `js/core/`, `js/services/`, and `pages/`.
- **Why Required:** Eliminates 3.02 MB of obsolete unbundled JavaScript from the repository.
- **Dependencies:** STEP 026.
- **Files/Modules Involved:** `js/`, `pages/`, `archive/`.
- **Detailed Implementation Plan:**
  1. Verify zero remaining runtime dependencies on legacy `.js` files.
  2. Move deprecated scripts to `archive/` or remove in accordance with the Legacy Cleanup Rule.
  3. Remove legacy `<script>` tags from build.
- **Risk:** Accidental removal of active utility functions.
- **Validation Method:** Full test suite passes; zero console errors on startup.
- **Completion Criteria:** Legacy JS files safely pruned; Git commit checkpoint created.
- **Status:** **NOT STARTED**

---

### STEP 028 — Client JavaScript Reduction & Dynamic Code-Splitting
- **Objective:** Optimize bundle sizes through aggressive code-splitting, dynamic imports (`next/dynamic`), and React Server Components.
- **Why Required:** Slashes initial client JavaScript from >3.0 MB to <150 KB.
- **Dependencies:** STEP 027.
- **Files/Modules Involved:** Route definitions, dynamic import boundaries.
- **Detailed Implementation Plan:**
  1. Dynamically import Chart.js and heavy charting modules on `/analytics`.
  2. Dynamically import confetti and celebration effects on `/outcome`.
  3. Ensure each route loads strictly its own code slice.
- **Risk:** Flash of unstyled loading state during page navigation.
- **Validation Method:** Next.js bundle analyzer reports route JS sizes < 150 KB gzipped.
- **Completion Criteria:** Initial JS payload drastically reduced; zero unnecessary cross-route scripts loaded.
- **Status:** **NOT STARTED**

---

### STEP 029 — Firebase Realtime Optimization & Network Batching
- **Objective:** Optimize Firestore network operations by introducing write batching, intelligent differential payloads, and query caching.
- **Why Required:** Minimizes cloud bandwidth, reduces latency, and prevents excessive Firestore operations.
- **Dependencies:** STEP 010, STEP 028.
- **Files/Modules Involved:** `services/firebase/sync.ts`.
- **Detailed Implementation Plan:**
  1. Optimize debounced write scheduler to batch rapid interactions.
  2. Implement differential payload generation while maintaining compatibility with the monolithic `x29/state` document.
  3. Audit real-time listener unsubscriptions.
- **Risk:** Sync race conditions or stale cloud state.
- **Validation Method:** Measure Firestore write frequency; verify zero lost updates under rapid input tests.
- **Completion Criteria:** Firebase sync latency reduced; bandwidth optimized.
- **Status:** **NOT STARTED**

---

### STEP 030 — Mobile Touch & Low-End Android Optimization
- **Objective:** Optimize performance, touch targets, scrolling, and memory consumption for low-end Android mobile devices.
- **Why Required:** Ensures smooth 60fps performance on real mobile hardware.
- **Dependencies:** STEP 028.
- **Files/Modules Involved:** Layout stylesheets, touch event listeners, viewport meta.
- **Detailed Implementation Plan:**
  1. Implement CSS `contain: content` and `content-visibility: auto` on long task and syllabus lists.
  2. Audit touch event listeners for passive scroll compatibility (`passive: true`).
  3. Optimize mobile drawer gestures and bottom navigation bar responsiveness.
- **Risk:** Touch event interception blocking normal scrolling.
- **Validation Method:** Chrome DevTools mobile CPU throttling (4x slowdown) test verifies smooth scrolling and responsive taps.
- **Completion Criteria:** Mobile performance scores improved; zero scroll stutter or touch latency.
- **Status:** **NOT STARTED**

---

### STEP 031 — Progressive Web App (PWA) & Serwist Service Worker
- **Objective:** Implement a production-grade Service Worker using Serwist / Workbox with offline asset caching and in-app install prompts.
- **Why Required:** Transforms X-29 into a reliable, installable offline-capable Progressive Web App.
- **Dependencies:** STEP 028.
- **Files/Modules Involved:** `app/manifest.ts`, `sw.ts`, `services/pwa/installPrompt.ts`.
- **Detailed Implementation Plan:**
  1. Implement modern Service Worker with Cache-First strategy for static assets and Network-First for API/data.
  2. Configure PWA manifest with icons, theme colors, and display mode.
  3. Recreate custom PWA in-app installation banner.
- **Risk:** Stale cache serving outdated JavaScript after app updates.
- **Validation Method:** Verify offline mode in DevTools Network tab; verify PWA install prompt triggers.
- **Completion Criteria:** PWA audit passes with 100% installability; offline mode operates reliably.
- **Status:** **NOT STARTED**

---

### STEP 032 — Offline Sync & Conflict Resolution Hardening
- **Objective:** Harden offline write queuing and reconciliation between IndexedDB and Firestore when returning online.
- **Why Required:** Guarantees zero study session data loss when studying without internet connectivity.
- **Dependencies:** STEP 011, STEP 031.
- **Files/Modules Involved:** `services/storage/offlineQueue.ts`, `services/firebase/sync.ts`.
- **Detailed Implementation Plan:**
  1. Queue offline mutations in IndexedDB `mutation_queue`.
  2. Listen for `navigator.onLine` and `window.addEventListener('online')`.
  3. Replay queued mutations with tombstone conflict resolution upon reconnection.
- **Risk:** Conflict overwrite when re-connecting from multiple offline devices.
- **Validation Method:** Automated offline test: disconnect network, perform 5 task toggles, re-connect network, verify cloud state reconciles correctly.
- **Completion Criteria:** Offline queue reliably syncs on network recovery with zero data loss.
- **Status:** **NOT STARTED**

---

### STEP 033 — Accessibility (a11y) & Keyboard Navigation Hardening
- **Objective:** Enhance keyboard navigation, ARIA attributes, focus management, and screen reader announcements across all views and modals.
- **Why Required:** Raises accessibility score from 80 to 95+ without changing visual appearance.
- **Dependencies:** STEP 025, STEP 030.
- **Files/Modules Involved:** Component JSX templates, ARIA labels, focus traps.
- **Detailed Implementation Plan:**
  1. Add missing `aria-label`, `aria-expanded`, and `role` attributes to buttons, drawers, and modal dialogs.
  2. Verify keyboard navigation (Tab, Shift+Tab, Enter, Space, Escape) through all interactive workflows.
  3. Ensure visible focus indicators match the dark aesthetic without layout shift.
- **Risk:** Visual disruption from default browser focus outlines.
- **Validation Method:** Automated axe-core / Lighthouse Accessibility audit scores $\ge 95$.
- **Completion Criteria:** All interactive elements accessible via keyboard with zero visual regressions.
- **Status:** **NOT STARTED**

---

### STEP 034 — Production Build & Bundle Optimization
- **Objective:** Configure production build optimizations, asset compression (Brotli/Gzip), image optimization (`next/image`), and tree-shaking.
- **Why Required:** Ensures maximum production speed and minimal cold-start times on Vercel and Node environments.
- **Dependencies:** STEP 028-033.
- **Files/Modules Involved:** `next.config.ts`, `package.json`, image assets.
- **Detailed Implementation Plan:**
  1. Compress high-resolution image assets (`icons/logo-sticker.png` from 656 KB to <100 KB WebP).
  2. Enable production source maps and asset compression.
  3. Verify standalone production server build.
- **Risk:** Build failure under strict production optimization flags.
- **Validation Method:** `npm run build` succeeds cleanly with optimal bundle size report.
- **Completion Criteria:** Production build verified with significant size reduction.
- **Status:** **NOT STARTED**

---

### STEP 035 — Full End-to-End Regression Verification
- **Objective:** Run exhaustive automated and manual regression tests across all 11 views, 40 modals, target calculations, pace velocities, and cloud synchronization.
- **Why Required:** Proves 100% functional, mathematical, and visual parity before decommissioning legacy systems.
- **Dependencies:** STEP 034.
- **Files/Modules Involved:** All test suites in `tests/`, `docs/DESIGN-PARITY.md`.
- **Detailed Implementation Plan:**
  1. Execute all 14 existing automated test suites.
  2. Execute new component and integration test suites.
  3. Verify all checklist items in `docs/DESIGN-PARITY.md`.
  4. Verify zero console errors, zero uncaught promises, and zero memory leaks.
- **Risk:** Uncovering edge-case regression in complex target cascade.
- **Validation Method:** 100% of test assertions pass; all parity checklist items marked verified.
- **Completion Criteria:** Full regression verified with written evidence.
- **Status:** **NOT STARTED**

---

### STEP 036 — Final Legacy Cleanup & Production Validation
- **Objective:** Safely archive obsolete legacy code, finalize documentation in `docs/`, and generate the final before/after performance report.
- **Why Required:** Concludes the technology modernization project with a pristine, maintainable repository.
- **Dependencies:** STEP 035.
- **Files/Modules Involved:** `docs/PERFORMANCE.md`, `docs/MEMORY.md`, `docs/MIGRATION-LOG.md`, repository root.
- **Detailed Implementation Plan:**
  1. Clean up unused temporary files and scratch scripts.
  2. Record final Core Web Vitals and bundle metrics in `docs/PERFORMANCE.md`.
  3. Finalize `docs/MEMORY.md` and `docs/MIGRATION-LOG.md`.
  4. Tag final Git release: `v2.0.0-modernized`.
- **Risk:** Accidental deletion of documentation or assets.
- **Validation Method:** Production server starts, loads, and passes health check with clean logs.
- **Completion Criteria:** Final production state validated and documented.
- **Status:** **NOT STARTED**
