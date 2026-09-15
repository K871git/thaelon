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
      'KareerOS is an interview preparation platform built for developers at every level. A locally-hosted Ollama model acts as an on-demand question explainer — breaking down why a question is asked, what a strong answer looks like, and how to structure your thinking. Covers DSA, System Design, HR, and Behavioural rounds. The backend is a Laravel 13 REST API backed by MySQL. The frontend is React + TypeScript. The entire stack runs in Docker for clean, consistent environments.',
    features: [
      'Local LLM explains every question in plain language — not just the answer',
      'Covers DSA, System Design, HR, and Behavioural rounds in one platform',
      'Progress tracking per topic and per difficulty level',
      'Runs in Docker — identical dev and production environments',
      'REST API backend — ready to extend with mobile or third-party integrations',
    ],
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
    tagline: 'Modern, offline-first clinic management and prescription system for small to mid-size medical practices.',
    description:
      'Clinora is a full-featured Electronic Medical Record (EMR) and pharmacy management system built for small to mid-size medical practices. It runs entirely on your local network — no cloud dependency, no subscription, no internet requirement. Your patient data stays on your premises.\n\nThe system is structured around two role-based workflows. The doctor side handles patient registration, full visit history, prescription writing with multi-medicine line items, and print-ready prescription slips. The pharmacy side picks up prescriptions through a live dispensing queue, handles per-item completion tracking, records payments, and maintains a complete revenue history — with no manual handoff between roles.\n\nClinora ships in two formats: a self-hosted web application (Laravel 13 + React + Vite) installable on any local Windows server, and a standalone Windows desktop installer built with Tauri 2 that requires no browser or separate server setup. Both run on the same MySQL-backed data layer.',
    features: [
      'Doctor and Pharmacy role-based dashboards — separate views, separate permissions, one shared data layer',
      'Patient registration with complete visit history, soft-delete records, fee tracking, and payment status',
      'Prescription writing with multi-medicine line items and one-click print-ready prescription slip output',
      'Pharmacy dispensing queue with step-by-step tracking, payment collection, and full revenue history',
      'Medicine catalogue and pharmacy stock management with bulk import support',
      'Clinic-level configuration — prescription templates, clinic branding, and per-user profile management',
      'Available as a self-hosted web app and a standalone Windows desktop installer (Tauri 2)',
      'Automation scripts for first-time setup, daily start/stop, and scheduled operations',
    ],
    audience: ['Clinic Owners', 'General Practitioners', 'Medical Staff', 'Pharmacists'],
    tech: ['React', 'Vite', 'Laravel 13', 'MySQL', 'Tauri 2 (Rust)', 'Sanctum Auth', 'PDF Generation'],
    link: null,
    download: 'https://github.com/K871git/thaelon-products/releases/download/v1.0.0/Clinora_1.0.0_x64-setup.exe',
    docs: null,
    datasheet: null,
  },
]

export default products
