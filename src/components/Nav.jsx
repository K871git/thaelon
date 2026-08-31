import { useState, useEffect, useCallback } from 'react'

const NAV_SECTIONS = ['about', 'skills', 'process', 'projects', 'pricing', 'contact']
const NAV_LINKS = [
  ['#about',    'About',    'about'],
  ['#skills',   'Skills',   'skills'],
  ['#process',  'Process',  'process'],
  ['#projects', 'Projects', 'projects'],
  ['#pricing',  'Pricing',  'pricing'],
  ['#contact',  'Contact',  'contact'],
]

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Nav({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const [progress, setProgress] = useState(0)

  const close = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? window.scrollY / total : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )
    NAV_SECTIONS.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = e => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen, close])

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="/" className="nav__logo" onClick={close}>
          <img src="./Thaelon-removebg.png" alt="THAELON" className="nav__logo-img" />
        </a>

        <div
          className={`nav__backdrop${menuOpen ? ' nav__backdrop--visible' : ''}`}
          onClick={close}
          aria-hidden="true"
        />

        <nav
          className={`nav__links${menuOpen ? ' nav__links--open' : ''}`}
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(([href, label, id], i) => (
            <a
              key={id}
              href={href}
              onClick={close}
              className={active === id ? 'nav__link--active' : ''}
            >
              <span className="nav__link-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="nav__link-label">{label}</span>
            </a>
          ))}
        </nav>

        <div className="nav__right">
          <button
            className="nav__theme-btn"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={onToggleTheme}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            className={`nav__toggle${menuOpen ? ' nav__toggle--open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        className="nav__progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
    </header>
  )
}
