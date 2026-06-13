# PetPulse — Multiphase Project Plan

## Overview

6 phases. Landing page to B2B platform. Each phase is a shippable product increment.

```
Phase 0 ✅  →  Phase 1 ✅  →  Phase 2  →  Phase 3  →  Phase 4  →  Phase 5
Landing      Core App       Intelligence  Monetization  Mobile      B2B/Scale
(Done)       (Done)         6 weeks       6 weeks       8 weeks     Ongoing
```

---

## Phase 0 — Landing & Waitlist ✅ DONE

**Goal**: Validate demand, collect emails, build brand presence.

| Deliverable | Status |
|-------------|--------|
| Cinematic landing page (Next.js 15) | ✅ |
| 7 sections: Hero, Features, Scan Demo, Timeline, Emotional, Pricing, CTA | ✅ |
| Email waitlist capture | ✅ |
| idea.md, requirements.md, tech-specification.md | ✅ |

**Exit Criteria**: Landing live, waitlist collecting signups.

---

## Phase 1 — Core App (Weeks 1–8) ✅ DONE

**Goal**: Users can create accounts, add pets, upload photos, and get basic AI health scores.

### 1A — Foundation (Weeks 1–3) ✅ DONE

| Task | Details |
|------|---------|
| Project setup | Monorepo (Turborepo), shared types between web and API |
| Database | PostgreSQL via Supabase — User, Pet, Scan, ScanFinding tables |
| Auth | Supabase Auth: email/password, Google OAuth, Apple OAuth |
| API layer | tRPC routes: auth, pets CRUD, scans CRUD |
| Image upload | Supabase Storage upload flow, image quality validation |
| CI/CD | GitHub Actions: lint, type-check, test, deploy to Vercel (staging) |

**Deliverables**:
- [x] Supabase project provisioned (auth, DB, storage)
- [x] User signup/login flow working
- [x] Pet profile CRUD (name, breed, age, weight, conditions)
- [x] Image upload pipeline (capture → validate → Storage)
- [x] API tests passing

### 1B — AI Scan Pipeline (Weeks 4–6) ✅ DONE

| Task | Details |
|------|---------|
| AI service | Serverless Supabase Edge Function (`analyze-scan`) |
| Model V1 | Zero-infrastructure analysis using Google Gemini 2.5 Flash Vision |
| Scan types | Teeth, eyes, skin, body condition (4 scan modes) |
| Processing | Upload → DB Webhook Trigger → AI inference → write results |
| Health score | Weighted severity aggregation → 0–100 score |
| Findings | Per-region labels, confidence %, severity (normal/watch/concern/urgent) |

**Deliverables**:
- [x] Edge Function deployed, triggered securely from frontend
- [x] Gemini Vision pipeline integrated and running in < 10 seconds
- [x] Scan results written to `scan_findings` table
- [x] Health score calculated and stored

### 1C — Web Dashboard (Weeks 7–8) ✅ DONE

| Task | Details |
|------|---------|
| Dashboard | Stats bar, recent scans, pet cards with health scores, quick actions |
| Scan flow | Upload photo → Realtime loading state → results page |
| Results page | Health score, finding cards, severity badges |
| Pet profile | View pet details, full scan history per pet |
| Responsive | Desktop + tablet + mobile web |

**Deliverables**:
- [x] Logged-in dashboard with pet management + stats overview
- [x] End-to-end scan flow working (upload → AI → results)
- [x] Scan history per pet (dedicated /pets/[id] page)
- [x] Deployed to staging, internal testing complete

**Phase 1 Exit Criteria**: A user can sign up, add a pet, upload a photo, and receive an AI health score with findings. ✅ **MET**

---

## Phase 2 — Intelligence (Weeks 9–14)

**Goal**: Health trends, smart alerts, breed-specific analysis. Turn one-off scans into ongoing monitoring.

### 2A — Health Timeline (Weeks 9–11)

| Task | Details |
|------|---------|
| Timeline view | Chronological scan history with score trend chart |
| Score deltas | Calculate and display change between scans |
| Comparison | Side-by-side photo viewer (before/after) |
| Trend detection | Flag declining scores over 3+ scans |
| Visualization | Line chart (Recharts), color-coded by severity |

**Deliverables**:
- [ ] Timeline page with score trend chart
- [ ] Before/after photo comparison
- [ ] Automated trend detection (declining, stable, improving)

### 2B — Smart Alerts (Weeks 12–13)

| Task | Details |
|------|---------|
| Push notifications | Expo Notifications integration (web push for now) |
| Alert triggers | Score drop > 10 points, new "concern" finding, scan reminder |
| Alert settings | User-configurable frequency and sensitivity |
| Recommendations | Plain-language summaries: "Luna's eye clarity dropped 12% — consider a vet check" |
| Scan reminders | Configurable: weekly, biweekly, monthly |

**Deliverables**:
- [ ] Push notification pipeline working
- [ ] Automated alerts on score decline
- [ ] Scan reminder system
- [ ] User notification preferences

### 2C — Breed Intelligence (Week 14)

| Task | Details |
|------|---------|
| Breed baselines | Health score benchmarks per breed/age |
| Breed risks | Known predispositions surfaced in findings |
| Model tuning | Breed-aware confidence adjustments |

**Deliverables**:
- [ ] Breed-specific baselines for top 50 breeds
- [ ] "Common for this breed" context in findings
- [ ] Breed risk profile on pet page

**Phase 2 Exit Criteria**: Users see health trends over time, receive automated alerts, and get breed-specific context.

---

## Phase 3 — Monetization (Weeks 15–20)

**Goal**: Stripe billing, premium features, revenue generation.

