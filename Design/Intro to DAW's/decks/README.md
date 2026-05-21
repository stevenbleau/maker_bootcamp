# Deck Organization

This module supports multiple decks.

## Structure

- `decks/01-pentatonic-keyboard/` = current starter DAW/music-production deck
- Add future decks as `decks/02-.../`, `decks/03-.../`, etc.

Each deck folder should contain:

- `deck.qmd` (slides)
- `images/` or deck-local assets (optional)

Shared module-level assets stay at module root:

- `_quarto.yml`
- `theme/` (if used)

## Notes

- New work should be created under `decks/`.
- Keep audio assets local to the deck folder when they are deck-specific.