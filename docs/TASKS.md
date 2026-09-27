# X-29 ADVANCE — IMPLEMENTATION TASK TRACKER (TASKS)

> **Document Version:** 2.0.0  
> **Date:** 2026-09-26  
> **Status:** Active Execution Checklist  
> **Governing Rule:** Never mark any task or step completed without thorough verification.

---

## Master Checklist (STEP 001 - STEP 036)

- [x] **STEP 001 — Architecture Audit & System Inventory** (COMPLETED)
- [x] **STEP 002 — Performance Baseline & Metric Profiling** (COMPLETED)
- [ ] **STEP 003 — Safety Checkpoints & Backup Verification** (NOT STARTED)
- [ ] **STEP 004 — Next.js 16 & TypeScript Build Pipeline Setup** (NOT STARTED)
- [ ] **STEP 005 — Tailwind Build Pipeline & Global Styles Modernization** (NOT STARTED)
- [ ] **STEP 006 — Core TypeScript Type System & Data Interfaces** (NOT STARTED)
- [ ] **STEP 007 — Next.js App Router Shell & Layout Structure** (NOT STARTED)
- [ ] **STEP 008 — Shared UI Primitives & Radix Dialog System** (NOT STARTED)
- [ ] **STEP 009 — Zustand Modular State Management Layer** (NOT STARTED)
- [ ] **STEP 010 — Modular Firebase & Firestore Sync Layer** (NOT STARTED)
- [ ] **STEP 011 — IndexedDB Local-First Persistence Layer** (NOT STARTED)
- [ ] **STEP 012 — Mathematical KPI & Metrics Calculation Engine Migration** (NOT STARTED)
- [ ] **STEP 013 — Dashboard Feature & KPI Cards Migration** (NOT STARTED)
- [ ] **STEP 014 — Task Engine & Study Plan Management Migration** (NOT STARTED)
- [ ] **STEP 015 — Multi-Tier Targets System Migration (Monthly, Weekly, Daily)** (NOT STARTED)
- [ ] **STEP 016 — Focus Timer & Procedural Audio Engine Migration** (NOT STARTED)
- [ ] **STEP 017 — Spectra Analytics & Heatmap Visualization Migration** (NOT STARTED)
- [ ] **STEP 018 — Daily Schedule & Timeblocking Routine Migration** (NOT STARTED)
- [ ] **STEP 019 — Subjects Syllabus & Chapter Progress Migration** (NOT STARTED)
- [ ] **STEP 020 — Pace Management & Velocity Estimator Migration** (NOT STARTED)
- [ ] **STEP 021 — Exam Routine & Countdown Timetable Migration** (NOT STARTED)
- [ ] **STEP 022 — Outcomes, Celebrations & Passing Grades Migration** (NOT STARTED)
- [ ] **STEP 023 — Master Config, Tracks & Priority Settings Migration** (NOT STARTED)
- [ ] **STEP 024 — Habits Tracker & Daily Check-in Migration** (NOT STARTED)
- [ ] **STEP 025 — 40 Modal Dialogs Full Migration & Parity Verification** (NOT STARTED)
- [ ] **STEP 026 — Monolithic `index.html` Shell Elimination** (NOT STARTED)
- [ ] **STEP 027 — Legacy JavaScript Files Decomposition & Pruning** (NOT STARTED)
- [ ] **STEP 028 — Client JavaScript Reduction & Dynamic Code-Splitting** (NOT STARTED)
- [ ] **STEP 029 — Firebase Realtime Optimization & Network Batching** (NOT STARTED)
- [ ] **STEP 030 — Mobile Touch & Low-End Android Optimization** (NOT STARTED)
- [ ] **STEP 031 — Progressive Web App (PWA) & Serwist Service Worker** (NOT STARTED)
- [ ] **STEP 032 — Offline Sync & Conflict Resolution Hardening** (NOT STARTED)
- [ ] **STEP 033 — Accessibility (a11y) & Keyboard Navigation Hardening** (NOT STARTED)
- [ ] **STEP 034 — Production Build & Bundle Optimization** (NOT STARTED)
- [ ] **STEP 035 — Full End-to-End Regression Verification** (NOT STARTED)
- [ ] **STEP 036 — Final Legacy Cleanup & Production Validation** (NOT STARTED)

---

## Detailed Task Workflows per Step

---

