# Spotlight Component

A dynamic card grid component that displays content items loaded from a JSON file. Perfect for showcasing featured content with automatic updates based on priority tags.

## Component Details

- **Component Name**: Spotlight
- **Namespace**: `vpm-spotlight-`
- **Root ID**: `vpm-spotlight-root`

## Features

- 📋 Loads content from JSON file (GitHub raw URL)
- 🏷️ Filters items by "high priority" tag
- 📱 Fully responsive grid layout (3 columns → 2 → 1)
- 🎨 Smooth hover animations
- ♿ Accessible (ARIA labels, semantic HTML)
- ⚡ Lazy loading images
- 🔄 Automatic sorting by date added

## Required CSS Classes

This component uses the following classes from `shared/styles.css`:

- `.vpm-spotlight-section` - Main section wrapper
- `.vpm-spotlight-container` - Container with max-width
- `.vpm-spotlight-heading` - Section heading
- `.vpm-spotlight-cards` - Grid container
- `.vpm-spotlight-card` - Individual card
- `.vpm-spotlight-card-link` - Card link wrapper
- `.vpm-spotlight-card-image` - Card image
- `.vpm-spotlight-card-content` - Card content wrapper
- `.vpm-spotlight-card-title` - Card title
- `.vpm-spotlight-card-subtitle` - Card subtitle
- `.vpm-spotlight-card-description` - Card description

## Configuration Options

### Data Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-github-url` | string | (required) | GitHub raw JSON URL for content data |

### JSON Data Format

The component expects a JSON file with the following structure:

```json
{
  "items": [
    {
      "id": "unique-id-1",
      "title": "Content Title",
      "subtitle": "Content Subtitle",
      "description": "Content description text",
      "picture": "https://example.com/image.jpg",
      "link": "https://example.com/article",
      "tags": ["high priority", "featured"],
      "dateAdded": "2024-01-15T10:00:00Z"
    }
  ]
}
```

**Required Fields:**
- `id` - Unique identifier
- `title` - Card title
- `tags` - Array of tags (must include "high priority" to display)

**Optional Fields:**
- `subtitle` - Card subtitle
- `description` - Card description
- `picture` - Image URL
- `link` - Link URL
- `dateAdded` - ISO date string for sorting

## Usage Example

### Basic Usage

```html
<div id="vpm-spotlight-root" data-github-url="https://raw.githubusercontent.com/username/repo/main/content-queue.json">
  <section class="vpm-spotlight-section">
    <div class="vpm-spotlight-container">
      <h2 class="vpm-spotlight-heading">Spotlight on VPM Original Content</h2>
      <div id="vpm-spotlight-cards" class="vpm-spotlight-cards">
        <!-- Cards will be dynamically inserted here -->
      </div>
    </div>
  </section>
</div>

<script>
(function() {
  'use strict';
  
  var root = document.getElementById('vpm-spotlight-root');
  if (!root || root.dataset.initialized === 'true') return;
  root.dataset.initialized = 'true';
  
  var GITHUB_JSON_URL = root.getAttribute('data-github-url') || '';
  var MAX_ACTIVE_ITEMS = 3;
  var HIGH_PRIORITY_TAG = 'high priority';
  
  var contentData = [];
  
  function loadContent() {
    if (typeof fetch === 'undefined') {
      console.error('VPM Spotlight: fetch API not available');
      return;
    }
    
    fetch(GITHUB_JSON_URL)
      .then(function(response) {
        if (!response.ok) throw new Error('Failed to load content queue');
        return response.json();
      })
      .then(function(data) {
        contentData = data.items || [];
        renderCards();
      })
      .catch(function(error) {
        console.error('Error loading content:', error);
      });
  }
  
  function getActiveItems() {
    return contentData
      .filter(function(item) {
        return item.tags && item.tags.includes(HIGH_PRIORITY_TAG);
      })
      .sort(function(a, b) {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      })
      .slice(0, MAX_ACTIVE_ITEMS);
  }
  
  function renderCards() {
    var container = document.getElementById('vpm-spotlight-cards');
    if (!container) return;
    
    var activeItems = getActiveItems();
    container.innerHTML = '';
    
    if (activeItems.length === 0) {
      container.innerHTML = '<p style="color: var(--vpm-color-text-muted); padding: 2rem;">No content items are currently active.</p>';
      return;
    }
    
    activeItems.forEach(function(item) {
      var card = createCardElement(item);
      container.appendChild(card);
    });
  }
  
  function createCardElement(item) {
    var card = document.createElement('div');
    card.className = 'vpm-spotlight-card';
    card.setAttribute('data-id', item.id);
    
    var link = document.createElement('a');
    link.href = item.link || '#';
    link.className = 'vpm-spotlight-card-link';
    link.setAttribute('aria-label', 'Read more about ' + (item.title || 'content'));
    
    var image = document.createElement('img');
    image.src = item.picture || '';
    image.alt = item.title || 'Content image';
    image.className = 'vpm-spotlight-card-image';
    image.loading = 'lazy';
    
    var content = document.createElement('div');
    content.className = 'vpm-spotlight-card-content';
    
    var title = document.createElement('h3');
    title.className = 'vpm-spotlight-card-title';
    title.textContent = item.title || '';
    
    var subtitle = document.createElement('p');
    subtitle.className = 'vpm-spotlight-card-subtitle';
    subtitle.textContent = item.subtitle || '';
    
    var description = document.createElement('p');
    description.className = 'vpm-spotlight-card-description';
    description.textContent = item.description || '';
    
    content.appendChild(title);
    content.appendChild(subtitle);
    content.appendChild(description);
    
    link.appendChild(image);
    link.appendChild(content);
    card.appendChild(link);
    
    return card;
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadContent);
  } else {
    loadContent();
  }
})();
</script>
```

## Customization

### Changing Maximum Items

To display more or fewer items, modify the `MAX_ACTIVE_ITEMS` constant in the JavaScript:

```javascript
var MAX_ACTIVE_ITEMS = 5; // Display 5 items instead of 3
```

### Changing Priority Tag

To use a different tag for filtering, modify the `HIGH_PRIORITY_TAG` constant:

```javascript
var HIGH_PRIORITY_TAG = 'featured'; // Use "featured" tag instead
```

### Custom Heading

Update the heading text in the HTML:

```html
<h2 class="vpm-spotlight-heading">Your Custom Heading</h2>
```

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ IE11 - Requires fetch polyfill

## Accessibility (A11y)

- ✅ Semantic HTML5 (`<section>`, `<h2>`, `<h3>`)
- ✅ ARIA labels on links
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Alt text for images
- ✅ Screen reader friendly

## Dependencies

- **Required**: `shared/styles.css` must be loaded
- **Required**: `fetch` API (or polyfill for IE11)
- **Optional**: None

## Notes

- The component automatically prevents double-initialization
- Content is sorted by `dateAdded` (newest first)
- Only items with "high priority" tag are displayed
- Maximum of 3 items displayed by default
- Images use lazy loading for performance
- Component handles errors gracefully with user-friendly messages

