import { useEffect, useRef } from 'react'

const STAR_COLORS = [
  [255, 255, 255],
  [205, 218, 255],
  [255, 248, 205],
  [218, 205, 255],
  [185, 225, 255],
]

function easeOut(t)   { return 1 - Math.pow(1 - t, 3) }
function easeInOut(t) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2 }

export default function Starfield({ theme }) {
  const ref       = useRef(null)
  const targetRef = useRef(theme)

  // Keep targetRef in sync — the frame loop reads it reactively
  useEffect(() => { targetRef.current = theme }, [theme])

  // Single persistent loop — does NOT restart on theme change
  useEffect(() => {
    const canvas = ref.current
    const ctx    = canvas.getContext('2d')
    const mobile = window.innerWidth < 768
    const noAnim = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W, H, frameId

    // ─── Dark state ────────────────────────────────────────────
    const dk = { t: 0, stars: [], shooting: null, nextShoot: 0,
                 moonX: 0, moonY: 0, moonR: 0 }

    // ─── Light state ───────────────────────────────────────────
    const lt = { t: 0, clouds: [], sunX: 0, sunY: 0, sunR: 0 }

    // ─── State machine ─────────────────────────────────────────
    // states: 'dark' | 'exit-dark' | 'enter-light'
    //       | 'light'| 'exit-light'| 'enter-dark'
    let state = targetRef.current === 'dark' ? 'dark' : 'light'
    let tP = 0

    // ─── Setup ─────────────────────────────────────────────────
    function setupDark() {
      dk.moonX = W * 0.78
      dk.moonY = H * 0.13
      dk.moonR = Math.min(W, H) * 0.082
      dk.t = 0; dk.shooting = null; dk.nextShoot = 380 + Math.random() * 440
      const count = mobile ? 210 : 400
      dk.stars = Array.from({ length: count }, () => {
        const col  = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
        const tier = Math.random()
        const r    = tier < 0.52 ? Math.random() * 0.38 + 0.12
                   : tier < 0.82 ? Math.random() * 0.55 + 0.42
                   : tier < 0.95 ? Math.random() * 0.85 + 0.90
                   :               Math.random() * 1.20 + 1.85
        return {
          x: Math.random() * W, y: Math.random() * H, r,
          cr: col[0], cg: col[1], cb: col[2],
          base: tier < 0.52 ? Math.random() * 0.30 + 0.12
              : tier < 0.82 ? Math.random() * 0.40 + 0.22
              :               Math.random() * 0.50 + 0.38,
          ts: Math.random() * 0.007 + 0.002,
          to: Math.random() * Math.PI * 2,
          bright: tier > 0.95,
        }
      })
    }

    function setupLight() {
      lt.sunX = W * 0.84
      lt.sunY = H * 0.12
      lt.sunR = Math.min(W, H) * 0.058
      lt.t = 0
      const count = mobile ? 5 : 9
      lt.clouds = Array.from({ length: count }, (_, i) => ({
        x:       (W / count) * i + Math.random() * (W / count),
        y:       Math.random() * H * 0.48 + H * 0.04,
        speed:   Math.random() * 0.20 + 0.06,
        scale:   Math.random() * 0.75 + 0.45,
        opacity: Math.random() * 0.22 + 0.10,
      }))
    }

    function resize() {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      setupDark(); setupLight()
    }

    // ─── Dark drawing ──────────────────────────────────────────
    function drawNebula(fade = 1) {
      if (fade <= 0) return
      ctx.save(); ctx.globalAlpha = fade

      const n1 = ctx.createRadialGradient(W*0.74, H*0.10, 0, W*0.74, H*0.10, W*0.55)
      n1.addColorStop(0,   'rgba(55,35,145,0.055)')
      n1.addColorStop(0.5, 'rgba(32,18,100,0.025)')
      n1.addColorStop(1,   'transparent')
      ctx.fillStyle = n1; ctx.fillRect(0, 0, W, H)

      const n2 = ctx.createRadialGradient(W*0.5, H*1.05, 0, W*0.5, H*1.05, W*0.72)
      n2.addColorStop(0,    'rgba(6,182,212,0.042)')
      n2.addColorStop(0.55, 'rgba(4,130,160,0.018)')
      n2.addColorStop(1,    'transparent')
      ctx.fillStyle = n2; ctx.fillRect(0, 0, W, H)

      const n3 = ctx.createRadialGradient(0, H*0.55, 0, 0, H*0.55, W*0.38)
      n3.addColorStop(0,   'rgba(22,55,190,0.042)')
      n3.addColorStop(0.7, 'rgba(12,32,120,0.016)')
      n3.addColorStop(1,   'transparent')
      ctx.fillStyle = n3; ctx.fillRect(0, 0, W, H)

      const mw = ctx.createLinearGradient(W*0.15, 0, W*0.85, H)
      mw.addColorStop(0,    'transparent')
      mw.addColorStop(0.28, 'rgba(175,165,225,0.018)')
      mw.addColorStop(0.50, 'rgba(195,185,245,0.032)')
      mw.addColorStop(0.72, 'rgba(175,165,225,0.018)')
      mw.addColorStop(1,    'transparent')
      ctx.fillStyle = mw; ctx.fillRect(0, 0, W, H)

      ctx.restore()
    }

    function drawMoon(yOff = 0, fade = 1) {
      if (fade <= 0) return
      const mX = dk.moonX, mY = dk.moonY + yOff, mR = dk.moonR

      ctx.save(); ctx.globalAlpha = fade

      // Far ambient glow — very subtle, doesn't compete with content
      const farGlow = ctx.createRadialGradient(mX, mY, mR, mX, mY, mR*5.8)
      farGlow.addColorStop(0,    'rgba(235,222,180,0.14)')
      farGlow.addColorStop(0.35, 'rgba(215,204,162,0.06)')
      farGlow.addColorStop(1,    'transparent')
      ctx.fillStyle = farGlow
      ctx.beginPath(); ctx.arc(mX, mY, mR*5.8, 0, Math.PI*2); ctx.fill()

      // Near halo — softly visible
      const nearGlow = ctx.createRadialGradient(mX, mY, mR*0.9, mX, mY, mR*2.0)
      nearGlow.addColorStop(0,   'rgba(242,232,198,0.22)')
      nearGlow.addColorStop(0.5, 'rgba(228,218,180,0.09)')
      nearGlow.addColorStop(1,   'transparent')
      ctx.fillStyle = nearGlow
      ctx.beginPath(); ctx.arc(mX, mY, mR*2.0, 0, Math.PI*2); ctx.fill()

      // Full disk — clip, then layer inside
      ctx.save()
      ctx.beginPath(); ctx.arc(mX, mY, mR, 0, Math.PI*2); ctx.clip()

      // Base disk — warm grey-ivory, slightly off-centre bright spot
      const disk = ctx.createRadialGradient(mX - mR*0.15, mY - mR*0.15, 0, mX, mY, mR*1.05)
      disk.addColorStop(0,    'rgba(238,232,210,0.94)')
      disk.addColorStop(0.38, 'rgba(222,215,192,0.90)')
      disk.addColorStop(0.68, 'rgba(196,188,166,0.84)')
      disk.addColorStop(0.88, 'rgba(165,158,138,0.70)')
      disk.addColorStop(1.00, 'rgba(130,124,106,0.46)')
      ctx.fillStyle = disk
      ctx.fillRect(mX - mR*1.05, mY - mR*1.05, mR*2.1, mR*2.1)

      // Limb darkening — realistic edge falloff
      const limb = ctx.createRadialGradient(mX, mY, mR*0.62, mX, mY, mR*1.02)
      limb.addColorStop(0,   'transparent')
      limb.addColorStop(0.7, 'rgba(6,6,14,0.06)')
      limb.addColorStop(1,   'rgba(6,6,14,0.28)')
      ctx.fillStyle = limb
      ctx.fillRect(mX - mR*1.05, mY - mR*1.05, mR*2.1, mR*2.1)

      // Maria — dark volcanic plains for realism
      const maria = [
        // [offsetX, offsetY, radiusX, radiusY, rotation, alpha]
        [ 0.08, -0.14, 0.26, 0.20, 0.25, 0.09],   // Mare Serenitatis / Tranquillitatis
        [-0.22,  0.10, 0.20, 0.15, 0.40, 0.08],   // Mare Nubium / Humorum
        [ 0.32,  0.06, 0.16, 0.12, 0.10, 0.07],   // Mare Crisium
        [-0.05,  0.28, 0.18, 0.12, 0.55, 0.06],   // Mare Fecunditatis
        [ 0.14,  0.08, 0.12, 0.09, 0.30, 0.05],   // Mare Tranquillitatis detail
      ]
      maria.forEach(([ox, oy, rx, ry, rot, a]) => {
        ctx.beginPath()
        ctx.ellipse(mX + ox*mR, mY + oy*mR, rx*mR, ry*mR, rot, 0, Math.PI*2)
        ctx.fillStyle = `rgba(6,6,14,${a})`; ctx.fill()
      })

      // Craters — shadow bowl + bright rim highlight + inner flat
      const craters = [
        // [offsetX, offsetY, radius, depth]  depth 1=deep, 0=shallow
        [-0.20, -0.17, 0.092, 0.9],
        [ 0.19,  0.25, 0.068, 0.8],
        [-0.04,  0.11, 0.052, 0.7],
        [ 0.27, -0.11, 0.060, 0.8],
        [-0.32,  0.22, 0.040, 0.6],
        [ 0.05, -0.36, 0.044, 0.7],
        [ 0.38,  0.04, 0.046, 0.6],
        [-0.14,  0.40, 0.038, 0.5],
        [ 0.22,  0.38, 0.034, 0.5],
        [-0.38, -0.10, 0.042, 0.6],
      ]
      craters.forEach(([ox, oy, cr, depth]) => {
        const cx2 = mX + ox*mR, cy2 = mY + oy*mR, cr2 = cr*mR
        // Shadow bowl
        const bowl = ctx.createRadialGradient(cx2 + cr2*0.18, cy2 + cr2*0.18, 0, cx2, cy2, cr2)
        bowl.addColorStop(0,   `rgba(5,5,12,${(0.22 * depth).toFixed(2)})`)
        bowl.addColorStop(0.7, `rgba(5,5,12,${(0.14 * depth).toFixed(2)})`)
        bowl.addColorStop(1,   'transparent')
        ctx.beginPath(); ctx.arc(cx2, cy2, cr2, 0, Math.PI*2)
        ctx.fillStyle = bowl; ctx.fill()
        // Bright rim — upper-left catch-light
        ctx.beginPath(); ctx.arc(cx2 - cr2*0.30, cy2 - cr2*0.30, cr2*0.55, 0, Math.PI*2)
        ctx.fillStyle = `rgba(252,246,224,${(0.13 * depth).toFixed(2)})`; ctx.fill()
        // Inner flat floor for larger craters
        if (cr > 0.060) {
          ctx.beginPath(); ctx.arc(cx2, cy2, cr2*0.42, 0, Math.PI*2)
          ctx.fillStyle = `rgba(180,172,150,${(0.15 * depth).toFixed(2)})`; ctx.fill()
        }
      })

      ctx.restore() // end clip
      ctx.restore() // end fade
    }

    function drawStars(fade = 1) {
      if (fade <= 0) return
      for (const s of dk.stars) {
        const tw = noAnim ? 1 : 0.52 + 0.48 * Math.sin(dk.t * s.ts + s.to)
        const a  = s.base * tw * fade

        if (s.bright) {
          ctx.save()
          ctx.globalAlpha = a * 0.38
          ctx.strokeStyle = `rgb(${s.cr},${s.cg},${s.cb})`
          ctx.lineWidth = 0.6
          const fl = s.r * 7
          ctx.beginPath()
          ctx.moveTo(s.x - fl, s.y); ctx.lineTo(s.x + fl, s.y)
          ctx.moveTo(s.x, s.y - fl*0.75); ctx.lineTo(s.x, s.y + fl*0.75)
          ctx.stroke(); ctx.restore()
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r*5.5)
          g.addColorStop(0, `rgba(${s.cr},${s.cg},${s.cb},${(a*0.30).toFixed(3)})`)
          g.addColorStop(1, 'transparent')
          ctx.fillStyle = g
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r*5.5, 0, Math.PI*2); ctx.fill()
        } else if (s.r > 0.95) {
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r*3.8)
          g.addColorStop(0, `rgba(${s.cr},${s.cg},${s.cb},${(a*0.18).toFixed(3)})`)
          g.addColorStop(1, 'transparent')
          ctx.fillStyle = g
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r*3.8, 0, Math.PI*2); ctx.fill()
        }

        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2)
        ctx.fillStyle = `rgba(${s.cr},${s.cg},${s.cb},${a.toFixed(3)})`
        ctx.fill()
      }
    }

    function drawShootingStar(fade = 1) {
      if (fade <= 0 || noAnim || mobile) return
      if (dk.t >= dk.nextShoot && !dk.shooting) {
        dk.shooting = {
          x: Math.random() * W * 0.55, y: Math.random() * H * 0.28,
          vx: Math.random() * 5 + 4, vy: Math.random() * 2.5 + 1.2,
          len: Math.random() * 130 + 80, life: 0, maxLife: 44,
        }
      }
      if (!dk.shooting) return
      const sh = dk.shooting
      const p  = sh.life / sh.maxLife
      const a  = (p < 0.35 ? p / 0.35 : (1 - p) / 0.65) * fade
      const sx = sh.x + sh.vx * sh.life
      const sy = sh.y + sh.vy * sh.life
      ctx.save()
      ctx.translate(sx, sy)
      ctx.rotate(Math.atan2(sh.vy, sh.vx))
      const sg = ctx.createLinearGradient(-sh.len, 0, 5, 0)
      sg.addColorStop(0,    'transparent')
      sg.addColorStop(0.65, `rgba(210,215,255,${(a*0.45).toFixed(2)})`)
      sg.addColorStop(1,    `rgba(255,255,255,${(a*0.95).toFixed(2)})`)
      ctx.strokeStyle = sg; ctx.lineWidth = 1.8
      ctx.beginPath(); ctx.moveTo(-sh.len, 0); ctx.lineTo(5, 0); ctx.stroke()
      const hg = ctx.createRadialGradient(3, 0, 0, 3, 0, 7)
      hg.addColorStop(0, `rgba(255,255,255,${(a*0.92).toFixed(2)})`); hg.addColorStop(1, 'transparent')
      ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(3, 0, 7, 0, Math.PI*2); ctx.fill()
      ctx.restore()
      sh.life++
      if (sh.life >= sh.maxLife) { dk.shooting = null; dk.nextShoot = dk.t + 380 + Math.random() * 480 }
    }

    // ─── Light drawing ─────────────────────────────────────────
    function drawSky(fade = 1) {
      if (fade <= 0) return
      ctx.save(); ctx.globalAlpha = fade
      const sky = ctx.createLinearGradient(0, 0, 0, H*0.7)
      sky.addColorStop(0,   'rgba(125,190,255,0.28)')
      sky.addColorStop(0.4, 'rgba(160,215,255,0.13)')
      sky.addColorStop(1,   'rgba(200,232,255,0.04)')
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H)
      ctx.restore()
    }

    function drawSun(yOff = 0, fade = 1) {
      if (fade <= 0) return
      const sX = lt.sunX, sY = lt.sunY + yOff, sR = lt.sunR
      ctx.save(); ctx.globalAlpha = fade

      const corona = ctx.createRadialGradient(sX, sY, sR*0.5, sX, sY, sR*5.5)
      corona.addColorStop(0,    'rgba(255,220,70,0.28)')
      corona.addColorStop(0.25, 'rgba(255,205,55,0.14)')
      corona.addColorStop(0.55, 'rgba(255,185,40,0.06)')
      corona.addColorStop(1,    'transparent')
      ctx.fillStyle = corona
      ctx.beginPath(); ctx.arc(sX, sY, sR*5.5, 0, Math.PI*2); ctx.fill()

      const mid = ctx.createRadialGradient(sX, sY, sR*0.8, sX, sY, sR*2.2)
      mid.addColorStop(0, 'rgba(255,230,100,0.30)'); mid.addColorStop(1, 'transparent')
      ctx.fillStyle = mid
      ctx.beginPath(); ctx.arc(sX, sY, sR*2.2, 0, Math.PI*2); ctx.fill()

      const disk = ctx.createRadialGradient(sX - sR*0.28, sY - sR*0.28, 0, sX, sY, sR)
      disk.addColorStop(0,    'rgba(255,248,180,0.95)')
      disk.addColorStop(0.45, 'rgba(255,222,80,0.88)')
      disk.addColorStop(1,    'rgba(255,185,40,0.65)')
      ctx.beginPath(); ctx.arc(sX, sY, sR, 0, Math.PI*2)
      ctx.fillStyle = disk; ctx.fill()
      ctx.restore()
    }

    function drawCloud(x, y, scale, opacity) {
      const s = scale * 62
      ctx.save(); ctx.globalAlpha = opacity
      ctx.fillStyle = 'rgba(190,210,240,0.55)'
      const shadow = [
        [0, s*0.22, s*1.05, s*0.38],
        [-s*0.85, s*0.28, s*0.75, s*0.30],
        [s*0.88,  s*0.30, s*0.72, s*0.28],
      ]
      shadow.forEach(([ox, oy, rx, ry]) => {
        ctx.beginPath(); ctx.ellipse(x+ox, y+oy, rx, ry, 0, 0, Math.PI*2); ctx.fill()
      })
      ctx.fillStyle = 'rgba(255,255,255,0.94)'
      const puffs = [
        [0,       0,       s*1.08, s*0.60],
        [-s*0.88, s*0.08,  s*0.80, s*0.50],
        [s*0.90,  s*0.10,  s*0.76, s*0.46],
        [-s*0.44, -s*0.30, s*0.68, s*0.54],
        [s*0.42,  -s*0.26, s*0.64, s*0.50],
        [0,       -s*0.10, s*0.85, s*0.42],
      ]
      puffs.forEach(([ox, oy, rx, ry]) => {
        ctx.beginPath(); ctx.ellipse(x+ox, y+oy, rx, ry, 0, 0, Math.PI*2); ctx.fill()
      })
      ctx.restore()
    }

    function drawClouds(fade = 1) {
      if (fade <= 0) return
      for (const c of lt.clouds) {
        drawCloud(c.x, c.y, c.scale, c.opacity * fade)
        if (!noAnim) { c.x += c.speed; if (c.x > W + 260) c.x = -260 }
      }
    }

    // ─── Main frame ────────────────────────────────────────────
    function frame() {
      ctx.clearRect(0, 0, W, H)

      const isDark = targetRef.current === 'dark'

      if (!noAnim) {
        // Trigger transitions
        if (state === 'dark'  && !isDark) { state = 'exit-dark';  tP = 0 }
        if (state === 'light' && isDark)  { state = 'exit-light'; tP = 0 }
        // Advance progress
        if (state === 'exit-dark')   { tP = Math.min(tP + 0.060, 1); if (tP >= 1) { state = 'enter-light'; tP = 0 } }
        if (state === 'enter-light') { tP = Math.min(tP + 0.050, 1); if (tP >= 1) { state = 'light';       tP = 0 } }
        if (state === 'exit-light')  { tP = Math.min(tP + 0.033, 1); if (tP >= 1) { state = 'enter-dark';  tP = 0 } }
        if (state === 'enter-dark')  { tP = Math.min(tP + 0.050, 1); if (tP >= 1) { state = 'dark';        tP = 0 } }
      } else {
        if (state === 'dark'  && !isDark) state = 'light'
        if (state === 'light' && isDark)  state = 'dark'
      }

      // Canvas opacity: 0.75 for dark states, 1 for light states
      if (state === 'dark'  || state === 'exit-dark'  || state === 'enter-dark')  canvas.style.opacity = '0.75'
      else canvas.style.opacity = '1'

      // Travel distance for enter/exit animations
      const DIST = H * 0.40

      if (state === 'dark') {
        drawNebula(); drawMoon(); drawStars(); drawShootingStar()
        dk.t++
      } else if (state === 'light') {
        drawSky(); drawSun(); drawClouds()
        lt.t++

      // Moon slides UP and fades out; stars & nebula dissolve
      } else if (state === 'exit-dark') {
        const p = easeInOut(tP)
        drawNebula(Math.max(0, 1 - p * 1.1))
        drawMoon(-DIST * p, Math.max(0, 1 - p * 1.3))
        drawStars(Math.max(0, 1 - p * 1.2))
        drawShootingStar(Math.max(0, 1 - p * 2))
        dk.t++

      // Sky brightens; sun descends from above and fades in
      } else if (state === 'enter-light') {
        const p = easeOut(tP)
        drawSky(p)
        drawSun(-DIST * (1 - p), Math.min(1, p * 1.3))
        drawClouds(Math.min(1, p * 1.2))
        lt.t++

      // Sky dims; sun exits quickly; clouds linger until ~1.3 s
      } else if (state === 'exit-light') {
        const p     = easeInOut(tP)
        const sunP  = Math.min(1, p * 2.4)                                    // sun done at p ≈ 0.42 (~0.55 s)
        const cFade = p < 0.28 ? 1 : Math.max(0, 1 - (p - 0.28) / 0.72)     // clouds start fading at ~0.36 s, gone at ~1.3 s
        drawSky(Math.max(0, 1 - p))
        drawSun(-DIST * easeInOut(sunP), Math.max(0, 1 - sunP * 1.25))
        drawClouds(cFade)
        lt.t++

      // Nebula & stars fade in; moon descends from above
      } else if (state === 'enter-dark') {
        const p = easeOut(tP)
        drawNebula(Math.min(1, p * 1.1))
        drawStars(Math.min(1, p * 1.1))
        drawMoon(-DIST * (1 - p), Math.min(1, p * 1.3))
        dk.t++
      }

      frameId = requestAnimationFrame(frame)
    }

    resize()
    canvas.style.opacity = state === 'dark' ? '0.75' : '1'
    frame()

    const onResize = () => {
      cancelAnimationFrame(frameId)
      resize()
      state = targetRef.current === 'dark' ? 'dark' : 'light'
      tP = 0
      frame()
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
    }
  }, []) // intentional empty deps — single persistent loop

  return <canvas ref={ref} className="starfield" aria-hidden="true" />
}
