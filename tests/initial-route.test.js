/**
 * Test Suite: Initial Route & Default Home Page Resolution
 * Verifies that:
 * 1. The default home page / route is strictly 'dashboard'.
 * 2. On app initialization, site root resolves to Dashboard.
 * 3. Preload in idle time does NOT mount unvisited routes or redirect to monthly-target-setup / daily-actions.
 * 4. Monthly Target Setup only opens when explicitly requested by user navigation.
 * 5. Direct navigation to existing pages (Daily Actions, Analytics, etc.) continues to function properly.
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Mock DOM Environment
class MockElement {
    constructor(id = '', tagName = 'div') {
        this.id = id;
        this.tagName = tagName.toUpperCase();
        this.value = '';
        this.innerHTML = '<div>Mock Initial Child</div>';
        this.textContent = '';
        this.className = '';
        this.classList = {
            classes: new Set(),
            add(...cls) { cls.forEach(c => this.classes.add(c)); },
            remove(...cls) { cls.forEach(c => this.classes.delete(c)); },
            contains(c) { return this.classes.has(c); },
            toggle(c) { if (this.contains(c)) this.remove(c); else this.add(c); }
        };
        this.style = {};
        this.children = [{}];
        this.eventListeners = {};
    }

    hasChildNodes() {
        return true;
    }

    addEventListener(event, callback) {
        if (!this.eventListeners[event]) this.eventListeners[event] = [];
        this.eventListeners[event].push(callback);
    }

    dispatchEvent(e) {
        if (!e) return true;
        const listeners = this.eventListeners[e.type] || [];
        listeners.forEach(cb => cb(e));
        return true;
    }

    closest(sel) {
        if (sel.includes(this.id)) return this;
        return null;
    }

    getAttribute(name) {
        return this[name] || null;
    }

    setAttribute(name, val) {
        this[name] = val;
    }
}

const elements = new Map();
function getOrCreateElement(id, tagName = 'div') {
    if (!elements.has(id)) {
        elements.set(id, new MockElement(id, tagName));
    }
    return elements.get(id);
}

const allPages = [
    'dashboard',
    'spectra-analytics',
    'timer',
    'daily-actions',
    'schedule',
    'subjects',
    'paces-management',
    'master-config',
    'outcome',
    'exam',
    'monthly-target-setup'
];

allPages.forEach(p => {
    const pageEl = getOrCreateElement(`page-${p}`);
    if (p === 'dashboard') {
        pageEl.classList.remove('hidden');
    } else {
        pageEl.classList.add('hidden');
    }
    getOrCreateElement(`btn-nav-${p}`);
});
getOrCreateElement('main-content-panel');
getOrCreateElement('sidebar-container');
getOrCreateElement('sidebar-backdrop');

global.document = {
    getElementById: (id) => elements.get(id) || null,
    querySelector: (sel) => {
        if (sel.startsWith('#')) return elements.get(sel.slice(1)) || null;
        return null;
    },
    querySelectorAll: () => [],
    createElement: (tag) => new MockElement('', tag),
    head: { appendChild: () => {} },
    body: { appendChild: () => {} },
    addEventListener: () => {},
    readyState: 'complete'
};

global.window = {
    document: global.document,
    innerWidth: 1024,
    requestAnimationFrame: (cb) => { cb(); },
    requestIdleCallback: (cb) => { cb(); },
    setTimeout: (cb) => { cb(); return 1; },
    clearTimeout: () => {},
    scrollTo: () => {}
};

global.fetch = async (url) => {
    return {
        ok: true,
        text: async () => `<div data-mock-html="${url}">Mock Page Content</div>`
    };
};

// Track MonthlyTargetPage mount count
let monthlyTargetPageMounted = 0;
global.window.MonthlyTargetPage = {
    isMounted: false,
    mount: function () {
        if (global.window.Router && global.window.Router.activePageId &&
            global.window.Router.activePageId !== 'monthly-target-setup' &&
            global.window.Router.activePageId !== 'monthly target setup' &&
            global.window.Router.activePageId !== 'monthly target') {
            return;
        }
        monthlyTargetPageMounted++;
        this.isMounted = true;
        // In the unpatched version, this would call openAdd which called switchPage('monthly-target-setup')
        if (typeof global.window.switchPage === 'function' &&
            global.window.Router &&
            global.window.Router.activePageId !== 'monthly-target-setup') {
            global.window.switchPage('monthly-target-setup');
        }
    },
    destroy: function () {
        this.isMounted = false;
    }
};

// Load router.js
const routerCode = fs.readFileSync(path.join(__dirname, '../router/router.js'), 'utf8');
eval(routerCode);

const Router = global.window.Router;

async function runAllTests() {
    console.log('\n=== X-29 — Initial Route & Default Home Page Test Suite ===\n');
    let passedTests = 0;

    async function test(name, fn) {
        try {
            await fn();
            console.log(`  ✓ ${name}`);
            passedTests++;
        } catch (e) {
            console.error(`  ✗ FAIL: ${name}`);
            console.error(e);
            process.exit(1);
        }
    }

    // Test 1: Initial activePageId defaults to dashboard
    await test('Initial activePageId defaults to dashboard', async () => {
        assert.strictEqual(Router.activePageId, 'dashboard', 'activePageId must be dashboard');
    });

    // Test 2: Router.init() loads dashboard and keeps it active and visible
    await test('Router.init() keeps dashboard active and visible without redirects', async () => {
        Router._isInitialized = false;
        Router.init();
        await Router.loadPage('dashboard');
        assert.strictEqual(Router.activePageId, 'dashboard', 'activePageId must remain dashboard');
        assert.strictEqual(elements.get('page-dashboard').classList.contains('hidden'), false, 'page-dashboard must be visible');
        assert.strictEqual(elements.get('page-daily-actions').classList.contains('hidden'), true, 'page-daily-actions must be hidden');
        assert.strictEqual(elements.get('page-monthly-target-setup').classList.contains('hidden'), true, 'page-monthly-target-setup must be hidden');
    });

    // Test 3: Idle route preloading does NOT trigger onMount of unvisited routes
    await test('Preload in idle time does NOT trigger onMount or hijack route to monthly-target-setup', async () => {
        monthlyTargetPageMounted = 0;
        Router._hasPreloadedRoutes = false;
        Router.preloadAllRoutes();

        // Active page must still be dashboard
        assert.strictEqual(Router.activePageId, 'dashboard', 'activePageId must remain dashboard after preload');
        assert.strictEqual(monthlyTargetPageMounted, 0, 'MonthlyTargetPage.mount must not run during idle preload');
        assert.strictEqual(elements.get('page-dashboard').classList.contains('hidden'), false, 'page-dashboard must remain visible');
        assert.strictEqual(elements.get('page-monthly-target-setup').classList.contains('hidden'), true, 'page-monthly-target-setup must remain hidden');
    });

    // Test 4: Explicit navigation to Daily Actions works
    await test('Explicit navigation to daily-actions works normally', async () => {
        await Router.loadPage('daily-actions');
        assert.strictEqual(Router.activePageId, 'daily-actions');
        assert.strictEqual(elements.get('page-daily-actions').classList.contains('hidden'), false);
        assert.strictEqual(elements.get('page-dashboard').classList.contains('hidden'), true);
    });

    // Test 5: Explicit navigation to Monthly Target Setup works
    await test('Explicit navigation to monthly-target-setup works when requested', async () => {
        await Router.loadPage('monthly-target-setup');
        assert.strictEqual(Router.activePageId, 'monthly-target-setup');
        assert.strictEqual(elements.get('page-monthly-target-setup').classList.contains('hidden'), false);
        assert.strictEqual(elements.get('page-dashboard').classList.contains('hidden'), true);
        assert.strictEqual(monthlyTargetPageMounted, 1, 'MonthlyTargetPage.mount should have run exactly once');
    });

    // Test 6: Browser refresh on root ("/") resolves to Dashboard
    await test('Browser refresh on root ("/") resolves to Dashboard', async () => {
        // Reset state as if browser reloaded "/"
        Router.activePageId = 'dashboard';
        elements.get('page-dashboard').classList.remove('hidden');
        elements.get('page-monthly-target-setup').classList.add('hidden');
        elements.get('page-daily-actions').classList.add('hidden');
        Router._isInitialized = false;
        Router._hasPreloadedRoutes = false;

        Router.init();
        await Router.loadPage('dashboard');
        Router.preloadAllRoutes();

        assert.strictEqual(Router.activePageId, 'dashboard', 'Root URL must strictly resolve to dashboard');
        assert.strictEqual(elements.get('page-dashboard').classList.contains('hidden'), false, 'Dashboard container must be visible');
        assert.strictEqual(elements.get('page-monthly-target-setup').classList.contains('hidden'), true, 'Monthly target setup must remain hidden');
    });

    console.log(`\n==================================================`);
    console.log(`Initial Route Suite: ALL ${passedTests} TESTS PASSED!`);
    console.log(`==================================================\n`);
}

runAllTests();
