const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');

// Start the server temporarily
process.env.PORT = 3001;
const app = require('./server');

const routes = [
  { url: '/', file: 'index.html' },
  { url: '/pos-machine', file: 'pos-machine.html' },
  { url: '/pos-software', file: 'pos-software.html' },
  { url: '/multilingual', file: 'multilingual.html' },
  { url: '/voice-ordering', file: 'voice-ordering.html' },
  { url: '/restaurant-pos', file: 'restaurant-pos.html' },
  { url: '/pricing', file: 'pricing.html' },
  { url: '/business-plan', file: 'business-plan.html' },
  { url: '/about', file: 'about.html' },
  { url: '/training', file: 'training.html' },
  { url: '/support', file: 'support.html' },
  { url: '/contact', file: 'contact.html' },
  { url: '/sitemap.xml', file: 'sitemap.xml' },
  { url: '/robots.txt', file: 'robots.txt' },
];

const DIST = path.join(__dirname, 'dist');
if (!fs.existsSync(DIST)) fs.mkdirSync(DIST);

function fetch(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3001${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function build() {
  console.log('Building static files...');
  for (const route of routes) {
    const html = await fetch(route.url);
    fs.writeFileSync(path.join(DIST, route.file), html);
    console.log(`✓ ${route.file}`);
  }

  // Copy public assets
  const publicDir = path.join(__dirname, 'public');
  copyDir(publicDir, DIST);
  console.log('✓ Copied public assets');
  console.log('\nDone! Files in ./dist/');
  process.exit(0);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

setTimeout(build, 1000);
