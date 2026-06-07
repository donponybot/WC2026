// src/utils/firestore.js
// All shared state lives in Firestore under a single "pool" document
// Structure:
//   pools/main  →  { players: [...], results: {...} }

import {
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

const POOL_REF = doc(db, 'pools', 'main');

// ── Bootstrap empty doc if it doesn't exist ────────────────────────
export async function ensurePoolExists() {
  const snap = await getDoc(POOL_REF);
  if (!snap.exists()) {
    await setDoc(POOL_REF, { players: [], results: {} });
  }
}

// ── Real-time listener ─────────────────────────────────────────────
// cb receives { players, results } whenever anything changes
export function subscribePool(cb) {
  return onSnapshot(POOL_REF, snap => {
    if (snap.exists()) {
      const data = snap.data();
      cb({
        players: data.players || [],
        results: data.results || {},
      });
    }
  });
}

// ── Write helpers ──────────────────────────────────────────────────

export async function savePlayers(players) {
  await updateDoc(POOL_REF, { players });
}

export async function saveResults(results) {
  await updateDoc(POOL_REF, { results });
}

// Merge a single result update (avoids overwriting entire results map)
export async function saveOneResult(matchId, result) {
  await updateDoc(POOL_REF, {
    [`results.${matchId}`]: result,
  });
}
