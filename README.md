# Maker Bootcamp Curriculum

Open-source, remixable slide-based curriculum for maker education.

This repository currently uses **Quarto + RevealJS** for deck authoring.

**License**: [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE)

## Current Repository Layout

```text
maker_bootcamp/
├── Intro to CAD/
│   ├── _quarto.yml
│   ├── curriculum.md
│   ├── theme/
│   └── decks/
│       └── autodesk-fusion/
│           └── 01-cad-level-2/
│               ├── deck.qmd
│               └── images/
├── Intro to Vector Design/
│   ├── _quarto.yml
│   ├── theme/
│   └── decks/
│       └── 01-intro/
│           ├── deck.qmd
│           └── images/
├── CONTRIBUTING.md
└── README.md
```

## Authoring Model

- Each module (for example, `Intro to CAD`) has module-level shared files like `_quarto.yml` and `theme/`.
- Each deck lives in its own folder under `decks/` and owns its own `images/`.
- Generated artifacts (`deck.html`, `deck_files/`, `.quarto/`) are build outputs and are ignored by git.

## Where To Edit

| Change type | Primary file/folder |
|---|---|
| Slide content | `*/decks/*/*/deck.qmd` |
| Module theme | `*/theme/maker-bootcamp.scss` (or module theme files) |
| Deck images | `*/decks/*/*/images/` |
| Curriculum map (CAD module) | `Intro to CAD/curriculum.md` |

## Running Decks

From a deck folder (example shown for CAD):

```bash
cd "Intro to CAD/decks/autodesk-fusion/01-cad-level-2"
quarto preview deck.qmd
```

Render once:

```bash
quarto render deck.qmd
```

## Image Conventions

Images use a three-part numeric scheme:

`{section}.{step}.{image_index}.{ext}`

- `section`: major section number in the deck
- `step`: step number inside that section (`0` is usually a divider image)
- `image_index`: `0` main screenshot, `1` callout/secondary image
- `ext`: `webp` is now the default for screenshots; use `png` only when necessary

Example:

- `images/3/3.5.0.webp` (main image)
- `images/3/3.5.1.webp` (callout image)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for workflow details and style guidance.
