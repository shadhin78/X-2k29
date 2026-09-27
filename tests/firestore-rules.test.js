/**
 * Firestore Security Rules Test Suite
 * Validates Security Spec & Attack Scenarios for Fixed Single-User x29 Structure
 */

const assert = require('assert');

console.log('=== Firestore Security Rules Specification Test ===');

function evaluateRule({ path, method, docData }) {
    const isValidId = (id) => typeof id === 'string' && id.length > 0 && id.length <= 128 && /^[a-zA-Z0-9_\-]+$/.test(id);

    const parts = path.split('/').filter(Boolean);

    // Default deny for unmatched collections or root
    if (parts.length < 2) return false;

    const collection = parts[0];
    const docId = parts[1];

    if (parts.length > 2) {
        // Subcollections strictly denied by default-deny catch-all
        return false;
    }

    if (collection === 'test') {
        if (!isValidId(docId)) return false;
        if (method === 'get') return true;
        if (method === 'list') return false;
        if (method === 'create' || method === 'update' || method === 'delete') return false;
        return false;
    }

    if (collection === 'x29') {
        if (!isValidId(docId)) return false;
        if (method === 'list') return false;
        if (method === 'get' || method === 'create' || method === 'update' || method === 'delete') {
            return true;
        }
        return false;
    }

    return false;
}

// 1. Connection test probe allowed
assert.strictEqual(
    evaluateRule({ path: '/test/connection', method: 'get' }),
    true,
    'Connection test probe must be allowed'
);

// 2. Test Path Unauthorized Mutation
assert.strictEqual(
    evaluateRule({ path: '/test/connection', method: 'create' }),
    false,
    'Test mutation must be denied'
);

// 3. Collection Scraping (List) Denied
assert.strictEqual(
    evaluateRule({ path: '/x29', method: 'list' }),
    false,
    'List scraping on x29 collection must be denied'
);

// 4. Arbitrary Collection Write Denied
assert.strictEqual(
    evaluateRule({ path: '/system_config/secrets', method: 'create' }),
    false,
    'Arbitrary collection write must be denied'
);

// 5. Arbitrary Collection Read Denied
assert.strictEqual(
    evaluateRule({ path: '/admins/secret_admin', method: 'get' }),
    false,
    'Arbitrary collection read must be denied'
);

// 6. Ghost Subcollection Write Denied
assert.strictEqual(
    evaluateRule({ path: '/x29/state/secrets/hack', method: 'create' }),
    false,
    'Subcollection write must be denied'
);

// 7. ID Poisoning Attack: Oversized ID
const giantId = 'a'.repeat(300);
assert.strictEqual(
    evaluateRule({ path: `/x29/${giantId}`, method: 'get' }),
    false,
    'Oversized ID must be denied'
);

// 8. ID Poisoning Attack: Invalid Characters
assert.strictEqual(
    evaluateRule({ path: '/x29/id$$$poison', method: 'get' }),
    false,
    'Invalid characters ID must be denied'
);

// 9. Valid read on x29/state allowed
assert.strictEqual(
    evaluateRule({ path: '/x29/state', method: 'get' }),
    true,
    'Valid read on x29/state must be allowed'
);

// 10. Valid write on x29/state allowed
assert.strictEqual(
    evaluateRule({ path: '/x29/state', method: 'create' }),
    true,
    'Valid create on x29/state must be allowed'
);

// 11. Valid update on x29/state allowed
assert.strictEqual(
    evaluateRule({ path: '/x29/state', method: 'update' }),
    true,
    'Valid update on x29/state must be allowed'
);

// 12. Valid delete on x29/state allowed
assert.strictEqual(
    evaluateRule({ path: '/x29/state', method: 'delete' }),
    true,
    'Valid delete on x29/state must be allowed'
);

console.log('✓ All Attack Scenarios REJECTED (Permission Denied).');
console.log('✓ All Valid Access Operations ALLOWED.');
console.log('=== Firestore Security Rules Specification Test PASSED ===');
