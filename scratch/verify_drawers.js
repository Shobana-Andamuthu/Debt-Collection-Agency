const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'home-2.html',
  'about.html',
  'services.html',
  'compliance.html',
  'pricing.html',
  'recovery-process.html',
  'contact.html',
  'dashboard.html'
];

const root = 'c:/Users/User/Desktop/Frontend templates/template-3-debt-collection';

let failed = false;

files.forEach(file => {
  const filePath = path.join(root, file);
  if (!fs.existsSync(filePath)) {
    console.error(`MISSING FILE: ${file}`);
    failed = true;
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  
  const hasHamburger = content.includes('id="hamburgerBtn"') || content.includes('class="hamburger-btn"');
  const hasDrawer = content.includes('id="mobileDrawer"');
  const hasOverlay = content.includes('id="mobileOverlay"') || content.includes('id="drawerOverlay"');
  const hasToggleScript = content.includes('toggleMobileMenu');

  console.log(`[${file}] -> Hamburger: ${hasHamburger}, Drawer: ${hasDrawer}, Overlay: ${hasOverlay}, ToggleScript: ${hasToggleScript}`);

  if (!hasHamburger || !hasDrawer || !hasOverlay || !hasToggleScript) {
    console.error(`FAILED CHECK: ${file} is missing required mobile menu components!`);
    failed = true;
  }
});

if (failed) {
  process.exit(1);
} else {
  console.log('ALL 9 HTML PAGES HAVE COMPLETE MOBILE MENU AND DRAWER COMPONENTS!');
}
