# X-29 ADVANCE — PERFORMANCE BENCHMARKING & METRIC LEDGER

> **Document Version:** 1.0.0  
> **Date:** 2026-09-26  
> **Status:** Active Performance Tracking Ledger  
> **Target:** Measurable, empirical performance modernization across all Core Web Vitals.

---

## 1. Metric Tracking Ledger

| Performance Metric | Baseline (Pre-Modernization) | Modernized Target | Checkpoint 1 (Next.js Setup) | Checkpoint 2 (RSC & Code Split) | Final Validated (Production) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Total Project JS Size** | **3,023.58 KB** (106 files) | **< 350 KB** (Bundled & Minified) | Pending | Pending | Pending |
| **Initial Client JS Payload** | **2,605.71 KB** (Unbundled) | **< 120 KB** (Route-split) | Pending | Pending | Pending |
| **Total HTML Shell Size** | **592.56 KB** (`index.html`) | **< 25 KB** (Streaming RSC) | Pending | Pending | Pending |
| **Total CSS Payload** | **52.22 KB** + Runtime CDN | **< 30 KB** (Purged build-time) | Pending | Pending | Pending |
| **Initial Request Count** | **47 requests** | **< 15 requests** | Pending | Pending | Pending |
| **Total Transferred Data** | **5,020.0 KB (~5.02 MB)** | **< 600 KB** | Pending | Pending | Pending |
| **First Contentful Paint (FCP)** | **14.6 s** (Lab Baseline) | **< 1.2 s** | Pending | Pending | Pending |
| **Largest Contentful Paint (LCP)** | **29.9 s** (Lab Baseline) | **< 2.0 s** | Pending | Pending | Pending |
| **Total Blocking Time (TBT)** | **750 ms** (Lab Baseline) | **< 100 ms** | Pending | Pending | Pending |
| **Time to Interactive (TTI)** | **30.0 s** (Lab Baseline) | **< 2.0 s** | Pending | Pending | Pending |
| **Cumulative Layout Shift (CLS)** | **0.00** | **0.00** | Pending | Pending | Pending |
| **Time to First Byte (TTFB)** | **10 ms** (Local Server) | **< 50 ms** (Edge/Vercel) | Pending | Pending | Pending |
| **Lighthouse Performance Score** | **37 / 100** | **> 95 / 100** | Pending | Pending | Pending |
| **Lighthouse Accessibility Score** | **80 / 100** | **> 95 / 100** | Pending | Pending | Pending |
| **Lighthouse Best Practices** | **96 / 100** | **100 / 100** | Pending | Pending | Pending |
| **Lighthouse SEO Score** | **91 / 100** | **100 / 100** | Pending | Pending | Pending |
| **Firebase Reads on Boot** | **1 document** (`x29/state`) | **1 document** (Cached in IDB) | Pending | Pending | Pending |
| **Firebase Writes per Mutation** | **1 full monolithic doc** | **Debounced differential write** | Pending | Pending | Pending |
| **Mobile Performance Score** | **31 / 100** (Simulated 4G) | **> 90 / 100** | Pending | Pending | Pending |
| **Desktop Performance Score** | **43 / 100** | **> 98 / 100** | Pending | Pending | Pending |

---

## 2. Root Cause Analysis of Baseline Latencies

1. **Render-Blocking External JavaScript:**
   - Loading `cdn.tailwindcss.com` in `<head>` forces the browser to download, parse, and initialize a full JIT compiler before executing any other scripts.
   - Synchronous loading of Firebase Compat libraries and Chart.js CDN blocks DOM parsing for over 2.5 seconds on fast connections and over 12 seconds on mobile 3G/4G connections.
2. **Monolithic DOM Weight:**
   - 7,814 lines of HTML inside `index.html` requires Chrome to construct a DOM tree of over 4,200 nodes before the first paint occurs.
3. **Absence of Route Code-Splitting:**
   - A user visiting strictly the Dashboard currently downloads all scripts for Analytics, Focus Timer, Habit Tracker, Exam Routine, Outcome Calculations, and Master Config, totaling over 3.02 MB of unminified code.
4. **Synchronous Memory Serialization:**
   - Autosave serializes the entire `AppState` tree into a single JSON string using `JSON.stringify(currentCache)` on every keystroke or toggle, blocking the JavaScript main thread.

---

## 3. Performance Modernization Action Plan

| Architectural Intervention | Expected Impact | Target Step |
| :--- | :--- | :--- |
| **Build-Time Tailwind Compilation** | Slashes FCP by eliminating `cdn.tailwindcss.com` runtime evaluation. Saves ~350ms blocking time. | STEP 005 |
| **`next/font` Zero-Layout-Shift Loading** | Eliminates external Google Fonts network calls; self-hosts font subsets with zero layout shift. | STEP 007 |
| **Radix Portal Dialogs (40 Modals)** | Prunes initial DOM node count from 4,200 to <600 nodes. Reduces initial HTML from 592 KB to <25 KB. | STEP 008, STEP 025 |
| **Dynamic Import for Chart.js** | Prevents Chart.js (>250 KB) from loading on initial visit. Loads only when `/analytics` is mounted. | STEP 017, STEP 028 |
| **Non-blocking IndexedDB Storage** | Moves multi-megabyte cache persistence off the synchronous UI thread into background IndexedDB. | STEP 011 |
| **React Server Components (RSC)** | Delivers zero-JS HTML shells for headers and static layouts, drastically reducing hydration cost. | STEP 007, STEP 028 |
| **Modern Serwist Service Worker** | Provides instant (<100ms) repeat-visit loading from cache-first Service Worker strategy. | STEP 031 |
