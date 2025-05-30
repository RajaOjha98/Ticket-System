// This is a utility file to help understand the logo design
// The actual PNG icons should be generated from the SVG using proper tools

export const logoConfig = {
  primaryColor: '#2196F3',
  secondaryColor: '#2C3E50',
  backgroundColor: '#ffffff',
  sizes: {
    favicon: '32x32',
    appleTouchIcon: '180x180',
    icon192: '192x192',
    icon512: '512x512'
  }
};

// SVG content for favicon generation
export const faviconSVG = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="6" fill="#2196F3"/>
  <path d="M16 6C11.582 6 8 9.582 8 14V19C8 19.552 8.448 20 9 20H10.5C11.052 20 11.5 19.552 11.5 19V16.5C11.5 15.948 11.052 15.5 10.5 15.5H9.075C9.388 11.424 12.364 8.5 16 8.5C19.636 8.5 22.612 11.424 22.925 15.5H21.5C20.948 15.5 20.5 15.948 20.5 16.5V19C20.5 19.552 20.948 20 21.5 20H23C23.552 20 24 19.552 24 19V14C24 9.582 20.418 6 16 6Z" fill="white"/>
  <path d="M26 16L28 17L26 18" stroke="white" stroke-width="1" stroke-linecap="round"/>
</svg>
`;

console.log('DeskFlow Logo Configuration Ready');
console.log('Use online SVG to PNG converters to generate the required icon sizes');
console.log('Recommended tool: https://svgtopng.com/ or https://cloudconvert.com/svg-to-png'); 