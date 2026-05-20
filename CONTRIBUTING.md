# Contributing to Maker Bootcamp

Thanks for contributing! Please read this before submitting changes.

---

## Authoring Workflow

1. **Change slide content** → edit `deck.md` directly. The VS Code Marp extension previews live.
2. **Change design** → edit `theme/maker-bootcamp.css`. One file, affects all slides.
3. **Replace an image** → drop the new file into `images/{N}/` using the **same numeric filename**. Nothing else needs to change.
4. **Add a new slide** → add the image(s) to `images/{N}/` with the next numeric name, then add the slide block to `deck.md`.

---

## Image Naming Rules

Images use: **`{module}.{step}.{image_index}.png`**

- Place images in `images/{module}/` (e.g. `images/1/`)
- `step 0` = section divider slide background
- `image_index` is 0-based: `0` = main shot, `1` = callout, and so on
- Use `.png` for screenshots; `.svg` is acceptable for diagrams

**Example sequence for a new step 3 in module 1:**

```
images/1/1.3.0.png   ← main screenshot
images/1/1.3.1.png   ← callout image (if needed)
```

---

## Screenshot and Camera Image Conventions

- Main screenshots should capture the full application window, not a cropped detail view.
- Prefer 16:10 or 16:9 aspect ratios for main screenshots so they fit the slide layout cleanly.
- Use screenshots for on-screen UI states, buttons, menus, dialogs, and software interaction.
- Use camera images only for real-world objects, machines, parts, tools, or physical controls.
- Keep camera images on a plain or neutral background whenever possible.
- For 3D parts or objects, favor orthographic or view-cube-style orientations such as top, front, left, right, or an isometric angle like top-right-front at about 45 degrees.
- Avoid dramatic perspective in camera images unless the angle is part of the instruction.
- Keep camera-image filenames and screenshot filenames clearly distinct so they are never confused in the deck.

---

## Per-slide highlight position

The highlight box position and size are set **directly on each slide** in `deck.md` via a `<style scoped>` block. Marp scopes it to just that slide.

```html
<style scoped>
  .screenshot-row {
    --highlight-x: 10%;     /* left edge, % from left of screenshot */
    --highlight-y: 20%;     /* top edge, % from top of screenshot */
    --highlight-w: 8%;      /* width of the box */
    --highlight-h: 4%;      /* height of the box */
    --highlight-color: #ffb703;
  }
</style>
```

To change the highlight **appearance** (border thickness, glow, corner radius) for all slides, edit the `.click-highlight` rule in `theme/maker-bootcamp.css`.

---

## Pull Request Checklist

- [ ] New images follow `{module}.{step}.{image_index}.png` naming and live in `images/{module}/`
- [ ] `curriculum.yaml` updated if a module was added or removed
- [ ] All image paths in `deck.md` resolve correctly (test with Marp preview)
- [ ] `module.yaml` contains only metadata — no slide content
- [ ] Content is beginner-friendly, task-oriented, and uses consistent terminology

---

## Content Guidelines

- Keep lessons task-oriented and beginner-friendly
- Use clear, numbered steps
- Include a brief **Concept Insight** that explains the *why*, not just the *what*
- Keep terminology consistent across modules