### 3A — Billing (Weeks 15–17)

| Task | Details |
|------|---------|
| Stripe integration | Checkout sessions, customer portal, webhook handling |
| Tier enforcement | Scan limits (Starter: 4/mo), pet limits (Starter: 2) |
| Paywall UI | Upgrade prompts when hitting limits |
| Trial | 14-day free trial of Premium |
| Billing page | Current plan, usage, invoices, cancel/upgrade |

**Deliverables**:
- [ ] Stripe subscriptions working (Starter, Premium, Family)
- [ ] Tier limits enforced at API level
- [ ] Upgrade/downgrade flow
- [ ] 14-day trial

### 3B — Premium Features (Weeks 18–20)

| Task | Details |
|------|---------|
| Vet chat | Async messaging with vet professionals (via third-party or hired) |
| Report export | PDF health report for vet visits or insurance claims |
| Family sharing | Invite family members to shared pet profiles |
| Insurance helper | Pre-formatted claim data export |
| Priority support | In-app chat escalation |

**Deliverables**:
- [ ] Vet chat MVP (async, text-based)
- [ ] PDF report generation and download
- [ ] Family sharing invitations
- [ ] Insurance export format

**Phase 3 Exit Criteria**: Users can pay, hit tier limits trigger upgrades, premium features accessible to paying users.

---

## Phase 4 — Mobile App (Weeks 21–28)

**Goal**: Native mobile experience with camera integration and offline support.

### 4A — React Native App (Weeks 21–25)

| Task | Details |
|------|---------|
| App shell | React Native + Expo, shared API client with web |
| Auth | Native OAuth flows (Google, Apple), biometric unlock |
| Camera | Guided capture with overlay templates (teeth, eyes, skin, body) |
| Scan flow | Capture → quality check → upload → results — all native |
| Timeline | Native health timeline with charts |
| Push | Native push notifications via FCM/APNs |

**Deliverables**:
- [ ] iOS and Android apps built with Expo
- [ ] Guided camera capture with scan overlays
- [ ] Full scan flow native
- [ ] Push notifications native

### 4B — Offline & Polish (Weeks 26–28)

| Task | Details |
|------|---------|
| Offline capture | Queue photos locally, sync when connected |
| Performance | Image compression, lazy loading, skeleton screens |
| App Store | Screenshots, descriptions, ASO for App Store + Play Store |
| Beta test | TestFlight + Play Console internal testing |
| Onboarding | Native walkthrough for first-time users |

**Deliverables**:
- [ ] Offline photo queue with background sync
- [ ] App Store and Play Store submissions
- [ ] Beta testing with waitlist users
- [ ] Onboarding flow

**Phase 4 Exit Criteria**: Mobile app live on both stores, feature parity with web, offline capture working.

---

## Phase 5 — B2B & Scale (Weeks 29+)

**Goal**: Become infrastructure. API for vet clinics, data partnerships with insurers.

### 5A — Vet Clinic API

| Task | Details |
|------|---------|
| API keys | Clinic onboarding, API key management |
| Endpoints | Submit scan on behalf of patient, retrieve results |
| Dashboard | Clinic-facing portal: patient list, scan history, alerts |
| Compliance | SOC 2 Type 1, BAA for health data |

### 5B — Insurance Partnerships

| Task | Details |
|------|---------|
| Data products | Anonymized early detection insights by breed/age/region |
| Claim integration | Direct data feed to insurer claim systems |
| Risk scoring | Aggregate health risk profiles for underwriting |

### 5C — Scale

| Task | Details |
|------|---------|
| Model V2+ | Continuous learning from user scans (anonymized, opt-in) |
| Multi-species | Cat-specific models, expand beyond dogs |
| Internationalization | Multi-language, regional vet partnerships |
| Infrastructure | Read replicas, auto-scaling inference, CDN optimization |

**Phase 5 Exit Criteria**: First vet clinic integration live, first insurance data partnership signed, 100K users.

---

## Resource Plan

| Phase | Engineering | Design | AI/ML | Cost Estimate |
|-------|------------|--------|-------|---------------|
| 0 ✅ | 1 | 0 | 0 | $0 |
| 1 ✅ | 1 | 0 | 0 | ~$0 (Supabase free tier + Gemini free tier) |
| 2 | 1–2 | 0.5 | 1 | $3K/mo |
| 3 | 1–2 | 0.5 | 0 | $4K/mo (+ Stripe fees) |
| 4 | 2 | 1 | 0.5 | $5K/mo |
| 5 | 2–3 | 1 | 1–2 | $8K/mo |

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|-----------|
| AI accuracy too low for trust | High | Start with conservative findings, add disclaimers, validate with vets |
| Low scan quality from users | Medium | Guided camera overlays, quality validation, rejection with re-take prompt |
| Regulatory pushback (medical claims) | High | Position as "wellness monitoring", never diagnose, always recommend vet |
| User retention after first scan | Medium | Timeline + alerts create habit loop, scan reminders |
| GPU costs spike with scale | Medium | Batch inference, model distillation, ONNX optimization |

---

## Key Decisions Needed

| Decision | Options | Deadline |
|----------|---------|----------|
| Hosting: Supabase vs self-hosted PG | ✅ **Supabase** — auth, DB, storage, edge functions, realtime | Resolved |
| Mobile: React Native vs Flutter | RN (JS ecosystem) vs Flutter (performance) | Phase 4 start |
| AI: Fine-tune vs API | ✅ **Gemini 2.5 Flash API** via Supabase Edge Functions — zero infra cost | Resolved |
| Vet chat: Build vs buy | Custom chat vs integrate Intercom/Zendesk | Phase 3B start |
