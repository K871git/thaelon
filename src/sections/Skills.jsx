import { useState, useCallback } from 'react'
import skills, { specializations } from '../data/skills'
import Modal from '../components/Modal'

const ICONS = {
  Languages: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Frontend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  'Backend & APIs': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <circle cx="7" cy="6" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="7" cy="18" r="1.2" fill="currentColor" stroke="none" />
      <line x1="11" y1="6" x2="18" y2="6" />
      <line x1="11" y1="18" x2="18" y2="18" />
    </svg>
  ),
  Databases: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  DevOps: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <path d="M18 9v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
      <line x1="12" y1="12" x2="12" y2="15" />
    </svg>
  ),
  Automation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
}

function tilt(e) {
  const el = e.currentTarget
  el.classList.remove('skills__card--resetting')
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  el.style.setProperty('--rx', `${(-y * 7).toFixed(1)}deg`)
  el.style.setProperty('--ry', `${(x * 7).toFixed(1)}deg`)
}

function untilt(e) {
  const el = e.currentTarget
  el.classList.add('skills__card--resetting')
  el.style.setProperty('--rx', '0deg')
  el.style.setProperty('--ry', '0deg')
}

export default function Skills() {
  const [modal, setModal] = useState(null)
  const close = useCallback(() => setModal(null), [])

  return (
    <section className="section" id="skills" aria-labelledby="skills-heading">
      <div className="container">
        <span className="section-label reveal">Capabilities</span>
        <h2 className="section-heading reveal" id="skills-heading">What we build with</h2>
        <p className="section-desc reveal" style={{ '--reveal-delay': '0.05s' }}>
          We focus on what we can actually deliver — not just what we know.
        </p>

        <div className="skills__specializations reveal" style={{ '--reveal-delay': '0.1s' }}>
          {specializations.map(s => (
            <span key={s} className="skills__spec-tag">{s}</span>
          ))}
        </div>

        <div className="skills__grid">
          {skills.map((group, i) => (
            <div
              key={group.category}
              className="skills__card reveal"
              data-color={group.color}
              style={{ '--reveal-delay': `${i * 0.07}s` }}
              role="button"
              tabIndex={0}
              aria-label={`View ${group.category} skills`}
              onClick={() => setModal(group)}
              onKeyDown={e => e.key === 'Enter' && setModal(group)}
              onMouseMove={tilt}
              onMouseLeave={untilt}
            >
              <div className="skills__card-icon">{ICONS[group.category]}</div>
              <h3 className="skills__category">{group.category}</h3>
              <p className="skills__desc">{group.desc}</p>
              <ul className="skills__tags">
                {group.items.slice(0, 4).map(item => (
                  <li key={item}>{item}</li>
                ))}
                {group.items.length > 4 && (
                  <li className="skills__tags-more">+{group.items.length - 4}</li>
                )}
              </ul>
              <span className="skills__card-cta" aria-hidden="true">Click to expand →</span>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={!!modal} onClose={close} title={modal?.category}>
        {modal && (
          <div data-color={modal.color}>
            <div className="skills-modal__header">
              <span className="section-label">{modal.category}</span>
              <p>{modal.desc}</p>
            </div>
            <ul className="skills-modal__items">
              {modal.items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </section>
  )
}
