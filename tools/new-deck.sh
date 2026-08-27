#!/usr/bin/env bash
# Scaffolds a new deck (and its parent module when missing), registers it in
# build-site.sh, and smoke-tests the render. Boilerplate comes from templates/.
#
# Usage: tools/new-deck.sh MODULE SLUG TITLE
#   MODULE  Module display name, e.g. "Intro to Robotics"
#   SLUG    Deck folder name, e.g. "01-first-bot"
#   TITLE   Deck title, e.g. "First Bot"
#
# Optional: TRACK=Make (default Design) selects the top-level track.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

die() { echo "error: $*" >&2; exit 1; }

if [ $# -ne 3 ]; then
  echo "Usage: tools/new-deck.sh MODULE SLUG TITLE"
  echo "  e.g. tools/new-deck.sh \"Intro to Robotics\" 01-first-bot \"First Bot\""
  echo "Optional: TRACK=Make (default Design)"
  exit 1
fi

MODULE="$1"
SLUG="$2"
TITLE="$3"
TRACK="${TRACK:-Design}"

[ -n "$MODULE" ] || die "MODULE is empty"
[[ "$SLUG" =~ ^[0-9]{2}-[a-z0-9]+(-[a-z0-9]+)*$ ]] || die "SLUG must look like 01-my-deck (two digits, dash, lowercase words)"
[ -n "$TITLE" ] || die "TITLE is empty"
[ -d "$TRACK" ] || die "track '$TRACK' does not exist (use Design, Make, or Create)"

MODDIR="$TRACK/$MODULE"
DECKDIR="$MODDIR/decks/$SLUG"
DECKPATH="$TRACK/$MODULE/decks/$SLUG"

[ -e "$DECKDIR" ] && die "deck already exists: $DECKDIR/"
grep -qF "\"$DECKPATH\"" build-site.sh && die "already registered in build-site.sh — remove the stale entry first"

if [ ! -d "$MODDIR" ]; then
  mkdir -p "$MODDIR/theme" "$MODDIR/decks"
  cp templates/module/_quarto.yml "$MODDIR/_quarto.yml"
  cp templates/module/theme/overrides.scss "$MODDIR/theme/overrides.scss"
  cp templates/module/decks/README.md "$MODDIR/decks/README.md"
  echo "✓ created module $MODDIR/"
fi

mkdir -p "$DECKDIR/images"
content="$(cat templates/deck/deck.qmd)"
printf '%s\n' "${content//__TITLE__/$TITLE}" > "$DECKDIR/deck.qmd"
echo "✓ created deck $DECKDIR/"

awk -v d="$DECKPATH" '
  /^DECKS=\(/ { indecks = 1 }
  indecks && /^\)/ { print "  \"" d "\""; indecks = 0 }
  { print }
' build-site.sh > build-site.sh.tmp && mv build-site.sh.tmp build-site.sh
echo "✓ registered in build-site.sh"

echo "✓ smoke-test render..."
( cd "$DECKDIR" && quarto render deck.qmd > /dev/null )

cat <<EOF

Done. Two follow-ups:

1. Add a card to index.qmd (paste inside the cards container):

    <a class="mb-card" href="$DECKPATH/deck.html" target="_blank">
      <div class="mb-card-header">$MODULE</div>
      <div class="mb-card-body">
        <div class="mb-card-num">01</div>
        <div class="mb-card-title">$TITLE</div>
        <div class="mb-card-desc">TODO — one-line description.</div>
      </div>
      <div class="mb-card-footer">Open deck</div>
    </a>

2. Drop screenshots into $DECKDIR/images/ using the N.M.I naming convention.
EOF
