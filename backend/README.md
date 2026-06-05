# PetPulse — Backend

> 🚧 **Coming in Phase 1** — This directory will house the API layer and AI service.

## Planned Architecture

```
backend/
├── api/                  # Next.js API routes (tRPC)
│   ├── auth/             # Authentication endpoints
│   ├── pets/             # Pet CRUD operations
│   ├── scans/            # Scan upload & results
│   └── billing/          # Stripe integration
│
├── ai-service/           # Python AI microservice
│   ├── models/           # ML model definitions
│   ├── inference/        # Scan processing pipeline
│   ├── preprocessing/    # Image validation & normalization
│   └── Dockerfile
│
├── db/                   # Database schemas & migrations
│   ├── migrations/
│   └── schema.sql
│
└── scripts/              # Dev & deployment utilities
```

## Tech Stack

| Component | Technology |
|-----------|-----------|
| API Layer | Next.js API Routes + tRPC |
| AI Service | Python, FastAPI, PyTorch |
| Database | PostgreSQL (Supabase) |
| Object Storage | AWS S3 / Cloudflare R2 |
| ML Inference | ONNX Runtime / TensorRT |
| Queue | SQS / Redis |

## Getting Started

Setup instructions will be added once Phase 1 development begins.

For the full technical specification, see [`docs/tech-specification.md`](../docs/tech-specification.md).
