# VPM Component Library

A modular, portable component library for VPM's Brightspot CMS. Each component is self-contained, uses a shared stylesheet, and follows consistent architecture patterns.

## 📁 Directory Structure

```
/vpm-component-library
  /shared
    styles.css          (shared stylesheet for all components)
    utilities.js        (optional shared utilities)
  /standalone
    [component-id]-[variant-id].html  (standalone HTML files for iframe embedding)
  /gallery
    index.html         (component gallery)
    components.json    (component metadata)
    generate-standalone.js  (generator script)
    config.js          (configuration)
  /[component-name]
    index.html         (component markup source)
    README.md          (component documentation)
    preview.html       (standalone preview page)
```

## 🎯 Core Principles

### 1. Shared Stylesheet Integration
- All components reference a single, shared CSS file: `shared/styles.css`
- Each component uses a **unique namespace prefix** for all classes
- BEM methodology within the namespace: `[namespace]__element--modifier`
- Example: `.vpm-testimonial__quote`, `.vpm-testimonial__author--featured`

### 2. Component HTML Structure
- Wrap entire component in a container with unique ID: `<div id="[namespace]-root">`
- All content must be semantic HTML5
- Include data attributes for configuration: `data-theme="dark"`, `data-variant="compact"`

### 3. JavaScript Encapsulation
- Wrap all JS in an IIFE to prevent global scope pollution
- Use the component's unique ID to scope all DOM queries
- No external dependencies (vanilla JS only)
- Include initialization check to prevent double-loading

### 4. Documentation Requirements
Each component folder must include a README.md with:
- Component name and description
- Required CSS classes from shared stylesheet
- Available configuration options (data attributes)
- Usage example (copy-paste ready HTML)
- Browser compatibility notes
- A11y considerations

## 🚀 Getting Started

### Using Components via Iframe Embedding (Recommended)

This library supports iframe-based embedding, where each component variant is a standalone HTML file that can be hosted on a public server and embedded via iframes.

1. **Browse Components**: Open `gallery/index.html` in your browser to view all available components
2. **Select Component & Variant**: Click on a component card and choose your desired variant
3. **Download HTML File**: Click "📋 Copy Code" button, then download the standalone HTML file
4. **Upload to Server**: Upload the downloaded HTML file to your public-facing server
5. **Copy Iframe Code**: In the gallery modal, copy the iframe embed code
6. **Update Base URL**: Edit the iframe `src` attribute to match your server location
7. **Embed in Website**: Paste the iframe code into your main website where you want the component to appear

**Example iframe code:**
```html
<iframe 
  src="https://components.vpm.org/testimonial-card-default.html" 
  title="Testimonial Card - Default"
  width="100%" 
  height="auto" 
  frameborder="0" 
  scrolling="no"
  loading="lazy"
  style="border: none; min-height: 400px;">
</iframe>
```

### Generating Standalone Files

To regenerate all standalone HTML files (after updating components):

```bash
cd gallery
node generate-standalone.js
```

This will create/update all files in the `standalone/` directory.

### Using a Component in Brightspot (Legacy Method)

1. **Copy the HTML** from `[component-name]/index.html`
2. **Ensure the shared stylesheet is loaded** in your page:
   ```html
   <link rel="stylesheet" href="/path/to/shared/styles.css">
   ```
3. **Paste the component HTML** into your Brightspot template
4. **Configure** using data attributes as documented in the component's README

### Previewing a Component Locally

1. Open `[component-name]/preview.html` in your browser
2. The preview page includes all necessary styles and scripts
3. Use browser dev tools to test responsive behavior and accessibility

## 🎨 Shared Stylesheet

The `shared/styles.css` file contains:
- **CSS Variables**: Reusable design tokens (colors, spacing, typography, etc.)
- **Base Styles**: Common resets and utilities
- **Component Styles**: All component-specific styles organized by namespace

### CSS Variables

All components use CSS variables for consistent theming:

```css
--vpm-color-primary: #005eb8;
--vpm-spacing-unit: 1rem;
--vpm-border-radius: 4px;
--vpm-transition-speed: 0.3s;
```

See `shared/styles.css` for the complete list of available variables.

### Dark Theme Support

Components support dark theme via the `data-theme="dark"` attribute:

```html
<div id="vpm-testimonial-root" data-theme="dark">
  <!-- component content -->
</div>
```

## 📝 Component Development Guidelines

### Naming Convention

- **Namespace**: `vpm-[component-name]-`
- **Root ID**: `vpm-[component-name]-root`
- **Classes**: Use BEM within namespace
  - Block: `vpm-[name]`
  - Element: `vpm-[name]__element`
  - Modifier: `vpm-[name]__element--modifier`

### Component Template

When creating a new component, follow this structure:

```html
<!-- Component HTML -->
<div id="vpm-[name]-root" data-variant="default">
  <div class="vpm-[name]">
    <div class="vpm-[name]__element">
      <!-- content -->
    </div>
  </div>
</div>

<script>
(function() {
  'use strict';
  var root = document.getElementById('vpm-[name]-root');
  if (!root || root.dataset.initialized === 'true') return;
  root.dataset.initialized = 'true';
  
  // Component logic here
  
})();
</script>
```

### CSS Organization

Add component styles to `shared/styles.css` in this format:

```css
/* Component: [Name] (vpm-[name]-*) */
/* --------------------------------- */
.vpm-[name] {
  /* styles */
}

.vpm-[name]__element {
  /* styles */
}

.vpm-[name]__element--modifier {
  /* styles */
}
```

