require('dotenv').config();
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const SITE_URL = 'https://aarohitavigyan.com';
const DEFAULT_DESCRIPTION = 'Bhojan Mitra is a voice-led POS suite that blends AI ordering, multilingual support, analytics, and IoT routing for restaurants.';
const DEFAULT_KEYWORDS = 'restaurant POS, POS system, voice POS, AI POS, Bhojan Mitra, POS machine India';

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'your-email@gmail.com',
    pass: process.env.SMTP_PASS || 'your-app-password'
  }
});

// Email template function
function sendContactEmail(contactData) {
  const mailOptions = {
    from: process.env.SMTP_USER || 'your-email@gmail.com',
    to: 'kanhaiya@aarohitavigyan.com',
    subject: `New Contact Request - ${contactData.name} (${contactData.plan} plan)`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Received:</strong> ${contactData.receivedAt}</p>
      <hr>
      <p><strong>Name:</strong> ${contactData.name}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
      <p><strong>Restaurant:</strong> ${contactData.restaurant}</p>
      <p><strong>Plan Selected:</strong> ${contactData.plan}</p>
      <p><strong>Message:</strong></p>
      <p>${contactData.message || 'No message provided'}</p>
      <hr>
      <p><small>This email was sent from the contact form at ${SITE_URL}/contact</small></p>
    `,
    text: `
New Contact Form Submission
Received: ${contactData.receivedAt}

Name: ${contactData.name}
Email: ${contactData.email}
Phone: ${contactData.phone || 'Not provided'}
Restaurant: ${contactData.restaurant}
Plan Selected: ${contactData.plan}
Message: ${contactData.message || 'No message provided'}

This email was sent from the contact form at ${SITE_URL}/contact
    `
  };

  return transporter.sendMail(mailOptions);
}
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/logo.png`;

// Global Organization Schema for all pages
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Aarohita Vigyan",
  "legalName": "Aarohita Vigyan",
  "url": SITE_URL,
  "logo": `${SITE_URL}/images/logo.png`,
  "foundingDate": "2024",
  "founders": [{
    "@type": "Person",
    "name": "Kunwar Kanhaiya Pandey"
  }],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "contactPoint": [{
    "@type": "ContactPoint",
    "contactType": "Sales",
    "url": `${SITE_URL}/contact`
  }, {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "url": `${SITE_URL}/support`
  }],
  "sameAs": [
    `${SITE_URL}`
  ],
  "brand": {
    "@type": "Brand",
    "name": "Bhojan Mitra"
  },
  "description": "Developer of AI-powered voice-enabled POS systems for restaurants",
  "knowsAbout": ["Restaurant POS Systems", "Voice Ordering Technology", "AI for Hospitality", "IoT Kitchen Integration"],
  "makesOffer": {
    "@type": "Offer",
    "itemOffered": {
      "@type": "Product",
      "name": "Bhojan Mitra POS Software"
    }
  }
};

const buildBreadcrumbs = (crumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": crumbs.map((c, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": c.name,
    "item": c.url
  }))
});

const enrichSeo = (data = {}) => {
  const keywords = Array.isArray(data.keywords) ? data.keywords.join(', ') : data.keywords;
  
  // Merge organization schema with page-specific schemas
  const pageSchemas = data.structuredData 
    ? (Array.isArray(data.structuredData) ? data.structuredData : [data.structuredData])
    : [];
  const allSchemas = [organizationSchema, ...pageSchemas];
  
  return {
    ...data,
    title: data.title || 'Bhojan Mitra — AI + IoT Voice-enabled POS for Restaurants',
    description: data.description || DEFAULT_DESCRIPTION,
    keywords: keywords || DEFAULT_KEYWORDS,
    canonicalUrl: data.canonicalUrl || SITE_URL,
    robots: data.robots || 'index, follow',
    ogImage: data.ogImage || DEFAULT_OG_IMAGE,
    ogType: data.ogType || 'website',
    structuredData: allSchemas
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

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files — served before rate limiter so assets are never throttled
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '0',
  etag: true
}));

