# Newsletter Signup Component V3

An enhanced version of the newsletter signup form component with a bold gradient background designed to stand out prominently on white backgrounds, especially when surrounded by article posts with images. Features MailChimp integration, responsive design, accessibility support, and error/success messaging.

## Component Details

- **Component Name**: Newsletter Signup V3
- **Namespace**: `vpm-newsletter-v3-`
- **Root ID**: `vpm-newsletter-signup-v3-root` (inner container: `vpm-newsletter-signup-v3`)
- **Version**: v3
- **Component Family**: newsletter-signup

## Key Features

- 📧 MailChimp integration
- 📱 Fully responsive (stacks on mobile, side-by-side on desktop)
- ♿ Accessible (ARIA labels, screen reader support)
- ✅ Error and success message handling
- 🎨 Uses shared CSS variables for theming
- 🔒 Honeypot spam protection
- 🌈 **Bold gradient background** for enhanced visibility on white backgrounds
- ✨ **Enhanced visual presence** with stronger shadows and borders

## Differences from V2

### Design Enhancements

**V3 is specifically designed to stand out more on white backgrounds:**

1. **Bold Gradient Background**: 
   - V2: White card background
   - V3: Vibrant gradient from navy blue (#003865) through primary blue (#005eb8) to light blue (#6CACE4)

2. **Enhanced Visual Presence**:
   - V2: Standard shadow (xl)
   - V3: Deeper shadow (2xl) for more prominence
   - V3: Yellow accent border (2px) around entire card
   - V3: Yellow accent bar at top of card

3. **Typography & Colors**:
   - V2: Dark text on light background
   - V3: Light text (#ffffff) on dark gradient background for high contrast
   - V3: Improved text contrast with rgba values for better readability

4. **Left Sidebar**:
   - V2: Light gradient background
   - V3: Semi-transparent white overlay with backdrop blur for glassmorphism effect

5. **Form Inputs**:
   - V2: Standard white input on white card
   - V3: High-contrast white input (rgba 0.95) on dark gradient background
   - V3: Enhanced focus states with yellow accent glow

6. **Button**:
   - V3: Enhanced shadow for better depth perception on dark background

### When to Use V3 vs V2

- **Use V3** when:
  - The component appears on white or light backgrounds
  - The page contains many article cards/images that might compete for attention
  - You need the newsletter signup to stand out prominently
  - You want a more eye-catching, modern design

- **Use V2** when:
  - The component appears on colored or dark backgrounds
  - You prefer a more subtle, minimalist design
  - The page has a clean, simple layout without competing visual elements

## Required CSS Classes

This component uses classes with the `vpm-newsletter-v3-` prefix. The styles are embedded in the Shadow DOM version, or can be added to `shared/styles.css` for the standard version.

## Configuration

### MailChimp Form Action

The form action URL is configured in the HTML:

```html
<form action="https://vpm.us3.list-manage.com/subscribe/post?u=USER_ID&id=LIST_ID&f_id=FORM_ID" method="post">
```

To change the MailChimp list:
1. Update the `action` attribute with your MailChimp form URL
2. Update the hidden `tags` input value if needed
3. Update the honeypot field name if needed

## Usage Example

### Standard HTML Version

```html
<div id="vpm-newsletter-signup-v3-root">
  <div id="vpm-newsletter-signup-v3">
    <!-- Form HTML -->
  </div>
</div>
```

### Shadow DOM Embeddable Version

```html
<div id="vpm-newsletter-signup-v3-root-shadow"></div>
<script>
  <!-- Copy contents from index.html -->
</script>
```

### Web Component Version

```html
<vpm-newsletter-signup-v3></vpm-newsletter-signup-v3>
```

With custom attributes:

```html
<vpm-newsletter-signup-v3
  data-badge="Weekdays"
  data-title="Morning Monitor"
  data-heading="Your morning starts here."
  data-subtitle="Stay informed on news you care about—delivered daily."
  data-form-action="https://your-mailchimp-url">
</vpm-newsletter-signup-v3>
```

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ IE11+ (with polyfills for backdrop-filter)

## Accessibility (A11y)

- ✅ Semantic HTML5 (`<form>`, `<label>`, `<input>`)
- ✅ ARIA labels and attributes
- ✅ Screen reader only text (`.vpm-sr-only`)
- ✅ Required field indicators
- ✅ Error/success announcements (`aria-live="polite"`)
- ✅ Keyboard navigation support
- ✅ Focus indicators with high contrast
- ✅ WCAG AA contrast ratios (white text on dark gradient meets 4.5:1 ratio)

## Design Rationale

V3 was created to address visibility concerns when the newsletter signup component appears on white backgrounds, particularly in contexts where it's surrounded by article posts with images. The bold gradient background creates a strong visual contrast that helps the component stand out while maintaining a professional appearance that aligns with VPM brand colors.

The gradient uses VPM brand colors (navy blue, primary blue, light blue) and incorporates the yellow accent color as a border and top bar, creating a cohesive brand experience while maximizing visibility.

## Dependencies

- **Required**: MailChimp account and form setup
- **Optional**: `shared/styles.css` (for non-Shadow DOM version)
- **Note**: `backdrop-filter` is used for the glassmorphism effect on the left sidebar. Browsers that don't support it will fall back to a solid semi-transparent background.

