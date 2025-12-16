# Newsletter Signup Component

A newsletter signup form component integrated with MailChimp. Features responsive design, accessibility support, and error/success messaging.

## Component Details

- **Component Name**: Newsletter Signup
- **Namespace**: `vpm-newsletter-`
- **Root ID**: `vpm-newsletter-signup-root` (inner container: `vpm-newsletter-signup`)

## Features

- 📧 MailChimp integration
- 📱 Fully responsive (stacks on mobile, side-by-side on desktop)
- ♿ Accessible (ARIA labels, screen reader support)
- ✅ Error and success message handling
- 🎨 Uses shared CSS variables for theming
- 🔒 Honeypot spam protection

## Required CSS Classes

This component uses classes from `shared/styles.css` with the `vpm-newsletter-` prefix. See the stylesheet for complete class list.

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

### Customizing Content

**Header Image:**
```html
<img src="YOUR_IMAGE_URL" alt="Newsletter logo">
```

**Heading Text:**
```html
<h3><span class="highlight">Your Custom</span> Text Here</h3>
```

**Explore Link:**
```html
<a href="YOUR_LINK_URL">Explore More Newsletters</a>
```

## Usage Example

```html
<div id="vpm-newsletter-signup-root">
  <div id="vpm-newsletter-signup">
    <!-- Form HTML -->
  </div>
</div>
```

## MailChimp Integration

This component uses MailChimp's embedded form format. The form includes:

- Email input field
- Hidden tags field (for segmenting subscribers)
- Honeypot field (spam protection)
- Error/success response divs (populated by MailChimp)

### MailChimp Script

MailChimp will automatically inject a script tag when the form is submitted. This handles:
- Form validation
- AJAX submission
- Error/success message display

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

- **Required**: `shared/styles.css` must be loaded
- **Required**: MailChimp account and form setup
- **Optional**: None

## Customization

### Changing Button Color

The submit button uses `--vpm-color-primary`. To change it:

```css
#vpm-newsletter-signup input[type="submit"] {
  background: var(--your-custom-color);
}
```

### Changing Form Layout

The form stacks on mobile and displays side-by-side on desktop (768px+). To change breakpoint:

```css
@media screen and (min-width: YOUR_BREAKPOINT) {
  #vpm-newsletter-signup .vpm-newsletter__fields {
    flex-direction: row;
  }
}
```

## Notes

- Component uses MailChimp's standard embedded form format
- Honeypot field prevents spam submissions
- Error/success messages are handled by MailChimp's JavaScript
- Form validates email format client-side and server-side
- All required fields are marked with `aria-required="true"`

