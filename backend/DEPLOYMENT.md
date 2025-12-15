# MatchTalk Backend - Deployment Guide

Bu dokümantasyon, MatchTalk backend uygulamasını production ortamına deploy etmek için gerekli adımları içerir.

## İçindekiler

1. [Gereksinimler](#gereksinimler)
2. [Hazırlık](#hazırlık)
3. [Environment Variables](#environment-variables)
4. [PM2 Configuration](#pm2-configuration)
5. [Deployment Scripts](#deployment-scripts)
6. [Manuel Deployment](#manuel-deployment)
7. [Monitoring](#monitoring)
8. [Troubleshooting](#troubleshooting)

## Gereksinimler

### Sistem Gereksinimleri

- **Node.js**: 20.x veya üzeri
- **PostgreSQL**: 14.x veya üzeri
- **Redis**: 6.x veya üzeri
- **PM2**: Global olarak yüklü (`npm install -g pm2`)
- **Git**: Kod repository'sine erişim için

### Yazılım Bağımlılıkları

- PostgreSQL veritabanı (production)
- Redis server (production)
- SMTP server (email gönderimi için)
- AWS S3 veya local storage (file uploads için)

## Hazırlık

### 1. Server Setup

Production server'ınızda aşağıdaki servislerin çalıştığından emin olun:

```bash
# PostgreSQL
sudo systemctl status postgresql

# Redis
sudo systemctl status redis
```

### 2. Repository Clone

```bash
git clone <repository-url>
cd matchtalk/backend
```

### 3. PM2 Installation

```bash
npm install -g pm2
```

## Environment Variables

### 1. Environment Dosyası Oluşturma

`.env.production.example` dosyasını kopyalayarak `.env.production` dosyası oluşturun:

```bash
cp .env.production.example .env.production
```

### 2. Environment Variables Ayarlama

`.env.production` dosyasını düzenleyin ve tüm `CHANGE_ME` değerlerini gerçek değerlerle değiştirin:

```bash
nano .env.production
```

**Önemli Değişkenler:**

- `DATABASE_URL`: Production PostgreSQL connection string
- `JWT_SECRET`: Güçlü bir random string (en az 32 karakter)
- `REDIS_URL`: Production Redis connection string
- `CORS_ORIGINS`: Production frontend URL'leri
- `SMTP_*`: Email servisi bilgileri
- `AWS_*`: S3 storage bilgileri (eğer S3 kullanıyorsanız)

### 3. Environment Variables Doğrulama

```bash
# Gerekli değişkenlerin ayarlandığını kontrol edin
node -e "require('dotenv').config({path: '.env.production'}); console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');"
```

## PM2 Configuration

### 1. Ecosystem Config

`ecosystem.config.js` dosyası PM2 için yapılandırma içerir. Production için özelleştirebilirsiniz:

```javascript
module.exports = {
  apps: [{
    name: 'matchtalk-backend',
    script: './dist/index.js',
    instances: 'max', // Tüm CPU'ları kullan
    exec_mode: 'cluster',
    env_production: {
      NODE_ENV: 'production',
      PORT: 4000,
    },
    // ...
  }]
};
```

### 2. PM2 ile Başlatma

```bash
# Production environment ile başlat
pm2 start ecosystem.config.js --env production

# Veya npm script kullan
npm run pm2:start:prod
```

## Deployment Scripts

### Linux/macOS (Bash)

```bash
# Production deployment
./scripts/deploy.sh production

# Veya npm script kullan
npm run deploy:prod
```

### Windows (PowerShell)

```powershell
# Production deployment
.\scripts\deploy.ps1 production

# Veya npm script kullan
npm run deploy:win:prod
```

### Deployment Script Özellikleri

Deployment script'i aşağıdaki adımları otomatik olarak gerçekleştirir:

1. ✅ Pre-deployment checks (Node.js, PM2, environment variables)
2. ✅ Dependency installation (`npm ci --omit=dev`)
3. ✅ Prisma Client generation
4. ✅ Database migrations (opsiyonel)
5. ✅ Application build (`npm run build`)
6. ✅ Health check (mevcut instance)
7. ✅ PM2 reload/start (zero-downtime)
8. ✅ Post-deployment health check

## Manuel Deployment

Eğer deployment script kullanmak istemiyorsanız, aşağıdaki adımları manuel olarak takip edebilirsiniz:

### 1. Dependencies Install

```bash
npm ci --omit=dev --ignore-scripts
```

### 2. Prisma Client Generate

```bash
npx prisma generate
```

### 3. Database Migrations

```bash
npx prisma migrate deploy
```

### 4. Build Application

```bash
npm run build
```

### 5. PM2 Start/Reload

```bash
# İlk kez başlatıyorsanız
pm2 start ecosystem.config.js --env production

# Mevcut instance'ı reload etmek için (zero-downtime)
pm2 reload ecosystem.config.js --env production
```

### 6. Save PM2 Configuration

```bash
pm2 save
pm2 startup  # System startup'ta otomatik başlatma için
```

## Monitoring

### PM2 Commands

```bash
# Status kontrolü
pm2 status
npm run pm2:status

# Logs görüntüleme
pm2 logs matchtalk-backend
npm run pm2:logs

# Real-time monitoring
pm2 monit
npm run pm2:monit

# Process bilgileri
pm2 describe matchtalk-backend

# Restart
pm2 restart matchtalk-backend
npm run pm2:restart

# Reload (zero-downtime)
pm2 reload matchtalk-backend
npm run pm2:reload
```

### Health Check

```bash
# Health endpoint kontrolü
curl http://localhost:4000/health

# Veya browser'da
http://localhost:4000/health
```

### Metrics Endpoint

```bash
# Metrics görüntüleme (admin only)
curl http://localhost:4000/metrics
```

## Troubleshooting

### 1. Application Başlamıyor

```bash
# PM2 logs kontrol et
pm2 logs matchtalk-backend --lines 100

# Environment variables kontrol et
pm2 env 0

# Process bilgileri
pm2 describe matchtalk-backend
```

### 2. Database Connection Error

- `.env.production` dosyasında `DATABASE_URL` doğru mu kontrol edin
- PostgreSQL servisinin çalıştığından emin olun
- Firewall kurallarını kontrol edin

### 3. Redis Connection Error

- `.env.production` dosyasında `REDIS_URL` doğru mu kontrol edin
- Redis servisinin çalıştığından emin olun
- Redis authentication gerekiyorsa connection string'e ekleyin

### 4. Memory Issues

```bash
# Memory kullanımını kontrol et
pm2 monit

# Memory limit artır (ecosystem.config.js)
node_args: '--max-old-space-size=4096'  # 4GB
```

### 5. Port Already in Use

```bash
# Port kullanımını kontrol et
lsof -i :4000  # Linux/macOS
netstat -ano | findstr :4000  # Windows

# PM2'de port değiştir
pm2 restart matchtalk-backend --update-env -- PORT=4001
```

### 6. Zero-Downtime Deployment Sorunları

```bash
# Graceful reload yerine restart kullan
pm2 restart matchtalk-backend

# Veya stop/start
pm2 stop matchtalk-backend
pm2 start ecosystem.config.js --env production
```

## Best Practices

1. **Environment Variables**: Asla `.env.production` dosyasını git'e commit etmeyin
2. **Backup**: Deployment öncesi database backup alın
3. **Testing**: Production'a deploy etmeden önce staging ortamında test edin
4. **Monitoring**: PM2 monit ve logs'u düzenli olarak kontrol edin
5. **Health Checks**: Deployment sonrası health check yapın
6. **Rollback Plan**: Sorun durumunda rollback planınız olsun

## Rollback

Eğer deployment'ta sorun çıkarsa:

```bash
# Önceki versiyona dön
git checkout <previous-commit>
npm ci --omit=dev
npm run build
pm2 reload ecosystem.config.js --env production
```

## Additional Resources

- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Prisma Migrations](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Node.js Production Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)


