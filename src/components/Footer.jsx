import { useState, useEffect } from 'react'

export default function Footer() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 350)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <footer className="footer" role="contentinfo">
        <div className="container footer__inner">
          <div className="footer__brand">
            <img src="./Thaelon-removebg.png" alt="THAELON" className="footer__logo-img" />
            <span className="footer__tagline">Imagine. Engineer. Evolve.</span>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </nav>

          <p className="footer__copy">© 2026 Ghost-Team. All rights reserved.</p>
        </div>
      </footer>

      <button
        className={`scroll-top${visible ? ' scroll-top--visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </>
  )
}
