const PILLARS = [
  {
    title: 'Requirement-Based',
    desc: 'We scope every project to what you actually need. No bloated packages, no unnecessary features forced into your budget.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    ),
  },
  {
    title: 'Highly Affordable',
    desc: 'Competitive rates designed for startups, growing teams, and independent builders — quality without the enterprise price tag.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
  },
  {
    title: 'Fully Transparent',
    desc: "Clear cost breakdown before we start. You know exactly what you're paying for — no hidden fees, no scope surprises.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: 'Flexible Scope',
    desc: "From a single feature to a full product — we adapt to your timeline and budget, not the other way around.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
        <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
      </svg>
    ),
  },
]

const TIERS = [
  {
    label: 'Single Feature',
    desc: 'One isolated feature, API integration, or sprint-sized fix.',
    duration: '1 day to 1 week',
    from: '₹2,500',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    label: 'Full Module',
    desc: 'Complete feature set — backend, frontend, tests, and documentation.',
    duration: '2 to 4 weeks',
    from: '₹12,000',
    featured: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Full Product',
    desc: 'Discovery through launch — architecture, build, testing, deployment.',
    duration: '1 to 2 months',
    from: '₹40,000',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
]

export default function Pricing() {
  return (
    <section className="section pricing" id="pricing" aria-labelledby="pricing-heading">
      <div className="container">
        <span className="section-label reveal">Pricing</span>
        <h2 className="section-heading reveal" id="pricing-heading">Built for your budget</h2>
        <p className="section-desc reveal" style={{ '--reveal-delay': '0.05s' }}>
          Pricing that adapts to what you actually need — not what we want to sell.
        </p>

        <div className="pricing__grid">
          {PILLARS.map((p, i) => (
            <div
              className="pricing__card reveal"
              key={p.title}
              style={{ '--reveal-delay': `${i * 0.08}s` }}
            >
              <div className="pricing__card-icon" aria-hidden="true">{p.icon}</div>
              <h3 className="pricing__card-title">{p.title}</h3>
              <p className="pricing__card-desc">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Scope tiers */}
        <div className="pricing__tiers reveal" style={{ '--reveal-delay': '0.12s' }}>
          <p className="pricing__tiers-label">What does a typical project look like?</p>
          <div className="pricing__tiers-grid">
            {TIERS.map((t, i) => (
              <div
                key={t.label}
                className={`pricing__tier${t.featured ? ' pricing__tier--featured' : ''}`}
                style={{ '--reveal-delay': `${i * 0.08}s` }}
              >
                {t.featured && (
                  <div className="pricing__tier-badge">Most Popular</div>
                )}
                <div className="pricing__tier-icon" aria-hidden="true">{t.icon}</div>
                <div className="pricing__tier-body">
                  <strong className="pricing__tier-label">{t.label}</strong>
                  <p className="pricing__tier-desc">{t.desc}</p>
                  <div className="pricing__tier-meta">
                    <span className="pricing__tier-duration">{t.duration}</span>
                    {t.from && (
                      <span className="pricing__tier-from">From {t.from}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="pricing__tiers-note">
            All pricing is custom — these are typical timelines, not fixed packages.
          </p>
        </div>

        <div className="pricing__cta reveal" style={{ '--reveal-delay': '0.1s' }}>
          <h3>Every project starts with a free estimate</h3>
          <p>
            Tell us what you need. We'll scope it, price it fairly, and be honest
            about what's possible within your budget.
          </p>
          <a href="#contact" className="btn btn-primary">Get a free estimate</a>
        </div>
      </div>
    </section>
  )
}
