// Replace placeholder quotes with real client testimonials before shipping.
const TESTIMONIALS = [
  {
    quote: 'Thaelon built our backend API from scratch — scoped exactly to what we needed, delivered clean, and shipped on time. Three new features have gone in since launch without touching their code.',
    initials: 'AR',
    name: 'A. R.',
    role: 'Founder, EdTech Startup',
  },
  {
    quote: "What stood out was how they pushed back on scope that didn't serve the actual goal. Most agencies build what you ask for. Thaelon builds what you need.",
    initials: 'SM',
    name: 'S. M.',
    role: 'Product Lead, HealthTech',
  },
  {
    quote: 'Needed a desktop tool — offline-first, zero IT involvement, integrated with our existing database. Done in three weeks. Exactly right. We haven\'t needed to touch it since.',
    initials: 'VK',
    name: 'V. K.',
    role: 'Operations Director, SME',
  },
]

const StarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="testimonials__star">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

export default function Testimonials() {
  return (
    <section className="section" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="container">
        <span className="section-label reveal">Results</span>
        <h2 className="section-heading reveal" id="testimonials-heading">What clients say</h2>
        <p className="section-desc reveal" style={{ '--reveal-delay': '0.05s' }}>
          Real words from real clients — what it's like to work with Thaelon.
        </p>

        <div className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className="testimonials__card reveal"
              style={{ '--reveal-delay': `${i * 0.1}s` }}
            >
              <div className="testimonials__stars" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map(j => <StarIcon key={j} />)}
              </div>
              <blockquote className="testimonials__quote">
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className="testimonials__author">
                <div className="testimonials__author-avatar" aria-hidden="true">{t.initials}</div>
                <div className="testimonials__author-text">
                  <cite className="testimonials__author-name">{t.name}</cite>
                  <span className="testimonials__author-role">{t.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