### STEP 001 — Architecture Audit & System Inventory
- [x] Run directory tree and file size audit across entire workspace
- [x] Profile top 25 largest files and line counts
- [x] Inspect Firestore database rules and single-document schema
- [x] Run existing test suites (`npm test`) — 14 suites, 57/57 passed
- [x] Initialize Git repository tracking and create baseline commit `fd26c21`
- [x] Generate `docs/CURRENT-STATE.md` and update `docs/ARCHITECTURE.md`
- [x] Mark step complete

---

### STEP 002 — Performance Baseline & Metric Profiling
- [x] Calculate total unminified JS payload (3,023.58 KB)
- [x] Calculate total unminified HTML payload (1,015.82 KB)
- [x] Calculate total CSS payload (52.22 KB)
- [x] Profile initial request count (47 requests) and total transfer (5.02 MB)
- [x] Document Core Web Vitals lab baseline (FCP 14.6s, LCP 29.9s, TTI 30.0s, TBT 750ms)
- [x] Generate `docs/PERFORMANCE.md` with baseline vs. target benchmarks
- [x] Mark step complete

---

### STEP 003 — Safety Checkpoints & Backup Verification
- [ ] Verify cloud database backup script (`scripts/backup.js`)
- [ ] Run dry-run verification via `scripts/verify-backup.js`
- [ ] Confirm `firebase-service-account.json` remains strictly ignored
- [ ] Confirm Firestore connection to `x29/state`
- [ ] Create Git checkpoint tag: `checkpoint-step-003`
- [ ] Update documentation & mark step complete

---

