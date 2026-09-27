# X-29 ADVANCE — PERSISTENT PROJECT MEMORY LEDGER

> **Document Version:** 2.0.0  
> **Date:** 2026-09-26  
> **Status:** Active Memory Ledger  
> **Master Rule:** This file preserves the complete contextual state across AI sessions. Update after every completed step.

---

## Current Step
- **Current Step:** STEP 012 — Mathematical KPI & Metrics Calculation Engine Migration (COMPLETED).
- **Status:** READY FOR STEP 013.

---

## Previous Completed Step
- **Previous Completed Step:** STEP 011 — IndexedDB Local-First Persistence Layer.

---

## What Was Changed
- STEP 012 Execution:
  1. Created `types/metrics.ts` establishing strict domain interfaces for `SubjectMetricStat`, `CountdownMetric`, `SuccessScoreMetric`, `GlobalPaceMetric`, and `ComputedMetricsSummary`.
  2. Created `lib/metrics.ts` implementing pure mathematical calculation algorithms (`calculateTotalStaticChapters`, `calculateCountdown`, `calculateSuccessScore`, `calculateSubjectStats`, `calculateGlobalPace`, `calculateAllMetrics`, `formatPace`, `formatCgpa`) with 100% mathematical parity against legacy `js/core/metrics.js`.
  3. Created comprehensive regression test suite in `tests/metrics-parity.test.ts` verifying static chapter totals, countdown boundaries, success score percentages, custom milestone calculations, per-subject velocity computation, and 2-decimal-place formatters.
  4. Added `test:metrics` script and integrated into `npm test`.
  5. Verified zero TypeScript errors under `strict: true` (`npx tsc --noEmit`).
  6. Verified `compile_applet` (`next build` compiled cleanly in Turbopack).
  7. Verified all automated test suites pass (14 legacy suites + Zustand suite + Firebase sync suite + Storage IDB suite + Metrics parity suite).
  8. Verified `lint_applet` passed cleanly.

---

## Important Architectural Decisions
1. **Preserve Single-Document Firestore Payload:** The live database (`ai-studio-x2k29-0bea0128-fcaa-4732-97b2-c13b97d4515f`) stores user state at `x29/state`. All 48 whitelisted keys and data types must be preserved byte-for-byte to maintain 100% compatibility with existing backups and the Node.js backup/restore tools (`scripts/backup.js`, `scripts/restore.js`).
2. **Next.js 16 App Router as Target Engine:** Next.js provides the optimal path for React Server Components (RSC) to stream layout shells with zero client JavaScript, while enabling route-level code-splitting and dynamic imports for Chart.js.
3. **Zustand Domain Partitioning:** Replace the monolithic mutable `window.AppState` with domain stores (`useTaskStore`, `useTargetStore`, `usePaceStore`, `useTimerStore`, `useConfigStore`, `useSyncStore`) with fine-grained selectors and an optimistic sync middleware.
4. **Radix UI Headless Modals:** The 40 inline modal dialogs inside `index.html` will be ported to accessible Radix Dialog primitives rendered on-demand, pruning over 350 KB of static DOM from initial page load.
5. **IndexedDB Local-First Persistence:** Replace synchronous `localStorage` with `idb` to prevent main-thread UI freezing during multi-megabyte study plan autosaves.
6. **Zero Visual Redesign:** Visual appearance, colors, fonts, spacing, sizing, buttons, icons, and animations are strictly preserved.

---

## Files Changed
- `docs/CURRENT-STATE.md` (Created)
- `docs/MODERNIZATION-PLAN.md` (Created)
- `docs/ARCHITECTURE.md` (Updated to v2.0.0)
- `docs/RULES.md` (Updated to v1.1.0)
- `docs/DESIGN-PARITY.md` (Created)
- `docs/TASKS.md` (Updated to v2.0.0)
- `docs/PERFORMANCE.md` (Created)
- `docs/MIGRATION-LOG.md` (Created)
- `docs/MEMORY.md` (Updated to v2.0.0)

---