// Rate limiting — applied after static files so CSS/JS/images are never throttled
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500 // 500 page/API requests per 15 min per IP
});
app.use(limiter);

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
      },
      {
        "@type": "Question",
        "name": "Which languages does voice ordering support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bhojan Mitra currently supports Hindi, Tamil, Telugu, Kannada, Marathi, and Bengali, with more regional languages being added each quarter. The system auto-detects the speaker's language so staff need no extra training."
        }
      },
      {
        "@type": "Question",
        "name": "Is the billing GST-compliant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Every invoice generated by Bhojan Mitra includes GSTIN, HSN/SAC codes, and itemised tax breakdowns in the format required by GST regulations. Reports can be exported directly for filing."
        }
      },
      {
        "@type": "Question",
        "name": "What hardware do I need to get started?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Any Android tablet or Windows machine running a modern browser works for the software POS. For a full hardware setup, we supply a purpose-built touchscreen terminal, thermal receipt printer, and IoT kitchen display — all configured and shipped to your restaurant."
        }
      },
      {
        "@type": "Question",
        "name": "Can I view sales analytics in real time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The Bhojan Mitra dashboard shows live order volume, item-level sales, and peak-hour trends. Shift summaries and daily reports are generated automatically and can be emailed or exported as CSV."
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
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Bhojan Mitra",
        "description": "AI + IoT voice-enabled POS for restaurants. Speak to order, supports multiple languages. Contact us for pricing and deployment options."
      },
      buildBreadcrumbs([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Bhojan Mitra', url: `${SITE_URL}/bhojan-mitra` }
      ])
    ]
  });

  res.render('pos-machine', { seo });
});

app.get('/pos-machine', (req, res) => {
  const seo = enrichSeo({
    title: 'POS Machine — Bhojan Mitra Voice-enabled Ordering Device',
    description: 'Explore the Bhojan Mitra POS machine: voice-first hardware and software built for restaurants. Join the pilot to receive hardware credits and founders-led onboarding.',
    keywords: 'POS machine, voice POS hardware, Bhojan Mitra device, restaurant POS machine',
    canonicalUrl: `${SITE_URL}/pos-machine`,
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Bhojan Mitra POS Machine",
        "description": "Voice-enabled POS hardware with AI-powered ordering and IoT routing for restaurants.",
        "brand": {
          "@type": "Brand",
          "name": "Bhojan Mitra"
        }
      },
      buildBreadcrumbs([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'POS Machine', url: `${SITE_URL}/pos-machine` }
      ])
    ]
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
    structuredData: [softwareSchema, faqSchema, buildBreadcrumbs([
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'POS Software', url: `${SITE_URL}/pos-software` }
    ])]
  });
  
  res.render('pos-software', { seo });
});

app.get('/multilingual', (req, res) => {
  const seo = enrichSeo({
    title: 'Multilingual POS - One System, Multiple Languages | Bhojan Mitra',
    description: 'Bhojan Mitra supports multiple Indian languages so your staff can work in their native tongue. Reduce errors, speed up training, and serve every customer better.',
    keywords: 'multilingual POS, Indian language POS, voice ordering multilingual, restaurant multilingual system',
    canonicalUrl: `${SITE_URL}/multilingual`,
    structuredData: [
      buildBreadcrumbs([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Multilingual', url: `${SITE_URL}/multilingual` }
      ])
    ]
  });
  res.render('multilingual', { seo });
});

app.get('/voice-ordering', (req, res) => {
  const seo = enrichSeo({
    title: 'Voice Ordering - AI-Powered Kitchen Automation | Bhojan Mitra',
    description: 'Automate every order from counter to kitchen with Bhojan Mitra voice ordering. Eliminate manual handoffs, reduce errors, and speed up service.',
    keywords: 'voice ordering, AI ordering, kitchen automation, restaurant voice POS',
    canonicalUrl: `${SITE_URL}/voice-ordering`,
    structuredData: [
      buildBreadcrumbs([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Voice Ordering', url: `${SITE_URL}/voice-ordering` }
      ])
    ]
  });
  res.render('voice-ordering', { seo });
});

