<div align="center">

# 🐾 PetPulse

### Notice health changes before they become emergencies.

**AI-powered pet health monitoring that spots problems early — between vet visits.**

[![Next.js](https://img.shields.io/badge/Next.js-13.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[Live Demo](https://petpulse.netlify.app) · [Documentation](docs/) · [Tech Spec](docs/tech-specification.md)

</div>

---

## 🧠 What is PetPulse?

PetPulse lets pet owners photograph their pet's teeth, eyes, skin, or gait and receive **instant AI-powered health insights**. Think of it as a health dashboard for your pet — catching the subtle warning signs you'd miss on your own.

- 🦷 **Dental scans** — Spot tartar, gum recession, and oral issues early
- 👁️ **Eye analysis** — Detect cloudiness, redness, and discharge changes
- 🐕 **Body condition** — Track weight, posture, and coat health over time
- 📊 **Health timeline** — Visualize trends and compare scans side by side

> *"Is she okay?"* — The question every pet owner asks at 2am. PetPulse helps you answer it.

---

## 📁 Project Structure

```
petpulse/
│
├── frontend/              # Next.js web application
│   ├── app/               # App router pages & layouts
│   ├── components/        # React components
│   │   ├── layout/        # Navigation, footer, scroll progress
│   │   ├── motion/        # Animation wrappers (Framer Motion)
│   │   ├── petpulse/      # Feature-specific components
│   │   ├── sections/      # Landing page sections
│   │   └── ui/            # Reusable UI primitives (shadcn/ui)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities & constants
│   └── public/            # Static assets & images
│
├── backend/               # API & AI service (Phase 1 — coming soon)
│
├── docs/                  # Project documentation
│   ├── idea.md            # Product vision & strategy
│   ├── requirements.md    # Feature requirements & specs
│   ├── project-plan.md    # Multi-phase development roadmap
│   └── tech-specification.md  # Architecture & tech decisions
│
├── LICENSE                # MIT License
└── README.md              # You are here
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/petpulse.git
cd petpulse

# Install frontend dependencies
cd frontend
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see it in action.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript compiler check |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 13.5 | SSR, App Router, API routes |
| **Language** | TypeScript 5.2 | Type safety |
| **Styling** | Tailwind CSS 3.3 | Utility-first CSS |
| **UI Components** | shadcn/ui + Radix | Accessible primitives |
| **Animations** | Framer Motion 12 | Smooth interactions |
| **Charts** | Recharts | Health data visualization |
| **Smooth Scroll** | Lenis | Premium scroll experience |
| **Deployment** | Netlify | Edge hosting |

---

## 🗺️ Roadmap

| Phase | Status | Description |
|-------|--------|-------------|
| **Phase 0** — Landing Page | ✅ Done | Cinematic landing, waitlist capture |
| **Phase 1** — Core App | 🔜 Next | Auth, pet profiles, AI photo scanning |
| **Phase 2** — Intelligence | 📋 Planned | Health timeline, smart alerts, breed insights |
| **Phase 3** — Monetization | 📋 Planned | Stripe billing, premium features, vet chat |
| **Phase 4** — Mobile App | 📋 Planned | React Native, camera integration, offline |
| **Phase 5** — B2B & Scale | 📋 Planned | Vet clinic API, insurance partnerships |

See the full roadmap in [`docs/project-plan.md`](docs/project-plan.md).

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [Product Vision](docs/idea.md) | Problem, solution, growth strategy |
| [Requirements](docs/requirements.md) | Feature specs, user roles, success metrics |
| [Project Plan](docs/project-plan.md) | 6-phase development roadmap |
| [Tech Specification](docs/tech-specification.md) | Architecture, data models, API design |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for pets everywhere.**

🐕 🐈 🐾

</div>
