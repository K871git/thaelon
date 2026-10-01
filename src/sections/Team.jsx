import { useState, useCallback } from 'react'
import Modal from '../components/Modal'
import team from '../data/team'

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const FOCUS_AREAS = [
  'Full-Stack Architecture',
  'AI & LLM Systems',
  'Desktop App Engineering',
  'Clinical & Domain Software',
  'API Design',
  'DevOps & Deployment',
]

export default function Team() {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  return (
    <section className="section team-section" id="team" aria-labelledby="team-heading">
      <div className="container">
        <span className="section-label reveal">Who builds Thaelon</span>
        <h2 className="section-heading reveal" id="team-heading">Founder-led, craft-driven</h2>
        <p className="section-desc reveal" style={{ '--reveal-delay': '0.05s' }}>
          A single engineer who designs, builds, and ships — with a trusted network
          of specialists brought in for scope that needs it.
        </p>

        <div className="team__collective reveal" style={{ '--reveal-delay': '0.1s' }}>
          <button
            className="team__founder-card"
            onClick={() => setOpen(true)}
            aria-label="Meet Kishor Gangarde, founder of Thaelon — click to view full profile"
          >
            {/* decorative glow blobs */}
            <div className="team__founder-glow team__founder-glow--1" aria-hidden="true" />
            <div className="team__founder-glow team__founder-glow--2" aria-hidden="true" />

            {/* ── Profile header row: avatar + identity + stats ── */}
            <div className="team__founder-header">
              <div className="team__founder-avatar-wrap" aria-hidden="true">
                <div className="team__founder-avatar">KG</div>
                <div className="team__founder-badge" title="Specialist network">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
              </div>

              <div className="team__founder-identity">
                <h3 className="team__founder-name">Kishor Gangarde</h3>
                <span className="team__founder-role-badge">Founder &amp; Lead Engineer</span>
                <div className="team__founder-status">
                  <span className="team__founder-status-dot" aria-hidden="true" />
                  Available for projects
                </div>
                <div className="team__founder-socials">
                  <a href="https://github.com/K871git" target="_blank" rel="noopener noreferrer"
                    className="team__founder-social" aria-label="GitHub">
                    <GitHubIcon />
                  </a>
                  <a href="https://linkedin.com/in/kishor-gangarde" target="_blank" rel="noopener noreferrer"
                    className="team__founder-social" aria-label="LinkedIn">
                    <LinkedInIcon />
                  </a>
                </div>
              </div>

              <div className="team__founder-stats" aria-label="Quick stats">
                <div className="team__founder-stat">
                  <span className="team__founder-stat-val">2.5+</span>
                  <span className="team__founder-stat-key">Years</span>
                </div>
                <div className="team__founder-stat-sep" aria-hidden="true" />
                <div className="team__founder-stat">
                  <span className="team__founder-stat-val">2</span>
                  <span className="team__founder-stat-key">Products</span>
                </div>
                <div className="team__founder-stat-sep" aria-hidden="true" />
                <div className="team__founder-stat">
                  <span className="team__founder-stat-val">8+</span>
                  <span className="team__founder-stat-key">Caps</span>
                </div>
              </div>
            </div>

            {/* ── Horizontal divider ── */}
            <div className="team__founder-hdivider" aria-hidden="true" />

            {/* ── Detail: bio + focus + footer ── */}
            <div className="team__founder-detail">
              <p className="team__founder-bio">
                Architect and builder of Clinora and KareerOS. Takes on client work across
                AI systems, full-stack applications, and domain-specific software —
                from first brief to production deployment.
              </p>

              <div className="team__founder-focus">
                <span className="team__founder-focus-label">Focus areas</span>
                <div className="team__focus-tags">
                  {FOCUS_AREAS.map(f => (
                    <span key={f} className="team__focus-tag">{f}</span>
                  ))}
                </div>
              </div>

              <div className="team__founder-footer">
                <div className="team__founder-ships">
                  <span className="team__founder-ships-label">Ships</span>
                  <span className="team__founder-ship">Clinora</span>
                  <span className="team__founder-ship-dot" aria-hidden="true">·</span>
                  <span className="team__founder-ship">KareerOS</span>
                </div>
                <span className="team__collective-cta">View profile →</span>
              </div>
            </div>
          </button>
        </div>

        <div className="team__ghost-callout reveal" style={{ '--reveal-delay': '0.18s' }}>
          {/* ── header row ── */}
          <div className="team__ghost-callout-head">
            <div className="team__ghost-callout-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div className="team__ghost-callout-id">
              <h3 className="team__ghost-callout-title">The Ghost Team</h3>
              <p className="team__ghost-callout-tagline">On-demand specialist network</p>
            </div>
            <span className="team__ghost-callout-label">Vetted</span>
          </div>

          {/* ── description ── */}
          <p className="team__ghost-callout-desc">
            For projects that need more than one engineer — Thaelon works with a vetted network of specialist engineers who operate quietly in the background. Every engagement remains founder-led and directly accountable.
          </p>

          {/* ── specs + cta ── */}
          <div className="team__ghost-callout-footer">
            <div className="team__ghost-specs">
              {['UI/UX', 'Backend', 'AI & ML', 'Mobile', 'DevOps'].map(s => (
                <span key={s} className="team__ghost-spec">{s}</span>
              ))}
            </div>
            <a href="#contact" className="team__ghost-callout-cta">Work with us →</a>
          </div>
        </div>
      </div>

      <Modal isOpen={open} onClose={close} title="Kishor Gangarde">
        <div className="team-modal__members">
          {team.map(m => (
            <div key={m.name} className="team-modal__profile">

              {/* ── gradient header band ── */}
              <div className="team-modal__profile-band" aria-hidden="true">
                <div className="team-modal__band-orb team-modal__band-orb--1" />
                <div className="team-modal__band-orb team-modal__band-orb--2" />
              </div>

              {/* ── avatar + identity ── */}
              <div className="team-modal__profile-center">
                <div className="team-modal__avatar-wrap">
                  <div className="team-modal__avatar-ring" aria-hidden="true" />
                  <div className="team-modal__profile-avatar" aria-hidden="true">{m.initials}</div>
                </div>
                <h3 className="team-modal__profile-name">{m.name}</h3>
                <span className="team-modal__profile-role-badge">{m.role}</span>
                <p className="team-modal__profile-subtitle">Software Engineer · 2.5+ YOE</p>
                <div className="team-modal__profile-links">
                  {m.github && (
                    <a href={m.github} target="_blank" rel="noopener noreferrer"
                      className="team-modal__profile-link" aria-label={`${m.name} on GitHub`}>
                      <GitHubIcon />
                    </a>
                  )}
                  {m.linkedin && (
                    <a href={m.linkedin} target="_blank" rel="noopener noreferrer"
                      className="team-modal__profile-link" aria-label={`${m.name} on LinkedIn`}>
                      <LinkedInIcon />
                    </a>
                  )}
                </div>
                <div className="team-modal__stats">
                  <div className="team-modal__stat">
                    <span className="team-modal__stat-val">2.5+</span>
                    <span className="team-modal__stat-key">Years</span>
                  </div>
                  <div className="team-modal__stat-sep" aria-hidden="true" />
                  <div className="team-modal__stat">
                    <span className="team-modal__stat-val">2</span>
                    <span className="team-modal__stat-key">Products</span>
                  </div>
                  <div className="team-modal__stat-sep" aria-hidden="true" />
                  <div className="team-modal__stat">
                    <span className="team-modal__stat-val">8+</span>
                    <span className="team-modal__stat-key">Skills</span>
                  </div>
                </div>
              </div>

              {/* ── bio ── */}
              <p className="team-modal__profile-bio">{m.bio}</p>

              {/* ── tech stack ── */}
              {m.skills && m.skills.length > 0 && (
                <div className="team-modal__skills">
                  <p className="team-modal__section-label">Tech Stack</p>
                  <div className="team-modal__skill-tags">
                    {m.skills.map(s => (
                      <span key={s} className="team-modal__skill-tag">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* ── shipped products ── */}
              <div className="team-modal__products">
                <p className="team-modal__section-label">Shipped Products</p>
                <div className="team-modal__products-grid">
                  <div className="team-modal__product-card">
                    <div className="team-modal__product-icon team-modal__product-icon--clinora" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                      </svg>
                    </div>
                    <div className="team-modal__product-info">
                      <span className="team-modal__product-name">Clinora</span>
                      <span className="team-modal__product-type">Clinic Management · Desktop</span>
                    </div>
                  </div>
                  <div className="team-modal__product-card">
                    <div className="team-modal__product-icon team-modal__product-icon--kareeeros" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                      </svg>
                    </div>
                    <div className="team-modal__product-info">
                      <span className="team-modal__product-name">KareerOS</span>
                      <span className="team-modal__product-type">AI Interview Prep · Web</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}

          {/* ── specialist network ── */}
          <div className="team-modal__growing">
            <div className="team-modal__growing-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div>
              <strong>Working with specialists</strong>
              <p>
                For projects requiring additional expertise, Thaelon brings in vetted
                engineers from its network. Every engagement is still founder-led and
                directly accountable. <a href="#contact" onClick={close}>Start a conversation</a>.
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  )
}