app.get('/restaurant-pos', (req, res) => {
  const seo = enrichSeo({
    title: 'Restaurant POS System - Food Service Point of Sale',
    description: 'Specialized restaurant POS systems with kitchen display, order management, and table service features. Perfect for cafes, restaurants, and food trucks.',
    keywords: 'restaurant POS, food service POS, kitchen display system, restaurant point of sale',
    canonicalUrl: `${SITE_URL}/restaurant-pos`,
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Restaurant POS Solutions",
        "url": `${SITE_URL}/restaurant-pos`
      },
      buildBreadcrumbs([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Restaurant POS', url: `${SITE_URL}/restaurant-pos` }
      ])
    ]
  });
  
  res.render('restaurant-pos', { seo });
});

app.get('/pricing', (req, res) => {
  const seo = enrichSeo({
    title: 'Pricing - Bhojan Mitra AI POS Subscription & Device Options',
    description: 'Pricing for Bhojan Mitra: ₹250/month subscription (no hidden charges). Analytics ₹500 per restaurant. One-time device or enterprise subscription options at ₹5,000.',
    keywords: 'Bhojan Mitra pricing, AI POS pricing, voice POS cost, Bhojan Mitra subscription',
    canonicalUrl: `${SITE_URL}/pricing`,
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        "name": "Bhojan Mitra Pricing",
        "itemListElement": [
          { "@type": "Offer", "name": "Simple Billing Plan", "price": "250", "priceCurrency": "INR" },
          { "@type": "Offer", "name": "Analytics + QR Ordering", "price": "500", "priceCurrency": "INR" },
          { "@type": "Offer", "name": "Voice-enabled Ordering", "price": "5000", "priceCurrency": "INR" }
        ]
      },
      buildBreadcrumbs([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Pricing', url: `${SITE_URL}/pricing` }
      ])
    ]
  });

  res.render('pricing', { seo });
});

app.get('/business-plan', (req, res) => {
  const seo = enrichSeo({
    title: 'Bhojan Mitra Business Plan & Investor Overview',
    description: 'Review the Bhojan Mitra business plan: vision, roadmap, business model, and founding team. Learn how we are building voice-first POS with early partners.',
    keywords: 'Bhojan Mitra business plan, investor overview, AI POS startup',
    canonicalUrl: `${SITE_URL}/business-plan`,
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Report",
        "name": "Bhojan Mitra Business Plan",
        "url": `${SITE_URL}/business-plan`,
        "creator": {
          "@type": "Organization",
          "name": "Aarohita Vigyan"
        }
      },
      buildBreadcrumbs([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Business Plan', url: `${SITE_URL}/business-plan` }
      ])
    ]
  });

  res.render('business-plan', { seo });
});

app.get('/about', (req, res) => {
  const seo = enrichSeo({
    title: 'About Aarohita Vigyan — Team behind Bhojan Mitra',
    description: 'Meet the founders building Bhojan Mitra, a voice-first POS platform for restaurants. Learn about our mission and how we collaborate with early partners.',
    keywords: 'Aarohita Vigyan, Bhojan Mitra team, POS founders',
    canonicalUrl: `${SITE_URL}/about`,
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Aarohita Vigyan",
        "url": `${SITE_URL}`,
        "brand": "Bhojan Mitra"
      },
      buildBreadcrumbs([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'About', url: `${SITE_URL}/about` }
      ])
    ]
  });

  res.render('about', { seo });
});

app.get('/training', (req, res) => {
  const seo = enrichSeo({
    title: 'Bhojan Mitra Training & Enablement',
    description: 'Discover Bhojan Mitra training programs for service teams, kitchen staff, and managers. Founding partners receive live workshops and on-shift support.',
    keywords: 'Bhojan Mitra training, POS onboarding, restaurant enablement',
    canonicalUrl: `${SITE_URL}/training`,
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Bhojan Mitra POS Training",
        "provider": {
          "@type": "Organization",
          "name": "Aarohita Vigyan"
        }
      },
      buildBreadcrumbs([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Training', url: `${SITE_URL}/training` }
      ])
    ]
  });

  res.render('training', { seo });
});

