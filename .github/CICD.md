# CI/CD Pipeline Documentation

Bu dokümantasyon, MatchTalk backend için CI/CD pipeline yapılandırmasını açıklar.

## İçindekiler

1. [Genel Bakış](#genel-bakış)
2. [CI Workflow](#ci-workflow)
3. [CD Workflow](#cd-workflow)
4. [Security Scanning](#security-scanning)
5. [GitHub Secrets](#github-secrets)
6. [Troubleshooting](#troubleshooting)

## Genel Bakış

CI/CD pipeline'ı üç ana workflow'dan oluşur:

1. **CI Workflow** (`.github/workflows/ci.yml`): Her push ve PR'da çalışır
2. **CD Workflow** (`.github/workflows/cd.yml`): Main branch'e push edildiğinde çalışır
3. **Security Workflow** (`.github/workflows/security.yml`): Güvenlik taramaları için

## CI Workflow

### Tetikleyiciler

- `main` ve `develop` branch'lerine push
- `main` ve `develop` branch'lerine PR
- `backend/**` veya workflow dosyasında değişiklik

### Jobs

#### 1. Lint Check
- ESLint çalıştırır
- Prettier format kontrolü yapar
- Hata varsa build başarısız olur

#### 2. Type Check
- TypeScript type checking yapar
- `tsc --noEmit` komutu çalıştırılır

#### 3. Test
- Jest testleri çalıştırılır
- PostgreSQL ve Redis servisleri başlatılır
- Coverage raporu oluşturulur
- Coverage threshold kontrolü yapılır (minimum %50)
- Codecov'a coverage yüklenir

#### 4. Build Check
- TypeScript build kontrolü yapar
- `dist/` klasörünün oluşturulduğunu doğrular

#### 5. Security Scan
- `npm audit` çalıştırılır
- Snyk security scan (opsiyonel, token gerekli)

### Coverage Threshold

Minimum coverage gereksinimleri:
- Branches: %50
- Functions: %50
- Lines: %50
- Statements: %50

## CD Workflow

### Tetikleyiciler

- `main` branch'e push
- Version tag'leri (`v*`)
- Manuel workflow dispatch

### Jobs

#### 1. Build and Push Docker Image
- Docker image oluşturulur
- GitHub Container Registry'ye push edilir
- Multi-platform build (linux/amd64, linux/arm64)
- Build cache kullanılır

#### 2. Deploy to Staging
- `main` branch'e push edildiğinde otomatik çalışır
- Staging server'a SSH ile bağlanır
- Git pull, build, PM2 reload yapar
- Health check yapar

#### 3. Deploy to Production
- `main` branch'e push veya version tag'inde çalışır
- Manuel olarak da tetiklenebilir
- Production server'a deploy eder
- Database migration çalıştırır
- Slack notification gönderir (opsiyonel)

## Security Scanning

### Dependency Review
- PR'larda otomatik çalışır
- Yeni dependency'lerin güvenlik açıklarını kontrol eder

### NPM Audit
- Dependency vulnerability taraması
- Moderate ve üzeri seviyelerde uyarı verir

### Snyk Security Scan
- Gelişmiş güvenlik taraması
- `SNYK_TOKEN` secret'ı gerekli
- GitHub Code Scanning'e sonuçlar yüklenir

### CodeQL Analysis
- Kod tabanlı güvenlik analizi
- JavaScript/TypeScript için özelleştirilmiş

## GitHub Secrets

Aşağıdaki secret'ları GitHub repository settings'te tanımlamanız gerekir:

### CI/CD için
- `SNYK_TOKEN`: Snyk API token (opsiyonel)

### Deployment için
- `STAGING_SSH_PRIVATE_KEY`: Staging server SSH private key
- `STAGING_SSH_USER`: Staging server SSH kullanıcı adı
- `STAGING_SSH_HOST`: Staging server hostname/IP
- `PRODUCTION_SSH_PRIVATE_KEY`: Production server SSH private key
- `PRODUCTION_SSH_USER`: Production server SSH kullanıcı adı
- `PRODUCTION_SSH_HOST`: Production server hostname/IP

### Notifications için
- `SLACK_WEBHOOK_URL`: Slack webhook URL (opsiyonel)

### Secret'ları Ekleme

1. GitHub repository'ye gidin
2. Settings > Secrets and variables > Actions
3. "New repository secret" butonuna tıklayın
4. Secret adı ve değerini girin
5. "Add secret" butonuna tıklayın

## Workflow Yapılandırması

### Environment Variables

Workflow'larda kullanılan environment variables:

```yaml
env:
  NODE_VERSION: '20.x'
  WORKING_DIRECTORY: ./backend
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}/backend
```

### Matrix Strategy

Test job'ları için matrix strategy kullanılabilir:

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x]
```

### Caching

NPM cache kullanımı:

```yaml
- uses: actions/setup-node@v4
  with:
    cache: 'npm'
    cache-dependency-path: ./backend/package-lock.json
```

## Troubleshooting

### CI Başarısız Oluyor

1. **Lint hataları**: `npm run lint:fix` çalıştırın
2. **Type errors**: TypeScript hatalarını düzeltin
3. **Test failures**: Test loglarını kontrol edin
4. **Coverage threshold**: Coverage'ı artırın veya threshold'u düşürün

### Build Başarısız Oluyor

1. **Docker build**: Dockerfile'ı kontrol edin
2. **Registry push**: GitHub token permissions kontrol edin
3. **Multi-platform**: Buildx cache'i temizleyin

### Deployment Başarısız Oluyor

1. **SSH connection**: SSH key'lerin doğru olduğundan emin olun
2. **Server access**: Server'ın erişilebilir olduğundan emin olun
3. **PM2 errors**: Server'da PM2 loglarını kontrol edin
4. **Health check**: Health endpoint'in çalıştığından emin olun

### Security Scan Sorunları

1. **Snyk token**: `SNYK_TOKEN` secret'ının ayarlandığından emin olun
2. **False positives**: Snyk sonuçlarını manuel olarak kontrol edin
3. **Dependency updates**: Güvenlik açıklarını düzeltmek için dependency'leri güncelleyin

## Best Practices

1. **Branch Protection**: Main branch için branch protection rules ekleyin
2. **Required Checks**: PR merge için CI checks'lerin geçmesini zorunlu kılın
3. **Code Review**: Tüm PR'lar için code review zorunlu tutun
4. **Automated Testing**: Her değişiklik için test çalıştırın
5. **Security First**: Güvenlik taramalarını düzenli olarak çalıştırın
6. **Monitoring**: Deployment sonrası monitoring yapın

## Notifications

### Slack Integration

Slack bildirimleri için:

1. Slack workspace'te bir webhook oluşturun
2. `SLACK_WEBHOOK_URL` secret'ını ekleyin
3. CD workflow'unda notification step'i aktif olacak

### Email Notifications

GitHub Actions varsayılan olarak email bildirimleri gönderir. Repository settings'ten yapılandırabilirsiniz.

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Buildx](https://docs.docker.com/buildx/)
- [Snyk Documentation](https://docs.snyk.io/)
- [CodeQL Documentation](https://codeql.github.com/docs/)


