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

  useEffect(() => { targetRef.current = theme }, [theme])

  useEffect(() => {
    const canvas = ref.current
    const ctx    = canvas.getContext('2d')
    const mobile = window.innerWidth < 768
    const noAnim = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W, H, frameId

    // ─── Dark state ────────────────────────────────────────────
    const dk = {
      t: 0, stars: [], shooting: null, nextShoot: 0,
      moonX: 0, moonY: 0, moonR: 0,
      ships: [], nextShip: 60, ufo: null, nextUfo: 0,
    }

    // ─── Light state ───────────────────────────────────────────
    const lt = { t: 0, clouds: [], birds: [], sunX: 0, sunY: 0, sunR: 0 }

    // ─── State machine ─────────────────────────────────────────
    // Start in an enter state so the celestial body animates in on first load
    let state = targetRef.current === 'dark' ? 'enter-dark' : 'enter-light'
    let tP = 0

    // ─── Setup ─────────────────────────────────────────────────
    function setupDark() {
      dk.moonX = W * 0.78
      dk.moonY = H * 0.13
      dk.moonR = Math.min(W, H) * 0.082
      dk.t = 0; dk.shooting = null; dk.nextShoot = 380 + Math.random() * 440; dk.ufo = null; dk.nextUfo = 500 + Math.random() * 700
      // Pre-compute surface texture dots (deterministic, no Math.random per frame)
      dk.moonTex = Array.from({ length: 55 }, (_, i) => {
        const tx = Math.sin(47 + i * 13.7) * 0.88
        const ty = Math.sin(47 + i * 7.3 + 1.2) * 0.88
        if (tx*tx + ty*ty > 0.76) return null
        return {
          nx: tx, ny: ty,
          r:  (Math.abs(Math.sin(47 + i * 3.1)) * 0.013 + 0.003),
          a:  (Math.abs(Math.sin(47 + i * 5.9)) * 0.055 + 0.018),
        }
      }).filter(Boolean)
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
      lt.sunR = Math.min(W, H) * 0.072
      lt.t = 0
      const count = mobile ? 5 : 9
      lt.clouds = Array.from({ length: count }, (_, i) => ({
        x:       (W / count) * i + Math.random() * (W / count),
        y:       Math.random() * H * 0.48 + H * 0.04,
        speed:   Math.random() * 0.20 + 0.06,
        scale:   Math.random() * 0.75 + 0.45,
        opacity: Math.random() * 0.28 + 0.15,
      }))
      const bCount = mobile ? 3 : 6
      lt.birds = Array.from({ length: bCount }, () => ({
        x:    Math.random() * W,
        y:    Math.random() * H * 0.36 + H * 0.04,
        vx:   -(Math.random() * 0.30 + 0.14),
        flap: Math.random() * Math.PI * 2,
        size: Math.random() * 4.0 + 3.5,
        alpha: Math.random() * 0.35 + 0.28,
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

      // Far ambient glow
      const farGlow = ctx.createRadialGradient(mX, mY, mR, mX, mY, mR*6.2)
      farGlow.addColorStop(0,    'rgba(235,222,180,0.16)')
      farGlow.addColorStop(0.28, 'rgba(220,210,168,0.07)')
      farGlow.addColorStop(1,    'transparent')
      ctx.fillStyle = farGlow
      ctx.beginPath(); ctx.arc(mX, mY, mR*6.2, 0, Math.PI*2); ctx.fill()

      // Near halo
      const nearGlow = ctx.createRadialGradient(mX, mY, mR*0.85, mX, mY, mR*2.2)
      nearGlow.addColorStop(0,   'rgba(248,236,202,0.26)')
      nearGlow.addColorStop(0.45,'rgba(232,220,182,0.10)')
      nearGlow.addColorStop(1,   'transparent')
      ctx.fillStyle = nearGlow
      ctx.beginPath(); ctx.arc(mX, mY, mR*2.2, 0, Math.PI*2); ctx.fill()

      // Full disk (clipped)
      ctx.save()
      ctx.beginPath(); ctx.arc(mX, mY, mR, 0, Math.PI*2); ctx.clip()

      // Base disk — off-centre light source (upper-left)
      const disk = ctx.createRadialGradient(mX - mR*0.22, mY - mR*0.20, 0, mX, mY, mR*1.05)
      disk.addColorStop(0,    'rgba(252,246,222,0.97)')
      disk.addColorStop(0.28, 'rgba(238,230,205,0.93)')
      disk.addColorStop(0.58, 'rgba(210,200,176,0.87)')
      disk.addColorStop(0.80, 'rgba(178,168,146,0.74)')
      disk.addColorStop(1.00, 'rgba(136,128,110,0.50)')
      ctx.fillStyle = disk
      ctx.fillRect(mX - mR*1.05, mY - mR*1.05, mR*2.1, mR*2.1)

      // Limb darkening
      const limb = ctx.createRadialGradient(mX, mY, mR*0.55, mX, mY, mR*1.02)
      limb.addColorStop(0,    'transparent')
      limb.addColorStop(0.62, 'rgba(5,5,14,0.04)')
      limb.addColorStop(1,    'rgba(5,5,14,0.34)')
      ctx.fillStyle = limb
      ctx.fillRect(mX - mR*1.05, mY - mR*1.05, mR*2.1, mR*2.1)

      // Gibbous phase shadow — soft terminator on right edge
      const phase = ctx.createLinearGradient(mX - mR*0.05, mY, mX + mR, mY)
      phase.addColorStop(0,    'transparent')
      phase.addColorStop(0.55, 'transparent')
      phase.addColorStop(0.80, 'rgba(4,5,16,0.10)')
      phase.addColorStop(1,    'rgba(4,5,16,0.26)')
      ctx.fillStyle = phase
      ctx.fillRect(mX - mR*1.05, mY - mR*1.05, mR*2.1, mR*2.1)

      // Maria — volcanic plains (8 patches)
      const maria = [
        [ 0.08, -0.14, 0.28, 0.22, 0.20, 0.10],
        [-0.22,  0.10, 0.23, 0.17, 0.40, 0.09],
        [ 0.32,  0.06, 0.18, 0.13, 0.10, 0.08],
        [-0.05,  0.28, 0.21, 0.14, 0.55, 0.07],
        [ 0.14,  0.08, 0.13, 0.10, 0.30, 0.06],
        [-0.30, -0.18, 0.17, 0.11, 0.60, 0.07],
        [-0.18,  0.32, 0.14, 0.09, 0.20, 0.06],
        [ 0.02, -0.02, 0.10, 0.08, 0.45, 0.05],
      ]
      maria.forEach(([ox, oy, rx, ry, rot, a]) => {
        ctx.beginPath()
        ctx.ellipse(mX + ox*mR, mY + oy*mR, rx*mR, ry*mR, rot, 0, Math.PI*2)
        ctx.fillStyle = `rgba(6,6,14,${a})`; ctx.fill()
      })

      // Surface texture — micro-crater dots (pre-computed in setupDark)
      for (const d of dk.moonTex) {
        ctx.beginPath()
        ctx.arc(mX + d.nx*mR, mY + d.ny*mR, d.r*mR, 0, Math.PI*2)
        ctx.fillStyle = `rgba(5,5,12,${d.a})`; ctx.fill()
      }

      // Crater ray systems — drawn first so craters paint on top
      const rayCraters = [
        [-0.20, -0.17, 0.095, 14, 0.038],
        [ 0.19,  0.25, 0.072, 11, 0.032],
        [ 0.05, -0.36, 0.048,  9, 0.028],
      ]
      rayCraters.forEach(([ox, oy, cr, rayCount, rayA]) => {
        const cx2 = mX + ox*mR, cy2 = mY + oy*mR, cr2 = cr*mR
        for (let r = 0; r < rayCount; r++) {
          const angle = (r / rayCount) * Math.PI * 2 + ox * 0.5
          const rayLen = cr2 * (3.8 + Math.abs(Math.sin(r * 2.3 + 1)) * 2.8)
          const rayW   = cr2 * 0.18
          ctx.save()
          ctx.translate(cx2, cy2); ctx.rotate(angle)
          const rg = ctx.createLinearGradient(cr2, 0, cr2 + rayLen, 0)
          rg.addColorStop(0,   `rgba(246,240,218,${rayA})`)
          rg.addColorStop(0.35,`rgba(246,240,218,${(rayA*0.55).toFixed(3)})`)
          rg.addColorStop(1,   'transparent')
          ctx.fillStyle = rg
          ctx.beginPath()
          ctx.moveTo(cr2,         -rayW * 0.5)
          ctx.lineTo(cr2 + rayLen, -rayW * 0.08)
          ctx.lineTo(cr2 + rayLen,  rayW * 0.08)
          ctx.lineTo(cr2,           rayW * 0.5)
          ctx.fill()
          ctx.restore()
        }
      })

      // Craters — 20 total, varying sizes
      const craters = [
        // Major
        [-0.20, -0.17, 0.095, 0.90],
        [ 0.19,  0.25, 0.072, 0.82],
        [ 0.27, -0.11, 0.063, 0.80],
        [ 0.05, -0.36, 0.048, 0.72],
        [ 0.38,  0.04, 0.050, 0.65],
        [-0.32,  0.22, 0.045, 0.62],
        [-0.38, -0.10, 0.044, 0.62],
        // Medium
        [-0.04,  0.11, 0.055, 0.70],
        [-0.14,  0.40, 0.040, 0.55],
        [ 0.22,  0.38, 0.036, 0.52],
        [ 0.10, -0.22, 0.034, 0.60],
        [-0.25,  0.35, 0.031, 0.52],
        [ 0.34,  0.28, 0.029, 0.50],
        [-0.08, -0.28, 0.033, 0.58],
        // Small
        [ 0.42, -0.20, 0.024, 0.42],
        [-0.44,  0.08, 0.025, 0.40],
        [ 0.16,  0.16, 0.020, 0.48],
        [-0.12,  0.18, 0.019, 0.42],
        [ 0.28, -0.28, 0.022, 0.50],
        [-0.35, -0.28, 0.021, 0.40],
      ]
      craters.forEach(([ox, oy, cr, depth]) => {
        const cx2 = mX + ox*mR, cy2 = mY + oy*mR, cr2 = cr*mR

        // Ejecta blanket (bright halo around rim)
        if (cr > 0.038) {
          const ej = ctx.createRadialGradient(cx2, cy2, cr2*0.9, cx2, cy2, cr2*2.0)
          ej.addColorStop(0,   `rgba(232,224,200,${(0.09*depth).toFixed(2)})`)
          ej.addColorStop(1,   'transparent')
          ctx.beginPath(); ctx.arc(cx2, cy2, cr2*2.0, 0, Math.PI*2)
          ctx.fillStyle = ej; ctx.fill()
        }

        // Bowl shadow (offset centre = depth illusion)
        const bowl = ctx.createRadialGradient(cx2 + cr2*0.20, cy2 + cr2*0.20, 0, cx2, cy2, cr2)
        bowl.addColorStop(0,    `rgba(4,4,12,${(0.30*depth).toFixed(2)})`)
        bowl.addColorStop(0.60, `rgba(4,4,12,${(0.18*depth).toFixed(2)})`)
        bowl.addColorStop(1,    'transparent')
        ctx.beginPath(); ctx.arc(cx2, cy2, cr2, 0, Math.PI*2)
        ctx.fillStyle = bowl; ctx.fill()

        // Bright rim highlight (upper-left)
        ctx.beginPath(); ctx.arc(cx2 - cr2*0.30, cy2 - cr2*0.28, cr2*0.68, 0, Math.PI*2)
        ctx.fillStyle = `rgba(255,250,232,${(0.18*depth).toFixed(2)})`; ctx.fill()

        // Rim ring stroke for medium+ craters
        if (cr > 0.038) {
          ctx.beginPath(); ctx.arc(cx2, cy2, cr2, 0, Math.PI*2)
          ctx.strokeStyle = `rgba(218,210,186,${(0.20*depth).toFixed(2)})`
          ctx.lineWidth = cr2 * 0.20
          ctx.stroke()
        }

        // Central peak for large craters
        if (cr > 0.055) {
          ctx.beginPath(); ctx.arc(cx2, cy2, cr2*0.20, 0, Math.PI*2)
          ctx.fillStyle = `rgba(215,206,182,${(0.28*depth).toFixed(2)})`; ctx.fill()
        }
      })

      ctx.restore()
      ctx.restore()
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

    // Subtle spaceships — distant, slow, easy to miss
    function drawSpaceships(fade = 1) {
      if (fade <= 0 || noAnim || mobile) return

      if (dk.t >= dk.nextShip && dk.ships.length < 3) {
        const fromLeft = Math.random() > 0.5
        dk.ships.push({
          x:  fromLeft ? -20 : W + 20,
          y:  Math.random() * H * 0.46 + H * 0.04,
          vx: fromLeft ? (Math.random() * 0.30 + 0.18) : -(Math.random() * 0.30 + 0.18),
          vy: (Math.random() - 0.5) * 0.06,
          sz: Math.random() * 7 + 7,
          life: 0,
          hasAstronaut: Math.random() > 0.38,
          astPhase: Math.random() * Math.PI * 2,
        })
        dk.nextShip = dk.t + 600 + Math.random() * 900
      }

      dk.ships = dk.ships.filter(s => {
        const a = Math.min(1, s.life / 60) * 0.72 * fade
        const { sz } = s
        const dir = s.vx > 0 ? 1 : -1

        if (a > 0.01) {
          ctx.save()
          ctx.translate(s.x, s.y)
          ctx.rotate(Math.atan2(s.vy, s.vx))
          ctx.globalAlpha = a

          // Hull body
          ctx.fillStyle = 'rgba(170,186,215,0.92)'
          ctx.beginPath()
          ctx.moveTo(dir * sz,          0)
          ctx.lineTo(dir * -sz * 0.88, -sz * 0.26)
          ctx.lineTo(dir * -sz * 0.58,  0)
          ctx.lineTo(dir * -sz * 0.88,  sz * 0.26)
          ctx.closePath()
          ctx.fill()

          // Cockpit glint
          ctx.fillStyle = 'rgba(200,220,255,0.55)'
          ctx.beginPath()
          ctx.ellipse(dir * sz * 0.38, -sz * 0.06, sz * 0.18, sz * 0.10, 0, 0, Math.PI * 2)
          ctx.fill()

          // Wing fin
          ctx.fillStyle = 'rgba(128,148,180,0.76)'
          ctx.beginPath()
          ctx.moveTo(dir * -sz * 0.06,  0)
          ctx.lineTo(dir * -sz * 0.64, -sz * 0.55)
          ctx.lineTo(dir * -sz * 0.68, -sz * 0.24)
          ctx.closePath()
          ctx.fill()

          // Engine glow (wider, more visible)
          const eg = ctx.createRadialGradient(dir * -sz * 0.72, 0, 0, dir * -sz * 0.72, 0, sz * 1.20)
          eg.addColorStop(0,    'rgba(100,180,255,0.90)')
          eg.addColorStop(0.30, 'rgba(60,130,255,0.45)')
          eg.addColorStop(0.65, 'rgba(40,90,220,0.18)')
          eg.addColorStop(1,    'transparent')
          ctx.fillStyle = eg
          ctx.beginPath(); ctx.arc(dir * -sz * 0.72, 0, sz * 1.20, 0, Math.PI * 2); ctx.fill()

          ctx.restore()

          // Astronaut on tether behind ship
          if (s.hasAstronaut) {
            const shipAng = Math.atan2(s.vy, s.vx)
            const backAng = shipAng + Math.PI
            const perpAng = shipAng + Math.PI / 2
            const attachX = s.x + Math.cos(backAng) * sz * 0.62
            const attachY = s.y + Math.sin(backAng) * sz * 0.62
            const tetherLen = sz * 2.6
            const wob = Math.sin(dk.t * 0.031 + s.astPhase) * sz * 0.50
            const astX = attachX + Math.cos(backAng) * tetherLen + Math.cos(perpAng) * wob
            const astY = attachY + Math.sin(backAng) * tetherLen + Math.sin(perpAng) * wob + 1.8
            const cpX = (attachX + astX) * 0.5 + Math.cos(perpAng) * sz * 0.55
            const cpY = (attachY + astY) * 0.5 + Math.sin(perpAng) * sz * 0.55 + 2
            ctx.save()
            ctx.globalAlpha = a * 0.58
            ctx.strokeStyle = 'rgba(188,210,255,0.80)'
            ctx.lineWidth = 0.75
            ctx.beginPath()
            ctx.moveTo(attachX, attachY)
            ctx.quadraticCurveTo(cpX, cpY, astX, astY)
            ctx.stroke()
            ctx.restore()
            drawAstronaut(astX, astY, sz * 0.90, a * 0.90, Math.sin(dk.t * 0.072 + s.astPhase))
          }
        }

        s.x += s.vx; s.y += s.vy; s.life++
        return s.x > -44 && s.x < W + 44
      })
    }

    function drawAstronaut(x, y, sz, alpha, wave) {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.translate(x, y)
      const r = sz * 0.44

      // Suit body
      ctx.fillStyle = 'rgba(215,226,248,0.93)'
      ctx.fillRect(-r * 0.72, r * 0.78, r * 1.44, r * 1.35)
      // Chest stripe
      ctx.fillStyle = 'rgba(148,172,220,0.55)'
      ctx.fillRect(-r * 0.28, r * 0.94, r * 0.56, r * 0.22)

      // Left arm — waving (animated via wave param)
      ctx.save()
      ctx.translate(-r * 0.80, r * 0.98)
      ctx.rotate(-0.88 + wave * 0.52)
      ctx.fillStyle = 'rgba(208,220,245,0.90)'
      ctx.beginPath()
      ctx.ellipse(0, r * 0.46, r * 0.22, r * 0.48, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = 'rgba(172,192,228,0.85)'
      ctx.beginPath()
      ctx.arc(0, r * 0.96, r * 0.21, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // Right arm — relaxed
      ctx.save()
      ctx.translate(r * 0.80, r * 0.98)
      ctx.rotate(0.52)
      ctx.fillStyle = 'rgba(208,220,245,0.90)'
      ctx.beginPath()
      ctx.ellipse(0, r * 0.44, r * 0.22, r * 0.46, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = 'rgba(172,192,228,0.85)'
      ctx.beginPath()
      ctx.arc(0, r * 0.92, r * 0.21, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // Legs
      ctx.fillStyle = 'rgba(200,214,240,0.88)'
      ctx.beginPath()
      ctx.ellipse(-r * 0.32, r * 2.30, r * 0.23, r * 0.46, -0.14, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(r * 0.32, r * 2.30, r * 0.23, r * 0.46, 0.14, 0, Math.PI * 2)
      ctx.fill()
      // Boots
      ctx.fillStyle = 'rgba(158,178,220,0.82)'
      ctx.beginPath()
      ctx.ellipse(-r * 0.34, r * 2.76, r * 0.27, r * 0.20, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(r * 0.34, r * 2.76, r * 0.27, r * 0.20, 0, 0, Math.PI * 2)
      ctx.fill()

      // Helmet
      ctx.fillStyle = 'rgba(208,224,250,0.96)'
      ctx.beginPath()
      ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.fill()

      // Helmet shine
      const hs = ctx.createRadialGradient(-r * 0.28, -r * 0.32, 0, 0, 0, r)
      hs.addColorStop(0,    'rgba(255,255,255,0.28)')
      hs.addColorStop(0.55, 'rgba(220,235,255,0.08)')
      hs.addColorStop(1,    'transparent')
      ctx.fillStyle = hs
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill()

      // Visor
      ctx.fillStyle = 'rgba(55,90,158,0.62)'
      ctx.beginPath()
      ctx.ellipse(0, r * 0.06, r * 0.60, r * 0.46, 0, 0, Math.PI * 2)
      ctx.fill()

      // Visor glint
      ctx.fillStyle = 'rgba(140,200,255,0.42)'
      ctx.beginPath()
      ctx.ellipse(-r * 0.18, -r * 0.06, r * 0.22, r * 0.14, -0.4, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    function drawUFO(fade = 1) {
      if (fade <= 0 || noAnim || mobile) return

      // Spawn a new UFO when timer fires
      if (!dk.ufo && dk.t >= dk.nextUfo) {
        const fromRight = Math.random() > 0.35
        const sX = fromRight ? W + 50 : -50
        const sY = Math.random() * H * 0.28
        const tx = dk.moonX + (Math.random() - 0.5) * dk.moonR * 4.0
        const ty = dk.moonY + dk.moonR * (1.8 + Math.random() * 1.5)
        const dx = tx - sX, dy = ty - sY
        const d  = Math.sqrt(dx * dx + dy * dy)
        const spd = 4.2 + Math.random() * 2.2
        dk.ufo = { x: sX, y: sY, vx: dx / d * spd, vy: dy / d * spd,
          phase: 'incoming', targetX: tx, targetY: ty, hoverFrames: 0, life: 0 }
      }

      const u = dk.ufo
      if (!u) return

      // Phase logic
      if (u.phase === 'incoming') {
        const dx = u.targetX - u.x, dy = u.targetY - u.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 10) {
          u.phase = 'hover'
          u.x = u.targetX; u.y = u.targetY; u.vx = 0; u.vy = 0
        } else {
          const spd = Math.min(5.5, dist * 0.062)
          u.vx = dx / dist * spd; u.vy = dy / dist * spd
          u.x += u.vx; u.y += u.vy
        }
      } else if (u.phase === 'hover') {
        u.hoverFrames++
        u.x = u.targetX + Math.sin(dk.t * 0.052) * 4.5
        u.y = u.targetY + Math.cos(dk.t * 0.040 + 1.1) * 2.8
        if (u.hoverFrames >= 62) {
          const ang = Math.random() * Math.PI * 2
          const spd = 32 + Math.random() * 18
          u.vx = Math.cos(ang) * spd; u.vy = Math.sin(ang) * spd
          u.phase = 'zoom'
        }
      } else if (u.phase === 'zoom') {
        u.x += u.vx; u.y += u.vy
        if (u.x < -140 || u.x > W + 140 || u.y < -140 || u.y > H + 140) {
          dk.ufo = null
          dk.nextUfo = dk.t + 900 + Math.random() * 1200
          return
        }
      }

      u.life++
      const totalAlpha = Math.min(1, u.life / 45) * fade
      if (totalAlpha <= 0.01) return

      const { x, y } = u
      const sz = Math.min(W, H) * 0.030

      ctx.save()
      ctx.globalAlpha = totalAlpha
      ctx.translate(x, y)

      // Zoom trail
      if (u.phase === 'zoom') {
        const spd  = Math.sqrt(u.vx * u.vx + u.vy * u.vy)
        const tLen = spd * 2.0
        const tAng = Math.atan2(u.vy, u.vx) + Math.PI
        const pAng = tAng + Math.PI / 2
        const trail = ctx.createLinearGradient(0, 0, Math.cos(tAng) * tLen, Math.sin(tAng) * tLen)
        trail.addColorStop(0,    'rgba(100,200,255,0.55)')
        trail.addColorStop(0.35, 'rgba(80,160,255,0.22)')
        trail.addColorStop(1,    'transparent')
        ctx.fillStyle = trail
        ctx.beginPath()
        ctx.moveTo( Math.cos(pAng) * sz * 0.55,  Math.sin(pAng) * sz * 0.55)
        ctx.lineTo(Math.cos(tAng) * tLen,          Math.sin(tAng) * tLen)
        ctx.lineTo(-Math.cos(pAng) * sz * 0.55,  -Math.sin(pAng) * sz * 0.55)
        ctx.closePath()
        ctx.fill()
      }

      // Tractor beam while hovering
      if (u.phase === 'hover') {
        const bA   = 0.06 + 0.04 * Math.sin(dk.t * 0.18)
        const beam = ctx.createLinearGradient(0, sz * 0.20, 0, sz * 3.0)
        beam.addColorStop(0,   `rgba(120,230,255,${bA.toFixed(3)})`)
        beam.addColorStop(0.5, `rgba(80,200,255,${(bA * 0.40).toFixed(3)})`)
        beam.addColorStop(1,   'transparent')
        ctx.fillStyle = beam
        ctx.beginPath()
        ctx.moveTo(-sz * 0.52, sz * 0.20)
        ctx.lineTo(-sz * 1.40, sz * 3.0)
        ctx.lineTo( sz * 1.40, sz * 3.0)
        ctx.lineTo( sz * 0.52, sz * 0.20)
        ctx.closePath()
        ctx.fill()
      }

      // Main saucer body
      const sG = ctx.createRadialGradient(0, -sz * 0.08, sz * 0.10, 0, 0, sz * 1.02)
      sG.addColorStop(0,   'rgba(188,208,242,0.92)')
      sG.addColorStop(0.6, 'rgba(148,170,218,0.88)')
      sG.addColorStop(1,   'rgba(108,132,194,0.75)')
      ctx.fillStyle = sG
      ctx.beginPath()
      ctx.ellipse(0, 0, sz, sz * 0.32, 0, 0, Math.PI * 2)
      ctx.fill()

      // Upper rim highlight
      ctx.fillStyle = 'rgba(215,232,255,0.48)'
      ctx.beginPath()
      ctx.ellipse(0, -sz * 0.06, sz * 0.82, sz * 0.15, 0, Math.PI, 0)
      ctx.fill()

      // Dome
      const dG = ctx.createRadialGradient(-sz * 0.14, -sz * 0.60, 0, 0, -sz * 0.26, sz * 0.54)
      dG.addColorStop(0,   'rgba(194,220,255,0.88)')
      dG.addColorStop(0.5, 'rgba(150,188,242,0.75)')
      dG.addColorStop(1,   'rgba(100,158,230,0.56)')
      ctx.fillStyle = dG
      ctx.beginPath()
      ctx.ellipse(0, -sz * 0.14, sz * 0.48, sz * 0.48, 0, Math.PI, 0)
      ctx.fill()

      // Dome shine
      ctx.fillStyle = 'rgba(225,242,255,0.36)'
      ctx.beginPath()
      ctx.ellipse(-sz * 0.14, -sz * 0.44, sz * 0.20, sz * 0.14, -0.5, 0, Math.PI * 2)
      ctx.fill()

      // Under-rim shadow
      ctx.fillStyle = 'rgba(55,75,128,0.58)'
      ctx.beginPath()
      ctx.ellipse(0, sz * 0.10, sz * 0.85, sz * 0.20, 0, 0, Math.PI)
      ctx.fill()

      // Blinking colored lights — wave/chase pattern around the rim
      const lightCount = 8
      const lightColors = ['rgba(255,88,88,0.95)', 'rgba(88,255,120,0.95)', 'rgba(78,188,255,0.95)', 'rgba(255,218,58,0.95)']
      for (let i = 0; i < lightCount; i++) {
        const ang     = (i / lightCount) * Math.PI * 2
        const lx      = Math.cos(ang) * sz * 0.74
        const ly      = Math.sin(ang) * sz * 0.24
        const blinkOn = Math.sin(dk.t * 0.14 + i * (Math.PI * 2 / lightCount)) > 0.25
        const col     = lightColors[i % lightColors.length]
        if (blinkOn) {
          const lg = ctx.createRadialGradient(lx, ly, 0, lx, ly, sz * 0.17)
          lg.addColorStop(0, col); lg.addColorStop(1, 'transparent')
          ctx.fillStyle = lg
          ctx.beginPath(); ctx.arc(lx, ly, sz * 0.17, 0, Math.PI * 2); ctx.fill()
        }
        ctx.fillStyle = blinkOn ? col : 'rgba(28,38,68,0.65)'
        ctx.beginPath(); ctx.arc(lx, ly, sz * 0.058, 0, Math.PI * 2); ctx.fill()
      }

      ctx.restore()
    }

    // ─── Light drawing ─────────────────────────────────────────
    function drawSky(fade = 1) {
      if (fade <= 0) return
      ctx.save(); ctx.globalAlpha = fade

      // Sky gradient
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.75)
      sky.addColorStop(0,    'rgba(48,132,248,0.62)')
      sky.addColorStop(0.26, 'rgba(82,164,255,0.38)')
      sky.addColorStop(0.55, 'rgba(140,204,255,0.17)')
      sky.addColorStop(1,    'rgba(190,224,255,0.05)')
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H)

      // Horizon warmth — subtle peach/amber band
      const horiz = ctx.createLinearGradient(0, H * 0.52, 0, H * 0.80)
      horiz.addColorStop(0,    'transparent')
      horiz.addColorStop(0.35, 'rgba(255,195,108,0.14)')
      horiz.addColorStop(0.70, 'rgba(255,165,75,0.09)')
      horiz.addColorStop(1,    'transparent')
      ctx.fillStyle = horiz; ctx.fillRect(0, 0, W, H)

      ctx.restore()
    }

    function drawSun(yOff = 0, fade = 1) {
      if (fade <= 0) return
      const sX = lt.sunX, sY = lt.sunY + yOff, sR = lt.sunR
      ctx.save(); ctx.globalAlpha = fade

      // Outer atmospheric haze — wide warm-white shimmer
      const haze = ctx.createRadialGradient(sX, sY, sR * 0.8, sX, sY, sR * 8.0)
      haze.addColorStop(0,    'rgba(255,248,228,0.22)')
      haze.addColorStop(0.20, 'rgba(255,244,220,0.11)')
      haze.addColorStop(0.50, 'rgba(255,238,210,0.04)')
      haze.addColorStop(1,    'transparent')
      ctx.fillStyle = haze
      ctx.beginPath(); ctx.arc(sX, sY, sR * 8.0, 0, Math.PI * 2); ctx.fill()

      // Corona — pale warm-white inner glow
      const corona = ctx.createRadialGradient(sX, sY, sR * 0.6, sX, sY, sR * 4.2)
      corona.addColorStop(0,    'rgba(255,252,238,0.36)')
      corona.addColorStop(0.28, 'rgba(255,248,228,0.18)')
      corona.addColorStop(0.60, 'rgba(255,242,215,0.07)')
      corona.addColorStop(1,    'transparent')
      ctx.fillStyle = corona
      ctx.beginPath(); ctx.arc(sX, sY, sR * 4.2, 0, Math.PI * 2); ctx.fill()

      // ── God rays — long crepuscular beams fanning out ──────────
      if (!noAnim) {
        const godCount = 14
        const gRot    = lt.t * 0.00013
        const gMaxLen = Math.max(W, H) * 1.65
        ctx.save()
        for (let i = 0; i < godCount; i++) {
          const ang      = (i / godCount) * Math.PI * 2 + gRot
          const halfAng  = 0.030 + 0.020 * Math.abs(Math.sin(i * 2.3))
          const lenFrac  = 0.42 + 0.58 * Math.abs(Math.sin(i * 1.5 + 0.7))
          const pulse    = 0.75 + 0.25 * Math.sin(lt.t * 0.0013 + i * 1.1)
          const len      = gMaxLen * lenFrac
          const startR   = sR * 1.06

          const x1   = sX + Math.cos(ang + halfAng) * startR
          const y1   = sY + Math.sin(ang + halfAng) * startR
          const x2   = sX + Math.cos(ang - halfAng) * startR
          const y2   = sY + Math.sin(ang - halfAng) * startR
          const xEnd = sX + Math.cos(ang) * len
          const yEnd = sY + Math.sin(ang) * len

          const ray = ctx.createLinearGradient(
            sX + Math.cos(ang) * startR, sY + Math.sin(ang) * startR,
            xEnd, yEnd
          )
          const a0 = (0.42 * pulse * fade).toFixed(3)
          ray.addColorStop(0,    `rgba(255,251,230,${a0})`)
          ray.addColorStop(0.09, `rgba(255,247,222,${(0.42 * pulse * fade * 0.55).toFixed(3)})`)
          ray.addColorStop(0.28, `rgba(255,243,214,${(0.42 * pulse * fade * 0.22).toFixed(3)})`)
          ray.addColorStop(0.58, `rgba(255,239,208,${(0.42 * pulse * fade * 0.07).toFixed(3)})`)
          ray.addColorStop(1,    'transparent')

          ctx.fillStyle = ray
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(xEnd, yEnd)
          ctx.lineTo(x2, y2)
          ctx.closePath()
          ctx.fill()
        }
        ctx.restore()
      }

      // ── Inner sparkle rays — short rotating sticks around disk ─
      if (!noAnim) {
        const rayCount = 16
        const angle0   = lt.t * 0.00042
        ctx.save()
        ctx.globalAlpha = fade * 0.17
        ctx.lineCap = 'round'
        for (let i = 0; i < rayCount; i++) {
          const ang   = (i / rayCount) * Math.PI * 2 + angle0
          const inner = sR * 1.24
          const outer = sR * (1.72 + 0.36 * Math.sin(i * 1.9 + lt.t * 0.0016))
          ctx.strokeStyle = 'rgba(255,252,232,1)'
          ctx.lineWidth   = sR * (i % 3 === 0 ? 0.14 : 0.08)
          ctx.beginPath()
          ctx.moveTo(sX + Math.cos(ang) * inner, sY + Math.sin(ang) * inner)
          ctx.lineTo(sX + Math.cos(ang) * outer,  sY + Math.sin(ang) * outer)
          ctx.stroke()
        }
        ctx.restore()
      }

      // Bloom — tight blinding warm-white glow
      const bloom = ctx.createRadialGradient(sX, sY, sR * 0.40, sX, sY, sR * 1.90)
      bloom.addColorStop(0,    'rgba(255,255,252,0.48)')
      bloom.addColorStop(0.45, 'rgba(255,252,242,0.22)')
      bloom.addColorStop(1,    'transparent')
      ctx.fillStyle = bloom
      ctx.beginPath(); ctx.arc(sX, sY, sR * 1.90, 0, Math.PI * 2); ctx.fill()

      // Disk — pure white core → pale cream-gold at limb
      ctx.save()
      ctx.beginPath(); ctx.arc(sX, sY, sR, 0, Math.PI * 2); ctx.clip()
      const disk = ctx.createRadialGradient(sX - sR * 0.16, sY - sR * 0.16, 0, sX, sY, sR * 1.02)
      disk.addColorStop(0,    'rgba(255,255,254,1.00)')
      disk.addColorStop(0.28, 'rgba(255,254,244,0.98)')
      disk.addColorStop(0.58, 'rgba(255,250,228,0.94)')
      disk.addColorStop(0.82, 'rgba(255,244,210,0.86)')
      disk.addColorStop(1.00, 'rgba(255,234,186,0.72)')
      ctx.fillStyle = disk
      ctx.fillRect(sX - sR * 1.1, sY - sR * 1.1, sR * 2.2, sR * 2.2)
      const limb = ctx.createRadialGradient(sX, sY, sR * 0.68, sX, sY, sR * 1.02)
      limb.addColorStop(0,   'transparent')
      limb.addColorStop(0.8, 'rgba(210,170,90,0.04)')
      limb.addColorStop(1,   'rgba(190,145,65,0.10)')
      ctx.fillStyle = limb
      ctx.fillRect(sX - sR * 1.1, sY - sR * 1.1, sR * 2.2, sR * 2.2)
      ctx.restore()

      ctx.restore()
    }

    function drawCloud(x, y, scale, opacity) {
      const s = scale * 62
      ctx.save(); ctx.globalAlpha = opacity

      // Shadow underside — blue-grey
      ctx.fillStyle = 'rgba(168,192,226,0.50)'
      const shadow = [
        [0,        s*0.24,  s*1.08, s*0.40],
        [-s*0.85,  s*0.30,  s*0.78, s*0.32],
        [ s*0.88,  s*0.32,  s*0.74, s*0.30],
      ]
      shadow.forEach(([ox, oy, rx, ry]) => {
        ctx.beginPath(); ctx.ellipse(x+ox, y+oy, rx, ry, 0, 0, Math.PI*2); ctx.fill()
      })

      // White puff body
      ctx.fillStyle = 'rgba(252,254,255,0.96)'
      const puffs = [
        [0,        0,        s*1.08, s*0.60],
        [-s*0.88,  s*0.08,   s*0.80, s*0.50],
        [ s*0.90,  s*0.10,   s*0.76, s*0.46],
        [-s*0.44, -s*0.30,   s*0.68, s*0.54],
        [ s*0.42, -s*0.26,   s*0.64, s*0.50],
        [0,       -s*0.10,   s*0.85, s*0.42],
        [-s*0.20, -s*0.46,   s*0.48, s*0.38],
        [ s*0.24, -s*0.40,   s*0.44, s*0.36],
      ]
      puffs.forEach(([ox, oy, rx, ry]) => {
        ctx.beginPath(); ctx.ellipse(x+ox, y+oy, rx, ry, 0, 0, Math.PI*2); ctx.fill()
      })

      // Soft top highlight
      const hl = ctx.createRadialGradient(x - s*0.08, y - s*0.52, 0, x - s*0.08, y - s*0.52, s*0.52)
      hl.addColorStop(0, 'rgba(255,255,255,0.22)')
      hl.addColorStop(1, 'transparent')
      ctx.fillStyle = hl
      ctx.beginPath(); ctx.ellipse(x, y - s*0.28, s*0.88, s*0.52, 0, 0, Math.PI*2); ctx.fill()

      ctx.restore()
    }

    function drawClouds(fade = 1) {
      if (fade <= 0) return
      for (const c of lt.clouds) {
        drawCloud(c.x, c.y, c.scale, c.opacity * fade)
        if (!noAnim) { c.x += c.speed; if (c.x > W + 260) c.x = -260 }
      }
    }

    // Small birds — simple V silhouettes drifting slowly
    function drawBird(x, y, size, a, flap) {
      const f    = Math.sin(flap)
      const tipY = f * size * 0.68          // wingtips swing up/down
      const cpY  = -size * 0.14 + f * size * 0.18  // control point follows the stroke
      ctx.save(); ctx.globalAlpha = a
      ctx.strokeStyle = 'rgba(38,58,105,0.90)'
      ctx.lineWidth   = Math.max(0.9, size * 0.28)
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(x - size, y + tipY)
      ctx.quadraticCurveTo(x - size * 0.36, y + cpY, x, y)
      ctx.moveTo(x, y)
      ctx.quadraticCurveTo(x + size * 0.36, y + cpY, x + size, y + tipY)
      ctx.stroke()
      ctx.restore()
    }

    function drawBirds(fade = 1) {
      if (fade <= 0 || noAnim) return
      for (const b of lt.birds) {
        b.flap += 0.12
        drawBird(b.x, b.y, b.size, b.alpha * fade, b.flap)
        b.x += b.vx
        if (b.x < -26) b.x = W + 26
      }
    }

    // ─── Main frame ────────────────────────────────────────────
    function frame() {
      ctx.clearRect(0, 0, W, H)

      const isDark = targetRef.current === 'dark'

      if (!noAnim) {
        if (state === 'dark'  && !isDark) { state = 'exit-dark';  tP = 0 }
        if (state === 'light' && isDark)  { state = 'exit-light'; tP = 0 }
        if (state === 'exit-dark')   { tP = Math.min(tP + 0.060, 1); if (tP >= 1) { state = 'enter-light'; tP = 0 } }
        if (state === 'enter-light') { tP = Math.min(tP + 0.050, 1); if (tP >= 1) { state = 'light';       tP = 0 } }
        if (state === 'exit-light')  { tP = Math.min(tP + 0.033, 1); if (tP >= 1) { state = 'enter-dark';  tP = 0 } }
        if (state === 'enter-dark')  { tP = Math.min(tP + 0.050, 1); if (tP >= 1) { state = 'dark';        tP = 0 } }
      } else {
        if (state === 'dark'  && !isDark) state = 'light'
        if (state === 'light' && isDark)  state = 'dark'
      }

      if (state === 'dark' || state === 'exit-dark' || state === 'enter-dark') canvas.style.opacity = '0.75'
      else canvas.style.opacity = '1'

      const DIST = H * 0.40

      if (state === 'dark') {
        drawNebula(); drawMoon(); drawStars(); drawShootingStar(); drawSpaceships(); drawUFO()
        dk.t++

      } else if (state === 'light') {
        drawSky(); drawSun(); drawClouds(); drawBirds()
        lt.t++

      } else if (state === 'exit-dark') {
        const p = easeInOut(tP)
        drawNebula(Math.max(0, 1 - p * 1.1))
        drawMoon(-DIST * p, Math.max(0, 1 - p * 1.3))
        drawStars(Math.max(0, 1 - p * 1.2))
        drawShootingStar(Math.max(0, 1 - p * 2))
        drawSpaceships(Math.max(0, 1 - p * 2))
        drawUFO(Math.max(0, 1 - p * 2))
        dk.t++

      } else if (state === 'enter-light') {
        const p = easeOut(tP)
        drawSky(p)
        drawSun(-DIST * (1 - p), Math.min(1, p * 1.3))
        drawClouds(Math.min(1, p * 1.2))
        drawBirds(Math.min(1, p * 1.0))
        lt.t++

      } else if (state === 'exit-light') {
        const p     = easeInOut(tP)
        const sunP  = Math.min(1, p * 2.4)
        const cFade = p < 0.28 ? 1 : Math.max(0, 1 - (p - 0.28) / 0.72)
        drawSky(Math.max(0, 1 - p))
        drawSun(-DIST * easeInOut(sunP), Math.max(0, 1 - sunP * 1.25))
        drawClouds(cFade)
        drawBirds(cFade)
        lt.t++

      } else if (state === 'enter-dark') {
        const p = easeOut(tP)
        drawNebula(Math.min(1, p * 1.1))
        drawStars(Math.min(1, p * 1.1))
        drawMoon(-DIST * (1 - p), Math.min(1, p * 1.3))
        drawSpaceships(Math.min(1, p * 1.2))
        drawUFO(Math.min(1, p * 1.2))
        dk.t++
      }

      frameId = requestAnimationFrame(frame)
    }

    resize()
    let prevW = W
    canvas.style.opacity = (state === 'enter-dark' || state === 'dark') ? '0.75' : '1'
    frame()

    const onResize = () => {
      const nW = window.innerWidth
      // Ignore height-only changes under 150px — mobile toolbar show/hide
      if (nW === prevW && Math.abs(window.innerHeight - H) < 150) return
      prevW = nW
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
  }, [])

  return <canvas ref={ref} className="starfield" aria-hidden="true" />
}
