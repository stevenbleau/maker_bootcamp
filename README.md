# Maker Bootcamp Curriculum

Open-source, remixable slide-based curriculum for maker education.

This repository uses **Quarto + RevealJS** for deck authoring.

**License**: [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE)

## Repository Layout

The curriculum is now organized into three top-level tracks:

- `Make/`: maker tool tutorials and workflows (for example: 3D printers, slicers, MIDI controllers, camera use, laser cutters)
- `Design/`: design and software foundations (CAD, vector design, Python, DAW basics)
- `Create/`: project-building and creative application tracks

```text
maker_bootcamp/
├── Make/
├── Design/
│   ├── Intro to CAD/
│   ├── Intro to Vector Design/
│   ├── Intro to Python/
│   └── Intro to DAW's/
├── Create/
├── CONTRIBUTING.md
└── README.md
```

## Authoring Model

- Each module has module-level shared files like `_quarto.yml` and `theme/`.
- Each deck lives in its own folder under `decks/` and owns its own assets.
- Generated artifacts (`deck.html`, `deck_files/`, `.quarto/`) are build outputs and are ignored by git.

## Where To Edit

| Change type | Primary file/folder |
|---|---|
| Slide content | `*/decks/**/deck.qmd` |
| Module theme | `*/theme/maker-bootcamp.scss` (or module theme files) |
| Deck images/assets | `*/decks/**/images/` or deck-local asset folder |
| Track/module organization | `Make/`, `Design/`, `Create/` |

## Running Decks

From a deck folder (example shown for a design module):

```bash
cd "Design/Intro to CAD/decks/autodesk-fusion/01-cad-level-2"
quarto preview deck.qmd
```

Render once:

```bash
quarto render deck.qmd
```

## Image Conventions

For screenshot-heavy decks, images generally use:

`{section}.{step}.{image_index}.{ext}`

- `section`: major section number in the deck
- `step`: step number inside that section (`0` is often divider/background)
- `image_index`: `0` main screenshot, `1` callout/secondary image
- `ext`: `webp` is preferred for screenshots; use `png` only when needed

Example:

- `images/3/3.5.0.webp` (main image)
- `images/3/3.5.1.webp` (callout image)

## Landing page (redesign)

The site front door (`index.qmd`) renders the transit-line design from a single
content file. The previous layout is preserved at `classic.qmd` (`/classic.html`).

- `modules.js` — the content model. **Add a module or track here; never edit markup.**
  Each module needs `course`, `title`, `icon`, `description`, and a `deckUrl`
  relative to the site root that matches a `DECKS` entry in `build-site.sh`.
- `assets/site.css` — design tokens (`:root`), layout, responsive rules.
- `assets/site.js` — renders track banners, route rows, cards, placeholders,
  and the hero route map from `modules.js`.
- `maker-bootcamp-reference.html` / `maker-bootcamp-dev-handoff.md` — the
  approved design and build spec (visual source of truth).

**Track colors:** edit the brand tokens in `assets/site.css` (`--make`,
`--design`, `--create`). Contrast rule: text on a track color must reach 4.5:1 —
if you change a color, flip its `--on-*` token between `--ink` and `#FFFFFF`
accordingly (white on Electric Orange `#D37323` is only ~3.4:1, hence
`--on-make: #1B1B1B`).

**Fonts:** change the three `--font-*` tokens in `assets/site.css` and the Google
Fonts `<link>` in `index.qmd`.

**Build & deploy:** `./build-site.sh` assembles `_site/` (landing pages + decks,
including `assets/` and `modules.js`); the GitHub Actions workflow publishes
`_site/` to GitHub Pages. For a quick look: `quarto preview index.qmd`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for workflow details and style guidance.
