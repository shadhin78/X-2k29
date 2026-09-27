/**
 * X-29 Module: services/firebase.js
 * Firebase Modular SDK initialization, Firestore connection validation,
 * document operations, and real-time synchronization.
 * Authentication has been completely removed for this private single-user system.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  initializeFirestore,
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

// Initialize Firestore targeting the provisioned database with long-polling enabled for iframe environment
function initFirestoreInstance() {
  try {
    return initializeFirestore(app, {
      experimentalForceLongPolling: true
    }, firebaseConfig.firestoreDatabaseId);
  } catch (e) {
    return getFirestore(app, firebaseConfig.firestoreDatabaseId);
  }
}

export const db = initFirestoreInstance();

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
  window.firestoreDb = db;
}

/**
 * Standardized Firestore error handler throwing JSON context
 */
export function handleFirestoreError(error, operationType, path) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
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
    if (error instanceof Error && error.message && error.message.includes('the client is offline')) {
      console.warn('[Firebase] Client running in offline mode.');
    }
  }
}

// Call on module load to test connection
testConnection();

/**
 * Modular Firestore adapter for backward-compatible document queries
 */
export function createFirestoreAdapter(customDb = db) {
  return {
    _rawDb: customDb,
    collection: function(colName) {
      return {
        doc: function(docId) {
          const docRef = doc(customDb, colName, docId);
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
                const snap = await getDoc(docRef);
                const isExist = typeof snap.exists === 'function' ? snap.exists() : Boolean(snap.exists);
                return {
                  _rawSnap: snap,
                  get exists() { return isExist; },
                  data: () => (typeof snap.data === 'function' ? snap.data() : snap.data),
                  id: snap.id,
                  metadata: snap.metadata || { hasPendingWrites: false, fromCache: false }
                };
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
              return onSnapshot(docRef, (snap) => {
                const isExist = typeof snap.exists === 'function' ? snap.exists() : Boolean(snap.exists);
                const normalizedSnap = {
                  _rawSnap: snap,
                  get exists() { return isExist; },
                  data: () => (typeof snap.data === 'function' ? snap.data() : snap.data),
                  id: snap.id,
                  metadata: snap.metadata || { hasPendingWrites: false, fromCache: false }
                };
                if (typeof onNext === 'function') onNext(normalizedSnap);
              }, (err) => {
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

// Bind to AppState and global scope if in browser
if (typeof window !== 'undefined') {
  if (!window.AppState) window.AppState = {};
  window.createFirestoreAdapter = createFirestoreAdapter;
  window.AppState.db = createFirestoreAdapter();
  window.modularFirebase = {
    app,
    db,
    testConnection,
    serverTimestamp,
    deleteField,
    createFirestoreAdapter
  };
}
export default {
  app,
  db,
  testConnection,
  serverTimestamp,
  deleteField,
  createFirestoreAdapter
};