## Known Issues
1. **Monolithic DOM Weight in `index.html`:** Shell has 7,814 lines (592.56 KB) and 40 inline modals loaded upfront. (To be resolved in STEPS 008, 025, 026).
2. **Render-Blocking External CDNs in `<head>`:** `cdn.tailwindcss.com`, Chart.js, and Firebase compat scripts induce 14.6s FCP. (To be resolved in STEPS 005, 017, 028).
3. **Absence of Service Worker:** While `manifest.json` exists, there is no registered `sw.js`. (To be resolved in STEP 031).
4. **Unbundled JavaScript:** 3.02 MB of raw JavaScript loaded via 35 synchronous `<script>` tags. (To be resolved in STEPS 004, 027, 028).

---

## Remaining Risks
1. **Target Hierarchy Cascade Regression:** The multi-tier cascade (Monthly $\rightarrow$ Weekly $\rightarrow$ Daily $\rightarrow$ Tasks) is complex. Must preserve bi-directional calculations and verify with existing test suites.
2. **Focus Timer Precision in React:** React component re-renders must not introduce clock drift. Must use Web Worker drift compensation as defined in STEP 016.
3. **40 Modal DOM ID Parity:** Any missing element ID in the migrated modals could break form submission or tests. `tests/modals.test.js` serves as verification gate.

---

## Performance Findings
- **JS Payload:** 3,023.58 KB across 106 scripts.
- **HTML Payload:** 1,015.82 KB across 13 templates (`index.html` is 592.56 KB).
- **CSS Payload:** 52.22 KB across 13 stylesheets.
- **Network Transfer:** 5.02 MB across 47 requests.
- **Lab Core Web Vitals:** FCP 14.6s, LCP 29.9s, TTI 30.0s, TBT 750ms, CLS 0.00.
- **Lighthouse Scores:** Performance 37, Accessibility 80, Best Practices 96, SEO 91.

---

## Visual Parity Status
- **Baseline Design Verified:** Exact color codes (`#0b0f19`, `#0f172a`), font families (*Outfit*, *Inter*, *JetBrains Mono*, *Rajdhani*), border radii, and `.glass-card` classes cataloged in `docs/DESIGN-PARITY.md`.
- **Target Parity:** 100% identical look and feel across all 11 views and 40 modals.

---

## Git Checkpoint
- **Branch:** `master`
- **Baseline Commit:** `5dcf35b` (`chore: baseline checkpoint before technology modernization (STEP 003)`)
- **Step 004 Commit:** `94d53ef` (`feat: setup Next.js 16 and TypeScript build pipeline (STEP 004)`)
- **Step 005 Commit:** `135b856` (`feat: setup Tailwind CSS v4 build pipeline and global styles (STEP 005)`)
- **Step 006 Commit:** `f735f94` (`feat: implement core TypeScript type system and domain interfaces (STEP 006)`)
- **Step 007 Commit:** `11e158f` (`feat: implement Next.js App Router shell and layout structure (STEP 007)`)
- **Step 008 Commit:** `411cf8b` (`feat: implement accessible shared Radix UI primitives (STEP 008)`)
- **Step 009 Commit:** `c337942` (`feat: implement Zustand modular state management layer and legacy bridge (STEP 009)`)
- **Step 010 Commit:** `70ced1c` (`feat: implement modular Firebase and Firestore sync layer with tombstone reconciliation (STEP 010)`)
- **Step 011 Commit:** `e50cee6` (`feat: implement IndexedDB local-first persistence layer with fallback support (STEP 011)`)
- **Step 012 Commit:** `e786312` (`feat: implement pure TypeScript KPI metrics calculation engine with mathematical parity (STEP 012)`)
- **Tags:** `checkpoint-step-003`, `checkpoint-pre-framework`, `checkpoint-step-004`, `checkpoint-step-005`, `checkpoint-step-006`, `checkpoint-step-007`, `checkpoint-step-008`, `checkpoint-step-009`, `checkpoint-step-010`, `checkpoint-step-011`, `checkpoint-step-012`
- **Working Tree Status:** Clean, verified, and protected.

---

## Next Step
- **Awaiting User Instruction:**
  ```text
  Continue from STEP 013
  ```
  *(STEP 013: Dashboard Feature & KPI Cards Migration)*
