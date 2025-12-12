# Frontend/Backend Prod Benzeri Akış Onarımı

## Amaç

Kayıt/giriş/oda/timer akışları web arayüzünde çalışsın; API ve websocket bağlantısı sorunsuz olsun.

## Adımlar

1) Durum doğrulama

- Backend env/.env kontrolü, Postgres+Redis compose, `npm run dev` veya prod `npm run start`.
- `/health` 200 doğrula.
2) API akış testi (manuel/curl)
- `/auth/register`, `/auth/login` çağrılarını benzersiz e-postayla çalıştır; token döndüğünü doğrula.
- Başarısız istek varsa loglarını al.
3) Frontend/WS yapılandırması
- `API_BASE_URL` ve `WS_BASE_URL` varsayılan (http://localhost:4000) ile çalışıyor mu kontrol et; gerekirse `.env` veya build-time tanım ekle.
- Websocket client’ta bağlanma ve emit sırası: oturum açınca bağlan, bağlanmadan emit etme; hataları kullanıcıyı düşürmeyecek şekilde yönet.
4) UI akış testi (dev server)
- `npm run dev` ile web; kayıt/giriş/oda oluşturma ve timer olaylarını dene.
- Sorunlu noktaları tespit et, gerekli kod düzeltmesini uygula.
5) Prod benzeri doğrulama
- `npm run build` (frontend) + `backend npm run build && npm run start`; backend’in `frontend-dist`’i statik sunabildiğini doğrula.
6) Son dokümantasyon
- README veya kısa not: çalıştırma komutları, env ayarları, bilinen uyarılar (bundle size).