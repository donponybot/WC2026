import { t } from '../utils/i18n';
import { useState } from 'react';
import { MATCHES, STAGE } from '../data/matches';
import { resolveTeam } from '../utils/scoring';
import FlagImg from './FlagImg';
import LineupPanel from './LineupPanel';

const STAGE_COLORS = {
  [STAGE.GROUP]: '#0f3460',
  [STAGE.R32]:   '#c2410c',
  [STAGE.QF]:    '#7c3aed',
  [STAGE.SF]:    '#166534',
  [STAGE.THIRD]: '#854d0e',
  [STAGE.FINAL]: '#991b1b',
};

function STAGE_LABELS(lang) { return {
  [STAGE.GROUP]: t(lang,'groupStage'),
  [STAGE.R32]:   t(lang,'roundOf32'),
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
    const stages = [STAGE.GROUP, STAGE.R32, STAGE.QF, STAGE.SF, STAGE.THIRD, STAGE.FINAL];
    const now = Date.now();
    for (const stage of stages) {
      const hasUpcoming = MATCHES.some(m => m.stage === stage && now < new Date(m.kickoff).getTime());
      if (hasUpcoming) return stage;
    }
    return 'all';
  });
  const [editingMatch, setEditingMatch] = useState(null);
  const [editScore, setEditScore] = useState({ home: '', away: '' });
  const [lineup, setLineup] = useState(null); // { team, match }

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
    setEditScore({ home: r?.homeScore ?? '', away: r?.awayScore ?? '' });
  }

  function saveEdit(match) {
    const hs = parseInt(editScore.home);
    const as_ = parseInt(editScore.away);
    if (isNaN(hs) || isNaN(as_)) return;
    onResultOverride(match.id, {
      homeScore: hs,
      awayScore: as_,
      isFinished: true,
      isLive: false,
      status: 'FINISHED',
    });
    setEditingMatch(null);
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
        <div key={date} className="date-group">
          <div className="date-header">{date}</div>
          <div className="match-list">
            {matches.map(match => {
              const result = results[match.id];
              const statusLabel = (() => {
                if (!result) return '';
                if (result.isFinished) return t(lang,'ft');
                if (result.isLive) return result.minute ? `${result.minute}'` : t(lang,'live');
                return '';
              })();
              const homeTeam = getTeamName(match, 'home', qualifiedTeams, koResults);
              const awayTeam = getTeamName(match, 'away', qualifiedTeams, koResults);
              const isEditing = editingMatch === match.id;
              const now = Date.now();
              const kickoff = new Date(match.kickoff).getTime();
              const hasStarted = now >= kickoff;

              return (
                <div key={match.id} className={`match-card ${result?.isLive ? 'live' : ''} ${result?.isFinished ? 'finished' : ''}`}>
                  <span className="stage-badge" style={{ background: STAGE_COLORS[match.stage] }}>
                    {STAGE_LABELS(lang)[match.stage]}
                  </span>

                  <div className="match-row">
                    <span
                      className={`team home-team ${result?.isFinished && result.homeScore > result.awayScore ? 'winner' : ''} ${homeTeam !== 'TBD' ? 'team-clickable' : ''}`}
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
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    <span
                      className={`team away-team ${result?.isFinished && result.awayScore > result.homeScore ? 'winner' : ''} ${awayTeam !== 'TBD' ? 'team-clickable' : ''}`}
                      onClick={awayTeam !== 'TBD' ? () => setLineup({ team: awayTeam, match }) : undefined}
                    >
                      {awayTeam !== 'TBD' ? <><FlagImg team={awayTeam} size={24} style={{marginRight:6}} />{awayTeam}</> : awayTeam}
                    </span>
                  </div>

                  <div className="match-meta">
                    <span className="venue">📍 {t(lang,'venue')}: {match.venue}</span>
                    {isAdmin && !isEditing && (
                      <button className="btn-edit-score" onClick={() => startEdit(match)}>
                        ✏️ Score
                      </button>
                    )}
                  </div>
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
