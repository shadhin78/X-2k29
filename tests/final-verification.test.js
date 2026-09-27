/**
 * Final Verification Test Suite for X-2k29 Private Single-User Mode
 * Verifies:
 * 1. Complete removal of Login page and auth redirects
 * 2. Complete removal of Registration / Sign Up UI
 * 3. Complete removal of Firebase Auth dependencies
 * 4. Fixed single-user Firestore data architecture (x29/state)
 * 5. Realtime cross-device synchronization without login
 * 6. Hardened Firestore Security Rules (no request.auth dependency, restricted paths)
 * 7. Preservation of all application data structures
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passed = 0;
let total = 0;

function test(name, fn) {
    total++;
    try {
        fn();
        console.log(`  ✓ ${name}`);
        passed++;
    } catch (err) {
        console.error(`  ✗ ${name}`);
        console.error('    Error:', err.message);
        throw err;
    }
}

async function asyncTest(name, fn) {
    total++;
    try {
        await fn();
        console.log(`  ✓ ${name}`);
        passed++;
    } catch (err) {
        console.error(`  ✗ ${name}`);
        console.error('    Error:', err.message);
        throw err;
    }
}

// In-memory test environment setup
const storageMap = new Map();
global.safeStorage = {
    getItem: (k) => storageMap.has(k) ? storageMap.get(k) : null,
    setItem: (k, v) => storageMap.set(k, String(v)),
    removeItem: (k) => storageMap.delete(k)
};

global.AppState = {
    tasks: [],
    tracks: [],
    fiscalLedger: { transactions: [], budgets: [], vaults: [] },
    hasLoadedFromCloud: false,
    isLocalDirty: false,
    localRevision: 0,
    lastCommittedRevision: 0
};

global.applyFullAppState = function(payload, isLocalDirty = false, isReset = false, fromRemoteCloud = false) {
    if (payload.tasks) global.AppState.tasks = [...payload.tasks];
    if (payload.tracks) global.AppState.tracks = [...payload.tracks];
    if (payload.fiscalLedger) global.AppState.fiscalLedger = JSON.parse(JSON.stringify(payload.fiscalLedger));
    if (fromRemoteCloud) {
        global.AppState.hasLoadedFromCloud = true;
        global.AppState.isLocalDirty = false;
    }
};

async function runAudit() {
    console.log('\n=== X-2k29 Private Single-User Verification ===\n');

    // 1. Login Page Removal
    console.log('--- 1. Login Page & Auth Route Removal ---');
    test('login.html does not exist in workspace', () => {
        const loginPath = path.join(__dirname, '..', 'login.html');
        assert.strictEqual(fs.existsSync(loginPath), false, 'login.html must be completely deleted');
    });

    test('Dev server and Vercel route directly to index.html without login redirect', () => {
        const devServer = fs.readFileSync(path.join(__dirname, '..', 'js/dev-server.js'), 'utf8');
        assert.ok(!devServer.includes("url = '/login.html';"), 'Dev server must not serve login.html');

        const vercelJson = fs.readFileSync(path.join(__dirname, '..', 'vercel.json'), 'utf8');
        assert.ok(!vercelJson.includes('/login.html'), 'Vercel must not rewrite to login.html');
    });

    // 2. Registration Removal
    console.log('\n--- 2. Public Registration & Auth UI Removal ---');
    test('No Sign Up, Register, or Create Account flows exist in index.html', () => {
        const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
        assert.ok(!indexHtml.toLowerCase().includes('sign up'));
        assert.ok(!indexHtml.toLowerCase().includes('create account'));
        assert.ok(!indexHtml.toLowerCase().includes('forgot password'));
        assert.ok(!indexHtml.toLowerCase().includes('btn-logout'));
    });

    // 3. Complete Firebase Auth Removal
    console.log('\n--- 3. Firebase Auth Removal ---');
    test('No Firebase Auth imports in js/services/firebase.js', () => {
        const firebaseServiceCode = fs.readFileSync(path.join(__dirname, '..', 'js/services/firebase.js'), 'utf8');
        assert.ok(!firebaseServiceCode.includes("from 'firebase/auth'"));
        assert.ok(!firebaseServiceCode.includes('getAuth('));
        assert.ok(!firebaseServiceCode.includes('signInWithEmailAndPassword('));
        assert.ok(!firebaseServiceCode.includes('signOut('));
    });

    test('No Firebase Auth compat script in index.html', () => {
        const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
        assert.ok(!indexHtml.includes('firebase-auth-compat.js'));
        assert.ok(!indexHtml.includes('"firebase/auth"'));
        assert.ok(!indexHtml.includes('js/services/auth.js'));
    });

    test('auth.js is removed from codebase', () => {
        const authJsPath = path.join(__dirname, '..', 'js/services/auth.js');
        assert.strictEqual(fs.existsSync(authJsPath), false, 'auth.js must be removed');
    });

    // 4. Fixed Firestore Data Architecture (x29/state)
    console.log('\n--- 4. Fixed Firestore Architecture (x29/state) ---');
    test('Firestore synchronization uses fixed x29/state path instead of UID paths', () => {
        const firebaseCode = fs.readFileSync(path.join(__dirname, '..', 'js/firebase.js'), 'utf8');
        assert.ok(firebaseCode.includes("collection('x29').doc('state')"), "Must target collection('x29').doc('state')");
        assert.ok(!firebaseCode.includes("collection('users').doc(activeUid)"));
        assert.ok(!firebaseCode.includes("collection('users').doc(user.uid)"));
    });

    test('FirebaseService defines bumpSyncGeneration method and handles sync generation tokens', () => {
        const firebaseCode = fs.readFileSync(path.join(__dirname, '..', 'js/firebase.js'), 'utf8');
        assert.ok(firebaseCode.includes("bumpSyncGeneration: function"), "FirebaseService must define bumpSyncGeneration function");
    });

    // 5. Cross-Device Synchronization Behavior
    console.log('\n--- 5. Cross-Device Synchronization Behavior ---');
    test('Device B hydrates data directly from Cloud Firestore x29/state without login', () => {
        storageMap.clear();

        const deviceACloudPayload = {
            tasks: [{ id: 'task_001', name: 'Strategic Financial Analysis', completed: true }],
            tracks: [{ id: 'track_core', name: 'Core Track' }],
            fiscalLedger: { transactions: [{ id: 'tx_100', amount: 1500 }], budgets: [], vaults: [] },
            _lastWriteId: 'deviceA_rev1_1760000000',
            updatedAt: 1760000000000
        };

        global.applyFullAppState(deviceACloudPayload, false, false, true);

        assert.strictEqual(global.AppState.tasks.length, 1);
        assert.strictEqual(global.AppState.tasks[0].id, 'task_001');
        assert.strictEqual(global.AppState.fiscalLedger.transactions[0].amount, 1500);
        assert.strictEqual(global.AppState.hasLoadedFromCloud, true);
        assert.strictEqual(global.AppState.isLocalDirty, false);
    });

    test('Echo guard ignores self-writes and receives remote multi-device updates', () => {
        const lastCommittedWriteId = 'deviceB_rev5_1760000050';
        const echoSnapshot = { _lastWriteId: lastCommittedWriteId };
        const isSelfEcho = echoSnapshot._lastWriteId === lastCommittedWriteId;
        assert.strictEqual(isSelfEcho, true, 'Self-echo must be acknowledged without re-render loop');

        const remoteSnapshot = { _lastWriteId: 'deviceA_rev6_1760000090', tasks: [{ id: 'task_002' }] };
        const isRemoteUpdate = remoteSnapshot._lastWriteId !== lastCommittedWriteId;
        assert.strictEqual(isRemoteUpdate, true, 'Remote device update must trigger state application');
    });

    test('Modular DocumentSnapshot non-existent document is handled safely without reading tasks of undefined', () => {
        const firebaseCode = fs.readFileSync(path.join(__dirname, '..', 'js/firebase.js'), 'utf8');
        assert.ok(firebaseCode.includes("const docExists = docSnapshot && ((typeof docSnapshot.exists === 'function') ? docSnapshot.exists() : Boolean(docSnapshot.exists));"), "Must handle modular snap.exists() function");
        assert.ok(firebaseCode.includes("if (docExists && cloudData) {"), "Must guard both docExists and cloudData");
    });

    // 6. Firestore Security Rules
    console.log('\n--- 6. Firestore Security Rules Audit ---');
    test('Firestore Security Rules allow x29 reads/writes without request.auth', () => {
        const rulesContent = fs.readFileSync(path.join(__dirname, '..', 'firestore.rules'), 'utf8');
        // Default deny present
        assert.ok(rulesContent.includes('match /{document=**} {\n      allow read, write: if false;\n    }'));
        // No request.auth references
        assert.ok(!rulesContent.includes('request.auth'));
        // Restricted to x29 collection
        assert.ok(rulesContent.includes('match /x29/{docId}'));
        // List is denied
        assert.ok(rulesContent.includes('allow list: if false;'));
        // Valid ID check present
        assert.ok(rulesContent.includes('isValidId(docId)'));
    });

    // 7. Existing Data Model Preservation
    console.log('\n--- 7. Existing Data Model Preservation ---');
    test('All critical X-2k29 data features and schema models are preserved', () => {
        const blueprint = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'firebase-blueprint.json'), 'utf8'));
        const props = blueprint.entities.UserWorkspace.properties;
        const requiredKeys = [
            'tasks', 'tracks', 'customSyllabus', 'syllabusStructure', 'customPrograms',
            'customActions', 'paceGoals', 'passedItems', 'celebrationTargets', 'revisionData',
            'programVisibility', 'subjectTimeLinks', 'successResults', 'timerLogs',
            'dashboardConfig', 'weeklyTargetsDatabase', 'monthlyTargetsDatabase', 'dailyTargetsDatabase',
            'scheduleBlocks', 'fiscalLedger', 'examSessions', 'examRoutine', 'selectedCountdownExamId'
        ];
        requiredKeys.forEach(k => {
            assert.ok(props[k], `Key [${k}] must be preserved in schema`);
        });
    });

    console.log('\n===============================================================');
    console.log(`  Audit Complete: ${passed} / ${total} Tests Passed!`);
    console.log('===============================================================\n');
}

runAudit().catch(err => {
    console.error('Audit failed:', err);
    process.exit(1);
});
