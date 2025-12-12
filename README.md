# MatchTalk

Full-stack (React Native Web + Node/Express + Prisma/PostgreSQL + Redis) geliştirme ve prod çalıştırma rehberi.

## Ortam Değişkenleri
- Örnek dosya: `backend/.env.example`
- Üretimde gerçek değerleri `.env` olarak ekleyin (git’e koymayın):
  - `PORT=4000`
  - `DATABASE_URL=postgresql://matchtalk:matchtalk@localhost:5432/matchtalk`
  - `JWT_SECRET=<change-me>`
  - `JWT_EXPIRES_IN=7d`
  - `CORS_ORIGINS=http://localhost:3000,http://localhost:8081`

## Yerel Geliştirme
1) Bağımlılıklar  
   ```bash
   npm install          # frontend (kök)
   cd backend && npm install
   ```
2) Altyapı (Postgres + Redis)  
   ```bash
   cd backend
   docker compose up -d
   ```
3) Backend (dev)  
   ```bash
   cd backend
   npm run dev
   # Health: http://localhost:4000/health
   ```
4) Frontend (dev, web)  
   ```bash
   npm run dev
   # http://localhost:3000
   ```

## Prod Build ve Çalıştırma (yerel)
```bash
# frontend build (kök)
npm run build

# backend build + prod start
cd backend
npm run build
npm run start
# health: http://localhost:4000/health
```

## Docker (full-stack tek imaj)
```bash
# imajı üret
docker build -t matchtalk-app .

# çalıştır (env değerlerini geçerek)
docker run -p 4000:4000 \
  -e PORT=4000 \
  -e DATABASE_URL=postgresql://matchtalk:matchtalk@db:5432/matchtalk \
  -e JWT_SECRET=change-me \
  -e JWT_EXPIRES_IN=7d \
  -e CORS_ORIGINS=http://localhost:3000,http://localhost:8081 \
  matchtalk-app
```
Not: Postgres/Redis’i ayrı servisler olarak çalıştırmanız gerekir (ör. compose).

## Testler
```bash
cd backend
npm test -- --runInBand
```
Entegrasyon senaryoları auth/rooms/matching/health için eklenmiştir (`backend/__tests__/integration.test.ts`).

## Statik Build Sunumu
Backend prod derlemesi, varsa `frontend-dist` klasörünü statik olarak sunar (root `dist/` çıktısı container’da `/app/frontend-dist` altına kopyalanır). Prod Docker imajı bu kopyayı otomatik içerir. 

