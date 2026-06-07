import { t } from '../utils/i18n';
import { useState, useEffect, useCallback } from 'react';

// Your Cloudflare Worker URL — set via REACT_APP_NEWS_PROXY in .env
// e.g. https://wc2026-news.YOUR_SUBDOMAIN.workers.dev
const PROXY_BASE = process.env.REACT_APP_NEWS_PROXY || '';

const QUERIES = (lang) => [
  { label: t(lang,'allNews'),     q: 'FIFA World Cup 2026' },
  { label: t(lang,'resultsNews'), q: 'World Cup 2026 result score' },
  { label: t(lang,'teamsNews'),   q: 'World Cup 2026 team squad' },
  { label: t(lang,'playersNews'), q: 'World Cup 2026 player news' },
];

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function NewsCard({ article }) {
  const [imgError, setImgError] = useState(false);
  return (
    <a href={article.url} target="_blank" rel="noreferrer" className="news-card">
      <div className="news-img-wrap">
        {article.urlToImage && !imgError ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="news-img"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="news-img-placeholder">⚽</div>
        )}
        <span className="news-source">{article.source?.name}</span>
      </div>
      <div className="news-body">
        <h3 className="news-title">{article.title?.replace(/\s*-\s*[^-]+$/, '')}</h3>
        {article.description && (
          <p className="news-desc">
            {article.description.slice(0, 120)}{article.description.length > 120 ? '…' : ''}
          </p>
        )}
        <div className="news-meta">
          <span className="news-author">{article.author?.split(',')[0] || article.source?.name}</span>
          <span className="news-time">{timeAgo(article.publishedAt)}</span>
        </div>
      </div>
    </a>
  );
}

export default function News({ lang = 'en' }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeQuery, setActiveQuery] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);

  const queries = QUERIES(lang);
  const fetchNews = useCallback(async (queryIdx) => {
    if (!PROXY_BASE) {
      setError('no_proxy');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        q: queries[queryIdx].q,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: '12',
      });
      const res = await fetch(`${PROXY_BASE}/news/everything?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.status === 'error') throw new Error(data.message);
      const clean = (data.articles || []).filter(a => a.title !== '[Removed]' && a.url);
      setArticles(clean);
      setLastUpdated(new Date());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchNews(activeQuery); }, [activeQuery, fetchNews]);

  // ── Not configured yet ────────────────────────────────────────────
  if (error === 'no_proxy') {
    return (
      <div className="news-tab">
        <div className="news-header"><h2>{t(lang,'newsTitle')}</h2></div>
        <div className="news-setup-card">
          <div className="setup-icon">🔑</div>
          <h3>Proxy not configured yet</h3>
          <p>Follow the setup steps in <code>wc2026-proxy/README.md</code> to deploy your Cloudflare Worker, then add the URL to your <code>.env</code>:</p>
          <pre>REACT_APP_NEWS_PROXY=https://wc2026-news.YOUR_SUBDOMAIN.workers.dev</pre>
          <p>Then redeploy with <code>npm run deploy</code>.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="news-tab">
      <div className="news-header">
        <div>
          <h2>{t(lang,'newsTitle')}</h2>
          {lastUpdated && <span className="news-updated">{t(lang,'newsUpdated')} {timeAgo(lastUpdated.toISOString())}</span>}
        </div>
        <button className="news-refresh" onClick={() => fetchNews(activeQuery)} disabled={loading}>
          {loading ? '⏳' : '🔄'}
        </button>
      </div>

      <div className="news-cats">
        {queries.map((q, i) => (
          <button
            key={q.q}
            className={`news-cat-btn ${activeQuery === i ? 'active' : ''}`}
            onClick={() => setActiveQuery(i)}
          >{q.label}</button>
        ))}
      </div>

      {error && error !== 'no_proxy' && (
        <div className="news-error">
          ⚠️ {error}
          <button onClick={() => fetchNews(activeQuery)} className="news-retry">Retry</button>
        </div>
      )}

      {loading && (
        <div className="news-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="news-card skeleton">
              <div className="news-img-wrap skeleton-img" />
              <div className="news-body">
                <div className="skel-line tall" />
                <div className="skel-line" />
                <div className="skel-line short" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && articles.length > 0 && (
        <div className="news-grid">
          {articles.map((a, i) => <NewsCard key={i} article={a} />)}
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <div className="empty-state">{t(lang,'noArticles')}</div>
      )}
    </div>
  );
}
