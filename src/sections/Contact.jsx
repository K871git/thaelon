const EMAIL = 'gangardekishor87@gmail.com'
const GITHUB = 'https://github.com/K871git'
const PHONE = '+91-7499621927'

const CARDS = [
  {
    id: 'email',
    label: 'Email',
    value: EMAIL,
    hint: 'Get a free estimate',
    href: `mailto:${EMAIL}?subject=Get%20a%20free%20estimate`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 7 10-7" />
      </svg>
    ),
  },
  {
    id: 'phone',
    label: 'Phone',
    value: PHONE,
    hint: 'Call or message',
    href: `tel:${PHONE}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l.91-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'K871git',
    hint: 'See our work',
    href: GITHUB,
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
]

export default function Contact() {
  return (
    <section className="section" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact__header reveal">
          <span className="section-label">Contact</span>
          <h2 className="section-heading" id="contact-heading">Get a free estimate</h2>
          <p className="contact__desc">
            No forms, no fluff. Pick how you want to reach us and we'll get back to you.
          </p>
        </div>

        <div className="contact__cards">
          {CARDS.map((c, i) => (
            <a
              key={c.id}
              href={c.href}
              className="contact__card reveal"
              style={{ '--reveal-delay': `${i * 0.08}s` }}
              {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <div className="contact__card-icon">{c.icon}</div>
              <div className="contact__card-body">
                <span className="contact__card-label">{c.label}</span>
                <span className="contact__card-value">{c.value}</span>
                <span className="contact__card-hint">{c.hint}</span>
              </div>
              <svg className="contact__card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
