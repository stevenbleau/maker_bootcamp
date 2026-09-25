# Master Prompt — Build the Maker Bootcamp course site

You are a senior front-end developer. Build the production website for **Maker Bootcamp**, a free, open, self-paced course on digital fabrication run by the **University of Minnesota Libraries Creation Hubs** (Engagement, Outreach & Community Partnerships). The page is the course's front door: it presents learning **tracks** and links each **module** to its slide deck. The decks already exist as separate Quarto reveal.js presentations; you are building the index site that links to them, not the decks.

The visual design is final and approved. A static reference implementation is included at the bottom of this prompt. Your job is to turn it into clean, responsive, accessible, maintainable production code. Match the design faithfully. Do not redesign.

---

## 1. Concept

Tracks are presented as **transit lines**; modules are **stops** on a line. All lines lead to "Your project." The tone is playful and hands-on, but it must still read as credible for a university library.

Track order is fixed and meaningful (the curriculum is taught Make → Design → Create):

| # | Track | Color token | Status |
|---|-------|-------------|--------|
| 01 | Make | `--make` Electric Orange `#D37323` | 1 module live, more coming |
| 02 | Design | `--design` Blue Book `#397F89` | 4 modules live |
| 03 | Create | `--create` Toaster Red `#98012E` | Under construction, no modules yet |

Gold Spark `#F9B754` (`--gold`) is the highlight color, not a track color.

## 2. Design tokens

Use these exactly, as CSS custom properties on `:root`.

- **Brand colors:** `--gold #F9B754`, `--make #D37323`, `--design #397F89`, `--create #98012E`.
- **Text on track colors:** `--on-make #1B1B1B` (white on the orange fails contrast at ~3.4:1), `--on-design #FFFFFF`, `--on-create #FFFFFF`. If a track color ever changes, re-check contrast and choose ink or white to keep at least 4.5:1.
- **Neutrals:** `--ink #1B1B1B` for text, outlines, and shadows. `--paper #FFF7EA` for the page background. `--card #FFFFFF`. `--tint #F3EEE4` for icon tiles. `--text-2 #3D3A35` for body copy. `--text-3 #55524C` for meta text and eyebrows. `--dash #8A8478` for dashed placeholders.
- **Type:**
  - Headlines use Bricolage Grotesque 800 with tight tracking (−0.03 to −0.035em).
  - Body text uses Public Sans 400–700.
  - Labels and meta text use IBM Plex Mono 500.
  - All three load from Google Fonts. Keep real fallback stacks.
- **Type scale (desktop):** hero h1 104px/0.92, track h2 72px/1, card h3 26px, body 15–20px, mono labels 12–14px.
- **Shape:** cards have a 2px ink border, 18px radius, and a hard offset shadow `5px 5px 0 var(--ink)`. The hero map panel uses a 24px radius and an `8px 8px 0` shadow. Buttons are 999px pills with a minimum height of 44px. Track banners use a 24px radius.
- **Layout:** desktop content width is 1280px within 80px side padding. Sections are separated by 96px.

## 3. Page structure (top to bottom)

1. **Header.** Logo mark (a black rounded square with three dots in Make, Design, and Create colors), then "Maker Bootcamp" with "Creation Hubs · UMN Libraries" beneath it. On the right, anchor links to the three tracks, each with a colored dot, in Make, Design, Create order.
2. **Hero.** A two-column layout.
   - **Left column:**
     - A gold pill badge reading "Free & open course · Digital fabrication".
     - The h1 "Pick a track. / Make a thing.", with a gold marker underline on the second line.
     - An intro paragraph.
     - Two buttons: "Start the Make track" (primary, ink fill) and "See all tracks" (secondary, outlined).
   - **Right column:** an SVG route map. The Make line is at the top (solid with 1 stop, then dotted, curving down). The Design line is in the middle (solid, 4 stops). The Create line is at the bottom (fully dotted, curving up). All three converge on a gold "Your project" terminal with a check mark. The map must have an accessible label.
