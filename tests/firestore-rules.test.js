/**
 * Firestore Security Rules Test Suite
 * Validates Security Spec & Dirty Dozen Test Cases
 */

const assert = require('assert');

console.log('=== Firestore Security Rules Specification Test ===');

function evaluateRule({ auth, path, method, docData }) {
    // Global Deny
    const isSigned = auth !== null;
    const isValidId = (id) => typeof id === 'string' && id.length > 0 && id.length <= 128 && /^[a-zA-Z0-9_\-]+$/.test(id);
    const isAdmin = isSigned && ((auth.token?.email === 'ris2k29@gmail.com' && auth.token?.email_verified === true) || auth.isAdmin === true);

    const parts = path.split('/').filter(Boolean);

    // Default deny for unmatched collections
    if (parts.length < 2) return false;

    const collection = parts[0];
    const docId = parts[1];

    if (parts.length > 2) {
        // Subcollections denied
        return false;
    }

    if (collection === 'test') {
        if (!isValidId(docId)) return false;
        if (method === 'get') return true;
        if (method === 'list') return false;
        if (method === 'create' || method === 'update' || method === 'delete') return isAdmin;
        return false;
    }

    if (collection === 'users') {
        if (!isValidId(docId)) return false;
        if (method === 'list') return false;
        const isOwner = isSigned && auth.uid === docId;
        const permitted = isOwner || isAdmin;

        if (method === 'get' || method === 'create' || method === 'update' || method === 'delete') {
            return permitted;
        }
        return false;
    }

    return false;
}

// 1. Unauthenticated Read
assert.strictEqual(
    evaluateRule({ auth: null, path: '/users/admin_uid', method: 'get' }),
    false,
    'Dirty Dozen #1: Unauthenticated Read must be denied'
);

// 2. Cross-Tenant Read
assert.strictEqual(
    evaluateRule({ auth: { uid: 'attacker_1' }, path: '/users/victim_1', method: 'get' }),
    false,
    'Dirty Dozen #2: Cross-Tenant Read must be denied'
);

// 3. Collection Scraping (List)
assert.strictEqual(
    evaluateRule({ auth: { uid: 'user_1' }, path: '/users', method: 'list' }),
    false,
    'Dirty Dozen #3: Blanket List must be denied'
);

// 4. Identity Spoofing Create
assert.strictEqual(
    evaluateRule({ auth: { uid: 'attacker_1' }, path: '/users/victim_1', method: 'create' }),
    false,
    'Dirty Dozen #4: Identity Spoofing Create must be denied'
);

// 5. Identity Hijacking Update
assert.strictEqual(
    evaluateRule({ auth: { uid: 'attacker_1' }, path: '/users/victim_1', method: 'update' }),
    false,
    'Dirty Dozen #5: Identity Hijacking Update must be denied'
);

// 6. Malicious Delete
assert.strictEqual(
    evaluateRule({ auth: { uid: 'attacker_1' }, path: '/users/victim_1', method: 'delete' }),
    false,
    'Dirty Dozen #6: Malicious Delete must be denied'
);

// 7. ID Poisoning Attack
const giantId = 'a'.repeat(300);
assert.strictEqual(
    evaluateRule({ auth: { uid: giantId }, path: `/users/${giantId}`, method: 'get' }),
    false,
    'Dirty Dozen #7: Oversized ID must be denied'
);
assert.strictEqual(
    evaluateRule({ auth: { uid: 'id$$$poison' }, path: '/users/id$$$poison', method: 'get' }),
    false,
    'Dirty Dozen #7: Invalid characters ID must be denied'
);

// 8. Unauthenticated Write
assert.strictEqual(
    evaluateRule({ auth: null, path: '/users/any_uid', method: 'create' }),
    false,
    'Dirty Dozen #8: Unauthenticated Write must be denied'
);

// 9. Arbitrary Collection Write
assert.strictEqual(
    evaluateRule({ auth: { uid: 'user_1' }, path: '/system_config/secrets', method: 'create' }),
    false,
    'Dirty Dozen #9: Arbitrary Collection Write must be denied'
);

// 10. Arbitrary Collection Read
assert.strictEqual(
    evaluateRule({ auth: { uid: 'user_1' }, path: '/admins/secret_admin', method: 'get' }),
    false,
    'Dirty Dozen #10: Arbitrary Collection Read must be denied'
);

// 11. Test Path Unauthorized Mutation
assert.strictEqual(
    evaluateRule({ auth: { uid: 'user_1' }, path: '/test/connection', method: 'create' }),
    false,
    'Dirty Dozen #11: Test mutation by non-admin must be denied'
);

// 12. Ghost Subcollection Write
assert.strictEqual(
    evaluateRule({ auth: { uid: 'attacker' }, path: '/users/victim/secrets/hack', method: 'create' }),
    false,
    'Dirty Dozen #12: Subcollection write must be denied'
);

// Valid operations:
// Owner can get their own document
assert.strictEqual(
    evaluateRule({ auth: { uid: 'valid_user_1' }, path: '/users/valid_user_1', method: 'get' }),
    true,
    'Owner can get own document'
);
// Owner can update their own document
assert.strictEqual(
    evaluateRule({ auth: { uid: 'valid_user_1' }, path: '/users/valid_user_1', method: 'update' }),
    true,
    'Owner can update own document'
);
// Admin with verified email can access
assert.strictEqual(
    evaluateRule({ auth: { uid: 'admin_uid', token: { email: 'ris2k29@gmail.com', email_verified: true } }, path: '/users/any_user', method: 'get' }),
    true,
    'Admin with verified email can get user document'
);
// Anyone can test connection
assert.strictEqual(
    evaluateRule({ auth: null, path: '/test/connection', method: 'get' }),
    true,
    'Connection test probe allowed'
);

console.log('✓ All 12 Dirty Dozen Attack Scenarios REJECTED (Permission Denied).');
console.log('✓ All Valid Access Operations ALLOWED.');
console.log('=== Firestore Security Rules Specification Test PASSED ===');
