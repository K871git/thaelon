const pillars = [
  {
    title: 'Requirement-Based',
    desc: 'We scope every project to what you actually need. No bloated packages, no unnecessary features forced into your budget.',
  },
  {
    title: 'Highly Affordable',
    desc: 'Competitive rates designed for startups, growing teams, and independent builders — quality without the enterprise price tag.',
  },
  {
    title: 'Fully Transparent',
    desc: "Clear cost breakdown before we start. You know exactly what you're paying for — no hidden fees, no scope surprises.",
  },
  {
    title: 'Flexible Scope',
    desc: "From a single feature to a full product — we adapt to your timeline and budget, not the other way around.",
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
          {pillars.map((p, i) => (
            <div
              className="pricing__card reveal"
              key={p.title}
              style={{ '--reveal-delay': `${i * 0.08}s` }}
            >
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
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
