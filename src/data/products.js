// ─────────────────────────────────────────────────────────────
// PRODUCTS — Thaelon's own built products (SaaS + On-Premise)
// Flags marked with  ← FILL  show where to drop real content
// ─────────────────────────────────────────────────────────────

const products = [
  {
    name: 'KareerOS',
    type: 'saas',                        // badge: "SaaS"
    color: 'violet',
    status: 'live',
    tagline: 'AI-powered placement preparation — built to explain, not just list.',
    description:
      'KareerOS is an interview preparation platform built for developers at every level. A locally-hosted Ollama model acts as an on-demand question explainer — breaking down why a question is asked, what a strong answer looks like, and how to structure your thinking. Covers DSA, System Design, HR, and Behavioural rounds. The backend is a Laravel 13 REST API backed by MySQL. The frontend is React + TypeScript. The entire stack runs in Docker for clean, consistent environments.',
    features: [
      'Local LLM explains every question in plain language — not just the answer',
      'Covers DSA, System Design, HR, and Behavioural rounds',
      'Progress tracking per topic and per difficulty',
      'Runs in Docker — identical dev and production environments',
      'REST API backend — ready to extend with mobile or third-party integrations',
    ],
    audience: ['Students', 'Junior Developers', 'Mid-Senior Engineers'],
    tech: ['React + TypeScript', 'Laravel 13', 'Ollama + Python', 'MySQL', 'Docker', 'REST APIs'],
    link: 'https://kareeros.netlify.app',

    // ─── DROP YOUR CONTENT HERE WHEN READY ──────────────────
    demo: null,            // ← FILL  e.g. './videos/kareeros-demo.mp4'
    docs: null,            // ← FILL  e.g. 'https://docs.kareeros.app'
    datasheet: null,       // not applicable for SaaS
    // ────────────────────────────────────────────────────────
  },
  {
    name: 'Clinora',
    type: 'on-premise',                  // badge: "On-Premise"
    color: 'emerald',
    status: 'wip',
    tagline: 'Complete EMR system for small clinics — works offline, syncs online.',
    description:
      'Clinora is a full-featured Electronic Medical Records (EMR) system built to operate in both connected and air-gapped environments. Clinics manage patient records, appointment histories, medicine inventory, and billing — all without depending on internet access. When connectivity returns, data syncs seamlessly. Built on React with a Laravel 13 REST API and MySQL storage, the system includes automation scripts for reminders, report generation, and scheduled backups. Every clinic gets a customised configuration — forms, workflows, and invoice templates adapted to how they actually operate.',
    features: [
      'Works offline — full functionality without internet connection',
      'Patient records, appointments, medicine inventory, and invoices in one place',
      'Per-clinic customisation — forms, workflows, and templates configured to match real operations',
      'Automation scripts for reminders, scheduled reports, and data backups',
      'Sync on reconnect — no data loss during offline periods',
    ],
    audience: ['Clinic Owners', 'Healthcare Administrators', 'Medical Staff', 'Pharmacists'],
    tech: ['React', 'JavaScript', 'Laravel 13', 'MySQL', 'Automation Scripts', 'Offline-first Architecture', 'PDF Generation'],
    link: null,

    // ─── DROP YOUR CONTENT HERE WHEN READY ──────────────────
    demo: null,            // ← FILL  e.g. './videos/clinora-demo.mp4'
    docs: null,            // ← FILL  e.g. './docs/clinora-setup-guide.pdf'
    datasheet: null,       // ← FILL  e.g. './datasheets/clinora-datasheet.pdf'
    // ────────────────────────────────────────────────────────
  },
]

export default products
