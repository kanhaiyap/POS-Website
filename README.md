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
HOST=your.hostinger.tld USER=deploy TARGET=/home/deploy/app ./scripts/deploy.sh
```

By default this pushes the current branch to your `origin` remote, then rsyncs the workspace to the Hostinger `TARGET` over SSH. Configure `PORT` (default `65002`), `SSH_KEY`, `REMOTE`, or `BRANCH` as needed. To skip the Git push for a one-off run, set `SKIP_GIT=1`.


Override any of these by exporting a different value when you run the script.

## Contact

If you want, I can:

- Add a contact form and SMTP/email handling
- Integrate a demo voice flow (prototype) using a speech-to-text API
- Add server-side unit tests and health checks

Let me know which next step you'd like.
