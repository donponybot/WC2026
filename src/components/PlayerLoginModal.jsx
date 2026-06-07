import { useState } from 'react';
import { verifyPassword } from '../utils/auth';
import { t } from '../utils/i18n';

export default function PlayerLoginModal({ players, onLogin, onClose, lang = 'en' }) {
  const [selectedId, setSelectedId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedId) { setError(t(lang,'yourName')); return; }
    const player = players.find(p => p.id === selectedId);
    if (!player?.passwordHash) { setError(t(lang,'noPassword')); return; }
    setLoading(true); setError('');
    const ok = await verifyPassword(password, player.passwordHash);
    setLoading(false);
    if (ok) { onLogin(player); }
    else { setError(t(lang,'incorrectPassword')); setPassword(''); }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>{t(lang,'playerLoginTitle')}</h3>
        <p>{t(lang,'playerLoginDesc')}</p>
        <form onSubmit={handleSubmit}>
          <label className="modal-label">{t(lang,'yourName')}</label>
          <select value={selectedId} onChange={e => { setSelectedId(e.target.value); setError(''); }} className="modal-input" autoFocus>
            <option value="">{t(lang,'selectName')}</option>
            {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <label className="modal-label">{t(lang,'password')}</label>
          <input type="password" placeholder={t(lang,'password')} value={password} onChange={e => { setPassword(e.target.value); setError(''); }} className="modal-input" />
          {error && <div className="modal-error">{error}</div>}
          <div className="modal-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? t(lang,'checking') : t(lang,'loginBtn')}
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>{t(lang,'cancel')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
