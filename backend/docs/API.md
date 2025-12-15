# MatchTalk Backend API Documentation

Bu dokümantasyon, MatchTalk backend API endpoint'lerini ve kullanımlarını açıklar.

## İçindekiler

1. [Genel Bilgiler](#genel-bilgiler)
2. [Authentication](#authentication)
3. [Users](#users)
4. [Rooms](#rooms)
5. [Matching](#matching)
6. [Friends](#friends)
7. [Invites](#invites)
8. [Notifications](#notifications)
9. [Badges](#badges)
10. [Stats](#stats)
11. [Admin](#admin)
12. [Analytics](#analytics)
13. [Error Codes](#error-codes)

## Genel Bilgiler

### Base URL

```
Development: http://localhost:4000
Production: https://api.matchtalk.com
```

### API Versioning

API versiyonlama header veya query parameter ile yapılabilir:

```http
Accept: application/vnd.api+json;version=1
```

veya

```
GET /api/v1/rooms?version=1
```

### Response Format

Tüm API response'ları aşağıdaki formatta döner:

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

### Authentication

Çoğu endpoint JWT token gerektirir. Token'ı header'da gönderin:

```http
Authorization: Bearer <token>
```

## Authentication

### POST /api/v1/auth/register

Kullanıcı kaydı.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "gender": "male"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "gender": "male"
    },
    "token": "jwt-token"
  }
}
```

### POST /api/v1/auth/login

Kullanıcı girişi.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "jwt-token"
  }
}
```

## Users

### GET /api/v1/users/me

Mevcut kullanıcı bilgilerini getirir.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "gender": "male",
    "avatar": "url",
    "xp": 100,
    "level": 5,
    "badges": [ ... ]
  }
}
```

### PUT /api/v1/users/me

Kullanıcı profilini günceller.

**Request Body:**
```json
{
  "name": "New Name",
  "avatar": "url"
}
```

## Rooms

### GET /api/v1/rooms

Aktif odaları listeler.

**Query Parameters:**
- `category` (optional): Oda kategorisi
- `limit` (optional): Sayfa limiti
- `offset` (optional): Sayfa offset'i

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Room Name",
      "category": "general",
      "maxParticipants": 8,
      "currentParticipants": 3,
      "timeLeftSec": 250,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### GET /api/v1/rooms/:id

Oda detaylarını getirir.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Room Name",
    "category": "general",
    "maxParticipants": 8,
    "participants": [
      {
        "id": "uuid",
        "name": "User Name",
        "avatar": "url"
      }
    ],
    "timeLeftSec": 250,
    "extended": false
  }
}
```

### POST /api/v1/rooms

Yeni oda oluşturur.

**Request Body:**
```json
{
  "name": "Room Name",
  "category": "general",
  "maxParticipants": 8,
  "durationSec": 300
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Room Name",
    "category": "general",
    "maxParticipants": 8,
    "timeLeftSec": 300,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### POST /api/v1/rooms/:id/join

Odaya katılır.

**Response:**
```json
{
  "success": true,
  "data": {
    "room": { ... },
    "message": "Joined room successfully"
  }
}
```

### POST /api/v1/rooms/:id/leave

Odadan ayrılır.

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Left room successfully"
  }
}
```

### POST /api/v1/rooms/:id/vote

Oda uzatma oylaması yapar.

**Request Body:**
```json
{
  "vote": "yes" // veya "no"
}
```

## Matching

### POST /api/v1/matching/join

Eşleştirme kuyruğuna katılır.

**Response:**
```json
{
  "success": true,
  "data": {
    "queueId": "uuid",
    "status": "WAITING",
    "message": "Joined matching queue"
  }
}
```

### POST /api/v1/matching/leave

Eşleştirme kuyruğundan ayrılır.

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Left matching queue"
  }
}
```

### GET /api/v1/matching/status

Eşleştirme durumunu getirir.

**Response:**
```json
{
  "success": true,
  "data": {
    "inQueue": true,
    "queueId": "uuid",
    "status": "WAITING"
  }
}
```

## Friends

### GET /api/v1/friends

Arkadaş listesini getirir.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Friend Name",
      "avatar": "url",
      "friendshipId": "uuid",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### POST /api/v1/friends/:userId

Arkadaş ekler.

**Response:**
```json
{
  "success": true,
  "data": {
    "friendship": {
      "id": "uuid",
      "userId": "uuid",
      "friendId": "uuid",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  }
}
```

### DELETE /api/v1/friends/:friendshipId

Arkadaşlığı kaldırır.

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Friendship removed"
  }
}
```

## Invites

### GET /api/v1/invites

Davetleri listeler.

**Query Parameters:**
- `status` (optional): `PENDING`, `ACCEPTED`, `REJECTED`
- `type` (optional): `sent` veya `received`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "inviter": { ... },
      "inviteeEmail": "email@example.com",
      "roomId": "uuid",
      "status": "PENDING",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### POST /api/v1/invites

Yeni davet oluşturur.

**Request Body:**
```json
{
  "inviteeEmail": "email@example.com",
  "roomId": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "invite": { ... }
  }
}
```

### PUT /api/v1/invites/:id/accept

Daveti kabul eder.

**Response:**
```json
{
  "success": true,
  "data": {
    "invite": { ... },
    "room": { ... }
  }
}
```

### PUT /api/v1/invites/:id/reject

Daveti reddeder.

**Response:**
```json
{
  "success": true,
  "data": {
    "invite": { ... }
  }
}
```

## Notifications

### GET /api/v1/notifications

Bildirimleri listeler.

**Query Parameters:**
- `limit` (optional): Sayfa limiti (default: 50)
- `offset` (optional): Sayfa offset'i (default: 0)
- `read` (optional): `true` veya `false`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "type": "room_invite",
      "title": "Room Invite",
      "message": "You have been invited to a room",
      "data": { ... },
      "read": false,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### GET /api/v1/notifications/unread-count

Okunmamış bildirim sayısını getirir.

**Response:**
```json
{
  "success": true,
  "data": {
    "count": 5
  }
}
```

### PUT /api/v1/notifications/:id/read

Bildirimi okundu işaretler.

**Response:**
```json
{
  "success": true,
  "data": {
    "notification": { ... }
  }
}
```

### PUT /api/v1/notifications/read-all

Tüm bildirimleri okundu işaretler.

**Response:**
```json
{
  "success": true,
  "data": {
    "updatedCount": 5
  }
}
```

## Badges

### GET /api/v1/badges

Tüm rozetleri listeler.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Konuşkan",
      "description": "100 mesaj gönder",
      "icon": "url",
      "xpReward": 50,
      "earned": false
    }
  ]
}
```

### GET /api/v1/badges/leaderboard

Rozet liderlik tablosunu getirir.

**Query Parameters:**
- `limit` (optional): Limit (default: 100)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "user": { ... },
      "xp": 1000,
      "level": 10,
      "badges": [ ... ]
    }
  ]
}
```

## Stats

### GET /api/v1/stats

Kullanıcı istatistiklerini getirir.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalRooms": 10,
    "totalFriends": 5,
    "totalInvites": 3,
    "totalXP": 500,
    "level": 5
  }
}
```

## Admin

### GET /api/v1/admin/users

Tüm kullanıcıları listeler (Admin only).

**Query Parameters:**
- `search` (optional): Arama terimi
- `role` (optional): Kullanıcı rolü
- `limit` (optional): Sayfa limiti
- `offset` (optional): Sayfa offset'i

### PUT /api/v1/admin/users/:id/role

Kullanıcı rolünü günceller (Admin only).

**Request Body:**
```json
{
  "role": "admin" // veya "moderator", "user"
}
```

### POST /api/v1/admin/users/:id/ban

Kullanıcıyı banlar (Admin only).

**Request Body:**
```json
{
  "reason": "Violation of terms"
}
```

### DELETE /api/v1/admin/users/:id/ban

Kullanıcının ban'ını kaldırır (Admin only).

### GET /api/v1/admin/system/stats

Sistem istatistiklerini getirir (Admin only).

**Response:**
```json
{
  "success": true,
  "data": {
    "users": {
      "total": 1000
    },
    "rooms": {
      "total": 50,
      "active": 10
    },
    "connections": {
      "active": 25
    },
    "uptime": 3600,
    "memory": { ... }
  }
}
```

### POST /api/v1/admin/system/cache/clear

Cache'i temizler (Admin only).

## Analytics

### POST /api/v1/analytics/track

Event kaydeder (Public, rate limited).

**Request Body:**
```json
{
  "eventType": "page_view",
  "eventData": {
    "page": "/home"
  }
}
```

### GET /api/v1/analytics/stats

Platform istatistiklerini getirir (Admin only).

**Query Parameters:**
- `startDate` (optional): Başlangıç tarihi
- `endDate` (optional): Bitiş tarihi

## Error Codes

| Status Code | Açıklama |
|-------------|----------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

### Örnek Error Response

```json
{
  "success": false,
  "error": "User not found"
}
```

## Rate Limiting

API rate limiting uygulanır:

- **Authentication endpoints**: 5 requests/minute
- **Other endpoints**: 100 requests/minute

Rate limit aşıldığında `429 Too Many Requests` döner.

## WebSocket Events

### Client → Server

- `join-room`: Odaya katıl
- `leave-room`: Odadan ayrıl
- `vote`: Oylama yap
- `join-queue`: Eşleştirme kuyruğuna katıl
- `leave-queue`: Eşleştirme kuyruğundan ayrıl

### Server → Client

- `room-updated`: Oda güncellendi
- `timer-updated`: Timer güncellendi
- `vote-started`: Oylama başladı
- `vote-ended`: Oylama bitti
- `match-found`: Eşleştirme bulundu
- `notification`: Yeni bildirim

## Swagger Documentation

Interaktif API dokümantasyonu:

```
http://localhost:4000/api-docs
```



