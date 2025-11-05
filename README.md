# Bhojan Mitra — AI + IoT Voice-enabled POS for Restaurants

This repository contains a fast, SEO-optimized Node.js website (Express + EJS) for Bhojan Mitra — an AI and IoT enabled, voice-first POS software built for restaurants. The site is targeted to rank for restaurant POS keywords related to voice ordering, multilingual support, AI recommendations, and analytics.

Website: https://aarohitavigyan.com

## Highlights

- Voice ordering (multilingual)
- AI upsells and menu intelligence
- IoT kitchen integrations and automated routing
-- Analytics + QR ordering add-on: ₹500 per restaurant
-- Simple billing subscription: ₹250/month (no hidden fees)
-- Voice-enabled ordering (premium): ₹5,000 (one-time or subscription)

## Quick Start

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Run production server:
```bash
npm start
```

Generate a static export (writes to `dist/`):
```bash
npm run build
```

## Project Structure

```
POS-Website/
├── server.js              # Main Express server and routes
├── package.json           # Dependencies and scripts
├── views/                 # EJS templates (homepage, product, features, pricing)
├── public/                # Static assets (css, js, images)
└── .github/               # Copilot instructions
```

## Pages

1. `/` — Homepage (promotes Bhojan Mitra, voice-first POS for restaurants)
2. `/bhojan-mitra` — Product page (features and capabilities)
3. `/pos-software` — Features (AI, voice, IoT)
4. `/pricing` — Pricing (subscription, analytics, device options)
5. `/sitemap.xml` and `/robots.txt` — SEO helpers

## SEO & Performance Notes

- Server-side rendering with EJS for fast crawls
- JSON-LD structured data included for product and offers
- Sitemap and robots configured for `aarohitavigyan.com`
- Critical CSS inlined and assets compressed for performance
- Mobile-responsive design

## Customize for Launch

1. Replace placeholder images in `public/images/` and update Open Graph images
2. Set real contact, support, and legal pages (About / Privacy / Terms)
3. Add Google Analytics / Search Console verification and submit sitemap
4. Configure domain DNS and deploy to your hosting of choice

## Deployment

Deploy straight to GitHub and Hostinger with the helper script:

```bash
DEPLOY_HOST=your.hostinger.tld DEPLOY_USER=deploy DEPLOY_TARGET=/home/deploy/app ./scripts/deploy.sh
```

The script pushes the current branch to `origin`, then stages a clean bundle in a temp directory: it copies the repo (without `.git`), runs `npm ci`, executes `npm run build` (static renderer that writes to `dist/`), prunes dev dependencies, and finally rsyncs the generated `dist/` folder to your Hostinger `DEPLOY_TARGET`. Remote install/restart commands are skipped by default so the static bundle works on simple FTP hosting.

Useful toggles:

- `SKIP_GIT=1` — deploy without pushing to GitHub.
- `AUTO_COMMIT=0` — skip the automatic commit; require a clean working tree instead.
- `COMMIT_MESSAGE="..."` — custom message for the auto-generated commit.
- `SKIP_NPM_INSTALL=1` — skip the local `npm ci` (assumes the bundle directory already has dependencies).
- `SKIP_BUILD=1` — skip `npm run build --if-present`.
- `RUN_REMOTE_COMMANDS=1` — run the remote npm install / pm2 restart after upload (only needed if you enable Node on the server).
- `EXCLUDE_NODE_MODULES=1` — upload everything except `node_modules` (defaults to 1 because the static build has no runtime dependencies).

If you’re using the shared Hostinger account, the script already defaults to:

- `DEPLOY_HOST=217.21.94.162`
- `DEPLOY_USER=u222466996`
- `DEPLOY_TARGET=public_html`
- `DEPLOY_PORT=65002`

Override any of these by exporting a different value when you run the script.

> **Note:** The static build writes the contact form markup, but submitting the form still requires a backend. Enable the Express app on Hostinger (Node.js App in hPanel) or hook the form to an external service if you need live submissions.

## Contact

If you want, I can:

- Email: kanhaiya@aarohitavigyan.com
