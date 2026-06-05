# PetPulse — Tech Specification

## Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Mobile App │────▶│   API Layer  │────▶│   AI Service │
│  (React Native)    │  (Next.js)   │     │  (Python/FastAPI)
└──────────────┘     └──────┬───────┘     └──────┬───────┘
                            │                     │
                     ┌──────▼───────┐     ┌──────▼───────┐
                     │   Database   │     │  ML Pipeline │
                     │ (PostgreSQL) │     │  (AWS Sage-  │
                     │              │     │   maker)     │
                     └──────────────┘     └──────────────┘
                            │
                     ┌──────▼───────┐
                     │  Object Store│
                     │  (S3)        │
                     └──────────────┘
```

---

## Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| **Mobile** | React Native + Expo | Cross-platform, fast iteration |
| **Web/Landing** | Next.js 15, TypeScript, Tailwind | Already built, SEO, SSR |
| **API** | Next.js API Routes + tRPC | Type-safe, co-located with web |
| **AI Service** | Python, FastAPI | ML ecosystem, model serving |
| **Database** | PostgreSQL (Supabase) | Relational, auth built-in, real-time |
| **Object Storage** | AWS S3 / Cloudflare R2 | Image storage, CDN delivery |
| **ML Training** | PyTorch, AWS SageMaker | Fine-tuning vision models |
| **ML Inference** | ONNX Runtime / TensorRT | Low-latency serving |
| **Auth** | Supabase Auth (OAuth + email) | Google, Apple, email/password |
| **Payments** | Stripe | Subscriptions, usage-based billing |
| **Push Notifications** | Expo Notifications + FCM/APNs | Cross-platform push |
| **Monitoring** | Sentry + PostHog | Error tracking + product analytics |
| **CI/CD** | GitHub Actions | Build, test, deploy |
| **Hosting** | Vercel (web) + AWS (AI) | Edge delivery + GPU compute |

---

## Data Models

### User
```
id            UUID PK
email         VARCHAR UNIQUE
name          VARCHAR
auth_provider ENUM (email, google, apple)
tier          ENUM (free, starter, premium, family)
stripe_id     VARCHAR
created_at    TIMESTAMP
```

### Pet
```
id            UUID PK
user_id       UUID FK → User
name          VARCHAR
species       ENUM (dog, cat)
breed         VARCHAR
age_years     DECIMAL
weight_kg     DECIMAL
conditions    TEXT[]
avatar_url    VARCHAR
created_at    TIMESTAMP
```

### Scan
```
id            UUID PK
pet_id        UUID FK → Pet
image_url     VARCHAR
scan_type     ENUM (teeth, eyes, skin, gait, body)
health_score  INTEGER (0-100)
status        ENUM (processing, complete, failed)
created_at    TIMESTAMP
```

### ScanFinding
```
id            UUID PK
scan_id       UUID FK → Scan
region        VARCHAR
label         VARCHAR
confidence    DECIMAL (0-1)
severity      ENUM (normal, watch, concern, urgent)
detail        TEXT
bounding_box  JSONB
```

### HealthTimeline
```
id            UUID PK
pet_id        UUID FK → Pet
scan_id       UUID FK → Scan
score         INTEGER
delta         INTEGER (change from previous)
created_at    TIMESTAMP
```

---

## API Endpoints

### Auth
```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

### Pets
```
GET    /api/pets              → List user's pets
POST   /api/pets              → Create pet profile
GET    /api/pets/:id          → Get pet details
PUT    /api/pets/:id          → Update pet
DELETE /api/pets/:id          → Delete pet
```

### Scans
```
POST   /api/scans/upload      → Upload image, start scan
GET    /api/scans/:id         → Get scan result
GET    /api/pets/:id/scans    → List scans for pet
GET    /api/pets/:id/timeline → Health timeline
```

### Billing
```
POST   /api/billing/checkout  → Create Stripe checkout session
POST   /api/billing/portal    → Customer portal link
POST   /api/billing/webhook   → Stripe webhook handler
```

---

## AI Pipeline

### Scan Flow
```
1. User uploads image
2. API validates image quality (blur, lighting, resolution)
3. Image stored in S3, scan record created (status: processing)
4. AI service receives job via queue (SQS/Redis)
5. Pre-processing: resize, normalize, augment
6. Inference: fine-tuned vision model runs detection
7. Post-processing: map detections to health findings
8. Results written to DB, push notification sent
9. Scan status → complete
```

### Model Architecture
- **Base model**: DINOv2 or CLIP (pre-trained vision foundation model)
- **Fine-tuned**: On veterinary image datasets for teeth, eyes, skin, body condition
- **Output**: Multi-label classification + bounding box regression
- **Scoring**: Weighted severity aggregation → single health score (0–100)

### Training Data
- Veterinary image datasets (open + licensed)
- User-submitted scans (anonymized, opt-in only)
- Vet-validated labels for supervised fine-tuning
- Synthetic augmentation for rare conditions

---

## Image Handling

| Stage | Spec |
|-------|------|
| Capture | Min 1080p, HEIF/JPEG |
| Upload | Compressed to < 2MB, HTTPS |
| Storage | S3, organized by `user_id/pet_id/scan_id` |
| Retention | Indefinite (user-deletable) |
| CDN | CloudFront / R2 for thumbnail delivery |
| Privacy | Pre-signed URLs, no public access |

---

## Security

- All data encrypted in transit (TLS 1.3) and at rest (AES-256)
- Row-level security (RLS) via Supabase — users only see their own data
- API rate limiting: 60 req/min (standard), 120 req/min (premium)
- Image URLs are pre-signed, expire in 1 hour
- GDPR: data export, deletion on request, anonymized analytics
- SOC 2 compliance roadmap for B2B (vet clinics, insurers)

---

## Infrastructure

### Environments
```
local    → Docker Compose (Postgres, Redis, MinIO, FastAPI)
staging  → Vercel Preview + AWS Dev (reduced GPU)
prod     → Vercel Prod + AWS Prod (auto-scaling GPU)
```

### Scaling Targets
| Component | V1 Target | Scale Strategy |
|-----------|-----------|---------------|
| API | 1K req/min | Vercel Edge, auto-scale |
| AI Inference | 100 scans/min | SageMaker auto-scaling, queue buffering |
| Database | 100K users | Supabase Pro, read replicas at 500K |
| Storage | 10TB images | S3 Intelligent-Tiering |

---

## Deployment

```
main branch → staging (auto-deploy)
release tag → production (manual promote)
```

- Web: Vercel (auto from GitHub)
- AI Service: Docker → ECR → ECS/SageMaker
- Mobile: EAS Build → TestFlight / Play Console
- Database migrations: Prisma / Drizzle

---

## Milestones

| Phase | Scope | Timeline |
|-------|-------|----------|
| **V0** | Landing page (done), waitlist | Week 0 |
| **V1** | Auth, pet profiles, photo scan, basic AI, health score | Weeks 1–8 |
| **V2** | Timeline, trends, push alerts, breed-specific models | Weeks 9–14 |
| **V3** | Stripe billing, premium features, vet chat | Weeks 15–20 |
| **V4** | Mobile app (React Native), offline capture | Weeks 21–28 |
| **B2B** | Vet clinic API, insurance data partnerships | Weeks 29+ |
