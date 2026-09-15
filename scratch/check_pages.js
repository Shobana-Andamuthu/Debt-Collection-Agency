const http = require('http');

const pages = [
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

console.log("Checking server response for all pages...");
pages.forEach(p => {
  http.get(`http://localhost:3003/${p}`, (res) => {
    console.log(`[${res.statusCode}] ${p}`);
  }).on('error', (err) => {
    console.error(`[ERR] ${p}: ${err.message}`);
  });
});
