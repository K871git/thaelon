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
    tagline: 'Because interview prep shouldn\'t feel like reading a textbook.',
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
    tagline: 'Because clinics can\'t wait for the internet to come back.',
    description:
      'Clinora is a mid-scale EMR system built for small clinics that need real software — not a spreadsheet, not a cloud subscription. It runs entirely offline as a native Windows desktop application, covering the full clinical workflow from patient registration to prescription dispensing, pharmacy billing, and electronic medical records. No internet. No data leaving the building. No monthly cloud bill.\n\nThe system is built around two distinct role-based interfaces. The Doctor side handles OPD consultation flow, a prescription builder with duplicate detection, dosage warnings, and allergy alerts, full EMR access (allergies, chronic conditions, surgeries, labs, family history), and complete visit history per patient. The Pharmacist side manages medicine inventory, prescription dispensing queue, billing, and payment tracking.\n\nClinora ships as a single Windows installer (Tauri 2 + Rust backend + React 18 frontend). A cryptographic license system using ed25519-signed clinic-specific keys enforces access tiers — monthly, annual, or lifetime — validated entirely offline. Current release: v1.4.0.',
    features: [
      'Full EMR — allergies, chronic conditions, surgeries, lab results, family history, per patient',
      'OPD consultation flow — diagnosis, fees, visit notes, and complete history in one screen',
      'Prescription builder with duplicate detection, dosage warnings, and allergy alerts',
      'Reusable prescription templates — build once, apply to any future patient instantly',
      'Pharmacy dispensing queue with billing and payment tracking (paid / partial / unpaid)',
      'Medicine inventory and stock management across the full pharmacy catalogue',
      'Appointment scheduler with real-time status tracking',
      'Offline license enforcement — clinic-specific keys, no internet required',
    ],
    stats: ['Mid-Scale EMR', 'Fully Offline', 'v1.4.0'],
    audience: ['Small Clinic Owners', 'General Practitioners', 'Medical Staff', 'Pharmacists'],
    tech: ['React 18', 'Tauri 2 (Rust)', 'MySQL + SQLx', 'React Router v6', 'ed25519 Licensing', 'SweetAlert2', 'Vite'],
    link: null,
    download: 'https://github.com/K871git/thaelon-products/releases/download/v1.4.0/Clinora_1.4.0_x64-setup.exe',
    docs: null,
    datasheet: null,
  },
]

export default products
