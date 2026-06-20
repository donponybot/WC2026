# WC2026 Prediction Pool — Agent Handover / Rebuild Guide

This document is a complete technical snapshot of this project as of **2026-06-19 (updated)**, written so
a fresh AI agent (with no access to prior conversation history) can understand the system,
continue development, or rebuild any missing piece from scratch.

**Live app:** https://donponybot.github.io/WC2026
**GitHub repo:** https://github.com/donponybot/WC2026 (branch `main` = source, `gh-pages` = built site)
**Tournament dates:** Jun 11 – Jul 19, 2026

---

## 1. What this app is

A FIFA World Cup 2026 prediction pool for a friend group. Players predict match outcomes before
kickoff; predictions lock automatically at kickoff time; a live leaderboard tracks points; an
admin can manually enter/override scores and manage players. Fully real-time via a single
Firestore document — no backend server.

---

## 2. Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 (Create React App, `react-scripts` 5) |
| Database | Firebase Firestore — single doc `pools/main` |
| Hosting | GitHub Pages via `gh-pages` npm package |
| Live scores | worldcup26.ir (primary) + football-data.org (fallback), via a Cloudflare Worker proxy |
| News tab | NewsAPI, via the same Cloudflare Worker proxy |
| Flags | flagcdn.com `<img>` tags, no API key |
| Player photos (lineups) | Wikipedia REST API, fetched client-side |
| Auth | SHA-256 (Web Crypto API), no backend |
| i18n | Flat `TRANSLATIONS` object — English (`en`) + Spanish (`es`) |
| Icons | `lucide-react` |

---

## 3. Local setup

```bash
cd /home/pony/WC26
npm install
cp .env.example .env   # then fill in values, see §4
PORT=3001 npm start     # port 3000 is often occupied by another local app
```

Build + deploy:
```bash
npm run deploy   # runs `npm run build` then `gh-pages -d build`
```

---

## 4. Environment variables (`.env`, not committed)

