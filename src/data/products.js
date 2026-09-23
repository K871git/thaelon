// ─────────────────────────────────────────────────────────────
// PRODUCTS — Thaelon's own built products
// ─────────────────────────────────────────────────────────────

const products = [
  {
    name: 'KareerOS',
    type: 'saas',
    platforms: ['Web'],
    color: 'violet',
    status: 'live',
    tagline: 'AI-powered placement preparation — built to explain, not just list.',
    description:
      'KareerOS is an interview preparation platform built for developers at every level. A locally-hosted Ollama model acts as an on-demand question explainer — breaking down why a question is asked, what a strong answer looks like, and how to structure your thinking. Covers DSA, System Design, HR, and Behavioural rounds in a single platform.\n\nThe backend is a Laravel 13 REST API backed by MySQL. The frontend is React + TypeScript. The entire stack runs in Docker for clean, consistent environments — identical in development and production.',
    features: [
      'Local LLM explains every question in plain language — why it is asked, not just the answer',
      'Covers DSA, System Design, HR, and Behavioural rounds in one platform',
      'Progress tracking per topic and per difficulty level',
      'Runs in Docker — identical dev and production environments',
      'REST API backend — ready to extend with mobile or third-party integrations',
    ],
    stats: ['AI-powered', 'Docker-ready', 'SaaS'],
    audience: ['Students', 'Junior Developers', 'Mid-Senior Engineers'],
    tech: ['React + TypeScript', 'Laravel 13', 'Ollama + Python', 'MySQL', 'Docker', 'REST APIs'],
    link: 'https://kareeros.netlify.app',
    download: null,
    docs: null,
    datasheet: null,
  },
  {
    name: 'Clinora',
    type: 'on-premise',
    platforms: ['Web', 'Desktop'],
    color: 'emerald',
    status: 'live',
    tagline: 'Full-featured offline clinic management system — patient records, prescriptions, pharmacy, and EMR in one native desktop app.',
    description:
      'Clinora is a complete offline clinic management system built as a native Windows desktop application. It covers the full clinical workflow — patient registration, OPD visits, prescription writing, pharmacy dispensing, appointments, and electronic medical records — all running locally with zero internet dependency and zero cloud cost. Patient data never leaves the clinic.\n\nThe system is built around two distinct role-based interfaces. The Doctor side handles patient registration, OPD consultation flow with diagnosis and fees, a prescription builder with duplicate detection, dosage warnings, and allergy alerts, and full EMR access — allergies, chronic conditions, surgeries, medications, family history, and lab results. The Pharmacist side manages the medicine inventory, prescription dispensing queue, billing, and payment tracking (paid, partial, or unpaid).\n\nClinora ships as a single self-contained Windows installer (Tauri 2). The React 18 frontend communicates with a local MySQL database through a Rust backend via 40+ typed Tauri commands. A cryptographic license system using ed25519-signed clinic-specific keys enforces access tiers — monthly, annual, or lifetime — validated entirely offline. Current release: v1.2.0 covering 20+ screens across both roles.',
    features: [
      'OPD visit flow — consultation notes, diagnosis, fees, and complete visit history per patient',
      'Prescription builder with duplicate detection, dosage warnings, and allergy alerts',
      'Reusable prescription templates — build once, apply to any future patient instantly',
      'Pharmacy dispensing queue with billing and payment status (paid / partial / unpaid)',
      'Medicine inventory and stock management across the full pharmacy catalogue',
      'Appointment scheduler with real-time status tracking per patient',
      'Electronic Medical Records (EMR) — allergies, chronic conditions, surgeries, labs, family history',
      'Offline license enforcement via ed25519-signed clinic-specific keys with tier and expiry validation',
    ],
    stats: ['20+ Screens', '40+ Commands', 'v1.2.0'],
    audience: ['Clinic Owners', 'General Practitioners', 'Medical Staff', 'Pharmacists'],
    tech: ['React 18', 'Tauri 2 (Rust)', 'MySQL + SQLx', 'React Router v6', 'ed25519 Licensing', 'SweetAlert2', 'Vite'],
    link: null,
    download: 'https://github.com/K871git/thaelon-products/releases/download/v1.2.0/Clinora_1.2.0_x64-setup.exe',
    docs: null,
    datasheet: null,
  },
]

export default products
