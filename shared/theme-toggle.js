/**
 * VPM Component Library - Theme Toggle Utility
 * Shared utility for managing synchronized light/dark themes across all components
 */

(function(window) {
  'use strict';
  
  const THEME_KEY = 'vpm-gallery-theme';
  const DEFAULT_THEME = 'dark';
  
  /**
   * Get the current theme from localStorage
   * @returns {string} 'light' or 'dark'
   */
  function getTheme() {
    return localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
  }
  
  /**
   * Set the theme and dispatch event to synchronize all components
   * @param {string} theme - 'light' or 'dark'
   */
  function setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    
    // Dispatch custom event for component synchronization
    const event = new CustomEvent('vpmThemeChange', {
      detail: { theme: theme },
      bubbles: true
    });
    window.dispatchEvent(event);
  }
  
  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const currentTheme = getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }
  
  /**
   * Create theme toggle button styles
   * @returns {string} CSS styles for the toggle button
   */
  function getToggleStyles() {
    return `
      .vpm-theme-toggle {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid var(--vpm-color-border);
        background: var(--vpm-color-bg);
        color: var(--vpm-color-text);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        transition: all 0.2s ease;
        z-index: 1000;
        padding: 0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      
      .vpm-theme-toggle:hover {
        transform: scale(1.1);
        border-color: var(--vpm-color-primary, #005eb8);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      
      .vpm-theme-toggle:focus {
        outline: 2px solid var(--vpm-color-primary, #005eb8);
        outline-offset: 2px;
      }
      
      .vpm-theme-toggle:active {
        transform: scale(0.95);
      }
      
      .vpm-theme-toggle-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
      }
    `;
  }
  
  /**
   * Create and return theme toggle button element
   * @param {string} currentTheme - Current theme ('light' or 'dark')
   * @returns {HTMLElement} Button element
   */
  function createToggleButton(currentTheme) {
    const button = document.createElement('button');
    button.className = 'vpm-theme-toggle';
    button.setAttribute('aria-label', 'Toggle theme');
    button.setAttribute('type', 'button');
    
    const icon = document.createElement('span');
    icon.className = 'vpm-theme-toggle-icon';
    icon.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
    
    button.appendChild(icon);
    return button;
  }
  
  /**
   * Update toggle button icon based on theme
   * @param {HTMLElement} button - Toggle button element
   * @param {string} theme - Current theme
   */
  function updateToggleIcon(button, theme) {
    const icon = button.querySelector('.vpm-theme-toggle-icon');
    if (icon) {
      icon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
  }
  
  /**
   * Check if component is embedded externally
   * @param {HTMLElement} hostElement - The custom element host
   * @returns {boolean}
   */
  function isEmbedded(hostElement) {
    // Check for explicit data-embedded attribute
    if (hostElement.hasAttribute('data-embedded')) {
      return true;
    }
    
    // Check if in iframe (embedded context)
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }
  
  /**
   * Attach theme toggle to a component's shadow DOM
   * @param {ShadowRoot} shadowRoot - Component's shadow root
   * @param {HTMLElement} hostElement - The custom element host
   */
  function attachToggleToShadow(shadowRoot, hostElement) {
    // Don't add toggle if embedded externally
    if (isEmbedded(hostElement)) {
      return;
    }
    
    const currentTheme = getTheme();
    
    // Add styles
    const styleElement = document.createElement('style');
    styleElement.textContent = getToggleStyles();
    shadowRoot.appendChild(styleElement);
    
    // Create and add button
    const button = createToggleButton(currentTheme);
    shadowRoot.appendChild(button);
    
    // Add click handler
    button.addEventListener('click', function() {
      toggleTheme();
    });
    
    // Listen for theme changes from other components
    window.addEventListener('vpmThemeChange', function(e) {
      updateToggleIcon(button, e.detail.theme);
    });
  }
  
  // Export to window
  window.VPMThemeToggle = {
    getTheme: getTheme,
    setTheme: setTheme,
    toggleTheme: toggleTheme,
    attachToggleToShadow: attachToggleToShadow,
    isEmbedded: isEmbedded
  };
  
})(window);

