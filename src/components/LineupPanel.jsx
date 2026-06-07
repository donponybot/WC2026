import { useState, useEffect, useRef } from 'react';
import FlagImg from './FlagImg';
import { SQUADS, assignPositionSlots } from '../data/squads';
import { fetchSquadPhotos } from '../utils/playerPhotos';

const PROXY_BASE = process.env.REACT_APP_NEWS_PROXY || '';

async function fetchLiveLineup(fdMatchId) {
  if (!PROXY_BASE || !fdMatchId) return null;
  try {
    const res = await fetch(`${PROXY_BASE}/football/matches/${fdMatchId}/lineups`);
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

function mapApiLineup(apiLineup, teamName) {
  if (!apiLineup?.homeTeam && !apiLineup?.awayTeam) return null;
  const side = apiLineup.homeTeam?.name?.includes(teamName) ||
               teamName?.includes(apiLineup.homeTeam?.name?.split(' ')[0])
    ? apiLineup.homeTeam : apiLineup.awayTeam;
  if (!side?.startingXI?.length) return null;
  return {
    formation: side.formation || '4-3-3',
    coach: side.coach?.name || '',
    players: side.startingXI.map(p => ({
      name: p.name?.split(' ').slice(-1)[0] || p.name,
      pos: mapApiPosition(p.position),
      no: p.shirtNumber || 0,
    })),
  };
}

function mapApiPosition(pos) {
  const map = {
    'Goalkeeper': 'GK', 'Centre-Back': 'CB', 'Right-Back': 'RB', 'Left-Back': 'LB',
    'Defensive Midfield': 'CDM', 'Central Midfield': 'CM', 'Attacking Midfield': 'CAM',
    'Right Midfield': 'RM', 'Left Midfield': 'LM',
    'Right Winger': 'RW', 'Left Winger': 'LW',
    'Centre-Forward': 'ST', 'Second Striker': 'CF',
  };
  return map[pos] || 'CM';
}

// ── Player dot on pitch ───────────────────────────────────────────────────────
function PlayerDot({ player, photo, color, onClick, isSelected }) {
  const x = 15 + (player.coords.x / 100) * 310;
  const y = 15 + (player.coords.y / 100) * 470;
  const hasPhoto = !!photo;

  return (
    <g
      transform={`translate(${x},${y})`}
      style={{ cursor: 'pointer' }}
      onClick={() => onClick(player)}
    >
      {/* Glow ring when selected */}
      {isSelected && (
        <circle r="22" fill="none" stroke="#FFD700" strokeWidth="2.5" opacity="0.9" />
      )}
      {/* Shadow */}
      <ellipse cx="0" cy="23" rx="14" ry="4" fill="rgba(0,0,0,0.25)" />

      {/* Photo circle or shirt */}
      {hasPhoto ? (
        <>
          <clipPath id={`clip-${player.no}`}>
            <circle r="17" />
          </clipPath>
          <circle r="17" fill={color} stroke="white" strokeWidth="2" />
          <image
            href={photo}
            x="-17" y="-17" width="34" height="34"
            clipPath={`url(#clip-${player.no})`}
            preserveAspectRatio="xMidYMid slice"
          />
          {/* Subtle border over photo */}
          <circle r="17" fill="none" stroke="white" strokeWidth="1.5" />
        </>
      ) : (
        <>
          <circle r="16" fill={color} stroke="white" strokeWidth="2" />
          <text
            textAnchor="middle" dominantBaseline="central"
            fontSize="11" fontWeight="700" fill="white"
            fontFamily="Arial, sans-serif"
          >{player.no}</text>
        </>
      )}

      {/* Name tag */}
      <rect x="-22" y="20" width="44" height="13" rx="3" fill="rgba(0,0,0,0.7)" />
      <text
        y="27" textAnchor="middle" dominantBaseline="central"
        fontSize="7.5" fill="white" fontFamily="Arial, sans-serif" fontWeight="500"
      >
        {player.name.length > 9 ? player.name.slice(0, 9) + '…' : player.name}
      </text>
    </g>
  );
}

// ── Pitch ─────────────────────────────────────────────────────────────────────
function Pitch({ players, formation, teamColor, photos, onSelectPlayer, selectedPlayer }) {
  const positioned = assignPositionSlots(players, formation);

  return (
    <div className="lineup-pitch-wrap">
      <svg viewBox="0 0 340 500" className="lineup-pitch-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="stripes" x="0" y="0" width="340" height="40" patternUnits="userSpaceOnUse">
            <rect width="340" height="20" fill="#1a6e3c" />
            <rect y="20" width="340" height="20" fill="#1d7a43" />
          </pattern>
        </defs>
        <rect width="340" height="500" fill="url(#stripes)" rx="4" />
        <g stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" fill="none">
          <rect x="15" y="15" width="310" height="470" />
          <line x1="15" y1="250" x2="325" y2="250" />
          <circle cx="170" cy="250" r="46" />
          <circle cx="170" cy="250" r="2" fill="rgba(255,255,255,0.45)" />
          <rect x="75" y="15" width="190" height="75" />
          <rect x="110" y="15" width="120" height="35" />
          <circle cx="170" cy="115" r="2" fill="rgba(255,255,255,0.45)" />
          <path d="M 130 90 A 46 46 0 0 1 210 90" />
          <rect x="75" y="410" width="190" height="75" />
          <rect x="110" y="450" width="120" height="35" />
          <circle cx="170" cy="385" r="2" fill="rgba(255,255,255,0.45)" />
          <path d="M 130 410 A 46 46 0 0 0 210 410" />
          <path d="M 15 28 A 12 12 0 0 1 28 15" />
          <path d="M 312 15 A 12 12 0 0 1 325 28" />
          <path d="M 15 472 A 12 12 0 0 0 28 485" />
          <path d="M 325 472 A 12 12 0 0 1 312 485" />
        </g>
        {positioned.map((p, i) => (
          <PlayerDot
            key={i}
            player={p}
            photo={photos?.[p.name]}
            color={teamColor}
            onClick={onSelectPlayer}
            isSelected={selectedPlayer?.name === p.name}
          />
        ))}
      </svg>
    </div>
  );
}

// ── Player detail card ────────────────────────────────────────────────────────
function PlayerCard({ player, photo, color }) {
  if (!player) return null;
  return (
    <div className="lineup-player-card">
      <div className="lineup-player-card-photo" style={{ background: color }}>
        {photo
          ? <img src={photo} alt={player.name} className="lineup-player-card-img" />
          : <span className="lineup-player-card-no" style={{ color: 'white' }}>{player.no}</span>
        }
      </div>
      <div className="lineup-player-card-info">
        <div className="lineup-player-card-name">{player.name}</div>
        <div className="lineup-player-card-meta">
          <span className="lineup-player-pos" style={{ background: color }}>{player.pos}</span>
          <span className="lineup-player-card-shirt">#{player.no}</span>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
const SHIRT_COLORS = {
  'England': '#3B5998', 'France': '#002395', 'Brazil': '#009C3B',
  'Germany': '#3B5998', 'Spain': '#AA151B', 'Argentina': '#74ACDF',
  'Portugal': '#006600', 'Netherlands': '#FF6600', 'Belgium': '#1A1A1A',
  'USA': '#002868', 'Mexico': '#006847', 'Croatia': '#CC0000',
  'Morocco': '#C1272D', 'Senegal': '#00853F', 'Japan': '#003087',
  'South Korea': '#003478', 'Australia': '#FFD700', 'Switzerland': '#CC0000',
  'Uruguay': '#5EB6E4', 'Norway': '#CC0000', 'Sweden': '#006AA7',
  'Colombia': '#B5922A', 'Paraguay': '#D52B1E', 'Türkiye': '#E30A17',
  'Austria': '#CC0000', 'Algeria': '#006233', 'Ivory Coast': '#F77F00',
  'Iraq': '#007A3D', 'Scotland': '#0065BD', 'South Africa': '#007A4D',
  'Uzbekistan': '#1EB53A', 'Haiti': '#00209F', 'Congo DR': '#007FFF',
  'Cape Verde': '#003893', 'Curaçao': '#002395', 'Jordan': '#007A3D',
  'New Zealand': '#1A1A1A', 'Egypt': '#CC0000', 'Iran': '#239F40',
  'Panama': '#DA121A', 'Qatar': '#8D1B3D', 'Ecuador': '#B5922A',
  'Canada': '#CC0000', 'Ghana': '#006B3F', 'Belgium': '#1A1A1A',
  'Saudi Arabia': '#006C35', 'Tunisia': '#CC0000', 'Bolivia': '#D52B1E',
  'Czechia': '#003399',
};

export default function LineupPanel({ team, match, onClose }) {
  const [lineup, setLineup]           = useState(null);
  const [loading, setLoading]         = useState(true);
  const [photos, setPhotos]           = useState({});
  const [photosLoading, setPhotosLoading] = useState(false);
  const [isLive, setIsLive]           = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [view, setView]               = useState('pitch'); // 'pitch' | 'list'
  const fetchedRef = useRef(false);

  const color = SHIRT_COLORS[team] || '#1a6e3c';

  useEffect(() => {
    async function load() {
      setLoading(true);
      fetchedRef.current = false;

      // Try live API first
      if (match?.apiId) {
        const apiData = await fetchLiveLineup(match.apiId);
        if (apiData) {
          const mapped = mapApiLineup(apiData, team);
          if (mapped) {
            setLineup(mapped);
            setIsLive(true);
            setLoading(false);
            return;
          }
        }
      }

      // Preset squad
      const preset = SQUADS[team];
      if (preset) setLineup(preset);
      setIsLive(false);
      setLoading(false);
    }
    if (team) { setSelectedPlayer(null); setPhotos({}); load(); }
  }, [team, match]);

  // Fetch photos after lineup loads
  useEffect(() => {
    if (!lineup || fetchedRef.current) return;
    fetchedRef.current = true;
    setPhotosLoading(true);
    fetchSquadPhotos(lineup.players)
      .then(p => setPhotos(p))
      .finally(() => setPhotosLoading(false));
  }, [lineup]);

  if (!team) return null;

  return (
    <div className="lineup-overlay" onClick={onClose}>
      <div className="lineup-panel" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="lineup-header" style={{ background: color }}>
          <div className="lineup-header-left">
            <FlagImg team={team} size={32} style={{ borderRadius: 4 }} />
            <div>
              <div className="lineup-team-name">{team}</div>
              {lineup && (
                <div className="lineup-meta">
                  {lineup.formation}
                  {lineup.coach ? ` · ${lineup.coach}` : ''}
                  {isLive && <span className="lineup-live-badge">🔴 LIVE</span>}
                  {photosLoading && <span className="lineup-live-badge">📸 Loading…</span>}
                </div>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* View toggle */}
            <div className="lineup-view-toggle">
              <button
                className={view === 'pitch' ? 'active' : ''}
                onClick={() => setView('pitch')}
              >⚽</button>
              <button
                className={view === 'list' ? 'active' : ''}
                onClick={() => setView('list')}
              >☰</button>
            </div>
            <button className="lineup-close" onClick={onClose}>✕</button>
          </div>
        </div>

        {loading ? (
          <div className="lineup-loading">
            <div className="loading-spinner">⚽</div>
            <p>Loading lineup…</p>
          </div>
        ) : !lineup ? (
          <div className="lineup-loading"><p>No lineup data available.</p></div>
        ) : view === 'pitch' ? (
          <>
            <Pitch
              players={lineup.players}
              formation={lineup.formation}
              teamColor={color}
              photos={photos}
              onSelectPlayer={setSelectedPlayer}
              selectedPlayer={selectedPlayer}
            />
            {/* Selected player detail */}
            {selectedPlayer ? (
              <PlayerCard player={selectedPlayer} photo={photos[selectedPlayer.name]} color={color} />
            ) : (
              <p className="lineup-tap-hint">Tap a player to see details</p>
            )}
            {!isLive && (
              <div className="lineup-disclaimer">
                📋 Pre-tournament squad · tap players for details
              </div>
            )}
          </>
        ) : (
          /* List view */
          <div className="lineup-list-view">
            {lineup.players.map((p, i) => (
              <div key={i} className="lineup-list-row">
                <div className="lineup-list-photo" style={{ background: color }}>
                  {photos[p.name]
                    ? <img src={photos[p.name]} alt={p.name} className="lineup-list-photo-img" />
                    : <span style={{ color: 'white', fontWeight: 700, fontSize: 13 }}>{p.no}</span>
                  }
                </div>
                <span className="lineup-player-name">{p.name}</span>
                <span className="lineup-player-pos" style={{ marginLeft: 'auto' }}>{p.pos}</span>
                <span style={{ color: 'var(--gray-500)', fontSize: 12, marginLeft: 8 }}>#{p.no}</span>
              </div>
            ))}
            {!isLive && (
              <div className="lineup-disclaimer">📋 Pre-tournament squad</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
