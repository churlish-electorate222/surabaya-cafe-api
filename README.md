# Surabaya Cafe API

**REST API** publik berisi data cafe aktif di **Surabaya**, diambil dari Google Maps dan diverifikasi secara otomatis. Dataset gratis ini cocok untuk **tugas kuliah**, **proyek komersial**, dan riset tentang kafe di kota Surabaya.

## Tentang API Cafe Surabaya ini

Surabaya Cafe API menyediakan **874 cafe aktif** yang tersebar di 5 wilayah kota Surabaya: Pusat, Timur, Barat, Selatan, dan Utara. Setiap entri telah diverifikasi terhadap Google Maps cafe bertanda *Permanently closed* otomatis tidak ada di dataset ini. Sementara cafe *Temporarily closed* tetap dipertahankan dengan penanda status.

### Siapa yang membutuhkan REST API ini?

- **Tugas kuliah** — mahasiswa TI, Sistem Informasi, atau Desain grafis yang membutuhkan data lokasi cafe untuk proyek mobile/web (Cafe Finder, rekomendasi tempat nongkrong, analisis spasial, dll.)
- **Proyek komersial** — startup, UMKM, atau pengembang aplikasi yang membutuhkan dataset cafe Surabaya tanpa perlu mengumpulkan data sendiri dari nol
- **Riset & analisis** — distribusi coffee shop di Surabaya, pola usaha kuliner, atau studi urban

## Latar Belakang

Mengumpulkan data cafe secara manual dari Google Maps memakan waktu dan rentan error, belum lagi harus memastikan setiap cafe masih buka. Bot scraper yang ada sering mengambil data cafe yang sudah tutup permanen atau bahkan tidak ada di Google Maps sama sekali.

API ini menyelesaikan masalah itu dengan pipeline otomatis: data diambil dari OpenStreetMap (Overpass API), lalu diverifikasi satu per satu menggunakan headless browser di Google Maps. Hasilnya adalah dataset bersih yang hanya berisi cafe benar-benar aktif di kota Surabaya.

## Fitur

- **874 cafe terverifikasi** — semua data cafe aktif di Surabaya, diverifikasi via Google Maps
- **5 wilayah** — Pusat, Timur, Barat, Selatan, Utara
- **Koordinat GPS** — latitude & longitude presisi, cocok untuk mapping & visualisasi
- **Rating & review** — data dari Google Maps langsung
- **Filter lengkap** — cari berdasarkan wilayah, kategori, fasilitas, kebutuhan (wfc, meeting, santai)
- **Export JSON & CSV** — download langsung tanpa registrasi
- **Gratis & terbuka** — MIT License, tanpa API key, tanpa batasan

## Endpoint REST API

| Method | Path | Deskripsi |
|--------|------|-----------|
| `GET` | `/api/cafes` | Semua cafe. Parameter: `?area=`, `?search=`, `?category=`, `?facility=`, `?tag=`, `?sort=`, `?limit=&page=` |
| `GET` | `/api/cafes/search?q=` | Pencarian cepat berdasarkan nama, alamat, atau deskripsi |
| `GET` | `/api/cafes/:id` | Detail satu cafe berdasarkan ID atau nama |
| `GET` | `/api/areas` | Daftar wilayah beserta jumlah cafe di masing-masing |
| `GET` | `/api/tags` | Daftar kebutuhan (wfc, meeting, santai, dll) |
| `GET` | `/api/facilities` | Daftar fasilitas (wifi, ac, parkir, dll) |
| `GET` | `/api/stats` | Statistik dataset |
| `GET` | `/api/export/json` | Download data cafe dalam format JSON |
| `GET` | `/api/export/csv` | Download data cafe dalam format CSV |

## Struktur Data

Setiap cafe memiliki 20 field. Berikut contoh:

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
  "facilities": ["wifi", "colokan", "ac"],
  "needs_tags": ["wfc", "santai"],
  "instagram": "excelsocoffee",
  "whatsapp": "6281234567890",
  "verified": true,
  "gmaps_status": "Operational",
  "gmaps_url": "https://www.google.com/maps/place/...",
  "gmaps_rating": 4.5,
  "gmaps_review_count": 128,
  "last_verified_at": "2025-07-11T12:00:00.000Z"
}
```

| Field | Tipe | Keterangan |
|-------|------|------------|
| `id` | Number | ID unik (hash dari nama + koordinat) |
| `name` | String | Nama cafe / coffee shop |
| `map_title` | String | Judul di Google Maps |
| `category` | String | Jenis: Coffee Shop, Cafe, Restaurant |
| `area` | String | Wilayah: Surabaya Pusat / Timur / Barat / Selatan / Utara |
| `address` | String | Alamat lengkap |
| `latitude` / `longitude` | Number | Koordinat GPS |
| `price_range` | String | Rentang harga per orang |
| `opening_hours` | String | Jam operasional |
| `facilities` | Array | Fasilitas: wifi, ac, colokan, outdoor, parkir |
| `needs_tags` | Array | Tag kebutuhan: wfc, meeting, santai, estetik |
| `instagram` | String | Akun Instagram |
| `whatsapp` | String | Nomor WhatsApp |
| `verified` | Boolean | Terverifikasi ada di Google Maps |
| `gmaps_status` | String | `Operational` atau `Temporarily closed` |
| `gmaps_url` | String | Tautan langsung ke Google Maps |
| `gmaps_rating` | Number | Rating Google Maps (0-5) |
| `gmaps_review_count` | Number | Jumlah review di Google Maps |
| `last_verified_at` | String | Terakhir diverifikasi (ISO 8601) |

### Field penting untuk pengecekan keabsahan

- `verified` — `true` berarti cafe sudah diverifikasi ada dan buka di Google Maps
- `gmaps_status` — `Operational` (buka normal) atau `Temporarily closed` (tutup sementara, bukan permanen)
- `gmaps_url` — tautan langsung ke lokasi di Google Maps, bisa dipakai untuk verifikasi manual

## Akses API

### Via URL langsung (tanpa install)

```
https://surabaya-cafe-api.vercel.app/api/cafes
https://surabaya-cafe-api.vercel.app/api/cafes?area=Surabaya%20Timur
https://surabaya-cafe-api.vercel.app/api/cafes/search?q=kopi%20tuku
```

### Download dataset

- [JSON](https://surabaya-cafe-api.vercel.app/api/export/json)
- [CSV](https://surabaya-cafe-api.vercel.app/api/export/csv)

### Jalankan sendiri

```bash
git clone https://github.com/Reyhandhani/surabaya-cafe-api.git
cd surabaya-cafe-api
npm install
npm start
```

Dashboard tersedia di `http://localhost:3000`, API di `http://localhost:3000/api/cafes`.

## Author

Created by [Reyhandhani](https://github.com/Reyhandhani).

## Lisensi

MIT License — bebas digunakan untuk tugas kuliah, proyek pribadi, maupun komersial tanpa dipungut biaya.
