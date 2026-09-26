const values = [
  {
    label: 'Shipped, not just built',
    desc: 'Two live products in production. Every client project goes live — not into a drawer.',
    color: 'emerald',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    label: 'Deep, not broad',
    desc: '8 engineering layers. One team. No handoffs between specialists who never talk to each other.',
    color: 'violet',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    ),
  },
  {
    label: 'Honest from the start',
    desc: 'Scope is defined before a line of code is written. Price doesn\'t change unless the spec does.',
    color: 'amber',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
      </svg>
    ),
  },
]

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-heading">
      <div className="container">
        <div className="about__inner">
          <div className="about__text">
            <span className="section-label reveal">About</span>
            <h2 className="section-heading reveal" id="about-heading">
              Built by engineers<br />who ship
            </h2>
            <p className="about__body reveal" style={{ '--reveal-delay': '0.08s' }}>
              Thaelon has shipped two production systems — Clinora, a full-featured
              clinic management desktop app running in medical practices, and KareerOS,
              an AI-powered interview prep platform. We build our own products because
              we believe the best engineers ship, not just consult.
            </p>
            <p className="about__body reveal" style={{ '--reveal-delay': '0.14s' }}>
              We take on client work where we can deliver something real — AI
              integrations with actual inference pipelines, full-stack applications that
              hold up under load, and offline-first systems for environments where the
              internet isn't reliable. We don't take projects we can't finish.
            </p>
            <p className="about__body reveal" style={{ '--reveal-delay': '0.20s' }}>
              Engagements are scoped clearly, priced honestly, and delivered on a
              defined timeline. No retainers that go nowhere. No feature creep. If
              something can't be done within your budget, we tell you before we start.
            </p>
          </div>

          <div className="about__values">
            {values.map((v, i) => (
              <div
                className="about__value-card reveal"
                key={v.label}
                data-color={v.color}
                style={{ '--reveal-delay': `${i * 0.1}s` }}
              >
                <div className="about__value-icon" aria-hidden="true">{v.icon}</div>
                <h3>{v.label}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