### STEP 004 — Next.js 16 & TypeScript Build Pipeline Setup
- [ ] Install Next.js, React, React DOM, and TypeScript packages
- [ ] Configure `tsconfig.json` with strict path aliases (`@/*`)
- [ ] Configure `next.config.ts` for standalone deployment
- [ ] Verify `npm run build` succeeds cleanly alongside existing tests
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 005 — Tailwind Build Pipeline & Global Styles Modernization
- [ ] Configure PostCSS and Tailwind CSS build-time pipeline
- [ ] Migrate `css/style.css` custom classes into `app/globals.css`
- [ ] Verify `.glass-card`, `.cyber-badge`, `.glowing-input` pixel accuracy
- [ ] Eliminate runtime `cdn.tailwindcss.com` dependency
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 006 — Core TypeScript Type System & Data Interfaces
- [ ] Define `types/database.ts` matching 48 keys of `x29/state`
- [ ] Define `types/task.ts` (Task, Track, Subject, Chapter, Syllabus)
- [ ] Define `types/target.ts` (Monthly, Weekly, Daily target records)
- [ ] Define `types/timer.ts` (TimerLog, ActiveTimerState)
- [ ] Define `types/exam.ts` and `types/pace.ts`
- [ ] Verify zero TypeScript errors under `strict: true`
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 007 — Next.js App Router Shell & Layout Structure
- [ ] Configure `next/font` for *Outfit*, *Inter*, *JetBrains Mono*, *Rajdhani*
- [ ] Create persistent shell `app/(main)/layout.tsx` (RSC)
- [ ] Build `Header` component with profile badge & cloud sync status
- [ ] Build `Sidebar` component with active route indicators
- [ ] Build mobile drawer and bottom navigation
- [ ] Verify visual and responsive parity against legacy shell
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 008 — Shared UI Primitives & Radix Dialog System
- [ ] Install and configure `@radix-ui/react-dialog`
- [ ] Install and configure `@radix-ui/react-dropdown-menu`
- [ ] Install and configure `@radix-ui/react-tooltip`
- [ ] Style Radix dialogs to match `.glass-card` and backdrop blur
- [ ] Verify focus management and keyboard accessibility
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 009 — Zustand Modular State Management Layer
- [ ] Implement `stores/useTaskStore.ts`
- [ ] Implement `stores/useTargetStore.ts`
- [ ] Implement `stores/usePaceStore.ts`
- [ ] Implement `stores/useTimerStore.ts`
- [ ] Implement `stores/useConfigStore.ts`
- [ ] Implement `stores/useSyncStore.ts`
- [ ] Implement bi-directional legacy adapter bridge
- [ ] Write unit tests verifying optimistic updates & state persistence
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 010 — Modular Firebase & Firestore Sync Layer
- [ ] Configure modular Firebase 12.x client in `services/firebase/client.ts`
- [ ] Port 180ms debounced autosave engine with `_lastWriteId`
- [ ] Port tombstone reconciliation algorithm for concurrent deletes
- [ ] Port real-time `onSnapshot` listener on `x29/state`
- [ ] Verify self-write echo suppression
- [ ] Run automated sync test suite
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 011 — IndexedDB Local-First Persistence Layer
- [ ] Configure `idb` client and object stores (`workspace`, `timer_logs`, `queue`)
- [ ] Implement sub-15ms cold-boot state restoration from IDB
- [ ] Implement non-blocking background write serialization
- [ ] Verify offline boot capabilities in DevTools
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 012 — Mathematical KPI & Metrics Calculation Engine Migration
- [ ] Port `recalculateTotals()`, `updateCountdown()`, `updateSuccessScore()`
- [ ] Port `updateMetrics()` and subject progress formulas
- [ ] Enforce exact 2-decimal-place velocity formatting
- [ ] Run regression suite comparing legacy vs. new metrics outputs
- [ ] Verify 100% mathematical parity
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 013 — Dashboard Feature & KPI Cards Migration
- [ ] Build KPI Stat Cards (Completed Chapters, Velocity, Success Score, Days Left)
- [ ] Build Daily Checklist Card with instant completion toggles
- [ ] Build Weekly Checklist Card and Monthly Target Card
- [ ] Build Upcoming Exam and Passed Subjects widget
- [ ] Verify visual and behavioral parity on `/dashboard`
- [ ] Run test suite `tests/tasks-metrics-dashboard.test.js`
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 014 — Task Engine & Study Plan Management Migration
- [ ] Build Study Plan generator hook with holiday avoidance
- [ ] Port `handleTaskToggle()`, `toggleSkipTask()`, `deleteTask()`
- [ ] Port revision mode and chapter progress tracking
- [ ] Verify task edit modal functionality
- [ ] Run test suite `tests/tasks-metrics-dashboard.test.js`
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 015 — Multi-Tier Targets System Migration (Monthly, Weekly, Daily)
- [ ] Port Monthly Targets Database (MTDB) allocation algorithms
- [ ] Port Weekly Targets Database (WTDB) ISO week binding
- [ ] Port Daily Targets calendar synchronization
- [ ] Verify cascade deletion and orphan cleaning
- [ ] Run test suites `tests/monthly-targets.test.js`, `tests/weekly-targets.test.js`, `tests/daily-targets.test.js`
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 016 — Focus Timer & Procedural Audio Engine Migration
- [ ] Build Web Worker-based timer engine with drift compensation
- [ ] Build procedural Web Audio synthesizer for alarms/chimes
- [ ] Build fullscreen immersive mode overlay
- [ ] Port session history logger and streak calculator
- [ ] Verify 10-minute background tab accuracy test
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 017 — Spectra Analytics & Heatmap Visualization Migration
- [ ] Implement dynamic `react-chartjs-2` Spectra velocity combo chart
- [ ] Implement GitHub-style 365-day study heatmap
- [ ] Implement interactive Chapter Dependency Map matrix
- [ ] Verify chart cleanup on unmount (zero memory leaks)
- [ ] Run test suite `tests/analytics-visualization.test.js`
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 018 — Daily Schedule & Timeblocking Routine Migration
- [ ] Implement Routine Set 1 vs 2 switcher
- [ ] Build hour-by-hour timeblock visual schedule
- [ ] Implement active slot live highlight based on system clock
- [ ] Verify timeblock add/edit/delete modals
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 019 — Subjects Syllabus & Chapter Progress Migration
- [ ] Build Track/Subject selector tabs with canonical colors
- [ ] Build Chapter progress checklist and status badges
- [ ] Implement fast search filter
- [ ] Verify single source of truth (18 chapters for Financial Accounting)
- [ ] Run test suite `tests/data-consistency.test.js`
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 020 — Pace Management & Velocity Estimator Migration
- [ ] Build Pace Goal cards with required velocity display
- [ ] Implement deadline adjustment slider & live recalculated finish date
- [ ] Verify strict 2-decimal-place velocity units (`X.XX Ch/Day`)
- [ ] Run test suite `tests/pace-outcome.test.js`
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 021 — Exam Routine & Countdown Timetable Migration
- [ ] Build Exam Timetable grid with dates, times, and subject codes
- [ ] Build live ticking countdown widget per paper
- [ ] Verify routine configuration forms
- [ ] Run test suite `tests/pace-outcome.test.js`
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 022 — Outcomes, Celebrations & Passing Grades Migration
- [ ] Build Exam Results input cards and CGPA calculator
- [ ] Build passing grade configuration interface
- [ ] Implement canvas-confetti celebration milestone trigger
- [ ] Verify numerical calculations against legacy logic
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 023 — Master Config, Tracks & Priority Settings Migration
- [ ] Build Academic Tracks manager (Add/Edit/Reorder)
- [ ] Build Priority Matrix configurator
- [ ] Build Custom Programs and Syllabus Structure editor
- [ ] Verify permanent elimination of `updateManageDropdown` startup error
- [ ] Run test suite `tests/config-tracks.test.js`
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 024 — Habits Tracker & Daily Check-in Migration
- [ ] Build Daily Habits checklist with instant completion toggles
- [ ] Implement streak counters and consistency badges
- [ ] Build DADB (Daily Action Daily Budget) modal dialogue
- [ ] Verify persistence across simulated midnight rollover
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 025 — 40 Modal Dialogs Full Migration & Parity Verification
- [ ] Migrate all 40 modal dialogues into typed React portals
- [ ] Verify exact HTML IDs, styling classes, and close triggers
- [ ] Verify keyboard shortcuts (ESC dismiss, Enter submit)
- [ ] Run automated modal test suite `tests/modals.test.js`
- [ ] Update `docs/DESIGN-PARITY.md` modal checklist
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 026 — Monolithic `index.html` Shell Elimination
- [ ] Verify all routes render cleanly via Next.js App Router
- [ ] Reconfigure server entry point to serve modern Next.js build
- [ ] Archive `index.html` safely
- [ ] Verify full test suite passes on modern entry point
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 027 — Legacy JavaScript Files Decomposition & Pruning
- [ ] Audit and remove obsolete scripts in `js/features/` and `pages/`
- [ ] Remove legacy `<script>` tags from build pipeline
- [ ] Verify zero console errors or missing global references
- [ ] Run `npm test` and verify all tests pass
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 028 — Client JavaScript Reduction & Dynamic Code-Splitting
- [ ] Configure dynamic imports for Chart.js and heavy visualizers
- [ ] Enforce React Server Components for static layouts
- [ ] Measure route-level bundle sizes (< 120 KB per route)
- [ ] Verify fast instant navigation transitions
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 029 — Firebase Realtime Optimization & Network Batching
- [ ] Implement differential write payloads for `x29/state`
- [ ] Optimize debounce scheduler for rapid user clicks
- [ ] Audit and eliminate redundant realtime snapshot reads
- [ ] Verify cloud write deduplication
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 030 — Mobile Touch & Low-End Android Optimization
- [ ] Implement `content-visibility: auto` on long task checklists
- [ ] Audit touch event listeners for passive scroll compatibility
- [ ] Test on 4x CPU slowdown in Chrome DevTools
- [ ] Verify 60fps smooth scrolling on mobile viewports
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 031 — Progressive Web App (PWA) & Serwist Service Worker
- [ ] Implement Service Worker with Serwist / Workbox
- [ ] Configure Cache-First for static assets, Network-First for API
- [ ] Verify PWA install prompt triggers and registers
- [ ] Test offline loading in airplane mode
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 032 — Offline Sync & Conflict Resolution Hardening
- [ ] Implement offline mutation queue in IndexedDB
- [ ] Implement automatic sync replay upon `online` event
- [ ] Test multi-mutation offline scenario with cloud reconciliation
- [ ] Verify zero data loss on network failure
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 033 — Accessibility (a11y) & Keyboard Navigation Hardening
- [ ] Add missing ARIA attributes to all buttons, tabs, and drawers
- [ ] Verify full keyboard focus management across all 40 modals
- [ ] Run automated Lighthouse Accessibility audit (Target: $\ge 95$)
- [ ] Verify zero visual disruption to custom design aesthetic
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 034 — Production Build & Bundle Optimization
- [ ] Optimize and compress static image assets (`logo-sticker.png`)
- [ ] Enable Brotli/Gzip compression and tree-shaking
- [ ] Run production build and verify zero bundle warnings
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 035 — Full End-to-End Regression Verification
- [ ] Run all automated test suites in `tests/`
- [ ] Verify all 11 pages match `docs/DESIGN-PARITY.md`
- [ ] Verify all 40 modals open, function, and dismiss cleanly
- [ ] Verify Firestore synchronization and local persistence
- [ ] Create Git checkpoint
- [ ] Update documentation & mark step complete

---

### STEP 036 — Final Legacy Cleanup & Production Validation
- [ ] Clean up temporary scratch scripts and audit logs
- [ ] Record final Core Web Vitals in `docs/PERFORMANCE.md`
- [ ] Update `docs/MEMORY.md` and `docs/MIGRATION-LOG.md`
- [ ] Tag final Git release: `v2.0.0-modernized`
- [ ] Mark project complete
