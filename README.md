# KANSO WAY — kansoway.com

> The Luxury of Focus. Premium minimalist desk art modules.

---

## Stack

- Pure HTML / CSS / JS — zero dependencies, zero build step
- Deployed on **Vercel** (static)
- Waitlist form → **Google Sheets** via Apps Script Web App

---

## Project Structure

```
kanso-way/
├── index.html                  # Main page
├── style.css                   # All styles
├── main.js                     # Nav, animations, form submit
├── vercel.json                 # Vercel config + cache headers
├── .gitignore
├── public/
│   └── images/
│       ├── logo.svg            # SVG logo (placeholder — replace with Figma export)
│       ├── logo-prep-artboard.svg  # Logo brand guide artboard
│       ├── favicon.svg         # SVG favicon
│       └── og-image.jpg        # 1200×630 OG image (auto-generated)
└── scripts/
    ├── google-apps-script.js   # Paste into Google Apps Script editor
    └── generate-og.py          # Regenerate OG image (pip install Pillow)
```

---

## 1. Deploy to Vercel

### Option A — Vercel CLI
```bash
npm i -g vercel
cd kanso-way
vercel deploy --prod
```

### Option B — GitHub → Vercel
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import repo
3. Framework Preset: **Other** (static)
4. Root Directory: `kanso-way` (or repo root if kanso-way is root)
5. Click Deploy

### Custom Domain
1. In Vercel → Project → Settings → Domains
2. Add `kansoway.com` and `www.kansoway.com`
3. Set DNS records at your registrar:
   - A record: `@` → `76.76.21.21`
   - CNAME: `www` → `cname.vercel-dns.com`

---

## 2. Google Sheets Waitlist Setup

### Step 1 — Create Google Sheet
1. Create a new Google Sheet
2. Name Sheet 1 tab: `Waitlist`

### Step 2 — Apps Script
1. Extensions → Apps Script
2. Delete default code, paste content of `scripts/google-apps-script.js`
3. Save (Ctrl+S)

### Step 3 — Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Click Deploy → Copy the **Web App URL**

### Step 4 — Connect to Frontend
Open `main.js`, find line:
```js
const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
```
Replace with your Web App URL:
```js
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfyc.../exec';
```

### Step 5 — Test
Submit the form on the website. Check your Google Sheet — you should see the entry.

---

## 3. OG Image

The `og-image.jpg` is pre-generated and included. To regenerate:
```bash
pip install Pillow
python scripts/generate-og.py
```

---

## 4. Logo Preparation

See `public/images/logo-prep-artboard.svg` for the full brand guide.

Current placeholder logo uses SVG text. For production, replace with a proper Figma-exported logo:
- `logo.svg` — main dark-bg version
- `logo-light.svg` — light-bg version
- `favicon.ico` — multi-size favicon
- `apple-touch-icon.png` — 180×180px

---

## 5. Go-Live Checklist

- [ ] Replace `logo.svg` with final Figma logo
- [ ] Replace `SCRIPT_URL` in `main.js` with real Apps Script URL
- [ ] Add `hello@kansoway.com` email alias or forwarding
- [ ] Submit sitemap to Google Search Console: `https://kansoway.com/sitemap.xml`
- [ ] Add `sitemap.xml` (optional — single page site, low priority)
- [ ] Enable Vercel Analytics (free tier)
- [ ] Test mobile on real device (iOS Safari, Android Chrome)

---

## Brand

| Token | Value |
|-------|-------|
| Primary Gold | `#C8B89A` |
| Off-White | `#E8E4DC` |
| Deep Black | `#0E0E0D` |
| Surface | `#161614` |
| Serif | Cormorant Garamond 300/400 |
| Sans | Inter 300/400/500 |

---

© 2026 KANSO WAY
