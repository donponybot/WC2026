import { t } from '../utils/i18n';
import { useState, useRef, useEffect } from 'react';
import { MATCHES, STAGE } from '../data/matches';
import { resolveTeam } from '../utils/scoring';
import FlagImg from './FlagImg';
import LineupPanel from './LineupPanel';
import { UK_TV, UK_CHANNELS } from '../data/ukTv';

const STAGE_COLORS = {
  [STAGE.GROUP]: '#0f3460',
  [STAGE.R32]:   '#c2410c',
  [STAGE.R16]:   '#b45309',
  [STAGE.QF]:    '#7c3aed',
  [STAGE.SF]:    '#166534',
  [STAGE.THIRD]: '#854d0e',
  [STAGE.FINAL]: '#991b1b',
};

function STAGE_LABELS(lang) { return {
  [STAGE.GROUP]: t(lang,'groupStage'),
  [STAGE.R32]:   t(lang,'roundOf32'),
  [STAGE.R16]:   t(lang,'roundOf16'),
  [STAGE.QF]:    t(lang,'quarterFinal'),
  [STAGE.SF]:    t(lang,'semiFinal'),
  [STAGE.THIRD]: t(lang,'thirdPlace'),
  [STAGE.FINAL]: '🏆 ' + t(lang,'final'),
}; }

function getTeamName(match, side, qualifiedTeams, knockoutResults) {
  const name = side === 'home' ? match.home : match.away;
  if (name) return name;
  const ref = side === 'home' ? match.homeRef : match.awayRef;
  return resolveTeam(ref, qualifiedTeams, knockoutResults) || ref || 'TBD';
}

