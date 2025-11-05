#!/usr/bin/env node
/**
 * Generate a static export of the Express/EJS site without needing to bind a port.
 * Uses the real Express route handlers and renders the associated EJS templates.
 */

const fs = require('fs');
const path = require('path');

const app = require('../server');

const OUTPUT_DIR = path.join(__dirname, '..', 'dist');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const ROUTES = [
  { url: '/', file: 'index.html' },
  { url: '/bhojan-mitra', file: 'bhojan-mitra/index.html' },
  { url: '/pos-machine', file: 'pos-machine/index.html' },
  { url: '/pos-software', file: 'pos-software/index.html' },
  { url: '/restaurant-pos', file: 'restaurant-pos/index.html' },
  { url: '/pricing', file: 'pricing/index.html' },
  { url: '/business-plan', file: 'business-plan/index.html' },
  { url: '/about', file: 'about/index.html' },
  { url: '/training', file: 'training/index.html' },
  { url: '/support', file: 'support/index.html' },
  { url: '/contact', file: 'contact/index.html' },
  { url: '/sitemap.xml', file: 'sitemap.xml' },
  { url: '/robots.txt', file: 'robots.txt' }
];

function ensureDir(dir) {
  return fs.promises.mkdir(dir, { recursive: true });
}

async function clearOutput() {
  await fs.promises.rm(OUTPUT_DIR, { recursive: true, force: true }).catch(() => {});
  await ensureDir(OUTPUT_DIR);
}

async function copyPublic() {
  if (!fs.existsSync(PUBLIC_DIR)) return;
  await fs.promises.cp(PUBLIC_DIR, path.join(OUTPUT_DIR, 'public'), { recursive: true });
}

function findRouteHandlers(targetPath) {
  const stack = app._router?.stack || [];
  for (const layer of stack) {
    if (!layer.route) continue;
    const route = layer.route;
    const paths = Array.isArray(route.path) ? route.path : [route.path];
    if (paths.includes(targetPath)) {
      return route.stack.map((sub) => sub.handle);
    }
  }
  throw new Error(`Route not found for path: ${targetPath}`);
}

function createRequest(url) {
  return {
    method: 'GET',
    url,
    path: url,
    originalUrl: url,
    query: {},
    params: {},
    body: {},
    headers: {},
    get(name) {
      return this.headers[name?.toLowerCase()] || '';
    }
  };
}

function createResponse(app, resolve, reject) {
  const res = {
    statusCode: 200,
    headers: {},
    locals: {},
    _finished: false,
    status(code) {
      this.statusCode = code;
      return this;
    },
    set(field, value) {
      if (typeof field === 'string') {
        this.headers[field.toLowerCase()] = value;
      } else if (field && typeof field === 'object') {
        Object.entries(field).forEach(([k, v]) => {
          this.headers[k.toLowerCase()] = v;
        });
      }
      return this;
    },
    header(field, value) {
      return this.set(field, value);
    },
    type(value) {
      this.headers['content-type'] = value;
      return this;
    },
    setHeader(field, value) {
      this.headers[field.toLowerCase()] = value;
    },
    render(view, data = {}) {
      if (this._finished) return;
      app.render(view, data, (err, html) => {
        if (err) {
          console.warn(`Warning: failed to render view "${view}" (${err.message}). Skipping output.`);
          this._finished = true;
          return resolve(null);
        }
        this._finished = true;
        resolve(Buffer.from(html));
      });
    },
    send(content) {
      if (this._finished) return;
      this._finished = true;
      if (Buffer.isBuffer(content)) {
        resolve(content);
      } else if (typeof content === 'string') {
        resolve(Buffer.from(content));
      } else {
        resolve(Buffer.from(String(content)));
      }
    },
    json(obj) {
      this.type('application/json');
      this.send(JSON.stringify(obj, null, 2));
    },
    redirect(_statusOrUrl, maybeUrl) {
      const location = typeof _statusOrUrl === 'number' ? maybeUrl : _statusOrUrl;
      this.status(typeof _statusOrUrl === 'number' ? _statusOrUrl : 302);
      this.set('location', location);
      this.send(`Redirecting to ${location}`);
    }
  };
  return res;
}

function runHandlers(handlers, req, res, done, idx = 0) {
  if (idx >= handlers.length) {
    done();
    return;
  }
  try {
    handlers[idx](req, res, (err) => {
      if (err) return done(err);
      runHandlers(handlers, req, res, done, idx + 1);
    });
  } catch (err) {
    done(err);
  }
}

async function renderRoute(url) {
  const handlers = findRouteHandlers(url);
  const req = createRequest(url);
  return new Promise((resolve, reject) => {
    const res = createResponse(app, resolve, reject);
    runHandlers(handlers, req, res, (err) => {
      if (err) return reject(err);
      if (!res._finished) {
        return reject(new Error(`Route ${url} did not produce a response`));
      }
    });
  });
}

async function writeFile(relativePath, contents) {
  const outputPath = path.join(OUTPUT_DIR, relativePath);
  await ensureDir(path.dirname(outputPath));
  await fs.promises.writeFile(outputPath, contents);
}

async function build() {
  await clearOutput();

  for (const route of ROUTES) {
    console.log(`Rendering ${route.url}`);
    const contents = await renderRoute(route.url);
    if (contents === null) {
      console.warn(`Skipped ${route.url} (no content generated).`);
      continue;
    }
    await writeFile(route.file, contents);
  }

  await copyPublic();
  console.log(`Static build complete in ${OUTPUT_DIR}`);
}

build().catch((err) => {
  console.error('Static build failed:', err);
  process.exit(1);
});
