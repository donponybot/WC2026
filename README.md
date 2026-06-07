# 🏆 WC2026 Prediction Pool

A React web app for running a FIFA World Cup 2026 prediction pool. Live scores from football-data.org, automatic match locking at kickoff, knockout bracket auto-population, and a live leaderboard.

---

## 🚀 Deploy to GitHub Pages (step by step)

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ installed
- A [GitHub](https://github.com) account
- A free API key from [football-data.org](https://www.football-data.org/client/register) (takes 30 seconds)

---

### Step 1 — Create a GitHub repo

1. Go to https://github.com/new
2. Name it `wc2026-pool` (or anything you like)
3. Set it to **Public**
4. Click **Create repository**
5. Copy your repo URL (e.g. `https://github.com/YOUR_USERNAME/wc2026-pool`)

---

### Step 2 — Configure the app

Open `package.json` and update the `homepage` field:

```json
"homepage": "https://YOUR_USERNAME.github.io/wc2026-pool"
```

Create a `.env` file in the project root with your settings:

```env
REACT_APP_ADMIN_PASSWORD=your_secret_password_here
REACT_APP_FD_API_KEY=your_football_data_org_key_here
REACT_APP_FD_COMPETITION=2000
```

> **Note:** The competition ID `2000` is for the FIFA World Cup. Once football-data.org lists WC2026 matches, confirm the competition ID in their API Explorer at https://www.football-data.org/coverage

---

### Step 3 — Install and deploy

Open a terminal in the project folder:

```bash
# Install dependencies
npm install

# Deploy to GitHub Pages (builds + pushes to gh-pages branch)
npm run deploy
```

Your app will be live at: `https://YOUR_USERNAME.github.io/wc2026-pool`

---

### Step 4 — Share the link

Send the GitHub Pages URL to everyone in your group. The two admins will log in with the admin password.

---

## 🔄 Updating scores / pushing changes

Any time you want to update the app:

```bash
npm run deploy
```

---

## 📱 Features

### Match Schedule tab
- All 104 WC2026 matches with live scores via football-data.org API
- Auto-refreshes every 60s during live matches, every 5min otherwise
- Admins can manually override scores if needed
- Color-coded by stage (Group / R32 / QF / SF / Final)

### Predictions tab
- Admin adds players with name + initials
- Champion pick (5pts) per player
- Group stage: dropdown for Home Win / Draw / Away Win
- Knockout stage: dropdown + score input (Home–Away)
- Each cell **locks automatically at kickoff time** — no late entries
- Knockout matchups populate automatically as teams qualify from group stage
- Points shown per cell once result is in

### Leaderboard tab
- Live ranking sorted by total points
- Champion bonus highlighted
- Auto-updates as results come in

### Rules tab
- Full rules reference

---

## 🔑 Admin password

Default is `wc2026admin` — change it in your `.env` file before deploying.

The password is baked into the build. If you need to change it mid-tournament, update `.env` and run `npm run deploy` again.

---

## 🛠 Local development

```bash
npm start
```

Runs the app at http://localhost:3000 with hot reload.

---

## ⚠️ API Notes

- **Free tier limits:** 10 requests/minute on football-data.org free tier. The app polls every 60s during live matches, well within limits.
- **Competition ID:** WC2026 may not be available on football-data.org until closer to the tournament. Until then, scores won't auto-populate (admins can enter them manually).
- **CORS:** football-data.org supports browser requests with an API key header — no proxy needed.
- **Fallback:** If the API is unavailable, admins can manually enter scores via the ✏️ button on the Schedule tab.

---

## 📦 Project structure

```
src/
  App.jsx                  — Main shell, state, polling
  data/
    matches.js             — All 104 fixture definitions + team lists
  components/
    MatchSchedule.jsx      — Live scores view
    Predictions.jsx        — Prediction table with locking
    Leaderboard.jsx        — Rankings
    Rules.jsx              — Rules + AdminModal + ApiKeyModal
  utils/
    api.js                 — football-data.org API wrapper
    scoring.js             — Points engine, group standings, bracket resolver
  index.css                — All styles
```
