#!/usr/bin/env bash
# Builds the full published site into _site/: the landing page (rendered as
# the root Quarto project) plus every module deck (auto-discovered: any
# NN-named folder containing a deck.qmd under Design/, Make/, or Create/ —
# each rendered separately via its OWN _quarto.yml — format: revealjs, shared
# theme — then copied into place). Used both for local testing and by
# .github/workflows/publish.yml.
set -euo pipefail
cd "$(dirname "$0")"

rm -rf _site
quarto render

tracks=()
for t in Design Make Create; do
  if [ -d "$t" ]; then tracks+=("$t"); fi
done

while IFS= read -r -d '' qmd; do
  deck_dir="$(dirname "$qmd")"
  echo "── Rendering $deck_dir ──"
  ( cd "$deck_dir" && quarto render deck.qmd )

  dest="_site/$deck_dir"
  mkdir -p "$dest"
  cp "$deck_dir/deck.html" "$dest/"
  [ -d "$deck_dir/deck_files" ] && cp -R "$deck_dir/deck_files" "$dest/"
  [ -d "$deck_dir/images" ] && cp -R "$deck_dir/images" "$dest/"
done < <(find "${tracks[@]}" -type f -name deck.qmd -path '*/[0-9][0-9]-*/deck.qmd' -print0 | sort -z)

echo "Site assembled in _site/"
