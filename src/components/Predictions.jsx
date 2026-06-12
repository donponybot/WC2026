import { t } from '../utils/i18n';
import { useState, useEffect, useRef } from 'react';
import { MATCHES, STAGE, GROUP_TEAMS } from '../data/matches';
import { resolveTeam, scoreMatch } from '../utils/scoring';
import { hashPassword } from '../utils/auth';
import FlagImg from './FlagImg';

function isMatchLocked(match, result) {
  if (Date.now() >= new Date(match.kickoff).getTime()) return true;
  if (result?.isLive || result?.isFinished) return true;
  if (result?.homeScore != null || result?.awayScore != null) return true;
  return false;
}

function getTeamOptions(match, qualifiedTeams, knockoutResults) {
  let home = match.home;
  let away = match.away;
  if (!home) home = resolveTeam(match.homeRef, qualifiedTeams, knockoutResults) || match.homeRef || 'TBD';
  if (!away) away = resolveTeam(match.awayRef, qualifiedTeams, knockoutResults) || match.awayRef || 'TBD';
  return { home, away };
}

const ALL_TEAMS = Object.values(GROUP_TEAMS).flat().sort();

// ── Single prediction cell ────────────────────────────────────────────
function PredCell({ player, match, result, canEdit, onSetPrediction, qualifiedTeams, knockoutResults }) {
  const pred = player.predictions?.[match.id] || {};
  const locked = isMatchLocked(match, result);
  const editable = canEdit && !locked;
  const { home, away } = getTeamOptions(match, qualifiedTeams, knockoutResults);
  const isKnockout = match.stage !== STAGE.GROUP;

  let pts = null;
  if (result?.isFinished && pred.pick) {
    pts = scoreMatch(pred, result, match.stage);
  }

  if (editable) {
    return (
      <td className="pred-cell editable">
        <select
          value={pred.pick || ''}
          onChange={e => onSetPrediction(player.id, match.id, { ...pred, pick: e.target.value })}
          className="pred-select"
          disabled={home === 'TBD' || away === 'TBD'}
        >
          <option value="">–</option>
          <option value="home">{home}</option>
          <option value="draw">🤝 Draw</option>
          <option value="away">{away}</option>
        </select>
        {isKnockout && (
          <div className="score-inputs">
            <input
              type="number" min="0" max="20" placeholder="H"
              value={pred.homeScore ?? ''}
              onChange={e => onSetPrediction(player.id, match.id, { ...pred, homeScore: e.target.value })}
              className="score-inp"
            />
            <span>–</span>
            <input
              type="number" min="0" max="20" placeholder="A"
              value={pred.awayScore ?? ''}
              onChange={e => onSetPrediction(player.id, match.id, { ...pred, awayScore: e.target.value })}
              className="score-inp"
            />
          </div>
        )}
        {pts !== null && <span className="pts-badge">{pts}pts</span>}
      </td>
    );
  }

  const pickLabel =
    pred.pick === 'home' ? home :
    pred.pick === 'away' ? away :
    pred.pick === 'draw' ? 'Draw' : '–';
  const scoreLabel = isKnockout && pred.homeScore != null ? `${pred.homeScore}–${pred.awayScore}` : '';

  return (
    <td className={`pred-cell readonly ${pts !== null ? (pts > 0 ? 'pts-pos' : 'pts-zero') : ''}`}>
      <span className="pick-label" style={{display:'flex',alignItems:'center',gap:4,justifyContent:'center'}}>
        {pred.pick && pred.pick !== 'draw' && <FlagImg team={pred.pick === 'home' ? home : away} size={16} />}
        {pickLabel}
      </span>
      {scoreLabel && <span className="score-label">{scoreLabel}</span>}
      {pts !== null && <span className="pts-badge">{pts}pts</span>}
      {locked && !pred.pick && <span className="locked-icon" title="Locked">🔒</span>}
    </td>
  );
}

