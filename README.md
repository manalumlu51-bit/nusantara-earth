# NUSANTARA EARTH V3.2

Dashboard prototipe pemantauan lingkungan Indonesia. Paket ini disusun ulang agar struktur proyek utuh saat diekstrak.

## Isi folder

- `index.html` — antarmuka peta responsif dan kontrol layer.
- `config.js` — konfigurasi URL tile publik (tanpa rahasia/API key).
- `api/firms.js` — serverless proxy NASA FIRMS.
- `package.json` — metadata proyek.
- `vercel.json` — konfigurasi fungsi dan header Vercel.
- `.env.example` — contoh variabel rahasia.

## Deploy dengan ponsel Android

1. Unduh ZIP V3.2 dan ekstrak. Buka folder `nusantara_earth_v3_2`.
2. Pastikan terlihat `index.html`, `config.js`, `package.json`, `vercel.json`, `.env.example`, dan folder `api`.
3. Untuk deployment yang paling konsisten dari HP, unggah seluruh isi folder ini ke repository GitHub baru (jangan hanya `index.html`).
4. Di Vercel pilih **Add New → Project**, impor repository GitHub tersebut, lalu tekan **Deploy**. Framework preset dapat dibiarkan `Other`; Build Command kosong dan Output Directory `.`.
5. Setelah deployment selesai, buka domain `.vercel.app` yang diberikan Vercel.

## Mengaktifkan NASA FIRMS

1. Dapatkan MAP_KEY dari layanan resmi NASA FIRMS.
2. Vercel → Project → Settings → Environment Variables.
3. Tambahkan `NASA_FIRMS_MAP_KEY` dengan nilai key pribadi.
4. Redeploy, lalu uji `https://DOMAIN-ANDA/api/firms?days=1`.

Jangan menaruh API key di `index.html`, `config.js`, atau repository publik.

## Konfigurasi layer tambahan

Buka `config.js` dan masukkan URL tile/WMTS publik yang sah pada properti yang sesuai. Jangan mengisi URL tebakan. Layer kehutanan, perkebunan, gambut, mangrove, kawasan lindung, dan Sentinel-2 tetap nonaktif sampai penyedia data/endpoint yang sesuai disiapkan.

## Fitur yang tersedia di antarmuka

- Basemap Esri World Imagery, OpenStreetMap, dan label geografis Esri.
- Kontrol zoom tampilan sampai 45 (overzoom digital setelah level native; bukan detail satelit baru).
- Panel layer hotspot NASA FIRMS, forest loss, RADD, GLAD, forest cover, oil palm, konsesi, gambut, mangrove, protected areas, radar hujan, angin, dan Sentinel-2.
- Filter hotspot, investigasi, ekspor CSV.
- Cuaca model Open-Meteo berdasarkan koordinat peta.
- Panel pemilihan tanggal/rentang Sentinel-2.

## Batasan penting

Antarmuka dan endpoint sudah disiapkan, tetapi data aktual memerlukan API key atau URL layanan resmi. NASA FIRMS memerlukan `NASA_FIRMS_MAP_KEY`. Layer Sentinel-2 perlu layanan Copernicus Data Space atau Earth Engine; pemilihan tanggal bukan bukti citra tersedia. Data 2027–2028 belum bisa dianggap sebagai observasi aktual sebelum satelit merekam dan produk dipublikasikan. Hotspot adalah anomali termal, bukan konfirmasi kebakaran.
