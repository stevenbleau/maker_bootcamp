# Maker Bootcamp — convenience targets. Run bare `make` for help.
SHELL := /bin/bash

.PHONY: help new-deck build

help:
	@echo "Maker Bootcamp targets:"
	@echo ""
	@echo "  make new-deck MODULE=\"Intro to X\" SLUG=01-my-deck TITLE=\"My Deck\""
	@echo "      Create a new deck (and its module if missing), register it in"
	@echo "      build-site.sh, and smoke-test the render."
	@echo "      Optional: TRACK=Make (default Design)"
	@echo ""
	@echo "  make build"
	@echo "      Build the full published site into _site/ (runs build-site.sh)."

new-deck:
	@if [ -z "$(MODULE)" ] || [ -z "$(SLUG)" ] || [ -z "$(TITLE)" ]; then \
		echo "usage: make new-deck MODULE=\"Intro to X\" SLUG=01-my-deck TITLE=\"My Deck\""; \
		exit 1; \
	fi
	./tools/new-deck.sh "$(MODULE)" "$(SLUG)" "$(TITLE)"

build:
	./build-site.sh
