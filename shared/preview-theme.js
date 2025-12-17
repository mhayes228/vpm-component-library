/**
 * VPM Component Library - Preview Theme Sync
 * Handles theme synchronization for component preview pages
 */

(function() {
  'use strict';
  
  // Initialize theme from localStorage
  function initTheme() {
    const theme = localStorage.getItem('vpm-gallery-theme') || 'dark';
    applyTheme(theme);
  }
  
  // Apply theme to preview page
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    
    // Update any root elements with data-theme attribute
    const roots = document.querySelectorAll('[id*="-root"]');
    roots.forEach(function(root) {
      root.setAttribute('data-theme', theme);
    });
  }
  
  // Listen for theme changes from parent window (gallery)
  window.addEventListener('message', function(event) {
    // Check if this is a theme change message
    if (event.data && event.data.type === 'vpmThemeChange') {
      const theme = event.data.theme;
      
      // Save to localStorage
      localStorage.setItem('vpm-gallery-theme', theme);
      
      // Apply theme
      applyTheme(theme);
      
      // Dispatch event for any components listening
      const themeEvent = new CustomEvent('vpmThemeChange', {
        detail: { theme: theme },
        bubbles: true
      });
      window.dispatchEvent(themeEvent);
    }
  });
  
  // Also listen for storage changes (in case multiple tabs are open)
  window.addEventListener('storage', function(event) {
    if (event.key === 'vpm-gallery-theme' && event.newValue) {
      applyTheme(event.newValue);
    }
  });
  
  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
  
  // Notify parent that we're ready to receive theme
  if (window.parent !== window) {
    window.parent.postMessage({ type: 'vpmPreviewReady' }, '*');
  }
})();

