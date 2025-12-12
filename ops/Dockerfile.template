# MatchTalk Dockerfile şablonu
# Bu dosya, Dockerfile silinirse hızlıca geri yüklemek için tutulur.
# İçeriği ihtiyacınıza göre düzenleyin ve ops/restore-dockerfile.ps1
# çalıştırıldığında kökteki Dockerfile'ı bu şablondan üretir.

# Örnek backend build (Node 18 + TypeScript için)
# Gerektiğinde portu, build komutlarını ve yolları güncelleyin.
FROM node:18-alpine AS deps
WORKDIR /app

# Paket dosyalarını kopyalayın (backend/package.json mevcut olmalı)
COPY backend/package*.json ./
RUN npm ci --ignore-scripts

FROM node:18-alpine AS builder
WORKDIR /app
COPY backend ./
RUN npm install
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules

# Uygulama portu (gerekirse değiştirin)
EXPOSE 3000

# Başlatma komutu (dist/index.js mevcut olduğundan emin olun)
CMD ["node", "dist/index.js"]


