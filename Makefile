# Maker Bootcamp — convenience targets. Run bare `make` for help.
# This Makefile is also included by the 3-line shims in each decks/ folder,
# so these targets work from anywhere a shim lives.
SHELL := /bin/bash

ROOT := $(shell git rev-parse --show-toplevel 2>/dev/null)
ifeq ($(strip $(ROOT)),)
ROOT := $(CURDIR)
endif

.PHONY: help new-deck build

help:
	@echo "Maker Bootcamp targets:"
	@echo ""
	@echo "  make new-deck"
	@echo "      Create a numbered template deck (NN-new-deck) in the folder"
	@echo "      you're standing in. Rename the folder afterwards — the build"
	@echo "      auto-discovers decks."
	@echo ""
	@echo "  make new-deck MODULE=\"Intro to X\" SLUG=01-my-deck TITLE=\"My Deck\""
	@echo "      Explicit form: create under Design/ (or TRACK=Make) regardless"
	@echo "      of where you're standing; creates the module if missing."
	@echo ""
	@echo "  make build"
	@echo "      Build the full published site into _site/ (runs build-site.sh)."

new-deck:
	@if [ -n "$(MODULE)" ] || [ -n "$(SLUG)" ] || [ -n "$(TITLE)" ]; then \
		cd "$(ROOT)" && ./tools/new-deck.sh "$(MODULE)" "$(SLUG)" "$(TITLE)"; \
	else \
		_orig_pwd="$$(pwd)"; cd "$(ROOT)" && ORIG_PWD="$$_orig_pwd" ./tools/new-deck.sh; \
	fi

build:
	@cd "$(ROOT)" && ./build-site.sh
