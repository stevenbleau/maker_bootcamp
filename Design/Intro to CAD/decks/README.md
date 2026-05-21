# Deck Organization

This module supports multiple decks (for different parts of the project).

## Structure

- `decks/autodesk-fusion/01-cad-level-2/` = current primary deck
- Add future decks as `decks/02-.../`, `decks/03-.../`, etc.

Each deck folder should contain:

- `deck.qmd` (slides)
- `PLAN.md` (deck-specific plan and notes)
- `images/` (deck-specific image assets)

Shared module-level assets stay at module root:

- `_quarto.yml`
- `theme/`
- `curriculum.qmd` (module-level macro objectives and touchpoint mapping)

All image assets should live inside each deck's own `images/` folder.

## Notes

- No root-level deck or image content is maintained.
- New work should be created under `decks/`.
