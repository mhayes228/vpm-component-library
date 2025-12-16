# Testimonial Card Component

A flexible testimonial card component with author information, star rating, and expandable bio section.

## Component Details

- **Component Name**: Testimonial Card
- **Namespace**: `vpm-testimonial-`
- **Root ID**: `vpm-testimonial-root`

## Features

- ⭐ Star rating display (1-5 stars)
- 👤 Author photo, name, and title
- 📝 Expandable author bio (click author to toggle)
- 🎨 Multiple variants: default, compact, featured
- 🌙 Dark theme support
- 📱 Fully responsive
- ♿ Accessible (keyboard navigation, ARIA labels)

## Required CSS Classes

This component uses the following classes from `shared/styles.css`:

- `.vpm-testimonial` - Main container
- `.vpm-testimonial__content` - Content wrapper
- `.vpm-testimonial__quote` - Quote blockquote
- `.vpm-testimonial__text` - Quote text
- `.vpm-testimonial__rating` - Star rating container
- `.vpm-testimonial__star` - Individual star
- `.vpm-testimonial__star--filled` - Filled star modifier
- `.vpm-testimonial__footer` - Footer section
- `.vpm-testimonial__author-trigger` - Clickable author section
- `.vpm-testimonial__photo` - Author photo
- `.vpm-testimonial__author-info` - Author info container
- `.vpm-testimonial__author-name` - Author name
- `.vpm-testimonial__author-title` - Author title
- `.vpm-testimonial__bio` - Expandable bio section
- `.vpm-testimonial__bio--expanded` - Expanded bio modifier
- `.vpm-testimonial__bio-text` - Bio text

## Configuration Options

### Data Attributes

| Attribute | Values | Default | Description |
|-----------|--------|---------|-------------|
| `data-variant` | `"default"`, `"compact"`, `"featured"` | `"default"` | Visual style variant |
| `data-star-rating` | `"1"` through `"5"` | `"0"` | Number of stars to display (1-5) |
| `data-theme` | `"light"`, `"dark"` | `"light"` | Color theme |

### Variant Examples

**Default:**
```html
<div id="vpm-testimonial-root" data-variant="default" data-star-rating="5">
```

**Compact:**
```html
<div id="vpm-testimonial-root" data-variant="compact" data-star-rating="4">
```

**Featured:**
```html
<div id="vpm-testimonial-root" data-variant="featured" data-star-rating="5">
```

**Dark Theme:**
```html
<div id="vpm-testimonial-root" data-theme="dark" data-star-rating="5">
```

## Usage Example

### Basic Usage

```html
<div id="vpm-testimonial-root" data-variant="default" data-star-rating="5" data-theme="light">
  <article class="vpm-testimonial">
    <div class="vpm-testimonial__content">
      <blockquote class="vpm-testimonial__quote">
        <p class="vpm-testimonial__text">This is an amazing service that has transformed how we work.</p>
      </blockquote>
      
      <div class="vpm-testimonial__rating" aria-label="Rating: 5 out of 5 stars">
        <span class="vpm-testimonial__star vpm-testimonial__star--filled" aria-hidden="true">★</span>
        <span class="vpm-testimonial__star vpm-testimonial__star--filled" aria-hidden="true">★</span>
        <span class="vpm-testimonial__star vpm-testimonial__star--filled" aria-hidden="true">★</span>
        <span class="vpm-testimonial__star vpm-testimonial__star--filled" aria-hidden="true">★</span>
        <span class="vpm-testimonial__star vpm-testimonial__star--filled" aria-hidden="true">★</span>
      </div>
    </div>
    
    <footer class="vpm-testimonial__footer">
      <button class="vpm-testimonial__author-trigger" aria-expanded="false" aria-controls="vpm-testimonial-bio">
        <img 
          src="/path/to/photo.jpg" 
          alt="Photo of John Doe" 
          class="vpm-testimonial__photo"
          width="100"
          height="100"
        >
        <div class="vpm-testimonial__author-info">
          <cite class="vpm-testimonial__author-name">John Doe</cite>
          <p class="vpm-testimonial__author-title">Director of Operations</p>
        </div>
      </button>
      
      <div id="vpm-testimonial-bio" class="vpm-testimonial__bio" aria-hidden="true">
        <p class="vpm-testimonial__bio-text">John Doe has over 15 years of experience in operations management.</p>
      </div>
    </footer>
  </article>
</div>

<script>
(function() {
  'use strict';
  
  var root = document.getElementById('vpm-testimonial-root');
  if (!root || root.dataset.initialized === 'true') return;
  root.dataset.initialized = 'true';
  
  var trigger = root.querySelector('.vpm-testimonial__author-trigger');
  var bio = root.querySelector('.vpm-testimonial__bio');
  var rating = root.querySelector('.vpm-testimonial__rating');
  
  if (!trigger || !bio) return;
  
  var starRating = parseInt(root.getAttribute('data-star-rating') || '0', 10);
  if (starRating > 0 && rating) {
    var stars = rating.querySelectorAll('.vpm-testimonial__star');
    stars.forEach(function(star, index) {
      if (index < starRating) {
        star.classList.add('vpm-testimonial__star--filled');
      } else {
        star.classList.remove('vpm-testimonial__star--filled');
      }
    });
  }
  
  trigger.addEventListener('click', function() {
    var isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    var newState = !isExpanded;
    
    trigger.setAttribute('aria-expanded', newState);
    bio.setAttribute('aria-hidden', !newState);
    
    if (newState) {
      bio.classList.add('vpm-testimonial__bio--expanded');
    } else {
      bio.classList.remove('vpm-testimonial__bio--expanded');
    }
  });
  
  trigger.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      trigger.click();
    }
  });
  
})();
</script>
```

## Customization

### Changing Colors

The component uses CSS variables from the shared stylesheet. To customize colors, override the variables:

```css
#vpm-testimonial-root {
  --vpm-color-primary: #your-color;
  --vpm-color-text: #your-text-color;
}
```

### Modifying Star Color

The filled stars use a hardcoded color (`#fbbf24`). To change it, add this CSS:

```css
#vpm-testimonial-root .vpm-testimonial__star--filled {
  color: #your-star-color;
}
```

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ IE11+ (with polyfills for CSS variables if needed)

## Accessibility (A11y)

- ✅ Semantic HTML5 (`<article>`, `<blockquote>`, `<cite>`)
- ✅ ARIA labels and attributes (`aria-expanded`, `aria-hidden`, `aria-controls`)
- ✅ Keyboard navigation (Enter/Space to toggle bio)
- ✅ Focus indicators on interactive elements
- ✅ Screen reader friendly (hidden decorative stars with `aria-hidden`)
- ✅ Alt text for author photos

## Dependencies

- **Required**: `shared/styles.css` must be loaded
- **Optional**: `shared/utilities.js` (not used in this component)

## Notes

- The component automatically prevents double-initialization
- Star rating is set via `data-star-rating` attribute (1-5)
- Author bio expands/collapses on click or keyboard activation
- Component is fully self-contained and won't conflict with other components

