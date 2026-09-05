import { useState, useCallback } from 'react'
import Modal from '../components/Modal'

const steps = [
  {
    number: '01',
    title: 'Discover',
    color: 'blue',
    desc: 'We start by deeply understanding your problem, goals, and users — not rushing to solutions.',
    detail:
      'Discovery is where projects win or lose. Before a single line of code is written, we dig into your domain, your users, and your constraints. We ask uncomfortable questions and push back on assumptions. The output is a clear specification the whole team can build from — no ambiguity, no guesswork.',
    activities: [
      'Stakeholder interviews & requirements gathering',
      'Technical landscape & constraint assessment',
      'Scope definition and boundary-setting',
      'Risk identification and mitigation planning',
      'Milestone and timeline planning',
    ],
    deliverables: ['Project specification document', 'Technical feasibility report', 'Milestone plan'],
    duration: '1–2 weeks',
  },
  {
    number: '02',
    title: 'Design',
    color: 'violet',
    desc: 'Architecture and technical planning decided before production code. Good systems are designed, not stumbled into.',
    detail:
      'This phase produces the technical blueprint — how data flows, how components connect, how the system scales under load. We make hard architectural decisions here so we do not pay for them during build. Every significant choice is documented and agreed on before development starts.',
    activities: [
      'System architecture design',
      'Database schema and data modelling',
      'API contract design (REST / OpenAPI)',
      'Component and module breakdown',
      'Security and performance planning',
    ],
    deliverables: ['Architecture diagram', 'API contract (OpenAPI spec)', 'Database schema', 'Component tree'],
    duration: '1–2 weeks',
  },
  {
    number: '03',
    title: 'Build',
    color: 'emerald',
    desc: 'Clean, tested, maintainable code shipped in working increments every sprint.',
    detail:
      'We build iteratively — working software every sprint, not a big-bang release at the end. Code is written as if another developer will maintain it tomorrow. Every feature goes through code review. Tests are written alongside features, not as an afterthought. Documentation happens as we go.',
    activities: [
      'Feature development in structured sprints',
      'Peer code review on every pull request',
      'Unit and integration testing',
      'API and database integration',
      'Documentation updated continuously',
    ],
    deliverables: ['Working feature increments', 'Test coverage report', 'Code documentation', 'Sprint change log'],
    duration: '3–12 weeks (scales with project)',
  },
  {
    number: '04',
    title: 'Ship',
    color: 'amber',
    desc: 'Deployment, monitoring, and a smooth launch — we stay through go-live.',
    detail:
      'Shipping is not handing over a zip file and disappearing. We set up the deployment pipeline, configure environments, run pre-launch smoke tests, and monitor the first 48 hours after go-live. We are reachable through launch day.',
    activities: [
      'CI/CD pipeline configuration',
      'Environment setup (staging → production)',
      'Pre-launch QA and smoke testing',
      'Go-live execution and rollout',
      'First-48h monitoring and incident watch',
    ],
    deliverables: ['Live production system', 'Deployment runbook', 'Monitoring dashboard', 'Incident response plan'],
    duration: '1 week',
  },
  {
    number: '05',
    title: 'Evolve',
    color: 'rose',
    desc: 'Real software improves after launch based on actual usage — not assumptions.',
    detail:
      'Launch day is not the finish line. Real products improve from real usage data. We analyse how users interact with what was built, surface friction points, resolve bugs, and iterate on the features that matter most. Ideas become better products over time.',
    activities: [
      'Usage and analytics review',
      'Performance profiling and optimisation',
      'Bug triage and resolution',
      'Feature iteration based on feedback',
      'Capacity and scaling planning',
    ],
    deliverables: ['Performance report', 'Iteration roadmap', 'Updated documentation'],
    duration: 'Ongoing',
  },
]

export default function Process() {
  const [modal, setModal] = useState(null)
  const close = useCallback(() => setModal(null), [])

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
              data-color={step.color}
              style={{ '--reveal-delay': `${i * 0.08}s` }}
              role="button"
              tabIndex={0}
              aria-label={`View ${step.title} phase details`}
              onClick={() => setModal(step)}
              onKeyDown={e => e.key === 'Enter' && setModal(step)}
            >
              <span className="process__number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
              <ul className="process__step-acts">
                {step.activities.slice(0, 4).map(a => <li key={a}>{a}</li>)}
              </ul>
              <span className="process__step-cta" aria-hidden="true">See what's included →</span>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={!!modal} onClose={close} title={modal?.title}>
        {modal && (
          <div className="process-modal" data-color={modal.color}>
            <div className="process-modal__header">
              <span className="process__number">{modal.number}</span>
              <h2>{modal.title}</h2>
              {modal.duration && (
                <span className="process-modal__duration">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {modal.duration}
                </span>
              )}
              <p>{modal.detail}</p>
            </div>

            <div className="process-modal__activities">
              <h4>What we do</h4>
              <ul className="process-modal__list">
                {modal.activities.map(a => <li key={a}>{a}</li>)}
              </ul>
            </div>

            {modal.deliverables && (
              <div className="process-modal__deliverables">
                <h4>What you get</h4>
                <ul className="process-modal__deliverables-list">
                  {modal.deliverables.map(d => <li key={d}>{d}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  )
}
