import { t } from '../utils/i18n';
import { useState, useMemo } from 'react';
import { MATCHES, STAGE, GROUP_TEAMS } from '../data/matches';
import FlagImg from './FlagImg';
import { calcGroupStandings, resolveTeam } from '../utils/scoring';

function getTeam(match, side, qualifiedTeams, koResults) {
  const name = side === 'home' ? match.home : match.away;
  if (name) return name;
  const ref = side === 'home' ? match.homeRef : match.awayRef;
  return resolveTeam(ref, qualifiedTeams, koResults) || null;
}

function MatchSlot({ match, results, qualifiedTeams, koResults, size = 'md' }) {
  const result = results[match.id];
  // Prefer _resolvedHome/_resolvedAway set by buildKnockoutResults, fall back to resolveTeam
  const home = match._resolvedHome || getTeam(match, 'home', qualifiedTeams, koResults);
  const away = match._resolvedAway || getTeam(match, 'away', qualifiedTeams, koResults);
  const homeWon = result?.isFinished && result.homeScore > result.awayScore;
  const awayWon = result?.isFinished && result.awayScore > result.homeScore;
  const isLive = result?.isLive;
  const isFinal = match.stage === STAGE.FINAL;

  return (
    <div style={{
      background: 'var(--color-background-primary)',
      border: `0.5px solid var(--color-border-${isFinal ? 'primary' : 'tertiary'})`,
      borderRadius: 8,
      overflow: 'hidden',
      width: size === 'lg' ? 200 : 180,
      boxShadow: isFinal ? '0 0 0 2px #B7860B' : 'none',
    }}>
      {/* Home */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '5px 8px',
        background: homeWon ? 'var(--color-background-success)' : 'transparent',
        borderBottom: '0.5px solid var(--color-border-tertiary)',
      }}>
        <span style={{ fontSize: 13, fontWeight: homeWon ? 500 : 400, color: home ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)', display: 'flex', alignItems: 'center', gap: 5 }}>
          {home ? <><FlagImg team={home} size={18} style={{marginRight:5}} />{home}</> : <span style={{ color: 'var(--color-text-tertiary)', fontStyle: 'italic' }}>TBD</span>}
        </span>
        <span style={{ fontSize: 13, fontWeight: 500, minWidth: 16, textAlign: 'right', color: homeWon ? 'var(--color-text-success)' : 'var(--color-text-secondary)' }}>
          {result?.homeScore != null ? result.homeScore : ''}
        </span>
      </div>
      {/* Away */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '5px 8px',
        background: awayWon ? 'var(--color-background-success)' : 'transparent',
      }}>
        <span style={{ fontSize: 13, fontWeight: awayWon ? 500 : 400, color: away ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)', display: 'flex', alignItems: 'center', gap: 5 }}>
          {away ? <><FlagImg team={away} size={18} style={{marginRight:5}} />{away}</> : <span style={{ color: 'var(--color-text-tertiary)', fontStyle: 'italic' }}>TBD</span>}
        </span>
        <span style={{ fontSize: 13, fontWeight: 500, minWidth: 16, textAlign: 'right', color: awayWon ? 'var(--color-text-success)' : 'var(--color-text-secondary)' }}>
          {result?.awayScore != null ? result.awayScore : ''}
        </span>
      </div>
      {/* Status bar */}
      {(isLive || result?.isFinished) && (
        <div style={{
          textAlign: 'center', fontSize: 10, fontWeight: 500, padding: '2px 0',
          background: isLive ? '#16a34a' : 'var(--color-background-secondary)',
          color: isLive ? '#fff' : 'var(--color-text-secondary)',
        }}>
          {isLive ? (result.minute ? `LIVE ${result.minute}'` : 'LIVE') : 'FT'}
        </div>
      )}
      {!result && match.kickoff && (
        <div style={{ textAlign: 'center', fontSize: 10, padding: '2px 0', color: 'var(--color-text-tertiary)', background: 'var(--color-background-secondary)' }}>
          {new Date(match.kickoff).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
        </div>
      )}
    </div>
  );
}

function RoundColumn({ title, matches, results, qualifiedTeams, koResults, color, lang='en' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      <div style={{
        fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1,
        color: color || 'var(--color-text-secondary)',
        marginBottom: 12, textAlign: 'center', whiteSpace: 'nowrap',
      }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'space-around', flex: 1 }}>
        {matches.map(m => (
          <MatchSlot key={m.id} match={m} results={results} qualifiedTeams={qualifiedTeams} koResults={koResults} />
        ))}
      </div>
    </div>
  );
}

