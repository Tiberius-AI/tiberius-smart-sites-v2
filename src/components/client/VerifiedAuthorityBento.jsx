import { useEffect, useRef, useState } from 'react'

const GOOGLE_MAPS_REVIEW_URL =
  'https://www.google.com/maps/search/?api=1&query=SCG+Roofing+Manchester+NH'

const ROOFING_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'RoofingContractor'],
  name: 'SCG Roofing',
  alternateName: 'Southern Cross Group Roofing',
  url: 'https://www.scgroofs.com/',
  telephone: '(603) 420-2824',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '146 Londonderry Turnpike, Unit 20',
    addressLocality: 'Hooksett',
    addressRegion: 'NH',
    postalCode: '03106',
    addressCountry: 'US',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Manchester',
      containedInPlace: {
        '@type': 'State',
        name: 'New Hampshire',
      },
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Southern New Hampshire',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '2',
    reviewCount: '2',
  },
  review: [
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Sheila McDonough',
      },
      datePublished: '2026-06-15',
      reviewBody:
        "SCG did a great job stripping and reroofing our home in Manchester. Patrick was professional and stuck to his schedule. His crew was quick and efficient. I would highly recommend them for anyone's roofing needs.",
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Thomas Scola',
      },
      datePublished: '2026-06-15',
      reviewBody: 'Excellent work, totally recommended 👍👍',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
      },
    },
  ],
}

function GoogleGIcon() {
  return (
    <svg
      className="bento-google-g"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v2.98h3.86c2.26-2.09 3.56-5.17 3.56-8.8z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-2.98c-1.08.72-2.45 1.16-4.07 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.31c-.24-.72-.38-1.49-.38-2.31s.14-1.59.38-2.31V6.6H1.29C.47 8.23 0 10.06 0 12s.47 3.77 1.29 5.4l3.99-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.6l3.99 3.09c.95-2.85 3.6-4.94 6.72-4.94z"
      />
    </svg>
  )
}