| Var | Purpose |
|-----|---------|
| `REACT_APP_ADMIN_PASSWORD` | Admin password (default `wc2026admin`) |
| `REACT_APP_FB_API_KEY` | Firebase web API key |
| `REACT_APP_FB_AUTH_DOMAIN` | Firebase auth domain |
| `REACT_APP_FB_PROJECT_ID` | Firebase project ID (`wc2026-pool-952d4`) |
| `REACT_APP_FB_STORAGE_BUCKET` | Firebase storage bucket |
| `REACT_APP_FB_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `REACT_APP_FB_APP_ID` | Firebase app ID |
| `REACT_APP_FD_API_KEY` | football-data.org API key (fallback live-score source) |
| `REACT_APP_FD_COMPETITION` | Competition ID, `2000` = FIFA World Cup |
| `REACT_APP_NEWS_PROXY` | Cloudflare Worker URL — proxies News, football-data, and worldcup26.ir (see §10/§14) |

All `REACT_APP_*` vars are baked into the JS bundle at build time (publicly visible — this is fine
for these particular keys; see `~/.gitleaks.toml` allowlist).

---

## 5. Firestore data model

Single document at `pools/main`:

```json
{
  "players": [
    {
      "id": "p_1234567890",
      "name": "Omar",
      "initials": "OB",
      "passwordHash": "<sha256 hex>",
      "champion": "Brazil",
      "lang": "en",
      "predictions": {
        "gs1": { "pick": "home" },
        "qf1": { "pick": "away", "homeScore": 1, "awayScore": 2 }
      }
    }
  ],
  "results": {
    "gs1": {
      "homeScore": 2, "awayScore": 0,
      "isFinished": true, "isLive": false,
      "status": "FINISHED", "manualOverride": true
    }
  }
}
```

- `players` is a single array — every write replaces the whole array via `savePlayers()`. Don't
  attempt partial Firestore array updates.
- `results` is a map keyed by match ID.
- `manualOverride: true` on a result means the live-score poller will never overwrite it.

A separate top-level `backups` Firestore collection stores point-in-time snapshots (see §13).

---

## 6. Source layout

```
src/
  App.jsx                    — root: state, auth, tabs, live-score polling, header
  firebase.js                — Firebase init from env vars
  index.css                  — all styles (no CSS modules/Tailwind), ~1160 lines
  index.js                   — React root render

  data/
    matches.js               — 104 fixtures, STAGE enum, GROUP_TEAMS (12 groups × 4 teams)
    squads.js                — full squad rosters per team + FORMATION_LAYOUTS + assignPositionSlots()
    ukTv.js                  — UK BBC/ITV broadcast channel per match (added 2026-06-12)

  utils/
    api.js                   — live-score fetch + mapApiResults + normalizeTeamName (§10)
    auth.js                  — hashPassword/verifyPassword (SHA-256 + salt)
    backup.js                — createBackup/listBackups/restoreBackup/pruneOldBackups (§13)
    firestore.js             — ensurePoolExists, subscribePool, savePlayers, saveResults, saveOneResult
    flags.js                 — TEAM_CODES map, flagUrl(), flag() emoji fallback
    i18n.js                  — TRANSLATIONS (en + es), t(lang, key) helper
    LangContext.jsx          — LangProvider/useLang(), persists to localStorage + player.lang
    playerPhotos.js          — fetchSquadPhotos/fetchPlayerPhoto via Wikipedia REST API
    scoring.js               — scoring engine (§9)

  components/
    AdminModal.jsx           — re-exports from Rules.jsx
    ApiKeyModal.jsx           — re-exports from Rules.jsx (now vestigial, see §10)
    BackupManager.jsx         — admin-only backup UI (§13)
    Bracket.jsx               — knockout bracket + group standings view
    FlagImg.jsx               — <img> from flagcdn.com
    Leaderboard.jsx           — sorted player table + points key
    LineupPanel.jsx           — team lineup modal: pitch view + list view, Wikipedia photos (§12)
    MatchSchedule.jsx         — all 104 fixtures, stage filter, live status, TV badges, admin edit
    News.jsx                  — NewsAPI articles via proxy, category filters
    PlayerLoginModal.jsx      — player select + password verify
    Predictions.jsx           — prediction table, champion picks, AddPlayerForm, ChangePasswordForm
    Rules.jsx                 — rules display + AdminModal + ApiKeyModal exports
