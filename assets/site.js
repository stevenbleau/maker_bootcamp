/* ═══════════════════════════════════════════════════════════════════════════
   MAKER BOOTCAMP — LANDING PAGE RENDERER
   ─────────────────────────────────────────────────────────────────────────────
   Renders everything data-driven from window.MB_DATA (modules.js):
     • the "How it works" step colors (track order)
     • each track banner, route row, module card, and placeholder
   No framework, no fetch — works on GitHub Pages and from file://.
   Edit content in modules.js; edit styling in assets/site.css.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const DATA = window.MB_DATA;
  if (!DATA || !Array.isArray(DATA.tracks)) return;

  // ── Inline line icons (stroke 1.8, round caps) ─────────────────────────────
  const ICONS = {
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.1 15.9"/><path d="M14.5 14.5L20 20"/><path d="M8.1 8.1L12 12"/>',
    cube: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M12 12l8-4.5"/><path d="M12 12v9"/><path d="M12 12L4 7.5"/>',
    pen: '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.6 7.6"/><circle cx="11" cy="11" r="2"/>',
    code: '<path d="M8 6l-6 6 6 6"/><path d="M16 6l6 6-6 6"/><path d="M14 4l-4 16"/>',
    waveform: '<path d="M3 12h2"/><path d="M7 8v8"/><path d="M11 4v16"/><path d="M15 7v10"/><path d="M19 10v4"/>',
    construction: '<path d="M2 20h20"/><path d="M5 20l3-12h8l3 12"/><path d="M9.5 12h5"/><path d="M8.5 16h7"/>'
  };
  const icon = (name, size) => {
    const s = size || 24;
    const paths = ICONS[name] || ICONS.cube;
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>';
  };
  const arrow = (s) => '<svg width="' + (s || 16) + '" height="' + (s || 16) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="M13 6l6 6-6 6"></path></svg>';
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ── How it works — number circles cycle the track colors ──────────────────
  function renderSteps() {
    const el = document.getElementById('mb-steps');
    if (!el) return;
    const steps = ['Choose a track', 'Open a module deck', 'Make the thing, then take the next stop'];
    el.innerHTML = steps.map((label, i) => {
      const t = DATA.tracks[i % DATA.tracks.length];
      return '<div class="mb-step">' +
        '<span class="mb-step-num" style="background: var(--' + esc(t.id) + '); color: var(--on-' + esc(t.id) + ')">' + (i + 1) + '</span>' +
        '<span>' + esc(label) + '</span></div>';
    }).join('');
  }

  // ── Track sections: banner + route row + cards/placeholders ────────────────
  // ── Card media slot ────────────────────────────────────────────────────────
  // Cards with an `image` get a full-bleed picture; cards without get a tinted
  // placeholder with the module icon, so every card's text block starts at the
  // same height. A missing/broken image falls back to the same placeholder
  // (MB_IMG_FALLBACK is called from the img's inline onerror).
  const mediaSlot = (m) => m.image
    ? '<img class="mb-card-img" src="' + esc(m.image) + '" alt="" loading="lazy" ' +
      'data-icon="' + esc(m.icon) + '" onerror="window.MB_IMG_FALLBACK(this)">'
    : placeholderSlot(m.icon);
  function placeholderSlot(iconName) {
    return '<div class="mb-card-ph">' +
      '<span class="mb-card-icon mb-card-icon--ph">' + icon(iconName) + '</span></div>';
  }
  window.MB_IMG_FALLBACK = function (img) {
    img.outerHTML = placeholderSlot(img.dataset.icon);
  };

  function cardHTML(m, t, num) {
    return '<div class="mb-stop-col">' +
      '<div class="mb-stop-row"><span class="mb-stop-marker">' + num + '</span><span class="mb-stop-line"></span></div>' +
      '<article class="mb-card">' +
        mediaSlot(m) +
        '<div><span class="mb-card-eyebrow">' + esc(m.course) + '</span>' +
        '<h3>' + esc(m.title) + '</h3></div>' +
        '<p>' + esc(m.description) + '</p>' +
        '<a class="mb-deck-btn" href="' + esc(m.deckUrl) + '" target="_blank" rel="noopener" ' +
          'aria-label="Open deck: ' + esc(m.title) + ' (opens in a new tab)">Open deck ' + arrow() + '</a>' +
      '</article></div>';
  }

  function renderTracks() {
    const el = document.getElementById('mb-tracks');
    if (!el) return;
    el.innerHTML = DATA.tracks.map((t) => {
      const n = t.modules.length;
      let route;
      if (t.status !== 'construction' && n > 0) {
        const cols = t.modules.map((m, i) => {
          const html = cardHTML(m, t, i + 1);
          const isFinalRowEnd = n >= 4 && i === n - 1;
          return html.replace('class="mb-stop-col"', 'class="mb-stop-col' + (isFinalRowEnd ? ' is-final' : '') + '"');
        }).join('');
        const placeholder = n < 4
          ? '<div class="mb-stop-col mb-stop-col--placeholder">' +
              '<div class="mb-dotted"></div>' +
              '<div class="mb-dash-box">' +
                '<span class="mb-dash-title">More stops being built</span>' +
                '<span class="mb-dash-note">' + esc(t.placeholderNote || 'New ' + t.name + ' modules will land on this line.') + '</span>' +
              '</div></div>'
          : '';
        route = '<div class="mb-stops">' + cols + placeholder + '</div>';
      } else {
        route = '<div class="mb-construction">' +
          '<div class="mb-dotted"></div>' +
          '<div class="mb-dash-box">' +
            '<span class="mb-construction-icon">' + icon('construction', 26) + '</span>' +
            '<span style="display:flex;flex-direction:column;gap:4px">' +
              '<span class="mb-dash-title">Track under construction</span>' +
              '<span class="mb-dash-note">Decks for this track are in progress. Finish Make and Design to be ready when it opens.</span>' +
            '</span></div></div>';
      }
      return '<section id="' + esc(t.id) + '" class="mb-track" aria-labelledby="' + esc(t.id) + '-title" ' +
        'style="--track: var(--' + esc(t.id) + '); --on-track: var(--on-' + esc(t.id) + ')">' +
        '<div class="mb-banner">' +
          '<div><span class="mb-banner-kicker">Track ' + esc(t.number) + '</span>' +
          '<h2 id="' + esc(t.id) + '-title">' + esc(t.name) + '</h2></div>' +
          '<p class="mb-banner-blurb">' + esc(t.blurb) + '</p>' +
        '</div>' + route + '</section>';
    }).join('');
  }

  renderSteps();
  renderTracks();
})();
