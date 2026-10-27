// ═══════════════════════════════════════════════════════════════════════════
//   MAKER BOOTCAMP, LANDING PAGE CONTENT MODEL
// ─────────────────────────────────────────────────────────────────────────────
//   THE ONLY FILE you need to touch to add or change a track or module.
//   The landing page (index.qmd → assets/site.js) renders every track,
//   stop marker, route line, and placeholder from this data.
//
//   To add a module:  append an object to the track's `modules` array.
//     • course    → mono eyebrow text (the module/course name)
//     • title     → card headline (the deck's project name)
//     • icon      → one of: scissors | cube | pen | code | waveform |
//                   camera | monitor | image (icon paths in assets/site.js ICONS)
//     • image     → OPTIONAL card illustration, relative to the site root
//                   (put files in assets/card-images/; omit the field to
//                   render the card without a picture)
//     • deckUrl   → path to the deck's deck.html RELATIVE TO THE SITE ROOT
//                   (must match an entry in build-site.sh's DECKS array).
//                   OMIT this field for a placeholder card, the renderer
//                   shows a muted "Coming soon" card with no link instead.
//   To retire a module:  remove it from a track's `modules` array (or move it
//   to an `archived: []` top-level array so its copy stays on file, the
//   renderer ignores anything outside `tracks`).
//   To add a track:  append an object to `tracks` AND add the matching
//     color tokens to assets/site.css :root, see the contrast rule there.
//   Each track has a `site` ("maker" | "media" | "dev") that decides which
//     studio page renders it (assets/site.js filters on it). Pages carry
//     data-mb-site and the header's nav (home / maker / media / dev) is
//     rendered by assets/site.js, keep page hrefs in sync with the
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
          course: "Drawstring Bag",
          title: "Intro to Sewing",
          icon: "scissors",
          image: "assets/card-images/intro-to-sewing.jpg",
          description: "Thread a machine, prep fabric, sew a seam, and finish a drawstring bag from start to end.",
          deckUrl: "Make/Intro to Sewing/decks/01-intro-to-sewing/deck.html"
        },
        {
          course: "Benchy",
          title: "Filament 3D Printing",
          icon: "cube",
          image: "assets/card-images/intro-to-3d-printing.jpg",
          description: "FDM 3D printing from model to finished print, slicer settings, supports, and a full benchy run."
        },
        {
          course: "Miniature Figure",
          title: "Resin 3D Printing",
          icon: "cube",
          image: "assets/card-images/intro-to-resin-printing.jpg",
          description: "Resin 3D printing from model to finished piece, exposure settings, supports, and post-processing a detailed miniature."
        },
        {
          course: "Embroidered Patch",
          title: "Intro to Machine Embroidery",
          icon: "scissors",
          image: "assets/card-images/intro-to-machine-embroidery.jpg",
          description: "Machine embroidery fundamentals, digitizing, stabilizing, and finishing a felt patch."
        },
        {
          course: "Chocolate Bar Mold",
          title: "Intro to Vacuum Forming",
          icon: "cube",
          image: "assets/card-images/intro-to-vacuum-forming.jpg",
          description: "Shape thermoplastics with heat and vacuum, design and form a chocolate bar mold."
        },
        {
          course: "PCB",
          title: "Intro to CNC Milling",
          icon: "code",
          image: "assets/card-images/intro-to-cnc-milling.jpg",
          description: "Subtractive manufacturing on the CNC mill, fixtures, tool paths, and a finished circuit board."
        },
        {
          course: "Keychain",
          title: "Intro to Laser Cutting",
          icon: "pen",
          image: "assets/card-images/intro-to-laser-cutting.jpg",
          description: "Vector cutting and scoring on the laser, material prep, settings, and a polished keychain."
        },
        {
          course: "Sticker",
          title: "Intro to Vinyl Cutting",
          icon: "scissors",
          image: "assets/card-images/intro-to-vinyl-cutting.jpg",
          description: "Weed and transfer cut vinyl, from digital artwork to a finished sticker."
        },
        {
          course: "LED Circuit",
          title: "Intro to Soldering",
          icon: "waveform",
          image: "assets/card-images/intro-to-soldering.jpg",
          description: "Soldering from first joint to a finished circuit, iron technique, flux, and a simple LED build."
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
          course: "Toy Brick Character",
          title: "Intro to CAD",
          icon: "cube",
          image: "assets/card-images/intro-to-cad.jpg",
          description: "Parametric design in Autodesk Fusion, sketch, dimension, extrude, fit tolerances, and stud patterns.",
          deckUrl: "Design/Intro to CAD/decks/autodesk-fusion/01-cad-level-2/deck.html"
        },
        {
          course: "Marble Maze",
          title: "Intro to Vector Design",
          icon: "pen",
          image: "assets/card-images/intro-to-vector-design.jpg",
          description: "Foundations of vector design tools and concepts.",
          deckUrl: "Design/Intro to Vector Design/decks/01-intro/deck.html"
        },
        {
          course: "Pajama Pants",
          title: "Intro to Digital Pattern Making",
          icon: "pen",
          image: "assets/card-images/intro-to-digital-pattern-making.jpg",
          description: "Draft and refine digital sewing patterns, from measurements to a sewable pajama pant block."
        },
        {
          course: "Synthesizer",
          title: "Intro to ECAD",
          icon: "waveform",
          image: "assets/card-images/intro-to-ecad.jpg",
          description: "Principles of electronic circuit design, layout, simulation, and a buildable pocket synthesizer."
        },
        {
          course: "Pinball Machine",
          title: "Intro to Microcontrollers",
          icon: "code",
          image: "assets/card-images/intro-to-microcontrollers.jpg",
          description: "Embedded programming fundamentals, sensors, loops, and game logic in a pinball machine project.",
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
      status: "active",
      blurb: "Cameras, mics, and light, get the footage and sound.",
      placeholderNote: "New Capture modules will land on this line.",
      modules: [
        {
          course: "Intro to MIDI Controllers",
          title: "MIDI Controller",
          icon: "waveform",
          description: "Wire, power, and program a hands-on MIDI controller for live performance."
        },
        {
          course: "Intro to Audio Interfaces",
          title: "Audio Interface",
          icon: "waveform",
          description: "Connect, configure, and record clean audio through a studio interface."
        },
        {
          course: "Intro to Drawing Tablets",
          title: "Drawing Tablet",
          icon: "pen",
          description: "Pen tablet fundamentals, pressure, shortcuts, and sketching to final art."
        },
        {
          course: "Intro to Photography",
          title: "Camera Photography",
          icon: "camera",
          description: "Composition, exposure, and workflow, shooting stills on an interchangeable-lens camera."
        },
        {
          course: "Intro to Videography",
          title: "Camera Videography",
          icon: "camera",
          description: "Handheld camera, framing, and motion, capturing clean video."
        }
      ]
    },
    {
      id: "produce",
      site: "media",
      number: "02",
      name: "Produce",
      status: "active",
      blurb: "Edit, mix, and shape what you captured into a finished piece.",
      placeholderNote: "New Produce modules will land on this line.",
      modules: [
        {
          course: "Lofi Beat",
          title: "Intro to DAWs",
          icon: "waveform",
          description: "Introduction to digital audio workstations, recording, arranging, and mixing a lofi beat.",
          deckUrl: "Design/Intro to DAW's/decks/01-pentatonic-keyboard/deck.html"
        },
        {
          course: "Travel Montage",
          title: "Intro to Video Editing",
          icon: "monitor",
          description: "Cut, assemble, and finish a short travel montage, trims, transitions, and pacing."
        },
        {
          course: "Portrait Retouch",
          title: "Intro to Photo Editing",
          icon: "image",
          description: "Retouch, grade, and composite a portrait, exposure, color, and cleanup."
        },
        {
          course: "Bob Ross Landscape",
          title: "Intro to Digital Illustration",
          icon: "pen",
          description: "Paint a Bob Ross-style landscape, brushes, layers, and digital painting."
        },
        {
          course: "Ispy Page",
          title: "Intro to 3D Rendering",
          icon: "cube",
          description: "Model, light, and render a 3D scene, from first blockout to a finished rendered page."
        },
        {
          course: "Bouncing Ball",
          title: "Intro to 2D Animation",
          icon: "pen",
          description: "Animate a bouncing ball, timing, spacing, and the core principles of 2D animation."
        },
        {
          course: "Animated Logo",
          title: "Intro to 3D Animation",
          icon: "cube",
          description: "Model, rig, and animate a short logo reveal, keyframes, motion, and a rendered finish."
        }
      ]
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
      status: "active",
      blurb: "Tools and publishing, get a project live.",
      placeholderNote: "New Launch modules will land on this line.",
      modules: [
        {
          course: "Intro to Version Control",
          title: "Version Control",
          icon: "code",
          description: "Track changes and collaborate, commits, branches, and merges."
        },
        {
          course: "Intro to the Command Line",
          title: "Command Line Interface",
          icon: "monitor",
          description: "Navigate, build, and script from a terminal, the interface under every tool."
        },
        {
          course: "Intro to Python",
          title: "Hello Python",
          icon: "code",
          description: "Getting started with Python, variables, outputs, and first programs.",
          deckUrl: "Design/Intro to Python/decks/01-hello-python/deck.html"
        },
        {
          course: "Intro to Agentic Coding",
          title: "Agentic Coding",
          icon: "code",
          description: "Direct coding agents to write, test, and review software alongside you."
        },
        {
          course: "Blink an LED",
          title: "Intro to Microprocessors",
          icon: "code",
          description: "Get a microprocessor running, clock, registers, and a first blink-an-LED program."
        },
        {
          course: "Containerized Web App",
          title: "Intro to Containerization",
          icon: "monitor",
          description: "Package and run apps in containers, images, builds, and a containerized web app."
        }
      ]
    },
    {
      id: "develop",
      site: "dev",
      number: "02",
      name: "Develop",
      status: "active",
      blurb: "Code, iterate, and build software projects that work.",
      placeholderNote: "New Develop modules will land on this line.",
      modules: [
        {
          course: "Intro to Game Development",
          title: "Game Development",
          icon: "cube",
          description: "Build a playable game, loop, input, collision, and a finished build."
        },
        {
          course: "Intro to Web Development",
          title: "Web Development",
          icon: "monitor",
          description: "From HTML to a deployed site, structure, style, and behavior in the browser."
        },
        {
          course: "Intro to App Development",
          title: "App Development",
          icon: "code",
          description: "Design, build, and package a native app from first screen to store-ready."
        },
        {
          course: "Intro to XR Development",
          title: "XR Development",
          icon: "cube",
          description: "Design and build for extended reality, VR, AR, and spatial interfaces."
        },
        {
          course: "Turtlebot Drive",
          title: "Intro to Robotics",
          icon: "cube",
          description: "Robotics fundamentals with ROS 2, nodes, topics, and driving a simulated robot."
        },
        {
          course: "Robot Arm Pick & Place",
          title: "Intro to Robotics Simulation",
          icon: "cube",
          description: "Simulate robots in a physics engine, scene setup, sensors, and a pick-and-place task."
        },
        {
          course: "Landing Page Redesign",
          title: "Intro to UI/UX Design",
          icon: "pen",
          description: "Design interfaces in a collaborative tool, wireframes, components, and a polished landing page."
        }
      ]
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
  ]
};
