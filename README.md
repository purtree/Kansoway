# KANSO WAY

Static site. Deploy with Vercel.

## Deploy
```
npm i -g vercel
vercel --prod
```

## Google Sheets Waitlist
1. Apps Script editor → paste `scripts/google-apps-script.js`
2. Deploy as Web App (Anyone)
3. Copy URL → paste into `main.js` line: `const SCRIPT_URL = '...'`

## Domain kansoway.com
- A: `@` → `76.76.21.21`
- CNAME: `www` → `cname.vercel-dns.com`
