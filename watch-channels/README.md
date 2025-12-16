# Watch Channels Component

A Shadow DOM component that displays a header section with channel tiles for watching VPM content. Uses Shadow DOM for complete style encapsulation.

## Component Details

- **Component Name**: Watch Channels
- **Namespace**: `vpm-watch-channels-` (internal Shadow DOM classes use `watch-page-`)
- **Root ID**: `vpm-watch-channels-root`
- **Architecture**: Shadow DOM (encapsulated styles)

## Features

- 🎭 Shadow DOM encapsulation (styles isolated from page)
- 📺 Channel tiles with live badges
- 📱 Fully responsive grid layout
- 🎨 Gradient background with VPM brand colors
- ♿ Accessible (ARIA labels, keyboard navigation)
- ⚡ Lazy loading images
- 🔧 Configurable via data attributes

## Shadow DOM Architecture

This component uses Shadow DOM to completely encapsulate its styles. This means:
- Styles won't conflict with page styles
- Page styles won't affect the component
- CSS variables from the host document are accessible
- Component is fully self-contained

## Configuration Options

### Data Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-tiles` | JSON string | (built-in defaults) | JSON array of tile objects |

### Tile Object Structure

```javascript
{
  href: "https://example.com",
  ariaLabel: "Accessible label",
  img: "https://example.com/image.jpg",
  alt: "Image alt text"
}
```

### Default Tiles

The component includes 4 default tiles:
1. Watch VPM at PBS.org
2. Browse all PBS livestream channels
3. PBS Kids - Live Stream
4. VPM on YouTube Live

## Usage Example

### Basic Usage (Default Tiles)

```html
<div id="vpm-watch-channels-root" data-component="watch-channels"></div>

<script>
(function() {
  'use strict';
  
  var root = document.getElementById('vpm-watch-channels-root');
  if (!root || root.dataset.initialized === 'true') return;
  root.dataset.initialized = 'true';
  
  // Default tiles are used automatically
  // ... (see index.html for full code)
})();
</script>
```

### Custom Tiles

```html
<div id="vpm-watch-channels-root" 
     data-component="watch-channels"
     data-tiles='[{"href":"https://example.com","ariaLabel":"Example Channel","img":"https://example.com/img.jpg","alt":"Example"}]'>
</div>
```

## Customization

### Changing Colors

The component reads CSS variables from the host document:
- `--vpm-color-navy-blue` - Used for gradient background
- `--vpm-color-red` - Used for LIVE badge

To customize, set these variables in your page CSS:

```css
:root {
  --vpm-color-navy-blue: #003865;
  --vpm-color-red: #EE2737;
}
```

### Modifying Default Tiles

Edit the `defaultTiles` array in the JavaScript:

```javascript
var defaultTiles = [
  {
    href: "https://your-link.com",
    ariaLabel: "Your Channel",
    img: "https://your-image.jpg",
    alt: "Your Alt Text"
  }
];
```

### Changing Header Text

The header text "Watch VPM" is hardcoded in the Shadow DOM template. To change it, modify the HTML in the `shadow.innerHTML` assignment.

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ IE11 - Shadow DOM not supported

## Accessibility (A11y)

- ✅ Semantic HTML5 (`<h1>`, role="list", role="listitem")
- ✅ ARIA labels on all links
- ✅ Keyboard navigation support
- ✅ Focus indicators (outline on focus)
- ✅ Alt text for images
- ✅ Screen reader friendly
- ✅ `rel="noopener"` on external links

## Dependencies

- **Required**: None (fully self-contained)
- **Optional**: CSS variables from host document for theming

## Notes

- The component automatically prevents double-initialization
- Shadow DOM provides complete style isolation
- CSS variables from host document are accessible via `getComputedStyle()`
- All external links open in new tabs with `target="_blank"` and `rel="noopener"`
- Images use lazy loading for performance
- Grid automatically adjusts based on available space

## Shadow DOM Considerations

**Advantages:**
- Complete style encapsulation
- No style conflicts with page
- Self-contained component

**Limitations:**
- Cannot be styled from outside (by design)
- CSS variables must be read via JavaScript
- Some older browsers don't support Shadow DOM

**Best Practices:**
- Use CSS variables for theming
- Keep component self-contained
- Document required CSS variables

