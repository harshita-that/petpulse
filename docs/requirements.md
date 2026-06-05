# PetPulse — Requirements

## Product Overview

Mobile-first app that lets pet owners photograph their pet's teeth, eyes, skin, and gait to get AI-powered health insights between vet visits.

---

## User Roles

| Role | Description |
|------|-------------|
| **Pet Owner** | Primary user. Uploads photos, views health reports, manages pet profiles |
| **Vet (Future)** | Reviews shared reports, provides feedback via chat (Premium) |
| **Admin** | Manages users, monitors system health, reviews flagged scans |

---

## Core Features (MVP)

### 1. Auth & Onboarding
- Email + OAuth sign-up (Google, Apple)
- Pet profile creation: name, breed, age, weight, existing conditions
- Guided first-scan tutorial

### 2. Photo Scan
- Camera capture with guided overlay (teeth, eyes, skin, body)
- Gallery upload fallback
- Image quality validation before submission
- Scan areas: teeth, eyes, skin/coat, gait (video), body posture

### 3. AI Analysis
- Per-scan health score (0–100)
- Region-specific findings with confidence levels
- Severity classification: normal / watch / concern / urgent
- Comparison against breed-specific baselines

### 4. Health Timeline
- Chronological scan history per pet
- Score trend visualization (chart)
- Side-by-side photo comparison (before/after)
- Flagged changes highlighted automatically

### 5. Alerts & Recommendations
- Push notifications for declining trends
- Plain-language health summaries (no medical jargon)
- "See a vet" threshold with urgency level
- Suggested next scan timing

### 6. Pet Profiles
- Multiple pets per account (tier-dependent)
- Breed, age, weight, medical history
- Vaccination and medication tracking

---

## Premium Features

| Feature | Tier |
|---------|------|
| Unlimited scans | Starter+ |
| Breed-specific monitoring | Premium+ |
| Vet chat (async) | Premium+ |
| Insurance claim export | Premium+ |
| Family sharing (multi-user) | Family |
| Priority support | Family |

---

## Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Scan processing time | < 10 seconds |
| Uptime | 99.9% |
| Image storage | Encrypted at rest (AES-256) |
| Data compliance | GDPR, CCPA |
| Supported platforms | iOS 16+, Android 12+ |
| Offline | Photo capture offline, sync when connected |
| Accessibility | WCAG 2.1 AA |

---

## Data Requirements

- All pet health data is owner-controlled
- Data deletion on account removal (hard delete)
- Anonymized scan data used for model training (opt-in)
- Vet-shared reports expire after 30 days unless saved

---

## Monetization

| Tier | Price | Limits |
|------|-------|--------|
| **Starter** | $5/mo | 2 pets, 4 scans/mo, basic insights |
| **Premium** | $15/mo | 5 pets, unlimited scans, vet chat, breed monitoring |
| **Family** | $25/mo | Unlimited pets, family sharing, priority support |

---

## Success Metrics

| Metric | Target (Year 1) |
|--------|-----------------|
| MAU | 10K |
| Scan completion rate | > 80% |
| Retention (30-day) | > 40% |
| Paid conversion | > 5% |
| Avg scans/user/month | 3+ |
| NPS | > 50 |

---

## Out of Scope (V1)

- Real-time video analysis
- Wearable device integration
- Direct vet booking/scheduling
- Prescription management
- Multi-language support
