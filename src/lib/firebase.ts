import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as fbSignOut,
  onAuthStateChanged as fbOnAuthStateChanged,
  type User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import type { PortfolioData } from '../types.ts';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// CRITICAL: Connect directly to the provisioned database ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// -------------------------------------------------------------
// SECURE EMAIL / PASSWORD AUTHENTICATION METHODS
// -------------------------------------------------------------

/**
 * Sign in using Administrator Email and Password.
 * Attempts Firebase Authentication with backend fallback validation.
 */
export async function loginWithEmailPassword(
  email: string,
  pass: string
): Promise<{ token: string; email: string }> {
  // 1. Try Firebase Authentication
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    const idToken = await userCredential.user.getIdToken();
    return { token: idToken, email: userCredential.user.email || email };
  } catch (firebaseErr: unknown) {
    const errObj = firebaseErr as { code?: string; message?: string };
    
    // If Firebase Auth provider is restricted or throws operation-not-allowed,
    // verify securely with the server-side administrator authentication gateway
    if (
      errObj.code === 'auth/operation-not-allowed' ||
      errObj.code === 'auth/admin-restricted-operation' ||
      errObj.code === 'auth/user-not-found'
    ) {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: pass }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid administrator credentials.');
      }

      return { token: data.token, email: data.email || email };
    }

    // Pass standard credential error
    if (
      errObj.code === 'auth/invalid-credential' ||
      errObj.code === 'auth/wrong-password'
    ) {
      throw new Error('Invalid email or password. Please verify your credentials.');
    }

    throw new Error(errObj.message || 'Authentication failed. Please check credentials.');
  }
}

/**
 * Send password reset email via Firebase Auth
 */
export async function sendResetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

/**
 * Sign out from session
 */
export async function logoutAdmin(token?: string): Promise<void> {
  try {
    await fbSignOut(auth);
  } catch {
    // ignore
  }

  if (token) {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // ignore
    }
  }
}

/**
 * Listen to Firebase Auth state changes
 */
export function subscribeToAuthState(callback: (user: User | null) => void) {
  return fbOnAuthStateChanged(auth, callback);
}

// -------------------------------------------------------------
// ADMIN AUTHORIZATION VERIFICATION
// -------------------------------------------------------------

/**
 * Verifies with the server whether the provided token belongs to the authorized administrator.
 */
export async function verifyAdminToken(
  token: string
): Promise<{ authorized: boolean; role?: string; error?: string }> {
  try {
    const response = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (response.ok && data.authorized) {
      return { authorized: true, role: data.role || 'admin' };
    }
    return {
      authorized: false,
      error: data.error || 'Access denied: Account is not authorized as administrator.',
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Authorization verification failed';
    return { authorized: false, error: message };
  }
}

// -------------------------------------------------------------
// SECURE DATA PERSISTENCE (FIRESTORE & BACKEND)
// -------------------------------------------------------------

/**
 * Load published portfolio content.
 * Reads from Firestore doc 'portfolio/published' with fallback to backend API.
 */
export async function loadPortfolioContent(): Promise<Partial<PortfolioData> | null> {
  try {
    const docRef = doc(db, 'portfolio', 'published');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as Partial<PortfolioData>;
    }
  } catch {
    // Fallback to server endpoint
  }

  try {
    const res = await fetch('/api/portfolio');
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {
    // ignore
  }

  return null;
}

/**
 * Save updated portfolio content (Administrator only).
 * Authenticated with Admin Bearer token.
 */
export async function savePortfolioContent(
  newData: PortfolioData,
  token: string
): Promise<{ success: boolean; error?: string }> {
  // 1. Attempt Firestore persistence
  try {
    const docRef = doc(db, 'portfolio', 'published');
    await setDoc(docRef, {
      ...newData,
      updatedAt: new Date().toISOString(),
    });
  } catch (firestoreErr) {
    console.warn('Firestore setDoc notice:', firestoreErr);
  }

  // 2. Persist to server backend API with Bearer token
  try {
    const response = await fetch('/api/portfolio', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      return { success: false, error: result.error || 'Failed to save portfolio' };
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server update error';
    return { success: false, error: message };
  }
}
