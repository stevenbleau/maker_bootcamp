# Plan: Local Dev Tools — Runtime-Gated (Option 3)

## Goal
Make the three Chrome editing tools (highlight picker, text editor, slide
manager) available in EVERY deck for anyone editing locally, with zero
per-deck setup — while keeping the published site free of *active* tools.

## Decisions (confirmed)
- **Ship-with-gate**: tool HTML is included unconditionally in every deck via
  module-level `_quarto.yml` `include-after-body` (the same mechanism the CAD
  `_quarto-dev.yml` profile used). Accepted tradeoff: inert tool code is
  present in published HTML — consciously revisits the earlier "never ship"
  rule (user confirmed option 3).
- **Gate**: each tool's bootstrap JS enables itself only when ANY of:
  - `location.hostname` is `localhost` or `127.0.0.1`
  - `location.protocol === 'file:'` (double-clicked `deck.html`)
  - URL contains `?dev=1` (escape hatch, e.g. serving from a LAN IP)
  Otherwise the tool no-ops silently (no UI, no console noise).
- **Injection point**: module `_quarto.yml` (one place per module), NOT each
  `deck.qmd` — avoids merge conflicts with active deck-content branches.
- **Retire the profile pattern**: delete `Design/Intro to CAD/_quarto-dev.yml`;
  update the DEV TOOLS comment block in CAD's `_quarto.yml` to document the
  new gate instead of `QUARTO_PROFILE=dev`.

## Files to change
- `tools/highlight-picker.html`, `tools/text-editor.html`,
  `tools/slide-manager.html` — add the gate check to each bootstrap
- `Design/*/_quarto.yml` (5 modules) — add the `include-after-body` block
  pointing at `../../tools/*.html`
- Delete `Design/Intro to CAD/_quarto-dev.yml`; edit CAD `_quarto.yml` comment
- Root README (or AGENTS.md): one-line "how to get the tools locally" note

## Checkpoints (bite-sized, verify each before moving on)
- [x] **CP1 — Gate the tools**: read one tool file to learn its bootstrap
      pattern; add the gate to all three. Verify: open a built `deck.html` via
      `file://` → tools active; same file with a non-local hostname (DevTools
      override or `python3 -m http.server` + hosts trick) → tools absent;
      `?dev=1` → tools active again.
      (Done: identical 4-line gate after `'use strict'` in all three tools +
      header comments updated. Verified via JavaScriptCore/osascript harness:
      all 3 scripts compile; 7/7 gate cases pass — file://, localhost,
      127.0.0.1, ?dev=1 enable; github.io and LAN IP disable.)
- [x] **CP2 — Wire all modules**: add `include-after-body` to all SIX module
      `_quarto.yml` files (plan said five; Sewing under Make/ is the sixth).
      Verify: `quarto render` one deck per module; tool markup present in each
      output `deck.html`. (Done: all six render OK, gates=3 in each deck.html.)
- [x] **CP3 — Cleanup + docs**: remove `_quarto-dev.yml`, fix CAD comment
      block, add the README note. Verify: search for `QUARTO_PROFILE|_quarto-dev`
      returns nothing outside the plan doc. (Done: only historical plan refs remain.)
- [x] **CP4 — Full build**: run `build-site.sh`; confirm `_site` assembles and
      a published-style (non-local host) open shows no tool UI.
      (Done: site assembles; all six `_site` decks contain gates=3. Non-local
      no-activation covered by the CP1 gate test matrix; final visual browser
      check left to user.)

## Open questions
- localStorage opt-in/out for the gate? (default: no, keep it automatic)
