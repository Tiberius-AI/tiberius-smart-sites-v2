# Single-JSON Vertical Tenant Schema & Presets

Every tenant in `src/config/contractors.json` follows this unified schema. Adding or updating a tenant in `contractors.json` automatically updates the Scrollytelling Hero, Choreographed Callouts, Contextual AI Dock, 5.0-Star Verified Authority Bento Section, Services Grid, FAQs, and Back-Office Pricing Rules.

---

## 1. Complete Tenant JSON Schema

```json
{
  "id": "unique-vertical-slug",
  "companyName": "Business Name",
  "niche": "Primary Vertical, Sub-Specialty & Systems",
  "city": "Primary City & Service Region",
  "addressLine": "Street Address, City, State ZIP",
  "brandColor": "#d97742",
  "accentSecondary": "#e8a578",
  "phoneDisplay": "(603) 420-2824",
  "emailDisplay": "info@domain.com",
  "bookingUrl": "https://cal.com/tiberius/contractor",
  "googleReviewUrl": "https://www.google.com/maps/search/?api=1&query=Business+Name+City",
  "heroHeadline": "Short, high-impact editorial headline (5–7 words).",
  "heroSubheadline": "2-sentence empathetic hook explaining what the visitor sees as they scroll and inviting them to drop a photo in the AI Dock.",
  "trustCredentials": [
    { "metric": "325+", "label": "Projects completed" },
    { "metric": "40+", "label": "Years of experience" },
    { "metric": "Licensed & insured", "label": "Regional coverage" },
    { "metric": "Locally based", "label": "City, State (ZIP)" }
  ],
  "media": {
    "poster": "/assets/roofing/reveal-v1/poster.webp",
    "video": "/assets/roofing/reveal-v3/scrub.mp4",
    "detailImage": "/assets/roofing/reveal-v2/roof-detail.webp",
    "helperAvatar": "/assets/roofing/helper-v1/avatar.webp",
    "duration": 8,
    "fps": 24,
    "width": 1920,
    "height": 1080
  },
  "frameSequence": {
    "totalFrames": 150,
    "basePath": "/sequences/tenant-slug/frame_",
    "extension": ".webp",
    "wireframeModel": "roof-truss-orbit",
    "cameraLabel": "TIBERIUS × HIGGSFIELD // 24FPS ARCHITECTURAL REVEAL"
  },
  "verifiedAuthority": {
    "schemaType": "RoofingContractor",
    "ratingValue": 5.0,
    "reviewCount": 2,
    "caption": "Verified Google Rating · City & Region",
    "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Business+Name+City",
    "pills": [
      "City, State Verified",
      "On-Schedule Execution",
      "Core Specialty Specialists"
    ],
    "featuredReview": {
      "initials": "SM",
      "author": "Customer Full Name",
      "meta": "Verified Google Review • City, ST • 4 months ago",
      "datePublished": "2026-06-15",
      "segments": [
        { "text": "Opening context before first highlight " },
        { "mark": "key service and city outcome phrase", "markClass": "mark-1" },
        { "text": ". Owner/lead was " },
        { "mark": "professional and stuck to the schedule", "markClass": "mark-2" },
        { "text": ". The crew was " },
        { "mark": "quick, clean, and efficient", "markClass": "mark-3" },
        { "text": ". Closing recommendation sentence." }
      ],
      "ownerReply": {
        "badge": "Business Name (Owner) • Direct Response",
        "text": "Thank you for trusting us with your property. We’re glad you had a great experience!"
      }
    },
    "endorsementReview": {
      "initials": "TS",
      "author": "Second Reviewer Name",
      "meta": "Verified Google Review • 4 months ago",
      "datePublished": "2026-06-15",
      "quote": "Excellent work, totally recommended 👍👍",
      "footerPill": "100% 5.0-Star Customer Satisfaction Rating"
    },
    "actionCard": {
      "kicker": "DIRECT OWNER LED · CITY & REGION",
      "headline": "Want Your Project Done On-Time & On-Schedule?",
      "subtext": "Deal directly with the owner and a crew that respects your property and timeline.",
      "primaryCtaLabel": "Get Your Free Estimate",
      "secondaryLinkLabel": "See Our 5.0 Rating on Google Maps"
    }
  },
  "pricingRules": {
    "currency": "USD",
    "freeInspection": true,
    "baseDiagnostic": 0,
    "minimumDispatch": 350,
    "services": [
      {
        "name": "Primary Repair / Diagnostic Service",
        "category": "Fix a problem",
        "description": "Clear homeowner-friendly explanation of the problem and solution.",
        "range": "$450 – $950",
        "avgValue": 680,
        "urgency": "High — Active Issue",
        "duration": "2–4 hrs"
      },
      {
        "name": "Full System Replacement / Flagship Build",
        "category": "Plan a new project",
        "description": "Complete system installation scope and materials.",
        "range": "$12,500 – $21,500",
        "avgValue": 16200,
        "urgency": "Scheduled Capital Project",
        "duration": "1–2 days"
      }
    ],
    "aiPromptRules": "Vertical-specific instructions for Alfred AI on what diagnostic questions to ask, what photos to request, and how to present transparent local ballpark ranges."
  },
  "callouts": [
    {
      "id": "callout-1",
      "startProgress": 0.08,
      "endProgress": 0.34,
      "position": "top-left",
      "eyebrow": "01 // DIAGNOSTIC BEAT",
      "title": "First Scroll Beat Headline",
      "body": "Explains what the close-up camera angle reveals.",
      "metric": "Key Proof Metric",
      "frameRange": "SCENE 01 // 08%–34%"
    },
    {
      "id": "callout-2",
      "startProgress": 0.38,
      "endProgress": 0.65,
      "position": "top-right",
      "eyebrow": "02 // ENGINEERING BEAT",
      "title": "Second Scroll Beat Headline",
      "body": "Explains the mid-orbit structural or technical differentiation.",
      "metric": "Warranty or Experience Metric",
      "frameRange": "SCENE 02 // 38%–65%"
    },
    {
      "id": "callout-3",
      "startProgress": 0.69,
      "endProgress": 0.95,
      "position": "top-left",
      "eyebrow": "03 // ALFRED AI + HUMAN HANDSHAKE",
      "title": "Third Scroll Beat Headline",
      "body": "Transitions the visitor into the embedded Contextual AI Dock or 3-Step Quote Wizard.",
      "metric": "Instant SMS + Photo Scope",
      "frameRange": "SCENE 03 // 69%–95%"
    }
  ]
}
```

---

## 2. Schema.org `@type` Mapping by Vertical

Use the appropriate `schemaType` inside `verifiedAuthority` for rich local search snippets:
- **Roofing / Siding / Gutters**: `"RoofingContractor"`
- **HVAC / Mechanical / Heat Pumps**: `"HVACBusiness"`
- **Plumbing / Drain / Water Heaters**: `"PlumbingService"`
- **Electrical / Generators / EV Chargers**: `"Electrician"`
- **Custom Decks / Remodeling / Hardscapes / Solar**: `"GeneralContractor"` or `"HomeAndConstructionBusiness"`
- **Landscaping / Tree Service**: `"LandscapingBusiness"`
- **MedSpa / Aesthetics / Dental**: `"MedicalBusiness"` or `"HealthAndBeautyBusiness"`
- **Auto Detailing / Ceramic Coating / PPF**: `"AutoRepair"`
- **Legal / Personal Injury / Estate Law**: `"LegalService"`
