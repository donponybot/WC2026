import { STAGE, GROUP_TEAMS, MATCHES } from '../data/matches';

// ─── Points calculation ───────────────────────────────────────────────────────

export function scoreMatch(prediction, result, stage) {
  if (!prediction || !result || result.homeScore == null || result.awayScore == null) return 0;
  const actualPick =
    result.homeScore > result.awayScore ? 'home' :
    result.homeScore < result.awayScore ? 'away' : 'draw';
  let pts = 0;
  if (stage === STAGE.GROUP) {
    if (prediction.pick === actualPick) pts += 2;
  } else {
    if (prediction.pick === actualPick) pts += 2;
    if (
      prediction.homeScore != null && prediction.awayScore != null &&
      Number(prediction.homeScore) === result.homeScore &&
      Number(prediction.awayScore) === result.awayScore
    ) pts += 3;
  }
  return pts;
}

export function scoreChampion(championPick, actualChampion) {
  if (!championPick || !actualChampion) return 0;
  return championPick === actualChampion ? 5 : 0;
}

export function calcPlayerTotal(playerData, results, champion) {
  let total = 0;
  for (const match of MATCHES) {
    const pred = playerData?.predictions?.[match.id];
    const result = results?.[match.id];
    if (!pred || !result) continue;
    total += scoreMatch(pred, result, match.stage);
  }
  total += scoreChampion(playerData?.champion, champion);
  return total;
}

// ─── Group standings ──────────────────────────────────────────────────────────

function initStanding(team) {
  return { team, played: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 };
}

export function calcGroupStandings(group, results) {
  const teams = GROUP_TEAMS[group];
  if (!teams) return [];
  const standings = {};
  teams.forEach(t => (standings[t] = initStanding(t)));
  const groupMatches = MATCHES.filter(m => m.stage === STAGE.GROUP && m.group === group);
  for (const match of groupMatches) {
    const result = results?.[match.id];
    if (!result || result.homeScore == null || result.awayScore == null) continue;
    const h = standings[match.home];
    const a = standings[match.away];
    if (!h || !a) continue;
    const hs = result.homeScore;
    const as_ = result.awayScore;
    h.played++; a.played++;
    h.gf += hs; h.ga += as_; h.gd = h.gf - h.ga;
    a.gf += as_; a.ga += hs; a.gd = a.gf - a.ga;
    if (hs > as_) { h.w++; h.pts += 3; a.l++; }
    else if (hs < as_) { a.w++; a.pts += 3; h.l++; }
    else { h.d++; h.pts += 1; a.d++; a.pts += 1; }
  }
  return Object.values(standings).sort((a, b) =>
    b.pts - a.pts || b.gd - a.gd || b.gf - a.gf
  );
}

export function deriveQualifiedTeams(results) {
  const qualified = {};
  const thirdPlace = [];
  for (const group of Object.keys(GROUP_TEAMS)) {
    const standings = calcGroupStandings(group, results);
    if (standings[0]?.played >= 3) {
      qualified[`1${group}`] = standings[0].team;
      qualified[`2${group}`] = standings[1]?.team;
      if (standings[2]) thirdPlace.push({ ...standings[2], group });
    }
  }
  thirdPlace.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
  thirdPlace.slice(0, 8).forEach((t, i) => { qualified[`3rd_${i + 1}`] = t.team; });
  return qualified;
}

/**
 * Build knockout results iteratively so winners chain through all rounds.
 * Runs up to 4 passes so QF→SF→Final resolve correctly from R32 winners.
 * Also sets m._resolvedHome / m._resolvedAway on match objects as a cache.
 * Returns { [matchId]: { winner, loser, homeTeam, awayTeam } }
 */
export function buildKnockoutResults(results, qualifiedTeams) {
  const ko = {};
  const knockoutMatches = MATCHES.filter(m => m.stage !== STAGE.GROUP);

  for (let pass = 0; pass < 4; pass++) {
    for (const m of knockoutMatches) {
      if (ko[m.id]) continue;

      const homeTeam = m.home || resolveTeam(m.homeRef, qualifiedTeams, ko);
      const awayTeam = m.away || resolveTeam(m.awayRef, qualifiedTeams, ko);

      if (homeTeam) m._resolvedHome = homeTeam;
      if (awayTeam) m._resolvedAway = awayTeam;

      const r = results?.[m.id];
      if (!r?.isFinished || r.homeScore == null || !homeTeam || !awayTeam) continue;

      ko[m.id] = {
        winner:   r.homeScore > r.awayScore ? homeTeam : awayTeam,
        loser:    r.homeScore > r.awayScore ? awayTeam : homeTeam,
        homeTeam,
        awayTeam,
      };
    }
  }

  return ko;
}

export function resolveTeam(ref, qualifiedTeams, knockoutResults) {
  if (!ref) return null;

  if (/^[12][A-L]$/.test(ref)) return qualifiedTeams?.[ref] || null;

  if (/^3/.test(ref)) {
    for (let i = 1; i <= 8; i++) {
      if (qualifiedTeams?.[`3rd_${i}`]) return qualifiedTeams[`3rd_${i}`];
    }
    return null;
  }

  const winnerMatch = ref.match(/^W(.+)$/);
  const loserMatch  = ref.match(/^L(.+)$/);

  if (winnerMatch) {
    const matchId = winnerMatch[1].toLowerCase();
    return knockoutResults?.[matchId]?.winner || null;
  }
  if (loserMatch) {
    const matchId = loserMatch[1].toLowerCase();
    return knockoutResults?.[matchId]?.loser || null;
  }

  return null;
}
