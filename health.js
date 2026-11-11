export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({
    ok: true,
    app: 'Nusantara Earth',
    version: '3.2.0',
    timestamp: new Date().toISOString()
  });
}
