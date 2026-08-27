# Sponsor Ad Component

An AdButler ad placement that behaves on small screens. It scales a fixed-size
creative down to fit the available width instead of cropping it, reserves the
exact height the scaled ad will occupy, and can request a different AdButler
zone below a breakpoint so phones get a real mobile creative.

## Files

| File | What it is |
|------|-----------|
| `index.html` | **Preset A**, in-content leaderboard. Paste into the in-content shared module. |
| `sidebar-rail.html` | **Preset B**, sidebar rail. Paste into the rail shared module. |
| `preview.html` | Standalone preview with AdButler stubbed out. Not for production. |
| `creative.svg` | Placeholder creative used by the preview only. |

The two module files are byte-identical below the root element &mdash; same
styles, same script. Only the root's `data-slots` and `data-basis` differ. Both
can appear on the same page any number of times.

## Component Details

- **Component Name**: Sponsor Ad
- **Namespace**: `vpm-sponsor-ad-`
- **Root ID**: none by design &mdash; see *Multiple blocks on one page*

## The problem this solves

The previous markup wrapped a 970&times;250 placement in
`overflow: hidden`. Measured in Chromium at a 375px viewport:

| | Before | After |
|---|---|---|
| Creative width rendered | 970px | 375px |
| Portion of the ad visible | **36.6%** (left third only) | 100% |
| Vertical space consumed | 294px | 117px |
| Space reserved before the ad loads | none (content jumps) | exact final height |

`overflow: hidden` prevented a horizontal scrollbar, but it did so by silently
cropping roughly two thirds of every banner — including, in most creatives, the
call-to-action button on the right.

## Features

- 📐 Proportional scale-to-fit, never upscaled past 1:1
- 📱 Size ladder &mdash; a different AdButler zone and creative size per width band
- 🙈 A width band can render nothing and request nothing, counting no impression
- 🚫 Zero layout shift &mdash; reserved height always matches rendered height
- 🧹 Collapses to zero height when a placement goes unfilled
- 🔁 Safe to use more than once on a page (generates unique placement ids)
- 🏷️ Built-in sponsor disclosure label
- 🎨 Dark theme support

## Required CSS Classes

From `shared/styles.css`:

- `.vpm-sponsor-ad` &mdash; root block, holds the sizing custom properties
- `.vpm-sponsor-ad__label` &mdash; disclosure label
- `.vpm-sponsor-ad__frame` &mdash; reserves layout space at the scaled height
- `.vpm-sponsor-ad__stage` &mdash; native-size box that gets transform-scaled
- `.vpm-sponsor-ad--empty` &mdash; applied when the placement goes unfilled

`index.html` also carries an inline copy of these rules so it works when pasted
into a page that does not load `shared/styles.css`. Delete that `<style>`
element if the shared stylesheet is present.

## Configuration Options

### Data Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-publisher` | number | (required) | AdButler account id |
| `data-slots` | JSON | (none) | Size ladder. Array of `{ minWidth, zone, size }` tiers &mdash; see below |
| `data-basis` | string | `container` | `container` or `viewport` &mdash; what tier `minWidth`s are measured against |
| `data-label` | string | `Sponsored` | Disclosure text. Set to `""` to hide |
| `data-theme` | string | `light` | `light` or `dark` (affects the label only) |

Two-tier shorthand, used only when `data-slots` is absent:

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-zone` | number | (required) | Zone id for the default creative |
| `data-size` | string | `970x250` | Native size of that creative, `WIDTHxHEIGHT` |
| `data-mobile-zone` | number | (empty) | Zone id to request at/below the breakpoint. Empty = scale the desktop creative down |
| `data-mobile-size` | string | `300x250` | Native size of the mobile creative |
| `data-mobile-max` | number | `767` | Breakpoint in px. Widths &le; this use the mobile slot |

### The size ladder

`data-slots` takes a JSON array of tiers. Each tier names a minimum width, the
AdButler zone to request there, and that zone's native creative size. The
**widest tier whose `minWidth` fits the available width wins**, so list one
tier per creative size you have trafficked:

```html
<div class="vpm-sponsor-ad"
     data-publisher="171178"
     data-slots='[
       {"minWidth": 768, "zone": 1063080, "size": "970x250"},
       {"minWidth": 0,   "zone": 293911,  "size": "300x250"}
     ]'
     data-label="Sponsored">
  <div class="vpm-sponsor-ad__frame"><div class="vpm-sponsor-ad__stage"></div></div>
