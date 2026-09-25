/**
 * X-29 Module: services/firebase.js
 * Firebase Modular SDK initialization, Firestore connection validation,
 * authenticated operations, and real-time synchronization.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  collection, 
  getDoc, 
  getDocFromServer, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  serverTimestamp, 
  deleteField 
} from 'firebase/firestore';
import { firebaseConfig } from '../firebase-config.js';

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// CRITICAL: The app will break without specifying firestoreDatabaseId
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Operation types enum conforming to specification
export const OperationType = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LIST: 'list',
  GET: 'get',
  WRITE: 'write',
};

if (typeof window !== 'undefined') {
  window.OperationType = OperationType;
  window.firebaseAuth = auth;
  window.firestoreDb = db;
}

/**
 * Standardized Firestore error handler throwing JSON context
 */
export function handleFirestoreError(error, operationType, path) {
  const currentUser = auth ? auth.currentUser : null;
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid || null,
      email: currentUser?.email || null,
      emailVerified: currentUser?.emailVerified || null,
      isAnonymous: currentUser?.isAnonymous || null,
      tenantId: currentUser?.tenantId || null,
      providerInfo: currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

if (typeof window !== 'undefined') {
  window.handleFirestoreError = handleFirestoreError;
}

/**
 * Validate connection to Firestore at application boot
 */
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('[Firebase] Connection to Firestore verified.');
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('[Firebase] Please check your Firebase configuration.');
    }
  }
}

// Call on module load to test connection
testConnection();

/**
 * Sign in using Google OAuth Popup
 */
export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (err) {
    console.error('[Firebase] Google sign-in error:', err);
    throw err;
  }
}

/**
 * Sign in using Email / Password
 */
export async function loginWithEmail(email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  } catch (err) {
    console.error('[Firebase] Email sign-in error:', err);
    throw err;
  }
}

/**
 * Sign out current session
 */
export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (err) {
    console.error('[Firebase] Sign-out error:', err);
    throw err;
  }
}

/**
 * Modular Firestore adapter for backward-compatible document queries
 */
export function createFirestoreAdapter() {
  return {
    _rawDb: db,
    collection: function(colName) {
      return {
        doc: function(docId) {
          const docRef = doc(db, colName, docId);
          return {
            ref: docRef,
            set: async function(data, options = {}) {
              try {
                return await setDoc(docRef, data, options);
              } catch (err) {
                if (err && (err.code === 'permission-denied' || (err.message && err.message.includes('insufficient permissions')))) {
                  handleFirestoreError(err, OperationType.WRITE, `${colName}/${docId}`);
                }
                throw err;
              }
            },
            get: async function() {
              try {
                return await getDoc(docRef);
              } catch (err) {
                if (err && (err.code === 'permission-denied' || (err.message && err.message.includes('insufficient permissions')))) {
                  handleFirestoreError(err, OperationType.GET, `${colName}/${docId}`);
                }
                throw err;
              }
            },
            delete: async function() {
              try {
                return await deleteDoc(docRef);
              } catch (err) {
                if (err && (err.code === 'permission-denied' || (err.message && err.message.includes('insufficient permissions')))) {
                  handleFirestoreError(err, OperationType.DELETE, `${colName}/${docId}`);
                }
                throw err;
              }
            },
            onSnapshot: function(onNext, onError) {
              return onSnapshot(docRef, onNext, (err) => {
                if (err && (err.code === 'permission-denied' || (err.message && err.message.includes('insufficient permissions')))) {
                  try {
                    handleFirestoreError(err, OperationType.GET, `${colName}/${docId}`);
                  } catch (e) {}
                }
                if (typeof onError === 'function') onError(err);
              });
            }
          };
        }
      };
    }
  };
}

// Bind to AppState if AppState exists
if (typeof window !== 'undefined') {
  if (!window.AppState) window.AppState = {};
  window.AppState.db = createFirestoreAdapter();
  window.modularFirebase = {
    app,
    db,
    auth,
    loginWithGoogle,
    loginWithEmail,
    logoutUser,
    testConnection,
    serverTimestamp,
    deleteField
  };
}
