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
# Bhojan Mitra — AI + IoT Voice-enabled POS Website

SEO-optimized marketing website for Bhojan Mitra, a voice-first POS system for restaurants.

## 🚀 Live Site
**https://aarohitavigyan.com/**

## 📋 Features

### SEO Optimization
- ✅ Comprehensive meta tags (Open Graph, Twitter Cards, schema.org)
- ✅ Structured data (Organization, Product, FAQ, LocalBusiness schemas)
- ✅ XML sitemap with lastmod dates
- ✅ Enhanced robots.txt with bot-specific rules
- ✅ Canonical URLs on all pages
- ✅ Alt text on all images with lazy loading
- ✅ Semantic HTML5 structure
- ✅ Mobile-first responsive design
- ✅ .htaccess optimizations (compression, caching, security headers)
- ✅ Hreflang tags for international SEO
- ✅ Fast page load (compression, minification, resource hints)

### Technical Stack
- **Backend:** Node.js + Express
- **Templates:** EJS (server-side rendering)
- **Build:** Static site generation (pre-rendered HTML)
- **Hosting:** Hostinger shared hosting
- **Deployment:** Automated via GitHub + rsync

## 🛠️ Local Development

### Prerequisites
- Node.js 16+ 
- npm 7+

### Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000
```

### Project Structure
```
POS-Website/
├── server.js              # Express server & routes
├── views/                 # EJS templates
│   ├── partials/         # Reusable components
│   ├── index.ejs         # Homepage
│   ├── pos-software.ejs  # Product pages
│   └── ...
├── public/               # Static assets
│   ├── css/
│   ├── js/
│   ├── images/
│   └── .htaccess         # Apache config
├── scripts/
│   ├── build_static.js   # Static site generator
│   ├── deploy.sh         # Main deploy script
│   └── deploy_hostinger.sh
└── data/
    ├── contacts.jsonl    # Contact form submissions
    └── leads.jsonl       # Demo interest leads
```

## 📦 Deployment

### Quick Deploy
```bash
# Deploy to Hostinger (builds + uploads)
./scripts/deploy.sh
```

### Deploy Flow
1. Auto-commits pending changes
2. Pushes to GitHub
3. Creates temp build directory
4. Installs dependencies
5. Runs static site build (EJS → HTML)
6. Uploads to `domains/aarohitavigyan.com/public_html` via rsync
7. Cleans up temp files

### Manual Deploy Steps
```bash
# 1. Build static site
npm run build

# 2. Upload to Hostinger
HOST=217.21.94.162 USER=u222466996 PORT=65002 TARGET=domains/aarohitavigyan.com/public_html ./scripts/deploy_hostinger.sh
```

## 🔍 SEO Checklist

### On-Page SEO ✅
- [x] Unique title tags (50-60 chars)
- [x] Meta descriptions (150-160 chars)
- [x] H1 tag on every page (unique)
- [x] Proper heading hierarchy (H1→H2→H3)
- [x] Alt text on images
- [x] Internal linking structure
- [x] Mobile-responsive
- [x] Fast page load (<3s)
- [x] HTTPS enabled
- [x] Clean URLs (no parameters)

### Technical SEO ✅
- [x] XML sitemap submitted
- [x] Robots.txt configured
- [x] Canonical tags
- [x] Structured data (JSON-LD)
- [x] Open Graph tags
- [x] Twitter Cards
- [x] 301 redirects for old URLs
- [x] No broken links
- [x] Compressed assets (gzip)
- [x] Browser caching enabled

### Off-Page SEO 📝
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Create Google My Business listing
- [ ] Build backlinks
- [ ] Social media presence

## 🎯 Target Keywords

Primary:
- restaurant POS system
- AI POS software
- voice ordering POS
- Bhojan Mitra
- point of sale system India

Secondary:
- multilingual POS
- IoT kitchen integration
- restaurant management software
- POS machine for restaurants

Long-tail:
- voice-enabled ordering system for restaurants
- AI-powered restaurant POS India
- affordable POS software with analytics

## 📊 Analytics & Tracking

### Current Implementation
- Basic lead capture (email collection)
- Contact form submissions stored in `data/contacts.jsonl`
- Demo interest tracking in `data/leads.jsonl`
- LocalStorage counter for demo interest

### Recommended Additions
```html
<!-- Add to views/partials/head.ejs -->
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>

<!-- Google Tag Manager -->
<!-- Microsoft Clarity -->
<!-- Facebook Pixel (if running ads) -->
```

## 🔐 Security

Current security headers (via .htaccess):
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy restrictions

## 🚀 Performance Optimization

### Current Optimizations
- Gzip compression enabled
- Static asset caching (1 year for images, 1 month for CSS/JS)
- Resource hints (preconnect, dns-prefetch)
- Lazy loading images
- Minified CSS/JS (production build)

### Core Web Vitals Targets
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms  
- CLS (Cumulative Layout Shift): < 0.1

## 📞 Contact & Support

For issues or questions:
- Email: contact@aarohitavigyan.com
- Website: https://aarohitavigyan.com/contact

## 📄 License

Proprietary - Aarohita Vigyan © 2024-2025
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
