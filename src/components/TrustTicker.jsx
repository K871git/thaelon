import { useRef, useEffect } from 'react'

const TRUST_ITEMS = [
  { text: 'Transparent pricing, no surprises',  color: 'violet'  },
  { text: 'Reply within 24 hours',              color: 'cyan'    },
  { text: '2 live products shipped',            color: 'emerald' },
  { text: 'NDA ready on request',               color: 'amber'   },
  { text: 'No templates, no boilerplate',       color: 'violet'  },
  { text: 'Free estimate — zero commitment',    color: 'cyan'    },
  { text: 'Defined scope, reliable delivery',   color: 'emerald' },
  { text: 'Every line written by the builder',  color: 'amber'   },
  { text: 'Open to founders & enterprises',     color: 'violet'  },
  { text: '8 engineering capabilities',         color: 'cyan'    },
  { text: 'No vanishing after launch',          color: 'emerald' },
  { text: 'Direct line — no middleman',         color: 'amber'   },
]

export default function TrustTicker() {
  const wrapRef  = useRef(null)
  const trackRef = useRef(null)
  const s = useRef({
    pos:        0,
    totalWidth: 0,
    speed:      0,
    dragging:   false,
    startX:     0,
    startPos:   0,
    raf:        null,
  })

  useEffect(() => {
    const wrap  = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return
    const st = s.current

    const measure = () => {
      const w = track.scrollWidth
      if (!w) return
      st.totalWidth = w / 2
      st.speed = st.totalWidth / (60 * 60)
    }

    const tick = () => {
      if (!st.dragging) {
        st.pos -= st.speed
        if (st.pos <= -st.totalWidth) st.pos += st.totalWidth
      }
      track.style.transform = `translate3d(${st.pos}px, 0, 0)`
      st.raf = requestAnimationFrame(tick)
    }

    measure()
    st.raf = requestAnimationFrame(tick)

    const ro = new ResizeObserver(measure)
    ro.observe(track)

    const onDown = (e) => {
      st.dragging = true
      st.startX   = e.clientX
      st.startPos = st.pos
      wrap.style.cursor = 'grabbing'
      e.preventDefault()
    }
    const onMove = (e) => {
      if (!st.dragging) return
      let p = st.startPos + (e.clientX - st.startX)
      while (p < -st.totalWidth) p += st.totalWidth
      while (p > 0)               p -= st.totalWidth
      st.pos = p
    }
    const onUp = () => {
      if (!st.dragging) return
      st.dragging = false
      wrap.style.cursor = 'grab'
    }

    const onTouchStart = (e) => {
      st.dragging = true
      st.startX   = e.touches[0].clientX
      st.startPos = st.pos
    }
    const onTouchMove = (e) => {
      if (!st.dragging) return
      let p = st.startPos + (e.touches[0].clientX - st.startX)
      while (p < -st.totalWidth) p += st.totalWidth
      while (p > 0)               p -= st.totalWidth
      st.pos = p
    }
    const onTouchEnd = () => { st.dragging = false }

    wrap.addEventListener('mousedown',   onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup',   onUp)
    wrap.addEventListener('touchstart',  onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove,  { passive: true })
    window.addEventListener('touchend',  onTouchEnd)

    return () => {
      cancelAnimationFrame(st.raf)
      ro.disconnect()
      wrap.removeEventListener('mousedown',   onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup',   onUp)
      wrap.removeEventListener('touchstart',  onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend',  onTouchEnd)
    }
  }, [])

  const all = [...TRUST_ITEMS, ...TRUST_ITEMS]

  return (
    <div className="trust-ticker" ref={wrapRef} aria-hidden="true">
      <div className="trust-ticker__track" ref={trackRef}>
        {all.map((item, i) => (
          <span key={i} className={`trust-ticker__item trust-ticker__item--${item.color}`}>
            <span className="trust-ticker__text">{item.text}</span>
            <span className="trust-ticker__sep" aria-hidden="true">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