```

---

## 7. Match data & stages

`src/data/matches.js` — **104 matches total**:

| Prefix | Count | Stage |
|--------|-------|-------|
| `gs1`–`gs72` | 72 | Group Stage (12 groups A–L × 6 round-robin matches) |
| `r32_1`–`r32_16` | 16 | Round of 32 |
| `r16_1`–`r16_8` | 8 | Round of 16 |
| `qf1`–`qf4` | 4 | Quarter-Final |
| `sf1`–`sf2` | 2 | Semi-Final |
| `tp1` | 1 | Third Place |
| `final` | 1 | Final |

```js
export const STAGE = {
  GROUP: 'Group Stage', R32: 'Round of 32', R16: 'Round of 16',
  QF: 'Quarter-Final', SF: 'Semi-Final', THIRD: 'Third Place', FINAL: 'Final',
};
```

Kickoffs are UTC ISO strings; display date/time uses ET (`America/New_York`). Knockout matches
have `home: null, away: null` plus `homeRef`/`awayRef` strings (`'1A'`, `'Wr32_1'`, `'Lsf_top'`,
etc.) resolved at runtime via `resolveTeam()`.

48 teams across groups A–L (4 teams each) — see `GROUP_TEAMS` / `ALL_TEAMS` in `matches.js`.

---

## 8. Auth model

- **Admin:** single global password (`REACT_APP_ADMIN_PASSWORD`). Can: add/remove players, change
  passwords, edit player initials, manually enter/override scores, manage backups. Session not
  persisted (lost on reload).
- **Player:** select name → enter password (SHA-256 + salt `'wc2026salt'`, hashed client-side,
  stored as hex). On login: app switches to player's saved `lang`, navigates to Predictions tab.
  Session not persisted.
- **Guest:** can view all tabs, cannot submit predictions.

---

## 9. Scoring rules

`src/utils/scoring.js`:

| Event | Points |
|-------|--------|
| Group stage correct result (W/D/L) | 2 |
| Knockout correct winner | 2 |
| Knockout exact score | +3 (stacks with winner) |
| Champion prediction correct | 5 |
| Max per knockout match | 5 |

Key functions:
- `scoreMatch(prediction, result, stage)` — score one match
- `scoreChampion(pick, actual)` — 5 or 0
- `calcPlayerTotal(playerData, results, champion)` — full tournament total
- `calcGroupStandings(group, results)` — live table (pts/GD/GF)
- `deriveQualifiedTeams(results)` → `{ '1A': 'Brazil', '2A': 'Morocco', ... }` + 8 best third-place
- `buildKnockoutResults(results, qualifiedTeams)` — resolves the whole knockout tree, returns
  per-match `{winner, ...}`; `final.winner` is the actual tournament champion
- `resolveTeam(ref, qualifiedTeams, knockoutResults)` — resolves `'1A'`, `'Wr32_1'`, `'Lsf_top'` etc.

Champion pick locks when `gs1` kickoff passes (same logic as match-cell locking).

Match locking (`Predictions.jsx::isMatchLocked`):
```
locked if: now >= kickoff  OR  result.isLive  OR  result.isFinished  OR  result has any score
```
Per-cell — each match locks independently at its own kickoff. Admin can still edit locked matches.

---

## 10. Live scores pipeline

**As of 2026-06-11**, primary source is **worldcup26.ir** (free, no API key, WC2026-specific,
real-time) with **football-data.org** as fallback.

`src/utils/api.js`:
- `fetchLiveMatches()` → `{ source: 'wc26'|'fd', games }`. Tries `${PROXY}/wc26/games` first; on
  any error, falls back to `${PROXY}/football/competitions/${COMPETITION}/matches`.
- `mapApiResults(fetchResult, ourMatches)` dispatches to `mapWC26Results` or `mapFDResults`.

**worldcup26.ir schema:** `home_team_name_en`/`away_team_name_en`, `home_score`/`away_score`
(strings), `finished` (`"TRUE"`/`"FALSE"`), `time_elapsed` (`"notstarted"` | `"finished"` | live
minute indicator).

**football-data.org schema:** standard v4 `matches[]` with `homeTeam.name`/`awayTeam.name`,
`score.fullTime`, `status` (`IN_PLAY`/`PAUSED`/`FINISHED`).

`normalizeTeamName()` reconciles naming differences between API and `matches.js`: Bosnia,
Congo DR, Czechia, Türkiye, USA, Ivory Coast, Cape Verde.

Polling (`App.jsx`): runs unconditionally on mount, every 60s if any match `isLive`, else every
300s. Results with `manualOverride: true` are never overwritten by the poller.

**⚠️ CORS:** worldcup26.ir has no `Access-Control-Allow-Origin` header — must go through the
Cloudflare Worker proxy (§14). Direct browser fetch is CORS-blocked (caught silently, falls back
to FD).

**Vestigial:** the ⚙️ `ApiKeyModal` (stores `fd_api_key`/`fd_competition` in localStorage) is no
longer read by `api.js`. Left in place but unused.

---

## 11. UK TV broadcast badges (added 2026-06-12)

`src/data/ukTv.js` exports `UK_TV` (map keyed by match ID → `{ channel, stream }`) and
`channelColor(channel)` (BBC = `#BB1919`, ITV = `#002060`).

- All 104 match IDs have an entry. BBC and ITV jointly hold UK free-to-air rights to all 104
  WC2026 matches (verified) — channels alternate BBC One/Two/ITV1/ITV4.
- **`r32_1`–`r32_16` are placeholder `{ channel: 'BBC/ITV', stream: '...' }`** — real per-fixture
  assignments aren't published until Round of 32 matchups are known. `channelColor('BBC/ITV')`
  returns BBC red since it matches `.includes('BBC')` first — cosmetically fine but not
  semantically "shared".
