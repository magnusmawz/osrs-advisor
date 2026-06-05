# OSRS Advisor — Backend Proxy

## Setup

```bash
npm install
npm start          # production
npm run dev        # dev with auto-reload
```

## Deployment options

### Option A — Railway (free tier)
1. Push this folder to a GitHub repo
2. Go to railway.app → New Project → Deploy from GitHub
3. Railway auto-detects Node.js and runs `npm start`
4. Copy the generated URL (e.g. https://osrs-proxy.up.railway.app)
5. Set PROXY_BASE in the frontend HTML to that URL

### Option B — Render (free tier)
1. Push to GitHub
2. render.com → New Web Service → connect repo
3. Build command: `npm install`  |  Start command: `node server.js`
4. Free plan sleeps after 15min — use Railway instead for always-on

### Option C — VPS / DigitalOcean
```bash
npm install -g pm2
pm2 start server.js --name osrs-proxy
pm2 save && pm2 startup
```

### Option D — Vercel serverless
Rename server.js → api/hiscores/[username].js and export a handler function.

## Locking down CORS
In server.js, change:
  cors({ origin: '*' })
to:
  cors({ origin: 'https://yourdomain.com' })
