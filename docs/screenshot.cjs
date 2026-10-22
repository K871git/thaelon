/**
 * Thaelon screenshot suite — dark + light, all major sections + mobile
 * Run: node docs/screenshot.cjs
 */
const { chromium } = require('playwright')
const path = require('path')

const BASE  = 'http://localhost:5173'
const OUT   = 'docs'
const W     = 1440
const H     = 900

const SECTIONS = [
  'hero', 'about', 'skills', 'process', 'products',
  'craft', 'team', 'pricing', 'contact',
]

async function setTheme(page, theme) {
  await page.evaluate((t) => {
    document.documentElement.setAttribute('data-theme', t)
    localStorage.setItem('thaelon-theme', t)
  }, theme)
  await page.waitForTimeout(700)
}

;(async () => {
  const browser = await chromium.launch({ headless: true })

  // ── Desktop ──────────────────────────────────────────────────
  const ctx  = await browser.newContext({ viewport: { width: W, height: H } })
  const page = await ctx.newPage()

  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1800)

  for (const theme of ['dark', 'light']) {
    console.log(`\n[desktop ${theme}]`)
    await setTheme(page, theme)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(500)

    // full page
    await page.screenshot({ path: `${OUT}/screenshot_${theme}_full.png`, fullPage: true })
    console.log(`  ${theme} full`)

    // viewport hero
    await page.screenshot({ path: `${OUT}/screenshot_${theme}_hero.png` })
    console.log(`  ${theme} hero`)

    // each section
    for (const id of SECTIONS) {
      const el = page.locator(`#${id}`)
      if (await el.count() === 0) { console.log(`  skip #${id}`); continue }
      await el.scrollIntoViewIfNeeded()
      await page.waitForTimeout(600)
      await page.screenshot({ path: `${OUT}/screenshot_${theme}_${id}.png` })
      console.log(`  ${theme} ${id}`)
    }
  }

  await ctx.close()

  // ── Mobile (390×844) dark ────────────────────────────────────
  console.log('\n[mobile dark]')
  const mCtx  = await browser.newContext({ viewport: { width: 390, height: 844 } })
  const mPage = await mCtx.newPage()
  await mPage.goto(BASE, { waitUntil: 'networkidle' })
  await mPage.waitForTimeout(1500)
  await setTheme(mPage, 'dark')
  await mPage.evaluate(() => window.scrollTo(0, 0))
  await mPage.waitForTimeout(400)
  await mPage.screenshot({ path: `${OUT}/screenshot_mobile_hero.png` })
  console.log('  mobile hero')
  for (const id of SECTIONS) {
    const el = mPage.locator(`#${id}`)
    if (await el.count() === 0) continue
    await el.scrollIntoViewIfNeeded()
    await mPage.waitForTimeout(500)
    await mPage.screenshot({ path: `${OUT}/screenshot_mobile_${id}.png` })
    console.log(`  mobile ${id}`)
  }
  await mCtx.close()

  await browser.close()
  console.log('\nAll screenshots saved.')
})()
