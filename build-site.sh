#!/usr/bin/env bash
# Builds the full published site into _site/: the landing page (rendered as
# the root Quarto project) plus every module deck (each rendered separately
# via its OWN _quarto.yml — format: revealjs, shared theme — then copied
# into place). Used both for local testing and by
# .github/workflows/publish.yml. Keep DECKS in sync with the deck list
# referenced in the root _quarto.yml's comment.
set -euo pipefail
cd "$(dirname "$0")"

rm -rf _site
quarto render

DECKS=(
  "Design/Intro to CAD/decks/autodesk-fusion/01-cad-level-2"
  "Design/Intro to DAW's/decks/01-pentatonic-keyboard"
  "Design/Intro to Microcontrollers/decks/01-wokwi-pinball"
  "Design/Intro to Python/decks/01-hello-python"
  "Design/Intro to Vector Design/decks/01-intro"
  "Make/Intro to Sewing/decks/01-intro-to-sewing"
)

for deck_dir in "${DECKS[@]}"; do
  echo "── Rendering $deck_dir ──"
  ( cd "$deck_dir" && quarto render deck.qmd )

  dest="_site/$deck_dir"
  mkdir -p "$dest"
  cp "$deck_dir/deck.html" "$dest/"
  [ -d "$deck_dir/deck_files" ] && cp -R "$deck_dir/deck_files" "$dest/"
  [ -d "$deck_dir/images" ] && cp -R "$deck_dir/images" "$dest/"
done

echo "Site assembled in _site/"