</div>
```

Tiers do not need to cover every width. Anything that falls between a tier's
`minWidth` and the next tier up is served that tier's creative and scaled to
fit, so a three-tier ladder covers every screen. A width narrower than every
tier's `minWidth` gets the smallest tier, scaled.

Order does not matter &mdash; tiers are sorted widest-first internally. A tier
missing `zone` or `size` is skipped with a console warning; malformed JSON
falls back to the `data-zone` shorthand rather than failing to render.

### Hiding a band entirely

A tier of the form `{ "minWidth": 0, "hide": true }` renders nothing in that
band **and requests no ad**, so no impression is counted for a unit the reader
never sees. Use it where a size has no sensible small-screen equivalent &mdash;
a 300&times;600 half page, for instance, is nearly a whole phone screen tall.

### container vs. viewport breakpoints

By default `minWidth` is compared against the **ad's own container**, which is
right for a full-width in-content slot and handles a constrained column
correctly.

A sidebar rail needs `data-basis="viewport"` instead. Its container is ~300px
on desktop, but once the sidebar stacks on mobile that container is often
*wider* than 300px &mdash; so container width cannot tell "300px desktop rail"
apart from "360px stacked-on-a-phone rail", and a container-based ladder will
happily serve a 300&times;600 half page to a phone. Measuring the viewport
resolves it.

Rule of thumb: **in-content placements use `container`, rail placements use
`viewport`.**

## Presets

VPM has three zones trafficked on publisher `171178`:

| Zone | Size | Role |
|------|------|------|
| 1063080 | 970&times;250 | Leaderboard |
| 293911 | 300&times;250 | Medium rectangle |
| 1063081 | 300&times;600 | Half page |

These are **two separate placements**, not one ladder. The half page is a rail
unit; it is not another size of the leaderboard.

### Preset A &mdash; in-content leaderboard

The configuration shipped in `index.html`. Paste as-is.

```html
<div class="vpm-sponsor-ad"
     data-publisher="171178"
     data-slots='[{"minWidth":768,"zone":1063080,"size":"970x250"},
                  {"minWidth":0,"zone":293911,"size":"300x250"}]'
     data-label="Sponsored">
  <div class="vpm-sponsor-ad__frame"><div class="vpm-sponsor-ad__stage"></div></div>
</div>
```

| Width | Zone | Rendered |
|-------|------|----------|
| &ge; 970px | 1063080 | 970&times;250 at 1:1 |
| 768&ndash;969px | 1063080 | 970&times;250 scaled 0.79&ndash;1.0 |
| &lt; 768px | 293911 | 300&times;250 at 1:1 |

The 768px cut is deliberate. Between 768 and 970 the leaderboard only scales to
0.79, which stays readable and fills the column; dropping a 300&times;250 into
a 900px-wide slot would leave two thirds of the row empty.

### Preset B &mdash; sidebar rail / half page

```html
<div class="vpm-sponsor-ad"
     data-publisher="171178"
     data-basis="viewport"
     data-slots='[{"minWidth":1024,"zone":1063081,"size":"300x600"},
                  {"minWidth":0,"zone":293911,"size":"300x250"}]'
     data-label="Advertisement">
  <div class="vpm-sponsor-ad__frame"><div class="vpm-sponsor-ad__stage"></div></div>
