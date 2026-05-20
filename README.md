# Maker Bootcamp Curriculum

An open-source, remixable curriculum for teaching maker fundamentals using Autodesk Fusion.

**License**: [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE)

---

## Project Structure

```
maker_bootcamp/
├── curriculum.yaml              ← Master curriculum index
├── module.yaml                  ← This module's metadata (title, duration, license)
├── deck.md                      ← Marp presentation: all slides + content
├── theme/
│   └── maker-bootcamp.css       ← ALL slide design (colors, layout, highlights)
└── images/
    ├── 0/                       ← Module 0: preliminary/pre-req assets
    └── 1/                       ← Module 1: setup assets
        ├── 1.0.0.png
        ├── 1.1.0.png
        ├── 1.1.1.png
        └── 1.2.0.png
```

---

## Image Naming Convention

Images use a three-part numeric scheme: **`{module}.{step}.{image_index}.png`**

| Part | Meaning |
|---|---|
| `module` | Module number. `0` = preliminary info. `1`, `2`, `3`... = project steps |
| `step` | Step within the module. `0` = section divider slide. `1`+ = numbered steps |
| `image_index` | 0-based image index on that slide. `0` = main screenshot, `1` = callout, etc. |

**Examples:**

| Filename | Meaning |
|---|---|
| `images/1/1.0.0.png` | Module 1 section divider — background image |
| `images/1/1.1.0.png` | Module 1, step 1 — main screenshot |
| `images/1/1.1.1.png` | Module 1, step 1 — callout image |
| `images/1/1.2.0.png` | Module 1, step 2 — main screenshot |

Images live in **`images/{module}/`** subfolders mirroring the module structure.

---

## The Three Edit Targets

| What you're changing | File to edit |
|---|---|
| Slide text, headings, callout copy, insight text, image refs | `modules/{N}-{slug}/deck.md` |
| Colors, layout, highlight boxes, callout sizing, fonts | `theme/maker-bootcamp.css` |
| A screenshot or image | Drop replacement into `images/{N}/` with the **same filename** |

## File Roles

| File | Role | Update when |
|---|---|---|
| `curriculum.yaml` | Top-level index of all modules | Adding/removing a module |
| `theme/maker-bootcamp.css` | All slide design and layout | Changing look, colors, or layout |
| `modules/{N}-{slug}/deck.md` | All slide content — one `---` slide per step | Changing any slide content |
| `modules/{N}-{slug}/module.yaml` | Module metadata only (title, duration, license) | Module title/duration changes |

---

## Authoring Workflow

1. **Edit `deck.md`** to change slide content — Marp preview updates live in VS Code.
2. **Edit `theme/maker-bootcamp.css`** to change design — one file affects all slides.
3. **Replace an image** by dropping a new file into `images/{N}/` with the same numeric filename.
4. **Update `curriculum.yaml`** when adding or removing a module.

---

## Adding a New Module

1. Create `modules/{N}-{slug}/` (e.g. `modules/2-sketching/`)
2. Add `module.yaml` and `deck.md` inside it (copy from an existing module as a template)
3. Create `images/{N}/` for that module's assets
4. Add the module entry to `curriculum.yaml`
5. Name all images as `{N}.{step}.{image_index}.png`

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) before submitting changes.
