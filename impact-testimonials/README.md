# Impact Testimonials Component

A dual carousel component featuring video testimonials and quote testimonials side-by-side. Includes auto-advance, touch/swipe support, and hover pause functionality.

## Component Details

- **Component Name**: Impact Testimonials
- **Namespace**: `vpm-impact-testimonials-`
- **Root ID**: `vpm-impact-testimonials-root`

## Features

- 🎥 Video carousel with Vimeo embeds
- 💬 Quote carousel with image testimonials
- ⏯️ Auto-advance with hover pause
- 📱 Touch/swipe support for mobile
- 🎨 Smooth transitions and animations
- ♿ Fully accessible (keyboard navigation, ARIA labels)
- 🎯 Navigation dots and arrow buttons

## Required CSS Classes

This component uses classes from `shared/styles.css` with the `vpm-impact-testimonials-` prefix. See the stylesheet for complete class list.

## Configuration

### Video Data

Edit the `videoData` array in the JavaScript:

```javascript
var videoData = [
  { 
    title: "Name", 
    subtitle: "Description",
    iframeSrc: "https://player.vimeo.com/video/ID"
  }
];
```

### Quote Data

Edit the `quoteData` array in the JavaScript:

```javascript
var quoteData = [
  { 
    title: "Name", 
    subtitle: "Quote text",
    imageSrc: "https://example.com/image.jpg",
    alt: "Alt text"
  }
];
```

## Usage Example

```html
<div id="vpm-impact-testimonials-root">
  <!-- Component HTML -->
</div>

<!-- Required: Vimeo Player API -->
<script src="https://player.vimeo.com/api/player.js"></script>

<script>
  <!-- Component JavaScript (included in index.html) -->
</script>
```

## Dependencies

- **Required**: `shared/styles.css` must be loaded
- **Required**: Vimeo Player API script: `<script src="https://player.vimeo.com/video/ID"></script>`
- **Optional**: None

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ IE11 - May require polyfills for some features

## Accessibility (A11y)

- ✅ Semantic HTML5
- ✅ ARIA labels on all interactive elements
- ✅ Keyboard navigation (arrow buttons, Enter/Space on quote items)
- ✅ Focus indicators
- ✅ Screen reader friendly
- ✅ Touch/swipe support for mobile

## Customization

### Auto-Advance Timing

Modify the interval timing in the JavaScript:

```javascript
videoInterval = setInterval(nextVideo, 8000); // 8 seconds
quoteInterval = setInterval(nextQuote, 7000); // 7 seconds
```

### Disable Auto-Advance

Remove or comment out the auto-advance start calls:

```javascript
// startVideoAutoAdvance();
// startQuoteAutoAdvance();
```

## Notes

- Component automatically prevents double-initialization
- Videos pause auto-advance on hover
- Touch/swipe gestures work on mobile devices
- Navigation dots update automatically
- Current item info displays below each carousel