export default function MatchSchedule({ results, qualifiedTeams, koResults = {}, isAdmin, onResultOverride, lang = 'en' }) {
  const [filterStage, setFilterStage] = useState(() => {
    const stages = [STAGE.GROUP, STAGE.R32, STAGE.R16, STAGE.QF, STAGE.SF, STAGE.THIRD, STAGE.FINAL];
    const now = Date.now();
    for (const stage of stages) {
      const hasUpcoming = MATCHES.some(m => m.stage === stage && now < new Date(m.kickoff).getTime());
      if (hasUpcoming) return stage;
    }
    return 'all';
  });
  const [editingMatch, setEditingMatch] = useState(null);
  const [editScore, setEditScore] = useState({ home: '', away: '' });
  const [editingHighlights, setEditingHighlights] = useState(null);
  const [highlightsInput, setHighlightsInput] = useState('');
  const [lineup, setLineup] = useState(null); // { team, match }
  const dateGroupRefs = useRef({});

  useEffect(() => {
    const stageMates = filterStage === 'all' ? MATCHES : MATCHES.filter(m => m.stage === filterStage);
    const dates = [...new Set(stageMates.map(m => m.date))].sort();
    let targetDate = null;
    for (const date of dates) {
      const hasResult = stageMates.some(m => m.date === date && (results[m.id]?.isFinished || results[m.id]?.isLive));
      if (hasResult) targetDate = date;
    }
    const el = dateGroupRefs.current[targetDate || dates[0]];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [filterStage]);

  const stages = ['all', ...Object.values(STAGE)];
  const filtered = filterStage === 'all' ? MATCHES : MATCHES.filter(m => m.stage === filterStage);

  const byDate = {};
  for (const m of filtered) {
    if (!byDate[m.date]) byDate[m.date] = [];
    byDate[m.date].push(m);
  }

  function startEdit(match) {
    const r = results[match.id];
    setEditingMatch(match.id);
    setEditScore({ home: r?.homeScore ?? '', away: r?.awayScore ?? '', penWinner: r?.penWinner ?? '' });
  }

  function saveEdit(match) {
    const hs = parseInt(editScore.home);
    const as_ = parseInt(editScore.away);
    if (isNaN(hs) || isNaN(as_)) return;
    const isKO = match.stage !== STAGE.GROUP;
    // penWinner only applies to KO matches where scores are level after FT/AET
    const penWinner = (isKO && hs === as_ && editScore.penWinner) ? editScore.penWinner : null;
    onResultOverride(match.id, {
      homeScore: hs,
      awayScore: as_,
      isFinished: true,
      isLive: false,
      status: 'FINISHED',
      ...(isKO && { penWinner }),
    });
    setEditingMatch(null);
  }

  function startEditHighlights(match) {
    setEditingHighlights(match.id);
    setHighlightsInput(results[match.id]?.highlightsUrl || '');
  }

  function saveHighlights(match) {
    const result = results[match.id];
    const url = highlightsInput.trim();
    onResultOverride(match.id, {
      ...result,
      highlightsUrl: url || undefined,
    });
    setEditingHighlights(null);
  }

  return (
    <div className="schedule-tab">
      <div className="filter-bar">
        {stages.map(s => (
          <button
            key={s}
            className={`filter-btn ${filterStage === s ? 'active' : ''}`}
            style={filterStage === s && s !== 'all' ? { background: STAGE_COLORS[s] } : {}}
            onClick={() => setFilterStage(s)}
          >
            {s === 'all' ? t(lang,'allMatches') : STAGE_LABELS(lang)[s] || s}
          </button>
        ))}
      </div>

      {Object.entries(byDate).map(([date, matches]) => (
        <div key={date} className="date-group" ref={el => { dateGroupRefs.current[date] = el; }}>
          <div className="date-header">{date}</div>
          <div className="match-list">
            {matches.map(match => {
              const result = results[match.id];
              const statusLabel = (() => {
                if (!result) return '';
                if (result.isFinished) return result.penWinner ? 'Pens' : t(lang,'ft');
                if (result.isLive) return result.minute ? `${result.minute}'` : t(lang,'live');
                return '';
              })();
              const homeWins = result?.isFinished && (result.penWinner === 'home' || (!result.penWinner && result.homeScore > result.awayScore));
              const awayWins = result?.isFinished && (result.penWinner === 'away' || (!result.penWinner && result.awayScore > result.homeScore));
              const homeTeam = getTeamName(match, 'home', qualifiedTeams, koResults);
              const awayTeam = getTeamName(match, 'away', qualifiedTeams, koResults);
              const isEditing = editingMatch === match.id;
              const now = Date.now();
              const kickoff = new Date(match.kickoff).getTime();
              const hasStarted = now >= kickoff;
              const highlightsHref = result?.highlightsUrl ||
                `https://www.youtube.com/results?search_query=${encodeURIComponent(
                  `${homeTeam} vs ${awayTeam} World Cup 2026 highlights`
                )}`;

              return (
                <div key={match.id} className={`match-card ${result?.isLive ? 'live' : ''} ${result?.isFinished ? 'finished' : ''}`}>
                  <div className="match-card-header">
                    <span className="stage-badge" style={{ background: STAGE_COLORS[match.stage] }}>
                      {STAGE_LABELS(lang)[match.stage]}
                    </span>
                    <div className="match-card-meta-right">
                      {match.venue && <span className="venue">📍 {match.venue}</span>}
                      {UK_TV[match.id] && (
                        <span className="tv-badges">
                          {UK_TV[match.id].channels.map(ch => {
                            const info = UK_CHANNELS[ch];
                            if (!info) return null;
                            return (
                              <a
                                key={ch}
                                href={info.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tv-badge-link"
                                title={`Watch on ${ch}`}
                              >
                                <img src={info.logo} alt={ch} className="tv-badge-logo" />
                              </a>
                            );
                          })}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="match-row">
                    <span
                      className={`team home-team ${homeWins ? 'winner' : ''} ${homeTeam !== 'TBD' ? 'team-clickable' : ''}`}
                      onClick={homeTeam !== 'TBD' ? () => setLineup({ team: homeTeam, match }) : undefined}
                    >
                      {homeTeam !== 'TBD' ? <><FlagImg team={homeTeam} size={24} style={{marginRight:6}} />{homeTeam}</> : homeTeam}
                    </span>

                    <div className="score-area">
                      {isEditing ? (
                        <div className="score-edit">
                          <input
                            type="number" min="0" max="99"
                            value={editScore.home}
                            onChange={e => setEditScore(p => ({ ...p, home: e.target.value }))}
                          />
                          <span>–</span>
                          <input
                            type="number" min="0" max="99"
                            value={editScore.away}
                            onChange={e => setEditScore(p => ({ ...p, away: e.target.value }))}
                          />
                          {match.stage !== STAGE.GROUP && (
                            <select
                              value={editScore.penWinner || ''}
                              onChange={e => setEditScore(p => ({ ...p, penWinner: e.target.value }))}
                              className="pen-select"
                              title="Set if match went to penalties (only applies when scores are level)"
                            >
                              <option value="">No pens</option>
                              <option value="home">{homeTeam} (pens)</option>
                              <option value="away">{awayTeam} (pens)</option>
                            </select>
                          )}
                          <button className="btn-save" onClick={() => saveEdit(match)}>✓</button>
                          <button className="btn-cancel" onClick={() => setEditingMatch(null)}>✕</button>
                        </div>
                      ) : (
                        <>
                          {result?.homeScore != null ? (
                            <span className="score">
                              {result.homeScore} – {result.awayScore}
                            </span>
                          ) : (
                            <span className="vs">{t(lang,'vs')}</span>
                          )}
                          {statusLabel && (
                            <span className={`status-badge ${result?.isLive ? 'live-pulse' : ''}`}>
                              {statusLabel}
                            </span>
                          )}
                          {!hasStarted && (
                            <span className="kickoff-time">
                              {new Date(match.kickoff).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'America/New_York' })} ET
                              {' · '}
                              {new Date(match.kickoff).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' })} London
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    <span
                      className={`team away-team ${awayWins ? 'winner' : ''} ${awayTeam !== 'TBD' ? 'team-clickable' : ''}`}
                      onClick={awayTeam !== 'TBD' ? () => setLineup({ team: awayTeam, match }) : undefined}
                    >
                      {awayTeam !== 'TBD' ? <><FlagImg team={awayTeam} size={24} style={{marginRight:6}} />{awayTeam}</> : awayTeam}
                    </span>
                  </div>

                  {(result?.isFinished || isAdmin) && (
                    <div className="match-footer">
                      <div className="match-footer-left">
                        {result?.isFinished && editingHighlights !== match.id && (
                          <a
                            className="highlights-link"
                            href={highlightsHref}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            ▶ Highlights
                          </a>
                        )}
                        {isAdmin && result?.isFinished && editingHighlights === match.id && (
                          <div className="highlights-edit">
                            <input
                              type="url"
                              placeholder="YouTube URL (blank = auto search)"
                              value={highlightsInput}
                              onChange={e => setHighlightsInput(e.target.value)}
                            />
                            <button className="btn-save" onClick={() => saveHighlights(match)}>✓</button>
                            <button className="btn-cancel" onClick={() => setEditingHighlights(null)}>✕</button>
                          </div>
                        )}
                      </div>
                      <div className="match-footer-right">
                        {isAdmin && result?.isFinished && editingHighlights !== match.id && (
                          <button
                            className="btn-edit-highlights"
                            onClick={() => startEditHighlights(match)}
                            title="Set highlights URL"
                          >
                            🔗
                          </button>
                        )}
                        {isAdmin && !isEditing && (
                          <button className="btn-edit-score" onClick={() => startEdit(match)}>
                            ✏️ Score
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {lineup && (
        <LineupPanel
          team={lineup.team}
          match={lineup.match}
          onClose={() => setLineup(null)}
        />
      )}
    </div>
  );
}
