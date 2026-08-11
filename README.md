# Surabaya Cafe API

REST API & JSON dataset berisi **1.084 cafe aktif terverifikasi di Google Maps** se-Surabaya. Setiap data melalui verifikasi otomatis — cafe bertanda "Permanently closed" otomatis dieliminasi.

## Live

| | URL |
|---|---|
| Dashboard | [`https://surabaya-cafe-api.vercel.app`](https://surabaya-cafe-api.vercel.app) |
| API (JSON) | `https://surabaya-cafe-api.vercel.app/api/cafes` |
| Download JSON | `https://surabaya-cafe-api.vercel.app/api/export/json` |
| Download CSV | `https://surabaya-cafe-api.vercel.app/api/export/csv` |

> Ganti `surabaya-cafe-api` dengan nama project Vercel Anda setelah deploy.

## Cara Pakai

### Langsung dari URL (tanpa install)

```javascript
// Ambil semua cafe
const res = await fetch('https://surabaya-cafe-api.vercel.app/api/cafes');
const cafes = await res.json();
console.log(`${cafes.length} cafe aktif di Surabaya`);

// Filter per wilayah
const timur = await fetch('https://surabaya-cafe-api.vercel.app/api/cafes?area=Surabaya%20Timur');

// Cari cafe
const hasil = await fetch('https://surabaya-cafe-api.vercel.app/api/cafes/search?q=kopi%20tuku');
```

```bash
curl https://surabaya-cafe-api.vercel.app/api/cafes
curl "https://surabaya-cafe-api.vercel.app/api/cafes?area=Surabaya%20Barat&sort=name_asc"
```

### Jalankan Server Lokal

```bash
git clone https://github.com/<USERNAME>/<REPO>.git
cd <REPO>
npm install
npm start
```

Buka `http://localhost:3000` untuk dashboard, `http://localhost:3000/api/cafes` untuk API.

## Endpoint

| Method | Path | Fungsi |
|--------|------|--------|
| `GET` | `/api/cafes` | Semua cafe + filter (`?area=`, `?search=`, `?category=`, `?facility=`, `?tag=`, `?sort=`, `?limit=&page=`) |
| `GET` | `/api/cafes/search?q=` | Pencarian cepat |
| `GET` | `/api/cafes/:id` | Detail by ID atau nama |
| `GET` | `/api/areas` | Daftar wilayah + jumlah |
| `GET` | `/api/tags` | Daftar kebutuhan (wfc, meeting, santai) |
| `GET` | `/api/facilities` | Daftar fasilitas (wifi, ac, dll) |
| `GET` | `/api/stats` | Statistik dataset |
| `GET` | `/api/export/json` | Download JSON |
| `GET` | `/api/export/csv` | Download CSV |

## Struktur Data

```json
{
  "id": 1581536321,
  "name": "Sedulur Tunggal Kopi",
  "map_title": "Sedulur Tunggal Kopi, Surabaya Barat",
  "category": "Coffee Shop",
  "area": "Surabaya Barat",
  "address": "Jl. Mayjen HR. Muhammad No.246, Surabaya",
  "latitude": -7.2833562,
  "longitude": 112.6997967,
  "price_range": "Rp 50-150 rb",
  "opening_hours": "24/7",
  "verified": true,
  "gmaps_status": "Operational",
  "gmaps_url": "https://www.google.com/maps/place/...",
  "gmaps_rating": 4.5,
  "gmaps_review_count": 128
}
```

| Field | Keterangan |
|-------|------------|
| `verified` | `true` = terverifikasi ada di Google Maps |
| `gmaps_status` | `"Operational"` atau `"Temporarily closed"` |
| `gmaps_url` | Tautan langsung ke Google Maps |
| `area` | Surabaya Pusat / Timur / Barat / Selatan / Utara |

## Deploy ke Vercel

```bash
npm i -g vercel
vercel login
vercel          # ikuti prompt, pilih project
vercel --prod   # deploy ke production
```

Dashboard akan tersedia di URL Vercel, API di `/api/*`.

## Update Data

```bash
npm run pipeline   # harvest OSM → verify Google Maps → cafes.json
git add data/cafes.json && git commit -m "update data" && git push
```

## Lisensi

MIT License — bebas dipakai untuk proyek apapun.
