#!/usr/bin/env node
/**
 * Static export for Hostinger (Apache).
 *
 * Boots the Express app on a random port, reads /sitemap.xml to discover every page,
 * and writes each one as a flat .html file (/pricing -> dist/pricing.html,
 * /blog/foo -> dist/blog/foo.html). Links inside pages stay clean (/pricing);
 * public/.htaccess maps clean URLs to these .html files.
 */

process.env.ENFORCE_CANONICAL = 'false';

const fs = require('fs');
const path = require('path');
const http = require('http');

const app = require('../server');

const OUTPUT_DIR = path.join(__dirname, '..', 'dist');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const EXTRA_FILES = ['/sitemap.xml', '/robots.txt', '/llms.txt'];
const EXTRA_PAGES = ['/review']; // rendered as .html but kept out of the sitemap

function get(port, urlPath) {
  return new Promise((resolve, reject) => {
    http.get({ host: '127.0.0.1', port, path: urlPath }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        if (res.statusCode !== 200) return reject(new Error(`${urlPath} -> HTTP ${res.statusCode}`));
        resolve(Buffer.concat(chunks));
      });
    }).on('error', reject);
  });
}

function outputFileFor(urlPath) {
  if (urlPath === '/') return 'index.html';
  return urlPath.replace(/^\//, '').replace(/\/$/, '') + '.html';
}

async function write(relativePath, contents) {
  const target = path.join(OUTPUT_DIR, relativePath);
  await fs.promises.mkdir(path.dirname(target), { recursive: true });
  await fs.promises.writeFile(target, contents);
}

async function build() {
  const server = app.listen(0, '127.0.0.1');
  await new Promise((r) => server.once('listening', r));
  const { port } = server.address();

  try {
    await fs.promises.rm(OUTPUT_DIR, { recursive: true, force: true });
    await fs.promises.cp(PUBLIC_DIR, OUTPUT_DIR, { recursive: true });

    const sitemap = (await get(port, '/sitemap.xml')).toString();
    const pages = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]);

    for (const urlPath of pages) {
      await write(outputFileFor(urlPath), await get(port, urlPath));
      console.log(`✓ ${urlPath}`);
    }
    for (const urlPath of EXTRA_PAGES) {
      await write(outputFileFor(urlPath), await get(port, urlPath));
      console.log(`✓ ${urlPath}`);
    }
    for (const urlPath of EXTRA_FILES) {
      await write(urlPath.slice(1), await get(port, urlPath));
      console.log(`✓ ${urlPath}`);
    }
    console.log(`Static build complete: ${pages.length} pages in ${OUTPUT_DIR}`);
  } finally {
    server.close();
  }
}

build().catch((err) => {
  console.error('Static build failed:', err);
  process.exit(1);
});
