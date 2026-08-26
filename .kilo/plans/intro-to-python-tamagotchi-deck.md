# Plan: Intro to Python — Tamagotchi Deck

## Goal
Build out the Intro to Python deck as an interactive, bite-sized, Tamagotchi-themed
course. Every slide teaches one small Python concept with a runnable code snippet.
Learners end by building their own Tamagotchi from scratch.

## Decisions (confirmed)
- **Rename** `decks/01-hello-python/` → `decks/01-intro-to-python/`
  - Update `build-site.sh` DECKS array to match.
- **Runtime**: Pyodide (in-browser Python) — already wired into the existing deck's
  `include-in-header` script. Keep it; it needs no server and works offline-ish via CDN.
- **Slide size**: one concept per slide, one runnable snippet per slide.
  - Unlike CAD (single click), Python slides = edit + Run Code button.
  - Each slide: short title, 1–2 sentence explanation, editable `<textarea>` editor,
    "Run Code" button, output panel.
- **Growing script** (confirmed): each slide's editor contains the FULL
  program-so-far, not an isolated snippet. Slide 1.1 = first lines; each later
  slide appends (or refactors) the next concept. By 2.7 the learner has built
  the complete Tamagotchi line by line (as a multi-file project from 2.1 on).
  - Every version must stay self-contained (redefines everything from the top)
    so any single slide runs standalone, even if the learner jumps around.
  - This neutralizes the existing side effect where all slides share one
    Pyodide session and variables leak between runs.
  - When functions are introduced (2.2), earlier top-level code moves inside
    them — the script genuinely evolves, which is realistic and fine.
- **Terminal-styled output** (confirmed): style `.py-output` like a terminal —
  fake title bar (e.g. `pet.py`), dark bg (already there), monospace, optional
  prompt/cursor accent. Cosmetic only; no full interactive REPL (indentation is
  too painful line-by-line for beginners). A REPL could be a bonus slide later.
- **Bounded game loop** (amended): teaching loops (1.7–1.8) stay self-terminating
  (counter-driven). `input()` is FORBIDDEN on non-interactive slides — it freezes
  the page with no stdin handler. The final interactive game (2.5+) MAY use
  `while True` + a `quit` command because the stdin handler keeps it responsive.
- **Interactive terminal** (confirmed): game slides get real stdin via
  `pyodide.setStdin({ batched: cb => Promise })` — when Python hits `input()`, JS
  shows a prompt line in the terminal, waits for learner typing + Enter, hands the
  text back to Python. The output panel becomes a live command-line app. Learners
  type GAME COMMANDS (feed/play/sleep), not Python — no indentation pain, so this
  does NOT contradict the no-REPL decision above.
  - Risk: buggy learner code can hang the page (no clean interrupt for a running
    Pyodide script). Mitigation: scaffold loop reads input every iteration so the
    learner always holds the reins; slide note "refresh the page to reset".
- **Live VS Code-style IDE mock** (confirmed): NOT real code-server — that needs a
  running server, blocks iframe embedding by default (CSP frame-ancestors), and
  needs per-learner workspace isolation; incompatible with a static published deck.
  Instead: HTML/CSS/JS IDE chrome inside `.main-panel`:
  - File explorer sidebar — the project tree GROWS through the course
    (section 1: just `pet.py`; section 2 adds `actions.py`, `events.py`, `main.py`)
  - Tab bar + editable code pane (the editor moves OUT of the callout into here)
  - Integrated terminal at the bottom = Pyodide output + stdin prompt line
  - Clicking a file switches the editor pane
  - Callout box becomes instructions-only (concept text + Run button)
- **IDE layout timing** (default, confirmed unless objected): sections 0–1 keep
  the simple layout (callout editor + terminal output) — one file, no chrome noise
  for beginners. The IDE arrives at section 2 as a "level up" when the app splits
  into multiple files.
- **Multi-file project arc** (confirmed): sections 0–1 build ONE file (`pet.py`,
  the growing script). Section 2 teaches modules/imports: the program splits into
  `main.py` (game loop + command dispatch), `pet.py` (stats + life stage),
  `actions.py` (feed/play/sleep/restart), `events.py` (event log) — mirroring
  termagotchi's structure. Pyodide runs multi-file via `pyodide.setFiles({...})`.
  The growing-script principle continues per-file.
- **Capstone scope — lean termagotchi** (default, confirmed unless objected):
  reference https://github.com/ezeoleaf/termagotchi.
  - INCLUDE: 3 stats (hunger/happiness/energy), life stages (egg→baby→child→adult
    by age), foods dict (3–4 foods with different effects), games dict (2–3 games),
    event log (list), restart, command menu (status/feed/play/sleep/events/help/quit)
  - EXCLUDE: auto-save, real-time stat decay, TUI keyboard navigation, 4th "health"
    stat (keep the 3 stats taught in section 1)

## Layout / conventions (match existing deck + theme)
- RevealJS Quarto deck, format `revealjs`, theme `maker-bootcamp.scss`.
- Section dividers: `# N.0 TITLE {.divider}` with left-panel number + label.
- Content slides: `## N.M Title {.content}` with `.top-bar`, `.screenshot-row`,
  `.callout-box` (editor + run + insight), `.main-panel` (output).
- TWO layouts: sections 0–1 use the simple layout above; section 2 uses the IDE
  layout — `.callout-box` = instructions + Run only, `.main-panel` = IDE mock
  (file tree + editor pane + integrated terminal).
- Reuse existing CSS classes: `.py-editor`, `.py-run`, `.py-output`, `.concept-insight`.

