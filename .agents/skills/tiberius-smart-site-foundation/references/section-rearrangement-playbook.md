# Section Rearrangement Playbook by Vertical

While the **Scrollytelling Hero + Embedded Contextual AI Dock** always anchors the top of the page and the **Full Editorial Footer + Floating Helper Dialog** anchors the bottom, the below-the-fold conversion sections in `src/components/client/ClientWebsiteView.jsx` are modular blocks that can be rearranged to fit the psychology of any vertical.

---

## 1. The 8 Modular Page Blocks Below the Hero

| Block ID | Component / CSS Class | Purpose |
| :--- | :--- | :--- |
| `authority-bento` | `<VerifiedAuthorityBento />` (`.verified-authority-bento`) | Dark glassmorphic 5.0-star Google trust strip + 3-card asymmetric review/CTA Bento + `LocalBusiness` JSON-LD. |
| `help-dock` | `.help-dock.wrap` | 3-column quick-action triage bar (*Ask a question*, *Start quote request*, *Book inspection/consult*). |
| `services` | `<section className="roof-services wrap" id="services">` | 2 flagship primary service pathways + right-side feature image + 4 supporting service tiles. |
| `approach` | `<section className="roof-process structural-approach" id="approach">` | Split-screen diagnostic/technical philosophy (*"Look beyond the surface"* + 3 bulleted inspection pillars). |
| `proof` | `<section className="customer-proof wrap" id="proof">` | 3-city local project photo showcase + verified customer pull-quotes. |
| `quote-invitation` | `<section className="quote-invitation wrap">` | Conversational mid-page CTA pairing *"Less guesswork. A better first conversation"* with the AI Helper avatar card. |
| `local-faqs` | `<section className="local-questions">` | Service area address/coverage block (`#service-area`) + expandable `<details>` FAQ accordion (`#faqs`). |
| `inquiry` | `<section className="section wrap inquiry-grid" id="inquiry">` | Bottom conversion anchor with expectations checklist + live 3-mode intake card. |

---

## 2. Recommended Section Arrangements by Vertical Category

### Pattern A: High-Ticket Exterior & Structural Remodeling (Default)
**Best for**: Roofing, Siding, Windows, Foundation Repair, Solar + Battery
**Psychology**: Homeowners are worried about hidden structural damage, contractor reliability, and staying on schedule. Immediately exiting the dark scroll hero into the dark **5.0-Star Verified Authority Bento** locks in trust before transitioning to the light editorial services breakdown.
**Order**:
1. `Hero Scrollytelling Track + Contextual AI Dock`
2. `authority-bento` (*5.0-Star Verified Authority Bento*)
3. `help-dock` (*3-Action Triage Bar*)
4. `services` (*Fix a Problem vs. Plan a New Project + Supporting Services*)
5. `approach` (*Look Beyond the Surface / Structural Diagnostics*)
6. `proof` (*Local Project Gallery + Excerpts*)
7. `quote-invitation` (*Mid-Page AI Helper Invitation*)
8. `local-faqs` (*Service Area + Common Questions*)
9. `inquiry` (*Final Intake Grid*)

---

### Pattern B: Urgent / Emergency Dispatch Services
**Best for**: HVAC Repair, Plumbing & Drain, Emergency Electrical, Tree Removal, Water/Fire Restoration
**Psychology**: Visitors have an active failure (AC blowing warm air, burst pipe, downed tree) and want immediate triage and flat-rate diagnostic clarity first, backed immediately by 5.0-star proof.
**Order**:
1. `Hero Scrollytelling Track + Contextual AI Dock` (emphasize *"Snap Data Plate / Damage Photo for Same-Day Dispatch"*)
2. `help-dock` (*Immediate 3-Button Dispatch Bar*)
3. `services` (*Emergency Repair vs. System Replacement + Flat-Rate Ranges*)
4. `authority-bento` (*5.0-Star Verified Authority Bento*)
5. `approach` (*First-Trip Fix & OEM Truck Stock Philosophy*)
6. `local-faqs` (*Service Area + Dispatch/Diagnostic Fee FAQs*)
7. `quote-invitation`
8. `proof`
9. `inquiry`

---

### Pattern C: Portfolio & Aesthetic Design-Build
**Best for**: Custom Composite Decks, Hardscapes & Pools, MedSpa & Aesthetics, Kitchen/Bath Remodeling, Luxury Auto Detailing / PPF
**Psychology**: Buying decisions are visually and emotionally driven. Pair the **5.0-Star Verified Authority Bento** directly with the **Visual Project Showcase (`proof`)** before diving into technical specs.
**Order**:
1. `Hero Scrollytelling Track + Contextual AI Dock`
2. `authority-bento` (*5.0-Star Verified Authority Bento*)
3. `proof` (*High-Resolution Local Portfolio & Before/After Showcase*)
4. `services` (*Design-Build Packages & Supporting Upgrades*)
5. `approach` (*3D Design, Engineering & Material Standards*)
6. `help-dock`
7. `quote-invitation`
8. `local-faqs`
9. `inquiry`
