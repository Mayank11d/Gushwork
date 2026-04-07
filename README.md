# Mangalam HDPE Pipes — Product Landing Page

A fully responsive, vanilla HTML/CSS/JavaScript product page for **Mangalam HDPE Pipes**, built to match the Figma design specification. No frameworks or third-party JS libraries are used.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Live Features](#live-features)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
- [Responsive Breakpoints](#responsive-breakpoints)
- [Component Reference](#component-reference)
  - [Sticky Header](#sticky-header)
  - [Image Carousel with Zoom](#image-carousel-with-zoom)
  - [Applications Carousel](#applications-carousel)
  - [Manufacturing Process Tabs](#manufacturing-process-tabs)
  - [Testimonials Slider](#testimonials-slider)
  - [FAQ Accordion](#faq-accordion)
  - [Modals](#modals)
  - [Scroll Reveal Animation](#scroll-reveal-animation)
- [Design System](#design-system)
- [Accessibility](#accessibility)
- [Browser Compatibility](#browser-compatibility)
- [Customisation Guide](#customisation-guide)

---

## Project Overview

This is a **single-page product detail layout** for an HDPE pipe manufacturer. It covers the full buyer journey — from product introduction and technical specs through to social proof, portfolio, resources, and a contact/quote form — all in one scrollable page.

The page is implemented with:

- **HTML5** — semantic markup throughout (`<section>`, `<nav>`, `<header>`, `<footer>`, `<table>`, ARIA roles)
- **CSS3** — custom properties (variables), Flexbox, CSS Grid, keyframe animations, and media queries
- **Vanilla JavaScript (ES2015+)** — IIFEs for scoped module isolation, `IntersectionObserver`, `scroll` events, touch events

---

## Live Features

| Feature | Implementation |
|---|---|
| Sticky header (scroll-aware) | Appears scrolling down past the first fold; hides scrolling up |
| Hero image carousel | Auto-advances every 5 s; supports arrow buttons, thumbnail clicks, swipe |
| Carousel zoom overlay | Mouse-enter triggers fullscreen preview; Escape / click dismisses |
| Applications carousel | Horizontal scroll with arrow buttons and touch swipe |
| Process tabs | 8 manufacturing steps with animated content swap and image change |
| Testimonials auto-scroll | Loops every 3.5 s with touch-swipe support |
| FAQ accordion | Single-open; keyboard accessible |
| Two modals | Catalogue download and call-back quote request |
| Scroll reveal | Cards/rows fade-in with staggered delay via `IntersectionObserver` |
| Responsive layout | 6 breakpoints from 1600 px down to 360 px |
| Mobile hamburger menu | Full-width nav drawer with animated icon |

---

## File Structure

```
project/
├── index.html      # Full page markup — all sections and modals
├── style.css       # All styles — variables, layout, components, responsive
├── script.js       # All interactive behaviour — 9 self-contained IIFEs + helpers
└── README.md       # This file
```

> **No build step required.** Open `index.html` directly in a browser, or serve from any static file host.

---

## Getting Started

### Local development

```bash
# 1. Clone or download the project files into a folder
# 2. Open index.html in your browser — no install needed

# Optional: use a simple dev server to avoid CORS issues with images
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

### Deployment

The project is entirely static. Drop the three files onto any host:

- **GitHub Pages** — push to a repo and enable Pages in settings
- **Netlify / Vercel** — drag-and-drop the folder into the dashboard
- **Any web server** — upload via FTP / SFTP

---

## Responsive Breakpoints

Breakpoints match the spacing rules specified in the Figma annotations:

| Screen width | Horizontal padding | Notes |
|---|---|---|
| ≥ 1600 px | `100px` each side | Default (design target) |
| ≤ 1440 px | `100px` each side | Same padding, container caps at 1240 px |
| ≤ 1200 px | `80px` each side | Features grid → 2 columns |
| ≤ 1080 px | `60px` each side | Hero and contact grids → single column |
| ≤ 800 px | `48px` each side | Hamburger menu; features/portfolio → 1 column |
| ≤ 480 px | `16px` each side | Full mobile; stacked CTAs; single-column footer |

All components use fluid widths — there are no fixed pixel widths on content containers.

---

## Component Reference

### Sticky Header

**HTML:** `#sticky-header` (fixed, `z-index: 900`)  
**CSS:** `.sticky-header`, `.sticky-header.visible`  
**JS:** `initStickyHeader()` IIFE

**Behaviour:**
- Monitors `window.scroll` (passive listener for performance).
- Threshold = `mainHeader.offsetHeight + 25 vh` — roughly the end of the first fold.
- **Scrolling down** past threshold → adds `.visible` (slides in via `transform: translateY(0)`).
- **Scrolling up** → removes `.visible` (slides out).
- Tracks `lastScrollY` to detect direction without a timer.

---

### Image Carousel with Zoom

**HTML:** `#carousel`, `#carousel-track`, `#thumbnails`, `#zoom-overlay`  
**CSS:** `.carousel-*`, `.thumb`, `.zoom-overlay`  
**JS:** `initCarousel()` IIFE  
**Data:** `carouselImages[]` array at top of `script.js`

**Carousel behaviour:**
- Slides are built dynamically from `carouselImages` — add/remove entries in the array to change the gallery.
- Navigation: ← → buttons, thumbnail clicks, keyboard (when zoom is closed), and touch swipe (40 px threshold).
- Auto-advances every **5 seconds**; pauses on `mouseenter`, resumes on `mouseleave`.
- Active thumbnail is scrolled into view on each slide change.

**Zoom behaviour:**
- `mouseenter` on any slide image → `openZoom()` → sets `#zoom-img` `src` and adds `.active` to the overlay.
- `mouseleave` → `closeZoom()`.
- Click on the overlay backdrop or press **Escape** → also closes.
- `document.body.style.overflow = 'hidden'` prevents background scroll while zoom is open.

To **add images**, append an object to `carouselImages`:

```js
{ src: "https://your-image-url.jpg", alt: "Descriptive alt text" }
```

---

### Applications Carousel

**HTML:** `#app-carousel`, `#app-prev`, `#app-next`  
**CSS:** `.app-carousel`, `.app-card`  
**JS:** `initAppCarousel()` IIFE

- Translates the flex container via `transform: translateX()`.
- `getCardWidth()` reads the live card width + gap so it works at any breakpoint.
- `maxOffset()` prevents scrolling past the last visible card.
- Touch swipe supported (40 px threshold).

---

### Manufacturing Process Tabs

**HTML:** `.process-tab[data-step]`, `#process-content`, `#process-title`, `#process-desc`, `#process-points`, `#process-img`  
**CSS:** `.process-tabs`, `.process-tab.active`, `.process-content`  
**JS:** `initProcessTabs()` IIFE  
**Data:** `processSteps[]` array at top of `script.js`

- Clicking a tab calls `updateStep(idx)` which fades the content panel out (`opacity: 0`), swaps text/image, then fades back in.
- The ← → buttons on the image panel also navigate steps.
- The active tab is centred in its scroll container.

To **add or edit steps**, modify the `processSteps` array — each entry needs `title`, `desc`, `points` (string array), and `img`.

---

### Testimonials Slider

**HTML:** `#testimonials-track`  
**CSS:** `.testimonials-track`, `.testimonial-card`  
**JS:** `initTestimonials()` IIFE

- Auto-scrolls one card width (`344px`) every **3.5 seconds**; loops back to 0 when it reaches the end.
- Touch swipe moves offset manually with the same card-width step.
- Avatar images are loaded lazily.

---

### FAQ Accordion

**HTML:** `.faq-item`, `.faq-question[aria-expanded]`, `.faq-answer`  
**CSS:** `.faq-question`, `.faq-answer.hidden`  
**JS:** `initFaq()` IIFE

- Single-open: clicking an item closes all others before opening the target.
- Uses `aria-expanded` for screen-reader state communication.
- If the same item is clicked again while open, it collapses (toggle behaviour).

---

### Modals

**HTML:** `#catalogue-modal`, `#quote-modal`  
**CSS:** `.modal-overlay`, `.modal-overlay.open`, `.modal-box`  
**JS:** `openModal(id)` / `closeModal(id)` global helpers

Two modals are included:

| ID | Trigger | Purpose |
|---|---|---|
| `catalogue-modal` | "Download Full Technical Datasheet" button, "Request Catalogue" button | Email + optional phone to send brochure |
| `quote-modal` | "Get Custom Quote", "Request a Quote", "Talk to an Expert", "Request Custom Quote" buttons | Full callback request form |

**Opening:** Call `openModal('modal-id')` from any `onclick` attribute or JS code.  
**Closing:** `closeModal('modal-id')`, clicking the ✕ button, clicking the backdrop, or pressing **Escape**.

---

### Scroll Reveal Animation

**JS:** `initReveal()` IIFE

- Targets: `.feature-card`, `.portfolio-card`, `.testimonial-card`, `.faq-item`, `.download-item`, `specs-table tbody tr`.
- Each element starts at `opacity: 0; transform: translateY(20px)`.
- `IntersectionObserver` (threshold 0.1, 40 px bottom margin) triggers the reveal transition.
- Items within a group get a staggered `transition-delay` of `(i % 6) × 80ms`.
- Skipped on page reload (`performance.getEntriesByType('navigation')[0].type === 'reload'`) to avoid flash.

---

## Design System

All visual tokens are declared as CSS custom properties on `:root` in `style.css`:

```css
/* Colours */
--clr-primary:      #1E2E5E   /* deep navy */
--clr-accent:       #2A4BBF   /* brand blue */
--clr-accent-light: #3B6CF7
--clr-bg:           #F4F5F9   /* light grey page background */
--clr-dark:         #0D1B3E   /* dark section background */
--clr-text:         #1A1A2E
--clr-muted:        #6B7280

/* Typography */
--font-head: 'Fraunces', Georgia, serif     /* headings */
--font-body: 'DM Sans', Helvetica, sans-serif

/* Spacing (horizontal padding per breakpoint) */
--pad-xl: 100px   /* ≥ 1440 px */
--pad-md:  80px   /* ≤ 1200 px */
--pad-sm:  60px   /* ≤ 1080 px */

/* Borders & Shadows */
--radius-sm: 8px  --radius-md: 12px  --radius-lg: 20px
--shadow-sm  --shadow-md  --shadow-lg
```

To retheme the page, update only these variables — no other values need to change.

---

## Accessibility

- All interactive controls have `aria-label` or visible text labels.
- Carousel regions use `role="region"` with `aria-label`.
- Thumbnails have `tabIndex="0"` and respond to Enter/Space keys.
- FAQ uses `aria-expanded` / `aria-controls` / `id` pairing.
- Modals use `role="dialog"`, `aria-modal="true"`, and focus the first interactive element on open.
- Sticky header uses `aria-hidden` toggled with visibility.
- All images have descriptive `alt` attributes.
- `scroll-behavior: smooth` is set on `html` for anchor navigation.
- Colour contrast ratios for text vs backgrounds exceed WCAG AA.

---

## Browser Compatibility

| Browser | Supported |
|---|---|
| Chrome 88+ | ✅ |
| Firefox 85+ | ✅ |
| Safari 14+ | ✅ |
| Edge 88+ | ✅ |
| iOS Safari 14+ | ✅ |
| Android Chrome 88+ | ✅ |

Features used and their baseline support:
- CSS Grid & Flexbox — universal
- CSS custom properties — universal
- `IntersectionObserver` — Chrome 58 / Firefox 55 / Safari 12.1
- `backdrop-filter` — Chrome 76 / Safari 9 (Edge 17 with prefix)
- Passive event listeners — Chrome 51 / Firefox 49

---

## Customisation Guide

### Swap carousel images

Edit the `carouselImages` array in `script.js`:

```js
const carouselImages = [
  { src: "https://your-cdn.com/photo1.jpg", alt: "Alt text for SEO" },
  // …add as many as needed
];
```

### Add a manufacturing step

Append to `processSteps` in `script.js` and add a matching `<button class="process-tab">` in `index.html`:

```js
{
  title: "Your Step Name",
  desc: "Description of what happens at this step.",
  points: ["Bullet one", "Bullet two"],
  img: "https://your-cdn.com/step-image.jpg",
}
```

### Change brand colours

In `style.css`, update `:root`:

```css
:root {
  --clr-accent:  #your-brand-color;
  --clr-primary: #your-dark-color;
}
```

### Add a new modal

1. Add the HTML overlay element following the same pattern as `#catalogue-modal`.
2. Call `openModal('your-modal-id')` from any button `onclick`.

---



- **Fonts:** [Fraunces](https://fonts.google.com/specimen/Fraunces) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) via Google Fonts
- **Placeholder images:** [Unsplash](https://unsplash.com)
- **Design reference:** Figma file — *Gushwork Assignment* (`node-id=490-8785`)
