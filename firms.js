// Vercel serverless proxy for NASA FIRMS. Set NASA_FIRMS_MAP_KEY in Vercel Project Settings.
export default async function handler(req, res) {
  const key = process.env.NASA_FIRMS_MAP_KEY;
  if (!key) return res.status(503).json({ error: 'NASA_FIRMS_MAP_KEY is not configured on the server.' });
  const days = Math.max(1, Math.min(7, Number(req.query.days) || 1));
  const bbox = '94,-11,142,7'; // Indonesia: west,south,east,north
  const source = 'VIIRS_SNPP_NRT';
  const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${encodeURIComponent(key)}/${source}/${bbox}/${days}`;
  try {
    const upstream = await fetch(url);
    if (!upstream.ok) return res.status(upstream.status).json({ error: 'NASA FIRMS request failed.' });
    const csv = await upstream.text();
    const lines = csv.trim().split(/\r?\n/);
    if (lines.length < 2) return res.status(200).json({ data: [], count: 0 });
    const headers = lines.shift().split(',');
    const data = lines.map(line => {
      // FIRMS CSV fields are simple scalar values; quoted commas are not expected in this feed.
      const values = line.split(',');
      return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? '']));
    });
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json({ data, count: data.length, source, fetchedAt: new Date().toISOString() });
  } catch (e) {
    return res.status(502).json({ error: 'Unable to reach NASA FIRMS.' });
  }
}
