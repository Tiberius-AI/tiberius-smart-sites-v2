# Scrollytelling Hero & 5.0-Star Verified Authority Bento Technical Reference

## 1. Frame-Locked 24fps Scroll-Video Engine (`ClientWebsiteView.jsx`)

### Why Standard React `useEffect` Video Scrubbing Fails
In Chromium and WebKit, assigning `video.currentTime = targetTime` on every scroll event while `video.seeking === true` cancels the in-flight frame decode. During continuous scrolling, zero intermediate frames paint until scrolling stops.

### The Golden Pattern (`seekingRef` + `seeked` Chaining)
Always use the frame-locked driver implemented in `src/components/client/ClientWebsiteView.jsx`:
1. Compute `progress` (`0` to `1`) directly from `heroEl.getBoundingClientRect()`:
   ```js
   const maxScroll = Math.max(1, rect.height - window.innerHeight)
   const scrolled = -rect.top
   const rawProgress = Math.min(1, Math.max(0, scrolled / maxScroll))
   ```
2. Convert `progress` to target video timestamp using `timeAt(progress, duration, fps)`:
   ```js
   function timeAt(progress, duration = 8, fps = 24) {
     if (!Number.isFinite(duration) || duration <= 0) return 0
     const clamped = Math.min(1, Math.max(0, Number(progress) || 0))
     return clamped * Math.max(0, duration - 1 / fps)
   }
   ```
3. Store `targetTimeRef.current = nextTime`. If `seekingRef.current === true`, return immediately and let the video's `seeked` event listener immediately flush the latest `targetTimeRef.current` once the current frame finishes decoding.
4. Set `data-ready="true"` on `.hero-video` when `loadeddata` or `canplay` fires so CSS transitions `.hero-video[data-ready="true"] { opacity: 1 }` seamlessly over the poster image.

---

## 2. 5.0-Star Verified Authority Bento Section (`VerifiedAuthorityBento.jsx`)

Located at `src/components/client/VerifiedAuthorityBento.jsx` and styled in `src/App.css`.

### Visual & Glassmorphic Design Tokens
- **Section Backdrop**: `background: linear-gradient(180deg, #07090E 0%, #0B0F18 52%, #0D111A 100%)` with 3 blurred radial ambient orbs (`.orb-gold`, `.orb-copper`, `.orb-slate`) behind the cards so `backdrop-filter: blur(16px)` has rich depth.
- **Card Surface (`.bento-glass-surface`)**:
  - `background: rgba(18, 24, 38, 0.55)`
  - `backdrop-filter: blur(16px)`
  - `border: 1px solid rgba(255, 255, 255, 0.10)`
  - `border-top: 1px solid rgba(255, 255, 255, 0.22)` (specular top highlight)
  - `border-radius: 20px`
- **Micro-Interactions**:
  - `IntersectionObserver` (`threshold: 0.16`) adds `.is-in-view` when scrolling out of the hero track.
  - `requestAnimationFrame` cubic ease-out counter animates `0.0` → `5.0` over `1200ms`.
  - 5 SVG gold stars (`#FBBF24` → `#F59E0B`) pop in with an `80ms` stagger (`--star-delay`) and a diagonal CSS sheen sweep (`@keyframes bentoStarSheen`).
  - Semantic `<mark className="bento-highlight">` phrases animate `background-size: 0% 100%` → `100% 100%` at `480ms`, `700ms`, and `920ms` delays.
  - `onMouseMove` updates `--mouse-x` and `--mouse-y` on each card for a cursor-tracking radial spotlight glow + `translateY(-4px)` hover elevation.

---

## 3. Non-Negotiable CSS & Layout Guardrails (`src/App.css`)

1. **Desktop Sticky Hero Pinning (`@media (min-width: 768px)`)**:
   - `.codex-site-wrapper .hero[data-motion="scrub"] { height: 250svh; }`
   - `.codex-site-wrapper .hero-sticky { position: sticky; top: 58px; height: calc(100svh - 58px); min-height: 620px; max-height: 1080px; }`
   - **NEVER** apply `overflow-x: hidden` or `overflow-x: clip` to `html`, `body`, `#root`, `.platform-app-shell`, or `.codex-site-wrapper` on desktop viewports—doing so breaks `position: sticky` on `.hero-sticky`.
   - Apply `overflow-x: clip` to `.platform-app-shell` **only** inside `@media (max-width: 767px)` where `.hero` uses `data-motion="static"` (`position: relative`).
2. **Dark Component Text Contrast Guardrail**:
   - Because `/packages/site-components/conversion-design.css` sets `body[data-site="scg-roofing"] { color: #24292f }` and `button { color: inherit }`, any dark-mode surface outside `.platform-topbar` (such as `.verified-authority-bento`, `.config-modal`, `.platform-toast`) must explicitly set `color: #F8FAFC` on its container, headings, buttons, and badges.
3. **Floating Helper Launcher Auto-Hide in Hero**:
   - `.helper-launcher` has `.is-hidden-in-hero` (`opacity: 0; pointer-events: none; transform: translateY(16px);`) whenever `pastHero === false`, preventing the floating chat bubble from overlapping the "Instant SMS Quote" button in the hero's Contextual AI Dock.
