# Surabaya Cafe API

REST API publik berisi data cafe aktif di seluruh Surabaya, diambil dari Google Maps dan diverifikasi secara otomatis.

## Tentang

Surabaya Cafe API menyediakan **874 cafe aktif** yang tersebar di 5 wilayah kota. Setiap entri telah melalui verifikasi terhadap Google Maps — cafe bertanda *Permanently closed* otomatis tidak ada di dataset ini. Sementara cafe *Temporarily closed* tetap dipertahankan dengan penanda status.

API ini dirancang untuk kebutuhan:

- **Proyek tugas kuliah** — mahasiswa TI, Sistem Informasi, atau Desain yang membutuhkan data lokasi cafe untuk proyek mobile/web (Cafe Finder, rekomendasi tempat, analisis spasial, dll.)
- **Proyek komersial** — startup, UMKM, atau pengembang aplikasi yang membutuhkan dataset cafe Surabaya tanpa perlu mengumpulkan data sendiri dari nol
- **Penelitian** — analisis distribusi, pola usaha kuliner, atau studi urban di kawasan Surabaya

## Latar Belakang

Mengumpulkan data cafe secara manual dari Google Maps memakan waktu dan rentan error — belum lagi harus memastikan setiap cafe masih buka. Bot scraper yang ada sering mengambil data cafe yang sudah tutup permanen atau bahkan tidak ada di Google Maps sama sekali.

API ini menyelesaikan masalah itu dengan pipeline otomatis: data diambil dari OpenStreetMap (Overpass API), lalu diverifikasi satu per satu menggunakan headless browser di Google Maps. Hasilnya adalah dataset bersih yang hanya berisi cafe benar-benar aktif.

## Endpoint

| Method | Path | Deskripsi |
|--------|------|-----------|
| `GET` | `/api/cafes` | Semua cafe. Parameter: `?area=`, `?search=`, `?category=`, `?facility=`, `?tag=`, `?sort=`, `?limit=&page=` |
| `GET` | `/api/cafes/search?q=` | Pencarian cepat berdasarkan nama, alamat, atau deskripsi |
| `GET` | `/api/cafes/:id` | Detail satu cafe berdasarkan ID atau nama |
| `GET` | `/api/areas` | Daftar wilayah beserta jumlah cafe di masing-masing |
| `GET` | `/api/tags` | Daftar kebutuhan (wfc, meeting, santai, dll) |
| `GET` | `/api/facilities` | Daftar fasilitas (wifi, ac, parkir, dll) |
| `GET` | `/api/stats` | Statistik dataset |
| `GET` | `/api/export/json` | Download seluruh data dalam format JSON |
| `GET` | `/api/export/csv` | Download seluruh data dalam format CSV |

## Struktur Data

Setiap cafe memiliki 20 field. Berikut contoh dan penjelasan masing-masing:

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
  "data_confidence": "Medium (80%)",
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
| `name` | String | Nama cafe |
| `map_title` | String | Judul di Google Maps |
| `category` | String | Jenis (Coffee Shop, Cafe, Restaurant) |
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

## Akses

### Via API (langsung)

```
https://<nama-project>.vercel.app/api/cafes
https://<nama-project>.vercel.app/api/cafes?area=Surabaya%20Timur
https://<nama-project>.vercel.app/api/cafes/search?q=kopi%20tuku
```

### Via Dashboard

Buka root URL untuk melihat dokumentasi interaktif lengkap dengan contoh kode, daftar endpoint, dan data real-time.

### Download Dataset

- [JSON](https://surabaya-cafe-api.vercel.app/api/export/json)
- [CSV](https://surabaya-cafe-api.vercel.app/api/export/csv)

## Lisensi

MIT License — bebas digunakan untuk proyek pribadi, tugas kuliah, maupun komersial tanpa dipungut biaya.
