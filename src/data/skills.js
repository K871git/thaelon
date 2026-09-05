export const specializations = [
  'Full-Stack Development',
  'Software Engineering',
  'API Development & Integration',
  'Database Administration',
  'AI & LLM Engineering',
  'Desktop Application Development',
]

const skills = [
  {
    category: 'Languages',
    color: 'amber',
    desc: 'Core languages we write production code in.',
    items: ['JavaScript', 'PHP', 'Python', 'C++', 'C', 'Java'],
  },
  {
    category: 'Frontend',
    color: 'blue',
    desc: 'Interfaces that feel as good as they work.',
    items: ['React', 'TypeScript', 'Angular', 'HTML & CSS', 'Responsive Design', 'Accessibility'],
  },
  {
    category: 'Backend & APIs',
    color: 'emerald',
    desc: 'Servers, services, and the logic in between.',
    items: ['Node.js', 'Express', 'Laravel', 'FastAPI', 'REST APIs', 'WebSockets'],
  },
  {
    category: 'Databases',
    color: 'cyan',
    desc: 'Storing and querying data at any scale.',
    items: ['MongoDB', 'MySQL', 'PostgreSQL', 'ClickHouse', 'SQLite', 'Vector Databases'],
  },
  {
    category: 'DevOps',
    color: 'violet',
    desc: 'Shipping reliably and keeping things running.',
    items: ['Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Nginx', 'Linux Servers'],
  },
  {
    category: 'Automation',
    color: 'rose',
    desc: 'Making repetitive things disappear.',
    items: ['PowerShell', 'CMD', 'Linux / Bash', 'Shell Scripting', 'Task Scheduling', 'Web Scraping'],
  },
  {
    category: 'AI & LLMs',
    color: 'purple',
    desc: 'Building with large language models — from API calls to full pipelines.',
    items: [
      'Claude API (Anthropic)',
      'OpenAI / ChatGPT API',
      'Tokenization & Context Windows',
      'Prompt Engineering',
      'RAG (Retrieval-Augmented Generation)',
      'LangChain',
      'Vector Databases & Embeddings',
      'Local LLMs via Ollama',
      'Multi-agent Systems',
      'Tool Use & Function Calling',
    ],
  },
  {
    category: 'Desktop & Builds',
    color: 'orange',
    desc: 'Native apps and packaged executables for Windows, Mac, and Linux.',
    items: [
      'Electron',
      'PyInstaller (.exe)',
      'Tauri',
      'NSIS Installer',
      'Cross-platform Builds',
      'Windows APIs',
      'App Signing & Distribution',
    ],
  },
]

export default skills
