# Sponsor Ad Component

An AdButler ad placement that behaves on small screens. It scales a fixed-size
creative down to fit the available width instead of cropping it, reserves the
exact height the scaled ad will occupy, and can request a different AdButler
zone below a breakpoint so phones get a real mobile creative.

## Component Details

- **Component Name**: Sponsor Ad
- **Namespace**: `vpm-sponsor-ad-`
- **Root ID**: `vpm-sponsor-ad-root`

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
- 📱 Optional separate AdButler zone for mobile widths
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
| `data-zone` | number | (required) | Zone id for the default creative |
| `data-size` | string | `970x250` | Native size of that creative, `WIDTHxHEIGHT` |
| `data-mobile-zone` | number | (empty) | Zone id to request at/below the breakpoint. Empty = scale the desktop creative down |
| `data-mobile-size` | string | `300x250` | Native size of the mobile creative |
| `data-mobile-max` | number | `767` | Breakpoint in px. Widths &le; this use the mobile slot |
| `data-label` | string | `Sponsored` | Disclosure text. Set to `""` to hide |
| `data-theme` | string | `light` | `light` or `dark` (affects the label only) |

## Usage Example

Paste into an ACF Code Block. See `index.html` for the complete block including
the inline styles and script.

```html
<div id="vpm-sponsor-ad-root"
     class="vpm-sponsor-ad"
     data-publisher="171178"
     data-zone="1063080"
     data-size="970x250"
     data-mobile-zone=""
     data-mobile-size="300x250"
     data-mobile-max="767"
     data-label="Sponsored"
     data-theme="light">
  <div class="vpm-sponsor-ad__frame">
    <div class="vpm-sponsor-ad__stage"></div>
  </div>
</div>
```

The script finds every `.vpm-sponsor-ad` on the page, so the root `id` is
cosmetic. **If you place more than one ad block on a page, remove the `id` from
the extra copies** to keep the markup valid.

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
keeps its original slot and simply rescales.

## Recommended: add a real mobile zone

Scaling keeps the whole creative visible, but a 970&times;250 leaderboard at
360px renders at ~37%, so 11px legal copy lands near 4px. It is legible-ish for
a logo-and-headline banner and useless for anything dense.

The better fix is a dedicated mobile creative. Ask your AdButler rep (or an
account admin) to set up a 300&times;250 or 320&times;50 zone for the same
campaign, then set `data-mobile-zone` to that zone id and `data-mobile-size` to
its dimensions. Everything else keeps working; mobile simply stops getting a
shrunken leaderboard. Until that zone exists, leaving `data-mobile-zone` empty
gives the scaled fallback.

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
- AdButler sometimes injects an empty iframe for an unfilled placement. That
  counts as "filled" here, because the iframe is cross-origin and cannot be
  inspected. In that case the block keeps its reserved height.
- `preview.html` stubs AdButler with a fake creative so the scaling can be
  inspected without serving live ads.
