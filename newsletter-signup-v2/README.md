# Newsletter Signup Component V2

An alternate version of the newsletter signup form component integrated with MailChimp. Features responsive design, accessibility support, and error/success messaging.

## Component Details

- **Component Name**: Newsletter Signup V2
- **Namespace**: `vpm-newsletter-v2-`
- **Root ID**: `vpm-newsletter-signup-v2-root` (inner container: `vpm-newsletter-signup-v2`)
- **Version**: v2
- **Component Family**: newsletter-signup

## Features

- 📧 MailChimp integration
- 📱 Fully responsive (stacks on mobile, side-by-side on desktop)
- ♿ Accessible (ARIA labels, screen reader support)
- ✅ Error and success message handling
- 🎨 Uses shared CSS variables for theming
- 🔒 Honeypot spam protection

## Differences from V1

This is an alternate version of the Newsletter Signup component. The functionality is the same, but it uses a different namespace (`vpm-newsletter-v2-`) and unique IDs to allow both versions to coexist.

## Required CSS Classes

This component uses classes with the `vpm-newsletter-v2-` prefix. The styles are embedded in the Shadow DOM version, or can be added to `shared/styles.css` for the standard version.

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

```html
<div id="vpm-newsletter-signup-v2-root">
  <div id="vpm-newsletter-signup-v2">
    <!-- Form HTML -->
  </div>
</div>
```

## Shadow DOM Usage

```html
<vpm-newsletter-signup-v2></vpm-newsletter-signup-v2>
```

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ IE11+

## Accessibility (A11y)

- ✅ Semantic HTML5 (`<form>`, `<label>`, `<input>`)
- ✅ ARIA labels and attributes
- ✅ Screen reader only text (`.vpm-sr-only`)
- ✅ Required field indicators
- ✅ Error/success announcements (`aria-live="polite"`)
- ✅ Keyboard navigation support
- ✅ Focus indicators

## Dependencies

- **Required**: MailChimp account and form setup
- **Optional**: `shared/styles.css` (for non-Shadow DOM version)