// ---- Blog ----
const blogPosts = {
  'market-is-changing': {
    slug: 'market-is-changing', color: 'pink', date: 'Oct 16, 2025',
    title: 'The Market Is Changing – Why Indian Restaurants Must Go Digital Now',
    content: `
      <h2>Leveraging Social Media for Marketing</h2>
      <p>Harnessing the power of platforms like Instagram and Facebook allows restaurants to engage with customers visually and meaningfully. By sharing mouth-watering images of dishes and behind-the-scenes content, restaurants can build a loyal following, increase brand awareness, and attract new patrons. Regular posts and interactions keep customers engaged, creating a community around the restaurant and fostering relationships with dining enthusiasts.</p>
      <h2>Creating Unique Themed Events</h2>
      <p>Hosting events that celebrate different cultures and cuisines offers customers memorable experiences. Restaurants such as "Curry Festival" offer cultural nights featuring live traditional music, traditional dance, and complementary tasting menus. These events not only attract new customers but also boost foot traffic on typically quiet nights.</p>
      <h2>Enhancing Customer Service Training</h2>
      <p>Investing in comprehensive service training isn't just operationally optional for dining experiences. Restaurants like "Table &amp; Chair" use AI to handle customer concerns, ensuring that every interaction is personalized and attentive. This approach has not only improved customer satisfaction but also set a new standard in the hospitality industry.</p>
      <h2>Adopting Sustainability Practices</h2>
      <p>Integrating sustainable practices into restaurant operations has resonated with environmentally-conscious consumers. Restaurants focus on eco-friendly packaging, locally sourced ingredients, and plant-based options. Reducing food waste has also played a key role in enhancing sustainability.</p>
      <h2>Utilizing Loyalty Programs</h2>
      <p>Developing a comprehensive rewards system accurately optional for dining experiences. Restaurants use the "Table &amp; Chair" rewards tools to identify customer preferences, monitoring dining data, suggesting menu adjustments, and providing valuable insights. This continuous feedback loop supports exceptional dining and improvement model.</p>
    `
  },
  'pos-system-india': {
    slug: 'pos-system-india', color: 'blue', date: 'Oct 16, 2025',
    title: 'POS System for Restaurants in India – Go Paperless, Go Smart',
    content: `
      <h2>Utilizing AI-Driven Predictive Analytics</h2>
      <p>Integrating advanced data analysis and traffic analysis enables restaurants to predict customer preferences and optimize operations. These analytics help restaurants maximize seating capacity while ensuring personalized service. By predicting peak hours and customer preferences, restaurants can efficiently allocate resources and improve overall customer experience.</p>
      <h2>Streamlining Operations with Automation</h2>
      <p>Implementing cutting-edge technology into restaurant operations can significantly improve quality and efficiency. These systems minimize human error and ensure quality-consistent service, freeing up staff to focus on high-value interactions with customers.</p>
      <h2>Incorporating Feedback Loops for Continuous Improvement</h2>
      <p>Regularly surveys customer reviews to systematically addressed and service inefficiencies. This creates a continuous feedback loop by regularly communicating changes and improvements made based on customer feedback.</p>
      <h2>Creating Engaging Loyalty Programs</h2>
      <p>Consistent understanding is about loyalty programs like "Bhojan Club" or "Berry Club" to offer incredible customer experiences. These programs encourage repeat visits by rewarding loyal customers with exciting discounts and other perks, increasing customer retention and lifetime value for the restaurants.</p>
      <h2>Enhancing Atmosphere with Innovative Design</h2>
      <p>Strategic interior updates can dramatically influence diner mood and satisfaction. Thoughtful design choices including lighting, creating a multi-sensory atmosphere for customers. The concept "Desert Space" serves as a prime example of how a complete redesign resulted in a significant positive impact on customer feedback and retention rate.</p>
      <h2>Leveraging Social Media for Community Engagement</h2>
      <p>An active engagement on social media platforms allows businesses to connect with their audience, promoting events and specials while building a loyal online community that drives foot traffic.</p>
    `
  },
  'ai-web-app': {
    slug: 'ai-web-app', color: 'purple', date: 'Oct 16, 2025',
    title: 'AI Web App Development in India – Build Smarter Digital Solutions',
    content: `
      <h2>Why Invest in a Custom POS System?</h2>
      <p>In Bhilai's competitive culinary scene, a robust online presence and efficient operations are essential. Whether you're managing a cosy café or a bustling restaurant, leveraging the latest technology can set you apart. At Bhojan Mitra, we specialize in creating bespoke POS solutions using cutting-edge technologies like React, Django, and Tailwind CSS, ensuring a seamless and professional experience.</p>
      <h2>Key Benefits of a Custom POS System</h2>
      <ul>
        <li>Custom systems ensure faster loading times, boosting your search engine visibility.</li>
        <li>Full Mobile Optimization</li>
        <li>AI-Ready Features</li>
        <li>Comprehensive Support</li>
      </ul>
      <h2>Advanced Web App Development with AI</h2>
      <p>These advanced solutions help you:
        <br>• Manage Leads Effectively
        <br>• Automate Routine Tasks
        <br>• Make Data-Driven Decisions
      </p>
      <h2>Why Bhilai Businesses Choose Bhojan Mitra</h2>
      <p>Expert Developers: Our team comprises experienced React and Django developers. Affordable Solutions: We offer competitive pricing tailored for startups and SMEs. Complimentary SEO Audit: Receive a free SEO audit with every project. Ongoing Support: Enjoy lifetime support and seamless cloud deployment.</p>
    `
  },
  'website-development-bhilai': {
    slug: 'website-development-bhilai', color: 'green', date: 'Oct 01, 2025',
    title: 'Website Development in Bhilai – Build Your Own Website Today',
    content: `
      <h2>Revolutionizing Restaurant Management in Bhilai with AI-Powered POS Systems</h2>
      <p>In Bhilai's competitive culinary scene, a robust online presence and efficient operations are essential. Whether you're managing a cosy café or a bustling restaurant, leveraging the latest technology can set you apart. At Bhojan Mitra, we specialize in creating bespoke POS solutions using cutting-edge technologies like React, Django, and Tailwind CSS, ensuring a seamless and professional experience.</p>
      <h2>Why Invest in a Custom POS System?</h2>
      <p>A custom Point of Sale (POS) system offers unparalleled speed, security, and SEO benefits. At Bhojan Mitra, we specialize in creating bespoke POS solutions using cutting-edge technologies like React, Django, and Tailwind CSS, ensuring a seamless and professional experience.</p>
      <h2>Key Benefits of a Custom POS System</h2>
      <ul>
        <li>Custom systems ensure faster loading times, boosting your search engine visibility.</li>
        <li>Full Mobile Optimization</li>
        <li>AI-Ready Features: predictive analytics, and more to enhance customer engagement and streamline operations.</li>
        <li>Comprehensive Support: Reliable hosting and end-to-end maintenance.</li>
      </ul>
      <h2>Why Bhilai Businesses Choose Bhojan Mitra</h2>
      <p>Expert Developers: Our team comprises experienced React and Django developers. Affordable Solutions: We offer competitive pricing tailored for startups and SMEs. Complimentary SEO Audit: Receive a free SEO audit with every project. Ongoing Support: Enjoy lifetime support and seamless cloud deployment.</p>
    `
  }
};

