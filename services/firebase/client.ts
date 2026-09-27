import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

export interface FirebaseClientConfig {
  projectId: string;
  appId: string;
  apiKey: string;
  authDomain: string;
  firestoreDatabaseId: string;
  storageBucket: string;
  messagingSenderId: string;
  measurementId?: string;
  oAuthClientId?: string;
  recaptchaSiteKey?: string;
}

export const defaultFirebaseConfig: FirebaseClientConfig = {
  projectId: 'project-x-2k-29',
  appId: '1:445936647757:web:166e2d905fa7cc62a12604',
  apiKey: 'AIzaSyBYadAquEl7BWd8nPy19q6UhDW4FYk3lcs',
  authDomain: 'project-x-2k-29.firebaseapp.com',
  firestoreDatabaseId: 'ai-studio-x2k29-0bea0128-fcaa-4732-97b2-c13b97d4515f',
  storageBucket: 'project-x-2k-29.firebasestorage.app',
  messagingSenderId: '445936647757',
  measurementId: '',
  oAuthClientId: '445936647757-kp7rrrmh1oq5ra0m0mtbdu6lr9mj95kh.apps.googleusercontent.com',
  recaptchaSiteKey: '',
};

let cachedApp: FirebaseApp | null = null;
let cachedFirestore: Firestore | null = null;

/**
 * Initializes and retrieves the singleton Firebase App instance.
 */
export function getFirebaseApp(config: FirebaseClientConfig = defaultFirebaseConfig): FirebaseApp {
  if (getApps().length > 0) {
    cachedApp = getApp();
    return cachedApp;
  }
  cachedApp = initializeApp(config);
  return cachedApp;
}

/**
 * Retrieves the typed Firestore instance targeting the specific configured database ID.
 */
export function getFirestoreDb(config: FirebaseClientConfig = defaultFirebaseConfig): Firestore {
  if (cachedFirestore) {
    return cachedFirestore;
  }
  const app = getFirebaseApp(config);
  // Target the custom databaseId if configured, or default database
  cachedFirestore = config.firestoreDatabaseId && config.firestoreDatabaseId !== '(default)'
    ? getFirestore(app, config.firestoreDatabaseId)
    : getFirestore(app);

  return cachedFirestore;
}