function GroupCard({ group, teams, results, lang='en' }) {
  const standings = useMemo(() => calcGroupStandings(group, results), [group, results]);
  const display = standings.length > 0 ? standings : teams.map(t => ({ team: t, played: 0, pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0 }));

  return (
    <div style={{
      background: 'var(--color-background-primary)',
      border: '0.5px solid var(--color-border-tertiary)',
      borderRadius: 8, overflow: 'hidden', minWidth: 170,
    }}>
      <div style={{
        background: '#0f3460', color: '#fff',
        padding: '5px 10px', fontSize: 12, fontWeight: 500,
      }}>Group {group}</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
        <thead>
          <tr style={{ background: 'var(--color-background-secondary)' }}>
            <th style={{ padding: '3px 8px', textAlign: 'left', fontWeight: 500, color: 'var(--color-text-secondary)' }}>{t(lang,'player')}</th>
            <th style={{ padding: '3px 4px', textAlign: 'center', fontWeight: 500, color: 'var(--color-text-secondary)' }}>{t(lang,'played')}</th>
            <th style={{ padding: '3px 4px', textAlign: 'center', fontWeight: 500, color: 'var(--color-text-secondary)' }}>W</th>
            <th style={{ padding: '3px 4px', textAlign: 'center', fontWeight: 500, color: 'var(--color-text-secondary)' }}>D</th>
            <th style={{ padding: '3px 4px', textAlign: 'center', fontWeight: 500, color: 'var(--color-text-secondary)' }}>L</th>
            <th style={{ padding: '3px 4px', textAlign: 'center', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Pts</th>
          </tr>
        </thead>
        <tbody>
          {display.map((s, i) => (
            <tr key={s.team} style={{
              background: i < 2 ? 'rgba(15,52,96,0.06)' : 'transparent',
              borderTop: '0.5px solid var(--color-border-tertiary)',
            }}>
              <td style={{ padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
                {i < 2 && <span style={{ fontSize: 8, color: '#0f3460', fontWeight: 700 }}>●</span>}
                <FlagImg team={s.team} size={16} style={{marginRight:3}} />
                <span style={{ fontSize: 11, color: 'var(--color-text-primary)' }}>{s.team}</span>
              </td>
              <td style={{ padding: '4px 4px', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: 11 }}>{s.played}</td>
              <td style={{ padding: '4px 4px', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: 11 }}>{s.w}</td>
              <td style={{ padding: '4px 4px', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: 11 }}>{s.d}</td>
              <td style={{ padding: '4px 4px', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: 11 }}>{s.l}</td>
              <td style={{ padding: '4px 4px', textAlign: 'center', fontWeight: 500, color: 'var(--color-text-primary)', fontSize: 11 }}>{s.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GroupMatchRow({ m, results }) {
  const result = results[m.id];
  const finished = result?.isFinished;
  const live = result?.isLive;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      background: 'var(--color-background-primary)',
      border: '0.5px solid var(--color-border-tertiary)',
      borderRadius: 6, padding: '7px 12px',
    }}>
      <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)', minWidth: 44, flexShrink: 0 }}>{m.date}</span>
      <span style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 5,
        fontSize: 13, fontWeight: finished && result.homeScore > result.awayScore ? 600 : 400,
        color: 'var(--color-text-primary)',
      }}>
        {m.home}<FlagImg team={m.home} size={16} />
      </span>
      <span style={{ minWidth: 52, textAlign: 'center', flexShrink: 0 }}>
        {finished ? (
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', letterSpacing: 1 }}>
            {result.homeScore}–{result.awayScore}
          </span>
        ) : live ? (
          <span style={{ fontSize: 11, fontWeight: 700, color: '#16a34a' }}>
            {result.homeScore ?? 0}–{result.awayScore ?? 0}
          </span>
        ) : (
          <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>vs</span>
        )}
      </span>
      <span style={{
        flex: 1, display: 'flex', alignItems: 'center', gap: 5,
        fontSize: 13, fontWeight: finished && result.awayScore > result.homeScore ? 600 : 400,
        color: 'var(--color-text-primary)',
      }}>
        <FlagImg team={m.away} size={16} />{m.away}
      </span>
      <span style={{
        fontSize: 11, minWidth: 40, textAlign: 'right', flexShrink: 0,
        color: live ? '#16a34a' : 'var(--color-text-tertiary)',
        fontWeight: live ? 700 : 400,
      }}>
        {live ? (result.minute ? `LIVE ${result.minute}'` : 'LIVE') : finished ? 'FT' : new Date(m.kickoff).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
      </span>
    </div>
  );
}

export default function Bracket({ results, qualifiedTeams = {}, koResults = {}, lang = 'en' }) {
  const [view, setView] = useState(() => {
    // Default to Groups until all group stage matches have kicked off
    const now = Date.now();
    const groupsDone = MATCHES
      .filter(m => m.stage === STAGE.GROUP)
      .every(m => now >= new Date(m.kickoff).getTime());
    return groupsDone ? 'bracket' : 'groups';
  });
  const [selectedGroup, setSelectedGroup] = useState(() => {
    const now = Date.now();
    const next = MATCHES
      .filter(m => m.stage === STAGE.GROUP && new Date(m.kickoff).getTime() > now)
      .sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff))[0];
    return next?.group ?? 'A';
  });

  const r32   = MATCHES.filter(m => m.stage === STAGE.R32);
  const r16   = MATCHES.filter(m => m.stage === STAGE.R16);
  const qf    = MATCHES.filter(m => m.stage === STAGE.QF);
  const sf    = MATCHES.filter(m => m.stage === STAGE.SF);
  const tp    = MATCHES.filter(m => m.stage === STAGE.THIRD);
  const final = MATCHES.find(m => m.stage === STAGE.FINAL);

  const champion = koResults['final']?.winner || null;

  const groups = Object.keys(GROUP_TEAMS);

  const selectedGroupMatches = useMemo(
    () => MATCHES.filter(m => m.stage === STAGE.GROUP && m.group === selectedGroup),
    [selectedGroup]
  );

  return (
    <div style={{ paddingBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, color: 'var(--color-text-primary)' }}>🏆 {t(lang,'bracketTitle')}</h2>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--color-text-secondary)' }}>{t(lang,'bracketSubtitle')}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['bracket', 'groups'].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: '6px 16px', borderRadius: 20, border: '0.5px solid var(--color-border-secondary)',
              background: view === v ? '#0f3460' : 'var(--color-background-primary)',
              color: view === v ? '#fff' : 'var(--color-text-primary)',
              cursor: 'pointer', fontSize: 13, fontWeight: view === v ? 500 : 400,
            }}>{v === 'bracket' ? t(lang,'bracketView') : t(lang,'groupsView')}</button>
          ))}
        </div>
      </div>

      {champion && (
        <div style={{
          background: '#fef9c3', border: '1px solid #fbbf24',
          borderRadius: 8, padding: '10px 20px', marginBottom: 20,
          textAlign: 'center', fontSize: 16, fontWeight: 500, color: '#92400e',
        }}>
          🏆 <FlagImg team={champion} size={22} style={{margin:'0 6px',verticalAlign:'middle'}} />{champion} — {t(lang,'champions')}
        </div>
      )}

      {view === 'bracket' && (
        <div style={{ overflowX: 'auto', paddingBottom: 12 }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', minWidth: 900 }}>
            <RoundColumn lang={lang} title={t(lang,'roundOf32')} matches={r32.slice(0, 8)} results={results} qualifiedTeams={qualifiedTeams} koResults={koResults} color="#c2410c" />
            <RoundColumn lang={lang} title={t(lang,'roundOf16')} matches={r16.slice(0, 4)} results={results} qualifiedTeams={qualifiedTeams} koResults={koResults} color="#b45309" />
            <RoundColumn lang={lang} title={t(lang,'quarterFinal')} matches={qf.slice(0, 2)} results={results} qualifiedTeams={qualifiedTeams} koResults={koResults} color="#7c3aed" />
            <RoundColumn lang={lang} title={t(lang,'semiFinal')} matches={sf.slice(0, 1)} results={results} qualifiedTeams={qualifiedTeams} koResults={koResults} color="#166534" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, paddingTop: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1, color: '#991b1b' }}>{t(lang,'final')}</div>
              {final && <MatchSlot match={final} results={results} qualifiedTeams={qualifiedTeams} koResults={koResults} size="lg" />}
              <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1, color: '#854d0e', marginTop: 8 }}>{t(lang,'thirdPlace')}</div>
              {tp[0] && <MatchSlot match={tp[0]} results={results} qualifiedTeams={qualifiedTeams} koResults={koResults} />}
            </div>
            <RoundColumn lang={lang} title={t(lang,'semiFinal')} matches={sf.slice(1, 2)} results={results} qualifiedTeams={qualifiedTeams} koResults={koResults} color="#166534" />
            <RoundColumn lang={lang} title={t(lang,'quarterFinal')} matches={qf.slice(2, 4)} results={results} qualifiedTeams={qualifiedTeams} koResults={koResults} color="#7c3aed" />
            <RoundColumn lang={lang} title={t(lang,'roundOf16')} matches={r16.slice(4, 8)} results={results} qualifiedTeams={qualifiedTeams} koResults={koResults} color="#b45309" />
            <RoundColumn lang={lang} title={t(lang,'roundOf32')} matches={r32.slice(8, 16)} results={results} qualifiedTeams={qualifiedTeams} koResults={koResults} color="#c2410c" />
          </div>
        </div>
      )}

      {view === 'groups' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))', gap: 12 }}>
            {groups.map(g => (
              <GroupCard key={g} group={g} teams={GROUP_TEAMS[g]} results={results} lang={lang} />
            ))}
          </div>

          <div style={{ marginTop: 28, borderTop: '0.5px solid var(--color-border-tertiary)', paddingTop: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-secondary)' }}>Group matches:</span>
              <select
                value={selectedGroup}
                onChange={e => setSelectedGroup(e.target.value)}
                style={{
                  padding: '5px 10px', borderRadius: 6,
                  border: '0.5px solid var(--color-border-secondary)',
                  background: 'var(--color-background-primary)',
                  color: 'var(--color-text-primary)',
                  fontSize: 13, cursor: 'pointer',
                }}
              >
                {groups.map(g => (
                  <option key={g} value={g}>Group {g}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {selectedGroupMatches.map(m => (
                <GroupMatchRow key={m.id} m={m} results={results} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
