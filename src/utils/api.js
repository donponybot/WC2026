// football-data.org via Cloudflare Worker proxy (avoids CORS)
// Proxy base set via REACT_APP_NEWS_PROXY env var (same worker handles both)

const PROXY_BASE = process.env.REACT_APP_NEWS_PROXY || '';
const COMPETITION = process.env.REACT_APP_FD_COMPETITION || '2000';

async function fdFetch(path) {
  if (!PROXY_BASE) throw new Error('REACT_APP_NEWS_PROXY not configured');
  const res = await fetch(`${PROXY_BASE}/football/${path}`);
  if (!res.ok) throw new Error(`football-data error: ${res.status}`);
  return res.json();
}

export async function fetchLiveMatches() {
  const data = await fdFetch(`competitions/${COMPETITION}/matches`);
  return data.matches || [];
}

export function mapApiResults(apiMatches, ourMatches) {
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
    .replace(/türkiye|turkiye/i, 'turkey')
    .replace(/ivory coast/i, "cote d'ivoire")
    .replace(/congo dr/i, 'congo')
    .replace(/cape verde/i, 'cabo verde')
    .replace(/bosnia.*/i, 'bosnia')
    .replace(/[^a-z0-9 ]/g, '').trim();
}

export function getStatusLabel(result) {
  if (!result) return '';
  if (result.isFinished) return 'FT';
  if (result.isLive) return result.minute ? `${result.minute}'` : 'LIVE';
  return '';
}