app.get('/blog', (req, res) => {
  const seo = enrichSeo({
    title: 'Blog – Insights & Tips from Bhojan Mitra',
    description: 'Insights, tips, and updates from the Bhojan Mitra team on restaurant tech, AI POS, and digital transformation.',
    keywords: 'restaurant blog, POS tips, AI restaurant, Bhojan Mitra blog',
    canonicalUrl: `${SITE_URL}/blog`
  });
  res.render('blog', { seo });
});

app.get('/blog/:slug', (req, res) => {
  const post = blogPosts[req.params.slug];
  if (!post) return res.status(404).send('Post not found');
  const related = Object.values(blogPosts).filter(p => p.slug !== post.slug).slice(0, 3);
  const seo = enrichSeo({
    title: post.title + ' | Bhojan Mitra Blog',
    description: post.title,
    canonicalUrl: `${SITE_URL}/blog/${post.slug}`
  });
  res.render('blog-post', { seo, post, related });
});

app.get('/support', (req, res) => {
  const seo = enrichSeo({
    title: 'Bhojan Mitra Support — Pilot Assistance & Escalations',
    description: 'Get help from the Bhojan Mitra team. Founding partners access founders-led support channels, hotline, knowledge base, and on-site visits.',
    keywords: 'Bhojan Mitra support, POS support, pilot assistance',
    canonicalUrl: `${SITE_URL}/support`,
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Bhojan Mitra Support",
        "provider": {
          "@type": "Organization",
          "name": "Aarohita Vigyan"
        }
      },
      buildBreadcrumbs([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Support', url: `${SITE_URL}/support` }
      ])
    ]
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
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Bhojan Mitra",
        "url": `${SITE_URL}/contact`
      },
      buildBreadcrumbs([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Contact', url: `${SITE_URL}/contact` }
      ])
    ]
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
  const out = {
    receivedAt: new Date().toISOString(),
    name: name.trim(),
    email: email.trim(),
    phone: (phone || '').trim(),
    restaurant: restaurant.trim(),
    plan: plan,
    message: (message || '').trim()
  };

  try {
    if (!fs.existsSync(pathData)) fs.mkdirSync(pathData);
    fs.appendFileSync(path.join(pathData, 'contacts.jsonl'), JSON.stringify(out) + '\n');
  } catch (err) {
    console.error('Failed to save contact submission', err);
  }

  // Send email notification
  sendContactEmail(out)
    .then(info => {
      console.log('Contact email sent:', info.messageId);
    })
    .catch(err => {
      console.error('Failed to send contact email:', err.message);
      // Continue even if email fails - data is already saved
    });

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
  const out = {
    receivedAt: new Date().toISOString(),
    name: name.trim(),
    email: email.trim(),
    phone: (phone || '').trim(),
    restaurant: restaurant.trim(),
    plan: plan,
    message: (message || '').trim()
  };

  try {
    if (!fs.existsSync(pathData)) fs.mkdirSync(pathData);
    fs.appendFileSync(path.join(pathData, 'contacts.jsonl'), JSON.stringify(out) + '\n');
  } catch (err) {
    console.error('Failed to save contact submission (api)', err);
    return res.status(500).json({ success: false, errors: ['Failed to save submission'] });
  }

  // Send email notification
  sendContactEmail(out)
    .then(info => {
      console.log('Contact email sent (API):', info.messageId);
    })
    .catch(err => {
      console.error('Failed to send contact email (API):', err.message);
      // Continue even if email fails - data is already saved
    });

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