- Per-match assignments for `gs2`–`gs72`/`r16`/`qf`/`sf` are **not independently verified** beyond
  `gs1` (confirmed ITV1, matches real broadcast) — treat as best-effort, correct if a player
  reports a mismatch.
- Rendered in `MatchSchedule.jsx` as a `.tv-badge` span in `.match-meta`, next to the venue.
  CSS in `index.css` (`.tv-badge` block, near the lineup-panel CSS at the end of the file).

---

## 12. Lineups feature (added 2026-06-11)

- `src/data/squads.js` — full roster per team (`SQUADS`), `FORMATION_LAYOUTS`,
  `assignPositionSlots(players, formation)` for pitch coordinates.
- `src/utils/playerPhotos.js` — `fetchSquadPhotos`/`fetchPlayerPhoto` pull headshots from
  Wikipedia's REST API client-side (no proxy needed — Wikipedia allows CORS).
- `src/components/LineupPanel.jsx` — modal with **pitch view** (formation layout + photos) and
  **list view**. Optionally enriches with live lineups from football-data.org
  (`${PROXY}/football/matches/{id}/lineups`) via `fetchLiveLineup`/`mapApiLineup`.
- Triggered by clicking a team name in `MatchSchedule.jsx` (`.team-clickable`); state is
  `lineupTeam`/`lineupMatch` in `MatchSchedule.jsx`.

---

## 13. Backup system (added 2026-06-04)

- `src/utils/backup.js` — snapshots full pool state (`players` + `results`) to Firestore
  collection `backups/{backup_<timestamp>}`. Max 30 kept, oldest auto-pruned
  (`pruneOldBackups`).
- `src/components/BackupManager.jsx` — admin-only UI (rendered below main content on every tab
  when `isAdmin`), lets admin create/list/restore backups.
- `App.jsx::handleRestore(players, results)` → `savePlayers` + `saveResults`.
- `reset-pool.mjs` (repo root) — standalone Node script using `firebase-admin` to wipe
  `pools/main`. Requires `service-account.json` (gitignored, download from Firebase Console →
  Project Settings → Service Accounts → Generate new private key). **Never commit this file.**

---

## 14. Cloudflare Worker proxy — ⚠️ NOT IN THIS GIT REPO

**This is the single piece of infrastructure that is NOT version-controlled.** It lives at
`/home/pony/wc2026-proxy/` as a plain directory (not a git repo). If that machine/directory is
lost, recreate it from the source below.

- **Deployed name/URL:** `wc2026-news` → `https://wc2026-news.donponybot.workers.dev`
- **Deploy:** `cd /home/pony/wc2026-proxy && wrangler deploy` (requires `wrangler login` once)
- **Secrets** (set via `wrangler secret put <NAME>`, never in source):
  - `NEWSAPI_KEY` — for `/news/*`
  - `FD_API_KEY` — for `/football/*`
- **Routes:**
  - `/news/*` → `https://newsapi.org/v2/*`
  - `/football/*` → `https://api.football-data.org/v4/*`
  - `/wc26/*` → `https://worldcup26.ir/get/*` (no key needed)
- **CORS allowlist** (`ALLOWED_ORIGINS`): `https://donponybot.github.io`, `http://localhost:3000`.
  Any other origin (e.g. `localhost:3001`) is blocked by the browser even though the upstream
  call succeeds server-side.
- A **sibling worker** exists at `/home/pony/wc2026-telegram/worker.js` (different purpose,
  Telegram bot) — don't confuse the two.

### `wrangler.toml`
```toml
name = "wc2026-news"
main = "worker.js"
compatibility_date = "2024-01-01"
```

