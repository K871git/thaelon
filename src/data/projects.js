// Add real projects only — never fabricate.
const projects = [
  {
    name: 'KareerOS',
    industry: 'EdTech / AI',
    color: 'violet',
    purpose: 'AI-powered placement preparation platform. Explains interview questions using a local LLM so every answer actually makes sense — not just memorised.',
    description:
      'KareerOS is an interview preparation platform built for developers at every level. A locally-hosted Ollama model served via Python acts as an on-demand question explainer — breaking down why a question is asked, what a strong answer looks like, and how to structure your thinking. The backend is a Laravel 13 REST API backed by MySQL. The frontend is React + TypeScript. The entire stack runs in Docker for clean, consistent environments across dev and production.',
    audience: ['Students', 'Junior Developers', 'Mid-Senior Engineers'],
    tech: [
      'React + TypeScript',
      'Laravel 13',
      'Ollama + Python',
      'MySQL',
      'Docker',
      'GitHub',
      'REST APIs',
    ],
    status: 'wip',
    link: 'https://kareeros.netlify.app',
  },
  {
    name: 'Clinora',
    industry: 'Healthcare',
    color: 'emerald',
    purpose: 'Offline + online EMR system for complete management of patients, clinics, medicines, and invoices — configured per clinic.',
    description:
      'Clinora is a full-featured Electronic Medical Records (EMR) system built to operate in both connected and air-gapped environments. Clinics manage patient records, appointment histories, medicine inventory, and billing — all without depending on internet access. When connectivity returns, data syncs seamlessly. Built on React with a Laravel 13 REST API and MySQL storage, the system includes automation scripts for reminders, report generation, and scheduled backups. Every clinic gets a customised configuration — forms, workflows, and invoice templates adapted to how they actually operate, not a one-size-fits-all solution they have to work around.',
    audience: ['Clinic Owners', 'Healthcare Administrators', 'Medical Staff', 'Pharmacists'],
    tech: [
      'React',
      'JavaScript',
      'Laravel 13',
      'MySQL',
      'Automation Scripts',
      'Offline-first Architecture',
      'Custom Workflows',
      'PDF Generation',
    ],
    status: 'wip',
    link: null,
  },
]

export default projects
