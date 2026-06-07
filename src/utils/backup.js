// Backup system — stores snapshots in Firestore under backups/{timestamp}
// Each backup contains the full pool state: players + results
// Max 30 backups kept (oldest auto-deleted)

import {
  collection, doc, setDoc, getDocs,
  deleteDoc, orderBy, query, limit,
} from 'firebase/firestore';
import { db } from '../firebase';

const BACKUPS_COL = collection(db, 'backups');
const MAX_BACKUPS = 30;

/**
 * Create a backup snapshot of current pool state.
 * label: optional human-readable label e.g. 'Before reset'
 */
export async function createBackup(players, results, label = '') {
  const now = new Date();
  const id = `backup_${now.getTime()}`;
  const snapshot = {
    id,
    label: label || `Auto – ${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} ${now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`,
    createdAt: now.toISOString(),
    playerCount: players.length,
    players,
    results,
  };
  await setDoc(doc(BACKUPS_COL, id), snapshot);
  await pruneOldBackups();
  return snapshot;
}

/**
 * List all backups, newest first.
 */
export async function listBackups() {
  const q = query(BACKUPS_COL, orderBy('createdAt', 'desc'), limit(MAX_BACKUPS));
  const snap = await getDocs(q);
  return snap.docs.map(d => {
    const data = d.data();
    return {
      id: data.id,
      label: data.label,
      createdAt: data.createdAt,
      playerCount: data.playerCount,
    };
  });
}

/**
 * Restore a backup — returns { players, results } ready to save to pool.
 */
export async function loadBackup(backupId) {
  const snap = await getDocs(BACKUPS_COL);
  const doc_ = snap.docs.find(d => d.id === backupId);
  if (!doc_) throw new Error('Backup not found');
  const data = doc_.data();
  return { players: data.players || [], results: data.results || {} };
}

/**
 * Delete a specific backup.
 */
export async function deleteBackup(backupId) {
  await deleteDoc(doc(BACKUPS_COL, backupId));
}

/**
 * Keep only the most recent MAX_BACKUPS, delete the rest.
 */
async function pruneOldBackups() {
  const q = query(BACKUPS_COL, orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  const toDelete = snap.docs.slice(MAX_BACKUPS);
  await Promise.all(toDelete.map(d => deleteDoc(d.ref)));
}