### `worker.js` (full source, 83 lines)
```js
// Cloudflare Worker — unified proxy for NewsAPI + football-data.org + worldcup26.ir
// Routes:
//   /news/*        → https://newsapi.org/v2/*        (uses env.NEWSAPI_KEY)
//   /football/*    → https://api.football-data.org/v4/* (uses env.FD_API_KEY)
//   /wc26/*        → https://worldcup26.ir/get/*       (no key needed)

const ALLOWED_ORIGINS = [
  'https://donponybot.github.io',
  'http://localhost:3000',
];

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = ALLOWED_ORIGINS.includes(origin);

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return corsResponse(null, 204, allowed ? origin : '');
    }

    if (request.method !== 'GET') {
      return corsResponse(JSON.stringify({ error: 'Method not allowed' }), 405, origin);
    }

    try {
      const url = new URL(request.url);
      const path = url.pathname;        // e.g. /news/everything or /football/competitions/2000/matches
      const params = url.searchParams;

      let apiUrl, headers;

      // ── NewsAPI ──────────────────────────────────────────────────
      if (path.startsWith('/news/')) {
        const apiPath = path.replace('/news/', '');
        params.set('apiKey', env.NEWSAPI_KEY);
        apiUrl = `https://newsapi.org/v2/${apiPath}?${params}`;
        headers = { 'User-Agent': 'WC2026-Pool/1.0' };

      // ── football-data.org ────────────────────────────────────────
      } else if (path.startsWith('/football/')) {
        const apiPath = path.replace('/football/', '');
        apiUrl = `https://api.football-data.org/v4/${apiPath}?${params}`;
        headers = {
          'X-Auth-Token': env.FD_API_KEY,
          'User-Agent': 'WC2026-Pool/1.0',
        };

      // ── worldcup26.ir ─────────────────────────────────────────────
      } else if (path.startsWith('/wc26/')) {
        const apiPath = path.replace('/wc26/', '');
        apiUrl = `https://worldcup26.ir/get/${apiPath}?${params}`;
        headers = {
          'Accept': 'application/json',
          'User-Agent': 'WC2026-Pool/1.0',
        };

      } else {
        return corsResponse(JSON.stringify({ error: 'Unknown route' }), 404, origin);
      }

      const apiRes = await fetch(apiUrl, { headers });
      const data = await apiRes.json();
      return corsResponse(JSON.stringify(data), apiRes.status, allowed ? origin : '');

    } catch (err) {
      return corsResponse(JSON.stringify({ error: err.message }), 500, origin);
    }
  },
};

