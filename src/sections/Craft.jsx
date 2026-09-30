const CAPABILITIES = [
  {
    label: 'ERP',
    sub: 'Fully custom enterprise resource planning — built around your exact workflow',
    color: '#6d28d9',
    dim: 'rgba(109,40,217,.13)',
    glow: 'rgba(109,40,217,.38)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="8" rx="2"/>
        <rect x="2" y="14" width="20" height="8" rx="2"/>
        <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="2.5"/>
        <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="2.5"/>
      </svg>
    ),
  },
  {
    label: 'Custom Software',
    sub: 'Any problem, any domain — engineered from scratch to your exact spec',
    color: '#8b5cf6',
    dim: 'rgba(139,92,246,.13)',
    glow: 'rgba(139,92,246,.38)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
        <line x1="12" y1="2" x2="12" y2="22" strokeDasharray="2 3"/>
      </svg>
    ),
  },
  {
    label: 'Web App',
    sub: 'Full-stack tools your team actually trusts day to day',
    color: '#a78bfa',
    dim: 'rgba(167,139,250,.13)',
    glow: 'rgba(167,139,250,.38)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <polyline points="8 21 12 17 16 21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    label: 'Website',
    sub: 'Fast, striking, conversion-focused — built to impress on every device',
    color: '#818cf8',
    dim: 'rgba(129,140,248,.13)',
    glow: 'rgba(129,140,248,.38)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    label: 'AI / RAG Bot',
    sub: 'Intelligent assistants that explain, reason, and adapt — not just list',
    color: '#60a5fa',
    dim: 'rgba(96,165,250,.13)',
    glow: 'rgba(96,165,250,.38)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z"/>
        <circle cx="9" cy="14" r="1" fill="currentColor" stroke="none"/>
        <circle cx="15" cy="14" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
]

const SERVICES = [
  {
    color: 'violet',
    label: 'Bug Hunting',
    desc: 'We dig deep — not just symptoms, but the root cause hiding underneath.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="11" y1="8" x2="11" y2="14"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    ),
  },
  {
    color: 'emerald',
    label: 'Bug Fixing',
    desc: 'Root cause resolution. We patch the problem, not the symptom.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    color: 'amber',
    label: 'Product Repair',
    desc: 'We inherit broken or abandoned codebases and make them production-ready.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10"/>
        <polyline points="23 20 23 14 17 14"/>
        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/>
      </svg>
    ),
  },
  {
    color: 'blue',
    label: 'Code Restructuring',
    desc: 'Legacy chaos to clean architecture — your users will feel the difference.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="6" y1="3" x2="6" y2="15"/>
        <circle cx="18" cy="6" r="3"/>
        <circle cx="6" cy="18" r="3"/>
        <path d="M18 9a9 9 0 0 1-9 9"/>
      </svg>
    ),
  },
]

const PROMISES = [
  {
    color: 'violet',
    title: 'Built only for you',
    desc: 'No templates. No recycled code. Every component written from scratch for your product and your users — zero shortcuts.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    color: 'emerald',
    title: 'Security by default',
    desc: 'Auth, encryption, input validation — woven into the first line of code, not patched on at the end when it is too late.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    color: 'amber',
    title: 'Deployed, not just delivered',
    desc: 'A live, working product in your hands — not a zip file and a handshake. We handle every step from local build to production server.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    ),
  },
  {
    color: 'blue',
    title: "We stay until it's right",
    desc: "Post-launch support until you'd stake your business on it. We don't disappear after go-live — your success is our reputation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
]

export default function Craft() {
  return (
    <section className="section craft" id="craft" aria-labelledby="craft-heading">
      <div className="container">

        <span className="section-label reveal">Our Craft</span>
        <h2 className="section-heading craft__heading reveal" id="craft-heading">
          You bring the idea,<br />
          we deliver the vision.
        </h2>
        <p className="section-desc reveal" style={{ '--reveal-delay': '0.05s' }}>
          From a simple AI assistant to a fully custom ERP — whatever you need built,
          we scope it, code it, secure it, and deploy it. Every penny you invest comes
          back as a product you are proud to put your name on.
        </p>

        {/* ── Spectrum range label ── */}
        <div className="craft__spectrum-range reveal" style={{ '--reveal-delay': '0.08s' }} aria-hidden="true">
          <span>Enterprise</span>
          <span>Lightweight</span>
        </div>

        {/* ── Capability Spectrum ── */}
        <div className="craft__spectrum reveal" style={{ '--reveal-delay': '0.1s' }} aria-label="Our capability range">
          <div className="craft__track" aria-hidden="true">
            <div className="craft__track-fill" />
          </div>
          {CAPABILITIES.map((cap, i) => (
            <div
              key={cap.label}
              className="craft__stop"
              style={{
                '--stop-i': i,
                '--stop-color': cap.color,
                '--stop-dim': cap.dim,
                '--stop-glow': cap.glow,
              }}
            >
              <div className="craft__stop-node" aria-hidden="true">
                {cap.icon}
              </div>
              <span className="craft__stop-label">{cap.label}</span>
              <span className="craft__stop-sub">{cap.sub}</span>
            </div>
          ))}
        </div>

        {/* ── Also in our toolkit ── */}
        <div className="craft__also reveal" style={{ '--reveal-delay': '0.06s' }}>
          <span className="craft__also-label" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="13" height="13"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            Also in our toolkit
          </span>
          <div className="craft__services">
            {SERVICES.map((s, i) => (
              <div
                key={s.label}
                className="craft__service reveal"
                data-color={s.color}
                style={{ '--reveal-delay': `${i * 0.06}s` }}
              >
                <div className="craft__service-icon" aria-hidden="true">{s.icon}</div>
                <div className="craft__service-body">
                  <strong className="craft__service-label">{s.label}</strong>
                  <p className="craft__service-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Promise cards ── */}
        <div className="craft__promises">
          {PROMISES.map((p, i) => (
            <div
              key={p.title}
              className="craft__promise reveal"
              data-color={p.color}
              style={{ '--reveal-delay': `${i * 0.07}s` }}
            >
              <div className="craft__promise-icon" aria-hidden="true">{p.icon}</div>
              <h3 className="craft__promise-title">{p.title}</h3>
              <p className="craft__promise-desc">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* ── CTA strip ── */}
        <div className="craft__cta reveal" style={{ '--reveal-delay': '0.1s' }}>
          <p className="craft__cta-line">
            From your first idea to your{' '}
            <em>last deployment</em>
            {' '}— let&apos;s scope it together.
          </p>
          <a href="#contact" className="btn btn-primary craft__cta-btn">
            Get a free estimate
          </a>
        </div>

      </div>
    </section>
  )
}
