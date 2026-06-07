// All WC 2026 fixtures
// kickoff times stored as UTC ISO strings (ET = UTC-4 during summer)
// football-data.org competition id for WC 2026 = 2000 (update once confirmed)

export const COMPETITION_ID = 2000; // FIFA World Cup on football-data.org

export const GROUPS = ['A','B','C','D','E','F','G','H','I','J','K','L'];

export const GROUP_TEAMS = {
  A: ['Mexico', 'South Africa', 'South Korea', 'Czechia'],
  B: ['Canada', 'Bosnia & Herzegovina', 'Qatar', 'Switzerland'],
  C: ['Brazil', 'Morocco', 'Haiti', 'Scotland'],
  D: ['USA', 'Paraguay', 'Australia', 'Türkiye'],
  E: ['Germany', 'Curaçao', 'Ivory Coast', 'Ecuador'],
  F: ['Netherlands', 'Japan', 'Tunisia', 'Sweden'],
  G: ['Belgium', 'Egypt', 'Iran', 'New Zealand'],
  H: ['Spain', 'Cape Verde', 'Saudi Arabia', 'Uruguay'],
  I: ['France', 'Senegal', 'Iraq', 'Norway'],
  J: ['Argentina', 'Algeria', 'Austria', 'Jordan'],
  K: ['Portugal', 'Congo DR', 'Uzbekistan', 'Colombia'],
  L: ['England', 'Croatia', 'Ghana', 'Panama'],
};

// All teams flat list for champion picker
export const ALL_TEAMS = Object.values(GROUP_TEAMS).flat();

export const STAGE = {
  GROUP: 'Group Stage',
  R32: 'Round of 32',
  QF: 'Quarter-Final',
  SF: 'Semi-Final',
  THIRD: 'Third Place',
  FINAL: 'Final',
};

