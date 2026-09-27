# X-29 ADVANCE — SYSTEM ARCHITECTURE SPECIFICATION

> **Document Version:** 2.0.0  
> **Date:** 2026-09-26  
> **Status:** Approved Target Architectural Blueprint  
> **Project Identity:** X-29 Advance  
> **Database:** Google Cloud Firestore (`ai-studio-x2k29-0bea0128-fcaa-4732-97b2-c13b97d4515f` / `x29/state`)

---

## 1. Architectural Mission & Philosophy

The architectural mission of this project is strict:
> **Modernize the technology and architecture of the existing X-29 application to make it fast, responsive, scalable, maintainable, and premium-grade — WITHOUT changing the existing design, system, functionality, behavior, data, or user workflow.**

```text
┌────────────────────────────────────────────────────────┐
│                   USER EXPERIENCE                      │
│  Identical Design, Colors, Layout, Typography, Flow   │
└────────────────────────────────────────────────────────┘
                           ▲
                           │ (Zero visual difference)
┌────────────────────────────────────────────────────────┐
│                  MODERNIZED ENGINE                     │
│  Next.js 16 + React 19 + TypeScript + Zustand + idb    │
│  Server Components + Code Splitting + Workbox PWA      │
└────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack Selection & Rationale

| Layer | Baseline Legacy Technology | Modernized Target Technology | Architectural Justification |
| :--- | :--- | :--- | :--- |
| **Framework** | Vanilla JS / Node HTTP Server | **Next.js 16 (App Router)** | Provides automatic code-splitting, Server Components, zero-JS static rendering where appropriate, and optimized production bundling. |
| **Language** | Plain JavaScript (ES5/ES6 globals) | **TypeScript 5.x (Strict Mode)** | Eliminates runtime `TypeError: undefined` bugs, provides strong types for Firestore data, and ensures refactoring safety. |
| **UI Library** | Imperative DOM manipulation (`innerHTML`) | **React 19** | Declarative rendering, concurrent features, optimal DOM diffing, and seamless component lifecycle management. |
| **Styling** | Runtime CDN Tailwind + 13 CSS files | **Build-Time Tailwind CSS + PostCSS** | Removes runtime CDN compilation overhead (>300ms blocking), generates minified CSS, and eliminates unneeded classes. |
| **State** | Global `window.AppState` mutable object | **Zustand 5.x Modular Stores** | Lightweight (<2KB), reactive subscriptions without unnecessary top-level re-renders, decoupled domain slices with TypeScript safety. |
| **UI Primitives** | Custom inline HTML modals (40 in shell) | **Radix UI Primitives** | Headless accessible primitives (Dialog, DropdownMenu, Tooltip, Tabs) with 100% style customizability to preserve existing appearance. |
| **Icons** | Mixed SVG strings & JPEG/PNG | **Lucide React + Optimized SVG** | Tree-shakeable SVG icon components preserving exact stroke widths and visual appearance. |
| **Charts** | Global `Chart.js` loaded via CDN | **Chart.js + react-chartjs-2 (Dynamic)** | Loaded dynamically via `next/dynamic({ ssr: false })` only on pages that render charts (Analytics, Targets), saving >250KB on initial load. |
| **Local Storage** | Synchronous `localStorage` | **IndexedDB (`idb`) + Memory Cache** | Non-blocking asynchronous storage capable of holding multi-megabyte study plans and timer logs without freezing the main thread. |
| **Cloud Sync** | Monolithic `x29/state` listener | **Modular Firebase 12.x + Optimistic Sync** | Preserves exact `x29/state` schema while isolating network listeners and debouncing writes with tombstone reconciliation. |
| **PWA / SW** | No Service Worker (Manifest only) | **Serwist / Workbox Modern Service Worker** | Reliable offline asset caching, background sync, and instant second-load performance. |

---

## 3. Target Directory & Module Structure

The modernized application follows a modular, feature-oriented clean architecture:

```text
x-29/
├── app/                                 # Next.js App Router root
│   ├── (auth)/                          # Route group for auth/login
│   │   └── login/
│   │       └── page.tsx                 # Clean /login route
│   ├── (main)/                          # Route group for authenticated workspace (Clean URLs)
│   │   ├── layout.tsx                   # Persistent application shell (Header, Sidebar, Modals Provider)
│   │   ├── page.tsx                     # Root redirect or direct Dashboard
│   │   ├── dashboard/
│   │   │   └── page.tsx                 # /dashboard
│   │   ├── analytics/
│   │   │   └── page.tsx                 # /analytics (Spectra & Chapter Map)
│   │   ├── focus/
│   │   │   └── page.tsx                 # /focus (Timer & Stopwatch)
│   │   ├── daily-actions/
│   │   │   └── page.tsx                 # /daily-actions (Daily & Monthly Targets)
│   │   ├── schedule/
│   │   │   └── page.tsx                 # /schedule (Daily Routine & Timeblocks)
│   │   ├── subjects/
│   │   │   └── page.tsx                 # /subjects (Syllabus & Task Manager)
│   │   ├── pace/
│   │   │   └── page.tsx                 # /pace (Velocity & Deadlines)
│   │   ├── settings/
│   │   │   └── page.tsx                 # /settings (Master Config & Tracks)
│   │   ├── outcome/
│   │   │   └── page.tsx                 # /outcome (Results & Celebrations)
│   │   └── exam/
│   │       └── page.tsx                 # /exam (Exam Routine & Timetable)
│   ├── api/                             # Serverless API routes
│   │   └── config/
│   │       └── route.ts                 # /api/config endpoint serving client Firebase credentials
│   ├── manifest.ts                      # Next.js native Web App Manifest generator
│   ├── layout.tsx                       # Root layout (Fonts, Meta, Theme Script)
│   └── globals.css                      # Unified Tailwind entry point + custom legacy design classes
│
├── features/                            # Domain-driven feature modules
│   ├── dashboard/                       # Dashboard KPI cards, checklists, quick widgets
│   ├── analytics/                       # Spectra charts, heatmaps, commitment index, chapter matrix
│   ├── focus/                           # Focus timer, audio synthesis, fullscreen overlay, logs
│   ├── targets/                         # Monthly targets (MTDB), weekly targets (WTDB), daily targets
│   ├── tasks/                           # Study plan generator, task toggle engine, edit modals
│   ├── schedule/                        # Schedule routine, timeblocks, active slot tracker
│   ├── pace/                            # Pace manager, velocity estimators, deadline links
│   ├── outcome/                         # Outcome analytics, passing grades, celebration effects
│   ├── exam/                            # Exam countdown, session planner, timetable
│   ├── habits/                          # Habit tracker, daily check-in checklist
│   └── config/                          # Track management, priority setup, syllabus structure
│
├── components/                          # Shared UI components
│   ├── shell/                           # Header, Sidebar, BottomNav, SyncStatusIndicator
│   ├── modals/                          # 40 modular dialog components (rendered on demand)
│   ├── ui/                              # Radix-backed primitives (Button, Modal, Dropdown, Tabs)
│   └── feedback/                        # Toast notification container, Confetti celebration
│
├── stores/                              # Zustand reactive state stores
│   ├── useTaskStore.ts                  # Tasks, study plan, toggles, filters
│   ├── useTargetStore.ts                # Monthly, weekly, and daily targets database
│   ├── usePaceStore.ts                  # Pace goals, subject velocities
│   ├── useTimerStore.ts                 # Active timer state, logs, streaks
│   ├── useConfigStore.ts                # Tracks, custom programs, syllabus structure
│   ├── useExamStore.ts                  # Exam routines, sessions, active countdown
│   └── useSyncStore.ts                  # Cloud sync status, pending writes, tombstones
│
├── services/                            # External communication & platform services
│   ├── firebase/
│   │   ├── client.ts                    # Firebase modular app & Firestore initialization
│   │   ├── sync.ts                      # Debounced Firestore sync & conflict reconciliation
│   │   └── rules.ts                     # Schema validator
│   ├── storage/
│   │   ├── idb.ts                       # IndexedDB client for offline persistence
│   │   └── cache.ts                     # Memory cache wrapper
│   └── audio/
│       └── synthesizer.ts               # Procedural audio generator (Focus alarms)
│
├── lib/                                 # Pure helper utilities
│   ├── date.ts                          # Standardized date math & ISO week helpers
│   ├── format.ts                        # Currency, hours, velocity, and grade formatters
│   ├── colors.ts                        # Canonical subject palette & color hashes
│   └── metrics.ts                       # Mathematical KPI calculation engine
│
└── types/                               # Strong TypeScript interface definitions
    ├── database.ts                      # Firestore x29/state document schema
    ├── task.ts                          # Task, StudyPlan, Track, Subject, Chapter
    ├── target.ts                        # MonthlyTarget, WeeklyTarget, DailyTarget
    ├── timer.ts                         # TimerLog, ActiveTimerState
    └── exam.ts                          # ExamSession, ExamRoutine
