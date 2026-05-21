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

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for workflow details and style guidance.
