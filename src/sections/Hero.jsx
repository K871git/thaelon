import { useState, useEffect } from 'react'

const STATS = [
  { target: 2, label: 'Live products' },
  { target: 5, label: 'Phases' },
  { target: 8, label: 'Core capabilities' },
]

export default function Hero() {
  const [counts, setCounts] = useState([0, 0, 0])

  useEffect(() => {
    const duration = 1400
    const fps = 60
    const total = Math.floor(duration / (1000 / fps))
    let frame = 0
    const id = setInterval(() => {
      frame++
      const p = Math.min(frame / total, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCounts(STATS.map(s => Math.round(s.target * eased)))
      if (p >= 1) clearInterval(id)
    }, 1000 / fps)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="hero" aria-label="Introduction">
      {/* ambient orb blobs */}
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />
      <div className="hero__orb hero__orb--3" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" aria-hidden="true" />
            Accepting new projects
          </div>

          <h1 className="hero__title">THAELON</h1>

          <p className="hero__tagline">Imagine. Engineer. Evolve.</p>

          <p className="hero__desc">
            Two live products. Eight engineering layers. One team that ships.
          </p>

          <div className="hero__actions">
            <a href="#products" className="btn btn-primary">View Our Work</a>
            <a href="#contact" className="btn btn-secondary">Get a free estimate</a>
          </div>

          <div className="hero__stats" aria-label="Quick stats">
            {STATS.map((s, i) => (
              <>
                {i > 0 && <div key={`div-${i}`} className="hero__stat-divider" aria-hidden="true" />}
                <div key={s.label} className="hero__stat">
                  <span className="hero__stat-num" aria-label={String(s.target)}>{counts[i]}</span>
                  <span className="hero__stat-label">{s.label}</span>
                </div>
              </>
            ))}
          </div>
        </div>

        <div className="hero__float" aria-hidden="true">
          <div className="hero__terminal">
            <div className="hero__terminal-bar">
              <span className="hero__terminal-dot hero__terminal-dot--red" />
              <span className="hero__terminal-dot hero__terminal-dot--yellow" />
              <span className="hero__terminal-dot hero__terminal-dot--green" />
              <span className="hero__terminal-file">main.ts</span>
            </div>
            <div className="hero__terminal-body">
              <span className="hero__terminal-ln hero__terminal-ln--anim" style={{ '--ln-delay': '0.2s' }}>
                <span className="tc-kw">const </span>
                <span className="tc-fn">thaelon</span>
                <span className="tc-op"> = </span>
                <span className="tc-brc">{'{'}</span>
              </span>
              <span className="hero__terminal-ln hero__terminal-ln--in hero__terminal-ln--anim" style={{ '--ln-delay': '0.55s' }}>
                <span className="tc-prop">stack</span>
                <span className="tc-op">: </span>
                <span className="tc-brc">[</span>
                <span className="tc-str">"React"</span>
                <span className="tc-op">, </span>
                <span className="tc-str">"Node"</span>
                <span className="tc-op">, </span>
                <span className="tc-str">"Go"</span>
                <span className="tc-brc">]</span>
                <span className="tc-op">,</span>
              </span>
              <span className="hero__terminal-ln hero__terminal-ln--in hero__terminal-ln--anim" style={{ '--ln-delay': '0.9s' }}>
                <span className="tc-prop">craft</span>
                <span className="tc-op">: </span>
                <span className="tc-str">"ship what matters"</span>
                <span className="tc-op">,</span>
              </span>
              <span className="hero__terminal-ln hero__terminal-ln--in hero__terminal-ln--anim" style={{ '--ln-delay': '1.25s' }}>
                <span className="tc-prop">status</span>
                <span className="tc-op">: </span>
                <span className="tc-str">"shipping"</span>
                <span className="tc-cursor" />
              </span>
              <span className="hero__terminal-ln hero__terminal-ln--anim" style={{ '--ln-delay': '1.6s' }}>
                <span className="tc-brc">{'}'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