```

---

## 4. Server vs. Client Boundary Strategy

To achieve the best possible performance without breaking client interactivity, the application uses a strict boundary strategy:

```text
┌──────────────────────────────────────────────────────────────┐
│ React Server Components (RSC) — ZERO Client JavaScript       │
│  - app/layout.tsx (Font loading, metadata, viewport)         │
│  - app/(main)/layout.tsx (Shell structure, static frames)    │
│  - Page shell wrappers & static headers                      │
└──────────────────────────────────────────────────────────────┘
                               │
                               ▼ Children
┌──────────────────────────────────────────────────────────────┐
│ Client Components ("use client") — Isolated Interactive Nodes│
│  - components/shell/Sidebar.tsx (Nav state & mobile drawer)  │
│  - components/shell/SyncStatusIndicator.tsx (Live cloud icon)│
│  - features/**/views/*.tsx (Interactive dashboards & tables) │
│  - features/focus/TimerClock.tsx (High-frequency clock tick) │
│  - components/modals/*.tsx (Portaled dialogs loaded on demand)│
└──────────────────────────────────────────────────────────────┘
```

### Boundary Rules:
1. **Never mark `layout.tsx` as `"use client"`.** The root layout and main shell layout remain Server Components so Google Fonts and structural HTML are streamed instantly without hydration delay.
2. **Interactive components are isolated to leaf nodes.** For example, the page header is static, while only the search input or action buttons are client components.
3. **Heavy third-party components (Chart.js) are dynamically imported:**
   ```typescript
   const SpectraChart = dynamic(() => import('@/features/analytics/SpectraChart'), {
     ssr: false,
     loading: () => <div className="h-64 animate-pulse bg-slate-900/40 rounded-xl" />
   });
   ```

---

## 5. State Management & Synchronization Architecture

### 5.1 Zustand Modular Stores
Instead of a single monolithic mutable object (`window.AppState`), state is partitioned into domain-specific Zustand stores with fine-grained selectors:

```typescript
// Example: Task Store
export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  filters: { trackId: 'all', search: '' },
  toggleTask: (taskId) => {
    // 1. Optimistic local update
    set((state) => ({ ... }));
    // 2. Cascade update to target store
    useTargetStore.getState().reconcileTaskToggle(taskId);
    // 3. Mark dirty for background sync
    useSyncStore.getState().markDirty();
  },
  ...
}));
```

### 5.2 Optimistic Cloud Sync Engine with Tombstones
The synchronization engine preserves the existing conflict-free semantics:
1. **Local Optimistic Mutation:** User clicks a toggle $\rightarrow$ UI updates in 0ms $\rightarrow$ persisted immediately to IndexedDB.
2. **Debounced Network Write:** Mutation triggers a 180ms debounce timer. Multiple quick clicks are batched into a single Firestore `setDoc()` call to `x29/state`.
3. **Tombstone Tracking:** Deletions record a `{ id: timestamp }` tombstone in `_tombstones` to ensure deleted items are never revived by concurrent cloud snapshots.
4. **Self-Write Echo Discard:** Each write includes a unique `_lastWriteId`. Incoming snapshot events matching `_lastWriteId` are acknowledged without triggering component re-renders.

---

## 6. Offline & Local-First IndexedDB Architecture

1. **Primary Local Store:** `idb` (IndexedDB lightweight Promise wrapper) replaces synchronous `localStorage`.
2. **Stores in IDB:**
   - `workspace`: Monolithic state cache for instant cold boot.
   - `timer_sessions`: Granular session logs.
   - `mutation_queue`: Offline write requests to replay when connectivity returns.
3. **Cold Boot Sequence:**
   1. Read `workspace` from IndexedDB $\rightarrow$ Populate Zustand stores in <15ms.
   2. Render initial UI immediately from cache (Zero loading spinners for returning users).
   3. Establish Firestore connection in background $\rightarrow$ Apply differential updates if cloud is newer.

---

## 7. PWA & Service Worker Architecture

1. **Solution:** Modern Workbox-powered Service Worker (via Serwist / `@serwist/next`).
2. **Caching Strategy:**
   - **Static Assets (JS, CSS, Fonts, Images):** Cache-First with stale-while-revalidate.
   - **API / Cloud Data (`/api/config`, Firestore):** Network-First with fallback to IndexedDB cache.
   - **HTML Navigation:** Network-First with immediate fallback to cached shell.
3. **Installability:** Clean PWA manifest adhering to standards with install prompt event handler and offline notification.

---

## 8. Routing Architecture & Public URL Parity

Public URLs remain completely unchanged from the user's perspective:

| Feature | Legacy Internal Route | Modernized Clean Next.js Route |
| :--- | :--- | :--- |
| Dashboard | `dashboard` | `/dashboard` (and `/`) |
| Spectra Analytics | `spectra-analytics` | `/analytics` |
| Focus / Timer | `focus` / `timer` | `/focus` |
| Daily Actions | `daily-actions` | `/daily-actions` |
| Daily Schedule | `schedule` | `/schedule` |
| Target Setup | `monthly-target-setup` | `/targets` (alias: `/monthly-target-setup`) |
| Subjects Syllabus | `subjects` | `/subjects` |
| Pace Management | `paces-management` | `/pace` |
| Master Settings | `master-config` | `/settings` |
| Outcome & Results | `outcome` | `/outcome` |
| Exam Routine | `exam` | `/exam` |

Internal Next.js App Router route groups (`(main)`, `(auth)`) are used to organize files without appearing in browser URLs.
