// 24×24 stroke-style icons for every skill item

const S = (children) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
)

const B = (text) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.8" />
    <text x="12" y="16.5" textAnchor="middle" fill="currentColor"
      fontSize={text.length > 2 ? '6.5' : '8'} fontWeight="800" fontFamily="monospace">
      {text}
    </text>
  </svg>
)

const SKILL_ICONS = {
  // ── LANGUAGES ──
  'JavaScript': B('JS'),
  'PHP': B('PHP'),
  'Python': S(<>
    <path d="M12 2.5C9 2.5 7 3.8 7 5.5v2h10V5.5C17 3.8 15 2.5 12 2.5z" />
    <path d="M7 7.5H4C2.5 7.5 2 8.5 2 10v3c0 1.5.5 2.5 2 2.5h3" />
    <path d="M17 7.5h3c1.5 0 2 1 2 2.5v3c0 1.5-.5 2.5-2 2.5h-3" />
    <path d="M12 21.5c3 0 5-1.3 5-3v-2H7v2c0 1.7 2 3 5 3z" />
    <circle cx="9.5" cy="5" r="1" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="19" r="1" fill="currentColor" stroke="none" />
  </>),
  'C++': B('C++'),
  'C': B('C'),
  'Java': S(<>
    <path d="M9 19s-2.5-.5-2.5-2c0-2 3-2.5 5-2.5s5 .5 5 2.5-2.5 2-2.5 2" />
    <path d="M10 3.5s0 4 0 6 2 3.5 2 3.5" />
    <path d="M8 7.5c0 0 1.5-.5 4-.5s4 .5 4 .5" />
  </>),

  // ── FRONTEND ──
  'React': S(<>
    <circle cx="12" cy="12" r="2" />
    <ellipse cx="12" cy="12" rx="10" ry="3.5" />
    <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(-60 12 12)" />
  </>),
  'TypeScript': B('TS'),
  'Angular': S(<>
    <path d="M12 3L4 6.5l1.3 11L12 21l6.7-3.5L20 6.5z" />
    <path d="M9 16.5l1.2-3.5h3.6L15 16.5" />
    <path d="M10 13h4" />
  </>),
  'HTML & CSS': S(<>
    <path d="M4 3l1.3 15L12 21l6.7-3L21 3z" />
    <path d="M8 8h8l-.5 5.5-3.5 1-3.5-1-.2-2.5h7" />
  </>),
  'Responsive Design': S(<>
    <rect x="2" y="5" width="13" height="10" rx="2" />
    <path d="M19 8h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1" />
    <path d="M15 20h6" />
    <path d="M8 20v-5" />
  </>),
  'Accessibility': S(<>
    <circle cx="12" cy="4" r="2" />
    <path d="M4 8h16" />
    <path d="M8 8l1 12" />
    <path d="M16 8l-1 12" />
    <path d="M9 14h6" />
  </>),

  // ── BACKEND & APIs ──
  'Node.js': S(<>
    <path d="M12 2l9 5.2v9.6L12 22l-9-5.2V7.2z" />
    <path d="M12 7v5.5" />
    <path d="M9 9l3 3.5 3-3.5" />
  </>),
  'Express': B('Ex'),
  'Laravel': S(<>
    <path d="M3 17L12 22l9-5V7L12 2 3 7z" />
    <path d="M12 22V12" />
    <path d="M3 7l9 5 9-5" />
  </>),
  'FastAPI': S(<>
    <path d="M13 2L4 14h7l-1.5 8L19 10h-7z" />
  </>),
  'REST APIs': S(<>
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
    <path d="M3 5l2 2-2 2" />
    <path d="M3 17l2 2-2 2" />
  </>),
  'WebSockets': S(<>
    <path d="M4 8C4 8 8 3 12 3s8 5 8 5" />
    <path d="M4 16c0 0 4 5 8 5s8-5 8-5" />
    <line x1="12" y1="3" x2="12" y2="21" />
    <line x1="4" y1="12" x2="20" y2="12" />
  </>),

  // ── DATABASES ──
  'MongoDB': S(<>
    <path d="M12 2c-4 4.5-6 7.5-6 10a6 6 0 0 0 12 0C18 9.5 16 6.5 12 2z" />
    <line x1="12" y1="21.5" x2="12" y2="10" />
  </>),
  'MySQL': S(<>
    <ellipse cx="12" cy="6" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 6v12c0 1.66 4 3 9 3s9-1.34 9-3V6" />
  </>),
  'PostgreSQL': S(<>
    <ellipse cx="12" cy="5.5" rx="9" ry="3" />
    <path d="M3 5.5v13c0 1.66 4 3 9 3s9-1.34 9-3v-13" />
    <circle cx="19" cy="14" r="2.5" />
    <path d="M21.5 14h-2" />
  </>),
  'ClickHouse': S(<>
    <rect x="3" y="5" width="4" height="14" rx="1" />
    <rect x="10" y="9" width="4" height="10" rx="1" />
    <rect x="17" y="3" width="4" height="16" rx="1" />
  </>),
  'SQLite': S(<>
    <ellipse cx="12" cy="7" rx="7" ry="2.5" />
    <path d="M5 7v10c0 1.38 3.13 2.5 7 2.5S19 18.38 19 17V7" />
    <path d="M5 12c0 1.38 3.13 2.5 7 2.5S19 13.38 19 12" />
  </>),
  'Vector Databases': S(<>
    <circle cx="5" cy="5" r="2" />
    <circle cx="19" cy="5" r="2" />
    <circle cx="12" cy="19" r="2" />
    <circle cx="12" cy="12" r="2" />
    <line x1="7" y1="5" x2="10" y2="12" />
    <line x1="17" y1="5" x2="14" y2="12" />
    <line x1="12" y1="14" x2="12" y2="17" />
  </>),

  // ── DEVOPS ──
  'Docker': S(<>
    <rect x="5" y="5" width="3" height="3" rx="0.5" />
    <rect x="9.5" y="5" width="3" height="3" rx="0.5" />
    <rect x="14" y="5" width="3" height="3" rx="0.5" />
    <rect x="5" y="9.5" width="3" height="3" rx="0.5" />
    <rect x="9.5" y="9.5" width="3" height="3" rx="0.5" />
    <path d="M3 15c.5-2.5 2.5-4 5-4h9a4 4 0 0 1 0 8H8a5 5 0 0 1-5-4z" />
    <line x1="21" y1="13" x2="19" y2="13" />
  </>),
  'Kubernetes': S(<>
    <path d="M12 2l10 5.5v9L12 22 2 16.5v-9z" />
    <circle cx="12" cy="12" r="2" />
    <line x1="12" y1="4.5" x2="12" y2="10" />
    <line x1="12" y1="14" x2="12" y2="19.5" />
    <line x1="5" y1="8" x2="10" y2="11" />
    <line x1="14" y1="13" x2="19" y2="16" />
    <line x1="19" y1="8" x2="14" y2="11" />
    <line x1="10" y1="13" x2="5" y2="16" />
  </>),
  'GitHub Actions': S(<>
    <circle cx="12" cy="12" r="10" />
    <path d="M8.5 8a3.5 3.5 0 0 1 7 0v1a3.5 3.5 0 0 1-7 0z" />
    <path d="M12 12v4" />
    <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
  </>),
  'CI/CD': S(<>
    <path d="M12 2a10 10 0 1 0 10 10" />
    <polyline points="22 2 22 8 16 8" />
    <path d="M22 2l-5.3 5.3" />
    <circle cx="12" cy="12" r="3" />
  </>),
  'Nginx': B('Nx'),
  'Linux Servers': S(<>
    <rect x="2" y="3" width="20" height="7" rx="2" />
    <rect x="2" y="14" width="20" height="7" rx="2" />
    <circle cx="6" cy="6.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="6" cy="17.5" r="1" fill="currentColor" stroke="none" />
    <line x1="10" y1="6.5" x2="16" y2="6.5" />
    <line x1="10" y1="17.5" x2="16" y2="17.5" />
  </>),

  // ── AUTOMATION ──
  'PowerShell': S(<>
    <rect x="2" y="3" width="20" height="18" rx="2" />
    <path d="M7 8l4 4-4 4" />
    <line x1="14" y1="16" x2="19" y2="16" />
  </>),
  'CMD': S(<>
    <rect x="2" y="3" width="20" height="18" rx="2" />
    <line x1="7" y1="12" x2="11" y2="12" />
    <line x1="14" y1="9" x2="14" y2="15" />
    <line x1="17" y1="9" x2="17" y2="15" />
    <line x1="14" y1="12" x2="17" y2="12" />
  </>),
  'Linux / Bash': S(<>
    <rect x="2" y="3" width="20" height="18" rx="2" />
    <path d="M7 9l-2 3 2 3" />
    <line x1="11" y1="15" x2="15" y2="15" />
  </>),
  'Shell Scripting': S(<>
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </>),
  'Task Scheduling': S(<>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </>),
  'Web Scraping': S(<>
    <path d="M12 2a7 7 0 0 0-7 7c0 3 1.5 5.5 4 7l1 5h4l1-5c2.5-1.5 4-4 4-7a7 7 0 0 0-7-7z" />
    <line x1="10" y1="14.5" x2="14" y2="14.5" />
  </>),

  // ── AI & LLMs ──
  'Claude API (Anthropic)': S(<>
    <path d="M12 2l2.5 7.5H22l-6 4.5 2.5 7.5L12 17l-6.5 4.5 2.5-7.5L2 9.5h7.5z" />
  </>),
  'OpenAI / ChatGPT API': S(<>
    <circle cx="12" cy="12" r="9" />
    <line x1="9" y1="8" x2="15" y2="16" />
    <line x1="15" y1="8" x2="9" y2="16" />
    <path d="M7 8.5c0-2.5 2.3-4.5 5-4.5 2 0 3.7 1 4.5 2.5" />
    <path d="M17 15.5c0 2.5-2.3 4.5-5 4.5-2 0-3.7-1-4.5-2.5" />
  </>),
  'Tokenization & Context Windows': S(<>
    <rect x="2" y="6" width="20" height="4" rx="1" />
    <rect x="2" y="14" width="13" height="4" rx="1" />
    <rect x="17" y="14" width="5" height="4" rx="1" />
  </>),
  'Prompt Engineering': S(<>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <line x1="9" y1="10" x2="15" y2="10" />
    <line x1="9" y1="14" x2="12" y2="14" />
  </>),
  'RAG (Retrieval-Augmented Generation)': S(<>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <line x1="9" y1="9" x2="15" y2="9" />
    <line x1="9" y1="13" x2="12" y2="13" />
  </>),
  'LangChain': S(<>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </>),
  'Vector Databases & Embeddings': S(<>
    <circle cx="5" cy="5" r="2" />
    <circle cx="19" cy="5" r="2" />
    <circle cx="5" cy="19" r="2" />
    <circle cx="19" cy="19" r="2" />
    <circle cx="12" cy="12" r="2" />
    <line x1="7" y1="5" x2="10" y2="12" />
    <line x1="17" y1="5" x2="14" y2="12" />
    <line x1="7" y1="19" x2="10" y2="12" />
    <line x1="17" y1="19" x2="14" y2="12" />
  </>),
  'Local LLMs via Ollama': S(<>
    <rect x="3" y="3" width="18" height="14" rx="2" />
    <circle cx="8.5" cy="10" r="2" />
    <circle cx="15.5" cy="10" r="2" />
    <line x1="5" y1="17" x2="5" y2="21" />
    <line x1="19" y1="17" x2="19" y2="21" />
    <line x1="3" y1="21" x2="21" y2="21" />
  </>),
  'Multi-agent Systems': S(<>
    <circle cx="5" cy="12" r="3" />
    <circle cx="19" cy="5" r="3" />
    <circle cx="19" cy="19" r="3" />
    <line x1="8" y1="11.5" x2="16" y2="6.5" />
    <line x1="8" y1="12.5" x2="16" y2="17.5" />
  </>),
  'Tool Use & Function Calling': S(<>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" />
  </>),

  // ── DESKTOP & BUILDS ──
  'Electron': S(<>
    <rect x="2" y="3" width="20" height="13" rx="2" />
    <circle cx="12" cy="9.5" r="1.5" />
    <ellipse cx="12" cy="9.5" rx="6.5" ry="2.2" />
    <ellipse cx="12" cy="9.5" rx="6.5" ry="2.2" transform="rotate(60 12 9.5)" />
    <line x1="8" y1="20" x2="16" y2="20" />
    <line x1="12" y1="16" x2="12" y2="20" />
  </>),
  'PyInstaller (.exe)': S(<>
    <path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73L11 21.73a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z" />
    <line x1="12" y1="22" x2="12" y2="12" />
    <line x1="21" y1="7" x2="12" y2="12" />
    <line x1="3" y1="7" x2="12" y2="12" />
  </>),
  'Tauri': B('TR'),
  'NSIS Installer': S(<>
    <path d="M12 2l10 5.5-10 5.5L2 7.5z" />
    <path d="M2 12l10 5.5L22 12" />
    <path d="M2 16.5L12 22l10-5.5" />
  </>),
  'Cross-platform Builds': S(<>
    <rect x="2" y="2" width="9" height="9" rx="1" />
    <rect x="13" y="2" width="9" height="9" rx="1" />
    <rect x="2" y="13" width="9" height="9" rx="1" />
    <rect x="13" y="13" width="9" height="9" rx="1" />
  </>),
  'Windows APIs': S(<>
    <path d="M3 5.5L10.5 4v7.5H3z" />
    <path d="M11.5 3.8L21 2.5V12h-9.5z" />
    <path d="M3 12.5h7.5V20L3 18.5z" />
    <path d="M11.5 12.5H21v9l-9.5-1.3z" />
  </>),
  'App Signing & Distribution': S(<>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </>),
}

export default SKILL_ICONS
