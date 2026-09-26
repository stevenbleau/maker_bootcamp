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
//                   (must match an entry in build-site.sh's DECKS array)
//   To add a track:  append an object to `tracks` AND add the matching
//     color tokens to assets/site.css :root — see the contrast rule there.
//
//   Track order here is the taught order: Make → Design → Create.
// ═══════════════════════════════════════════════════════════════════════════
window.MB_DATA = {
  tracks: [
    {
      id: "make",
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
        }
      ]
    },
    {
      id: "design",
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
    },
    {
      id: "create",
      number: "03",
      name: "Create",
      status: "construction",
      blurb: "Where design and making meet in your own original project.",
      modules: []
    }
  ]
};
