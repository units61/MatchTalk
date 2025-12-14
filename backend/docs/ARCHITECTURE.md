# MatchTalk Backend Architecture

Bu dokümantasyon, MatchTalk backend sisteminin mimarisini ve tasarım kararlarını açıklar.

## İçindekiler

1. [Genel Bakış](#genel-bakış)
2. [Sistem Mimarisi](#sistem-mimarisi)
3. [Teknoloji Stack](#teknoloji-stack)
4. [Veritabanı Şeması](#veritabanı-şeması)
5. [Servis Yapısı](#servis-yapısı)
6. [WebSocket Flow](#websocket-flow)
7. [Background Jobs](#background-jobs)
8. [Security](#security)
9. [Performance](#performance)
10. [Scalability](#scalability)

## Genel Bakış

MatchTalk backend, gerçek zamanlı sesli sohbet odaları için RESTful API ve WebSocket servisi sağlar. Sistem, mikroservis benzeri bir yapıda modüler servislerden oluşur.

### Temel Bileşenler

- **REST API**: Express.js tabanlı RESTful API
- **WebSocket Server**: Socket.IO ile gerçek zamanlı iletişim
- **Database**: PostgreSQL (Prisma ORM)
- **Cache**: Redis (caching ve pub/sub)
- **Background Jobs**: BullMQ ile asenkron iş işleme
- **Email Service**: Nodemailer ile email gönderimi

## Sistem Mimarisi

```
┌─────────────────┐
│   Client App    │
└────────┬────────┘
         │
         ├─── HTTP/REST ───┐
         │                  │
         └─── WebSocket ────┤
                            │
                    ┌───────▼───────┐
                    │  Express API  │
                    └───────┬───────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼──────┐   ┌────────▼────────┐   ┌──────▼──────┐
│  PostgreSQL  │   │     Redis       │   │  WebSocket  │
│  (Database)  │   │  (Cache/PubSub) │   │   Server    │
└──────────────┘   └─────────────────┘   └─────────────┘
                            │
                    ┌───────▼───────┐
                    │  Background   │
                    │     Jobs      │
                    │   (BullMQ)    │
                    └───────────────┘
```

## Teknoloji Stack

### Core Technologies

- **Node.js**: 20.x - Runtime environment
- **TypeScript**: Type safety ve geliştirici deneyimi
- **Express.js**: Web framework
- **Socket.IO**: WebSocket library

### Database & Cache

- **PostgreSQL**: 14+ - Primary database
- **Prisma**: ORM ve migration tool
- **Redis**: 6+ - Caching ve pub/sub

### Background Processing

- **BullMQ**: Job queue ve worker management
- **node-cron**: Scheduled tasks

### Other Services

- **Nodemailer**: Email service
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **Zod**: Schema validation

## Veritabanı Şeması

### Entity Relationship Diagram

```
User ──┬── RoomParticipant ── Room
       │
       ├── Friendship ── User (friend)
       │
       ├── Invite (inviter) ── Invite (invitee) ── User
       │
       ├── MatchQueue
       │
       ├── UserBadge ── Badge
       │
       ├── Notification
       │
       └── AnalyticsEvent
```

### Ana Modeller

#### User
- Kullanıcı bilgileri, profil, XP/level sistemi
- Role-based access control (user, admin, moderator)

#### Room
- Oda bilgileri, timer, participant management
- Extension voting sistemi

#### RoomParticipant
- User-Room ilişkisi
- Join/leave tracking

#### Friendship
- Kullanıcılar arası arkadaşlık ilişkileri
- Bidirectional relationship

#### Invite
- Oda davetleri
- Email-based invitation system

#### MatchQueue
- Eşleştirme kuyruğu
- 8 kişilik matching algoritması

#### Badge & UserBadge
- Rozet sistemi
- XP reward mekanizması

#### Notification
- Kullanıcı bildirimleri
- Real-time WebSocket delivery

#### AnalyticsEvent
- Event tracking
- User behavior analytics

## Servis Yapısı

### Service Layer Pattern

Her domain için ayrı service sınıfı:

```
services/
├── authService.ts        # Authentication & authorization
├── userService.ts        # User management
├── roomsService.ts       # Room operations
├── matchingService.ts    # Matching algorithm
├── timerService.ts       # Room timer management
├── voteService.ts        # Voting system
├── friendsService.ts     # Friendship management
├── notificationService.ts # Notification handling
├── emailService.ts       # Email sending
├── analyticsService.ts   # Analytics tracking
├── adminService.ts       # Admin operations
├── cacheService.ts       # Redis caching
└── metricsService.ts     # Metrics collection
```

### Service Responsibilities

**authService:**
- User registration
- Login/logout
- JWT token generation/validation
- Password hashing

**roomsService:**
- Room CRUD operations
- Participant management
- Room state management

**matchingService:**
- Queue management
- 8-person matching algorithm
- Room creation on match

**timerService:**
- Room timer management
- Auto-start on room full
- Extension voting trigger

**voteService:**
- Extension voting
- Vote counting
- Timer extension logic

## WebSocket Flow

### Connection Flow

```
1. Client connects with JWT token
2. Server validates token
3. Server extracts userId from token
4. Server stores connection state
5. Client joins rooms/queues
```

### Event Flow

**Room Events:**
```
Client → join-room → Server
Server → room-updated → All room participants
Server → timer-updated → All room participants
Server → vote-started → All room participants
```

**Matching Events:**
```
Client → join-queue → Server
Server → match-found → 8 matched users
Server → room-created → All matched users
```

**Notification Events:**
```
Server → notification → Specific user
```

### Redis Adapter

Multi-server deployment için Redis adapter kullanılır:

- **Pub/Sub**: Event broadcasting across servers
- **Scaling**: Horizontal scaling desteği

## Background Jobs

### Job Types

1. **Email Jobs**: Email gönderimi
2. **Notification Jobs**: Bildirim oluşturma
3. **Cleanup Jobs**: Eski data temizleme
4. **Analytics Jobs**: Analytics aggregation

### Job Processors

```
jobs/
├── queue.ts              # Queue setup
├── workers.ts            # Worker management
├── types.ts              # Job type definitions
├── scheduler.ts          # Cron jobs
└── processors/
    ├── emailProcessor.ts
    ├── notificationProcessor.ts
    ├── cleanupProcessor.ts
    └── analyticsProcessor.ts
```

### Scheduled Tasks

- **Cleanup expired rooms**: Her saat
- **Cleanup old invites**: Günlük (2 AM)
- **Update leaderboard**: Her 5 dakika
- **Daily stats**: Günlük (1 AM)
- **Inactive users**: Haftalık (Pazar 3 AM)

## Security

### Authentication & Authorization

- **JWT**: Stateless authentication
- **bcryptjs**: Password hashing (10 rounds)
- **Role-based**: Admin/moderator/user roles

### Security Middleware

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Request throttling
- **Input Validation**: Zod schemas

### Data Protection

- **Password**: Never stored in plain text
- **JWT Secret**: Environment variable
- **SQL Injection**: Prisma ORM protection
- **XSS**: Input sanitization

## Performance

### Caching Strategy

**Redis Cache:**
- User data caching
- Room list caching
- Leaderboard caching
- TTL-based expiration

**Cache Keys:**
```
user:{userId}
room:{roomId}
leaderboard:{limit}
```

### Database Optimization

- **Indexes**: Frequently queried fields
- **Relations**: Eager loading where needed
- **Pagination**: Large result sets
- **Connection Pooling**: Prisma connection pool

### API Optimization

- **Response Compression**: Gzip/Brotli
- **Request Batching**: Multiple operations
- **Lazy Loading**: On-demand data loading

## Scalability

### Horizontal Scaling

**Stateless Design:**
- JWT-based authentication
- Redis for shared state
- Database as single source of truth

**Load Balancing:**
- Multiple API instances
- Redis adapter for WebSocket
- Shared session state

### Vertical Scaling

- **PM2 Cluster Mode**: Multi-core utilization
- **Connection Pooling**: Database connections
- **Memory Management**: Node.js memory limits

### Database Scaling

- **Read Replicas**: Read-heavy operations
- **Connection Pooling**: Efficient connection usage
- **Query Optimization**: Indexed queries

## Deployment Architecture

### Production Setup

```
┌─────────────┐
│   Nginx     │  (Reverse Proxy)
└──────┬──────┘
       │
┌──────▼──────┐
│   PM2       │  (Process Manager)
│  (Cluster)  │
└──────┬──────┘
       │
┌──────▼──────┐
│  Node.js    │  (Multiple Instances)
│  Backend    │
└──────┬──────┘
       │
┌──────┼──────┐
│      │      │
┌──────▼──┐ ┌▼──────┐ ┌──────▼──┐
│PostgreSQL│ │ Redis │ │  SMTP   │
└──────────┘ └───────┘ └─────────┘
```

### Container Architecture

- **Docker**: Containerization
- **Multi-stage builds**: Optimized images
- **Health checks**: Container monitoring
- **Resource limits**: CPU/Memory constraints

## Monitoring & Observability

### Metrics

- **Request/Response metrics**: Response times, error rates
- **System metrics**: CPU, memory, uptime
- **Business metrics**: Active users, rooms, matches

### Logging

- **Winston**: Structured logging
- **Log levels**: error, warn, info, debug
- **Log rotation**: File size limits

### Health Checks

- **Health endpoint**: `/health`
- **Database check**: Connection status
- **Redis check**: Cache availability

## Error Handling

### Error Types

- **HttpError**: Custom HTTP errors
- **ValidationError**: Zod validation errors
- **DatabaseError**: Prisma errors

### Error Response Format

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Testing Strategy

### Test Types

- **Unit Tests**: Service functions
- **Integration Tests**: API endpoints
- **E2E Tests**: Full flow testing

### Test Coverage

- **Minimum Threshold**: 50%
- **Coverage Reports**: LCOV format
- **CI Integration**: Automated testing

## Future Improvements

### Planned Enhancements

1. **GraphQL API**: Alternative to REST
2. **Microservices**: Service decomposition
3. **Event Sourcing**: Event-driven architecture
4. **CQRS**: Command Query Responsibility Segregation
5. **Service Mesh**: Inter-service communication

### Performance Optimizations

1. **Database Sharding**: Horizontal partitioning
2. **CDN Integration**: Static asset delivery
3. **Edge Computing**: Geographic distribution
4. **Caching Layers**: Multi-level caching

## Best Practices

### Code Organization

- **Modular structure**: Separation of concerns
- **Service layer**: Business logic isolation
- **Type safety**: TypeScript strict mode
- **Error handling**: Comprehensive error handling

### Development Workflow

- **Git flow**: Feature branches
- **Code review**: PR reviews
- **CI/CD**: Automated testing and deployment
- **Documentation**: Inline and external docs

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Socket.IO Documentation](https://socket.io/docs)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Node.js Production Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
