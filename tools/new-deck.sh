#!/usr/bin/env bash
# Scaffolds a new deck from templates/ and smoke-tests the render. The site
# build auto-discovers decks (NN-* folders containing a deck.qmd), so there is
# no registration step — rename the folder later and the build follows.
#
# Usage:
#   tools/new-deck.sh                    create NN-new-deck in the folder you're in
#   tools/new-deck.sh MODULE SLUG TITLE  explicit: create under TRACK/MODULE/decks/
#
# Optional: TRACK=Make (default Design) selects the top-level track (explicit mode).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

die() { echo "error: $*" >&2; exit 1; }

next_slug() {
  # $1 = directory to scan; prints the next free NN-new-deck name
  local max=0 d n
  for d in "$1"/[0-9][0-9]-*; do
    [ -d "$d" ] || continue
    n="${d##*/}"; n="${n%%-*}"; n=$((10#$n))
    [ "$n" -gt "$max" ] && max=$n
  done
  printf '%02d-new-deck' $((max + 1))
}

if [ $# -eq 0 ]; then
  # Contextual mode: create in the folder we were invoked from
  TARGET="${ORIG_PWD:-$PWD}"
  case "$TARGET" in
    "$ROOT"/*) ;;
    *) die "run this from inside the repo ($TARGET is outside $ROOT)" ;;
  esac
  if ! ls "$TARGET"/[0-9][0-9]-* >/dev/null 2>&1 && [ "$(basename "$TARGET")" != "decks" ]; then
    die "'$TARGET' doesn't look like a decks folder (no NN-* deck folders inside, and it isn't named 'decks')"
  fi
  SLUG="$(next_slug "$TARGET")"
  DECKDIR="$TARGET/$SLUG"
  TITLE="New Deck"
elif [ $# -eq 3 ]; then
  MODULE="$1"; SLUG="$2"; TITLE="$3"
  TRACK="${TRACK:-Design}"
  [ -n "$MODULE" ] || die "MODULE is empty"
  [[ "$SLUG" =~ ^[0-9]{2}-[a-z0-9]+(-[a-z0-9]+)*$ ]] || die "SLUG must look like 01-my-deck (two digits, dash, lowercase words)"
  [ -n "$TITLE" ] || die "TITLE is empty"
  [ -d "$TRACK" ] || die "track '$TRACK' does not exist (use Design, Make, or Create)"
  MODDIR="$TRACK/$MODULE"
  DECKDIR="$MODDIR/decks/$SLUG"
  if [ ! -d "$MODDIR" ]; then
    mkdir -p "$MODDIR/theme" "$MODDIR/decks"
    cp templates/module/_quarto.yml "$MODDIR/_quarto.yml"
    cp templates/module/theme/overrides.scss "$MODDIR/theme/overrides.scss"
    cp templates/module/decks/README.md "$MODDIR/decks/README.md"
    cp templates/module/decks/Makefile "$MODDIR/decks/Makefile"
    echo "✓ created module $MODDIR/"
  fi
else
  echo "Usage: tools/new-deck.sh                 (creates NN-new-deck in the current folder)"
  echo "       tools/new-deck.sh MODULE SLUG TITLE   (explicit location)"
  exit 1
fi

[ -e "$DECKDIR" ] && die "deck already exists: $DECKDIR/"

mkdir -p "$DECKDIR/images"
content="$(cat templates/deck/deck.qmd)"
printf '%s\n' "${content//__TITLE__/$TITLE}" > "$DECKDIR/deck.qmd"
echo "✓ created deck $DECKDIR/"

echo "✓ smoke-test render..."
( cd "$DECKDIR" && quarto render deck.qmd > /dev/null )

DECKPATH="${DECKDIR#"$ROOT"/}"
cat <<EOF

Done. Follow-ups:

1. Rename the folder to its real name when ready (e.g. $SLUG → 02-cad-level-3).
   The build auto-discovers decks, so renaming never breaks anything.

2. Add a card to index.qmd (paste inside the cards container):

    <a class="mb-card" href="$DECKPATH/deck.html" target="_blank">
      <div class="mb-card-header">TODO</div>
      <div class="mb-card-body">
        <div class="mb-card-num">01</div>
        <div class="mb-card-title">$TITLE</div>
        <div class="mb-card-desc">TODO — one-line description.</div>
      </div>
      <div class="mb-card-footer">Open deck</div>
    </a>

3. Drop screenshots into $DECKDIR/images/ using the N.M.I naming convention.
EOF
