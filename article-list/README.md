# Article List Component

A component that transforms Brightspot CMS's standard HTML list structure into a modern card grid layout. Perfect for displaying article lists with improved visual design while maintaining compatibility with Brightspot's native list widgets.

## Component Details

- **Component Name**: Article List
- **Namespace**: `vpm-article-list-`
- **Root ID**: `vpm-article-list-root`

## Features

- 🔄 Transforms standard HTML lists (`<ul>/<li>`) into card grid layout
- 📱 Fully responsive design (3 columns → 2 → 1)
- 🎨 Modern card-based design with hover effects
- 🖼️ Automatic image extraction and display
- 📅 Date formatting and display
- 🏷️ Category/tag support
- 🌙 Dark theme support
- ♿ Accessible (semantic HTML, ARIA labels)
- ⚡ Graceful fallback if JavaScript fails

## Required CSS Classes

This component uses the following classes from `shared/styles.css`:

- `.vpm-article-list__grid` - Grid container
- `.vpm-article-list__card` - Individual card
- `.vpm-article-list__card-link` - Card link wrapper
- `.vpm-article-list__card-image-wrapper` - Image wrapper
- `.vpm-article-list__card-image` - Card image
- `.vpm-article-list__card-content` - Card content wrapper
- `.vpm-article-list__card-category` - Category badge
- `.vpm-article-list__card-title` - Card title
- `.vpm-article-list__card-description` - Card description
- `.vpm-article-list__card-meta` - Card metadata container

## Configuration Options

### Data Attributes

| Attribute | Values | Default | Description |
|-----------|--------|---------|-------------|
| `data-variant` | `"grid"`, `"compact"`, `"featured"` | `"grid"` | Visual style variant |
| `data-columns` | `"1"` through `"4"` | `"3"` | Number of columns on desktop |
| `data-theme` | `"light"`, `"dark"` | `"light"` | Color theme |

### Variant Examples

**Grid (Default):**
```html
<div id="vpm-article-list-root" data-variant="grid" data-columns="3">
  <!-- Brightspot list HTML -->
</div>
```

**Compact:**
```html
<div id="vpm-article-list-root" data-variant="compact" data-columns="2">
  <!-- Brightspot list HTML -->
</div>
```

**Dark Theme:**
```html
<div id="vpm-article-list-root" data-theme="dark" data-columns="3">
  <!-- Brightspot list HTML -->
</div>
```

## Usage Example

### Basic Usage in Brightspot

1. **Add the component wrapper** to your Brightspot template:
   ```html
   <div id="vpm-article-list-root" data-variant="grid" data-columns="3" data-theme="light">
     <!-- Brightspot list widget will output here -->
   </div>
   ```

2. **Add Brightspot list widget** inside the wrapper. The component will automatically transform the list.

3. **Ensure shared stylesheet is loaded**:
   ```html
   <link rel="stylesheet" href="/path/to/shared/styles.css">
   ```

### Expected Brightspot List Structure

The component works with standard HTML lists. It automatically extracts:

- **Title**: From `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, or `<strong>` tags
- **Link**: From `<a>` tag `href` attribute
- **Image**: From `<img>` tag `src` attribute
- **Description**: From `<p>` tag or text content
- **Date**: From `<time>` tag or date patterns in text
- **Category**: From elements with classes containing "category", "tag", or "section"

**Example Brightspot list HTML:**
```html
<ul>
  <li>
    <a href="/article-1">
      <img src="/image1.jpg" alt="Article 1">
      <h3>Article Title 1</h3>
      <p>Article description or excerpt text here.</p>
      <time datetime="2024-01-15">January 15, 2024</time>
    </a>
  </li>
  <li>
    <a href="/article-2">
      <img src="/image2.jpg" alt="Article 2">
      <h3>Article Title 2</h3>
      <p>Another article description.</p>
      <time datetime="2024-01-14">January 14, 2024</time>
    </a>
  </li>
</ul>
```

## How It Works

1. Component JavaScript finds the list (`<ul>` or `<ol>`) within the root container
2. Extracts article data from each list item (`<li>`)
3. Transforms list items into card structure
4. Replaces the original list with a responsive grid of cards
5. Applies styling from the shared stylesheet

## Customization

### Changing Column Count

Modify the `data-columns` attribute:

```html
<div id="vpm-article-list-root" data-columns="4">
  <!-- 4 columns on desktop -->
</div>
```

The component uses CSS Grid with responsive breakpoints:
- Desktop: Number of columns specified in `data-columns`
- Tablet: 2 columns
- Mobile: 1 column

### Customizing Colors

Override CSS variables in your stylesheet:

```css
#vpm-article-list-root {
  --vpm-color-primary: #your-color;
  --vpm-color-text: #your-text-color;
  --vpm-color-bg: #your-background-color;
}
```

### Modifying Card Layout

The component uses CSS Grid. To customize the layout, override the grid styles:

```css
#vpm-article-list-root .vpm-article-list__grid {
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}
```

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ IE11 - Requires polyfills for modern JavaScript features

## Accessibility (A11y)

- ✅ Semantic HTML5 (`<article>`, `<time>`, proper headings)
- ✅ ARIA labels on links and containers
- ✅ Keyboard navigation support
- ✅ Focus indicators on interactive elements
- ✅ Screen reader friendly
- ✅ Alt text for images (preserved from original)
- ✅ Proper heading hierarchy

## Dependencies

- **Required**: `shared/styles.css` must be loaded
- **Optional**: None

## Graceful Degradation

If JavaScript fails or is disabled:
- The original list structure remains visible
- Basic styling may still apply if CSS is loaded
- Content remains accessible

## Notes

- The component automatically prevents double-initialization
- Images use lazy loading for performance
- Component handles missing data gracefully (no errors if image/description/date is missing)
- Date formatting attempts to parse ISO dates and common date formats
- Component works with any standard HTML list structure, not just Brightspot lists
- The original list is replaced with the card grid (not hidden)

## Troubleshooting

### List Not Transforming

- Ensure the list (`<ul>` or `<ol>`) is inside the `#vpm-article-list-root` container
- Check browser console for JavaScript errors
- Verify the component hasn't already been initialized (check for `data-initialized="true"`)

### Missing Images or Content

- Ensure Brightspot list items contain the expected HTML structure
- Check that images have valid `src` attributes
- Verify titles are in heading tags or strong tags

### Styling Issues

- Ensure `shared/styles.css` is loaded
- Check that CSS variables are defined
- Verify no conflicting styles from Brightspot theme

