// Live scores: worldcup26.ir (primary, real-time, no key) — proxied through
// the Cloudflare Worker for CORS. Falls back to football-data.org if unreachable.

const PROXY_BASE = process.env.REACT_APP_NEWS_PROXY || '';
const COMPETITION = process.env.REACT_APP_FD_COMPETITION || '2000';

async function fetchWC26Games() {
  if (!PROXY_BASE) throw new Error('REACT_APP_NEWS_PROXY not configured');
  const res = await fetch(`${PROXY_BASE}/wc26/games`);
  if (!res.ok) throw new Error(`worldcup26.ir error: ${res.status}`);
  const data = await res.json();
  return data.games || [];
}

async function fetchFDGames() {
  if (!PROXY_BASE) throw new Error('REACT_APP_NEWS_PROXY not configured');
  const res = await fetch(`${PROXY_BASE}/football/competitions/${COMPETITION}/matches`);
  if (!res.ok) throw new Error(`football-data error: ${res.status}`);
  const data = await res.json();
  return data.matches || [];
}

export async function fetchLiveMatches() {
  try {
    const games = await fetchWC26Games();
    return { source: 'wc26', games };
  } catch (e) {
    console.warn('worldcup26.ir failed, falling back to football-data.org:', e.message);
  }
  const games = await fetchFDGames();
  return { source: 'fd', games };
}

export function mapApiResults(fetchResult, ourMatches) {
  if (!fetchResult) return {};
  return fetchResult.source === 'wc26'
    ? mapWC26Results(fetchResult.games, ourMatches)
    : mapFDResults(fetchResult.games, ourMatches);
}

// worldcup26.ir format: { home_team_name_en, away_team_name_en, home_score,
// away_score (strings), finished: "TRUE"/"FALSE", time_elapsed: "notstarted" |
// "finished" | <live indicator> }
function mapWC26Results(games, ourMatches) {
  const results = {};
  for (const game of games) {
    const apiHome = normalizeTeamName(game.home_team_name_en || '');
    const apiAway = normalizeTeamName(game.away_team_name_en || '');
    if (!apiHome || !apiAway) continue;

    const ourMatch = ourMatches.find(m => {
      if (!m.home || !m.away) return false;
      return normalizeTeamName(m.home) === apiHome && normalizeTeamName(m.away) === apiAway;
    });
    if (!ourMatch) continue;

    const elapsed = game.time_elapsed;
    const isFinished = game.finished === 'TRUE' || elapsed === 'finished';
    const isLive = !isFinished && !!elapsed && elapsed !== 'notstarted';

    results[ourMatch.id] = {
      homeScore: (isFinished || isLive) ? Number(game.home_score) : null,
      awayScore: (isFinished || isLive) ? Number(game.away_score) : null,
      status: elapsed,
      minute: isLive && /^\d+$/.test(elapsed) ? elapsed : null,
      isLive, isFinished,
    };
  }
  return results;
}

// football-data.org format
function mapFDResults(apiMatches, ourMatches) {
  const results = {};
  for (const apiMatch of apiMatches) {
    const apiHome = normalizeTeamName(apiMatch.homeTeam?.name || '');
    const apiAway = normalizeTeamName(apiMatch.awayTeam?.name || '');
    const ourMatch = ourMatches.find(m => {
      if (!m.home || !m.away) return false;
      return normalizeTeamName(m.home) === apiHome && normalizeTeamName(m.away) === apiAway;
    });
    if (!ourMatch) continue;

    const score = apiMatch.score;
    const hs  = score?.fullTime?.home;
    const as_ = score?.fullTime?.away;
    const lhs = score?.regularTime?.home ?? score?.halfTime?.home;
    const las = score?.regularTime?.away ?? score?.halfTime?.away;
    const status = apiMatch.status;
    const isLive     = status === 'IN_PLAY' || status === 'PAUSED';
    const isFinished = status === 'FINISHED';

    results[ourMatch.id] = {
      homeScore: isFinished ? hs : isLive ? (lhs ?? null) : null,
      awayScore: isFinished ? as_ : isLive ? (las ?? null) : null,
      status, minute: apiMatch.minute || null,
      isLive, isFinished,
    };
  }
  return results;
}

function normalizeTeamName(name) {
  return name.toLowerCase()
    .replace(/türkiye|turkiye|turkey/gi, 'turkey')
    .replace(/ivory coast|c[oô]te d.ivoire/gi, 'ivory coast')
    .replace(/congo dr|democratic republic of the congo|dr congo/gi, 'congo')
    .replace(/cape verde|cabo verde/gi, 'cape verde')
    .replace(/bosnia.*/gi, 'bosnia')
    .replace(/czechia|czech republic/gi, 'czechia')
    .replace(/^usa$|united states/gi, 'usa')
    .replace(/[^a-z0-9 ]/g, '')
    .trim();
}

export function getStatusLabel(result) {
  if (!result) return '';
  if (result.isFinished) return 'FT';
  if (result.isLive) return result.minute ? `${result.minute}'` : 'LIVE';
  return '';
}
