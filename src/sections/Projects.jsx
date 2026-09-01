import { useState, useCallback } from 'react'
import projects from '../data/projects'
import Modal from '../components/Modal'

export default function Projects() {
  const [modal, setModal] = useState(null)
  const close = useCallback(() => setModal(null), [])

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
            {projects.map((p, i) => (
              <article
                className="projects__card reveal"
                key={p.name}
                style={{ '--reveal-delay': `${i * 0.08}s` }}
                role="button"
                tabIndex={0}
                aria-label={`View ${p.name} details`}
                onClick={() => setModal(p)}
                onKeyDown={e => e.key === 'Enter' && setModal(p)}
              >
                <div className="projects__card-header">
                  <h3>{p.name}</h3>
                  <span className={`projects__status projects__status--${p.status}`}>
                    {p.status}
                  </span>
                </div>
                <p className="projects__purpose">{p.purpose}</p>
                {p.audience && p.audience.length > 0 && (
                  <div className="projects__audience">
                    <span className="projects__audience-label">Built for</span>
                    <ul>
                      {p.audience.map(a => <li key={a}>{a}</li>)}
                    </ul>
                  </div>
                )}
                <ul className="projects__tech">
                  {p.tech.slice(0, 4).map(t => <li key={t}>{t}</li>)}
                  {p.tech.length > 4 && (
                    <li className="projects__tech-more">+{p.tech.length - 4} more</li>
                  )}
                </ul>
                <span className="projects__card-cta" aria-hidden="true">View full details →</span>
              </article>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={!!modal} onClose={close} title={modal?.name} className="modal--project">
        {modal && (
          <div className="project-modal">
            <div className="project-modal__header">
              <div className="project-modal__title-row">
                <h2 className="project-modal__name">{modal.name}</h2>
                <span className={`projects__status projects__status--${modal.status}`}>
                  {modal.status}
                </span>
              </div>
              {modal.link && (
                <a
                  href={modal.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-modal__live-link"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  kareeros.netlify.app
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="project-modal__ext-icon">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
            </div>

            <div className="project-modal__section">
              <span className="project-modal__label">What it does</span>
              <p className="project-modal__desc">{modal.description || modal.purpose}</p>
            </div>

            {modal.audience && modal.audience.length > 0 && (
              <div className="project-modal__section">
                <span className="project-modal__label">Built for</span>
                <ul className="project-modal__audience">
                  {modal.audience.map(a => <li key={a}>{a}</li>)}
                </ul>
              </div>
            )}

            <div className="project-modal__section">
              <span className="project-modal__label">Stack</span>
              <ul className="project-modal__tech">
                {modal.tech.map(t => <li key={t}>{t}</li>)}
              </ul>
            </div>

            {modal.link && (
              <a
                href={modal.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-modal__action-btn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                View live project
              </a>
            )}
          </div>
        )}
      </Modal>
    </section>
  )
}
