import { useState } from 'react';
import { t } from '../utils/i18n';

export function Rules({ lang = 'en', playerCount = 0 }) {
  return (
    <div className="rules-tab">
      <h2>{t(lang,'rulesTitle')}</h2>

      {/* Prize pool banner */}
      <div className="prize-banner">
        <div className="prize-shine" />
        <div className="prize-content">
          <div className="prize-trophy">🏆</div>
          <div className="prize-text">
            <div className="prize-label">Winner Takes All</div>
            <div className="prize-amount">{playerCount > 0 ? `£${playerCount * 20}` : '£20 per player'}</div>
            <div className="prize-sub">£20 entry · {playerCount > 0 ? `${playerCount} players` : 'per player'}</div>
          </div>
          <div className="prize-trophy">🏆</div>
        </div>
      </div>

      <div className="rules-section">
        <h3>{t(lang,'championRuleTitle')}</h3>
        <p>{t(lang,'championRuleDesc')}</p>
        <div className="pts-rule"><span>5 pts</span> {t(lang,'pts5')}</div>
      </div>
      <div className="rules-section">
        <h3>{t(lang,'groupRuleTitle')}</h3>
        <p>{t(lang,'groupRuleDesc')}</p>
        <div className="pts-rule"><span>2 pts</span> {t(lang,'pts2group')}</div>
      </div>
      <div className="rules-section">
        <h3>{t(lang,'knockoutRuleTitle')}</h3>
        <p>{t(lang,'knockoutRuleDesc')}</p>
        <div className="pts-rule"><span>2 pts</span> {t(lang,'pts2ko')}</div>
        <div className="pts-rule"><span>3 pts</span> {t(lang,'pts3ko')}</div>
        <p className="note">{t(lang,'knockoutRuleNote')}</p>
      </div>
      <div className="rules-section warning">
        <h3>{t(lang,'deadlineTitle')}</h3>
        <ul>
          <li>{t(lang,'deadlineRule1')}</li>
          <li>{t(lang,'deadlineRule2')}</li>
          <li>{t(lang,'deadlineRule3')}</li>
          <li><strong>{t(lang,'deadlineRule4')}</strong></li>
        </ul>
      </div>
      <div className="rules-section gold">
        <h3>{t(lang,'prizeTitle')}</h3>
        <p>{t(lang,'prizeDesc')}</p>
      </div>
    </div>
  );
}

export function AdminModal({ onLogin, onClose, lang = 'en' }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    const ok = onLogin(pw);
    if (!ok) { setError(t(lang,'incorrectPassword')); setPw(''); }
  }
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>{t(lang,'adminLoginTitle')}</h3>
        <p>{t(lang,'adminLoginDesc')}</p>
        <form onSubmit={handleSubmit}>
          <input type="password" placeholder={t(lang,'password')} value={pw} onChange={e => setPw(e.target.value)} autoFocus className="modal-input" />
          {error && <div className="modal-error">{error}</div>}
          <div className="modal-actions">
            <button type="submit" className="btn-primary">{t(lang,'loginBtn')}</button>
            <button type="button" className="btn-secondary" onClick={onClose}>{t(lang,'cancel')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ApiKeyModal({ onClose, onSave, lang = 'en' }) {
  const [key, setKey] = useState(localStorage.getItem('fd_api_key') || '');
  const [competitionId, setCompetitionId] = useState(localStorage.getItem('fd_competition') || '2000');
  function handleSave() {
    localStorage.setItem('fd_api_key', key.trim());
    localStorage.setItem('fd_competition', competitionId.trim());
    onSave?.(); onClose();
  }
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal wide" onClick={e => e.stopPropagation()}>
        <h3>{t(lang,'apiKeyTitle')}</h3>
        <p>{t(lang,'apiKeyDesc')} <a href="https://www.football-data.org/" target="_blank" rel="noreferrer">football-data.org</a></p>
        <label className="modal-label">{t(lang,'apiKeyLabel')}</label>
        <input type="text" value={key} onChange={e => setKey(e.target.value)} className="modal-input" />
        <label className="modal-label">{t(lang,'competitionLabel')}</label>
        <input type="text" value={competitionId} onChange={e => setCompetitionId(e.target.value)} className="modal-input" />
        <p className="note">{t(lang,'competitionNote')}</p>
        <div className="modal-actions">
          <button className="btn-primary" onClick={handleSave}>{t(lang,'save')}</button>
          <button className="btn-secondary" onClick={onClose}>{t(lang,'cancel')}</button>
        </div>
      </div>
    </div>
  );
}
