// ═══════════════════════════════════════════════════════════════════════════
//   MAKER BOOTCAMP — LANDING PAGE CONTENT MODEL
// ─────────────────────────────────────────────────────────────────────────────
//   THE ONLY FILE you need to touch to add or change a track or module.
//   The landing page (index.qmd → assets/site.js) renders every track,
//   stop marker, route line, and placeholder from this data.
//
//   To add a module:  append an object to the track's `modules` array.
//     • course    → mono eyebrow text (the module/course name)
//     • title     → card headline (the deck's project name)
//     • icon      → one of: scissors | cube | pen | code | waveform
//                   (icon paths live in assets/site.js ICONS)
//     • image     → OPTIONAL card illustration, relative to the site root
//                   (put files in assets/card-images/; omit the field to
//                   render the card without a picture)
//     • deckUrl   → path to the deck's deck.html RELATIVE TO THE SITE ROOT
//                   (must match an entry in build-site.sh's DECKS array).
//                   OMIT this field for a placeholder card — the renderer
//                   shows a muted "Coming soon" card with no link instead.
//   To retire a module:  move it to the `archived` array below so it is not
//   rendered but its copy stays on file.
//   To add a track:  append an object to `tracks` AND add the matching
//     color tokens to assets/site.css :root — see the contrast rule there.
//   Each track has a `site` ("maker" | "media" | "dev") that decides which
//     studio page renders it (assets/site.js filters on it). Pages carry
//     data-mb-site and the header's nav (home / maker / media / dev) is
//     rendered by assets/site.js — keep page hrefs in sync with the
//     render list in _quarto.yml.
//
//   Track order here is the taught order: Make → Design → Create.
// ═══════════════════════════════════════════════════════════════════════════
window.MB_DATA = {
  tracks: [
    {
      id: "make",
      site: "maker",
      number: "01",
      name: "Make",
      status: "active",
      blurb: "Get your hands on the machines and turn materials into objects.",
      placeholderNote: "New Make modules will land on this line.",
      modules: [
        {
          course: "Intro to Sewing",
          title: "Drawstring Bag",
          icon: "scissors",
          description: "Thread a machine, prep fabric, sew a seam, and finish a drawstring bag from start to end.",
          deckUrl: "Make/Intro to Sewing/decks/01-intro-to-sewing/deck.html"
        },
        {
          course: "Intro to 3D Printing",
          title: "Benchy",
          icon: "cube",
          description: "FDM 3D printing from model to finished print — slicer settings, supports, and a full benchy run."
        },
        {
          course: "Intro to Machine Embroidery",
          title: "Embroidered Patch",
          icon: "scissors",
          description: "Machine embroidery fundamentals — digitizing, stabilizing, and finishing a felt patch."
        },
        {
          course: "Intro to Vacuum Forming",
          title: "Chocolate Bar Mold",
          icon: "cube",
          description: "Shape thermoplastics with heat and vacuum — design and form a chocolate bar mold."
        },
        {
          course: "Intro to CNC Milling",
          title: "PCB",
          icon: "code",
          description: "Subtractive manufacturing on the CNC mill — fixtures, tool paths, and a finished circuit board."
        },
        {
          course: "Intro to Laser Cutting",
          title: "Keychain",
          icon: "pen",
          description: "Vector cutting and scoring on the laser — material prep, settings, and a polished keychain."
        },
        {
          course: "Intro to Vinyl Cutting",
          title: "Sticker",
          icon: "scissors",
          description: "Weed and transfer cut vinyl — from digital artwork to a finished sticker."
        }
      ]
    },
    {
      id: "design",
      site: "maker",
      number: "02",
      name: "Design",
      status: "active",
      blurb: "Model it, draw it, code it, hear it. The digital side of making.",
      placeholderNote: "New Design modules will land on this line.",
      modules: [
        {
          course: "Intro to CAD",
          title: "Toy Brick Character",
          icon: "cube",
          image: "assets/card-images/intro-to-cad.jpg",
          description: "Parametric design in Autodesk Fusion — sketch, dimension, extrude, fit tolerances, and stud patterns.",
          deckUrl: "Design/Intro to CAD/decks/autodesk-fusion/01-cad-level-2/deck.html"
        },
        {
          course: "Intro to Vector Design",
          title: "Marble Maze",
          icon: "pen",
          image: "assets/card-images/intro-to-vector-design.jpg",
          description: "Foundations of vector design tools and concepts.",
          deckUrl: "Design/Intro to Vector Design/decks/01-intro/deck.html"
        },
        {
          course: "Intro to Digital Pattern Making",
          title: "Pajama Pants",
          icon: "pen",
          description: "Draft and refine digital sewing patterns — from measurements to a sewable pajama pant block."
        },
        {
          course: "Intro to ECAD",
          title: "Synthesizer",
          icon: "waveform",
          description: "Principles of electronic circuit design — layout, simulation, and a buildable pocket synthesizer."
        },
        {
          course: "Intro to Microcontrollers",
          title: "Pinball Machine",
          icon: "code",
          description: "Embedded programming fundamentals — sensors, loops, and game logic in a pinball machine project.",
          deckUrl: "Design/Intro to Microcontrollers/decks/01-wokwi-pinball/deck.html"
        }
      ]
    },
    {
      id: "create",
      site: "maker",
      number: "03",
      name: "Create",
      status: "construction",
      blurb: "Where design and making meet in your own original project.",
      constructionNote: "Decks for this track are in progress. Finish Make and Design to be ready when it opens.",
      modules: []
    },
    {
      id: "capture",
      site: "media",
      number: "01",
      name: "Capture",
      status: "construction",
      blurb: "Cameras, mics, and light — get the footage and sound.",
      constructionNote: "Decks for this track are in progress.",
      modules: []
    },
    {
      id: "produce",
      site: "media",
      number: "02",
      name: "Produce",
      status: "construction",
      blurb: "Edit, mix, and shape what you captured into a finished piece.",
      constructionNote: "Decks for this track are in progress.",
      modules: []
    },
    {
      id: "create-media",
      site: "media",
      number: "03",
      name: "Create",
      status: "construction",
      blurb: "Where capture and production meet in your own original project.",
      constructionNote: "Decks for this track are in progress.",
      modules: []
    },
    {
      id: "launch",
      site: "dev",
      number: "01",
      name: "Launch",
      status: "construction",
      blurb: "Tools and publishing — get a project live.",
      constructionNote: "Decks for this track are in progress.",
      modules: []
    },
    {
      id: "develop",
      site: "dev",
      number: "02",
      name: "Develop",
      status: "construction",
      blurb: "Code, iterate, and build software projects that work.",
      constructionNote: "Decks for this track are in progress.",
      modules: []
    },
    {
      id: "create-dev",
      site: "dev",
      number: "03",
      name: "Create",
      status: "construction",
      blurb: "Where launch and development meet in your own original project.",
      constructionNote: "Decks for this track are in progress.",
      modules: []
    }
  ],
  // Retired modules — kept for reference, not rendered by the landing page.
  archived: [
    {
      course: "Intro to Python",
      title: "Hello Python",
      icon: "code",
      description: "Getting started with Python — variables, outputs, and first programs.",
      deckUrl: "Design/Intro to Python/decks/01-hello-python/deck.html"
    },
    {
      course: "Intro to DAWs",
      title: "Pentatonic Keyboard",
      icon: "waveform",
      description: "Introduction to digital audio workstations using a pentatonic keyboard project.",
      deckUrl: "Design/Intro to DAW's/decks/01-pentatonic-keyboard/deck.html"
    }
  ]
};