function corsResponse(body, status, origin) {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin || 'https://donponybot.github.io',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
```

**Recommendation:** this directory should be moved into git (its own repo, or a subfolder of this
one) so the worker source isn't a single point of loss.

---

## 15. Deployment (GitHub Pages)

- **GitHub user:** `donponybot`
- **Auth:** `git config --global credential.helper store` — token in `~/.git-credentials`
  (`https://donponybot:TOKEN@github.com`, `repo` scope, added June 2026)
- **Remote:** `https://github.com/donponybot/WC2026.git` (clean URL, no embedded token —
  there was a past incident where `origin` pointed at the sibling IOM repo with an embedded PAT;
  always sanity-check `git remote -v` before deploying)
- **Deploy:** `npm run deploy` → `npm run build` then `gh-pages -d build`, pushes `build/` to
  `gh-pages` branch.
- **Gitleaks:** Firebase/football-data keys are intentionally public in the bundle. Allowlist at
  `~/.gitleaks.toml`, loaded by `/home/pony/.git-hooks/pre-commit` and `pre-push` via
  `--config $HOME/.gitleaks.toml`.
- **If deploy breaks:**
  1. Auth failure → check `~/.git-credentials`
  2. Gitleaks block → check `~/.gitleaks.toml` exists, hooks pass `--config`
  3. Remote URL mismatch → `npx gh-pages-clean` then retry
  4. node_modules corrupt → `rm -rf node_modules && npm install`

---

## 16. Sibling project: IOM pool

A second, independent deployment for a different friend group, same codebase lineage:

| | This pool ("main") | IOM pool |
|---|---|---|
| Local dir | `/home/pony/WC26` | `/home/pony/IOM/WC26-IOM` |
| GitHub repo | `donponybot/WC2026` | `donponybot/WC26IOM` |
| Live URL | https://donponybot.github.io/WC2026/ | https://donponybot.github.io/WC26IOM/ |
| Firestore doc | `pools/main` | `pools/iom` |
| Champion bonus | 5 pts | 15 pts |
| Backups | top-level `backups/` collection | isolated `pools/iom/backups/` |

Both share Firebase project `wc2026-pool-952d4`. Features added to one (live-score source switch,
UK TV badges, lineups, backups, R16 restructure, etc.) do **not** automatically apply to the
other — port manually if wanted there too. Don't mix up the two repos/remotes.

---

## 17. Match card layout (`MatchSchedule.jsx`)

Each `.match-card` has three rows:

```
┌─────────────────────────────────────────────────────┐
│ [Stage badge]              [📍 Venue] [BBC] [ITV]   │  ← .match-card-header
│                                                     │
│  Mexico  🇲🇽      2 – 0      🇿🇦  South Africa      │  ← .match-row
│                                                     │
│ ▶ Highlights          [🔗] [✏️ Score]               │  ← .match-footer (finished/admin only)
└─────────────────────────────────────────────────────┘
```

- **`.match-card-header`** — flex row, space-between. Left: stage badge. Right: `.match-card-meta-right` (venue text + TV logo badges).
- **`.match-row`** — unchanged: home team | score area | away team.
- **`.match-footer`** — only rendered when `result?.isFinished || isAdmin`. Left (`.match-footer-left`): highlights link or highlights edit input. Right (`.match-footer-right`): 🔗 edit button + ✏️ Score button (admin only).

---

## 18. Highlights feature (added 2026-06-19)

`▶ Highlights` link appears on the bottom-left of every finished match card.

**Storage:** `highlightsUrl` is an optional field on the result object in Firestore (`results['gs1'].highlightsUrl`). Set/cleared by admin; never touched by the live-score poller.

**Display logic (in order of priority):**
1. `result.highlightsUrl` — links directly to the specific video (set by admin)
2. Auto-generated YouTube search fallback: `https://www.youtube.com/results?search_query={homeTeam}+vs+{awayTeam}+World+Cup+2026+highlights`

**Admin editing:** When logged in as admin, a 🔗 button appears bottom-right on finished cards. Clicking opens an inline URL input (pre-filled with any existing URL). Saving calls `onResultOverride(matchId, { ...result, highlightsUrl: url })` → `saveOneResult` in App.jsx → Firestore. Saving an empty string clears the override (reverts to auto-search). The 🔗 and ✏️ Score buttons coexist — they don't conflict.

**Key files:**
- `src/components/MatchSchedule.jsx` — `startEditHighlights`, `saveHighlights`, `editingHighlights`/`highlightsInput` state, `highlightsHref` computed per card
- `src/index.css` — `.highlights-link`, `.highlights-edit`, `.btn-edit-highlights`, `.match-footer`, `.match-footer-left`, `.match-footer-right`

No changes to `matches.js`, `App.jsx`, or any util — the existing `onResultOverride` / `saveOneResult` flow handles persistence.

---

## 19. Schedule auto-scroll (added 2026-06-19)

On load and on every stage-filter change, `MatchSchedule.jsx` scrolls to the **last date group that contains a finished or live match** in the active stage. This puts the user at the most recent results immediately, without manual scrolling.

**Implementation (`MatchSchedule.jsx`):**
- `dateGroupRefs` (`useRef({})`) — ref map keyed by date string, populated via `ref` callback on each `.date-group` div
- `useEffect([filterStage])` — on mount and stage switch: iterates dates in order, finds last date with any `result.isFinished || result.isLive`, calls `el.scrollIntoView({ behavior: 'smooth', block: 'start' })`. Falls back to first date if no finished matches yet.
- **CSS:** `.date-group { scroll-margin-top: 130px; }` — offsets the sticky header (~120px header + tabs) so the date header isn't hidden behind it.

---

## 20. Common gotchas

1. **`lang` prop scope:** `AddPlayerForm`/`ChangePasswordForm` inside `Predictions.jsx` aren't
   connected to `LangContext` — pass `lang` explicitly. New sub-components calling `t()` need
   the same treatment or `useLang()`.
2. **`savePlayers()` replaces the whole array** — never attempt partial Firestore array updates.
3. **`manualOverride: true`** on a result is how admin-entered scores survive the live-score
   poller — always set it in `saveOneResult` for manual edits.
4. **Knockout team resolution:** knockout matches have `home: null` — use `resolveTeam()` /
   `buildKnockoutResults()`, never hardcode team names for R32+.
5. **Champion lock** is tied to `gs1` kickoff, not a separate date.
6. **No `<img>` inside `<select><option>`** — dropdowns intentionally show team name only.
7. **`REACT_APP_NEWS_PROXY`** serves News, football-data, AND worldcup26.ir — one worker, three
   upstream APIs.
8. **i18n:** add new keys to both `en` and `es` blocks in `i18n.js`; `t()` falls back to `en`
   then to the raw key (missing ES shows English silently, not a crash).
9. **Tab indices:** Schedule=0, Predictions=1, Leaderboard=2, Bracket=3, News=4, Rules=5. Player
   login auto-navigates to tab 1.
10. **Dev server port:** 3000 is often occupied by an unrelated local app — use `PORT=3001 npm
    start`. The Worker's CORS allowlist only covers `localhost:3000` + production, so testing on
    3001 needs `--disable-web-security` in a headless browser, or a temporary allowlist addition.

---

## 21. Recent change history (most recent first)

- **2026-06-19** — Added highlights link to finished match cards (▶ Highlights, auto YouTube search
  fallback + admin-editable direct URL stored in Firestore `results[id].highlightsUrl`). See §18.
- **2026-06-19** — Restructured match card layout: venue + TV badges moved to top-right header row;
  new bottom footer row for highlights link and admin buttons. See §17.
- **2026-06-19** — Schedule tab auto-scrolls to last finished match day on load and on stage filter
  change. See §19.

- **2026-06-12** — Added UK London kickoff time alongside ET on both Schedule tab
  (`MatchSchedule.jsx` `.kickoff-time`) and Predictions table (`Predictions.jsx` `.match-th-time`).
  Format: `"21:00 ET · 02:00 London"`. Both files duplicate the format inline — update both if
  it ever changes. See §20 gotcha #11.
- **2026-06-12** — Added UK TV broadcast badges (`ukTv.js`, `.tv-badge` in `MatchSchedule.jsx` +
  `index.css`). See §11.
- **2026-06-11** — Switched primary live-score source from football-data.org to worldcup26.ir
  (via new `/wc26/*` Worker route), with FD as fallback. Removed the `fd_api_key` localStorage
  gate that previously blocked all polling. See §10.
- **2026-06-11** — Fixed group-stage schedule dates/times and restructured the knockout bracket
  to include a Round of 16 (`r16_1`–`r16_8`); QF reduced to 4, SF to 2.
- **2026-06-11** — Added clickable team lineups (pitch view + Wikipedia photos). See §12.
- **2026-06-04** — Moved admin settings into the account badge, added prize-pool banner; added
  admin backup system. See §13.

---

## 22. Sources for §11 broadcast claim

- [World Cup 2026 TV Schedule: Which Matches Are on BBC and ITV? | IBTimes UK](https://www.ibtimes.co.uk/bbc-itv-2026-world-cup-free-uk-1802243)
- [UK media rights for FIFA World Cup 26 and FIFA World Cup 2030 confirmed | FIFA](https://inside.fifa.com/tournament-organisation/commercial/news/uk-media-rights-2026-2030-world-cups-bbc-itv)
- [Mexico vs South Africa: how to watch | Sports Mole](https://www.sportsmole.co.uk/football/mexico/world-cup-2026/how-to-watch/how-to-watch-mexico-vs-south-africa-date-time-live-stream-and-tv-channel_598936.html)
