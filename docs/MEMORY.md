# X-29 ADVANCE — PERSISTENT PROJECT MEMORY LEDGER

> **Document Version:** 2.0.0  
> **Date:** 2026-09-26  
> **Status:** Active Memory Ledger  
> **Master Rule:** This file preserves the complete contextual state across AI sessions. Update after every completed step.

---

## Current Step
- **Current Step:** STEP 002 — Performance Baseline & Metric Profiling (COMPLETED).
- **Status:** READY FOR STEP 003.

---

## Previous Completed Step
- **Previous Completed Step:** STEP 001 — Architecture Audit & System Inventory.

---

## What Was Changed
- Conducted full architectural and code audit of the entire 168-file X-29 repository.
- Cataloged exact byte counts, line counts, and responsibilities for all 106 JS files (3.02 MB), 13 HTML files (1.01 MB), and 13 CSS files (52.2 KB).
- Executed all automated regression test suites (`npm test`) — 14 test suites, 57/57 tests passed.
- Initialized clean Git tracking with author configuration and created root commit `fd26c21`.
- Built the complete permanent 9-document migration governance system in `docs/`:
  1. `docs/CURRENT-STATE.md` (Comprehensive audit of architecture, files, problems, dependencies)
  2. `docs/MODERNIZATION-PLAN.md` (Complete 36-step roadmap with detailed workflows)
  3. `docs/ARCHITECTURE.md` (Baseline vs. Target Next.js 16/React 19/TypeScript architecture)
  4. `docs/RULES.md` (Strict 15 non-negotiable rules, zero redesign rule)
  5. `docs/DESIGN-PARITY.md` (Checklist covering all 11 views and 40 modals)
  6. `docs/TASKS.md` (Detailed task tracker for every step)
  7. `docs/MEMORY.md` (Cross-session memory ledger)
  8. `docs/PERFORMANCE.md` (Performance tracking baseline and targets)
  9. `docs/MIGRATION-LOG.md` (Chronological history of migration actions)
- Verified build and lint integrity (`compile_applet` build succeeded, `lint_applet` passed).

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
- **Baseline Commit:** `fd26c21` (`chore: baseline commit before modernization`)
- **Working Tree Status:** Documentation added; ready for next checkpoint.

---

## Next Step
- **Awaiting User Instruction:**
  ```text
  Continue from STEP 003
  ```
  *(STEP 003: Safety Checkpoints & Backup Verification)*
