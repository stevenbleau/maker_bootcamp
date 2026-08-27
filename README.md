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

### Editing tools (local only)

Every deck carries three built-in editing tools — 📐 highlight picker, ✏️ text
editor, and slide manager (bottom-right buttons). They activate **only locally**:
when you open `deck.html` directly (`file://`), use `quarto preview`
(localhost), or append `?dev=1` to the URL. They never activate on the published
site. Use Chrome for full functionality (file read/write support).

## Creating a New Deck

Scaffold a template deck right where you're standing — `cd` into the folder that
should contain it, then:

```bash
make new-deck
```

This creates `NN-new-deck/` (next free number among the siblings) with the
standard skeleton. Rename the folder to its real name whenever you like — the
site build auto-discovers any `NN-*` folder containing a `deck.qmd`, so
renaming never breaks anything.

Explicit form (creates under `Design/` regardless of where you're standing, and
creates the module if missing):

```bash
make new-deck MODULE="Intro to Robotics" SLUG=01-first-bot TITLE="First Bot"
```

(`TRACK=Make make new-deck ...` targets the Make track.)

After creating a deck, add its landing-page card to `index.qmd` — the command
prints a ready-to-paste snippet. Bare `make` lists all targets; `make build`
builds the full site into `_site/`.

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

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for workflow details and style guidance.
