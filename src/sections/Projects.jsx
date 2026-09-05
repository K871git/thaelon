import { useState, useCallback } from 'react'
import projects from '../data/projects'
import Modal from '../components/Modal'

const PROJECT_ICONS = {
  KareerOS: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14z" />
    </svg>
  ),
  Clinora: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z" />
      <path d="M12 5v6M9 8h6" />
    </svg>
  ),
}

export default function Projects() {
  const [modal, setModal] = useState(null)
  const close = useCallback(() => setModal(null), [])

  return (
    <section className="section" id="projects" aria-labelledby="projects-heading">
      <div className="container">
        <span className="section-label reveal">Projects</span>
        <h2 className="section-heading reveal" id="projects-heading">What we've shipped</h2>
        <p className="section-desc reveal">Real work. Real problems solved.</p>

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
                data-color={p.color}
                style={{ '--reveal-delay': `${i * 0.08}s` }}
                role="button"
                tabIndex={0}
                aria-label={`View ${p.name} details`}
                onClick={() => setModal(p)}
                onKeyDown={e => e.key === 'Enter' && setModal(p)}
              >
                {PROJECT_ICONS[p.name] && (
                  <div className="projects__card-bg-icon" aria-hidden="true">
                    {PROJECT_ICONS[p.name]}
                  </div>
                )}

                <div className="projects__card-header">
                  <div className="projects__card-title-wrap">
                    {p.industry && (
                      <span className="projects__industry">{p.industry}</span>
                    )}
                    <h3>{p.name}</h3>
                  </div>
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
          <div className="project-modal" data-color={modal.color}>
            <div className="project-modal__header">
              <div className="project-modal__title-row">
                <div>
                  {modal.industry && (
                    <span className="projects__industry project-modal__industry">{modal.industry}</span>
                  )}
                  <h2 className="project-modal__name">{modal.name}</h2>
                </div>
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
                  {new URL(modal.link).hostname}
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
