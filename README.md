# Slider AI

Slider AI adalah platform AI Workspace modern (chat, agen, knowledge base/RAG, dokumen, workspace) berbasis Next.js.

## Tech Stack

- **Framework**: Next.js 15.5 (App Router, `output: standalone`)
- **Language**: TypeScript 5
- **UI**: React 18, Tailwind CSS 3, PostCSS/Autoprefixer, Framer Motion
- **Database**: PostgreSQL + pgvector
- **ORM**: Prisma 5
- **Auth**: NextAuth.js v4 (Credentials, JWT) — endpoint `/api/auth/*`, halaman masuk `/signin`
- **AI**: OpenAI SDK (`openai`)
- **Storage**: S3-compatible (MinIO/S3) via AWS SDK
- **Cache**: Redis
- **Runtime**: Node.js >= 20.9
- **Deployment**: Docker / Docker Compose

## Prasyarat

- Node.js >= 20.9, npm
- PostgreSQL dengan ekstensi `pgvector`, Redis, dan storage S3-compatible (MinIO) — atau gunakan Docker Desktop
- (Opsional) XAMPP **tidak menggantikan** Postgres+pgvector/Redis/Node; bisa dipakai terpisah, tapi stack ini butuh layanan di atas.

## Konfigurasi Environment

Salin contoh env dan isi nilai yang sesuai (file `.env` **gitignored**, jangan commit secret):

```bash
cp .env.example .env
```

Variabel utama (`.env.example`): `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `DATABASE_URL`, `OPENAI_API_KEY`, `REDIS_URL`, `ENCRYPTION_KEY`, `S3_*`. Untuk dev lokal dengan infra di `localhost`, nilai default contoh sudah sesuai; ganti `NEXTAUTH_SECRET`/`ENCRYPTION_KEY` dan isi `OPENAI_API_KEY`.

## Setup Development (lokal)

```bash
npm install
npm run db:generate          # prisma generate (juga jalan via postinstall)
npx prisma migrate deploy    # atau: npm run db:migrate
npm run dev                  # http://localhost:3000
```

Jika `prisma generate` gagal `EPERM` di Windows, tutup proses yang mengunci `query_engine-windows.dll.node` lalu jalankan ulang.

## Production Build

```bash
npm run build
npm start                    # atau jalankan output standalone sesuai deployment
```

## Docker (Docker Desktop)

`docker-compose.yml` menyediakan `nextjs`, `postgres` (pgvector), `redis`, `minio`.

```bash
# infra saja (Next.js jalan lokal)
docker compose up -d postgres redis minio

# atau full stack
docker compose up -d --build
docker compose exec nextjs npx prisma migrate deploy
```

Pastikan env/port sesuai mode yang dipakai. Workflow CI/CD: `.github/workflows/deploy.yml` (deploy ke VPS saat push ke `main`).

## Struktur

```
src/app/        - App Router (pages & API routes)
src/components/ - UI/fitur (chat, dashboard, agents, documents, layout)
src/lib/        - auth, database, ai, rag, memory, tools, storage
src/types/      - TypeScript (termasuk augmentasi NextAuth)
prisma/         - schema & migrations
docs/           - arsitektur/flow/panduan
```

## Catatan

- Halaman masuk: `/signin`. Lindungi secret; rotasi key jika pernah terekspos.
- Jangan commit `.env` atau API key.

## License

MIT