// All WC 2026 fixtures — corrected from official confirmed schedule
// kickoff times in UTC (ET = UTC-4 in June/July)
// Sources: worldcupwiki.com, NBC Sports, FIFA official

export const COMPETITION_ID = 2000;

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

export const ALL_TEAMS = Object.values(GROUP_TEAMS).flat();

export const STAGE = {
  GROUP: 'Group Stage',
  R32:   'Round of 32',
  R16:   'Round of 16',
  QF:    'Quarter-Final',
  SF:    'Semi-Final',
  THIRD: 'Third Place',
  FINAL: 'Final',
};

export const MATCHES = [
  // ── GROUP STAGE ──────────────────────────────────────────────────────────

  // Thu Jun 11
  { id:'gs1',  date:'Jun 11', kickoff:'2026-06-11T19:00:00Z', group:'A', home:'Mexico',        away:'South Africa',         venue:'Estadio Azteca, Mexico City',       stage:STAGE.GROUP },
  { id:'gs2',  date:'Jun 12', kickoff:'2026-06-12T02:00:00Z', group:'A', home:'South Korea',   away:'Czechia',              venue:'Estadio Akron, Zapopan',            stage:STAGE.GROUP },

  // Fri Jun 12
  { id:'gs3',  date:'Jun 12', kickoff:'2026-06-12T19:00:00Z', group:'B', home:'Canada',        away:'Bosnia & Herzegovina', venue:'BMO Field, Toronto',                stage:STAGE.GROUP },
  { id:'gs4',  date:'Jun 13', kickoff:'2026-06-13T01:00:00Z', group:'D', home:'USA',           away:'Paraguay',             venue:'SoFi Stadium, Los Angeles',         stage:STAGE.GROUP },

  // Sat Jun 13
  { id:'gs5',  date:'Jun 13', kickoff:'2026-06-13T19:00:00Z', group:'B', home:'Qatar',         away:'Switzerland',          venue:'Levi\'s Stadium, San Francisco',    stage:STAGE.GROUP },
  { id:'gs6',  date:'Jun 13', kickoff:'2026-06-13T22:00:00Z', group:'C', home:'Brazil',        away:'Morocco',              venue:'MetLife Stadium, New York/NJ',      stage:STAGE.GROUP },
  { id:'gs7',  date:'Jun 14', kickoff:'2026-06-14T01:00:00Z', group:'C', home:'Haiti',         away:'Scotland',             venue:'Gillette Stadium, Boston',          stage:STAGE.GROUP },

  // Sun Jun 14
  { id:'gs8',  date:'Jun 14', kickoff:'2026-06-14T04:00:00Z', group:'D', home:'Australia',     away:'Türkiye',              venue:'BC Place, Vancouver',               stage:STAGE.GROUP },
  { id:'gs9',  date:'Jun 14', kickoff:'2026-06-14T17:00:00Z', group:'E', home:'Germany',       away:'Curaçao',              venue:'NRG Stadium, Houston',              stage:STAGE.GROUP },
  { id:'gs10', date:'Jun 14', kickoff:'2026-06-14T20:00:00Z', group:'F', home:'Netherlands',   away:'Japan',                venue:'AT&T Stadium, Dallas',              stage:STAGE.GROUP },
  { id:'gs11', date:'Jun 15', kickoff:'2026-06-14T23:00:00Z', group:'E', home:'Ivory Coast',   away:'Ecuador',              venue:'Lincoln Financial Field, Philadelphia', stage:STAGE.GROUP },
  { id:'gs12', date:'Jun 15', kickoff:'2026-06-15T02:00:00Z', group:'F', home:'Sweden',        away:'Tunisia',              venue:'Estadio BBVA, Monterrey',           stage:STAGE.GROUP },

  // Mon Jun 15
  { id:'gs13', date:'Jun 15', kickoff:'2026-06-15T16:00:00Z', group:'H', home:'Spain',         away:'Cape Verde',           venue:'Mercedes-Benz Stadium, Atlanta',    stage:STAGE.GROUP },
  { id:'gs14', date:'Jun 15', kickoff:'2026-06-15T19:00:00Z', group:'G', home:'Belgium',       away:'Egypt',                venue:'Lumen Field, Seattle',              stage:STAGE.GROUP },
  { id:'gs15', date:'Jun 15', kickoff:'2026-06-15T22:00:00Z', group:'H', home:'Saudi Arabia',  away:'Uruguay',              venue:'Hard Rock Stadium, Miami',           stage:STAGE.GROUP },
  { id:'gs16', date:'Jun 16', kickoff:'2026-06-16T01:00:00Z', group:'G', home:'Iran',          away:'New Zealand',          venue:'SoFi Stadium, Los Angeles',         stage:STAGE.GROUP },

  // Tue Jun 16
  { id:'gs17', date:'Jun 16', kickoff:'2026-06-16T19:00:00Z', group:'I', home:'France',        away:'Senegal',              venue:'MetLife Stadium, New York/NJ',      stage:STAGE.GROUP },
  { id:'gs18', date:'Jun 16', kickoff:'2026-06-16T22:00:00Z', group:'I', home:'Iraq',          away:'Norway',               venue:'Gillette Stadium, Boston',          stage:STAGE.GROUP },
  { id:'gs19', date:'Jun 17', kickoff:'2026-06-17T01:00:00Z', group:'J', home:'Argentina',     away:'Algeria',              venue:'Arrowhead Stadium, Kansas City',    stage:STAGE.GROUP },

  // Wed Jun 17
  { id:'gs20', date:'Jun 17', kickoff:'2026-06-17T04:00:00Z', group:'J', home:'Austria',       away:'Jordan',               venue:'Levi\'s Stadium, San Francisco',    stage:STAGE.GROUP },
  { id:'gs21', date:'Jun 17', kickoff:'2026-06-17T17:00:00Z', group:'K', home:'Portugal',      away:'Congo DR',             venue:'NRG Stadium, Houston',              stage:STAGE.GROUP },
  { id:'gs22', date:'Jun 17', kickoff:'2026-06-17T20:00:00Z', group:'L', home:'England',       away:'Croatia',              venue:'AT&T Stadium, Dallas',              stage:STAGE.GROUP },
  { id:'gs23', date:'Jun 18', kickoff:'2026-06-17T23:00:00Z', group:'L', home:'Ghana',         away:'Panama',               venue:'BMO Field, Toronto',                stage:STAGE.GROUP },
  { id:'gs24', date:'Jun 18', kickoff:'2026-06-18T02:00:00Z', group:'K', home:'Uzbekistan',    away:'Colombia',             venue:'Estadio Azteca, Mexico City',       stage:STAGE.GROUP },

  // Thu Jun 18
  { id:'gs25', date:'Jun 18', kickoff:'2026-06-18T16:00:00Z', group:'A', home:'Czechia',       away:'South Africa',         venue:'Mercedes-Benz Stadium, Atlanta',    stage:STAGE.GROUP },
  { id:'gs26', date:'Jun 18', kickoff:'2026-06-18T19:00:00Z', group:'B', home:'Switzerland',   away:'Bosnia & Herzegovina', venue:'SoFi Stadium, Los Angeles',         stage:STAGE.GROUP },
  { id:'gs27', date:'Jun 18', kickoff:'2026-06-18T22:00:00Z', group:'B', home:'Canada',        away:'Qatar',                venue:'BC Place, Vancouver',               stage:STAGE.GROUP },
  { id:'gs28', date:'Jun 19', kickoff:'2026-06-19T01:00:00Z', group:'A', home:'Mexico',        away:'South Korea',          venue:'Estadio Akron, Zapopan',            stage:STAGE.GROUP },

  // Fri Jun 19
  { id:'gs29', date:'Jun 19', kickoff:'2026-06-19T19:00:00Z', group:'D', home:'USA',           away:'Australia',            venue:'Lumen Field, Seattle',              stage:STAGE.GROUP },
  { id:'gs30', date:'Jun 19', kickoff:'2026-06-19T22:00:00Z', group:'C', home:'Scotland',      away:'Morocco',              venue:'Gillette Stadium, Boston',          stage:STAGE.GROUP },
  { id:'gs31', date:'Jun 20', kickoff:'2026-06-20T00:30:00Z', group:'C', home:'Brazil',        away:'Haiti',                venue:'Lincoln Financial Field, Philadelphia', stage:STAGE.GROUP },
  { id:'gs32', date:'Jun 20', kickoff:'2026-06-20T03:00:00Z', group:'D', home:'Türkiye',       away:'Paraguay',             venue:'Levi\'s Stadium, San Francisco',    stage:STAGE.GROUP },

  // Sat Jun 20
  { id:'gs33', date:'Jun 20', kickoff:'2026-06-20T17:00:00Z', group:'F', home:'Netherlands',   away:'Sweden',               venue:'NRG Stadium, Houston',              stage:STAGE.GROUP },
  { id:'gs34', date:'Jun 20', kickoff:'2026-06-20T20:00:00Z', group:'E', home:'Germany',       away:'Ivory Coast',          venue:'BMO Field, Toronto',                stage:STAGE.GROUP },
  { id:'gs35', date:'Jun 21', kickoff:'2026-06-21T00:00:00Z', group:'E', home:'Ecuador',       away:'Curaçao',              venue:'Arrowhead Stadium, Kansas City',    stage:STAGE.GROUP },

  // Sun Jun 21
  { id:'gs36', date:'Jun 21', kickoff:'2026-06-21T04:00:00Z', group:'F', home:'Tunisia',       away:'Japan',                venue:'Estadio BBVA, Monterrey',           stage:STAGE.GROUP },
  { id:'gs37', date:'Jun 21', kickoff:'2026-06-21T16:00:00Z', group:'H', home:'Spain',         away:'Saudi Arabia',         venue:'Mercedes-Benz Stadium, Atlanta',    stage:STAGE.GROUP },
  { id:'gs38', date:'Jun 21', kickoff:'2026-06-21T19:00:00Z', group:'G', home:'Belgium',       away:'Iran',                 venue:'SoFi Stadium, Los Angeles',         stage:STAGE.GROUP },
  { id:'gs39', date:'Jun 21', kickoff:'2026-06-21T22:00:00Z', group:'H', home:'Uruguay',       away:'Cape Verde',           venue:'Hard Rock Stadium, Miami',           stage:STAGE.GROUP },
  { id:'gs40', date:'Jun 22', kickoff:'2026-06-22T01:00:00Z', group:'G', home:'New Zealand',   away:'Egypt',                venue:'BC Place, Vancouver',               stage:STAGE.GROUP },

  // Mon Jun 22
  { id:'gs41', date:'Jun 22', kickoff:'2026-06-22T17:00:00Z', group:'J', home:'Argentina',     away:'Austria',              venue:'AT&T Stadium, Dallas',              stage:STAGE.GROUP },
  { id:'gs42', date:'Jun 22', kickoff:'2026-06-22T21:00:00Z', group:'I', home:'France',        away:'Iraq',                 venue:'Lincoln Financial Field, Philadelphia', stage:STAGE.GROUP },
  { id:'gs43', date:'Jun 23', kickoff:'2026-06-23T00:00:00Z', group:'I', home:'Norway',        away:'Senegal',              venue:'MetLife Stadium, New York/NJ',      stage:STAGE.GROUP },
  { id:'gs44', date:'Jun 23', kickoff:'2026-06-23T03:00:00Z', group:'J', home:'Jordan',        away:'Algeria',              venue:'Levi\'s Stadium, San Francisco',    stage:STAGE.GROUP },

  // Tue Jun 23
  { id:'gs45', date:'Jun 23', kickoff:'2026-06-23T17:00:00Z', group:'K', home:'Portugal',      away:'Uzbekistan',           venue:'NRG Stadium, Houston',              stage:STAGE.GROUP },
  { id:'gs46', date:'Jun 23', kickoff:'2026-06-23T20:00:00Z', group:'L', home:'England',       away:'Ghana',                venue:'Gillette Stadium, Boston',          stage:STAGE.GROUP },
  { id:'gs47', date:'Jun 24', kickoff:'2026-06-23T23:00:00Z', group:'L', home:'Panama',        away:'Croatia',              venue:'BMO Field, Toronto',                stage:STAGE.GROUP },
  { id:'gs48', date:'Jun 24', kickoff:'2026-06-24T02:00:00Z', group:'K', home:'Colombia',      away:'Congo DR',             venue:'Estadio Akron, Zapopan',            stage:STAGE.GROUP },

  // Wed Jun 24 — Final matchday Groups A, B, C (simultaneous)
  { id:'gs49', date:'Jun 24', kickoff:'2026-06-24T19:00:00Z', group:'B', home:'Switzerland',   away:'Canada',               venue:'BC Place, Vancouver',               stage:STAGE.GROUP },
  { id:'gs50', date:'Jun 24', kickoff:'2026-06-24T19:00:00Z', group:'B', home:'Bosnia & Herz.',away:'Qatar',                venue:'Lumen Field, Seattle',              stage:STAGE.GROUP },
  { id:'gs51', date:'Jun 24', kickoff:'2026-06-24T22:00:00Z', group:'C', home:'Scotland',      away:'Brazil',               venue:'Hard Rock Stadium, Miami',           stage:STAGE.GROUP },
  { id:'gs52', date:'Jun 24', kickoff:'2026-06-24T22:00:00Z', group:'C', home:'Morocco',       away:'Haiti',                venue:'Mercedes-Benz Stadium, Atlanta',    stage:STAGE.GROUP },
  { id:'gs53', date:'Jun 25', kickoff:'2026-06-25T01:00:00Z', group:'A', home:'Czechia',       away:'Mexico',               venue:'Estadio Azteca, Mexico City',       stage:STAGE.GROUP },
  { id:'gs54', date:'Jun 25', kickoff:'2026-06-25T01:00:00Z', group:'A', home:'South Africa',  away:'South Korea',          venue:'Estadio BBVA, Monterrey',           stage:STAGE.GROUP },

  // Thu Jun 25 — Final matchday Groups D, E, F (simultaneous)
  { id:'gs55', date:'Jun 25', kickoff:'2026-06-25T20:00:00Z', group:'E', home:'Curaçao',       away:'Ivory Coast',          venue:'Lincoln Financial Field, Philadelphia', stage:STAGE.GROUP },
  { id:'gs56', date:'Jun 25', kickoff:'2026-06-25T20:00:00Z', group:'E', home:'Ecuador',       away:'Germany',              venue:'MetLife Stadium, New York/NJ',      stage:STAGE.GROUP },
  { id:'gs57', date:'Jun 26', kickoff:'2026-06-25T23:00:00Z', group:'F', home:'Japan',         away:'Sweden',               venue:'AT&T Stadium, Dallas',              stage:STAGE.GROUP },
  { id:'gs58', date:'Jun 26', kickoff:'2026-06-25T23:00:00Z', group:'F', home:'Tunisia',       away:'Netherlands',          venue:'Arrowhead Stadium, Kansas City',    stage:STAGE.GROUP },
  { id:'gs59', date:'Jun 26', kickoff:'2026-06-26T02:00:00Z', group:'D', home:'Türkiye',       away:'USA',                  venue:'SoFi Stadium, Los Angeles',         stage:STAGE.GROUP },
  { id:'gs60', date:'Jun 26', kickoff:'2026-06-26T02:00:00Z', group:'D', home:'Paraguay',      away:'Australia',            venue:'Levi\'s Stadium, San Francisco',    stage:STAGE.GROUP },

  // Fri Jun 26 — Final matchday Groups G, H, I (simultaneous)
  { id:'gs61', date:'Jun 26', kickoff:'2026-06-26T19:00:00Z', group:'I', home:'Norway',        away:'France',               venue:'Gillette Stadium, Boston',          stage:STAGE.GROUP },
  { id:'gs62', date:'Jun 26', kickoff:'2026-06-26T19:00:00Z', group:'I', home:'Senegal',       away:'Iraq',                 venue:'BMO Field, Toronto',                stage:STAGE.GROUP },
  { id:'gs63', date:'Jun 27', kickoff:'2026-06-27T00:00:00Z', group:'H', home:'Cape Verde',    away:'Saudi Arabia',         venue:'NRG Stadium, Houston',              stage:STAGE.GROUP },
  { id:'gs64', date:'Jun 27', kickoff:'2026-06-27T00:00:00Z', group:'H', home:'Uruguay',       away:'Spain',                venue:'Estadio Akron, Zapopan',            stage:STAGE.GROUP },
  { id:'gs65', date:'Jun 27', kickoff:'2026-06-27T03:00:00Z', group:'G', home:'Egypt',         away:'Iran',                 venue:'Lumen Field, Seattle',              stage:STAGE.GROUP },
  { id:'gs66', date:'Jun 27', kickoff:'2026-06-27T03:00:00Z', group:'G', home:'New Zealand',   away:'Belgium',              venue:'BC Place, Vancouver',               stage:STAGE.GROUP },

  // Sat Jun 27 — Final matchday Groups J, K, L (simultaneous)
  { id:'gs67', date:'Jun 27', kickoff:'2026-06-27T21:00:00Z', group:'L', home:'Panama',        away:'England',              venue:'MetLife Stadium, New York/NJ',      stage:STAGE.GROUP },
  { id:'gs68', date:'Jun 27', kickoff:'2026-06-27T21:00:00Z', group:'L', home:'Croatia',       away:'Ghana',                venue:'Lincoln Financial Field, Philadelphia', stage:STAGE.GROUP },
  { id:'gs69', date:'Jun 28', kickoff:'2026-06-27T23:30:00Z', group:'K', home:'Colombia',      away:'Portugal',             venue:'Hard Rock Stadium, Miami',           stage:STAGE.GROUP },
  { id:'gs70', date:'Jun 28', kickoff:'2026-06-27T23:30:00Z', group:'K', home:'Congo DR',      away:'Uzbekistan',           venue:'Mercedes-Benz Stadium, Atlanta',    stage:STAGE.GROUP },
  { id:'gs71', date:'Jun 28', kickoff:'2026-06-28T02:00:00Z', group:'J', home:'Algeria',       away:'Austria',              venue:'Arrowhead Stadium, Kansas City',    stage:STAGE.GROUP },
  { id:'gs72', date:'Jun 28', kickoff:'2026-06-28T02:00:00Z', group:'J', home:'Jordan',        away:'Argentina',            venue:'AT&T Stadium, Dallas',              stage:STAGE.GROUP },

  // ── ROUND OF 32 (Jun 28 – Jul 3) ────────────────────────────────────────
  { id:'r32_1',  date:'Jun 28', kickoff:'2026-06-28T19:00:00Z', group:'–', home:null, away:null, homeRef:'2A', awayRef:'2B',         venue:'SoFi Stadium, Los Angeles',            stage:STAGE.R32 },
  { id:'r32_2',  date:'Jun 29', kickoff:'2026-06-29T17:00:00Z', group:'–', home:null, away:null, homeRef:'1C', awayRef:'2F',         venue:'NRG Stadium, Houston',                 stage:STAGE.R32 },
  { id:'r32_3',  date:'Jun 29', kickoff:'2026-06-29T20:30:00Z', group:'–', home:null, away:null, homeRef:'1E', awayRef:'3ABCDF',     venue:'Gillette Stadium, Boston',             stage:STAGE.R32 },
  { id:'r32_4',  date:'Jun 30', kickoff:'2026-06-30T01:00:00Z', group:'–', home:null, away:null, homeRef:'1F', awayRef:'2C',         venue:'Estadio BBVA, Monterrey',              stage:STAGE.R32 },
  { id:'r32_5',  date:'Jun 30', kickoff:'2026-06-30T17:00:00Z', group:'–', home:null, away:null, homeRef:'2E', awayRef:'2I',         venue:'AT&T Stadium, Dallas',                 stage:STAGE.R32 },
  { id:'r32_6',  date:'Jun 30', kickoff:'2026-06-30T21:00:00Z', group:'–', home:null, away:null, homeRef:'1I', awayRef:'3CDFGH',     venue:'MetLife Stadium, New York/NJ',         stage:STAGE.R32 },
  { id:'r32_7',  date:'Jul 1',  kickoff:'2026-07-01T01:00:00Z', group:'–', home:null, away:null, homeRef:'1A', awayRef:'3CEFI',      venue:'Estadio Azteca, Mexico City',          stage:STAGE.R32 },
  { id:'r32_8',  date:'Jul 1',  kickoff:'2026-07-01T16:00:00Z', group:'–', home:null, away:null, homeRef:'1L', awayRef:'3EHIJK',     venue:'Mercedes-Benz Stadium, Atlanta',       stage:STAGE.R32 },
  { id:'r32_9',  date:'Jul 1',  kickoff:'2026-07-01T20:00:00Z', group:'–', home:null, away:null, homeRef:'1G', awayRef:'3AEHIJ',     venue:'Lumen Field, Seattle',                 stage:STAGE.R32 },
  { id:'r32_10', date:'Jul 2',  kickoff:'2026-07-02T00:00:00Z', group:'–', home:null, away:null, homeRef:'1D', awayRef:'3BEFIJ',     venue:'Levi\'s Stadium, San Francisco',       stage:STAGE.R32 },
  { id:'r32_11', date:'Jul 2',  kickoff:'2026-07-02T19:00:00Z', group:'–', home:null, away:null, homeRef:'1H', awayRef:'2J',         venue:'SoFi Stadium, Los Angeles',            stage:STAGE.R32 },
  { id:'r32_12', date:'Jul 3',  kickoff:'2026-07-02T23:00:00Z', group:'–', home:null, away:null, homeRef:'2K', awayRef:'2L',         venue:'BMO Field, Toronto',                   stage:STAGE.R32 },
  { id:'r32_13', date:'Jul 3',  kickoff:'2026-07-03T03:00:00Z', group:'–', home:null, away:null, homeRef:'1B', awayRef:'3EFGIJ',     venue:'BC Place, Vancouver',                  stage:STAGE.R32 },
  { id:'r32_14', date:'Jul 3',  kickoff:'2026-07-03T18:00:00Z', group:'–', home:null, away:null, homeRef:'2D', awayRef:'2G',         venue:'AT&T Stadium, Dallas',                 stage:STAGE.R32 },
  { id:'r32_15', date:'Jul 3',  kickoff:'2026-07-03T22:00:00Z', group:'–', home:null, away:null, homeRef:'1J', awayRef:'2H',         venue:'Hard Rock Stadium, Miami',             stage:STAGE.R32 },
  { id:'r32_16', date:'Jul 4',  kickoff:'2026-07-04T01:30:00Z', group:'–', home:null, away:null, homeRef:'1K', awayRef:'3DEIJL',     venue:'Arrowhead Stadium, Kansas City',       stage:STAGE.R32 },

  // ── ROUND OF 16 (Jul 4 – Jul 7) ─────────────────────────────────────────
  { id:'r16_1', date:'Jul 4',  kickoff:'2026-07-04T21:00:00Z', group:'–', home:null, away:null, homeRef:'Wr32_3',  awayRef:'Wr32_6',  venue:'Lincoln Financial Field, Philadelphia', stage:STAGE.R16 },
  { id:'r16_2', date:'Jul 4',  kickoff:'2026-07-04T17:00:00Z', group:'–', home:null, away:null, homeRef:'Wr32_1',  awayRef:'Wr32_4',  venue:'NRG Stadium, Houston',                 stage:STAGE.R16 },
  { id:'r16_3', date:'Jul 6',  kickoff:'2026-07-06T19:00:00Z', group:'–', home:null, away:null, homeRef:'Wr32_12', awayRef:'Wr32_11', venue:'AT&T Stadium, Dallas',                 stage:STAGE.R16 },
  { id:'r16_4', date:'Jul 7',  kickoff:'2026-07-07T00:00:00Z', group:'–', home:null, away:null, homeRef:'Wr32_10', awayRef:'Wr32_9',  venue:'Lumen Field, Seattle',                 stage:STAGE.R16 },
  { id:'r16_5', date:'Jul 5',  kickoff:'2026-07-05T20:00:00Z', group:'–', home:null, away:null, homeRef:'Wr32_2',  awayRef:'Wr32_5',  venue:'MetLife Stadium, New York/NJ',         stage:STAGE.R16 },
  { id:'r16_6', date:'Jul 6',  kickoff:'2026-07-06T00:00:00Z', group:'–', home:null, away:null, homeRef:'Wr32_7',  awayRef:'Wr32_8',  venue:'Estadio Azteca, Mexico City',          stage:STAGE.R16 },
  { id:'r16_7', date:'Jul 7',  kickoff:'2026-07-07T16:00:00Z', group:'–', home:null, away:null, homeRef:'Wr32_15', awayRef:'Wr32_14', venue:'Mercedes-Benz Stadium, Atlanta',       stage:STAGE.R16 },
  { id:'r16_8', date:'Jul 7',  kickoff:'2026-07-07T20:00:00Z', group:'–', home:null, away:null, homeRef:'Wr32_13', awayRef:'Wr32_16', venue:'BC Place, Vancouver',                  stage:STAGE.R16 },

  // ── QUARTER-FINALS (Jul 9 – Jul 12) ─────────────────────────────────────
  { id:'qf1', date:'Jul 9',  kickoff:'2026-07-09T20:00:00Z', group:'–', home:null, away:null, homeRef:'Wr16_1', awayRef:'Wr16_2', venue:'Gillette Stadium, Boston',       stage:STAGE.QF },
  { id:'qf2', date:'Jul 10', kickoff:'2026-07-10T19:00:00Z', group:'–', home:null, away:null, homeRef:'Wr16_3', awayRef:'Wr16_4', venue:'SoFi Stadium, Los Angeles',      stage:STAGE.QF },
  { id:'qf3', date:'Jul 11', kickoff:'2026-07-11T21:00:00Z', group:'–', home:null, away:null, homeRef:'Wr16_5', awayRef:'Wr16_6', venue:'Hard Rock Stadium, Miami',       stage:STAGE.QF },
  { id:'qf4', date:'Jul 12', kickoff:'2026-07-12T01:00:00Z', group:'–', home:null, away:null, homeRef:'Wr16_7', awayRef:'Wr16_8', venue:'Arrowhead Stadium, Kansas City', stage:STAGE.QF },

  // ── SEMI-FINALS (Jul 14 – Jul 15) ───────────────────────────────────────
  { id:'sf1', date:'Jul 14', kickoff:'2026-07-14T19:00:00Z', group:'–', home:null, away:null, homeRef:'Wqf1', awayRef:'Wqf2', venue:'AT&T Stadium, Dallas',          stage:STAGE.SF },
  { id:'sf2', date:'Jul 15', kickoff:'2026-07-15T19:00:00Z', group:'–', home:null, away:null, homeRef:'Wqf3', awayRef:'Wqf4', venue:'Mercedes-Benz Stadium, Atlanta', stage:STAGE.SF },

  // ── THIRD PLACE (Jul 18) ────────────────────────────────────────────────
  { id:'tp1', date:'Jul 18', kickoff:'2026-07-18T21:00:00Z', group:'–', home:null, away:null, homeRef:'Lsf1', awayRef:'Lsf2', venue:'Hard Rock Stadium, Miami', stage:STAGE.THIRD },

  // ── FINAL (Jul 19) ──────────────────────────────────────────────────────
  { id:'final', date:'Jul 19', kickoff:'2026-07-19T19:00:00Z', group:'–', home:null, away:null, homeRef:'Wsf1', awayRef:'Wsf2', venue:'MetLife Stadium, New York/NJ', stage:STAGE.FINAL },
];

export const GROUP_STAGE_MATCHES  = MATCHES.filter(m => m.stage === STAGE.GROUP);
export const KNOCKOUT_MATCHES     = MATCHES.filter(m => m.stage !== STAGE.GROUP);