// Each match: id, date (ET), kickoff ISO UTC, group, home, away, venue, stage
// kickoff = ET time converted to UTC (ET = UTC-4 in June/July)
export const MATCHES = [
  // ── GROUP STAGE ──────────────────────────────────────────────────
  { id: 'gs1',  date: 'Jun 11', kickoff: '2026-06-11T19:00:00Z', group: 'A', home: 'Mexico',        away: 'South Africa',         venue: 'Mexico City',    stage: STAGE.GROUP },
  { id: 'gs2',  date: 'Jun 11', kickoff: '2026-06-12T02:00:00Z', group: 'A', home: 'South Korea',   away: 'Czechia',              venue: 'Guadalajara',    stage: STAGE.GROUP },
  { id: 'gs3',  date: 'Jun 12', kickoff: '2026-06-12T19:00:00Z', group: 'B', home: 'Canada',        away: 'Bosnia & Herzegovina', venue: 'Toronto',        stage: STAGE.GROUP },
  { id: 'gs4',  date: 'Jun 12', kickoff: '2026-06-13T01:00:00Z', group: 'D', home: 'USA',           away: 'Paraguay',             venue: 'Los Angeles',    stage: STAGE.GROUP },
  { id: 'gs5',  date: 'Jun 13', kickoff: '2026-06-13T19:00:00Z', group: 'B', home: 'Qatar',         away: 'Switzerland',          venue: 'San Francisco',  stage: STAGE.GROUP },
  { id: 'gs6',  date: 'Jun 13', kickoff: '2026-06-13T22:00:00Z', group: 'C', home: 'Brazil',        away: 'Morocco',              venue: 'New York / NJ',  stage: STAGE.GROUP },
  { id: 'gs7',  date: 'Jun 13', kickoff: '2026-06-14T01:00:00Z', group: 'C', home: 'Haiti',         away: 'Scotland',             venue: 'Boston',         stage: STAGE.GROUP },
  { id: 'gs8',  date: 'Jun 13', kickoff: '2026-06-14T04:00:00Z', group: 'D', home: 'Australia',     away: 'Türkiye',              venue: 'Vancouver',      stage: STAGE.GROUP },
  { id: 'gs9',  date: 'Jun 14', kickoff: '2026-06-14T17:00:00Z', group: 'E', home: 'Germany',       away: 'Curaçao',              venue: 'Houston',        stage: STAGE.GROUP },
  { id: 'gs10', date: 'Jun 14', kickoff: '2026-06-14T20:00:00Z', group: 'F', home: 'Netherlands',   away: 'Japan',                venue: 'Dallas',         stage: STAGE.GROUP },
  { id: 'gs11', date: 'Jun 14', kickoff: '2026-06-14T23:00:00Z', group: 'E', home: 'Ivory Coast',   away: 'Ecuador',              venue: 'Philadelphia',   stage: STAGE.GROUP },
  { id: 'gs12', date: 'Jun 14', kickoff: '2026-06-15T02:00:00Z', group: 'F', home: 'Tunisia',       away: 'Sweden',               venue: 'Monterrey',      stage: STAGE.GROUP },
  { id: 'gs13', date: 'Jun 15', kickoff: '2026-06-15T16:00:00Z', group: 'H', home: 'Spain',         away: 'Cape Verde',           venue: 'Atlanta',        stage: STAGE.GROUP },
  { id: 'gs14', date: 'Jun 15', kickoff: '2026-06-15T19:00:00Z', group: 'G', home: 'Belgium',       away: 'Egypt',                venue: 'Seattle',        stage: STAGE.GROUP },
  { id: 'gs15', date: 'Jun 15', kickoff: '2026-06-15T22:00:00Z', group: 'H', home: 'Saudi Arabia',  away: 'Uruguay',              venue: 'Miami',          stage: STAGE.GROUP },
  { id: 'gs16', date: 'Jun 15', kickoff: '2026-06-16T01:00:00Z', group: 'G', home: 'Iran',          away: 'New Zealand',          venue: 'Los Angeles',    stage: STAGE.GROUP },
  { id: 'gs17', date: 'Jun 16', kickoff: '2026-06-16T19:00:00Z', group: 'I', home: 'France',        away: 'Senegal',              venue: 'New York / NJ',  stage: STAGE.GROUP },
  { id: 'gs18', date: 'Jun 16', kickoff: '2026-06-16T22:00:00Z', group: 'I', home: 'Iraq',          away: 'Norway',               venue: 'Boston',         stage: STAGE.GROUP },
  { id: 'gs19', date: 'Jun 16', kickoff: '2026-06-17T01:00:00Z', group: 'J', home: 'Argentina',     away: 'Algeria',              venue: 'Kansas City',    stage: STAGE.GROUP },
  { id: 'gs20', date: 'Jun 16', kickoff: '2026-06-17T04:00:00Z', group: 'J', home: 'Austria',       away: 'Jordan',               venue: 'San Francisco',  stage: STAGE.GROUP },
  { id: 'gs21', date: 'Jun 17', kickoff: '2026-06-17T17:00:00Z', group: 'K', home: 'Portugal',      away: 'Congo DR',             venue: 'Houston',        stage: STAGE.GROUP },
  { id: 'gs22', date: 'Jun 17', kickoff: '2026-06-17T20:00:00Z', group: 'L', home: 'England',       away: 'Croatia',              venue: 'Dallas',         stage: STAGE.GROUP },
  { id: 'gs23', date: 'Jun 17', kickoff: '2026-06-17T23:00:00Z', group: 'L', home: 'Ghana',         away: 'Panama',               venue: 'Toronto',        stage: STAGE.GROUP },
  { id: 'gs24', date: 'Jun 17', kickoff: '2026-06-18T02:00:00Z', group: 'K', home: 'Uzbekistan',    away: 'Colombia',             venue: 'Mexico City',    stage: STAGE.GROUP },
  { id: 'gs25', date: 'Jun 18', kickoff: '2026-06-18T16:00:00Z', group: 'A', home: 'Czechia',       away: 'South Africa',         venue: 'Atlanta',        stage: STAGE.GROUP },
  { id: 'gs26', date: 'Jun 18', kickoff: '2026-06-18T19:00:00Z', group: 'B', home: 'Switzerland',   away: 'Bosnia & Herzegovina', venue: 'Los Angeles',    stage: STAGE.GROUP },
  { id: 'gs27', date: 'Jun 18', kickoff: '2026-06-18T22:00:00Z', group: 'B', home: 'Canada',        away: 'Qatar',                venue: 'Vancouver',      stage: STAGE.GROUP },
  { id: 'gs28', date: 'Jun 18', kickoff: '2026-06-19T01:00:00Z', group: 'A', home: 'Mexico',        away: 'South Korea',          venue: 'Guadalajara',    stage: STAGE.GROUP },
  { id: 'gs29', date: 'Jun 19', kickoff: '2026-06-19T19:00:00Z', group: 'D', home: 'USA',           away: 'Australia',            venue: 'Seattle',        stage: STAGE.GROUP },
  { id: 'gs30', date: 'Jun 19', kickoff: '2026-06-19T19:00:00Z', group: 'C', home: 'Scotland',      away: 'Morocco',              venue: 'Boston',         stage: STAGE.GROUP },
  { id: 'gs31', date: 'Jun 19', kickoff: '2026-06-20T01:00:00Z', group: 'C', home: 'Brazil',        away: 'Haiti',                venue: 'Philadelphia',   stage: STAGE.GROUP },
  { id: 'gs32', date: 'Jun 19', kickoff: '2026-06-20T04:00:00Z', group: 'D', home: 'Türkiye',       away: 'Paraguay',             venue: 'San Francisco',  stage: STAGE.GROUP },
  { id: 'gs33', date: 'Jun 20', kickoff: '2026-06-20T17:00:00Z', group: 'F', home: 'Netherlands',   away: 'Sweden',               venue: 'Houston',        stage: STAGE.GROUP },
  { id: 'gs34', date: 'Jun 20', kickoff: '2026-06-20T20:00:00Z', group: 'E', home: 'Germany',       away: 'Ivory Coast',          venue: 'Toronto',        stage: STAGE.GROUP },
  { id: 'gs35', date: 'Jun 20', kickoff: '2026-06-20T23:00:00Z', group: 'F', home: 'Japan',         away: 'Tunisia',              venue: 'Dallas',         stage: STAGE.GROUP },
  { id: 'gs36', date: 'Jun 20', kickoff: '2026-06-21T02:00:00Z', group: 'E', home: 'Ecuador',       away: 'Curaçao',              venue: 'New York / NJ',  stage: STAGE.GROUP },
  { id: 'gs37', date: 'Jun 21', kickoff: '2026-06-21T16:00:00Z', group: 'H', home: 'Spain',         away: 'Saudi Arabia',         venue: 'Atlanta',        stage: STAGE.GROUP },
  { id: 'gs38', date: 'Jun 21', kickoff: '2026-06-21T19:00:00Z', group: 'G', home: 'Belgium',       away: 'Iran',                 venue: 'Seattle',        stage: STAGE.GROUP },
  { id: 'gs39', date: 'Jun 21', kickoff: '2026-06-21T22:00:00Z', group: 'G', home: 'New Zealand',   away: 'Egypt',                venue: 'Houston',        stage: STAGE.GROUP },
  { id: 'gs40', date: 'Jun 21', kickoff: '2026-06-22T01:00:00Z', group: 'H', home: 'Uruguay',       away: 'Cape Verde',           venue: 'Dallas',         stage: STAGE.GROUP },
  { id: 'gs41', date: 'Jun 22', kickoff: '2026-06-22T19:00:00Z', group: 'J', home: 'Argentina',     away: 'Austria',              venue: 'Miami',          stage: STAGE.GROUP },
  { id: 'gs42', date: 'Jun 22', kickoff: '2026-06-22T22:00:00Z', group: 'I', home: 'France',        away: 'Iraq',                 venue: 'Los Angeles',    stage: STAGE.GROUP },
  { id: 'gs43', date: 'Jun 22', kickoff: '2026-06-23T01:00:00Z', group: 'I', home: 'Norway',        away: 'Senegal',              venue: 'Kansas City',    stage: STAGE.GROUP },
  { id: 'gs44', date: 'Jun 22', kickoff: '2026-06-23T04:00:00Z', group: 'J', home: 'Algeria',       away: 'Jordan',               venue: 'San Francisco',  stage: STAGE.GROUP },
  { id: 'gs45', date: 'Jun 23', kickoff: '2026-06-23T17:00:00Z', group: 'L', home: 'England',       away: 'Ghana',                venue: 'Atlanta',        stage: STAGE.GROUP },
  { id: 'gs46', date: 'Jun 23', kickoff: '2026-06-23T20:00:00Z', group: 'K', home: 'Portugal',      away: 'Uzbekistan',           venue: 'Seattle',        stage: STAGE.GROUP },
  { id: 'gs47', date: 'Jun 23', kickoff: '2026-06-23T23:00:00Z', group: 'K', home: 'Colombia',      away: 'Congo DR',             venue: 'Boston',         stage: STAGE.GROUP },
  { id: 'gs48', date: 'Jun 23', kickoff: '2026-06-24T02:00:00Z', group: 'L', home: 'Croatia',       away: 'Panama',               venue: 'Philadelphia',   stage: STAGE.GROUP },
  { id: 'gs49', date: 'Jun 24', kickoff: '2026-06-24T19:00:00Z', group: 'A', home: 'Mexico',        away: 'Czechia',              venue: 'Guadalajara',    stage: STAGE.GROUP },
  { id: 'gs50', date: 'Jun 24', kickoff: '2026-06-24T19:00:00Z', group: 'A', home: 'South Korea',   away: 'South Africa',         venue: 'Mexico City',    stage: STAGE.GROUP },
  { id: 'gs51', date: 'Jun 24', kickoff: '2026-06-24T22:00:00Z', group: 'C', home: 'Morocco',       away: 'Haiti',                venue: 'Atlanta',        stage: STAGE.GROUP },
  { id: 'gs52', date: 'Jun 24', kickoff: '2026-06-24T22:00:00Z', group: 'C', home: 'Brazil',        away: 'Scotland',             venue: 'New York / NJ',  stage: STAGE.GROUP },
  { id: 'gs53', date: 'Jun 25', kickoff: '2026-06-25T19:00:00Z', group: 'B', home: 'Canada',        away: 'Switzerland',          venue: 'Toronto',        stage: STAGE.GROUP },
  { id: 'gs54', date: 'Jun 25', kickoff: '2026-06-25T19:00:00Z', group: 'B', home: 'Bosnia & Herz.',away: 'Qatar',                venue: 'Vancouver',      stage: STAGE.GROUP },
  { id: 'gs55', date: 'Jun 25', kickoff: '2026-06-25T22:00:00Z', group: 'D', home: 'USA',           away: 'Türkiye',              venue: 'Seattle',        stage: STAGE.GROUP },
  { id: 'gs56', date: 'Jun 25', kickoff: '2026-06-25T22:00:00Z', group: 'D', home: 'Australia',     away: 'Paraguay',             venue: 'San Francisco',  stage: STAGE.GROUP },
  { id: 'gs57', date: 'Jun 26', kickoff: '2026-06-26T19:00:00Z', group: 'E', home: 'Germany',       away: 'Ecuador',              venue: 'Philadelphia',   stage: STAGE.GROUP },
  { id: 'gs58', date: 'Jun 26', kickoff: '2026-06-26T19:00:00Z', group: 'E', home: 'Ivory Coast',   away: 'Curaçao',              venue: 'Kansas City',    stage: STAGE.GROUP },
  { id: 'gs59', date: 'Jun 26', kickoff: '2026-06-26T22:00:00Z', group: 'F', home: 'Netherlands',   away: 'Tunisia',              venue: 'Dallas',         stage: STAGE.GROUP },
  { id: 'gs60', date: 'Jun 26', kickoff: '2026-06-26T22:00:00Z', group: 'F', home: 'Sweden',        away: 'Japan',                venue: 'Houston',        stage: STAGE.GROUP },
  { id: 'gs61', date: 'Jun 27', kickoff: '2026-06-27T19:00:00Z', group: 'G', home: 'Belgium',       away: 'New Zealand',          venue: 'Seattle',        stage: STAGE.GROUP },
  { id: 'gs62', date: 'Jun 27', kickoff: '2026-06-27T19:00:00Z', group: 'G', home: 'Egypt',         away: 'Iran',                 venue: 'Los Angeles',    stage: STAGE.GROUP },
  { id: 'gs63', date: 'Jun 27', kickoff: '2026-06-27T22:00:00Z', group: 'H', home: 'Spain',         away: 'Uruguay',              venue: 'Miami',          stage: STAGE.GROUP },
  { id: 'gs64', date: 'Jun 27', kickoff: '2026-06-27T22:00:00Z', group: 'H', home: 'Saudi Arabia',  away: 'Cape Verde',           venue: 'Atlanta',        stage: STAGE.GROUP },
  { id: 'gs65', date: 'Jun 28', kickoff: '2026-06-28T19:00:00Z', group: 'I', home: 'France',        away: 'Norway',               venue: 'Boston',         stage: STAGE.GROUP },
  { id: 'gs66', date: 'Jun 28', kickoff: '2026-06-28T19:00:00Z', group: 'I', home: 'Senegal',       away: 'Iraq',                 venue: 'New York / NJ',  stage: STAGE.GROUP },
  { id: 'gs67', date: 'Jun 28', kickoff: '2026-06-28T22:00:00Z', group: 'J', home: 'Argentina',     away: 'Jordan',               venue: 'Miami',          stage: STAGE.GROUP },
  { id: 'gs68', date: 'Jun 28', kickoff: '2026-06-28T22:00:00Z', group: 'J', home: 'Algeria',       away: 'Austria',              venue: 'Kansas City',    stage: STAGE.GROUP },
  { id: 'gs69', date: 'Jun 29', kickoff: '2026-06-29T19:00:00Z', group: 'K', home: 'Portugal',      away: 'Colombia',             venue: 'Houston',        stage: STAGE.GROUP },
  { id: 'gs70', date: 'Jun 29', kickoff: '2026-06-29T19:00:00Z', group: 'K', home: 'Congo DR',      away: 'Uzbekistan',           venue: 'Atlanta',        stage: STAGE.GROUP },
  { id: 'gs71', date: 'Jun 29', kickoff: '2026-06-29T22:00:00Z', group: 'L', home: 'England',       away: 'Panama',               venue: 'New York / NJ',  stage: STAGE.GROUP },
  { id: 'gs72', date: 'Jun 29', kickoff: '2026-06-29T22:00:00Z', group: 'L', home: 'Croatia',       away: 'Ghana',                venue: 'Dallas',         stage: STAGE.GROUP },

  // ── ROUND OF 32 ─ teams TBD, filled in by app logic ──────────────
  { id: 'r32_1',  date: 'Jun 28', kickoff: '2026-06-28T19:00:00Z', group: '–', home: null, away: null, homeRef: '2A', awayRef: '2B', venue: 'Los Angeles',   stage: STAGE.R32 },
  { id: 'r32_2',  date: 'Jun 29', kickoff: '2026-06-29T17:00:00Z', group: '–', home: null, away: null, homeRef: '1C', awayRef: '2F', venue: 'Houston',       stage: STAGE.R32 },
  { id: 'r32_3',  date: 'Jun 29', kickoff: '2026-06-29T20:30:00Z', group: '–', home: null, away: null, homeRef: '1E', awayRef: '3ABCDF', venue: 'Boston',    stage: STAGE.R32 },
  { id: 'r32_4',  date: 'Jun 30', kickoff: '2026-06-30T17:00:00Z', group: '–', home: null, away: null, homeRef: '2E', awayRef: '2I', venue: 'Dallas',        stage: STAGE.R32 },
  { id: 'r32_5',  date: 'Jun 30', kickoff: '2026-06-30T21:00:00Z', group: '–', home: null, away: null, homeRef: '1I', awayRef: '3CDFGH', venue: 'New York / NJ', stage: STAGE.R32 },
  { id: 'r32_6',  date: 'Jul 1',  kickoff: '2026-07-01T16:00:00Z', group: '–', home: null, away: null, homeRef: '1L', awayRef: '3EHIJK', venue: 'Atlanta',   stage: STAGE.R32 },
  { id: 'r32_7',  date: 'Jul 1',  kickoff: '2026-07-01T20:00:00Z', group: '–', home: null, away: null, homeRef: '2K', awayRef: '2L', venue: 'Toronto',      stage: STAGE.R32 },
  { id: 'r32_8',  date: 'Jul 2',  kickoff: '2026-07-02T17:00:00Z', group: '–', home: null, away: null, homeRef: '1A', awayRef: '3CEFI', venue: 'Miami',      stage: STAGE.R32 },
  { id: 'r32_9',  date: 'Jul 2',  kickoff: '2026-07-02T20:30:00Z', group: '–', home: null, away: null, homeRef: '1G', awayRef: '3AEHI', venue: 'Seattle',    stage: STAGE.R32 },
  { id: 'r32_10', date: 'Jul 2',  kickoff: '2026-07-03T03:00:00Z', group: '–', home: null, away: null, homeRef: '1B', awayRef: '3EFGIJ', venue: 'Vancouver', stage: STAGE.R32 },
  { id: 'r32_11', date: 'Jul 3',  kickoff: '2026-07-03T17:00:00Z', group: '–', home: null, away: null, homeRef: '2D', awayRef: '2G', venue: 'Dallas',       stage: STAGE.R32 },
  { id: 'r32_12', date: 'Jul 3',  kickoff: '2026-07-03T22:00:00Z', group: '–', home: null, away: null, homeRef: '1J', awayRef: '2H', venue: 'Miami',        stage: STAGE.R32 },
  { id: 'r32_13', date: 'Jul 3',  kickoff: '2026-07-04T01:30:00Z', group: '–', home: null, away: null, homeRef: '1K', awayRef: '3DEIJL', venue: 'Kansas City', stage: STAGE.R32 },
  { id: 'r32_14', date: 'Jul 4',  kickoff: '2026-07-04T17:00:00Z', group: '–', home: null, away: null, homeRef: '2C', awayRef: '2J', venue: 'Philadelphia', stage: STAGE.R32 },
  { id: 'r32_15', date: 'Jul 4',  kickoff: '2026-07-04T21:00:00Z', group: '–', home: null, away: null, homeRef: '1D', awayRef: '3BEIJ', venue: 'San Francisco', stage: STAGE.R32 },
  { id: 'r32_16', date: 'Jul 5',  kickoff: '2026-07-05T17:00:00Z', group: '–', home: null, away: null, homeRef: '1H', awayRef: '2J', venue: 'Los Angeles',  stage: STAGE.R32 },

  // ── QUARTER-FINALS ───────────────────────────────────────────────
  { id: 'qf1', date: 'Jul 7',  kickoff: '2026-07-07T19:00:00Z', group: '–', home: null, away: null, homeRef: 'Wr32_1',  awayRef: 'Wr32_2',  venue: 'Houston',       stage: STAGE.QF },
  { id: 'qf2', date: 'Jul 7',  kickoff: '2026-07-07T23:00:00Z', group: '–', home: null, away: null, homeRef: 'Wr32_3',  awayRef: 'Wr32_4',  venue: 'Los Angeles',   stage: STAGE.QF },
  { id: 'qf3', date: 'Jul 8',  kickoff: '2026-07-08T19:00:00Z', group: '–', home: null, away: null, homeRef: 'Wr32_5',  awayRef: 'Wr32_6',  venue: 'Dallas',        stage: STAGE.QF },
  { id: 'qf4', date: 'Jul 8',  kickoff: '2026-07-08T23:00:00Z', group: '–', home: null, away: null, homeRef: 'Wr32_7',  awayRef: 'Wr32_8',  venue: 'New York / NJ', stage: STAGE.QF },
  { id: 'qf5', date: 'Jul 9',  kickoff: '2026-07-09T19:00:00Z', group: '–', home: null, away: null, homeRef: 'Wr32_9',  awayRef: 'Wr32_10', venue: 'Seattle',       stage: STAGE.QF },
  { id: 'qf6', date: 'Jul 9',  kickoff: '2026-07-09T23:00:00Z', group: '–', home: null, away: null, homeRef: 'Wr32_11', awayRef: 'Wr32_12', venue: 'Atlanta',       stage: STAGE.QF },
  { id: 'qf7', date: 'Jul 10', kickoff: '2026-07-10T19:00:00Z', group: '–', home: null, away: null, homeRef: 'Wr32_13', awayRef: 'Wr32_14', venue: 'Kansas City',   stage: STAGE.QF },
  { id: 'qf8', date: 'Jul 10', kickoff: '2026-07-10T23:00:00Z', group: '–', home: null, away: null, homeRef: 'Wr32_15', awayRef: 'Wr32_16', venue: 'Miami',         stage: STAGE.QF },

  // ── SEMI-FINALS ──────────────────────────────────────────────────
  { id: 'sf1', date: 'Jul 14', kickoff: '2026-07-14T23:00:00Z', group: '–', home: null, away: null, homeRef: 'Wqf1', awayRef: 'Wqf2', venue: 'New York / NJ', stage: STAGE.SF },
  { id: 'sf2', date: 'Jul 15', kickoff: '2026-07-15T23:00:00Z', group: '–', home: null, away: null, homeRef: 'Wqf3', awayRef: 'Wqf4', venue: 'Dallas',        stage: STAGE.SF },
  { id: 'sf3', date: 'Jul 16', kickoff: '2026-07-16T23:00:00Z', group: '–', home: null, away: null, homeRef: 'Wqf5', awayRef: 'Wqf6', venue: 'Los Angeles',   stage: STAGE.SF },
  { id: 'sf4', date: 'Jul 17', kickoff: '2026-07-17T23:00:00Z', group: '–', home: null, away: null, homeRef: 'Wqf7', awayRef: 'Wqf8', venue: 'Atlanta',       stage: STAGE.SF },

  // ── THIRD PLACE ──────────────────────────────────────────────────
  { id: 'tp1', date: 'Jul 18', kickoff: '2026-07-18T23:00:00Z', group: '–', home: null, away: null, homeRef: 'Lsf_top', awayRef: 'Lsf_bot', venue: 'Miami', stage: STAGE.THIRD },

  // ── FINAL ────────────────────────────────────────────────────────
  { id: 'final', date: 'Jul 19', kickoff: '2026-07-19T20:00:00Z', group: '–', home: null, away: null, homeRef: 'Wsf_top', awayRef: 'Wsf_bot', venue: 'New York / NJ', stage: STAGE.FINAL },
];

export const GROUP_STAGE_MATCHES = MATCHES.filter(m => m.stage === STAGE.GROUP);
export const KNOCKOUT_MATCHES = MATCHES.filter(m => m.stage !== STAGE.GROUP);
