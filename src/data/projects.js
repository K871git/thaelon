// Add real projects only — never fabricate.
// Each project: { name, purpose, audience, tech, status, link }
const projects = [
  {
    name: 'KareerOS',
    purpose:
      'AI-powered placement preparation platform. Explains interview questions using a local LLM so every answer actually makes sense — not just memorised.',
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
]

export default projects
