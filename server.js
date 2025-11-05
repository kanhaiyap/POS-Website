const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const SITE_URL = 'https://aarohitavigyan.com';
const DEFAULT_DESCRIPTION = 'Bhojan Mitra is a voice-led POS suite that blends AI ordering, multilingual support, analytics, and IoT routing for restaurants.';
const DEFAULT_KEYWORDS = 'restaurant POS, POS system, voice POS, AI POS, Bhojan Mitra, POS machine India';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/logo.png`;

const enrichSeo = (data = {}) => {
  const keywords = Array.isArray(data.keywords) ? data.keywords.join(', ') : data.keywords;
  return {
    ...data,
    title: data.title || 'Bhojan Mitra — AI + IoT Voice-enabled POS for Restaurants',
    description: data.description || DEFAULT_DESCRIPTION,
    keywords: keywords || DEFAULT_KEYWORDS,
    canonicalUrl: data.canonicalUrl || SITE_URL,
    robots: data.robots || 'index, follow',
    ogImage: data.ogImage || DEFAULT_OG_IMAGE,
    ogType: data.ogType || 'website'
  };
};

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"]
    }
  }
}));

// Compression middleware for faster loading
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1y',
  etag: false
}));

// Body parsing middleware for forms and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Canonical host enforcement middleware (useful in production)
// Redirects requests to the configured SITE_URL when the Host header doesn't match.
// Disable in development by setting NODE_ENV=development or ENFORCE_CANONICAL=false
app.use((req, res, next) => {
  try {
    const enforce = (process.env.ENFORCE_CANONICAL || 'true').toLowerCase();
    if (process.env.NODE_ENV === 'development' || enforce === 'false') return next();
    const host = (req.get('host') || '').toLowerCase();
    // If host already includes the canonical domain, continue
    if (host.includes(new URL(SITE_URL).hostname) || host.includes('localhost')) return next();
    // Redirect to canonical
    const target = SITE_URL + req.originalUrl;
    return res.redirect(301, target);
  } catch (err) {
    return next();
  }
});

// Routes
app.get('/', (req, res) => {
  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Bhojan Mitra",
    "description": "AI + IoT voice-enabled POS software for restaurants. Customers can speak orders. Multilingual and analytics-ready.",
    "brand": {
      "@type": "Brand",
      "name": "Aarohita Vigyan"
    },
    "offers": {
      "@type": "AggregateOffer",
      "offers": [
        { "@type": "Offer", "name": "Simple Billing", "price": "250", "priceCurrency": "INR" },
        { "@type": "Offer", "name": "Analytics + QR Ordering", "price": "500", "priceCurrency": "INR" },
        { "@type": "Offer", "name": "Voice-enabled Ordering", "price": "5000", "priceCurrency": "INR" }
      ]
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What makes Bhojan Mitra different from other POS systems?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bhojan Mitra is voice-first. Orders can be spoken in multiple Indian languages, modifiers are captured automatically, and IoT routing sends tickets to the right kitchen station without manual steps."
        }
      },
      {
        "@type": "Question",
        "name": "Can Bhojan Mitra replace my existing POS machine?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We provide a browser-based POS, dedicated hardware, and integrations to your existing printers and displays. During the pilot we map your current workflow and ensure continuity."
        }
      },
      {
        "@type": "Question",
        "name": "How long does pilot onboarding take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most restaurants go live within four weeks. Week one focuses on configuration, week two on training, and weeks three-four on shadow runs before the full switch."
        }
      },
      {
        "@type": "Question",
        "name": "Does the POS work if the internet drops?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Bhojan Mitra buffers voice transcripts locally and syncs once connectivity returns. Kitchen routing rules remain active so orders continue to print."
        }
      }
    ]
  };

  const seo = enrichSeo({
    title: 'Bhojan Mitra — AI + IoT Voice-enabled POS for Restaurants',
    description: 'Bhojan Mitra is an AI + IoT voice-enabled POS system built for restaurants. Multilingual voice ordering, AI recommendations, analytics and simple pricing with no hidden charges. Plans: ₹250 (simple billing), ₹500 (analytics + QR ordering), ₹5,000 (voice-enabled ordering).',
    keywords: 'Bhojan Mitra, AI POS, voice ordering, multilingual POS, restaurant POS, AI POS software, IoT POS',
    canonicalUrl: `${SITE_URL}/`,
    structuredData: [productStructuredData, faqStructuredData]
  });
  
  res.render('index', { seo });
});

app.get('/bhojan-mitra', (req, res) => {
  const seo = enrichSeo({
    title: 'Bhojan Mitra - AI + IoT Voice Ordering POS',
    description: 'Bhojan Mitra is an AI-enabled, IoT-connected POS that accepts voice orders in multiple languages. Subscription and device options are available — contact us for details and demos.',
    keywords: 'Bhojan Mitra, voice-enabled POS, AI POS, multilingual POS, IoT POS',
    canonicalUrl: `${SITE_URL}/bhojan-mitra`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Bhojan Mitra",
      "description": "AI + IoT voice-enabled POS for restaurants. Speak to order, supports multiple languages. Contact us for pricing and deployment options."
    }
  });

  res.render('pos-machine', { seo });
});

app.get('/pos-machine', (req, res) => {
  const seo = enrichSeo({
    title: 'POS Machine — Bhojan Mitra Voice-enabled Ordering Device',
    description: 'Explore the Bhojan Mitra POS machine: voice-first hardware and software built for restaurants. Join the pilot to receive hardware credits and founders-led onboarding.',
    keywords: 'POS machine, voice POS hardware, Bhojan Mitra device, restaurant POS machine',
    canonicalUrl: `${SITE_URL}/pos-machine`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Bhojan Mitra POS Machine",
      "description": "Voice-enabled POS hardware with AI-powered ordering and IoT routing for restaurants.",
      "brand": {
        "@type": "Brand",
        "name": "Bhojan Mitra"
      }
    }
  });

  res.render('pos-machine', { seo });
});

app.get('/pos-software', (req, res) => {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Bhojan Mitra POS Software",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "250",
      "priceCurrency": "INR"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does the software work with my existing POS hardware?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Bhojan Mitra runs on browsers, tablets, and our dedicated POS machine. We map printers and kitchen displays so you can migrate without downtime."
        }
      },
      {
        "@type": "Question",
        "name": "Can I manage multiple outlets in one dashboard?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Multi-location controls are included in the pilot. You can segment menus, pricing, and analytics per outlet while sharing a single account."
        }
      },
      {
        "@type": "Question",
        "name": "Is Bhojan Mitra POS software GST compliant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We generate GST-ready invoices, support custom tax slabs, and export data that plugs straight into your accounting workflow."
        }
      }
    ]
  };

  const seo = enrichSeo({
    title: 'Bhojan Mitra — AI POS Software for Restaurants',
    description: 'Bhojan Mitra software provides voice-first ordering, AI recommendations, and IoT routing for restaurants. Designed to reduce order times and increase revenue.',
    keywords: 'Bhojan Mitra, AI POS software, voice ordering POS, restaurant POS software',
    canonicalUrl: `${SITE_URL}/pos-software`,
    structuredData: [softwareSchema, faqSchema]
  });
  
  res.render('pos-software', { seo });
});

app.get('/restaurant-pos', (req, res) => {
  const seo = enrichSeo({
    title: 'Restaurant POS System - Food Service Point of Sale',
    description: 'Specialized restaurant POS systems with kitchen display, order management, and table service features. Perfect for cafes, restaurants, and food trucks.',
    keywords: 'restaurant POS, food service POS, kitchen display system, restaurant point of sale',
    canonicalUrl: `${SITE_URL}/restaurant-pos`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Restaurant POS Solutions",
      "url": `${SITE_URL}/restaurant-pos`
    }
  });
  
  res.render('restaurant-pos', { seo });
});

app.get('/pricing', (req, res) => {
  const seo = enrichSeo({
    title: 'Pricing - Bhojan Mitra AI POS Subscription & Device Options',
    description: 'Pricing for Bhojan Mitra: ₹250/month subscription (no hidden charges). Analytics ₹500 per restaurant. One-time device or enterprise subscription options at ₹5,000.',
    keywords: 'Bhojan Mitra pricing, AI POS pricing, voice POS cost, Bhojan Mitra subscription',
    canonicalUrl: `${SITE_URL}/pricing`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      "name": "Bhojan Mitra Pricing",
      "itemListElement": [
        { "@type": "Offer", "name": "Simple Billing Plan", "price": "250", "priceCurrency": "INR" },
        { "@type": "Offer", "name": "Analytics + QR Ordering", "price": "500", "priceCurrency": "INR" },
        { "@type": "Offer", "name": "Voice-enabled Ordering", "price": "5000", "priceCurrency": "INR" }
      ]
    }
  });

  res.render('pricing', { seo });
});

app.get('/business-plan', (req, res) => {
  const seo = enrichSeo({
    title: 'Bhojan Mitra Business Plan & Investor Overview',
    description: 'Review the Bhojan Mitra business plan: vision, roadmap, business model, and founding team. Learn how we are building voice-first POS with early partners.',
    keywords: 'Bhojan Mitra business plan, investor overview, AI POS startup',
    canonicalUrl: `${SITE_URL}/business-plan`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Report",
      "name": "Bhojan Mitra Business Plan",
      "url": `${SITE_URL}/business-plan`,
      "creator": {
        "@type": "Organization",
        "name": "Aarohita Vigyan"
      }
    }
  });

  res.render('business-plan', { seo });
});

app.get('/about', (req, res) => {
  const seo = enrichSeo({
    title: 'About Aarohita Vigyan — Team behind Bhojan Mitra',
    description: 'Meet the founders building Bhojan Mitra, a voice-first POS platform for restaurants. Learn about our mission and how we collaborate with early partners.',
    keywords: 'Aarohita Vigyan, Bhojan Mitra team, POS founders',
    canonicalUrl: `${SITE_URL}/about`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Aarohita Vigyan",
      "url": `${SITE_URL}`,
      "brand": "Bhojan Mitra"
    }
  });

  res.render('about', { seo });
});

app.get('/training', (req, res) => {
  const seo = enrichSeo({
    title: 'Bhojan Mitra Training & Enablement',
    description: 'Discover Bhojan Mitra training programs for service teams, kitchen staff, and managers. Founding partners receive live workshops and on-shift support.',
    keywords: 'Bhojan Mitra training, POS onboarding, restaurant enablement',
    canonicalUrl: `${SITE_URL}/training`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Bhojan Mitra POS Training",
      "provider": {
        "@type": "Organization",
        "name": "Aarohita Vigyan"
      }
    }
  });

  res.render('training', { seo });
});

app.get('/support', (req, res) => {
  const seo = enrichSeo({
    title: 'Bhojan Mitra Support — Pilot Assistance & Escalations',
    description: 'Get help from the Bhojan Mitra team. Founding partners access founders-led support channels, hotline, knowledge base, and on-site visits.',
    keywords: 'Bhojan Mitra support, POS support, pilot assistance',
    canonicalUrl: `${SITE_URL}/support`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Bhojan Mitra Support",
      "provider": {
        "@type": "Organization",
        "name": "Aarohita Vigyan"
      }
    }
  });

  res.render('support', { seo });
});


// Contact form (GET)
app.get('/contact', (req, res) => {
  const keywordPool = [
    'petpooja','petpooja login','petpooja dashboard','petpooja payroll login',
    'restaurant billing software','restaurant POS software','restaurant management software','restaurant inventory management software',
    'inventory management software','point of sale system','restaurant CRM software','restaurant analytics software',
    'posist','posist login','posist pricing','restroworks POS','cloud restaurant management software','cloud kitchen software','restaurant POS system','food business POS','point of sale software',
    'EZO billing machine','EZO POS','EZO app','Ezobooks','restaurant billing machine','restaurant billing app','POS machine for restaurant','cafe billing machine','billing machine for shop','GST billing software','billing app for small business','POS machine','retail billing software','accounting software','invoice generator','billing software for SMEs'
  ];

  const seo = enrichSeo({
    title: 'Contact / Book Demo - Bhojan Mitra',
    description: 'Contact Aarohita Vigyan to book a demo of Bhojan Mitra voice-enabled ordering or get enterprise pricing for voice solutions. Compare Bhojan Mitra with Petpooja, Posist and EZO POS alternatives for restaurants and billing solutions.',
    keywords: keywordPool,
    canonicalUrl: `${SITE_URL}/contact`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Bhojan Mitra",
      "url": `${SITE_URL}/contact`
    }
  });

  const showSuccess = req.query && req.query.sent === '1';
  res.render('contact', { seo, errors: null, form: {}, showSuccess });
});

// Contact form (POST) - simple validation and store
app.post('/contact', (req, res) => {
  const { name, email, phone, restaurant, plan, message } = req.body || {};
  const errors = [];

  if (!name || name.trim().length < 2) errors.push('Name is required');
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push('Valid email is required');
  if (!restaurant || restaurant.trim().length < 2) errors.push('Restaurant name is required');
  const allowedPlans = ['250', '500', '5000'];
  if (!plan || !allowedPlans.includes(plan)) errors.push('Please select a valid plan');

  if (errors.length) {
    const seo = enrichSeo({
      title: 'Contact / Book Demo - Bhojan Mitra',
      description: 'Contact Aarohita Vigyan to book a demo of Bhojan Mitra voice-enabled ordering or get enterprise pricing for voice solutions.',
      keywords: 'Bhojan Mitra contact, book demo, voice POS demo, enterprise POS',
      canonicalUrl: `${SITE_URL}/contact`
    });
    return res.status(400).render('contact', { seo, errors, form: req.body });
  }

  // Persist submission to a newline-delimited JSON file
  const fs = require('fs');
  const pathData = path.join(__dirname, 'data');
  try {
    if (!fs.existsSync(pathData)) fs.mkdirSync(pathData);
    const out = {
      receivedAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      phone: (phone || '').trim(),
      restaurant: restaurant.trim(),
      plan: plan,
      message: (message || '').trim()
    };
    fs.appendFileSync(path.join(pathData, 'contacts.jsonl'), JSON.stringify(out) + '\n');
  } catch (err) {
    console.error('Failed to save contact submission', err);
  }
  // Redirect back to contact with a success flag so the page can show a confirmation.
  return res.redirect('/contact?sent=1');
});

// API endpoint for contact form (AJAX)
app.post('/api/contact', (req, res) => {
  const { name, email, phone, restaurant, plan, message } = req.body || {};
  const errors = [];

  if (!name || name.trim().length < 2) errors.push('Name is required');
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push('Valid email is required');
  if (!restaurant || restaurant.trim().length < 2) errors.push('Restaurant name is required');
  const allowedPlans = ['250', '500', '5000'];
  if (!plan || !allowedPlans.includes(plan)) errors.push('Please select a valid plan');

  if (errors.length) {
    return res.status(400).json({ success: false, errors });
  }

  // Persist submission to a newline-delimited JSON file
  const fs = require('fs');
  const pathData = path.join(__dirname, 'data');
  try {
    if (!fs.existsSync(pathData)) fs.mkdirSync(pathData);
    const out = {
      receivedAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      phone: (phone || '').trim(),
      restaurant: restaurant.trim(),
      plan: plan,
      message: (message || '').trim()
    };
    fs.appendFileSync(path.join(pathData, 'contacts.jsonl'), JSON.stringify(out) + '\n');
  } catch (err) {
    console.error('Failed to save contact submission (api)', err);
    return res.status(500).json({ success: false, errors: ['Failed to save submission'] });
  }

  return res.json({ success: true, message: 'Thanks — we will contact you shortly' });
});

// Lightweight lead capture for demo interest (email-only)
app.post('/api/lead', (req, res) => {
  const { name, email, message } = req.body || {};
  const errors = [];
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push('Valid email is required');
  if (errors.length) return res.status(400).json({ success: false, errors });

  const fs = require('fs');
  const pathData = path.join(__dirname, 'data');
  try {
    if (!fs.existsSync(pathData)) fs.mkdirSync(pathData);
    const out = {
      receivedAt: new Date().toISOString(),
      name: (name || '').trim(),
      email: email.trim(),
      message: (message || 'Demo interest').trim()
    };
    fs.appendFileSync(path.join(pathData, 'leads.jsonl'), JSON.stringify(out) + '\n');
  } catch (err) {
    console.error('Failed to save lead', err);
    return res.status(500).json({ success: false, errors: ['Failed to save lead'] });
  }

  return res.json({ success: true, message: 'Thanks — we received your interest. We will contact you shortly.' });
});

// Simple health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Sitemap
app.get('/sitemap.xml', (req, res) => {
  const { SitemapStream, streamToPromise } = require('sitemap');
  const { Readable } = require('stream');

  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/bhojan-mitra', changefreq: 'weekly', priority: 0.9 },
    { url: '/pos-machine', changefreq: 'weekly', priority: 0.85 },
    { url: '/pos-software', changefreq: 'weekly', priority: 0.8 },
    { url: '/restaurant-pos', changefreq: 'weekly', priority: 0.8 },
    { url: '/pricing', changefreq: 'weekly', priority: 0.9 },
    { url: '/about', changefreq: 'monthly', priority: 0.6 },
    { url: '/training', changefreq: 'monthly', priority: 0.6 },
    { url: '/support', changefreq: 'monthly', priority: 0.6 },
    { url: '/contact', changefreq: 'monthly', priority: 0.7 }
  ];

  const stream = new SitemapStream({ hostname: 'https://aarohitavigyan.com' });
  
  res.header('Content-Type', 'application/xml');
  
  streamToPromise(Readable.from(links).pipe(stream)).then((data) => {
    res.send(data.toString());
  });
});

// Robots.txt
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Sitemap: https://aarohitavigyan.com/sitemap.xml`);
});

app.listen(PORT, () => {
  console.log(`SEO-optimized POS website running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