// ── Add player form (admin only) ──────────────────────────────────────
function AddPlayerForm({ onAdd, onCancel, lang = 'en' }) {
  const [name, setName] = useState('');
  const [initials, setInitials] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleAdd() {
    if (!name.trim()) { setError(t(lang, 'nameRequired')); return; }
    if (!initials.trim()) { setError(t(lang, 'initialsRequired')); return; }
    if (password.length < 4) { setError(t(lang, 'passwordMin')); return; }
    setLoading(true);
    await onAdd(name.trim(), initials.trim().toUpperCase().slice(0, 4), password);
    setLoading(false);
    setName(''); setInitials(''); setPassword('');
  }

  return (
    <div className="add-player-form">
      <input placeholder={t(lang,'fullName')} value={name} onChange={e => setName(e.target.value)} />
      <input placeholder={t(lang,'initials')} value={initials} onChange={e => setInitials(e.target.value)} maxLength={4} />
      <input type="password" placeholder={t(lang,'passwordLabel')} value={password} onChange={e => setPassword(e.target.value)} />
      {error && <span className="form-error">{error}</span>}
      <button onClick={handleAdd} className="btn-confirm" disabled={loading}>
        {loading ? '…' : t(lang,'add')}
      </button>
      <button onClick={onCancel} className="btn-cancel-sm">{t(lang,'cancel')}</button>
    </div>
  );
}

