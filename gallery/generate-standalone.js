#!/usr/bin/env node
/**
 * Standalone HTML File Generator
 * 
 * Generates standalone HTML files for each component variant.
 * Each file includes all CSS and JS inline for iframe embedding.
 */

const fs = require('fs');
const path = require('path');

// Load configuration
const CONFIG = require('./config.js');

// Paths
const BASE_DIR = path.join(__dirname, '..');
const COMPONENTS_JSON = path.join(__dirname, 'components.json');
const SHARED_STYLES = path.join(BASE_DIR, 'shared', 'styles.css');
const STANDALONE_DIR = path.join(BASE_DIR, 'standalone');

// Ensure standalone directory exists
if (!fs.existsSync(STANDALONE_DIR)) {
  fs.mkdirSync(STANDALONE_DIR, { recursive: true });
}

/**
 * Extract CSS for a specific component namespace
 * Extracts entire component section from comment to next component
 */
function extractComponentCSS(cssContent, namespace) {
  const lines = cssContent.split('\n');
  let rootContent = [];
  let baseResetContent = [];
  let componentStyles = [];
  
  // Track state
  let inRoot = false;
  let inBaseReset = false;
  let inComponentSection = false;
  let braceCount = 0;
  
  // Find component name from namespace (e.g., "vpm-testimonial-" -> "Testimonial Card")
  const componentNameMatch = namespace.match(/vpm-([^-]+)/);
  const componentName = componentNameMatch ? componentNameMatch[1] : '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Capture :root and [data-theme] variables
    if (trimmed.startsWith(':root') || trimmed.startsWith('[data-theme=')) {
      inRoot = true;
      rootContent.push(line);
      braceCount = (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
      continue;
    }
    
    if (inRoot) {
      rootContent.push(line);
      braceCount += (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
      if (braceCount <= 0) {
        inRoot = false;
        braceCount = 0;
      }
      continue;
    }
    
    // Capture base reset styles
    if (trimmed.includes('[id*="-root"]') || trimmed.includes('.vpm-sr-only')) {
      inBaseReset = true;
      baseResetContent.push(line);
      braceCount = (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
      continue;
    }
    
    if (inBaseReset) {
      baseResetContent.push(line);
      braceCount += (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
      if (braceCount <= 0) {
        inBaseReset = false;
        braceCount = 0;
      }
      continue;
    }
    
    // Check if this is the start of our component section
    // Comment format: "Component: Testimonial Card (vpm-testimonial-*)"
    // Namespace: "vpm-testimonial-"
    const namespaceInComment = namespace.replace(/-$/, ''); // Remove trailing dash
    if (trimmed.includes('Component:') && trimmed.includes(namespaceInComment)) {
      inComponentSection = true;
      componentStyles.push(line);
      continue;
    }
    
    // Check if this is the start of a different component section (end of our section)
    if (inComponentSection && trimmed.includes('Component:') && !trimmed.includes(namespaceInComment)) {
      inComponentSection = false;
    }
    
    // If we're in the component section, capture everything
    if (inComponentSection) {
      componentStyles.push(line);
      continue;
    }
    
    // Also capture any standalone rules that contain the namespace (for edge cases)
    if (!inComponentSection && (trimmed.includes('.' + namespace.replace(/-$/, '')) || trimmed.includes('#' + namespace.replace(/-$/, 'root')))) {
      componentStyles.push(line);
    }
  }
  
  // Combine all parts
  return [
    ...rootContent,
    ...baseResetContent,
    ...componentStyles
  ].join('\n');
}

/**
 * Extract JavaScript from component HTML
 */
function extractJavaScript(htmlContent) {
  const scriptMatch = htmlContent.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
  if (scriptMatch && scriptMatch[1]) {
    return scriptMatch[1].trim();
  }
  return '';
}

/**
 * Extract HTML markup from component (everything except script tags)
 */
function extractHTMLMarkup(htmlContent) {
  // Remove script tags but keep everything else
  return htmlContent.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').trim();
}

/**
 * Apply variant data attributes to root element
 */
function applyVariantAttributes(htmlMarkup, dataAttributes) {
  if (!dataAttributes || Object.keys(dataAttributes).length === 0) {
    return htmlMarkup;
  }
  
  // Find the root element (first div with id containing "-root")
  const rootElementRegex = /(<div[^>]*id="[^"]*-root"[^>]*)/;
  const match = htmlMarkup.match(rootElementRegex);
  
  if (match) {
    let rootElement = match[1];
    
    // Remove existing data attributes that we'll replace
    Object.keys(dataAttributes).forEach(function(attr) {
      const attrRegex = new RegExp('\\s+' + attr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '="[^"]*"', 'g');
      rootElement = rootElement.replace(attrRegex, '');
    });
    
    // Add variant data attributes
    Object.keys(dataAttributes).forEach(function(attr) {
      const value = dataAttributes[attr];
      rootElement += ' ' + attr + '="' + value + '"';
    });
    
    // Replace in markup
    return htmlMarkup.replace(rootElementRegex, rootElement);
  }
  
  return htmlMarkup;
}

/**
 * Generate standalone HTML file
 */
function generateStandaloneHTML(component, variant, htmlMarkup, css, js) {
  const title = `${component.name} - ${variant.name}`;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    /* Base Reset */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }
    
    /* Component Styles */
${css.split('\n').map(line => '    ' + line).join('\n')}
  </style>
</head>
<body>
${htmlMarkup}
  <script>
${js.split('\n').map(line => '    ' + line).join('\n')}
  </script>
</body>
</html>`;
}

/**
 * Main generation function
 */
function generateStandaloneFiles() {
  console.log('Generating standalone HTML files...\n');
  
  // Load components.json
  const componentsData = JSON.parse(fs.readFileSync(COMPONENTS_JSON, 'utf8'));
  const components = componentsData.components;
  
  // Load shared styles
  const sharedCSS = fs.readFileSync(SHARED_STYLES, 'utf8');
  
  let generatedCount = 0;
  
  components.forEach(function(component) {
    const variants = component.variants || [{ id: 'default', name: 'Default', dataAttributes: {} }];
    
    // Load component HTML
    const indexPath = path.join(BASE_DIR, component.indexPath.replace('../', ''));
    if (!fs.existsSync(indexPath)) {
      console.warn(`Warning: Component file not found: ${indexPath}`);
      return;
    }
    
    const componentHTML = fs.readFileSync(indexPath, 'utf8');
    const htmlMarkup = extractHTMLMarkup(componentHTML);
    const js = extractJavaScript(componentHTML);
    
    // Extract CSS for this component's namespace
    const componentCSS = extractComponentCSS(sharedCSS, component.namespace);
    
    // Generate file for each variant
    variants.forEach(function(variant) {
      // Apply variant attributes
      const variantHTML = applyVariantAttributes(htmlMarkup, variant.dataAttributes);
      
      // Generate standalone HTML
      const standaloneHTML = generateStandaloneHTML(component, variant, variantHTML, componentCSS, js);
      
      // Write file
      const filename = `${component.id}-${variant.id}.html`;
      const filepath = path.join(STANDALONE_DIR, filename);
      fs.writeFileSync(filepath, standaloneHTML, 'utf8');
      
      console.log(`✓ Generated: ${filename}`);
      generatedCount++;
    });
  });
  
  console.log(`\n✅ Generated ${generatedCount} standalone HTML files in ${STANDALONE_DIR}`);
}

// Run if called directly
if (require.main === module) {
  generateStandaloneFiles();
}

module.exports = { generateStandaloneFiles };

