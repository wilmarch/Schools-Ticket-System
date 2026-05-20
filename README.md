# School Ticket System

Aplikasi sistem tiket untuk pelaporan masalah fasilitas di lingkungan sekolah. Teacher dapat mengajukan tiket keluhan, dan Admin dapat mengelola serta memperbarui status tiket tersebut.

---

## 1. Project Overview

School Ticket System adalah aplikasi full stack sederhana yang memungkinkan:

- **Teacher** membuat tiket pelaporan masalah (judul, deskripsi, prioritas) dan memantau status tiket miliknya.
- **Admin** melihat seluruh tiket dari semua teacher dan mengubah status tiket (Submitted → Ongoing → Done).

Aplikasi ini menerapkan **role based access control**, di mana setiap role memiliki halaman dashboard dan hak akses API yang berbeda.

---

## 2. Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** SQLite (via Prisma ORM)
- **Autentikasi:** JSON Web Token (JWT)
- **Containerization:** Docker & Docker Compose

---

## 3. Setup Instructions

### Prasyarat
- Node.js 18+
- npm
- Docker & Docker Compose (opsional, untuk containerized deployment)

### Menjalankan Secara Lokal (Development)

```bash
# Clone repository
git clone https://github.com/wilmarch/Schools-Ticket-System.git
cd school-ticket-system

# Setup Backend
cd backend
npm install
npx prisma migrate dev --name init
npm run dev

# Setup Frontend
cd frontend
npm install
npm run dev
```

- Frontend berjalan di: `http://localhost:5173`
- Backend berjalan di: `http://localhost:5000`

### Menjalankan dengan Docker

```bash
cd school-ticket-system
docker compose up --build
```

- Frontend berjalan di: `http://localhost:5173`
- Backend berjalan di: `http://localhost:5000`

### Akun Login (Hardcoded)

| Email | Password | Role |
|---|---|---|
| admin@test.com | password123 | Admin |
| teacher1@test.com | password123 | Teacher |
| teacher2@test.com | password123 | Teacher |

---

## 4. Assumptions

Beberapa penyederhanaan dan asumsi yang dibuat dalam project ini:

1. **User di-hardcode** — Data user (email, password, role) disimpan langsung di kode backend sebagai array statis, bukan di database. Ini menyederhanakan flow registrasi dan manajemen user.

2. **Password disimpan plain-text** — Karena user di-hardcode dan ini hanya untuk keperluan demo/test, password tidak di-hash. Di production, harus menggunakan bcrypt.

3. **SQLite sebagai database** — Dipilih karena file-based tidak perlu setup database server terpisah. Cocok untuk demo, namun untuk production sebaiknya diganti PostgreSQL/MySQL.

4. **JWT disimpan di localStorage** — Untuk kesederhanaan. Di production, sebaiknya menggunakan httpOnly cookies untuk keamanan yang lebih baik terhadap XSS.

5. **Tidak ada fitur registrasi** — User baru hanya bisa ditambahkan melalui kode. Sesuai requirement yang memperbolehkan hardcoded users.
---

## 5. Improvements

Jika diberikan waktu lebih, berikut adalah peningkatan yang akan saya lakukan:

### Keamanan
- Implementasi hashing password dengan **bcrypt**
- Menyimpan JWT di **httpOnly cookie** alih-alih localStorage
- Menambahkan **rate limiting** pada endpoint login untuk mencegah brute force
- Input sanitization dan validasi yang lebih ketat dengan library seperti **Zod** atau **Joi**

### Fitur
- **Registrasi user** — Dengan form pendaftaran dan data user disimpan di database
- **Komentar pada tiket** — Memungkinkan komunikasi antara teacher dan admin di dalam tiket
- **Notifikasi real-time** — Menggunakan WebSocket/Socket.io untuk memberi tahu admin saat ada tiket baru, dan teacher saat status tiket berubah
- **Upload lampiran** — Teacher dapat melampirkan foto/file sebagai bukti masalah, dengan penyimpanan file di cloud storage seperti Cloudinary
- **Soft delete** — Tiket yang dihapus tidak benar-benar hilang dari database
- **Audit log** — Mencatat siapa yang mengubah status tiket dan kapan

### Arsitektur & Infrastruktur
- Migrasi database ke **PostgreSQL** untuk production
- Implementasi **unit test** dan **integration test** (Jest + Supertest untuk backend, React Testing Library untuk frontend)

### UI/UX
- **Toast notification** untuk feedback aksi yang lebih baik daripada alert()

---

## Lampiran Screenshot

Berikut adalah dokumen lampiran yang berisi screenshot dari aplikasi School Ticket System:
[Dokumen Screenshot UI/UX](https://docs.google.com/document/d/1keHaXhI5T2tG2hyf8OKvzJg61Tl1z31FYwKMJ6jgjnw/edit?usp=sharing)
