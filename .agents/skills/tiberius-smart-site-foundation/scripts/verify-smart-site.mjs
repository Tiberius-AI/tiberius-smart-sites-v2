/**
 * Automated Playwright Verification Script for Tiberius Smart Sites v2
 * Usage:
 *   node .agents/skills/tiberius-smart-site-foundation/scripts/verify-smart-site.mjs http://localhost:4173
 */
import { chromium } from 'playwright'

const targetUrl = process.argv[2] || 'http://localhost:4173'

;(async () => {
  console.log(`[Verify] Launching headless Chromium against ${targetUrl}...`)
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

  const errors = []
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })
  page.on('pageerror', (e) => errors.push(e.message))

  await page.goto(targetUrl, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)

  // 1. Check all images are loaded
  const imgStats = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'))
    const broken = imgs
      .filter((i) => !i.complete || i.naturalWidth === 0)
      .map((i) => i.src)
    return { total: imgs.length, brokenCount: broken.length, broken }
  })
  console.log('[1/5] Image Check:', imgStats)

  // 2. Check hero video scrubbing & sticky pinning
  const scrollSteps = [0, 350, 700, 1100, 1600]
  const scrubResults = []
  for (const y of scrollSteps) {
    await page.evaluate(
      (scrollY) => window.scrollTo({ top: scrollY, behavior: 'instant' }),
      y
    )
    await page.waitForTimeout(220)
    const state = await page.evaluate(() => {
      const v = document.querySelector('.hero-video')
      const sticky = document.querySelector('.hero-sticky')
      const launcher = document.querySelector('.helper-launcher')
      return {
        scrollY: Math.round(window.scrollY),
        videoReady: v ? v.dataset.ready : null,
        currentTime: v ? Number(v.currentTime.toFixed(2)) : null,
        stickyTop: sticky ? Math.round(sticky.getBoundingClientRect().top) : null,
        launcherHiddenInHero: launcher
          ? launcher.classList.contains('is-hidden-in-hero')
          : null,
      }
    })
    scrubResults.push(state)
  }
  console.log('[2/5] Hero Scrollytelling Scrub Check:', scrubResults)

  // 3. Check 5.0-Star Verified Authority Bento Section
  await page.locator('#verified-authority').scrollIntoViewIfNeeded()
  await page.waitForTimeout(1400)
  const bentoCheck = await page.evaluate(() => {
    const section = document.querySelector('#verified-authority')
    const counter = document.querySelector('.trust-rating-counter')
    const cards = document.querySelectorAll('#verified-authority .bento-card')
    const marks = Array.from(
      document.querySelectorAll('#verified-authority mark.bento-highlight')
    )
    const jsonLd = document.querySelector(
      '#verified-authority script[type="application/ld+json"]'
    )
    return {
      isInView: section ? section.classList.contains('is-in-view') : false,
      ratingCounter: counter ? counter.textContent.trim() : null,
      cardCount: cards.length,
      markCount: marks.length,
      hasJsonLd: Boolean(jsonLd && JSON.parse(jsonLd.textContent).aggregateRating),
    }
  })
  console.log('[3/5] 5.0-Star Verified Authority Bento Check:', bentoCheck)

  // 4. Check JSON Config Modal Contrast
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await page.waitForTimeout(200)
  await page.click('.btn-json-config')
  await page.waitForTimeout(250)
  const modalCheck = await page.evaluate(() => {
    const h3 = document.querySelector('.modal-title-group h3')
    return {
      h3Color: h3 ? getComputedStyle(h3).color : null,
    }
  })
  console.log('[4/5] JSON Config Modal Contrast:', modalCheck)
  await page.click('.config-modal .icon-close-btn')

  // 5. Check Mobile Viewport (390x844) Overflow
  await page.setViewportSize({ width: 390, height: 844 })
  await page.waitForTimeout(350)
  const mobileCheck = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    overflowX:
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  }))
  console.log('[5/5] Mobile Viewport Check (390x844):', mobileCheck)
  console.log('[Verify] Console/Page Errors:', errors)

  await browser.close()

  if (
    imgStats.brokenCount > 0 ||
    errors.length > 0 ||
    !bentoCheck.isInView ||
    !bentoCheck.hasJsonLd ||
    mobileCheck.overflowX
  ) {
    process.exit(1)
  }
})()