function GoldStars({ staggered = false, idPrefix = 'star' }) {
  return (
    <div
      className={`bento-stars-row ${staggered ? 'is-staggered' : ''}`}
      role="img"
      aria-label="5.0 out of 5 stars"
    >
      {[0, 1, 2, 3, 4].map((idx) => {
        const gradId = `${idPrefix}-gold-grad-${idx}`
        return (
          <svg
            key={idx}
            className="bento-star-svg"
            style={
              staggered
                ? { '--star-delay': `${idx * 80}ms` }
                : undefined
            }
            viewBox="0 0 20 20"
            width="18"
            height="18"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${gradId})`}
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.447a1 1 0 00-1.175 0l-3.368 2.447c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.075 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.274-3.957z"
            />
          </svg>
        )
      })}
    </div>
  )
}

export default function VerifiedAuthorityBento({ onOpenQuote }) {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [ratingDisplay, setRatingDisplay] = useState('0.0')

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      setRatingDisplay('5.0')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setRatingDisplay('5.0')
      return
    }

    const duration = 1200
    const target = 5.0
    let startTime = null
    let rafId = null

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(1, elapsed / duration)
      // Cubic ease-out for crisp deceleration onto 5.0
      const eased = 1 - Math.pow(1 - progress, 3)
      const currentVal = (target * eased).toFixed(1)
      setRatingDisplay(currentVal)

      if (progress < 1) {
        rafId = window.requestAnimationFrame(step)
      } else {
        setRatingDisplay('5.0')
      }
    }

    rafId = window.requestAnimationFrame(step)
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [isVisible])

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  const handleEstimateClick = (e) => {
    e.preventDefault()
    if (typeof onOpenQuote === 'function') {
      onOpenQuote()
      return
    }
    const inquiryEl = document.getElementById('inquiry')
    if (inquiryEl) {
      inquiryEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="verified-authority"
      aria-labelledby="verified-authority-heading"
      className={`verified-authority-bento ${isVisible ? 'is-in-view' : ''}`}
    >
      {/* Embedded LocalBusiness / RoofingContractor JSON-LD Schema for NH SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ROOFING_JSON_LD) }}
      />

      {/* Ambient Radial Lighting Backdrop for True Glassmorphism Depth */}
      <div className="bento-ambient-glow" aria-hidden="true">
        <span className="ambient-orb orb-gold" />
        <span className="ambient-orb orb-copper" />
        <span className="ambient-orb orb-slate" />
      </div>

      <div className="wrap bento-container">
        <h2 id="verified-authority-heading" className="visually-hidden">
          5.0-Star Verified Google Reviews for SCG Roofing in Manchester, NH
        </h2>

        {/* 1. TOP ANIMATED TRUST STRIP (Bridge Under the Hero) */}
        <div
          className="bento-glass-surface authority-trust-strip"
          onMouseMove={handleCardMouseMove}
        >
          <div className="trust-strip-left">
            <div className="google-badge-cluster">
              <span className="google-g-wrapper">
                <GoogleGIcon />
              </span>
              <span
                className="trust-rating-counter"
                aria-label="5.0 out of 5 rating"
              >
                {ratingDisplay}
              </span>
            </div>

            <div className="trust-stars-sheen-wrap">
              <GoldStars staggered={true} idPrefix="strip" />
              <span className="trust-verified-caption">
                Verified Google Rating · Manchester &amp; Southern NH
              </span>
            </div>
          </div>

          <div
            className="trust-strip-pills"
            aria-label="Verified customer feedback highlights"
          >
            <span className="trust-verified-pill">
              <span className="pill-check" aria-hidden="true">
                ✓
              </span>
              Manchester, NH Verified
            </span>
            <span className="trust-verified-pill">
              <span className="pill-check" aria-hidden="true">
                ✓
              </span>
              On-Schedule Execution
            </span>
            <span className="trust-verified-pill">
              <span className="pill-check" aria-hidden="true">
                ✓
              </span>
              Full Strip &amp; Reroof Specialists
            </span>
          </div>
        </div>

        {/* 2. ASYMMETRIC 3-CARD BENTO GRID LAYOUT */}
        <div className="authority-bento-grid">
          {/* Card A (Left Column, Spans 2 Rows): Featured Manchester Spotlight + Owner Reply */}
          <article
            className="bento-glass-surface bento-card bento-card-featured"
            style={{ '--card-delay': '80ms' }}
            onMouseMove={handleCardMouseMove}
          >
            <header className="bento-card-header">
              <div className="reviewer-avatar avatar-sm" aria-hidden="true">
                <span>SM</span>
              </div>
              <div className="reviewer-meta-group">
                <div className="reviewer-name-row">
                  <strong className="reviewer-name">Sheila McDonough</strong>
                  <span className="google-mini-tag">
                    <GoogleGIcon />
                    <span>Verified</span>
                  </span>
                </div>
                <span className="reviewer-meta">
                  Verified Google Review • Manchester, NH • 4 months ago
                </span>
              </div>
              <div className="header-stars-right">
                <GoldStars idPrefix="sheila" />
              </div>
            </header>

            <blockquote className="featured-review-body">
              <p>
                “SCG did a great job{' '}
                <mark className="bento-highlight mark-1">
                  stripping and reroofing our home in Manchester
                </mark>
                . Patrick was{' '}
                <mark className="bento-highlight mark-2">
                  professional and stuck to his schedule
                </mark>
                . His crew was{' '}
                <mark className="bento-highlight mark-3">
                  quick and efficient
                </mark>
                . I would highly recommend them for anyone&apos;s roofing needs.”
              </p>
            </blockquote>

            {/* Nested Owner Response Sub-Card */}
            <aside
              className="owner-response-subcard"
              aria-label="Owner response from SCG Roofing"
            >
              <div className="owner-response-badge">
                <span className="owner-dot" aria-hidden="true" />
                <strong>SCG Roofing (Owner) • Direct Response</strong>
              </div>
              <p className="owner-response-text">
                <em>
                  “Thank you for trusting SCG with your home. We’re glad you had
                  a great experience!”
                </em>
              </p>
            </aside>
          </article>

          {/* Card B (Top Right Column): High-Impact Endorsement Card */}
          <article
            className="bento-glass-surface bento-card bento-card-endorsement"
            style={{ '--card-delay': '200ms' }}
            onMouseMove={handleCardMouseMove}
          >
            <header className="bento-card-header">
              <div className="reviewer-avatar avatar-ts" aria-hidden="true">
                <span>TS</span>
              </div>
              <div className="reviewer-meta-group">
                <div className="reviewer-name-row">
                  <strong className="reviewer-name">Thomas Scola</strong>
                </div>
                <span className="reviewer-meta">
                  Verified Google Review • 4 months ago
                </span>
              </div>
              <div className="header-stars-right">
                <GoldStars idPrefix="thomas" />
              </div>
            </header>

            <blockquote className="endorsement-display-quote">
              <p>“Excellent work, totally recommended 👍👍”</p>
            </blockquote>

            <footer className="endorsement-footer">
              <span className="satisfaction-footer-pill">
                <span className="gold-spark" aria-hidden="true">
                  ★
                </span>
                100% 5.0-Star Customer Satisfaction Rating
              </span>
            </footer>
          </article>

          {/* Card C (Bottom Right Column): The "Work With Patrick" Action & Live Verification Card */}
          <article
            className="bento-glass-surface bento-card bento-card-action"
            style={{ '--card-delay': '320ms' }}
            onMouseMove={handleCardMouseMove}
          >
            <div className="action-card-content">
              <span className="action-kicker">
                DIRECT OWNER LED · MANCHESTER &amp; HOOKSETT, NH
              </span>
              <h3 className="action-headline">
                Want a Roof Done On-Time &amp; On-Schedule?
              </h3>
              <p className="action-subtext">
                Deal directly with Patrick and a crew that respects your
                property and timeline.
              </p>
            </div>

            <div className="action-card-ctas">
              <a
                href="#inquiry"
                className="bento-primary-cta"
                onClick={handleEstimateClick}
              >
                <span>Get Your Free Roof Estimate</span>
                <span className="cta-arrow" aria-hidden="true">
                  →
                </span>
              </a>

              <a
                href={GOOGLE_MAPS_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-secondary-trust-link"
              >
                <GoogleGIcon />
                <span>See Our 5.0 Rating on Google Maps</span>
                <span className="external-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
