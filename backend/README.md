# MatchTalk Backend

MatchTalk, gerçek zamanlı sesli sohbet odaları için backend API servisidir. Kullanıcıların eşleşmesini sağlar, odalar oluşturur ve yönetir, WebSocket üzerinden gerçek zamanlı iletişim sağlar.

## 📋 İçindekiler

- [Özellikler](#özellikler)
- [Gereksinimler](#gereksinimler)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [API Dokümantasyonu](#api-dokümantasyonu)
- [Mimari](#mimari)
- [Deployment](#deployment)
- [Geliştirme](#geliştirme)
- [Test](#test)
- [Katkıda Bulunma](#katkıda-bulunma)

## ✨ Özellikler

### Temel Özellikler
- 🔐 **Authentication & Authorization**: JWT tabanlı kimlik doğrulama
- 👥 **User Management**: Kullanıcı profilleri, rozetler, XP sistemi
- 🎯 **Matching System**: 8 kişilik eşleştirme algoritması
- 🏠 **Room Management**: Oda oluşturma, katılma, yönetme
- ⏱️ **Timer System**: Otomatik oda zamanlayıcı
- 🗳️ **Voting System**: Oda uzatma oylaması
- 👫 **Friends System**: Arkadaş ekleme ve yönetme
- 📧 **Invites**: Oda davetleri
- 🔔 **Notifications**: Gerçek zamanlı bildirimler

### Gelişmiş Özellikler
- 📊 **Analytics**: Event tracking ve istatistikler
- 📧 **Email Service**: SMTP ile email gönderimi
- 🔄 **Background Jobs**: BullMQ ile asenkron iş işleme
- ⏰ **Scheduled Tasks**: Cron job'lar ile otomatik görevler
- 🛡️ **Admin API**: Kullanıcı ve sistem yönetimi
- 📈 **Metrics**: Request/response metrikleri
- 🗜️ **Compression**: Response compression
- 🔒 **Security**: Rate limiting, CORS, Helmet
- 📝 **API Versioning**: API versiyonlama desteği

## 🛠️ Gereksinimler

- **Node.js**: 20.x veya üzeri
- **PostgreSQL**: 14.x veya üzeri
- **Redis**: 6.x veya üzeri
- **npm**: 9.x veya üzeri

## 🚀 Kurulum

### 1. Repository'yi Klonlayın

```bash
git clone <repository-url>
cd matchtalk/backend
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Environment Variables Ayarlayın

`.env.example` dosyasını kopyalayarak `.env` dosyası oluşturun:

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin ve gerekli değişkenleri ayarlayın:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/matchtalk
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key-here
```

### 4. Veritabanını Hazırlayın

```bash
# Prisma Client'ı oluştur
npm run prisma:generate

# Migration'ları çalıştır
npm run prisma:migrate
```

### 5. Uygulamayı Başlatın

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm start
```

Uygulama varsayılan olarak `http://localhost:4000` adresinde çalışacaktır.

## 📖 Kullanım

### API Endpoints

Temel API endpoint'leri:

- `GET /health` - Health check
- `POST /api/v1/auth/register` - Kullanıcı kaydı
- `POST /api/v1/auth/login` - Kullanıcı girişi
- `GET /api/v1/rooms` - Aktif odaları listele
- `POST /api/v1/rooms` - Yeni oda oluştur

Detaylı API dokümantasyonu için [API.md](./docs/API.md) dosyasına bakın.

### WebSocket

WebSocket bağlantısı için:

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000', {
  auth: {
    token: 'your-jwt-token'
  }
});

socket.on('connect', () => {
  console.log('Connected to server');
});
```

### API Dokümantasyonu

Swagger UI ile interaktif API dokümantasyonu:

```
http://localhost:4000/api-docs
```

## 🏗️ Mimari

Proje yapısı:

```
backend/
├── src/
│   ├── routes/          # API route'ları
│   ├── services/        # Business logic
│   ├── middleware/      # Express middleware'ler
│   ├── schemas/         # Zod validation schemas
│   ├── jobs/            # Background jobs
│   ├── websocket/       # WebSocket handlers
│   ├── templates/       # Email templates
│   └── lib/             # Utilities
├── prisma/              # Prisma schema ve migrations
├── scripts/             # Deployment scripts
└── docs/                # Dokümantasyon
```

Detaylı mimari dokümantasyonu için [ARCHITECTURE.md](./docs/ARCHITECTURE.md) dosyasına bakın.

## 🚢 Deployment

Production deployment için detaylı rehber:

- [Deployment Guide](./DEPLOYMENT.md)
- [CI/CD Pipeline](../.github/CICD.md)

### Hızlı Deployment

```bash
# PM2 ile production deployment
npm run deploy:prod
```

## 💻 Geliştirme

### Development Scripts

```bash
# Development server (hot reload)
npm run dev

# Build
npm run build

# Type check
npx tsc --noEmit

# Lint
npm run lint
npm run lint:fix

# Format
npm run format
npm run format:check
```

### Code Style

- **ESLint**: Code quality ve linting
- **Prettier**: Code formatting
- **TypeScript**: Type safety

### Git Workflow

1. Feature branch oluşturun: `git checkout -b feature/your-feature`
2. Değişikliklerinizi commit edin
3. Push edin: `git push origin feature/your-feature`
4. Pull Request oluşturun

## 🧪 Test

```bash
# Tüm testleri çalıştır
npm test

# Watch mode
npm run test:watch

# Coverage raporu
npm run test:coverage
```

Test coverage threshold: %50 minimum

## 📚 Dokümantasyon

- [API Documentation](./docs/API.md) - Detaylı API endpoint'leri
- [Architecture](./docs/ARCHITECTURE.md) - Sistem mimarisi
- [Deployment](./docs/DEPLOYMENT.md) - Production deployment rehberi
- [CI/CD](../.github/CICD.md) - CI/CD pipeline dokümantasyonu

## 🔧 Yapılandırma

### Environment Variables

| Variable | Açıklama | Gerekli | Varsayılan |
|----------|----------|---------|------------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ | - |
| `REDIS_URL` | Redis connection string | ❌ | `redis://localhost:6379` |
| `JWT_SECRET` | JWT secret key | ✅ | - |
| `JWT_EXPIRES_IN` | JWT expiration | ❌ | `7d` |
| `PORT` | Server port | ❌ | `4000` |
| `NODE_ENV` | Environment | ❌ | `development` |
| `CORS_ORIGINS` | CORS allowed origins | ❌ | - |
| `SMTP_HOST` | SMTP server host | ❌ | - |
| `SMTP_USER` | SMTP username | ❌ | - |
| `SMTP_PASS` | SMTP password | ❌ | - |

Tüm environment variables için `.env.example` dosyasına bakın.

## 🐛 Troubleshooting

### Veritabanı Bağlantı Sorunları

```bash
# PostgreSQL bağlantısını test et
psql $DATABASE_URL

# Prisma migration durumunu kontrol et
npx prisma migrate status
```

### Redis Bağlantı Sorunları

```bash
# Redis bağlantısını test et
redis-cli -u $REDIS_URL ping
```

### Port Kullanımda

```bash
# Port 4000'i kullanan process'i bul
lsof -i :4000  # macOS/Linux
netstat -ano | findstr :4000  # Windows
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

### Kod Standartları

- ESLint kurallarına uyun
- Prettier ile format edin
- Test yazın
- Dokümantasyon ekleyin

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Sorularınız için issue açabilir veya iletişime geçebilirsiniz.

## 🙏 Teşekkürler

MatchTalk projesine katkıda bulunan herkese teşekkürler!


