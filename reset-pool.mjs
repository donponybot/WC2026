// reset-pool.mjs
// Run this ONCE to wipe all test players and results from Firestore
// Usage: node reset-pool.mjs
//
// Requires: npm install firebase-admin
// Set GOOGLE_APPLICATION_CREDENTIALS or paste your service account JSON below

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// ── Option A: use a service account JSON file ─────────────────────
// Download from Firebase Console → Project Settings → Service Accounts → Generate new private key
// Save as service-account.json in this folder
let serviceAccount;
try {
  serviceAccount = JSON.parse(readFileSync('./service-account.json', 'utf8'));
} catch {
  console.error('❌  service-account.json not found.');
  console.error('   Download it from Firebase Console → Project Settings → Service Accounts → Generate new private key');
  process.exit(1);
}

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function reset() {
  console.log('🔄  Resetting pool data…');
  await db.collection('pools').doc('main').set({
    players: [],
    results: {},
  });
  console.log('✅  Done — pool reset to empty state.');
  process.exit(0);
}

reset().catch(err => {
  console.error('❌  Error:', err.message);
  process.exit(1);
});
