export default function Hero() {
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
            Taking on projects
          </div>

          <h1 className="hero__title">THAELON</h1>

          <p className="hero__tagline">Imagine. Engineer. Evolve.</p>

          <p className="hero__desc">
            A small team of engineers building purposeful technology.
            Focused on craft, driven by curiosity — working on what matters next.
          </p>

          <div className="hero__actions">
            <a href="#products" className="btn btn-primary">View Our Work</a>
            <a href="#contact" className="btn btn-secondary">Get a free estimate</a>
          </div>

          <div className="hero__stats" aria-label="Quick stats">
            <div className="hero__stat">
              <span className="hero__stat-num">2</span>
              <span className="hero__stat-label">Live products</span>
            </div>
            <div className="hero__stat-divider" aria-hidden="true" />
            <div className="hero__stat">
              <span className="hero__stat-num">5</span>
              <span className="hero__stat-label">Phase process</span>
            </div>
            <div className="hero__stat-divider" aria-hidden="true" />
            <div className="hero__stat">
              <span className="hero__stat-num">8</span>
              <span className="hero__stat-label">Core capabilities</span>
            </div>
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
              <span className="hero__terminal-ln">
                <span className="tc-kw">const </span>
                <span className="tc-fn">thaelon</span>
                <span className="tc-op"> = </span>
                <span className="tc-brc">{'{'}</span>
              </span>
              <span className="hero__terminal-ln hero__terminal-ln--in">
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
              <span className="hero__terminal-ln hero__terminal-ln--in">
                <span className="tc-prop">craft</span>
                <span className="tc-op">: </span>
                <span className="tc-str">"ship what matters"</span>
                <span className="tc-op">,</span>
              </span>
              <span className="hero__terminal-ln hero__terminal-ln--in">
                <span className="tc-prop">status</span>
                <span className="tc-op">: </span>
                <span className="tc-str">"shipping"</span>
                <span className="tc-cursor" />
              </span>
              <span className="hero__terminal-ln">
                <span className="tc-brc">{'}'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
