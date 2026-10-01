import { useState } from 'react'

const EMAIL    = 'gangardekishor87@gmail.com'
const GITHUB   = 'https://github.com/K871git'
const PHONE    = '+91-7499621927'
const WEB3FORMS_KEY = '32ac9a3e-02e5-4404-a0b3-c79fa1515de7'

const PROJECT_TYPES = [
  'ERP', 'Custom Software', 'Web App', 'Website', 'AI / RAG Bot', 'Bug Fix / Repair', 'Something else',
]

const BUDGET_OPTIONS = [
  { value: '',                    label: 'Budget range (optional)' },
  { value: 'Under ₹50,000',      label: 'Under ₹50,000' },
  { value: '₹50k – ₹2L',         label: '₹50,000 – ₹2,00,000' },
  { value: '₹2L – ₹5L',          label: '₹2,00,000 – ₹5,00,000' },
  { value: 'Above ₹5L',          label: 'Above ₹5,00,000' },
  { value: 'Custom / Discuss',   label: "Custom — let's discuss" },
]

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 7 10-7" />
  </svg>
)

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l.91-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="16" height="16">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

export default function Contact() {
  const [status, setStatus]           = useState('idle')
  const [projectType, setProjectType] = useState('')

  function toggleType(t) {
    setProjectType(prev => (prev === t ? '' : t))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const formData = new FormData(e.target)
    formData.append('access_key', WEB3FORMS_KEY)
    formData.append('subject',    'New project inquiry — Thaelon.com')
    formData.append('from_name',  'Thaelon Website')
    formData.append('botcheck',   '')
    try {
      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.success) { setStatus('success'); e.target.reset(); setProjectType('') }
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-heading">
      <div className="container">

        {/* ── Section header ── */}
        <div className="contact__head reveal">
          <span className="section-label">Get in touch</span>
          <h2 className="section-heading" id="contact-heading">
            Let's scope it together
          </h2>
          <p className="section-desc" style={{ '--reveal-delay': '0.04s' }}>
            No forms that vanish into a CRM. Every message is read personally
            and answered with a real estimate — not a sales pitch.
          </p>
        </div>

        {/* ── Two-column panel ── */}
        <div className="contact__panel">

          {/* ── Left: info strip ── */}
          <aside className="contact__info reveal" style={{ '--reveal-delay': '0.06s' }}
            aria-label="Contact information">

            <div className="contact__info-badge">
              <span className="contact__info-dot" aria-hidden="true" />
              Accepting new projects
            </div>

            <p className="contact__info-tagline">
              Every message lands directly in the builder's inbox — no middleman,
              no templates, no sales pipeline.
            </p>

            <ul className="contact__trust" role="list">
              {[
                'Free estimate — no commitment',
                'Reply within 24 hours, always',
                'Honest scoping, fixed price',
              ].map(point => (
                <li key={point}>
                  <span className="contact__trust-icon" aria-hidden="true"><CheckIcon /></span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="contact__links" role="list">
              <a href={`mailto:${EMAIL}`} className="contact__link" role="listitem">
                <span className="contact__link-icon"><EmailIcon /></span>
                <span className="contact__link-body">
                  <span className="contact__link-label">Email</span>
                  <span className="contact__link-value">{EMAIL}</span>
                </span>
              </a>
              <a href={`tel:${PHONE}`} className="contact__link" role="listitem">
                <span className="contact__link-icon"><PhoneIcon /></span>
                <span className="contact__link-body">
                  <span className="contact__link-label">Phone / WhatsApp</span>
                  <span className="contact__link-value">{PHONE}</span>
                </span>
              </a>
              <a href={GITHUB} className="contact__link" role="listitem"
                target="_blank" rel="noopener noreferrer">
                <span className="contact__link-icon contact__link-icon--github"><GithubIcon /></span>
                <span className="contact__link-body">
                  <span className="contact__link-label">GitHub</span>
                  <span className="contact__link-value">K871git — see our work</span>
                </span>
              </a>
            </div>

          </aside>

          {/* ── Right: form card ── */}
          <div className="contact__form-card reveal" style={{ '--reveal-delay': '0.1s' }}>

            {status === 'success' ? (
              <div className="contact__success">
                <div className="contact__success-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className="contact__success-title">Message sent</h3>
                <p className="contact__success-text">
                  We've received your message and will reply with a detailed
                  estimate within 24 hours.
                </p>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <input type="checkbox" name="botcheck" style={{ display: 'none' }} />
                <input type="hidden" name="project_type" value={projectType} />

                {/* Project type chips */}
                <div className="contact__type-wrap">
                  <p className="contact__type-heading">What are you building?</p>
                  <div className="contact__type-chips" role="group" aria-label="Project type">
                    {PROJECT_TYPES.map(t => (
                      <button
                        key={t}
                        type="button"
                        className={`contact__type-chip${projectType === t ? ' contact__type-chip--on' : ''}`}
                        onClick={() => toggleType(t)}
                        aria-pressed={projectType === t}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="contact__form-row">
                  <div className="contact__form-field">
                    <label htmlFor="cf-name">Name</label>
                    <input
                      id="cf-name" type="text" name="name"
                      placeholder="Your name" required autoComplete="name"
                    />
                  </div>
                  <div className="contact__form-field">
                    <label htmlFor="cf-email">Email</label>
                    <input
                      id="cf-email" type="email" name="email"
                      placeholder="you@example.com" required autoComplete="email"
                    />
                  </div>
                </div>

                <div className="contact__form-field">
                  <label htmlFor="cf-project">Describe your project</label>
                  <input
                    id="cf-project" type="text" name="project"
                    placeholder="e.g. A booking system for my clinic, an AI assistant for our support team…"
                    required
                  />
                </div>

                <div className="contact__form-row">
                  <div className="contact__form-field">
                    <label htmlFor="cf-budget">Budget range</label>
                    <select id="cf-budget" name="budget">
                      {BUDGET_OPTIONS.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="contact__form-field">
                    <label htmlFor="cf-timeline">Timeline</label>
                    <select id="cf-timeline" name="timeline">
                      <option value="">Timeline (optional)</option>
                      <option value="ASAP">As soon as possible</option>
                      <option value="1 month">Within 1 month</option>
                      <option value="1–3 months">1–3 months</option>
                      <option value="3+ months">3+ months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="contact__form-field">
                  <label htmlFor="cf-message">
                    Additional context{' '}
                    <span className="contact__form-optional">optional</span>
                  </label>
                  <textarea
                    id="cf-message" name="message" rows={3}
                    placeholder="Tech stack preferences, must-haves, constraints, or any questions…"
                  />
                </div>

                <button
                  type="submit"
                  className="contact__form-submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <span className="contact__form-spinner" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send — we'll reply within 24 hours
                      <ArrowIcon />
                    </>
                  )}
                </button>

                {status === 'error' && (
                  <p className="contact__form-error">
                    Something went wrong. Email us directly at{' '}
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                  </p>
                )}

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
