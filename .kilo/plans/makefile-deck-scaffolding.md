# Plan: Makefile Deck Scaffolding (`make new-deck`)

## Goal
One-command creation of a new deck — and its parent module when needed — with
all boilerplate, auto-registered for the site build. Inexperienced
contributors only need to remember `make new-deck`.

## Decisions (confirmed)
- **Interface**: repo-root `Makefile` is the memorable entry point; the real
  logic lives in `tools/new-deck.sh` (heavy make recipes are a maintenance
  trap; the script also stays directly usable).
- **Usage**:
  ```
  make new-deck MODULE="Intro to Robotics" SLUG="01-first-bot" TITLE="First Bot"
  ```
  - MODULE dir missing under `Design/` → module boilerplate is created too
  - Refuses to overwrite anything that already exists
- **Templates** in `templates/` (single source of truth):
  - `templates/module/_quarto.yml`, `templates/module/theme/overrides.scss`,
    `templates/module/decks/README.md`
  - `templates/deck/deck.qmd` (minimal revealjs skeleton) + `images/` dir
  - Module template must match the POST-project-1 `_quarto.yml` (i.e. include
    the runtime-gated dev tools block) — land/sync after `local-dev-tools`
- **Auto-registration**: append the deck path to `build-site.sh`'s DECKS
  array; PRINT a ready-to-paste `index.qmd` card snippet (no fragile HTML
  auto-editing).
- **Smoke test**: script runs `quarto render` on the new deck before exiting,
  so broken boilerplate is caught immediately.
- **Bonus target**: `make build` = thin wrapper around `./build-site.sh`;
  bare `make` prints a short help listing targets.

## Files to change
- `Makefile` (new, ~15 lines)
- `tools/new-deck.sh` (new, ~80 lines)
- `templates/**` (new)
- Root README: short "Creating a new deck" section

## Checkpoints (bite-sized, verify each before moving on)
- [x] **CP1 — Templates**: create the `templates/` tree using
      `Design/Intro to Vector Design` as the known-good reference. Verify:
      diff against the real module shows only intentional differences.
      (Done: module _quarto.yml + overrides.scss are byte-identical copies of
      the reference — including the post-project-1 dev-tools wiring; branch was
      re-based onto local-dev-tools for this. decks/README.md generalized;
      deck.qmd is a new skeleton with __TITLE__ placeholder + anatomy comment.)
- [x] **CP2 — Script core**: `new-deck.sh` handles (a) new deck in existing
      module, (b) brand-new module, (c) refuses to overwrite. Verify: run all
      three cases with throwaway names; DECKS array updated correctly each
      time; card snippet printed with correct href.
      (Done: all three cases + bad-slug validation pass; DECKS entry inserted
      before the array close via awk; title substitution verified; throwaways
      cleaned up immediately after.)
- [x] **CP3 — Makefile wrapper**: `make new-deck ...`, `make build`, bare
      `make` help. Verify: works from a clean shell; bad/missing args produce
      a friendly error, not a stack trace.
      (Done: bare make → help; missing args → usage line; full
      `make new-deck MODULE=... SLUG=... TITLE=...` flow rendered OK.)
- [x] **CP4 — Docs + cleanup**: README section; delete throwaway decks and
      their DECKS entries; final `./build-site.sh` run green.
      (Done: "Creating a New Deck" README section added; all throwaway decks
      removed and build-site.sh reverted; `make build` assembles the site.)

## Open questions
- Derive SLUG from TITLE when SLUG is omitted? → resolved: no, SLUG stays
  required (explicit beats implicit for folder names; keeps the script simpler)