3. **"How it works" strip.** A white outlined box with three numbered steps. The number circles use the Make, Design, and Create colors in that order: 1 "Choose a track", 2 "Open a module deck", 3 "Make the thing, then take the next stop".
4. **Track sections, in the order Make, Design, Create.** Each section has:
   - **A banner.** A full-width, track-colored block with "Track 0N" in mono, the track name in 72px Bricolage, and a one-line description right-aligned. Banner text uses the track's `--on-*` color.
   - **A route row with cards.** A 4-column grid. Each column has a numbered stop marker (a white circle with a 4px ink border) joined by a thick track-colored line that bridges the grid gap, then a module card below it.
   - **The module card.** It contains:
     - An icon tile.
     - A mono eyebrow with the course name.
     - An h3 with the module title.
     - A description.
     - A track-colored "Open deck →" pill button.
   - **Make:** 1 real stop. The remaining 3 columns hold a dotted continuation line and a dashed "More stops being built" placeholder.
   - **Create:** a dotted line and a dashed "Track under construction" panel with a gold icon tile. No cards.
5. **Footer.** A 2px ink top rule. On the left, "University of Minnesota Libraries · Engagement, Outreach & Community Partnerships". On the right, "Creation Hubs / Maker Bootcamp" in mono.

## 4. Content model

Content must be data-driven so staff can add modules without touching markup. Put it in one file (for example `modules.json` or a JS/YAML data file) and render the tracks and cards from it. The route-map stop counts, the track labels ("1 STOP", "4 STOPS"), and the placeholder logic should all derive from this data.

```json
{
  "tracks": [
    { "id": "make", "number": "01", "name": "Make", "status": "active",
      "blurb": "Get your hands on the machines and turn materials into objects.",
      "modules": [
        { "course": "Intro to Sewing", "title": "Drawstring Bag", "icon": "scissors",
          "description": "Thread a machine, prep fabric, sew a seam, and finish a drawstring bag from start to end.",
          "deckUrl": "TODO" }
      ] },
    { "id": "design", "number": "02", "name": "Design", "status": "active",
      "blurb": "Model it, draw it, code it, hear it. The digital side of making.",
      "modules": [
        { "course": "Intro to CAD", "title": "CAD Level 2", "icon": "cube",
          "description": "Parametric design in Autodesk Fusion — sketch, dimension, extrude, fit tolerances, and stud patterns.",
          "deckUrl": "TODO" },
        { "course": "Intro to Vector Design", "title": "Intro", "icon": "pen",
          "description": "Foundations of vector design tools and concepts.", "deckUrl": "TODO" },
        { "course": "Intro to Python", "title": "Hello Python", "icon": "code",
          "description": "Getting started with Python — variables, outputs, and first programs.", "deckUrl": "TODO" },
        { "course": "Intro to DAWs", "title": "Pentatonic Keyboard", "icon": "waveform",
          "description": "Introduction to digital audio workstations using a pentatonic keyboard project.", "deckUrl": "TODO" }
      ] },
    { "id": "create", "number": "03", "name": "Create", "status": "construction",
      "blurb": "Where design and making meet in your own original project.",
      "modules": [] }
  ]
}
```

Rendering rules:
- A track with more than 4 modules wraps onto additional rows of 4. Continue the route line across the row break, for example with a line segment returning at the start of the next row.
- An `active` track with fewer than 4 modules shows the dotted continuation line and a "More stops being built" placeholder spanning the empty columns.
- A `construction` track shows the dotted line and the under-construction panel.
- Stop numbers are per track, starting at 1.

## 5. Responsive behavior (not designed; use these rules)

The reference is a fixed 1440px desktop comp. Make it fluid.
- **Content width:** max 1280px, centered, with side padding of `clamp(20px, 5vw, 80px)`.
- **Cards per row:**
  - Above 1100px: 4 per row.
  - From 700px to 1100px: 2 per row.
  - Below 700px: 1 per row. On a single column, turn the route vertical: stop markers sit in a left gutter, a vertical track-colored line runs down that gutter, and cards sit to the right.
