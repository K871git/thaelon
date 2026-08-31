export default function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" aria-hidden="true" />
            Ghost-Team
          </div>

          <h1 className="hero__title">THAELON</h1>

          <p className="hero__tagline">Imagine. Engineer. Evolve.</p>

          <p className="hero__desc">
            A small team of engineers building purposeful technology.
            Focused on craft, driven by curiosity — working on what matters next.
          </p>

          <div className="hero__actions">
            <a href="#projects" className="btn btn-primary">View Our Work</a>
            <a href="#about" className="btn btn-secondary">Learn More</a>
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
                <span className="tc-str">"deploying"</span>
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
