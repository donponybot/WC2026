import { useState, useEffect, useCallback, useRef } from 'react';
import MatchSchedule from './components/MatchSchedule';
import Predictions from './components/Predictions';
import Leaderboard from './components/Leaderboard';
import Bracket from './components/Bracket';
import News from './components/News';
import { Rules, AdminModal, ApiKeyModal } from './components/Rules';
import PlayerLoginModal from './components/PlayerLoginModal';
import { fetchLiveMatches, mapApiResults } from './utils/api';
import { MATCHES } from './data/matches';
import { deriveQualifiedTeams, calcPlayerTotal, buildKnockoutResults } from './utils/scoring';
import { hashPassword } from './utils/auth';
import { ensurePoolExists, subscribePool, savePlayers, saveResults, saveOneResult } from './utils/firestore';
import { LangProvider, useLang } from './utils/LangContext';
import BackupManager from './components/BackupManager';
import { t } from './utils/i18n';

const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'wc2026admin';
const POLL_INTERVAL_LIVE = 60_000;
const POLL_INTERVAL_IDLE = 300_000;

function AppInner() {
  const { lang, setLang } = useLang();
  const tabs = [
    t(lang,'tabSchedule'), t(lang,'tabPredictions'), t(lang,'tabLeaderboard'),
    t(lang,'tabBracket'), t(lang,'tabNews'), t(lang,'tabRules'),
  ];

  const [tab, setTab] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedInPlayer, setLoggedInPlayer] = useState(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [players, setPlayers] = useState([]);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [fbError, setFbError] = useState(null);
  const [apiError, setApiError] = useState(null);

  const playersRef = useRef(players);
  const resultsRef = useRef(results);
  useEffect(() => { playersRef.current = players; }, [players]);
  useEffect(() => { resultsRef.current = results; }, [results]);

  // Keep loggedInPlayer in sync with Firestore updates
  useEffect(() => {
    if (loggedInPlayer) {
      const updated = players.find(p => p.id === loggedInPlayer.id);
      if (updated) setLoggedInPlayer(updated);
    }
  }, [players]); // eslint-disable-line

  const pollRef = useRef(null);

  // Firebase real-time subscription
  useEffect(() => {
    ensurePoolExists()
      .then(() => {
        const unsub = subscribePool(({ players: p, results: r }) => {
          setPlayers(p); setResults(r); setLoading(false);
        });
        return unsub;
      })
      .catch(err => { setFbError(err.message); setLoading(false); });
  }, []);

  // Derived state — computed once, passed down to all components
  const qualifiedTeams = deriveQualifiedTeams(results);
  const koResults = buildKnockoutResults(results, qualifiedTeams);
  // Champion comes from koResults so knockout team resolution is correct
  const champion = koResults['final']?.winner || null;

  // Live scores polling
  const pollScores = useCallback(async () => {
    try {
      const apiMatches = await fetchLiveMatches();
      const mapped = mapApiResults(apiMatches, MATCHES);
      const cur = resultsRef.current;
      const updates = {};
      for (const [id, r] of Object.entries(mapped)) {
        if (!cur[id]?.manualOverride) updates[id] = r;
      }
      if (Object.keys(updates).length > 0) await saveResults({ ...cur, ...updates });
      setApiError(null);
    } catch (e) { setApiError(e.message); }
  }, []);

  useEffect(() => {
    pollScores();
    const hasLive = Object.values(results).some(r => r.isLive);
    clearInterval(pollRef.current);
    pollRef.current = setInterval(pollScores, hasLive ? POLL_INTERVAL_LIVE : POLL_INTERVAL_IDLE);
    return () => clearInterval(pollRef.current);
  }, [pollScores, results]);

  // Auth handlers
  function handleAdminLogin(pw) {
    if (pw === ADMIN_PASSWORD) { setIsAdmin(true); setLoggedInPlayer(null); setShowAdminModal(false); return true; }
    return false;
  }
  function handlePlayerLogin(player) {
    if (player.lang) setLang(player.lang);
    setLoggedInPlayer(player); setIsAdmin(false); setShowPlayerModal(false); setTab(1);
  }
  function handleAdminLogout() { setIsAdmin(false); }
  function handlePlayerLogout() { setLoggedInPlayer(null); }

  async function handleLangChange(l) {
    setLang(l);
    if (loggedInPlayer) {
      await updatePlayer(loggedInPlayer.id, { lang: l });
    }
  }

  // Player CRUD
  async function addPlayer(name, initials, password) {
    const id = `p_${Date.now()}`;
    const passwordHash = await hashPassword(password);
    await savePlayers([...playersRef.current, { id, name, initials, passwordHash, champion: null, predictions: {}, lang: 'en' }]);
  }
  async function removePlayer(id) {
    await savePlayers(playersRef.current.filter(p => p.id !== id));
  }
  async function updatePlayer(id, updates) {
    await savePlayers(playersRef.current.map(p => p.id === id ? { ...p, ...updates } : p));
  }
  async function setPrediction(playerId, matchId, prediction) {
    await savePlayers(playersRef.current.map(p =>
      p.id !== playerId ? p : { ...p, predictions: { ...p.predictions, [matchId]: prediction } }
    ));
  }
  async function handleResultOverride(matchId, r) {
    await saveOneResult(matchId, { ...r, manualOverride: true });
  }
  async function handleRestore(restoredPlayers, restoredResults) {
    await savePlayers(restoredPlayers);
    await saveResults(restoredResults);
  }

  const leaderboard = players
    .map(p => ({ ...p, total: calcPlayerTotal(p, results, champion) }))
    .sort((a, b) => b.total - a.total);

  if (loading) return (
    <div className="loading-screen">
      <div className="loading-spinner">⚽</div>
      <p>{t(lang, 'loading')}</p>
    </div>
  );
  if (fbError) return (
    <div className="loading-screen error">
      <p>⚠️ {t(lang, 'firebaseError')}</p>
      <code>{fbError}</code>
    </div>
  );

  const currentUser = isAdmin ? 'admin' : loggedInPlayer ? loggedInPlayer.name : null;

  return (
    <div className="app">
      <header>
        <div className="header-inner">
          <div className="header-title">
            <span className="trophy">🏆</span>
            <div>
              <h1>{t(lang, 'appTitle')}</h1>
              <p>{t(lang, 'appSubtitle')}</p>
            </div>
          </div>
          <div className="header-actions">
            <div className="lang-switcher">
              <button
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => handleLangChange('en')}
              >🇬🇧 EN</button>
              <button
                className={`lang-btn ${lang === 'es' ? 'active' : ''}`}
                onClick={() => handleLangChange('es')}
              >🇪🇸 ES</button>
            </div>

            {apiError && <span className="api-error" title={apiError}>⚠️ API</span>}

            {currentUser ? (
              <div className="logged-in-badge">
                <span>{isAdmin ? `🔓 Admin` : `👤 ${currentUser}`}</span>
                {/* Cog only visible to admin */}
                {isAdmin && (
                  <button className="btn-icon-inline" onClick={() => setShowApiKeyModal(true)} title={t(lang,'apiSettings')}>⚙️</button>
                )}
                <button className="logout-btn" onClick={isAdmin ? handleAdminLogout : handlePlayerLogout} title={t(lang,'logout')}>✕</button>
              </div>
            ) : (
              <>
                <button className="btn-admin" onClick={() => setShowPlayerModal(true)}>👤 {t(lang,'playerLogin')}</button>
                <button className="btn-admin" onClick={() => setShowAdminModal(true)}>🔒 {t(lang,'adminLogin')}</button>
              </>
            )}
          </div>
        </div>
        <nav className="tabs">
          {tabs.map((tab_label, i) => (
            <button key={tab_label} className={`tab ${tab === i ? 'active' : ''}`} onClick={() => setTab(i)}>{tab_label}</button>
          ))}
        </nav>
      </header>

      <main>
        {tab === 0 && <MatchSchedule results={results} qualifiedTeams={qualifiedTeams} koResults={koResults} isAdmin={isAdmin} onResultOverride={handleResultOverride} lang={lang} />}
        {tab === 1 && <Predictions players={players} results={results} qualifiedTeams={qualifiedTeams} koResults={koResults} isAdmin={isAdmin} loggedInPlayer={loggedInPlayer} onAddPlayer={addPlayer} onRemovePlayer={removePlayer} onUpdatePlayer={updatePlayer} onSetPrediction={setPrediction} lang={lang} />}
        {tab === 2 && <Leaderboard leaderboard={leaderboard} results={results} champion={champion} lang={lang} />}
        {tab === 3 && <Bracket results={results} qualifiedTeams={qualifiedTeams} koResults={koResults} lang={lang} />}
        {tab === 4 && <News lang={lang} />}
        {tab === 5 && <Rules lang={lang} playerCount={players.length} />}
      </main>

      {/* Backup manager — admin only, shown below main content on every tab */}
      {isAdmin && (
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 20px 40px' }}>
          <BackupManager
            players={players}
            results={results}
            onRestore={handleRestore}
            lang={lang}
          />
        </div>
      )}

      {showAdminModal && <AdminModal onLogin={handleAdminLogin} onClose={() => setShowAdminModal(false)} lang={lang} />}
      {showPlayerModal && <PlayerLoginModal players={players} onLogin={handlePlayerLogin} onClose={() => setShowPlayerModal(false)} lang={lang} />}
      {showApiKeyModal && <ApiKeyModal onClose={() => setShowApiKeyModal(false)} onSave={pollScores} lang={lang} />}
    </div>
  );
}

export default function App() {
  return <LangProvider><AppInner /></LangProvider>;
}
