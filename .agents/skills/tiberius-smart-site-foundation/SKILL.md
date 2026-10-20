---
name: tiberius-smart-site-foundation
description: >-
  Master blueprint and end-to-end workflow for building, adapting, rearranging,
  and verifying a Tiberius Smart Site (3-Pillar Scrollytelling Client Website,
  5.0-Star Verified Authority Bento Section, Embedded Contextual AI Dock,
  3-Pane Back-Office Conversation Room, and SMS/Review Workflows) for any service
  or local business vertical (Roofing, HVAC, Plumbing, Custom Decks, Electrical,
  Tree Service, Solar, MedSpa, Legal, etc.). Activate this skill whenever the user
  wants to spin up a new client site, onboard a new contractor/business vertical,
  rearrange page sections, or customize the Scrollytelling + Authority Bento foundation.
---

# Tiberius Smart Site Foundation Skill

This skill provides the complete architectural foundation, design tokens, component hierarchy, vertical adaptation runbook, and automated Playwright verification suite for **Tiberius Smart Sites v2**.

The reference implementation lives in:
- **Repository Root**: `C:\Users\monet\OneDrive\Documents\A       A       A       NB INSIDER\nb-insider`
- **Autonomous Visual Reviewer Agent**: `C:\Users\monet\.gemini\antigravity\scratch\site-reviewer-agent`

---

## 1. Core Architecture: The 3-Pillar + Single-JSON Engine

Every Tiberius Smart Site is driven by a **Single Tenant JSON Configuration** (`src/config/contractors.json`) that dynamically powers all three pillars without duplicating code:

1. **Pillar 1 — Client Scrollytelling & Conversion Site (`src/components/client/`)**:
   - **Sticky Top Command Bar** (`PlatformTopBar.jsx`) + **Editorial Site Header**
   - **24fps Scrollytelling Hero (`ClientWebsiteView.jsx`)**: Frame-locked `scrub.mp4` video (with 150-frame `.webp` & 3D CAD wireframe fallback), choreographed scroll callout cards, and the embedded **Contextual AI Dock** (`ContextualAIDock.jsx`) at the bottom of the hero.
   - **5.0-Star Verified Authority Bento Section (`VerifiedAuthorityBento.jsx`)**: Zero-plugin dark luxury glassmorphic social-proof bridge immediately below the hero track with animated `0.0 → 5.0` Google counter, staggered SVG gold stars with sheen sweep, 3-card asymmetric Bento layout, animated `<mark>` phrase highlights, nested Owner Direct Response card, cursor-tracking radial glow, and embedded `LocalBusiness` JSON-LD schema.
   - **Modular Conversion Sections**: Help Dock, Primary & Supporting Services Grid, Structural/Technical Approach, Authorized Project Showcase & Testimonials, Guided Quote Invitation, Service Area & Interactive FAQs, and 3-Mode Live Helper Dialog (`TiberiusHelperModal.jsx`).
2. **Pillar 2 — 3-Pane Unified Conversation Room (`src/components/backoffice/`)**:
   - 25% Thread Queue (`ThreadQueue.jsx`), 50% Unified SMS/Web/Voice Timeline with Alfred 3-Mode Co-Pilot (`UnifiedTimeline.jsx`), and 25% Live AI Job Summary & Cal.com Dispatch Card (`JobSummaryCard.jsx`).
3. **Pillar 3 — Missed-Call Text-Back & TOS-Safe Review Workflows (`src/components/workflows/`)**:
   - Interactive simulators for instant Missed-Call SMS Rescue and FTC/Google TOS-compliant conversational sentiment routing (`WorkflowsLabView.jsx`).

---

## 2. Step-by-Step Workflow to Spin Up or Adapt a New Vertical

When asked to build or adapt a site for a new business or vertical (e.g., HVAC, Plumbing, Landscaping, Solar, MedSpa, Auto Detailing):

### Step 1: Define the Vertical Tenant JSON Configuration
Read [vertical-json-schema.md](./references/vertical-json-schema.md) and populate or add the tenant object in `src/config/contractors.json`:
- Set core identity (`id`, `companyName`, `niche`, `city`, `addressLine`, `brandColor`, `accentSecondary`, `phoneDisplay`, `emailDisplay`).
- Configure `media` (`poster`, `video`, `detailImage`, `helperAvatar`, `duration`, `fps`) and `frameSequence` (`wireframeModel`).
- Define 3 scroll-synchronized `callouts` (`0.08–0.34`, `0.38–0.65`, `0.69–0.95`) that narrate what the camera reveals as the user scrolls.
- Define `verifiedAuthority` for the **5.0-Star Verified Authority Bento Section** (including `schemaType`, 3 verified trust pills, featured customer review with 3 `<mark>` segments + owner reply, display endorsement quote, and direct owner CTA card).
- Populate `pricingRules.services` (4–6 high-intent services with transparent local price ranges) and `pricingRules.aiPromptRules` for Alfred AI.