## ✅ Quality Checklist

Before delivering a component, verify:

- [ ] All CSS classes use the component namespace
- [ ] JavaScript is wrapped in IIFE
- [ ] Component works when styles.css is loaded
- [ ] No console errors in browser
- [ ] Accessible (keyboard nav, screen readers)
- [ ] Mobile responsive
- [ ] Works in target browsers (IE11+ if required)
- [ ] Documentation is complete
- [ ] Preview.html renders correctly
- [ ] No global variable or function pollution

## 🔧 Shared Utilities

The `shared/utilities.js` file provides optional helper functions:

- `VPMUtils.getCSSVar()` - Get CSS variable value
- `VPMUtils.setCSSVar()` - Set CSS variable value
- `VPMUtils.debounce()` - Debounce function calls
- `VPMUtils.throttle()` - Throttle function calls
- `VPMUtils.isInViewport()` - Check if element is visible
- `VPMUtils.getDataAttr()` - Get data attribute with type coercion
- `VPMUtils.initComponent()` - Initialize component (prevents double-loading)

**Note**: Utilities are optional. Components should work without them.

## 📦 Available Components

### Testimonial Card
A flexible testimonial card component with author information, star rating, and expandable bio section.

- **Location**: `/testimonial-card/`
- **Namespace**: `vpm-testimonial-`
- **Features**: Star ratings, expandable bios, multiple variants, dark theme support
- **Documentation**: See `/testimonial-card/README.md`
- **Preview**: Open `/testimonial-card/preview.html` in your browser

### Spotlight
A dynamic card grid component that displays content items loaded from a JSON file. Perfect for showcasing featured content with automatic updates based on priority tags.

- **Location**: `/spotlight/`
- **Namespace**: `vpm-spotlight-`
- **Features**: JSON data loading, priority filtering, responsive grid, lazy loading images
- **Documentation**: See `/spotlight/README.md`
- **Preview**: Open `/spotlight/preview.html` in your browser

### Watch Channels
A Shadow DOM component that displays a header section with channel tiles for watching VPM content. Uses Shadow DOM for complete style encapsulation.

- **Location**: `/watch-channels/`
- **Namespace**: `vpm-watch-channels-` (Shadow DOM internal: `watch-page-`)
- **Features**: Shadow DOM encapsulation, channel tiles with live badges, gradient background
- **Documentation**: See `/watch-channels/README.md`
- **Preview**: Open `/watch-channels/preview.html` in your browser

### Impact Testimonials
A dual carousel component featuring video testimonials and quote testimonials side-by-side. Includes auto-advance, touch/swipe support, and hover pause functionality.

- **Location**: `/impact-testimonials/`
- **Namespace**: `vpm-impact-testimonials-`
- **Features**: Video carousel, quote carousel, auto-advance, touch/swipe, Vimeo integration
- **Dependencies**: Vimeo Player API script required
- **Documentation**: See `/impact-testimonials/README.md`
- **Preview**: Open `/impact-testimonials/preview.html` in your browser

### Newsletter Signup
A newsletter signup form component integrated with MailChimp. Features responsive design, accessibility support, and error/success messaging.

- **Location**: `/newsletter-signup/`
- **Namespace**: `vpm-newsletter-`
- **Features**: MailChimp integration, responsive form, accessibility support, error handling
- **Documentation**: See `/newsletter-signup/README.md`
- **Preview**: Open `/newsletter-signup/preview.html` in your browser

### Article List
A component that transforms Brightspot CMS's standard HTML list structure into a modern card grid layout. Perfect for displaying article lists with improved visual design while maintaining compatibility with Brightspot's native list widgets.

- **Location**: `/article-list/`
- **Namespace**: `vpm-article-list-`
- **Features**: List transformation, responsive card grid, automatic data extraction, dark theme support
- **Documentation**: See `/article-list/README.md`
- **Preview**: Open `/article-list/preview.html` in your browser

## 🤝 Contributing

When adding a new component:

1. Create a new folder: `/[component-name]/`
2. Add component HTML to `index.html`
3. Add styles to `shared/styles.css` with namespace prefix
4. Create `README.md` with full documentation
5. Create `preview.html` for standalone preview
6. Update `gallery/components.json` with component metadata
7. Run `node gallery/generate-standalone.js` to generate standalone files
8. Update this README with component listing

## 🔧 Iframe-Based Workflow

### Overview

The iframe-based workflow allows you to:
- Host components as standalone HTML files on a public server
- Embed components via iframes without CSS/JS conflicts
- Update components independently without touching the main website
- Maintain style isolation between components and the parent page

### Workflow Steps

1. **Generate Standalone Files**: Run `node gallery/generate-standalone.js` to create standalone HTML files
2. **Upload Files**: Upload files from `standalone/` directory to your public server
3. **Configure Base URL**: Update `gallery/config.js` with your server's base URL
4. **Embed Components**: Use the iframe code provided in the gallery for each component variant

### Standalone File Structure

Each standalone file includes:
- Complete HTML document structure
- Inline CSS (component-specific styles + CSS variables)
- Inline JavaScript (component functionality)
- Variant-specific data attributes applied
- Responsive viewport meta tag
- Minimal body styling for iframe context

### Configuration

Edit `gallery/config.js` to customize:
- Base URL for iframe `src` attributes
- Default iframe attributes
- File naming conventions

## 📄 License

Internal use for VPM projects.
