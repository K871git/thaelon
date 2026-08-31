const steps = [
  {
    number: '01',
    title: 'Discover',
    desc: 'We start by deeply understanding your problem, goals, and users — not rushing to solutions. The right question is worth more than the wrong answer.',
    activities: ['Requirements gathering', 'Technical assessment', 'Scope definition', 'Timeline planning'],
  },
  {
    number: '02',
    title: 'Design',
    desc: 'Architecture, technical planning, and direction decided before production code. Good systems are designed, not stumbled into.',
    activities: ['System architecture', 'Data modeling', 'API contract design', 'Component breakdown'],
  },
  {
    number: '03',
    title: 'Build',
    desc: 'Clean, tested, maintainable code. We build as if another developer — or your future self — will need to understand it tomorrow.',
    activities: ['Feature development', 'Code review', 'Testing', 'Documentation'],
  },
  {
    number: '04',
    title: 'Ship',
    desc: "Deployment, monitoring, and a smooth launch. We don't hand over code and disappear — we make sure it's running properly.",
    activities: ['Deployment pipeline', 'Environment setup', 'Launch verification', 'Monitoring'],
  },
  {
    number: '05',
    title: 'Evolve',
    desc: 'Real software improves after launch. We iterate based on actual usage, not assumptions. Ideas become better products over time.',
    activities: ['Usage analysis', 'Performance profiling', 'Bug resolution', 'Feature iteration'],
  },
]

export default function Process() {
  return (
    <section className="section process" id="process" aria-labelledby="process-heading">
      <div className="container">
        <span className="section-label reveal">How We Work</span>
        <h2 className="section-heading reveal" id="process-heading">From idea to impact</h2>
        <p className="section-desc reveal" style={{ '--reveal-delay': '0.05s' }}>
          Every piece of software we build follows a clear, disciplined process —
          from the first conversation to the final deployment.
        </p>

        <div className="process__grid">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="process__step reveal"
              data-step={step.number}
              style={{ '--reveal-delay': `${i * 0.08}s` }}
            >
              <span className="process__number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
              <ul className="process__step-acts">
                {step.activities.map(a => <li key={a}>{a}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
