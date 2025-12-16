/**
 * VPM Component Library - Shared Utilities
 * Optional helper functions for components
 */

(function(window) {
  'use strict';

  /**
   * VPM Component Utilities
   * @namespace VPMUtils
   */
  window.VPMUtils = window.VPMUtils || {};

  /**
   * Get CSS variable value
   * @param {string} varName - CSS variable name (with or without --)
   * @param {Element} element - Element to get computed style from (default: document.documentElement)
   * @returns {string} CSS variable value
   */
  VPMUtils.getCSSVar = function(varName, element) {
    element = element || document.documentElement;
    varName = varName.startsWith('--') ? varName : '--' + varName;
    return getComputedStyle(element).getPropertyValue(varName).trim();
  };

  /**
   * Set CSS variable value
   * @param {string} varName - CSS variable name (with or without --)
   * @param {string} value - Value to set
   * @param {Element} element - Element to set variable on (default: document.documentElement)
   */
  VPMUtils.setCSSVar = function(varName, value, element) {
    element = element || document.documentElement;
    varName = varName.startsWith('--') ? varName : '--' + varName;
    element.style.setProperty(varName, value);
  };

  /**
   * Debounce function
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  VPMUtils.debounce = function(func, wait) {
    var timeout;
    return function() {
      var context = this;
      var args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  };

  /**
   * Throttle function
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function} Throttled function
   */
  VPMUtils.throttle = function(func, limit) {
    var inThrottle;
    return function() {
      var args = arguments;
      var context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(function() {
          inThrottle = false;
        }, limit);
      }
    };
  };

  /**
   * Check if element is in viewport
   * @param {Element} element - Element to check
   * @param {number} threshold - Threshold percentage (0-1)
   * @returns {boolean} True if element is in viewport
   */
  VPMUtils.isInViewport = function(element, threshold) {
    threshold = threshold || 0;
    var rect = element.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    var windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    return (
      rect.top >= -rect.height * threshold &&
      rect.left >= -rect.width * threshold &&
      rect.bottom <= windowHeight + rect.height * threshold &&
      rect.right <= windowWidth + rect.width * threshold
    );
  };

  /**
   * Get data attribute value with type coercion
   * @param {Element} element - Element to get attribute from
   * @param {string} name - Attribute name (without data- prefix)
   * @param {string} defaultValue - Default value if attribute doesn't exist
   * @returns {string|number|boolean} Parsed attribute value
   */
  VPMUtils.getDataAttr = function(element, name, defaultValue) {
    var value = element.getAttribute('data-' + name);
    if (value === null) return defaultValue;
    
    // Try to parse as number
    if (/^-?\d+\.?\d*$/.test(value)) {
      return parseFloat(value);
    }
    
    // Try to parse as boolean
    if (value === 'true') return true;
    if (value === 'false') return false;
    
    return value;
  };

  /**
   * Initialize component (prevents double-loading)
   * @param {string} rootId - Root element ID
   * @returns {Element|null} Root element or null if already initialized
   */
  VPMUtils.initComponent = function(rootId) {
    var root = document.getElementById(rootId);
    if (!root) {
      console.warn('VPM Component: Root element not found:', rootId);
      return null;
    }
    
    if (root.dataset.initialized === 'true') {
      console.warn('VPM Component: Already initialized:', rootId);
      return null;
    }
    
    root.dataset.initialized = 'true';
    return root;
  };

})(window);

