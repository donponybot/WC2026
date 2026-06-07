// Country code mapping for flagcdn.com (free, no key needed)
const TEAM_CODES = {
  "Algeria": "dz", "Argentina": "ar", "Australia": "au", "Austria": "at",
  "Belgium": "be", "Bosnia & Herz.": "ba", "Bosnia & Herzegovina": "ba",
  "Brazil": "br", "Canada": "ca", "Cape Verde": "cv", "Colombia": "co",
  "Congo DR": "cd", "Croatia": "hr", "Curaçao": "cw", "Czechia": "cz",
  "Ecuador": "ec", "Egypt": "eg", "England": "gb-eng", "France": "fr",
  "Germany": "de", "Ghana": "gh", "Haiti": "ht", "Iran": "ir", "Iraq": "iq",
  "Ivory Coast": "ci", "Japan": "jp", "Jordan": "jo", "Mexico": "mx",
  "Morocco": "ma", "Netherlands": "nl", "New Zealand": "nz", "Norway": "no",
  "Panama": "pa", "Paraguay": "py", "Portugal": "pt", "Qatar": "qa",
  "Saudi Arabia": "sa", "Scotland": "gb-sct", "Senegal": "sn",
  "South Africa": "za", "South Korea": "kr", "Spain": "es", "Sweden": "se",
  "Switzerland": "ch", "Tunisia": "tn", "Türkiye": "tr", "USA": "us",
  "Uruguay": "uy", "Uzbekistan": "uz",
};

export function flagUrl(teamName, size = 20) {
  const code = TEAM_CODES[teamName];
  if (!code) return null;
  return `https://flagcdn.com/${size}x${Math.round(size * 0.75)}/${code}.png`;
}

export function flagCode(teamName) {
  return TEAM_CODES[teamName] || null;
}

// Kept for non-JSX fallback contexts (option tags etc.)
export function flag(teamName) {
  const code = TEAM_CODES[teamName];
  if (!code) return '';
  if (code.includes('-')) return '🏴';
  const offset = 127397;
  return String.fromCodePoint(...code.toUpperCase().split('').map(c => c.charCodeAt(0) + offset));
}
