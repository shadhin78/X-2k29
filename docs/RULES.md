# X-29 ADVANCE — PERMANENT DEVELOPMENT RULES & GOVERNANCE

> **Document Version:** 1.1.0  
> **Status:** Active / Non-Negotiable AI Control File  
> **Target Audience:** All AI Agents, Engineers, and Collaborators on X-29  
> **Database:** Google Cloud Firestore (`ai-studio-x2k29-0bea0128-fcaa-4732-97b2-c13b97d4515f` / `x29/state`)

---

## 1. THE 15 FOUNDATIONAL LAWS (NON-NEGOTIABLE)

Every AI session and developer working on X-29 must obey these 15 foundational laws without exception:

1. **Existing X-29 design is the visual source of truth.** The current HTML, CSS, and rendered UI define the target look, feel, spacing, sizing, fonts, colors, and animations.
2. **Do not redesign.** Do not make the interface "better looking", do not introduce a new visual style, and do not replace the existing design with Tailwind defaults, shadcn defaults, Radix defaults, or any generic modern UI templates.
3. **Do not remove functionality.** Every existing view, modal, button, dropdown, calculation, algorithm, chart, toggle, habit tracker, and helper must be retained.
4. **Do not change behavior without explicit approval.** Workflows, interactions, state transitions, date rollovers, auto-spread logic, and shortcut behaviors must remain identical from the user's perspective.
5. **Do not change Firebase data structure casually.** The cloud document structure at `x29/state` and its whitelisted keys must be preserved. Any optimization must maintain 100% backward and forward compatibility with existing backups and the Node backup CLI.
6. **Do not expose secrets.** Never commit private keys, service account credentials, or API secrets into client bundles or public repositories.
7. **Do not perform giant blind rewrites.** Never attempt a single-turn mass rewrite. Modernization must be incremental, modular, testable, and reversible.
8. **Work one numbered step at a time.** Implement ONLY the single step instructed by the user. Do not proceed to the next step until the current step is verified and approved.
9. **Test every step.** Run automated test suites and verify console logs, functionality, and visual parity after every step.
10. **Update documentation after every step.** Update `MODERNIZATION-PLAN.md`, `TASKS.md`, `MEMORY.md`, `PERFORMANCE.md`, `DESIGN-PARITY.md`, and `MIGRATION-LOG.md` after completing any step.
11. **Create a Git checkpoint for every major completed step.** Commit changes cleanly with a descriptive message referencing the step number.
12. **Never silently skip a step.** Every numbered step in the roadmap must be deliberately addressed or formally marked deprecated with written justification.
13. **Never silently mark a step complete.** A step is ONLY complete when all acceptance criteria and test validations have been executed and documented.
14. **Read documentation before continuing a previous step.** Always inspect `docs/MEMORY.md`, `docs/MODERNIZATION-PLAN.md`, and `docs/TASKS.md` at the start of every session before touching code.
15. **Prefer measurable performance improvements.** Every architectural change should demonstrably improve load times, bundle sizes, render speed, memory usage, or network efficiency.

---

## 2. DESIGN & VISUAL PARITY GOVERNANCE

```text
OLD X-29
Design       = Same
System       = Same
Function     = Same
Behavior     = Same
Data         = Same

NEW X-29
Technology   = Modernized
Architecture = Modernized
Performance  = Greatly Improved
Maintainability = Greatly Improved
```

1. **Color & Surface Fidelity:**
   - Backgrounds: Primary dark `#0b0f19`, secondary dark `#0f172a`, card surface `rgba(15, 23, 42, 0.75)` with backdrop blur.
   - Accents: Emerald (`#10b981`), Indigo (`#6366f1`), Blue (`#3b82f6`), Amber (`#f59e0b`), Rose (`#f43f5e`).
   - Text: High-contrast white/slate-100 on dark; muted slate-400 for metadata and timestamps.
2. **Typography System:**
   - Display/Numerics: *Outfit*, *Rajdhani*, *Chakra Petch*.
   - Body/UI: *Inter*, *Plus Jakarta Sans*.
   - Monospace/Code/Timers: *JetBrains Mono*.
   - Fonts must be loaded cleanly without render-blocking layout shifts (using `next/font` in target architecture).
3. **Card & Component Densities:**
   - Border radius, box shadows, and glow borders (`.glass-card`, `.cyber-badge`, `.glowing-input`) must match exact pixel values.
4. **Animations & Transitions:**
   - Shimmer progress bars (`.shimmer-progress`), aura pulses (`.animate-aura`), slide-up route transitions (`.animate-page-enter`), and confetti bursts must be preserved.

---

## 3. BUSINESS LOGIC & DATA MODEL INTEGRITY

1. **KPI Metrics Engine:**
   - `recalculateTotals()`, `updateCountdown()`, `updateSuccessScore()`, and `updateMetrics()` in `js/core/metrics.js` must yield identical mathematical outputs for identical inputs.
2. **Pace Estimation Engine:**
   - Target velocity formulas, required chapters per day calculations, and date projections in `js/features/pace/` must not deviate by even 0.01 ch/day.
3. **Multi-Tier Targets Hierarchy:**
   - Bi-directional cascade: `monthlyTargetsDatabase` $\leftrightarrow$ `weeklyTargetsDatabase` $\leftrightarrow$ `dailyTargetsDatabase` $\leftrightarrow$ `tasks`.
   - Modifying or completing a task must continue to update linked daily, weekly, and monthly target records consistently.
4. **Focus Timer Engine:**
   - Stopwatch and countdown timers must maintain Web Worker or `performance.now()` precision with sub-second drift compensation.
   - Session logs in `timerLogs` must maintain exact schema: `{ id, startTime, endTime, durationMinutes, subjectId, tag, notes, date }`.

---

## 4. CODE QUALITY & TYPESCRIPT DISCIPLINE

1. **Strict TypeScript:**
   - No `any` type shortcuts.
   - Comprehensive interfaces for all domain entities: `Task`, `Track`, `Subject`, `Chapter`, `PaceGoal`, `Target`, `ExamSession`, `TimerLog`, `AppState`.
2. **Component Architecture:**
   - Server Components by default for static shells and layout wrappers.
   - Client Components (`"use client"`) only at interactive leaves (interactive buttons, input forms, canvas charts, live timers).
   - Component files must remain focused; no monster component files > 400 lines.
3. **Memory & Listener Hygiene:**
   - Every `useEffect` containing event listeners, intervals, or observers must return a comprehensive teardown/cleanup callback.
   - Firestore snapshot listeners must be cleanly unsubscribed on unmount.
   - Chart.js instances must call `.destroy()` before canvas re-renders or unmounts.

---

## 5. DOCUMENTATION & SESSION CONTINUITY

At any point in time, the documentation in `docs/` must provide immediate answers to:
- **What has been completed?** (`docs/TASKS.md` + `docs/MIGRATION-LOG.md`)
- **What is currently being worked on?** (`docs/MEMORY.md`)
- **What remains to be done?** (`docs/MODERNIZATION-PLAN.md`)
- **What changed and why?** (`docs/MIGRATION-LOG.md`)
- **What is the next immediate step?** (`docs/MEMORY.md`)
