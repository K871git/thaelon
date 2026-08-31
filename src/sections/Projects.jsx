import projects from '../data/projects'

export default function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-heading">
      <div className="container">
        <span className="section-label">Projects</span>
        <h2 className="section-heading" id="projects-heading">What we've shipped</h2>
        <p className="section-desc">Real work. Real problems solved.</p>

        {projects.length === 0 ? (
          <div className="projects__empty">
            <div className="projects__empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                <line x1="12" y1="12" x2="12" y2="16" />
                <line x1="10" y1="14" x2="14" y2="14" />
              </svg>
            </div>
            <p>Real projects will be listed here.<br />Nothing fabricated — only shipped work.</p>
          </div>
        ) : (
          <div className="projects__grid">
            {projects.map(p => (
              <article className="projects__card" key={p.name}>
                <div className="projects__card-header">
                  <h3>{p.name}</h3>
                  <span className={`projects__status projects__status--${p.status}`}>
                    {p.status}
                  </span>
                </div>
                <p className="projects__purpose">{p.purpose}</p>
                <ul className="projects__tech">
                  {p.tech.map(t => <li key={t}>{t}</li>)}
                </ul>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="projects__link"
                  >
                    View project →
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
