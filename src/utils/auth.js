// Simple password hashing using Web Crypto API (built into browsers)
// We use SHA-256 — good enough for a prediction pool, no server needed

export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'wc2026salt');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password, hash) {
  const attempt = await hashPassword(password);
  return attempt === hash;
}
