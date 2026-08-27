# Shim — include the repo-root Makefile so `make` works from this folder.
ROOT := $(shell git rev-parse --show-toplevel 2>/dev/null)
ifeq ($(strip $(ROOT)),)
$(error run this inside a git checkout of maker_bootcamp)
endif
include $(ROOT)/Makefile
