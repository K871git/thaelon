import { useState, useCallback } from 'react'
import skills, { specializations } from '../data/skills'
import SKILL_ICONS from '../data/skillIcons'
import Modal from '../components/Modal'

const CAPABILITIES = [
  {
    name: 'CS Fundamentals',
    level: 'extreme',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    name: 'System Design & Architecture',
    level: 'extreme',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    name: 'Production Engineering',
    level: 'extreme',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07" />
      </svg>
    ),
  },
  {
    name: 'Security & Reliability',
    level: 'extreme',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    name: 'AI & Agent Engineering',
    level: 'extreme',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="4" cy="6" r="2" /><circle cx="4" cy="18" r="2" />
        <circle cx="12" cy="12" r="2" /><circle cx="20" cy="6" r="2" /><circle cx="20" cy="18" r="2" />
        <path d="M6 6.8 10 11M6 17.2 10 13M14 11l4-4.2M14 13l4 4.2" />
      </svg>
    ),
  },
  {
    name: 'Domain Expertise',
    level: 'extreme',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" />
        <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" /><line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
        <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" /><line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
      </svg>
    ),
  },
  {
    name: 'Product & Business Judgment',
    level: 'high',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.5-1.5 4.5-3 6H8c-1.5-1.5-3-3.5-3-6a7 7 0 0 1 7-7z" />
      </svg>
    ),
  },
  {
    name: 'Communication & Leadership',
    level: 'high',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
]

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
  'AI & LLMs': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="4" cy="6" r="2" />
      <circle cx="4" cy="18" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="20" cy="6" r="2" />
      <circle cx="20" cy="18" r="2" />
      <line x1="6" y1="6.8" x2="10" y2="11" />
      <line x1="6" y1="17.2" x2="10" y2="13" />
      <line x1="14" y1="11" x2="18" y2="6.8" />
      <line x1="14" y1="13" x2="18" y2="17.2" />
    </svg>
  ),
  'Desktop & Builds': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73L11 21.73a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
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

        {/* Next-gen engineering capabilities */}
        <div className="capabilities">
          <div className="capabilities__intro reveal" style={{ '--reveal-delay': '0.05s' }}>
            <span className="capabilities__eyebrow">Next-Gen Engineering</span>
            <h3 className="capabilities__heading">Built for the AI era</h3>
            <p className="capabilities__sub">
              Most engineering teams are deep in one layer and shallow everywhere else. That
              worked before. AI-era products break at the seams — between model and API,
              API and frontend, code and cloud, logic and business decision. Thaelon was
              built to be the team that goes deep across all eight, so the product holds
              together end to end — not just the part one person owns.
            </p>
          </div>
          <div className="capabilities__grid">
            {CAPABILITIES.map((cap, i) => (
              <div
                key={cap.name}
                className={`capabilities__item reveal capabilities__item--${cap.level}`}
                style={{ '--reveal-delay': `${i * 0.05}s` }}
              >
                <div className="capabilities__icon-wrap" aria-hidden="true">{cap.icon}</div>
                <div className="capabilities__body">
                  <span className="capabilities__name">{cap.name}</span>
                  <span className="capabilities__badge">
                    {cap.level === 'extreme' ? 'Core' : 'High'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={!!modal} onClose={close} title={modal?.category}>
        {modal && (
          <div data-color={modal.color}>
            <div className="skills-modal__header">
              <div className="skills-modal__icon-wrap" aria-hidden="true">
                {ICONS[modal.category]}
              </div>
              <span className="section-label">{modal.category}</span>
              <p>{modal.desc}</p>
            </div>
            <ul className="skills-modal__items">
              {modal.items.map(item => (
                <li key={item}>
                  {SKILL_ICONS[item] && (
                    <span className="skills-modal__item-icon">{SKILL_ICONS[item]}</span>
                  )}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </section>
  )
}
