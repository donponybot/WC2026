import { useState, useEffect, useCallback } from 'react';
import { createBackup, listBackups, loadBackup, deleteBackup } from '../utils/backup';

function timeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function BackupManager({ players, results, onRestore, lang = 'en' }) {
  const [backups, setBackups]         = useState([]);
  const [loading, setLoading]         = useState(true);
  const [creating, setCreating]       = useState(false);
  const [restoring, setRestoring]     = useState(null);
  const [deleting, setDeleting]       = useState(null);
  const [customLabel, setCustomLabel] = useState('');
  const [showLabelInput, setShowLabelInput] = useState(false);
  const [confirmRestore, setConfirmRestore] = useState(null);
  const [message, setMessage]         = useState(null); // { type: 'ok'|'err', text }

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setBackups(await listBackups());
    } catch (e) {
      setMessage({ type: 'err', text: e.message });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  // Auto-backup every 6 hours if there are players
  useEffect(() => {
    if (players.length === 0) return;
    const last = localStorage.getItem('wc26_last_auto_backup');
    const sixHours = 6 * 60 * 60 * 1000;
    if (!last || Date.now() - Number(last) > sixHours) {
      createBackup(players, results, `Auto – ${new Date().toLocaleString('en-GB')}`)
        .then(() => {
          localStorage.setItem('wc26_last_auto_backup', Date.now().toString());
          refresh();
        })
        .catch(() => {}); // silent fail for auto-backup
    }
  }, []); // eslint-disable-line

  async function handleCreate() {
    setCreating(true);
    setMessage(null);
    try {
      const label = customLabel.trim() || '';
      await createBackup(players, results, label);
      setCustomLabel('');
      setShowLabelInput(false);
      setMessage({ type: 'ok', text: '✅ Backup created successfully' });
      await refresh();
    } catch (e) {
      setMessage({ type: 'err', text: `❌ ${e.message}` });
    } finally {
      setCreating(false);
    }
  }

  async function handleRestore(backup) {
    setRestoring(backup.id);
    setMessage(null);
    try {
      const data = await loadBackup(backup.id);
      await onRestore(data.players, data.results);
      setMessage({ type: 'ok', text: `✅ Restored "${backup.label}"` });
      setConfirmRestore(null);
    } catch (e) {
      setMessage({ type: 'err', text: `❌ ${e.message}` });
    } finally {
      setRestoring(null);
    }
  }

  async function handleDelete(backupId) {
    setDeleting(backupId);
    try {
      await deleteBackup(backupId);
      await refresh();
    } catch (e) {
      setMessage({ type: 'err', text: `❌ ${e.message}` });
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="backup-manager">
      <div className="backup-header">
        <div>
          <h3>🗄️ Backup Manager</h3>
          <p>{backups.length} backup{backups.length !== 1 ? 's' : ''} stored · Auto-backup every 6 hours</p>
        </div>
        <div className="backup-header-actions">
          <button
            className="btn-backup-create"
            onClick={() => setShowLabelInput(p => !p)}
            disabled={creating}
          >
            {creating ? '⏳ Saving…' : '💾 Create Backup'}
          </button>
          <button className="btn-backup-refresh" onClick={refresh} title="Refresh">🔄</button>
        </div>
      </div>

      {/* Optional label input */}
      {showLabelInput && (
        <div className="backup-label-form">
          <input
            placeholder="Optional label e.g. 'Before group stage reset'"
            value={customLabel}
            onChange={e => setCustomLabel(e.target.value)}
            className="backup-label-input"
            onKeyDown={e => e.key === 'Enter' && handleCreate()}
            autoFocus
          />
          <button className="btn-primary" onClick={handleCreate} disabled={creating}>
            {creating ? 'Saving…' : 'Save'}
          </button>
          <button className="btn-secondary" onClick={() => setShowLabelInput(false)}>Cancel</button>
        </div>
      )}

      {/* Status message */}
      {message && (
        <div className={`backup-message ${message.type}`}>
          {message.text}
          <button onClick={() => setMessage(null)} className="backup-msg-close">✕</button>
        </div>
      )}

      {/* Restore confirm dialog */}
      {confirmRestore && (
        <div className="modal-overlay" onClick={() => setConfirmRestore(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>⚠️ Confirm Restore</h3>
            <p>This will replace <strong>all current players and results</strong> with the backup:</p>
            <div className="backup-confirm-label">"{confirmRestore.label}"</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginTop: 8 }}>
              This cannot be undone. Consider creating a backup of the current state first.
            </p>
            <div className="modal-actions">
              <button
                className="btn-danger"
                onClick={() => handleRestore(confirmRestore)}
                disabled={restoring === confirmRestore.id}
              >
                {restoring === confirmRestore.id ? 'Restoring…' : '✅ Yes, Restore'}
              </button>
              <button className="btn-secondary" onClick={() => setConfirmRestore(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Backup list */}
      {loading ? (
        <div className="backup-loading">Loading backups…</div>
      ) : backups.length === 0 ? (
        <div className="backup-empty">No backups yet. Create one above.</div>
      ) : (
        <div className="backup-list">
          {backups.map((b, i) => (
            <div key={b.id} className={`backup-item ${i === 0 ? 'backup-latest' : ''}`}>
              <div className="backup-item-info">
                <div className="backup-item-label">
                  {i === 0 && <span className="backup-latest-badge">Latest</span>}
                  {b.label}
                </div>
                <div className="backup-item-meta">
                  👥 {b.playerCount} player{b.playerCount !== 1 ? 's' : ''}
                  &nbsp;·&nbsp;
                  {timeAgo(b.createdAt)}
                  &nbsp;·&nbsp;
                  <span style={{ color: 'var(--gray-500)', fontSize: '0.75rem' }}>
                    {new Date(b.createdAt).toLocaleString('en-GB')}
                  </span>
                </div>
              </div>
              <div className="backup-item-actions">
                <button
                  className="btn-restore"
                  onClick={() => setConfirmRestore(b)}
                  disabled={restoring === b.id}
                >
                  {restoring === b.id ? '⏳' : '↩️ Restore'}
                </button>
                <button
                  className="btn-delete-backup"
                  onClick={() => handleDelete(b.id)}
                  disabled={deleting === b.id}
                  title="Delete backup"
                >
                  {deleting === b.id ? '⏳' : '🗑️'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
