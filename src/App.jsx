import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Starfield from './components/Starfield'
import CodeTicker from './components/CodeTicker'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Process from './sections/Process'
import Projects from './sections/Projects'
import Pricing from './sections/Pricing'
import Future from './sections/Future'
import Contact from './sections/Contact'
import useScrollReveal from './hooks/useScrollReveal'
// import Team from './sections/Team'

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('thaelon-theme')
      return stored === 'light' || stored === 'dark' ? stored : 'dark'
    } catch { return 'dark' }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('thaelon-theme', theme) } catch { /* noop */ }
  }, [theme])

  useScrollReveal()

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <>
      <Starfield theme={theme} />
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <CodeTicker />
        <About />
        <Skills />
        <Process />
        <Projects />
        <Pricing />
        <Future />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