## Slide outline (Tamagotchi arc)
Program arc: 1.1 first prints → 1.2 + name/age vars → 1.3 + feeding math →
1.4 + stats dict → 1.5 + hunger check → 1.6 + if/elif/else → 1.7 + bounded while
loop → 1.8 + for/range — ALL inside ONE file (`pet.py`) — → 2.1 split into
`pet.py` + `actions.py` (IDE arrives) → 2.3 + `events.py` → 2.5 + `main.py`
game loop → 2.8 learner-filled scaffold.

0.0 Divider — Intro to Python
0.1 Welcome — what is Python, why Tamagotchi
0.2 How this deck works — edit + Run Code

1.0 Divider — Python Basics
1.1 Hello, pet! — print() and strings
1.2 Name your pet — variables + f-strings
1.3 Feed it — numbers + arithmetic (+, -, *, /)
1.4 Pet stats — dictionaries (hunger, happiness, energy)
1.5 Is it hungry? — booleans + comparison operators
1.6 Make a choice — if / elif / else
1.7 Loop the day — while loop
1.8 Repeat actions — for loop + range()

2.0 Divider — Build Your Tamagotchi
2.1 Your app, organized — IDE layout arrives; file tree; why real apps use
    multiple files; first split pet.py + actions.py; import
2.2 Actions as functions — def feed(), play(), sleep() live in actions.py
2.3 The event log — lists: events.py, log_event(), show_events()
2.4 Talk to your pet — input(); interactive terminal arrives
2.5 The game loop — main.py: while True + command dispatch; run the full app
2.6 Life stages — egg → baby → child → adult (age + if/elif)
2.7 More fun — foods dict, games dict, restart()
2.8 Build YOUR Tamagotchi — scaffold with blanks, learner fills it in
2.9 Wrap-up — recap + next steps

## Checkpoints (bite-sized, verify each before moving on)
- [x] **CP1 — Rename folder**: `01-hello-python` → `01-intro-to-python`; update
      `build-site.sh` DECKS array. Verify: `ls decks/` shows new name; no stale refs.
      (Also fixed stale links in `index.qmd` card + `decks/README.md`.)
- [x] **CP2 — Section 0 (Welcome)**: divider + 2 slides (what is Python / how it works).
      Verify: deck renders; Run Code works on slide 0.1.
      (Rendered OK; both slides + Pyodide present in deck.html.)
- [x] **CP3 — Section 1.1–1.3 (Basics)**: print, variables/f-strings, arithmetic.
      Verify: each snippet runs and prints expected output in browser.
      (All 3 snippets verified via python3; deck renders with correct slide order.)
- [x] **CP3b — Growing-script retrofit + terminal styling**: convert existing
      1.1–1.3 editors into the growing program-so-far format; add terminal look
      to `.py-output` (title bar `pet.py`, prompt/cursor accent). Verify: each of
      1.1–1.3 still runs standalone; output panel looks like a terminal.
      (Done: 1.2/1.3 editors now carry full program-so-far; `.py-output` has
      `pet.py` title bar via ::before + blinking ▌ cursor via ::after; grown
      script verified via python3; deck renders.)
- [x] **CP4 — Section 1.4–1.6 (Data + Logic)**: dicts, booleans/comparisons, if/elif/else.
      Verify: pet stats dict + hunger check + choice all run correctly.
      (Done in growing-script format; all 3 if/elif/else branches tested via
      python3 with hunger=8/5/2; added `max-height: 400px` to `.py-editor` so
      the 29-line program scrolls internally on 1280×720 slides.)
- [ ] **CP5 — Section 1.7–1.8 (Loops)**: while loop (self-terminating), for loop
      + range(). Simple layout (no IDE yet). Verify: loops terminate and print
      expected sequence.
- [ ] **CP6 — IDE mock component**: VS Code-style chrome in `.main-panel` (file
      tree, tabs, editable pane, integrated terminal); callout becomes
      instructions-only. Verify: file click switches editor; layout fits 1280×720;
      Run works from the IDE on a test slide.
- [ ] **CP7 — Interactive terminal**: `setStdin` wiring + prompt-line UI in the
      integrated terminal. Verify: `input()` round-trips learner typing in browser;
      empty input + bad commands handled gracefully.
- [ ] **CP8 — Section 2 slides (2.1–2.7)**: files/import, functions, event log,
      input(), game loop, life stages, foods/games/restart. Verify: each slide runs
      in the IDE; the 2.5 app is playable end-to-end (status/feed/play/sleep/
      events/quit) and `quit` exits cleanly.
- [ ] **CP9 — Capstone + wrap-up (2.8–2.9)**: runnable scaffold with blanks + recap.
      Verify: scaffold runs once filled; recap lists all concepts.
- [ ] **CP10 — Cleanup + build**: run `build-site.sh`, confirm site assembles with
      the renamed deck and no broken links.

## Files to change
- `Design/Intro to Python/decks/01-intro-to-python/deck.qmd` (full content; all
  CSS/JS lives in the `include-in-header` block — it will grow large (~400+ lines)
  with IDE mock + interactive terminal; keep it organized with comment banners)
- `build-site.sh` (update DECKS path) — done in CP1
- `index.qmd` + `Design/Intro to Python/decks/README.md` (stale links) — done in CP1

## Open questions
- Keep Pyodide CDN version v0.27.2? (yes unless told otherwise)
- Any images needed for dividers, or keep text-only dividers?
- Syntax highlighting in the IDE mock editor? (default: plain monospace for now,
  revisit if time permits)
- Cosmetic "save" affordance in the mock IDE (e.g. dot on the tab until Run)?
  (default: no)