### Step 2: Arrange the Page Sections for the Target Vertical
Read [section-rearrangement-playbook.md](./references/section-rearrangement-playbook.md) to select or customize the optimal section order below the hero track:
- **High-Ticket Exterior / Remodel Pattern (Default — Roofing, Siding, Windows, Solar)**:
  `Hero Track` → `5.0-Star Verified Authority Bento` → `3-Action Help Dock` → `Primary & Supporting Services` → `Structural/Technical Approach` → `Project Showcase & Proof` → `Quote Invitation` → `Local Area & FAQs` → `Live Inquiry Grid`.
- **Emergency Dispatch Pattern (HVAC, Plumbing, Electrical, Tree Removal, Water Damage)**:
  `Hero Track` → `3-Action Emergency Help Dock` → `5.0-Star Verified Authority Bento` → `Flat-Rate Diagnostic & Repair Services` → `Technical Approach` → `Project Proof` → `Local Area & FAQs` → `Live Inquiry Grid`.
- **Portfolio / Design-Build Pattern (Custom Decks, Hardscapes, Pools, MedSpa, Kitchen/Bath)**:
  `Hero Track` → `5.0-Star Verified Authority Bento` → `Visual Project Showcase & Before/After Gallery` → `Design & Build Services` → `Engineering Approach` → `Quote Invitation` → `Local Area & FAQs` → `Live Inquiry Grid`.

### Step 3: Preserve Critical Engine & CSS Guardrails
Read [scrollytelling-and-bento-engine.md](./references/scrollytelling-and-bento-engine.md) before modifying `ClientWebsiteView.jsx`, `VerifiedAuthorityBento.jsx`, or `App.css`. Always enforce these 5 non-negotiable engineering rules:
1. **Frame-Locked Video Scrubbing**: Never set `video.currentTime` in a React `useEffect` without a `seekingRef` lock and `seeked` event listener chain. Unthrottled `currentTime` assignments abort in-flight frame decodes in Chromium/Safari.
2. **Sticky Hero Protection**: Never place `overflow-x: hidden` or `overflow-x: clip` on `html`, `body`, `#root`, `.platform-app-shell`, or `.codex-site-wrapper` on desktop (`min-width: 768px`), as it breaks `position: sticky` on `.hero-sticky`. Keep `.codex-site-wrapper .hero-sticky` at `top: 58px; height: calc(100svh - 58px)`.
3. **Dark-Surface Contrast Isolation**: Because `/packages/site-components/conversion-design.css` sets `body { color: #24292f }` and `button { color: inherit }`, any dark glassmorphic section or modal (`.verified-authority-bento`, `.config-modal`, `.platform-toast`) MUST explicitly declare light foreground colors (`#F8FAFC` / `#CBD5E1`).
4. **Hero Floating Launcher Auto-Hide**: Keep `.helper-launcher.is-hidden-in-hero` active while `pastHero === false` so the floating chat bubble never overlaps the embedded Contextual AI Dock's *"Instant SMS Quote"* button.
5. **Clean Quick-Chip & Placeholder Copy**: Strip parentheticals and never allow quick-action chip labels to end with a dangling `&` or `and`. Keep the AI Dock input placeholder concise (`Ask a [vertical] question or describe damage...`).

### Step 4: Run Automated Playwright & Visual Verification
After making any vertical changes or rearranging sections:
1. Build the production bundle:
   ```powershell
   npm run build
   ```
2. Run the automated verification script [verify-smart-site.mjs](./scripts/verify-smart-site.mjs) against the preview server to assert:
   - Smooth `scrub.mp4` video seeking across scroll steps (`0px` → `1600px`)
   - `0` broken images (`loading="eager"` on showcase images) and `0` console/page errors
   - `VerifiedAuthorityBento` `5.0` rating count-up, `<mark>` highlight animations, and valid `LocalBusiness` JSON-LD schema
   - `0px` horizontal overflow on mobile (`390×844`)
3. Optionally run the standalone **Autonomous Website Reviewer Agent** (`C:\Users\monet\.gemini\antigravity\scratch\site-reviewer-agent`) for a full human-perspective visual & UX audit.
