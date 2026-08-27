# Plan: Makefile Deck Scaffolding (`make new-deck`)

## Goal
One-command creation of a new deck — and its parent module when needed — with
all boilerplate, auto-registered for the site build. Inexperienced
contributors only need to remember `make new-deck`.

## Decisions (confirmed)
- **Interface**: repo-root `Makefile` is the memorable entry point; the real
  logic lives in `tools/new-deck.sh` (heavy make recipes are a maintenance
  trap; the script also stays directly usable).
- **Usage** (superseded by CP5 contextual mode — see checkpoint):
  ```
  make new-deck MODULE="Intro to Robotics" SLUG="01-first-bot" TITLE="First Bot"
  ```
  - MODULE dir missing under `Design/` → module boilerplate is created too
  - Refuses to overwrite anything that already exists
- **Contextual zero-arg mode** (CP5, confirmed by user): `cd` into the folder
  that should hold the new deck, run bare `make new-deck` → creates
  `NN-new-deck` (next free number among siblings). Rename freely afterwards.
- **Auto-discovery build** (CP5, confirmed by user): `build-site.sh` no longer
  keeps a hardcoded DECKS array; it finds every `NN-*/deck.qmd` under
  Design/Make/Create (excluding templates) and renders each. Renaming a deck
  folder can never break the build; the registration step is gone. Tradeoff
  accepted: any merged `NN-*` deck gets published (branch = WIP boundary).
- **Shim Makefiles** (CP5): 3-line shims in every decks folder include the
  root Makefile via `git rev-parse --show-toplevel`, so `make` works from
  wherever the user is standing. Template carries the shim into new modules.
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
- `Makefile` (new; ROOT-aware recipes so shims can include it)
- `tools/new-deck.sh` (new; zero-arg contextual mode + explicit 3-arg mode)
- `templates/**` (new; includes decks/Makefile shim for future modules)
- `build-site.sh` (DECKS array → auto-discovery find loop)
- Shim `Makefile` × 7 existing decks folders
- Root `_quarto.yml` comment (DECKS-array sync note → auto-discovery note)
- Root README: "Creating a New Deck" section

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

- [x] **CP5 — Contextual workflow + auto-discovery build** (added after user
      feedback): zero-arg `make new-deck` creates `NN-new-deck` in the folder
      you're standing in; `build-site.sh` drops the hardcoded DECKS array for
      auto-discovery (`NN-*/deck.qmd` under Design/Make/Create); 3-line shim
      Makefiles let `make` run from any decks folder. Verify: user's exact flow
      (cd fusion folder → make new-deck → rename → build follows).
      (Done: from autodesk-fusion, zero-arg create produced 02-new-deck; renamed
      to 02-test-rename and the full build discovered + rendered it; shims work
      from decks folders; final build green with 7 decks. Bonus: auto-discovery
      found Make/Intro to Sewing/decks/01-sewing-basics, which the old DECKS
      array had silently omitted from the published site.)

## Open questions
- Derive SLUG from TITLE when SLUG is omitted? → resolved: no, SLUG stays
  required (explicit beats implicit for folder names; keeps the script simpler)