- **Hero:** stacks below 900px, with the route map moving under the text. Scale the h1 with `clamp(56px, 9vw, 104px)`, the track h2 with `clamp(44px, 6vw, 72px)`, and the banner description stacking under the title.
- **Header:** on mobile the nav collapses to the three colored dots, or to a simple menu button. It must keep 44px touch targets.
- **Other:** the "How it works" strip stacks vertically on mobile. No horizontal page scroll at any width down to 320px.

## 6. Accessibility and quality requirements

- Use semantic landmarks: `header`, `nav`, `main`, `section` with headings, and `footer`. Keep a single `h1` and a logical h2/h3 order.
- All text meets WCAG AA contrast (4.5:1, or 3:1 for 24px+). Keep the `--on-make` ink rule.
- Links are real `<a href>` elements. Give every "Open deck" link an accessible name that includes the module, for example with `aria-label="Open deck: CAD Level 2"`. If decks open in a new tab, say so in the label and use `rel="noopener"`.
- Decorative SVGs get `aria-hidden="true"`. The route map keeps `role="img"` and a descriptive `aria-label`.
- Provide a visible `:focus-visible` style: a 3px ink outline with offset, on every interactive element.
- Add a hover state for cards and buttons: a small translate toward the shadow, for example `translate(2px, 2px)` with the shadow shrinking to `3px 3px 0`, plus a pressed state. Wrap all motion in `@media (prefers-reduced-motion: no-preference)`.
- Anchor links scroll smoothly (only when reduced motion isn't requested). Add `scroll-margin-top` on the track sections.
- Keep the design icons as inline SVG line icons (stroke 1.8, round caps). Do not use an emoji or an icon font.
- Performance: no framework is required. Keep JS minimal: only the data rendering, or pre-render at build time. Lighthouse should score 95+ on accessibility and performance.

## 7. Tech approach

Default to a **static site**: semantic HTML, a single stylesheet using the tokens above, and a small script or build step that renders tracks and cards from the data file. It must deploy as plain static files (for example GitHub Pages, or alongside the Quarto deck output). Move all the reference's inline styles into classes. If you choose a static site generator (Eleventy, Astro, or similar), keep the output as static HTML with no client framework runtime, and explain the choice in the README.

**Deliverables:**
1. The site source.
2. The content data file.
3. A short README covering how to add a module or track, how to change the track colors (with the contrast rule), and how to build and deploy.

## 8. Open items (leave as clearly marked TODOs; don't invent)

- Every `deckUrl` is a placeholder.
- Confirm the Electric Orange hex (#D37323). The style-guide swatch looked slightly browner than the label.
- The style guide's own labels appear to use Raleway. The approved design uses Bricolage Grotesque, Public Sans, and IBM Plex Mono. Keep those unless told otherwise, but define the fonts via tokens so they're easy to swap.
- The track blurbs, hero copy, and "How it works" copy are draft copy from the design phase and may be edited.
- There is no favicon or social share image yet. Add sensible meta tags with placeholders.

## 9. Acceptance checklist

- [ ] At 1440px, the page visually matches the reference: colors, type, spacing, borders, shadows, and route lines.
- [ ] Track order is Make → Design → Create everywhere: header nav, hero map, "How it works" colors, and sections.
- [ ] All modules and tracks render from the data file. Adding a module requires no markup edits.
- [ ] Responsive at 320, 390, 768, 1024, and 1440px, with no horizontal scroll.
- [ ] Keyboard-navigable with visible focus. AA contrast throughout. Reduced motion is respected.
- [ ] A README is included.

---

## Reference implementation (static, desktop comp)

This is the approved design exported as a single static HTML file. It uses inline styles and a fixed 1440×2640 root, and contains all the content, SVG icons, the route map, and the exact values. **Treat it as the visual source of truth, not as production code.** Extract tokens and classes from it, make it fluid, and render the repeated parts (cards, stops) from data.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Maker Bootcamp — Creation Hubs</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&amp;family=Public+Sans:wght@400;500;600;700&amp;family=IBM+Plex+Mono:wght@500&amp;display=swap">
<style>
:root{
  --gold:#F9B754;      /* Gold Spark — creative, playful: highlights */
  --make:#D37323;      /* Electric Orange — energetic, friendly: Track 01 */
  --design:#397F89;    /* Blue Book — ambitious, modern: Track 02 */
  --create:#98012E;    /* Toaster Red — traditional, academic: Track 03 */
  --on-make:#1B1B1B;   /* white on #D37323 is only ~3.4:1 — use ink */
  --on-design:#FFFFFF;
  --on-create:#FFFFFF;
  --ink:#1B1B1B; --paper:#FFF7EA; --card:#FFFFFF; --tint:#F3EEE4;
  --text-2:#3D3A35; --text-3:#55524C; --dash:#8A8478;
}
body{margin:0;background:#FFF7EA;font-family:"Public Sans",system-ui,-apple-system,"Segoe UI",sans-serif;color:#1B1B1B;-webkit-font-smoothing:antialiased}
a{color:#1B1B1B}a:hover{color:#000000}
</style>
</head>
<body>
<div style="width: 1440px; height: 2640px; box-sizing: border-box; background: #FFF7EA; display: flex; flex-direction: column">

<header style="height: 88px; box-sizing: border-box; padding: 0 80px; display: flex; align-items: center; justify-content: space-between">
<div style="display: flex; align-items: center; gap: 12px">
<svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><rect x="2" y="2" width="36" height="36" rx="10" fill="#1B1B1B"></rect><circle cx="13" cy="20" r="4" style="fill: var(--make)"></circle><circle cx="20" cy="20" r="4" style="fill: var(--design)"></circle><circle cx="27" cy="20" r="4" style="fill: var(--create)"></circle></svg>
<div style="display: flex; flex-direction: column; gap: 1px">
<span style="font-family: 'Bricolage Grotesque', system-ui, sans-serif; font-size: 20px; font-weight: 800; letter-spacing: -0.01em">Maker Bootcamp</span>
<span style="font-size: 12px; color: #55524C">Creation Hubs · UMN Libraries</span>
</div>
</div>
<nav aria-label="Tracks" style="display: flex; align-items: center; gap: 10px">
<a href="#make" style="display: flex; align-items: center; gap: 8px; height: 44px; padding: 0 16px; border-radius: 999px; text-decoration: none; font-size: 15px; font-weight: 600"><span style="width: 10px; height: 10px; border-radius: 50%; background: var(--make)"></span>Make</a>
<a href="#design" style="display: flex; align-items: center; gap: 8px; height: 44px; padding: 0 16px; border-radius: 999px; text-decoration: none; font-size: 15px; font-weight: 600"><span style="width: 10px; height: 10px; border-radius: 50%; background: var(--design)"></span>Design</a>
<a href="#create" style="display: flex; align-items: center; gap: 8px; height: 44px; padding: 0 16px; border-radius: 999px; text-decoration: none; font-size: 15px; font-weight: 600"><span style="width: 10px; height: 10px; border-radius: 50%; background: var(--create)"></span>Create</a>
</nav>
</header>

<section style="padding: 64px 80px 72px; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 48px; align-items: center">
<div style="display: flex; flex-direction: column; gap: 28px">
<span style="align-self: flex-start; display: flex; align-items: center; gap: 8px; padding: 8px 14px; border: 2px solid #1B1B1B; border-radius: 999px; background: var(--gold); font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 13px; font-weight: 500">Free &amp; open course · Digital fabrication</span>
<h1 style="margin: 0; font-family: 'Bricolage Grotesque', system-ui, sans-serif; font-weight: 800; font-size: 104px; line-height: 0.92; letter-spacing: -0.035em">Pick a track.<br><span style="box-shadow: inset 0 -0.28em 0 var(--gold)">Make a thing.</span></h1>
<p style="margin: 0; max-width: 520px; font-size: 20px; line-height: 1.55; color: #3D3A35">Each track is a line of hands-on stops. Hop on anywhere, open a module's deck, and leave with something you made.</p>
<div style="display: flex; gap: 14px">
<a href="#make" style="display: flex; align-items: center; gap: 10px; height: 56px; padding: 0 26px; border-radius: 999px; background: #1B1B1B; color: #FFFFFF; text-decoration: none; font-size: 17px; font-weight: 700">Start the Make track<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="M13 6l6 6-6 6"></path></svg></a>
<a href="#design" style="display: flex; align-items: center; height: 56px; padding: 0 26px; border-radius: 999px; border: 2px solid #1B1B1B; background: #FFFFFF; text-decoration: none; font-size: 17px; font-weight: 700">See all tracks</a>
</div>
</div>

<div style="background: #FFFFFF; border: 2px solid #1B1B1B; border-radius: 24px; box-shadow: 8px 8px 0 #1B1B1B; padding: 28px 28px 20px">
<svg width="100%" viewBox="0 0 560 400" role="img" aria-label="Route map: the Make, Design and Create tracks converge on your project">
<text x="36" y="58" font-family="IBM Plex Mono, monospace" font-size="13" font-weight="500" fill="#1B1B1B">MAKE · 1 STOP</text>
<path d="M40 86 H160" fill="none" style="stroke: var(--make)" stroke-width="14" stroke-linecap="round"></path>
<path d="M188 86 H370 Q430 86 450 150 L462 190" fill="none" style="stroke: var(--make)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 26"></path>
<circle cx="110" cy="86" r="12" fill="#FFFFFF" stroke="#1B1B1B" stroke-width="4"></circle>
<text x="36" y="178" font-family="IBM Plex Mono, monospace" font-size="13" font-weight="500" fill="#1B1B1B">DESIGN · 4 STOPS</text>
<path d="M40 206 H440" fill="none" style="stroke: var(--design)" stroke-width="14" stroke-linecap="round"></path>
<circle cx="90" cy="206" r="12" fill="#FFFFFF" stroke="#1B1B1B" stroke-width="4"></circle>
<circle cx="170" cy="206" r="12" fill="#FFFFFF" stroke="#1B1B1B" stroke-width="4"></circle>
<circle cx="250" cy="206" r="12" fill="#FFFFFF" stroke="#1B1B1B" stroke-width="4"></circle>
<circle cx="330" cy="206" r="12" fill="#FFFFFF" stroke="#1B1B1B" stroke-width="4"></circle>
<text x="36" y="298" font-family="IBM Plex Mono, monospace" font-size="13" font-weight="500" fill="#1B1B1B">CREATE · UNDER CONSTRUCTION</text>
<path d="M40 326 H370 Q430 326 450 262 L462 222" fill="none" style="stroke: var(--create)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 26"></path>
<circle cx="488" cy="206" r="30" style="fill: var(--gold)" stroke="#1B1B1B" stroke-width="4"></circle>
<path d="M476 206 l8 8 l16 -16" fill="none" stroke="#1B1B1B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
<text x="488" y="266" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="17" font-weight="800" fill="#1B1B1B">Your project</text>
</svg>
</div>
</section>

<section aria-label="How it works" style="margin: 0 80px; padding: 28px 36px; border: 2px solid #1B1B1B; border-radius: 20px; background: #FFFFFF; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px">
<div style="display: flex; align-items: center; gap: 16px">
<span style="width: 44px; height: 44px; flex-shrink: 0; border-radius: 50%; background: var(--make); color: var(--on-make); display: flex; align-items: center; justify-content: center; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 20px">1</span>
<span style="font-size: 17px; font-weight: 600">Choose a track</span>
</div>
<div style="display: flex; align-items: center; gap: 16px">
<span style="width: 44px; height: 44px; flex-shrink: 0; border-radius: 50%; background: var(--design); color: var(--on-design); display: flex; align-items: center; justify-content: center; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 20px">2</span>
<span style="font-size: 17px; font-weight: 600">Open a module deck</span>
</div>
<div style="display: flex; align-items: center; gap: 16px">
<span style="width: 44px; height: 44px; flex-shrink: 0; border-radius: 50%; background: var(--create); color: var(--on-create); display: flex; align-items: center; justify-content: center; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 20px">3</span>
<span style="font-size: 17px; font-weight: 600">Make the thing, then take the next stop</span>
</div>
</section>

<section id="make" style="padding: 96px 80px 0; display: flex; flex-direction: column; gap: 40px">
<div style="display: flex; align-items: flex-end; justify-content: space-between; padding: 36px 40px; border-radius: 24px; background: var(--make); color: var(--on-make)">
<div style="display: flex; flex-direction: column; gap: 8px">
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 14px; font-weight: 500">Track 01</span>
<h2 style="margin: 0; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 72px; line-height: 1; letter-spacing: -0.03em">Make</h2>
</div>
<p style="margin: 0; max-width: 380px; font-size: 18px; line-height: 1.5; text-align: right">Get your hands on the machines and turn materials into objects.</p>
</div>
<div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px">

<div style="display: flex; flex-direction: column; gap: 20px">
<div style="display: flex; align-items: center"><span style="width: 40px; height: 40px; flex-shrink: 0; border-radius: 50%; border: 4px solid #1B1B1B; background: #FFFFFF; box-sizing: border-box; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 13px; font-weight: 500">1</span><span style="flex-grow: 1; height: 10px; margin-right: -24px; background: var(--make)"></span></div>
<article style="flex-grow: 1; display: flex; flex-direction: column; gap: 16px; padding: 24px; background: #FFFFFF; border: 2px solid #1B1B1B; border-radius: 18px; box-shadow: 5px 5px 0 #1B1B1B">
<div style="width: 48px; height: 48px; border-radius: 12px; background: #F3EEE4; color: var(--make); display: flex; align-items: center; justify-content: center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M20 4L8.1 15.9"></path><path d="M14.5 14.5L20 20"></path><path d="M8.1 8.1L12 12"></path></svg></div>
<div style="display: flex; flex-direction: column; gap: 4px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.04em; color: #55524C">Intro to Sewing</span>
<h3 style="margin: 0; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 26px; line-height: 1.1">Drawstring Bag</h3>
</div>
<p style="margin: 0; flex-grow: 1; font-size: 15px; line-height: 1.55; color: #3D3A35">Thread a machine, prep fabric, sew a seam, and finish a drawstring bag from start to end.</p>
<a href="#" style="align-self: flex-start; display: flex; align-items: center; gap: 8px; height: 44px; padding: 0 18px; border-radius: 999px; background: var(--make); color: var(--on-make); text-decoration: none; font-size: 15px; font-weight: 700">Open deck<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="M13 6l6 6-6 6"></path></svg></a>
</article>
</div>

<div style="grid-column: span 3; display: flex; flex-direction: column; gap: 20px">
<div style="display: flex; align-items: center; height: 40px"><span style="flex-grow: 1; height: 0; border-top: 10px dotted var(--make)"></span></div>
<div style="flex-grow: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; border: 2px dashed #8A8478; border-radius: 18px; text-align: center; padding: 32px">
<span style="font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 28px">More stops being built</span>
<span style="font-size: 16px; color: #55524C">New Make modules will land on this line.</span>
</div>
</div>

</div>
</section>

<section id="design" style="padding: 96px 80px 0; display: flex; flex-direction: column; gap: 40px">
<div style="display: flex; align-items: flex-end; justify-content: space-between; padding: 36px 40px; border-radius: 24px; background: var(--design); color: var(--on-design)">
<div style="display: flex; flex-direction: column; gap: 8px">
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 14px; font-weight: 500">Track 02</span>
<h2 style="margin: 0; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 72px; line-height: 1; letter-spacing: -0.03em">Design</h2>
</div>
<p style="margin: 0; max-width: 380px; font-size: 18px; line-height: 1.5; text-align: right">Model it, draw it, code it, hear it. The digital side of making.</p>
</div>
<div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px">

<div style="display: flex; flex-direction: column; gap: 20px">
<div style="display: flex; align-items: center"><span style="width: 40px; height: 40px; flex-shrink: 0; border-radius: 50%; border: 4px solid #1B1B1B; background: #FFFFFF; box-sizing: border-box; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 13px; font-weight: 500">1</span><span style="flex-grow: 1; height: 10px; margin-right: -24px; background: var(--design)"></span></div>
<article style="flex-grow: 1; display: flex; flex-direction: column; gap: 16px; padding: 24px; background: #FFFFFF; border: 2px solid #1B1B1B; border-radius: 18px; box-shadow: 5px 5px 0 #1B1B1B">
<div style="width: 48px; height: 48px; border-radius: 12px; background: #F3EEE4; color: var(--design); display: flex; align-items: center; justify-content: center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"></path><path d="M12 12l8-4.5"></path><path d="M12 12v9"></path><path d="M12 12L4 7.5"></path></svg></div>
<div style="display: flex; flex-direction: column; gap: 4px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.04em; color: #55524C">Intro to CAD</span>
<h3 style="margin: 0; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 26px; line-height: 1.1">CAD Level 2</h3>
</div>
<p style="margin: 0; flex-grow: 1; font-size: 15px; line-height: 1.55; color: #3D3A35">Parametric design in Autodesk Fusion — sketch, dimension, extrude, fit tolerances, and stud patterns.</p>
<a href="#" style="align-self: flex-start; display: flex; align-items: center; gap: 8px; height: 44px; padding: 0 18px; border-radius: 999px; background: var(--design); color: var(--on-design); text-decoration: none; font-size: 15px; font-weight: 700">Open deck<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="M13 6l6 6-6 6"></path></svg></a>
</article>
</div>

<div style="display: flex; flex-direction: column; gap: 20px">
<div style="display: flex; align-items: center"><span style="width: 40px; height: 40px; flex-shrink: 0; border-radius: 50%; border: 4px solid #1B1B1B; background: #FFFFFF; box-sizing: border-box; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 13px; font-weight: 500">2</span><span style="flex-grow: 1; height: 10px; margin-right: -24px; background: var(--design)"></span></div>
<article style="flex-grow: 1; display: flex; flex-direction: column; gap: 16px; padding: 24px; background: #FFFFFF; border: 2px solid #1B1B1B; border-radius: 18px; box-shadow: 5px 5px 0 #1B1B1B">
<div style="width: 48px; height: 48px; border-radius: 12px; background: #F3EEE4; color: var(--design); display: flex; align-items: center; justify-content: center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.6 7.6"></path><circle cx="11" cy="11" r="2"></circle></svg></div>
<div style="display: flex; flex-direction: column; gap: 4px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.04em; color: #55524C">Intro to Vector Design</span>
<h3 style="margin: 0; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 26px; line-height: 1.1">Intro</h3>
</div>
<p style="margin: 0; flex-grow: 1; font-size: 15px; line-height: 1.55; color: #3D3A35">Foundations of vector design tools and concepts.</p>
<a href="#" style="align-self: flex-start; display: flex; align-items: center; gap: 8px; height: 44px; padding: 0 18px; border-radius: 999px; background: var(--design); color: var(--on-design); text-decoration: none; font-size: 15px; font-weight: 700">Open deck<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="M13 6l6 6-6 6"></path></svg></a>
</article>
</div>

<div style="display: flex; flex-direction: column; gap: 20px">
<div style="display: flex; align-items: center"><span style="width: 40px; height: 40px; flex-shrink: 0; border-radius: 50%; border: 4px solid #1B1B1B; background: #FFFFFF; box-sizing: border-box; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 13px; font-weight: 500">3</span><span style="flex-grow: 1; height: 10px; margin-right: -24px; background: var(--design)"></span></div>
<article style="flex-grow: 1; display: flex; flex-direction: column; gap: 16px; padding: 24px; background: #FFFFFF; border: 2px solid #1B1B1B; border-radius: 18px; box-shadow: 5px 5px 0 #1B1B1B">
<div style="width: 48px; height: 48px; border-radius: 12px; background: #F3EEE4; color: var(--design); display: flex; align-items: center; justify-content: center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6l-6 6 6 6"></path><path d="M16 6l6 6-6 6"></path><path d="M14 4l-4 16"></path></svg></div>
<div style="display: flex; flex-direction: column; gap: 4px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.04em; color: #55524C">Intro to Python</span>
<h3 style="margin: 0; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 26px; line-height: 1.1">Hello Python</h3>
</div>
<p style="margin: 0; flex-grow: 1; font-size: 15px; line-height: 1.55; color: #3D3A35">Getting started with Python — variables, outputs, and first programs.</p>
<a href="#" style="align-self: flex-start; display: flex; align-items: center; gap: 8px; height: 44px; padding: 0 18px; border-radius: 999px; background: var(--design); color: var(--on-design); text-decoration: none; font-size: 15px; font-weight: 700">Open deck<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="M13 6l6 6-6 6"></path></svg></a>
</article>
</div>

<div style="display: flex; flex-direction: column; gap: 20px">
<div style="display: flex; align-items: center"><span style="width: 40px; height: 40px; flex-shrink: 0; border-radius: 50%; border: 4px solid #1B1B1B; background: #FFFFFF; box-sizing: border-box; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 13px; font-weight: 500">4</span><span style="flex-grow: 1; height: 10px; background: var(--design); border-radius: 0 999px 999px 0"></span></div>
<article style="flex-grow: 1; display: flex; flex-direction: column; gap: 16px; padding: 24px; background: #FFFFFF; border: 2px solid #1B1B1B; border-radius: 18px; box-shadow: 5px 5px 0 #1B1B1B">
<div style="width: 48px; height: 48px; border-radius: 12px; background: #F3EEE4; color: var(--design); display: flex; align-items: center; justify-content: center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h2"></path><path d="M7 8v8"></path><path d="M11 4v16"></path><path d="M15 7v10"></path><path d="M19 10v4"></path></svg></div>
<div style="display: flex; flex-direction: column; gap: 4px">
<span style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.04em; color: #55524C">Intro to DAWs</span>
<h3 style="margin: 0; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 26px; line-height: 1.1">Pentatonic Keyboard</h3>
</div>
<p style="margin: 0; flex-grow: 1; font-size: 15px; line-height: 1.55; color: #3D3A35">Introduction to digital audio workstations using a pentatonic keyboard project.</p>
<a href="#" style="align-self: flex-start; display: flex; align-items: center; gap: 8px; height: 44px; padding: 0 18px; border-radius: 999px; background: var(--design); color: var(--on-design); text-decoration: none; font-size: 15px; font-weight: 700">Open deck<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="M13 6l6 6-6 6"></path></svg></a>
</article>
</div>

</div>
</section>

<section id="create" style="padding: 96px 80px 0; display: flex; flex-direction: column; gap: 40px">
<div style="display: flex; align-items: flex-end; justify-content: space-between; padding: 36px 40px; border-radius: 24px; background: var(--create); color: var(--on-create)">
<div style="display: flex; flex-direction: column; gap: 8px">
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 14px; font-weight: 500">Track 03</span>
<h2 style="margin: 0; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 72px; line-height: 1; letter-spacing: -0.03em">Create</h2>
</div>
<p style="margin: 0; max-width: 380px; font-size: 18px; line-height: 1.5; text-align: right">Where design and making meet in your own original project.</p>
</div>
<div style="display: flex; flex-direction: column; gap: 20px">
<div style="display: flex; align-items: center; height: 40px"><span style="flex-grow: 1; height: 0; border-top: 10px dotted var(--create)"></span></div>
<div style="display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 32px 36px; border: 2px dashed #8A8478; border-radius: 18px">
<div style="display: flex; align-items: center; gap: 20px">
<span style="width: 56px; height: 56px; flex-shrink: 0; border-radius: 14px; background: var(--gold); border: 2px solid #1B1B1B; display: flex; align-items: center; justify-content: center"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1B1B1B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 20h20"></path><path d="M5 20l3-12h8l3 12"></path><path d="M9.5 12h5"></path><path d="M8.5 16h7"></path></svg></span>
<div style="display: flex; flex-direction: column; gap: 4px">
<span style="font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 28px">Track under construction</span>
<span style="font-size: 16px; color: #55524C">Decks for this track are in progress. Finish Make and Design to be ready when it opens.</span>
</div>
</div>
</div>
</div>
</section>

<footer style="margin: auto 80px 0; padding: 40px 0 48px; border-top: 2px solid #1B1B1B; display: flex; justify-content: space-between; align-items: center; font-size: 14px; color: #3D3A35">
<span>University of Minnesota Libraries · Engagement, Outreach &amp; Community Partnerships</span>
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace">Creation Hubs / Maker Bootcamp</span>
</footer>

</div>
</body>
</html>
```
