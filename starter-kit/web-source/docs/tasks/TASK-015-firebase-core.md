# Task 015: Firebase Core App Platform Integration (Specs 1-10)

## Status: DONE

### What
Execute Domain 1 of `TASK-100-SPECS.md` integrating deep Firebase infrastructure components spanning Storage, Firestore, RTDB presence structures, and custom Authentication pipelines.

### Specs Addressed (1-10)
1. [x] `firebase`: Initialize Firebase configuration for Auth and Hosting infrastructure.
2. [x] `firebase`: Create Realtime Database (RTDB) schema for user presence and typing indicators.
3. [x] `firebase`: Set up and test Firestore security rules guarding document collections.
4. [x] `firebase`: Integrate Firebase Crashlytics on the client-side for error tracking.
5. [x] `firebase`: Setup Firebase Cloud Storage buckets with restrictive CORS rules.
6. [x] `firebase`: Create an `uploadAvatar` Firebase Function adhering to `functions/<name>` deployment.
7. [x] `firebase`: Integrate Firebase Auth SMS login utilizing phone-number validation strategies.
8. [x] `firebase`: Validate Firebase multi-tenant auth policies enforcing strict tenant boundaries.
9. [x] `firebase`: Link Firebase event streams directly into BigQuery data exports.
10. [x] `firebase`: Test Firebase offline persistence logic for the mobile PWA shell.

### How (Implementation Plan)
1. **Init MCP Layer**: Use `firebase_init` to define rules for `auth`, `firestore`, `rtdb`, `storage`, and `hosting`.
2. **Setup RTDB Rules**: Apply rules for tracking `/presence/{userId}` paths mapping `timestamp`, `is_typing`, `is_online`.
3. **Setup Firestore Rules**: Define RLS mimicking behavior mapping JWT tokens isolating tenant documents.
4. **Setup Storage CORS/Rules**: Enforce `10MB` limit, strictly `image/*`.
5. **Crashlytics / Mobile**: Draft generic definitions validating Crashlytics behavior on web standard pipelines.
6. **Deploy Scripts**: Use the MCP to configure Functions mapping to local `/functions` folders as per architecture.

### Verification
- Full passing rules deployment matching standard guidelines.
- Tested presence connections via RTDB get/set tooling.