// ── Change password form (admin only, per player) ─────────────────────
function ChangePasswordForm({ player, onSave, onCancel, lang = 'en' }) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (password.length < 4) return;
    setLoading(true);
    await onSave(player.id, password);
    setLoading(false);
    onCancel();
  }

  return (
    <div className="change-pw-form">
      <input
        type="password"
        placeholder={t(lang,'newPassword')}
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoFocus
        className="modal-input"
      />
      <div className="modal-actions">
        <button className="btn-primary" onClick={handleSave} disabled={loading || password.length < 4}>
          {loading ? '…' : t(lang,'save')}
        </button>
        <button className="btn-secondary" onClick={onCancel}>{t(lang,'cancel')}</button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────
export default function Predictions({
  players, results, qualifiedTeams, koResults: koResultsProp = {},
  isAdmin, loggedInPlayer,
  onAddPlayer, onRemovePlayer, onUpdatePlayer, onSetPrediction, lang = 'en',
}) {
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [stageFilter, setStageFilter] = useState(() => {
    const stages = [STAGE.GROUP, STAGE.R32, STAGE.R16, STAGE.QF, STAGE.SF, STAGE.THIRD, STAGE.FINAL];
    const now = Date.now();
    for (const stage of stages) {
      const hasUpcoming = MATCHES.some(
        m => m.stage === stage && now < new Date(m.kickoff).getTime()
      );
      if (hasUpcoming) return stage;
    }
    return STAGE.FINAL;
  });
  const [editingPlayer, setEditingPlayer] = useState(null);   // { id, name, initials }
  const [confirmRemove, setConfirmRemove] = useState(null);   // player object
  const [changingPasswordFor, setChangingPasswordFor] = useState(null);

  const knockoutResults = koResultsProp;
  const filteredMatches = MATCHES.filter(m => m.stage === stageFilter);

  async function handleAddPlayer(name, initials, password) {
    await onAddPlayer(name, initials, password);
    setShowAddPlayer(false);
  }

  async function handleChangePassword(playerId, newPassword) {
    const hash = await hashPassword(newPassword);
    await onUpdatePlayer(playerId, { passwordHash: hash });
  }

  const stages = [STAGE.GROUP, STAGE.R32, STAGE.R16, STAGE.QF, STAGE.SF, STAGE.THIRD, STAGE.FINAL];
  const stageLabels = {
    [STAGE.GROUP]: t(lang,'groupStage'), [STAGE.R32]: t(lang,'roundOf32'), [STAGE.R16]: t(lang,'roundOf16'), [STAGE.QF]: t(lang,'quarterFinal'),
    [STAGE.SF]: t(lang,'semiFinal'), [STAGE.THIRD]: t(lang,'thirdPlace'), [STAGE.FINAL]: t(lang,'final'),
  };

  const tableWrapRef = useRef(null);

  useEffect(() => {
    const wrap = tableWrapRef.current;
    if (!wrap) return;
    const headers = wrap.querySelectorAll('th.match-col:not(.locked-col)');
    if (headers.length === 0) return;
    const firstUnlocked = headers[0];
    const stickyWidth = 200;
    const targetLeft = firstUnlocked.offsetLeft - stickyWidth;
    wrap.scrollTo({ left: targetLeft, behavior: 'smooth' });
  }, [stageFilter, filteredMatches.length]);

  return (
    <div className="predictions-tab">
      <div className="pred-controls">
        <div className="stage-tabs">
          {stages.map(s => (
            <button
              key={s}
              className={`stage-tab ${stageFilter === s ? 'active' : ''}`}
              onClick={() => setStageFilter(s)}
            >{stageLabels[s]}</button>
          ))}
        </div>
        {isAdmin && (
          <button className="btn-add-player" onClick={() => setShowAddPlayer(p => !p)}>
            {t(lang,'addPlayer')}
          </button>
        )}
      </div>

      {showAddPlayer && isAdmin && (
        <AddPlayerForm onAdd={handleAddPlayer} onCancel={() => setShowAddPlayer(false)} lang={lang} />
      )}

      {players.length === 0 ? (
        <div className="empty-state">
          {isAdmin ? t(lang,'noPlayers') : t(lang,'noPlayersGuest')}
        </div>
      ) : (
        <div className="pred-table-wrap" ref={tableWrapRef}>
          <table className="pred-table">
            <thead>
              <tr>
                <th className="player-col sticky-col">Player</th>
                <th className="init-col sticky-col2">Init.</th>
                {filteredMatches.map(m => {
                  const { home, away } = getTeamOptions(m, qualifiedTeams, knockoutResults);
                  const locked = isMatchLocked(m, results[m.id]);
                  return (
                    <th key={m.id} className={`match-col ${locked ? 'locked-col' : ''}`}>
                      <div className="match-th-date">{m.date}</div>
                      <div className="match-th-time">
                        {new Date(m.kickoff).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'America/New_York' })} ET
                        {' · '}
                        {new Date(m.kickoff).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' })} London
                      </div>
                      <div className="match-th-teams">{home}<br/>vs<br/>{away}</div>
                      {locked && <div className="lock-indicator">🔒</div>}
                      {m.stage !== STAGE.GROUP && <div className="ko-badge">+Score</div>}
                    </th>
                  );
                })}
                <th className="total-col">Pts</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p, idx) => {
                const isMe = loggedInPlayer?.id === p.id;
                const canEdit = isAdmin || isMe;

                const total = filteredMatches.reduce((sum, m) => {
                  const pred = p.predictions?.[m.id];
                  const result = results[m.id];
                  if (!pred || !result?.isFinished) return sum;
                  return sum + scoreMatch(pred, result, m.stage);
                }, 0);

                return (
                  <tr key={p.id} className={`${idx % 2 === 0 ? 'row-even' : 'row-odd'} ${isMe ? 'my-row' : ''}`}>
                    <td className="player-name-cell sticky-col">
                      {isAdmin && editingPlayer?.id === p.id ? (
                        <div className="player-edit-form">
                          <input
                            className="player-edit-name"
                            value={editingPlayer.name}
                            onChange={e => setEditingPlayer(ep => ({ ...ep, name: e.target.value }))}
                            placeholder="Name"
                            autoFocus
                          />
                          <input
                            className="player-edit-initials"
                            value={editingPlayer.initials}
                            onChange={e => setEditingPlayer(ep => ({ ...ep, initials: e.target.value.toUpperCase() }))}
                            placeholder="Init"
                            maxLength={4}
                          />
                          <button className="btn-edit-save" onClick={async () => {
                            await onUpdatePlayer(p.id, { name: editingPlayer.name.trim(), initials: editingPlayer.initials.trim() });
                            setEditingPlayer(null);
                          }}>✓</button>
                          <button className="btn-edit-cancel" onClick={() => setEditingPlayer(null)}>✕</button>
                        </div>
                      ) : (
                        <div className="player-cell-inner">
                          <span>{p.name} {isMe && <span className="you-badge">{t(lang,'you')}</span>}</span>
                          {isAdmin && (
                            <div className="admin-player-actions">
                              <button
                                className="btn-pw"
                                onClick={() => setEditingPlayer({ id: p.id, name: p.name, initials: p.initials })}
                                title="Edit name / initials"
                              >✏️</button>
                              <button
                                className="btn-pw"
                                onClick={() => setChangingPasswordFor(p)}
                                title={t(lang,'changePassword')}
                              >🔑</button>
                              <button
                                className="btn-remove-player"
                                onClick={() => setConfirmRemove(p)}
                                title="Remove player"
                              >🗑️</button>
                            </div>
                          )}
                        </div>
                      )}
                      {isAdmin && changingPasswordFor?.id === p.id && (
                        <ChangePasswordForm
                          player={p}
                          onSave={handleChangePassword}
                          onCancel={() => setChangingPasswordFor(null)}
                          lang={lang}
                        />
                      )}
                    </td>

                    <td className="initials-cell sticky-col2">
                      <span className="initials-display">{p.initials}</span>
                    </td>

                    {filteredMatches.map(m => (
                      <PredCell
                        key={m.id}
                        player={p}
                        match={m}
                        result={results[m.id]}
                        canEdit={canEdit}
                        onSetPrediction={onSetPrediction}
                        qualifiedTeams={qualifiedTeams}
                        knockoutResults={knockoutResults}
                      />
                    ))}

                    <td className="total-cell">{total > 0 ? total : '–'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {players.length > 0 && (
        <div className="champion-section" style={{ marginTop: 32 }}>
          <h3>{t(lang,'championPicks')}</h3>
          <div className="champion-grid">
            {players.map(p => {
              const firstMatch = MATCHES.find(m => m.id === 'gs1');
              const championLocked = isMatchLocked(firstMatch, results['gs1']);
              const canEditChampion = !championLocked && (isAdmin || loggedInPlayer?.id === p.id);
              return (
                <div key={p.id} className={`champion-card ${loggedInPlayer?.id === p.id ? 'my-card' : ''}`}>
                  <div className="champ-initials">{p.initials}</div>
                  <div className="champ-name">{p.name}</div>
                  {canEditChampion ? (
                    <select
                      value={p.champion || ''}
                      onChange={e => onUpdatePlayer(p.id, { champion: e.target.value || null })}
                      className="champ-select"
                    >
                      <option value="">{t(lang,'pick')}</option>
                      {ALL_TEAMS.map(team => <option key={team} value={team}>{team}</option>)}
                    </select>
                  ) : (
                    <div className="champ-pick">
                      {p.champion ? <><FlagImg team={p.champion} size={20} style={{marginRight:4}} />{p.champion}</> : '–'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Confirm remove modal */}
      {confirmRemove && (
        <div className="modal-overlay" onClick={() => setConfirmRemove(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>🗑️ Remove Player</h3>
            <p>Are you sure you want to remove <strong>{confirmRemove.name}</strong>?</p>
            <p style={{fontSize:'0.85rem',color:'var(--gray-500)'}}>
              This will delete all their predictions and cannot be undone.
              Consider creating a backup first.
            </p>
            <div className="modal-actions">
              <button
                className="btn-danger"
                onClick={async () => { await onRemovePlayer(confirmRemove.id); setConfirmRemove(null); }}
              >Remove</button>
              <button className="btn-secondary" onClick={() => setConfirmRemove(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
