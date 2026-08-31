const values = [
  { label: 'Craft',  desc: 'We take quality seriously at every layer of what we build.' },
  { label: 'Clarity', desc: 'Simple is hard. We choose it anyway.' },
  { label: 'Depth',  desc: 'We go beyond the surface — always.' },
]

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-heading">
      <div className="container">
        <div className="about__inner">
          <div className="about__text">
            <span className="section-label reveal">About</span>
            <h2 className="section-heading reveal" id="about-heading">
              A team that builds<br />with intention
            </h2>
            <p className="about__body reveal" style={{ '--reveal-delay': '0.08s' }}>
              Ghost-Team is a small group of engineers who believe that the best
              technology is purposeful, precise, and human. We don't build for the
              sake of building — we build because a problem is worth solving.
            </p>
            <p className="about__body reveal" style={{ '--reveal-delay': '0.14s' }}>
              We value clarity in design, depth in engineering, and honesty in every
              decision. Whether it's a system under the hood or an interface a person
              interacts with, we care about getting it right.
            </p>
            <p className="about__body reveal" style={{ '--reveal-delay': '0.20s' }}>
              THAELON is our identity while we build toward something larger. This is
              where we show our work, share who we are, and document our thinking.
            </p>
          </div>

          <div className="about__values">
            {values.map((v, i) => (
              <div
                className="about__value-card reveal"
                key={v.label}
                style={{ '--reveal-delay': `${i * 0.1}s` }}
              >
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
