import FlagImg from './FlagImg';
import { t } from '../utils/i18n';

const MEDAL_BG  = ['#fef9c3', '#f1f5f9', '#fef3c7'];
const MEDAL_BORDER = ['#f59e0b', '#94a3b8', '#d97706'];
const MEDALS = ['🥇', '🥈', '🥉'];

export default function Leaderboard({ leaderboard, results, champion, lang = 'en' }) {
  const anyPoints = leaderboard.some(p => p.total > 0);

  return (
    <div className="leaderboard-tab">

      {/* Header */}
      <div className="lb-header">
        <h2>{t(lang, 'leaderboard')}</h2>
        {champion && (
          <div className="champion-banner">
            🏆 {t(lang, 'champion')}:
            <FlagImg team={champion} size={22} style={{ margin: '0 6px', verticalAlign: 'middle' }} />
            <strong>{champion}</strong>
          </div>
        )}
      </div>

      {/* Player cards */}
      {leaderboard.length === 0 ? (
        <div className="empty-state">{t(lang, 'noPlayersLb')}</div>
      ) : (
        <div className="lb-cards">
          {leaderboard.map((p, i) => {
            const isTop = i < 3;
            const isFirst = i === 0 && anyPoints;
            return (
              <div
                key={p.id}
                className="lb-card"
                style={{
                  background: isTop ? MEDAL_BG[i] : 'var(--white)',
                  borderLeft: `4px solid ${isTop ? MEDAL_BORDER[i] : 'var(--gray-200)'}`,
                  boxShadow: isFirst ? '0 4px 20px rgba(245,166,35,0.2)' : '0 1px 6px rgba(0,0,0,0.06)',
                }}
              >
                {/* Left: medal + initials */}
                <div className="lb-card-left">
                  <span className="lb-medal">{MEDALS[i] || `#${i + 1}`}</span>
                  <span className="lb-card-initials">{p.initials}</span>
                </div>

                {/* Middle: name + champion pick */}
                <div className="lb-card-middle">
                  <div className="lb-card-name">{p.name}</div>
                  <div className="lb-card-champion">
                    {p.champion ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <FlagImg team={p.champion} size={16} />
                        <span className={p.champion === champion ? 'champ-correct' : ''}>
                          {p.champion} {p.champion === champion ? '✅' : ''}
                        </span>
                      </span>
                    ) : (
                      <span className="no-pick">–</span>
                    )}
                  </div>
                </div>

                {/* Right: points */}
                <div className="lb-card-right">
                  <span className={`lb-card-pts ${isFirst ? 'pts-gold' : ''}`}>
                    {p.total}
                  </span>
                  <span className="lb-card-pts-label">pts</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Points key */}
      <div className="points-key">
        <h4>{t(lang, 'pointsKey')}</h4>
        <div className="key-grid">
          <div className="key-item"><span className="key-pts">5</span> {t(lang, 'pts5')}</div>
          <div className="key-item"><span className="key-pts">2</span> {t(lang, 'pts2group')}</div>
          <div className="key-item"><span className="key-pts">2</span> {t(lang, 'pts2ko')}</div>
          <div className="key-item"><span className="key-pts">3</span> {t(lang, 'pts3ko')}</div>
        </div>
      </div>
    </div>
  );
}
