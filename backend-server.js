const express = require('express');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: '*' })); // Lock down to your domain in production

// OSRS Hiscores proxy
app.get('/api/hiscores/:username', (req, res) => {
  const username = encodeURIComponent(req.params.username);
  const url = `https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${username}`;

  https.get(url, (jagexRes) => {
    let data = '';
    jagexRes.on('data', chunk => data += chunk);
    jagexRes.on('end', () => {
      if (jagexRes.statusCode === 404) return res.status(404).json({ error: 'Player not found' });
      res.set('Content-Type', 'text/plain');
      res.send(data);
    });
  }).on('error', (e) => {
    console.error(e);
    res.status(500).json({ error: 'Failed to reach Jagex servers' });
  });
});

// OSRS GE price proxy
app.get('/api/price/:itemId', (req, res) => {
  const url = `https://prices.runescape.wiki/api/v1/osrs/latest?id=${req.params.itemId}`;
  https.get(url, { headers: { 'User-Agent': 'OSRS-Advisor/1.0' } }, (wikiRes) => {
    let data = '';
    wikiRes.on('data', chunk => data += chunk);
    wikiRes.on('end', () => res.set('Content-Type', 'application/json').send(data));
  }).on('error', () => res.status(500).json({ error: 'Price fetch failed' }));
});

app.listen(PORT, () => console.log(`OSRS proxy running on :${PORT}`));
