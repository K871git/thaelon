# THAELON

**Imagine. Engineer. Evolve.**

The official website of Thaelon — a founder-led, craft-driven software engineering studio building purposeful technology. This repository contains the full source of the public marketing and portfolio site deployed at [k871git.github.io/thaelon](https://k871git.github.io/thaelon/).

---

## What is Thaelon?

Thaelon is a small, focused engineering studio. One founder. A trusted ghost team of specialists. No overhead, no bloat — just well-built software.

We take on client work across AI systems, full-stack applications, and domain-specific software — from the first brief to production deployment. Alongside client work, Thaelon builds and ships its own products.

---

## Live Products

### Clinora
**Full-featured offline clinic management system**
A native Windows desktop application covering the complete clinical workflow — patient registration, OPD visits, prescription writing, pharmacy dispensing, appointments, and electronic medical records. Runs entirely offline. Patient data never leaves the clinic.

- Stack: `React 18` · `Tauri 2 (Rust)` · `MySQL + SQLx` · `ed25519 Licensing` · `Vite`
- Version: `v1.2.0` — 20+ screens, 40+ typed Tauri commands
- [Download Clinora v1.2.0](https://github.com/K871git/thaelon-products/releases/download/v1.2.0/Clinora_1.2.0_x64-setup.exe)

### KareerOS
**AI-powered placement preparation platform**
A web-based interview preparation platform with a locally-hosted Ollama model that explains questions in plain language — not just listing answers, but breaking down *why* a question is asked and *how* to structure thinking. Covers DSA, System Design, HR, and Behavioural rounds.

- Stack: `React + TypeScript` · `Laravel 13` · `Ollama + Python` · `MySQL` · `Docker`
- Type: SaaS
- [View KareerOS](https://kareeros.netlify.app)

---

## This Website — Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19.2 |
| Build Tool | Vite 8 |
| Language | JavaScript (JSX) — no TypeScript |
| Styling | Single global CSS (`src/index.css`) with CSS custom properties |
| Animation | Canvas 2D API — custom Starfield component |
| Linter | oxlint |
| Deployment | GitHub Pages |
| Base Path | `/thaelon/` |

No UI libraries. No Tailwind. No CSS modules. Handcrafted from scratch.

---

## Design Language

The site uses a **glassmorphism + animated canvas** design system:

- **Dark mode** — animated starfield with moon, shooting stars, UFO, and spaceships on a deep navy canvas
- **Light mode** — animated sky with sun, god rays, drifting clouds, and birds
- All sections have near-transparent backgrounds so the animated canvas shows through every layer
- Cards use `backdrop-filter: blur()` with sky-tinted glass in light mode (`rgba(232, 238, 255, ...)`)
- Accent color: `#7c6af7` (violet/purple) dark / `#5d4de6` light

---

## Project Structure

```
thaelon/
├── public/
│   └── Thaelon-removebg.png       Logo image
├── docs/
│   ├── context.md
│   └── thaelon.txt                Full project context for AI/developer reference
├── src/
│   ├── App.jsx                    Root — theme state, section layout order
│   ├── index.css                  All styles (~5300+ lines)
│   ├── components/
│   │   ├── Starfield.jsx          Animated canvas background (fixed, z-index: 0)
│   │   ├── Nav.jsx                Navigation with scroll progress bar
│   │   ├── Footer.jsx             Footer — brand, social, links
│   │   ├── Modal.jsx              Reusable accessible modal
│   │   └── CodeTicker.jsx         Scrolling code terms strip
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Process.jsx
│   │   ├── ProductListing.jsx
│   │   ├── Team.jsx
│   │   ├── Pricing.jsx
│   │   └── Contact.jsx
│   ├── data/
│   │   ├── team.js
│   │   ├── products.js
│   │   ├── skills.js
│   │   └── skillIcons.jsx
│   └── hooks/
│       └── useScrollReveal.js     IntersectionObserver scroll-reveal hook
├── vite.config.js
└── package.json
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server at http://localhost:5173/thaelon/
npm run dev

# Lint
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

> Node 18+ required. The site is served under the `/thaelon/` base path in both dev and production — this is set in `vite.config.js`.

---

## Deployment

Deployed to GitHub Pages from the `main` branch.

```bash
npm run build
# Push the dist/ contents to gh-pages branch
```

Live at: **https://k871git.github.io/thaelon/**

---

## Team

### Kishor Gangarde — Founder & Lead Engineer
Architect and builder of Clinora and KareerOS. Designs, engineers, and ships — from first brief to production deployment.

- GitHub: [@K871git](https://github.com/K871git)
- LinkedIn: [kishor-gangarde](https://linkedin.com/in/kishor-gangarde)

### The Ghost Team
For projects and scopes that call for it, Thaelon works alongside a trusted network of specialist engineers who operate quietly in the background. Every engagement remains founder-led and directly accountable.

---

## License

This project is proprietary software.

All source code, design, visual assets, brand identity, and content within this repository are the exclusive property of **Thaelon** and **Kishor Gangarde**. Unauthorized copying, reproduction, distribution, or use of any part of this codebase — in whole or in part — is strictly prohibited without explicit written permission from the copyright holder.

See [LICENSE](./LICENSE) for the full terms.

---

© 2024–2026 Thaelon & Kishor Gangarde. All rights reserved.
Built by Thaelon — *Imagine. Engineer. Evolve.*
