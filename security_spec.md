# Security Specification & Test-Driven Hardening (X-29 Workspace)

## 1. Data Invariants
1. **Private Workspace Ownership**: Every document in `/users/{userId}` is strictly owned by the authenticated user matching `request.auth.uid == userId`.
2. **Denial of Blanket Reads**: Unauthenticated users or non-owners cannot list or query `/users`. `allow list` is completely denied.
3. **ID Sanitization & Hardening**: Every `userId` path variable must satisfy `isValidId(userId)` (alphanumeric, dashes, underscores, max 128 characters).
4. **Bootstrapped Admin Access**: The application admin (`ris2k29@gmail.com`) is recognized for administrative operations.
5. **No Orphaned or Spoofed Records**: Document writes require authenticated and matching session identity.
6. **Default Deny Fallback**: Any path not explicitly matched is denied by default (`match /{document=**} { allow read, write: if false; }`).

## 2. The "Dirty Dozen" Payloads (Malicious / Invalid Scenarios)
1. **Unauthenticated Read**: Anonymous/unauthenticated user tries to `get` `/users/admin_uid`.
   - *Expected*: `PERMISSION_DENIED`
2. **Cross-Tenant Read**: Authenticated user `attacker_uid` attempts to read `/users/victim_uid`.
   - *Expected*: `PERMISSION_DENIED`
3. **Collection Scraping (Blanket List)**: Authenticated user queries `collection('users')` to list all registered users.
   - *Expected*: `PERMISSION_DENIED`
4. **Identity Spoofing Create**: Authenticated user `attacker_uid` attempts to create `/users/victim_uid`.
   - *Expected*: `PERMISSION_DENIED`
5. **Identity Hijacking Update**: Authenticated user `attacker_uid` attempts to update state in `/users/victim_uid`.
   - *Expected*: `PERMISSION_DENIED`
6. **Malicious Delete**: Authenticated user `attacker_uid` attempts to delete `/users/victim_uid`.
   - *Expected*: `PERMISSION_DENIED`
7. **ID Poisoning Attack**: User attempts write to `/users/{giant_1000_char_string_with_illegal_characters}`.
   - *Expected*: `PERMISSION_DENIED`
8. **Unauthenticated Write**: Unauthenticated client attempts to write state to `/users/any_uid`.
   - *Expected*: `PERMISSION_DENIED`
9. **Arbitrary Collection Write**: User attempts write to `/system_config/secrets` or `/admin_panel/settings`.
   - *Expected*: `PERMISSION_DENIED`
10. **Arbitrary Collection Read**: User attempts read from `/admins/{adminId}` or arbitrary root document.
   - *Expected*: `PERMISSION_DENIED`
11. **Test Path Mutation**: Unauthenticated or unauthorized user attempts write or delete on `/test/connection`.
   - *Expected*: `PERMISSION_DENIED`
12. **Ghost Subcollection Write**: Attacker attempts to create documents in arbitrary subcollections like `/users/victim/secrets/hack`.
   - *Expected*: `PERMISSION_DENIED`
