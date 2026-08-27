# Events

A lifecycle-aware events component. Each event is **one record** that renders two ways:

- **Before the event** — an invitation: date badge, time, location, description, a primary CTA
  (RSVP / tickets / announcement) and an "Add to calendar" button.
- **After the event** — a recap: the same card, now showing a recap headline, body copy, an
  optional video, and a photo gallery with a lightbox.

The switch is automatic. Nothing needs to be re-published, no second post is created, and the
card keeps the same URL and anchor (`#event-<id>`) across its whole life — so a link you shared
in an invitation email still works after the event and lands on the recap.

- **Namespace**: `vpm-events-`
- **Root ID**: `vpm-events-root`
- **Dependencies**: none (vanilla JS)

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Paste-ready component. **Source of truth.** |
| `events.json` | The event data. Edit this to add events or publish recaps. |
| `preview.html` | Standalone preview with inline sample data (works from `file://`). |
| `events-component.js` | Generated from `index.html` for the preview. Run `./extract-js.sh` after editing the script block in `index.html`. |

## Installing on WordPress

1. Add a **Custom HTML** block (or an ACF Code Block) where the events should appear.
2. Paste the contents of `index.html`.
3. Make sure `shared/styles.css` is loaded on the page — either enqueued in the theme, or pasted
   into Appearance → Customize → Additional CSS for a test site.
4. Set `data-events-url` on the root element to wherever `events.json` lives. The raw GitHub URL
   works and sends permissive CORS headers:
   `https://raw.githubusercontent.com/mhayes228/vpm-component-library/main/events/events.json`

Brightspot works the same way — paste `index.html` into a raw-HTML module.

## Configuration (root element attributes)

| Attribute | Values | Default | Notes |
| --- | --- | --- | --- |
| `data-events-url` | URL | — | JSON feed. Ignored if inline data is present. |
| `data-view` | `all`, `upcoming`, `past` | `all` | `upcoming` or `past` renders a single list with no tabs. |
| `data-show-filters` | `true`, `false` | `true` | Tabs only appear when there is at least one event on each side. |
| `data-heading` | text | `Events` | Leave empty to hide the heading. |
| `data-theme` | `light`, `dark` | `light` | |

### Inline data instead of a fetch

Drop a JSON block inside the root and the component uses it instead of fetching — useful for a
one-off page, or when the site cannot reach GitHub:

```html
<script type="application/json" data-vpm-events-data>
  { "events": [ ... ] }
</script>
```

## Data format

```jsonc
{
  "events": [
    {
      "id": "rva-first-fridays-2026-09",   // stable slug; becomes the anchor #event-<id>
      "title": "RVA First Fridays",
      "eyebrow": "Community",              // small label above the title (optional)
      "start": "2026-09-04T17:00:00-04:00",// ISO 8601 WITH offset (-04:00 EDT, -05:00 EST)
      "end":   "2026-09-04T20:00:00-04:00",// drives the flip to recap mode
      "timeLabel": "5–8 p.m.",             // displayed as written, so "2:30 – 8 p.m." stays exact
      "location": "Broad Street, Richmond, VA",
      "status": "auto",                    // "auto" | "upcoming" | "past" — see below
      "description": "Invitation copy.",
      "image": "",                         // optional promo image URL
      "imageAlt": "",
      "cta":          { "label": "Get tickets", "url": "https://..." },
      "secondaryCta": null,

      "recap": {                           // empty until after the event
        "headline": "",
        "body": "",
        "photoCredit": "",
        "photos": [
          { "src": "full.jpg", "thumb": "small.jpg", "alt": "…", "caption": "…" }
        ],
        "video": { "embedUrl": "https://player.vimeo.com/video/…", "title": "…" },
        "cta": { "label": "See the full photo set", "url": "https://…" }
      }
    }
  ]
}
```

### The three states

| State | When | What renders |
| --- | --- | --- |
| `upcoming` | `end` is in the future | Invitation + CTA + add-to-calendar |
| `awaiting-recap` | `end` has passed, `recap` is still empty | The details plus "Photos and a recap are on the way." — it stops inviting people to something that already happened |
| `recap` | `end` has passed and `recap` has a headline, body, photos or video | Recap headline, body, video, photo gallery, credit, CTA |

`status` overrides the clock: set it to `"upcoming"` to keep promoting an event past its end
time, or `"past"` to retire one early. Leave it `"auto"` for normal behavior.

Note that `end` is compared against the **visitor's** clock, so include the timezone offset in
your ISO dates or the flip will happen at the wrong moment for people outside Eastern time.

## Publishing a recap

1. Upload the photos (WordPress media library, or wherever they live).
2. Open `events.json`, find the event that already exists, and fill in its `recap` object.
3. Commit. The card changes over on the next page load — the `raw.githubusercontent.com` CDN
   caches for a few minutes, so allow for that.

Do **not** create a second record for the recap. The whole point is that the invitation and the
recap are the same object.

## Sizing photos

Provide both `src` (full size, shown in the lightbox) and `thumb` (grid tile). Thumbnails render
at roughly 150–300px wide in a 3:2 box, so ~600×400 is plenty; keep full-size images under about
2000px on the long edge. If you only provide `src`, it is used for both.

## Accessibility

- Filter tabs are real buttons with `role="tab"` and `aria-selected`; the list is `aria-live="polite"`.
- Every gallery thumbnail is a `<button>` — keyboard reachable, with a visible focus ring.
- The lightbox is `role="dialog" aria-modal="true"`, moves focus to the close button on open,
  restores focus to the thumbnail on close, and responds to `Escape` and arrow keys.
- Photo `alt` text comes from the data. Fill it in — an empty `alt` is only correct for a purely
  decorative image.
- All animation is disabled under `prefers-reduced-motion`.

## Browser support

Modern evergreen browsers. Uses `fetch`, `Element.closest`, template-free string building,
`Blob`/`URL.createObjectURL` (add-to-calendar) and CSS `aspect-ratio`. Not IE11 compatible.

## Notes

- Links are filtered through a small allowlist (`http`, `https`, `mailto`, `tel`, root-relative,
  anchors) and all text is escaped before insertion, so the JSON feed cannot inject markup.
- External links (anything not on `vpm.org`) open in a new tab with `rel="noopener noreferrer"`.
- The `.ics` file is generated in the browser — no calendar service, no third-party script.