</div>
```

| Viewport | Zone | Rendered |
|----------|------|----------|
| &ge; 1024px | 1063081 | 300&times;600 at 1:1 (scaled if the rail is narrower) |
| &lt; 1024px | 293911 | 300&times;250 at 1:1 |

Note `data-basis="viewport"` &mdash; see above for why the rail cannot use
container width.

**If both presets are on the same page, a phone requests zone 293911 twice**
&mdash; once for the in-content slot, once for the rail. Both are legitimate
placements and AdButler fills them independently, but with rotation-on-load
there is nothing stopping the same creative landing in both slots at once,
stacked down one article. Worth asking AdButler whether the zone can be set to
avoid repeating a creative within a page, or trafficking a second 300&times;250
zone for the rail. To sidestep it entirely, swap the rail's bottom tier for a
hide tier:

```json
{"minWidth": 0, "hide": true}
```

### Multiple blocks on one page

Unlike the other components in this library, the root element carries **no
`id`**. The script scopes itself by class and generates unique placement ids
per instance, so the same block can be embedded as a shared module that lands
on a page more than once without producing duplicate ids.

Duplicating the whole block &mdash; markup, `<style>` and `<script>` together
&mdash; is safe. Re-running the script is a no-op on already-initialised roots
(`data-initialized`), the AdButler library is loaded once per page
(`script[data-vpm-adbutler]`), and each instance registers exactly one
placement. Verified with the block pasted one, two and three times on a page:
one register call per instance, unique placement ids, no console errors.

Also verified on a realistic layout &mdash; two in-content modules in an
article column plus a rail module &mdash; at 1280px, 1023px and 390px: correct
zone per placement, three register calls, three unique placement ids, no
duplicate ids, no overflow, no console errors.

Each pasted block carries its own copy of the `<style>` element (~1.5KB). That
is harmless, since the rules are identical, but if `shared/styles.css` is
loaded site-wide you can delete the `<style>` element from both modules and
drop the duplication entirely.

## How it works

The stage is always exactly the creative's native pixel size, so AdButler's
iframe renders at the dimensions it expects. The stage is then
`transform: scale()`d to fit whatever width is available, and the frame's
height is `native height × scale`, so the reserved space always matches what is
drawn. A `ResizeObserver` recomputes the scale on layout changes; there is no
re-registration, so the ad is never reloaded and impressions are not
double-counted.

The stage also sets `max-width: none` on descendant images and iframes. Most
WordPress themes ship a global `img { max-width: 100%; height: auto }`, which
would squash the creative *before* it gets scaled and distort its aspect ratio.

### Which slot is chosen

The slot is picked once, on first layout, from the container width. It is
deliberately **not** re-evaluated on resize: swapping zones mid-session would
reload the ad and register a second impression. A phone rotated to landscape
keeps its original slot and simply rescales. If the container is `display: none`
at init and measures zero, the viewport width is used instead, so a hidden
container does not fall through to the smallest tier.

## Choosing sizes

Scaling keeps the whole creative visible, but a 970&times;250 leaderboard at
360px renders at ~37%, so 11px legal copy lands near 4px. It is legible-ish for
a logo-and-headline banner and useless for anything dense. Serving a creative
built for the width is always better than shrinking one that was not.

On the mobile tier, the horizontal-vs-square choice depends on placement:

- **300&times;250 (square-ish)** for in-article and mid-content slots &mdash;
  what zone 293911 already is. Most widely trafficked mobile size, holds real
  creative, earns its space. The right default here.
- **320&times;50 (horizontal)** for headers, footers, and anything sticky,
  where a 250px-tall block would eat the viewport. Much less room for a
  message, so use it only where the space genuinely is not available.
- **300&times;600 (half page)** has no good phone equivalent. At 600px tall it
  is nearly a full viewport. Fall back to 300&times;250, or hide it.

If a 728&times;90 zone is ever trafficked, insert it as a middle tier in
Preset A and the band above it narrows automatically:

```json
{"minWidth": 728, "zone": 0000000, "size": "728x90"}
```

Any tier you do not have a zone for can simply be left out; the tier below it
is scaled to cover that band.

## Changes from the previous inline snippet

Beyond the responsive work, three things were fixed:

1. **`click: 'CLICK_MACRO_PLACEHOLDER'`** was being sent to AdButler as a real
   click macro. It is removed. Only add a `click` key if AdButler has given you
   an actual macro value for the context you are serving in.
2. **The placement div id was hardcoded** to `placement_1063080_0` while
   `opt.place` incremented. A second copy of the block on one page registered
   against `placement_1063080_1`, which did not exist, so the second ad silently
   never rendered. The div is now created by the script with a matching id.
3. **The 5-second polling loop** could give up and never register if
   `app.js` was slow. Registration now pushes to the `AdButler.ads` queue, which
   the library drains whenever it finishes loading, with no deadline.

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ IE11 &mdash; no CSS custom properties; the ad renders at native size and
  crops as before. Falls back rather than breaking.

Uses `ResizeObserver` where available and falls back to `resize` /
`orientationchange` listeners.

## Accessibility (A11y)

- ✅ Visible "Sponsored" disclosure above the placement
- ✅ No layout shift after load
- ✅ Scaling is a visual transform &mdash; click targets and any text inside the
  creative stay intact for screen readers and keyboard users
- ⚠️ Creative content itself (alt text, contrast, motion) is controlled by the
  advertiser, not by this component

## Dependencies

- **Required**: AdButler `app.js` (loaded automatically, once per page)
- **Optional**: `shared/styles.css` (styles are inlined in `index.html`)

## Notes

- Unfilled placements collapse after 6 seconds (`EMPTY_TIMEOUT_MS`). If a
  creative arrives later, a `MutationObserver` restores the space.
- **The collapse is latched to the first fill.** VPM's zones rotate on load and
  over time, and a rotation can briefly empty the placement between creatives.
  Without the latch that transient empty state would collapse the block to zero
  and immediately re-expand it, jumping the page content on every rotation. Once
  a creative has rendered, the reserved space is held for the life of the page.
- Rotation itself needs no handling here: each zone is a fixed size, so
  swapping creatives within a zone does not change the scale. The slot is
  picked once and never re-registered, so the component never triggers an
  extra ad request of its own &mdash; refresh cadence and any idle cap stay
  entirely AdButler-side.
- AdButler sometimes injects an empty iframe for an unfilled placement. That
  counts as "filled" here, because the iframe is cross-origin and cannot be
  inspected. In that case the block keeps its reserved height.
- `preview.html` stubs AdButler with a fake creative so the scaling can be
  inspected without serving live ads.