// Sitemap with proper XML formatting
app.get('/sitemap.xml', (req, res) => {
  const now = new Date().toISOString();
  const urls = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/bhojan-mitra', changefreq: 'weekly', priority: 0.9 },
    { url: '/pos-machine', changefreq: 'weekly', priority: 0.85 },
    { url: '/pos-software', changefreq: 'weekly', priority: 0.9 },
    { url: '/restaurant-pos', changefreq: 'weekly', priority: 0.8 },
    { url: '/pricing', changefreq: 'weekly', priority: 0.9 },
    { url: '/about', changefreq: 'monthly', priority: 0.6 },
    { url: '/training', changefreq: 'monthly', priority: 0.6 },
    { url: '/support', changefreq: 'monthly', priority: 0.6 },
    { url: '/contact', changefreq: 'monthly', priority: 0.7 }
  ];

  res.type('application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(item => `  <url>
    <loc>https://aarohitavigyan.com${item.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>`);
});

// Enhanced Robots.txt
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`# Bhojan Mitra POS Website - Robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /data/
Disallow: /*.jsonl$

# Crawl rate
Crawl-delay: 1

# Sitemaps
Sitemap: https://aarohitavigyan.com/sitemap.xml

# Popular bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /`);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`SEO-optimized POS website running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
  });
}

module.exports = app;
