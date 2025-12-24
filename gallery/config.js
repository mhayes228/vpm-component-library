// Configuration for iframe-based component library
const CONFIG = {
  // Base URL for public-facing server (update this with your actual URL)
  baseUrl: 'https://components.vpm.org/',
  
  // File naming convention
  namingPattern: '[component-id]-[variant-id].html',
  
  // Default iframe attributes
  iframeDefaults: {
    width: '100%',
    height: 'auto',
    frameborder: '0',
    scrolling: 'no',
    loading: 'lazy',
    style: 'border: none; min-height: 400px;'
  }
};

// Export for use in Node.js environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}

