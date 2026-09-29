/**
 * Keyword landing pages rendered by views/landing.ejs at /<slug>.
 *
 * Each page targets one keyword cluster. Keep copy unique per page — near-duplicate
 * pages get filtered by Google. `group` controls where the page is listed on /solutions.
 *
 * Fields:
 *   slug, group ('billing' | 'business' | 'restaurant' | 'compare'), navLabel,
 *   title (<title>, ~60 chars), description (meta, ~155 chars), keywords[],
 *   badge, h1, intro, sections[{ h2, p }], useCases[] (optional), faqs[{ q, a }], related[slugs]
 */

module.exports = [
  // ───────────────────────────── BILLING SOFTWARE ─────────────────────────────
  {
    slug: 'gst-billing-software',
    group: 'billing',
    navLabel: 'GST Billing Software',
    title: 'GST Billing Software for Small Business in India | Bhojan Mitra',
    description: 'Create GST-compliant invoices in seconds with Bhojan Mitra GST billing software. Automatic CGST/SGST/IGST, HSN codes, GST reports and exports. Plans from ₹250/month.',
    keywords: ['GST billing software', 'GST invoice software', 'GST report software', 'GST billing app', 'GST software for small business', 'GST invoice generator India'],
    badge: 'GST Billing Software',
    h1: 'GST Billing Software That Does the Tax Maths for You',
    intro: 'Bhojan Mitra is GST billing software built for Indian restaurants, shops and small businesses. Every bill carries your GSTIN, HSN/SAC codes and a correct CGST, SGST or IGST split, so the invoice you hand to a customer is also the record you file.',
    sections: [
      { h2: 'GST-compliant invoices on every bill', p: 'Set a tax slab once per item (0%, 5%, 12%, 18% or 28%) and Bhojan Mitra applies it automatically. Invoices show taxable value, tax rate, tax amount and grand total in the format GST rules require. Inclusive and exclusive pricing are both supported, and round-off is handled for you.' },
      { h2: 'GST reports ready for filing', p: 'Stop copying numbers from bill books into spreadsheets. Bhojan Mitra builds date-wise and tax-slab-wise GST reports from your sales, which you can export and hand to your CA or use for GSTR-1 and GSTR-3B preparation.' },
      { h2: 'Billing that is fast at the counter', p: 'Search items by name or code, apply discounts, split payments across cash, UPI and card, and print on a thermal printer or share the bill digitally. The software is designed so a new staff member can bill confidently on day one.' },
      { h2: 'Part of a complete POS, not just a bill book', p: 'Every GST invoice updates your inventory, daily sales report and analytics dashboard in real time. As your business grows you can add table management, kitchen display, QR ordering and voice ordering without changing systems.' }
    ],
    useCases: ['Restaurants and cafés', 'Kirana and grocery stores', 'Pharmacies', 'Garment and footwear shops', 'Hardware and electrical stores', 'Service businesses'],
    faqs: [
      { q: 'Is Bhojan Mitra GST billing software compliant with Indian GST rules?', a: 'Yes. Invoices include GSTIN, HSN/SAC codes, the CGST/SGST or IGST split and itemised tax, in the format required under GST.' },
      { q: 'Can I export GST reports for my CA?', a: 'Yes. Sales and tax reports can be filtered by date and tax slab and exported, so your accountant gets clean data for GST return preparation.' },
      { q: 'How much does the GST billing software cost?', a: 'The Simple Billing plan starts at ₹250 per month with no hidden charges. Analytics is available at ₹500 and voice-enabled ordering at ₹5,000. QR ordering is free forever.' },
      { q: 'Do I need special hardware?', a: 'No. Bhojan Mitra runs in a browser on any Windows PC, laptop or Android tablet. A thermal printer is optional.' }
    ],
    related: ['billing-software', 'invoice-generator', 'accounting-software', 'retail-billing-software']
  },
  {
    slug: 'billing-software',
    group: 'billing',
    navLabel: 'Billing Software for Small Business',
    title: 'Billing Software for Small Business – Simple Billing App | Bhojan Mitra',
    description: 'Affordable billing software and billing app for small businesses in India. GST invoices, inventory, payments and daily reports from ₹250/month. Book a free demo.',
    keywords: ['billing software', 'billing software for small business', 'billing app', 'free billing software', 'billing software India', 'simple billing software', 'POS software'],
    badge: 'Billing Software',
    h1: 'Simple Billing Software for Small Businesses',
    intro: 'Running a small business means you do not have time to fight your billing app. Bhojan Mitra gives you fast billing, GST invoices, stock tracking and daily sales reports in one clean screen, at a price built for small shops and restaurants.',
    sections: [
      { h2: 'Bill in seconds, not minutes', p: 'Add items with a tap or search, apply discounts, take cash, UPI or card, and print or share the bill. Frequently sold items stay one tap away, so the queue keeps moving during your busiest hour.' },
      { h2: 'Better than free billing software', p: 'Free billing apps often limit invoices, hide GST reports behind upgrades or show ads to your staff. Bhojan Mitra starts at ₹250 per month with GST billing, reports and support included, and a free demo so you can try it before paying anything.' },
      { h2: 'Know your numbers every day', p: 'See today\'s sales, top-selling items, payment-mode split and profit at a glance. Daily sales reports are generated automatically, so you close the day in minutes instead of counting slips.' },
      { h2: 'Grows with your business', p: 'Start with simple billing. Add inventory management, staff and payroll, analytics, QR ordering or multiple outlets when you need them, all inside the same software and the same login.' }
    ],
    useCases: ['Retail shops', 'Kirana stores', 'Restaurants', 'Cafés and bakeries', 'Pharmacies', 'Wholesale traders'],
    faqs: [
      { q: 'Is there a free version of Bhojan Mitra billing software?', a: 'We offer a free demo and guided setup. Paid plans start at ₹250 per month, which includes GST billing, reports and support without invoice limits.' },
      { q: 'Can I use it as a billing app on mobile or tablet?', a: 'Yes. Bhojan Mitra works in the browser on Android tablets, phones, laptops and Windows PCs.' },
      { q: 'Which businesses can use this billing software?', a: 'Restaurants, cafés, retail shops, kirana stores, pharmacies, garment shops, hardware stores and most small businesses that sell products or services.' },
      { q: 'How long does setup take?', a: 'Most businesses are billing within a day. We help import your item list and train your staff.' }
    ],
    related: ['gst-billing-software', 'billing-software-for-pc', 'offline-billing-software', 'inventory-management-software']
  },
  {
    slug: 'billing-software-for-pc',
    group: 'billing',
    navLabel: 'Billing Software for PC / Desktop',
    title: 'Billing Software for PC & Desktop (Windows) | Bhojan Mitra',
    description: 'Run Bhojan Mitra billing software on any Windows PC, laptop or desktop. No heavy installation, GST invoices, thermal printing and cloud backup. From ₹250/month.',
    keywords: ['billing software for PC', 'billing software for desktop', 'billing software for Windows', 'computer billing software', 'desktop billing software', 'billing software for laptop'],
    badge: 'Billing Software for PC',
    h1: 'Billing Software for Your PC, Laptop or Desktop',
    intro: 'Already have a computer at the counter? Bhojan Mitra turns any Windows PC, laptop or desktop into a full billing and POS system. Open it in the browser, log in and start billing, with no CDs, licence keys or IT person needed.',
    sections: [
      { h2: 'Works on the computer you already own', p: 'Bhojan Mitra runs in a modern browser, so older desktops and budget laptops work fine. Use a keyboard for fast item search, or a touchscreen monitor if you prefer tapping.' },
      { h2: 'Printer and hardware friendly', p: 'Print bills on thermal receipt printers (58mm and 80mm) or A4 printers for full GST invoices. Kitchen printers and displays can be added for restaurants.' },
      { h2: 'Your data is safe even if the PC fails', p: 'Traditional desktop billing software stores everything on one hard disk. Bhojan Mitra keeps your data backed up in the cloud, so a crashed or stolen computer does not mean lost bills and reports.' },
      { h2: 'Check sales from anywhere', p: 'Bill on the desktop at the shop and check live sales on your phone at home. Owners of multiple outlets see every counter in one dashboard.' }
    ],
    faqs: [
      { q: 'Do I need to install software on my PC?', a: 'No heavy installation is needed. Bhojan Mitra runs in a browser such as Chrome or Edge on Windows.' },
      { q: 'What are the minimum PC requirements?', a: 'Any Windows PC or laptop that runs a current version of Chrome or Edge is enough for billing.' },
      { q: 'Does desktop billing work without internet?', a: 'Yes. Offline mode keeps billing running locally, and data syncs automatically once the internet is back.' },
      { q: 'Can I use a barcode scanner or thermal printer with my PC?', a: 'Thermal printers are supported. Talk to us about your barcode scanner model and we will confirm setup during your demo.' }
    ],
    related: ['offline-billing-software', 'billing-software', 'barcode-billing-software', 'gst-billing-software']
  },
  {
    slug: 'offline-billing-software',
    group: 'billing',
    navLabel: 'Offline Billing Software',
    title: 'Offline Billing Software – Bill Without Internet | Bhojan Mitra',
    description: 'Keep billing when the internet drops. Bhojan Mitra offline billing software saves bills locally and auto-syncs to the cloud when you reconnect. GST ready.',
    keywords: ['offline billing software', 'billing software without internet', 'offline POS', 'offline billing app', 'offline GST billing software'],
    badge: 'Offline Billing',
    h1: 'Offline Billing Software That Never Stops the Counter',
    intro: 'Internet outages should not stop your sales. Bhojan Mitra keeps billing and order capture running locally when your connection drops, then syncs every bill to the cloud automatically when it returns.',
    sections: [
      { h2: 'Billing continues when Wi‑Fi fails', p: 'Offline mode stores bills on the device and keeps printing receipts. Your staff do not need to switch apps, write manual slips or re-enter anything later.' },
      { h2: 'Automatic sync, no duplicates', p: 'As soon as connectivity is restored, offline bills upload in order. Reports, inventory and analytics update to match, so your end-of-day numbers stay accurate.' },
      { h2: 'Kitchen keeps working too', p: 'For restaurants, kitchen routing rules stay active during an outage, so orders continue to print at the right station and service does not slow down.' },
      { h2: 'The best of offline and cloud', p: 'Pure offline software locks your data on one machine. Bhojan Mitra gives you offline reliability plus cloud backup, remote reports and multi-device access.' }
    ],
    faqs: [
      { q: 'Does Bhojan Mitra work without internet?', a: 'Yes. Billing and order capture continue offline and sync automatically when the connection returns.' },
      { q: 'Will I lose bills made offline?', a: 'No. Offline bills are stored locally and uploaded once you reconnect.' },
      { q: 'Are offline bills GST compliant?', a: 'Yes. Offline bills use the same GST invoice format as online bills.' },
      { q: 'Which devices support offline billing?', a: 'Windows PCs, laptops and Android tablets running a modern browser.' }
    ],
    related: ['billing-software-for-pc', 'gst-billing-software', 'cloud-pos-for-restaurants', 'billing-software']
  },
  {
    slug: 'invoice-generator',
    group: 'billing',
    navLabel: 'Invoice Generator & Quotation Maker',
    title: 'Invoice Generator & Invoice Maker App (GST) | Bhojan Mitra',
    description: 'Free-to-try invoice generator and invoice maker app for Indian businesses. Create GST invoices, estimates and quotations, share on WhatsApp or print. Book a demo.',
    keywords: ['invoice generator', 'invoice maker app', 'GST invoice generator', 'estimate maker', 'quotation maker', 'online invoice maker India', 'bill maker app'],
    badge: 'Invoice Maker',
    h1: 'Invoice Generator for GST Invoices, Estimates and Quotations',
    intro: 'Create professional invoices in seconds. Bhojan Mitra\'s invoice maker adds your logo, GSTIN and tax details automatically, keeps every invoice numbered in sequence, and stores them safely so you can find any bill in seconds.',
    sections: [
      { h2: 'Professional GST invoices in one click', p: 'Pick a customer, add items and Bhojan Mitra fills in rates, tax slabs, HSN codes and totals. Invoice numbers follow a proper sequence per financial year, which keeps your records audit-friendly.' },
      { h2: 'Estimates and quotations', p: 'Send a customer an estimate or quotation before the sale. When they confirm, convert it to an invoice without retyping a single line.' },
      { h2: 'Print, download or share', p: 'Print on a thermal or A4 printer, or share the invoice digitally with your customer. Every invoice is saved in the cloud and searchable by number, date or customer.' },
      { h2: 'More than an invoice maker', p: 'Unlike standalone invoice generators, every invoice in Bhojan Mitra updates stock, payments received and your GST reports, so your books stay in sync without extra work.' }
    ],
    faqs: [
      { q: 'Can I create estimates and quotations?', a: 'Yes. Create an estimate or quotation and convert it to a GST invoice once the customer confirms.' },
      { q: 'Can I add my logo to invoices?', a: 'Yes. Your business name, logo, address and GSTIN appear on every invoice.' },
      { q: 'Is the invoice generator free?', a: 'You can try it free in a demo. Plans start at ₹250 per month with unlimited invoices.' },
      { q: 'Can I generate invoices from my phone?', a: 'Yes. Bhojan Mitra works in the browser on phones, tablets and computers.' }
    ],
    related: ['gst-billing-software', 'accounting-software', 'billing-software', 'retail-billing-software']
  },
  {
    slug: 'inventory-management-software',
    group: 'billing',
    navLabel: 'Inventory Management Software',
    title: 'Inventory Management Software for Small Business | Bhojan Mitra',
    description: 'Track stock in real time with Bhojan Mitra inventory management software. Auto stock deduction on every bill, low-stock alerts, purchase entries and reports.',
    keywords: ['inventory management software', 'stock management software', 'inventory software for small business', 'inventory app', 'stock maintenance software'],
    badge: 'Inventory Management',
    h1: 'Inventory Management Software That Updates With Every Sale',
    intro: 'Stock-outs lose sales and overstocking locks up cash. Bhojan Mitra connects billing and inventory, so every bill reduces stock automatically and you always know what is on the shelf, what is running low and what to reorder.',
    sections: [
      { h2: 'Real-time stock, no manual counting', p: 'Each sale deducts stock the moment the bill is saved. Purchases and returns add it back. You get a live, accurate stock position without registers or end-of-day tallies.' },
      { h2: 'Low-stock alerts', p: 'Set a minimum level for each item and get alerted before you run out, so you can reorder on time and never turn a customer away.' },
      { h2: 'Purchase and supplier records', p: 'Record purchases against suppliers, track what you paid and see which products move fastest. Use the data to negotiate better and buy smarter.' },
      { h2: 'Stock reports that help decisions', p: 'Fast movers, slow movers, stock value and consumption trends are all one click away. For restaurants, ingredient-level tracking shows exactly where wastage happens.' }
    ],
    faqs: [
      { q: 'Does inventory update automatically when I bill?', a: 'Yes. Every sale reduces stock, and purchases or returns increase it, in real time.' },
      { q: 'Can I get low-stock alerts?', a: 'Yes. Set minimum stock levels per item and Bhojan Mitra alerts you before you run out.' },
      { q: 'Can I manage inventory for multiple outlets?', a: 'Yes. Multi-outlet businesses can track stock per location from one account.' },
      { q: 'Is inventory included in the billing plan?', a: 'Inventory management works alongside billing in Bhojan Mitra. Book a demo and we will recommend the right plan for your stock volume.' }
    ],
    related: ['restaurant-inventory-management', 'retail-billing-software', 'barcode-billing-software', 'billing-software']
  },
  {
    slug: 'accounting-software',
    group: 'billing',
    navLabel: 'Accounting & GST Report Software',
    title: 'Accounting Software & GST Report App for Small Business | Bhojan Mitra',
    description: 'Simple accounting software for shops and restaurants. Sales, payments, expenses, GST reports and daily summaries generated automatically from your billing.',
    keywords: ['accounting software', 'accounting app', 'GST report software', 'accounting software for small business', 'business accounting app India'],
    badge: 'Accounting & Reports',
    h1: 'Accounting Software That Starts From Your Billing',
    intro: 'Most small business owners do not want to learn double-entry bookkeeping. Bhojan Mitra builds your sales, payment and GST records automatically from the bills you already create, so your accounts are ready when your CA asks.',
    sections: [
      { h2: 'Sales and payment records, automatically', p: 'Every bill is recorded with its payment mode (cash, UPI, card or credit), so you always know what came in, what is pending and where the money went.' },
      { h2: 'GST reports without spreadsheets', p: 'Tax-slab-wise and date-wise GST summaries are produced from your invoices. Export them for GSTR preparation or share directly with your accountant.' },
      { h2: 'Daily, monthly and yearly summaries', p: 'See revenue, discounts, taxes and top items for any period. Daily sales reports can be emailed or exported as CSV for your records.' },
      { h2: 'Works alongside your CA\'s tools', p: 'Bhojan Mitra focuses on accurate day-to-day records. Exports are clean and structured, so your accountant can bring them into their preferred accounting package.' }
    ],
    faqs: [
      { q: 'Can Bhojan Mitra replace my accounting software?', a: 'Bhojan Mitra handles sales, payments, GST reports and daily summaries from billing. For full ledgers and balance sheets, your CA can import our exports into their accounting tool.' },
      { q: 'Does it generate GST reports?', a: 'Yes. GST reports by date and tax slab are generated automatically from your invoices.' },
      { q: 'Can I export data to Excel?', a: 'Yes. Reports can be exported as CSV, which opens in Excel or Google Sheets.' },
      { q: 'Is it suitable for non-accountants?', a: 'Yes. It is designed for owners and staff with no accounting background.' }
    ],
    related: ['gst-billing-software', 'invoice-generator', 'billing-software', 'restaurant-management-software']
  },
  {
    slug: 'barcode-billing-software',
    group: 'billing',
    navLabel: 'Barcode Billing Software',
    title: 'Barcode Billing Software for Retail Shops | Bhojan Mitra',
    description: 'Scan and bill faster with Bhojan Mitra barcode billing software. Quick item lookup, GST invoices, auto stock updates and thermal printing for retail stores.',
    keywords: ['barcode billing software', 'barcode scanner billing software', 'barcode POS software', 'retail barcode billing', 'barcode billing machine'],
    badge: 'Barcode Billing',
    h1: 'Barcode Billing Software for Faster Checkout',
    intro: 'When customers are lining up, typing item names is too slow. Barcode billing lets your staff scan, confirm and print in seconds, with correct prices and GST every time.',
    sections: [
      { h2: 'Scan, bill and print', p: 'Scan a product barcode and the item, price and tax slab are added instantly. Scan again to increase quantity. Checkout that used to take minutes now takes seconds.' },
      { h2: 'Fewer pricing mistakes', p: 'Prices come from your item master, not from memory. That removes manual errors and disputes at the counter, and keeps GST calculations correct.' },
      { h2: 'Stock updates with every scan', p: 'Each scanned sale updates inventory in real time, so your stock reports and low-stock alerts are always accurate.' },
      { h2: 'Built for busy retail counters', p: 'Kirana stores, supermarkets, pharmacies, garment shops and hardware stores use barcode billing to serve more customers per hour with the same staff.' }
    ],
    useCases: ['Supermarkets and kirana', 'Pharmacies', 'Garment shops', 'Hardware stores', 'Stationery and gift shops'],
    faqs: [
      { q: 'Which barcode scanners work with Bhojan Mitra?', a: 'Most USB and Bluetooth scanners that act as a keyboard work. Share your model during the demo and we will confirm.' },
      { q: 'Can I bill items that have no barcode?', a: 'Yes. Search by name or item code for loose or unbarcoded products.' },
      { q: 'Does barcode billing update inventory?', a: 'Yes. Every scanned sale reduces stock automatically.' },
      { q: 'Is barcode billing GST compliant?', a: 'Yes. Scanned items carry their HSN code and tax slab onto the GST invoice.' }
    ],
    related: ['retail-billing-software', 'kirana-store-billing-software', 'inventory-management-software', 'billing-software-for-pc']
  },

  // ─────────────────────────── BY BUSINESS TYPE ───────────────────────────
  {
    slug: 'retail-billing-software',
    group: 'business',
    navLabel: 'Retail Billing Software',
    title: 'Retail Billing Software & Retail POS for Shops | Bhojan Mitra',
    description: 'Retail billing software for shops in India: GST invoicing, barcode billing, inventory, customer records and sales reports in one retail POS. From ₹250/month.',
    keywords: ['retail billing software', 'retail POS software', 'billing software for retail shop', 'shop billing software', 'retail GST invoicing', 'retail POS system'],
    badge: 'Retail Billing',
    h1: 'Retail Billing Software Built for Indian Shops',
    intro: 'From a single counter to a chain of stores, Bhojan Mitra gives retail shops fast GST billing, stock control and clear sales reports without complicated software or expensive hardware.',
    sections: [
      { h2: 'Fast GST billing at the counter', p: 'Search or scan items, apply offers, take split payments and print GST invoices in seconds. Returns and exchanges are handled without messing up your stock or tax records.' },
      { h2: 'Inventory that stays accurate', p: 'Every bill updates stock. Low-stock alerts, purchase entries and fast-moving item reports help you reorder at the right time.' },
      { h2: 'Customer records and repeat business', p: 'Save customer names and numbers at billing, see what regulars buy and use that to run offers that bring them back.' },
      { h2: 'Reports for owners', p: 'Daily sales, payment modes, category performance and profit are visible on your phone, so you can manage the shop even when you are not at the counter.' }
    ],
    useCases: ['Kirana and grocery', 'Pharmacy and medical stores', 'Garment and footwear', 'Hardware and electrical', 'Mobile and electronics', 'Stationery and gift shops'],
    faqs: [
      { q: 'Is Bhojan Mitra only for restaurants?', a: 'No. Bhojan Mitra works for retail shops too, with GST billing, inventory and reports designed for counters.' },
      { q: 'Can I manage multiple retail stores?', a: 'Yes. Track sales and stock per store and see all outlets in one dashboard.' },
      { q: 'Does it support returns and exchanges?', a: 'Yes. Returns adjust both inventory and GST records correctly.' },
      { q: 'What does retail billing software cost?', a: 'Plans start at ₹250 per month with no hidden charges.' }
    ],
    related: ['kirana-store-billing-software', 'pharmacy-billing-software', 'garment-shop-billing-software', 'hardware-shop-billing-software']
  },
  {
    slug: 'kirana-store-billing-software',
    group: 'business',
    navLabel: 'Kirana Store Billing Software',
    title: 'Kirana Store Billing Software & Grocery POS | Bhojan Mitra',
    description: 'Billing software for kirana and grocery stores. Fast billing, loose-item weights, barcode scanning, udhaar tracking, GST invoices and stock alerts. Try a free demo.',
    keywords: ['billing software for kirana store', 'kirana store billing software', 'grocery billing software', 'kirana POS', 'supermarket billing software', 'general store billing software'],
    badge: 'Kirana Store Billing',
    h1: 'Billing Software for Kirana and Grocery Stores',
    intro: 'Kirana stores sell hundreds of items, many of them loose, to customers who want to be in and out quickly. Bhojan Mitra keeps billing fast, stock under control and customer credit clear.',
    sections: [
      { h2: 'Quick billing for hundreds of items', p: 'Search by name or short code, or scan packaged goods. Loose items like rice, dal and sugar can be billed by weight or quantity with the right price per unit.' },
      { h2: 'Track udhaar and credit customers', p: 'Mark bills as credit, see how much each regular customer owes and record payments when they settle. No more lost notebooks.' },
      { h2: 'Never run out of fast movers', p: 'Stock reduces automatically with each bill. Low-stock alerts on daily essentials tell you what to reorder before your next wholesaler visit.' },
      { h2: 'GST ready when you need it', p: 'Whether you are under composition or regular GST, Bhojan Mitra prints the right invoice and builds GST reports automatically.' }
    ],
    faqs: [
      { q: 'Can I bill loose items by weight?', a: 'Yes. Set a per-kg or per-unit price and bill any quantity.' },
      { q: 'Can I track customer credit (udhaar)?', a: 'Yes. Bills can be marked as credit and customer balances tracked until paid.' },
      { q: 'Does it work on a mobile phone?', a: 'Yes. Bhojan Mitra runs in the browser on phones, tablets and PCs.' },
      { q: 'Is it affordable for a small kirana shop?', a: 'Yes. Plans start at ₹250 per month, less than a rupee a bill for most stores.' }
    ],
    related: ['retail-billing-software', 'barcode-billing-software', 'inventory-management-software', 'billing-software']
  },
  {
    slug: 'pharmacy-billing-software',
    group: 'business',
    navLabel: 'Pharmacy Billing Software',
    title: 'Pharmacy Billing Software for Medical Stores | Bhojan Mitra',
    description: 'Pharmacy and medical store billing software with batch and expiry tracking, GST invoices, stock alerts and fast search. Built for Indian chemists. Book a demo.',
    keywords: ['pharmacy billing software', 'medical store billing software', 'chemist billing software', 'pharmacy POS', 'medical shop software'],
    badge: 'Pharmacy Billing',
    h1: 'Pharmacy Billing Software for Medical Stores',
    intro: 'Medical stores need speed at the counter and discipline in the back room. Bhojan Mitra helps chemists bill quickly, keep an eye on expiry and maintain clean GST records.',
    sections: [
      { h2: 'Find medicines fast', p: 'Search by brand name or code and add to the bill in a tap. Frequently sold medicines stay on quick access for the evening rush.' },
      { h2: 'Batch and expiry awareness', p: 'Record batch numbers and expiry dates at purchase, and review items approaching expiry so you can return or clear them in time instead of writing them off.' },
      { h2: 'Correct GST on every strip', p: 'Medicines, devices and FMCG products carry different GST rates. Bhojan Mitra applies each item\'s HSN code and slab automatically on every invoice.' },
      { h2: 'Stock control that saves money', p: 'Low-stock alerts, supplier-wise purchase records and fast/slow mover reports help you keep the right medicines in stock without over-buying.' }
    ],
    faqs: [
      { q: 'Does it track medicine expiry?', a: 'You can record batch and expiry details at purchase and review items nearing expiry. Share your workflow in the demo and we will set it up for your store.' },
      { q: 'Can I print GST invoices for medicines?', a: 'Yes, with HSN codes and the correct tax slab per item.' },
      { q: 'Does it support barcode scanning?', a: 'Yes, for packaged products with barcodes. Confirm your scanner model during the demo.' },
      { q: 'Can I use it for multiple pharmacy branches?', a: 'Yes. Manage each branch separately and view combined reports.' }
    ],
    related: ['retail-billing-software', 'inventory-management-software', 'gst-billing-software', 'barcode-billing-software']
  },
  {
    slug: 'garment-shop-billing-software',
    group: 'business',
    navLabel: 'Garment Shop Billing Software',
    title: 'Billing Software for Garment & Clothing Shops | Bhojan Mitra',
    description: 'Garment shop billing software with size and colour variants, barcode billing, GST invoices, exchanges and stock reports. Built for clothing and footwear stores.',
    keywords: ['billing software for garment shop', 'garment billing software', 'clothing store billing software', 'textile billing software', 'boutique billing software', 'footwear billing software'],
    badge: 'Garment Shop Billing',
    h1: 'Billing Software for Garment and Clothing Shops',
    intro: 'Clothing stores juggle sizes, colours, seasonal stock and frequent exchanges. Bhojan Mitra keeps all of that organised while giving your counter fast GST billing.',
    sections: [
      { h2: 'Sizes and colours without the chaos', p: 'Create one product with its size and colour variants, and track stock for each. You will know exactly how many medium blue shirts are left.' },
      { h2: 'Easy exchanges and returns', p: 'Exchanges are part of clothing retail. Process them in a few taps and your stock and GST records stay correct.' },
      { h2: 'Offers and seasonal sales', p: 'Apply item or bill-level discounts during festive sales and end-of-season clearance, with the discount reflected correctly on the GST invoice.' },
      { h2: 'Know what sells', p: 'Category, size and item-wise reports show which styles move and which sit on the rack, so you buy better next season.' }
    ],
    faqs: [
      { q: 'Can I manage size and colour variants?', a: 'Yes. Each variant can have its own stock level. Share your catalogue structure during the demo and we will help set it up.' },
      { q: 'Does it handle exchanges?', a: 'Yes. Exchanges and returns adjust stock and GST correctly.' },
      { q: 'Can I print barcode-based bills?', a: 'Yes, barcode billing is supported for tagged products.' },
      { q: 'Does it work for footwear and boutiques too?', a: 'Yes. Any fashion retail store with variants and seasonal stock can use it.' }
    ],
    related: ['retail-billing-software', 'barcode-billing-software', 'inventory-management-software', 'gst-billing-software']
  },
  {
    slug: 'hardware-shop-billing-software',
    group: 'business',
    navLabel: 'Hardware Shop Billing Software',
    title: 'Billing Software for Hardware & Electrical Shops | Bhojan Mitra',
    description: 'Hardware shop billing software for thousands of SKUs: quick search, units like kg/metre/piece, GST invoices, credit customers, quotations and stock control.',
    keywords: ['billing software for hardware shop', 'hardware store billing software', 'electrical shop billing software', 'sanitary shop billing software', 'paint shop billing software'],
    badge: 'Hardware Shop Billing',
    h1: 'Billing Software for Hardware and Electrical Shops',
    intro: 'Hardware stores carry thousands of small items sold in pieces, kilos and metres, often to contractors on credit. Bhojan Mitra is built to keep that fast and accurate.',
    sections: [
      { h2: 'Thousands of items, found in seconds', p: 'Search by name, size or code to find the exact bolt, pipe fitting or switch. Frequently sold items stay on quick access.' },
      { h2: 'Any unit you sell in', p: 'Bill by piece, box, kg, metre or foot with the right price per unit. Wire, pipe and chain are billed by length without mental maths.' },
      { h2: 'Contractor credit and quotations', p: 'Send quotations to contractors, convert them to invoices when approved and track outstanding credit per customer.' },
      { h2: 'GST and stock under control', p: 'Correct HSN codes and tax slabs on every invoice, automatic stock deduction and low-stock alerts for the items you cannot afford to run out of.' }
    ],
    faqs: [
      { q: 'Can I bill in metres, kg or pieces?', a: 'Yes. Set a unit and price per unit for each item.' },
      { q: 'Can I give quotations to contractors?', a: 'Yes. Create a quotation and convert it to a GST invoice once approved.' },
      { q: 'Can I track credit customers?', a: 'Yes. Mark bills as credit and track balances per customer.' },
      { q: 'Does it work for sanitary, paint and electrical shops?', a: 'Yes. Any store with many SKUs and mixed units can use it.' }
    ],
    related: ['retail-billing-software', 'invoice-generator', 'inventory-management-software', 'barcode-billing-software']
  },

  // ─────────────────────────── RESTAURANT POS ───────────────────────────
  {
    slug: 'restaurant-billing-software',
    group: 'restaurant',
    navLabel: 'Restaurant Billing Software',
    title: 'Restaurant Billing Software with GST & KOT | Bhojan Mitra',
    description: 'Restaurant billing software for dine-in, takeaway and delivery. GST bills, KOT printing, table management, split bills and daily reports. From ₹250/month.',
    keywords: ['restaurant billing software', 'restaurant billing app', 'restaurant billing machine', 'hotel billing software', 'dhaba billing software', 'restaurant GST billing'],
    badge: 'Restaurant Billing',
    h1: 'Restaurant Billing Software That Keeps Up With Rush Hour',
    intro: 'Bhojan Mitra is restaurant billing software built for Indian dining: dine-in tables, takeaway counters and delivery orders in one screen, with KOTs to the kitchen and GST-ready bills for guests.',
    sections: [
      { h2: 'Tables, takeaway and delivery in one place', p: 'See every table\'s status at a glance, move or merge tables, and handle takeaway and delivery orders from the same screen without switching apps.' },
      { h2: 'KOT to the kitchen instantly', p: 'Orders go to the right kitchen printer or display as a KOT the moment they are placed. Add-ons and special instructions travel with the order.' },
      { h2: 'Split bills, discounts and payments', p: 'Split a bill by item or equally, apply discounts or complimentary items with reasons, and settle across cash, UPI and card.' },
      { h2: 'Voice ordering in Indian languages', p: 'Bhojan Mitra\'s voice ordering lets staff speak orders in Hindi and other Indian languages. It is the fastest way to take orders during peak hours.' }
    ],
    useCases: ['Fine dine and family restaurants', 'Dhabas', 'Cafés', 'QSR and fast food', 'Cloud kitchens', 'Bars and lounges'],
    faqs: [
      { q: 'Does it print KOTs?', a: 'Yes. KOTs print or display at the correct kitchen station as soon as an order is placed.' },
      { q: 'Is restaurant billing GST compliant?', a: 'Yes. Bills include GSTIN, tax breakup and the restaurant GST rate you configure.' },
      { q: 'Can I split bills between guests?', a: 'Yes, by item or equally, with separate payments.' },
      { q: 'What does it cost?', a: 'QR ordering is free forever. Simple Billing starts at ₹250 per month, and ₹500 adds analytics.' }
    ],
    related: ['kot-software', 'restaurant-management-software', 'cloud-pos-for-restaurants', 'restaurant-inventory-management']
  },
  {
    slug: 'restaurant-management-software',
    group: 'restaurant',
    navLabel: 'Restaurant Management Software',
    title: 'Restaurant Management Software – All-in-One POS | Bhojan Mitra',
    description: 'All-in-one restaurant management software: POS billing, KOT, inventory, staff and payroll, QR ordering, analytics and multi-outlet control. Book a free demo.',
    keywords: ['restaurant management software', 'restaurant management system', 'restaurant software', 'hotel management software', 'restaurant operations software'],
    badge: 'Restaurant Management',
    h1: 'Restaurant Management Software for the Whole Operation',
    intro: 'Stop running your restaurant across five apps and a notebook. Bhojan Mitra brings billing, kitchen, inventory, staff, customer feedback and analytics into one restaurant management system.',
    sections: [
      { h2: 'Front of house', p: 'Table management, fast billing, QR ordering, voice ordering and multiple payment modes keep service smooth and guests happy.' },
      { h2: 'Kitchen', p: 'KOTs route to the right station automatically, with kitchen display integration so chefs see orders clearly and nothing is missed.' },
      { h2: 'Back office', p: 'Inventory, purchases, staff and payroll, and GST reports all update from daily operations. You spend less time on admin and more time on food and guests.' },
      { h2: 'Owner dashboard', p: 'Live sales, item performance, peak hours and outlet comparisons on your phone. Daily reports arrive automatically so you always know how the day went.' }
    ],
    faqs: [
      { q: 'What does restaurant management software include?', a: 'Bhojan Mitra includes POS billing, KOT, table management, inventory, staff and payroll, QR ordering, customer feedback, GST reports and analytics.' },
      { q: 'Can I manage multiple outlets?', a: 'Yes. Menus, pricing and reports can be managed per outlet from one account.' },
      { q: 'Is training included?', a: 'Yes. We set up your menu and train your team as part of onboarding.' },
      { q: 'Does it work if the internet goes down?', a: 'Yes. Offline mode keeps billing and KOT printing running.' }
    ],
    related: ['restaurant-billing-software', 'restaurant-inventory-management', 'restaurant-payroll-attendance-software', 'cloud-pos-for-restaurants']
  },
  {
    slug: 'cloud-pos-for-restaurants',
    group: 'restaurant',
    navLabel: 'Cloud POS for Restaurants',
    title: 'Cloud POS for Restaurants – Manage From Anywhere | Bhojan Mitra',
    description: 'Cloud-based restaurant POS system. Bill on any device, see live sales on your phone, manage menus across outlets and keep data safely backed up. Offline ready.',
    keywords: ['cloud POS for restaurants', 'cloud based POS', 'cloud restaurant POS system', 'restaurant POS system', 'cloud POS India', 'web based POS'],
    badge: 'Cloud POS',
    h1: 'Cloud POS for Restaurants That Works Anywhere',
    intro: 'A cloud POS means your restaurant data lives safely online, not on one machine at the counter. Bhojan Mitra lets you bill on any device and manage your restaurant from anywhere.',
    sections: [
      { h2: 'Any device, no servers', p: 'Run Bhojan Mitra on a Windows PC, laptop, Android tablet or our POS machine. There are no local servers to maintain and updates arrive automatically.' },
      { h2: 'Live sales on your phone', p: 'See orders, revenue and top items in real time wherever you are. Owners with several outlets compare performance in one view.' },
      { h2: 'Central menu control', p: 'Change a price or add a dish once and push it to every outlet. Outlet-specific menus and pricing are supported too.' },
      { h2: 'Cloud reliability, offline safety', p: 'Data is backed up continuously. If the internet drops, offline mode keeps billing and KOT printing running and syncs when you reconnect.' }
    ],
    faqs: [
      { q: 'What is a cloud POS?', a: 'A cloud POS stores your data online and runs in a browser or app, so you can access it from any device and your data is backed up.' },
      { q: 'Is my data safe in the cloud?', a: 'Yes. Data is backed up continuously, so hardware failure at the restaurant does not mean data loss.' },
      { q: 'What happens if the internet goes down?', a: 'Offline mode keeps billing running and syncs automatically when you reconnect.' },
      { q: 'Can I manage multiple restaurants?', a: 'Yes. Multi-outlet management is built in.' }
    ],
    related: ['restaurant-management-software', 'offline-billing-software', 'restaurant-billing-software', 'qsr-pos']
  },
  {
    slug: 'kot-software',
    group: 'restaurant',
    navLabel: 'KOT Software',
    title: 'KOT Software – Kitchen Order Ticket System | Bhojan Mitra',
    description: 'KOT software that sends kitchen order tickets to the right station instantly. KOT printing, kitchen display, modifiers and order status for restaurants and cafés.',
    keywords: ['KOT software', 'KOT billing software', 'kitchen order ticket software', 'KOT printer software', 'kitchen display system', 'KDS'],
    badge: 'KOT Software',
    h1: 'KOT Software That Gets Orders to the Kitchen Right',
    intro: 'A KOT (kitchen order ticket) tells the kitchen what to cook. Bhojan Mitra creates KOTs automatically from every order and routes them to the right station, so handwritten slips, shouting and missed items become a thing of the past.',
    sections: [
      { h2: 'Automatic KOT on every order', p: 'When an order is placed by staff, by QR or by voice, a KOT is generated immediately. Additional items on the same table create a new KOT, so the kitchen always sees exactly what is new.' },
      { h2: 'Route to the right station', p: 'Send tandoor items to the tandoor, drinks to the bar and desserts to the pastry section. Bhojan Mitra\'s IoT routing handles multi-station kitchens automatically.' },
      { h2: 'Kitchen display or printer', p: 'Print KOTs on thermal kitchen printers or show them on a kitchen display screen with order timing, so chefs can prioritise and nothing is forgotten.' },
      { h2: 'Modifiers and instructions travel with the order', p: '"Less spicy", "no onion" and "extra cheese" appear clearly on the KOT, which cuts remakes and wasted food.' }
    ],
    faqs: [
      { q: 'What is KOT in a restaurant?', a: 'KOT stands for Kitchen Order Ticket. It is the order slip sent to the kitchen telling chefs what to prepare for each table or order.' },
      { q: 'Can KOTs go to different kitchen printers?', a: 'Yes. Items can route to different stations such as tandoor, main kitchen or bar.' },
      { q: 'Do you support kitchen display screens?', a: 'Yes. Kitchen display integration is supported alongside printers.' },
      { q: 'Does KOT printing work offline?', a: 'Yes. Kitchen routing continues during internet outages.' }
    ],
    related: ['restaurant-billing-software', 'restaurant-management-software', 'qsr-pos', 'cloud-kitchen-pos']
  },
  {
    slug: 'restaurant-inventory-management',
    group: 'restaurant',
    navLabel: 'Restaurant Inventory Management',
    title: 'Restaurant Inventory Management Software | Bhojan Mitra',
    description: 'Control food cost with restaurant inventory management: recipe-based stock deduction, raw material tracking, wastage reports, low-stock alerts and purchases.',
    keywords: ['restaurant inventory management', 'restaurant inventory management software', 'recipe management software', 'food cost software', 'restaurant stock management'],
    badge: 'Restaurant Inventory',
    h1: 'Restaurant Inventory Management That Cuts Food Cost',
    intro: 'Food cost is the biggest controllable expense in a restaurant. Bhojan Mitra tracks raw materials against what you sell, so you can see consumption, spot wastage and buy exactly what you need.',
    sections: [
      { h2: 'Recipe-based stock deduction', p: 'Link each dish to its ingredients. When a butter naan or paneer tikka is billed, the flour, butter and paneer used are deducted from stock automatically.' },
      { h2: 'Spot wastage and pilferage', p: 'Compare expected consumption with actual stock counts. Differences show up quickly, so you can fix portioning, storage or theft before it eats your margin.' },
      { h2: 'Low-stock alerts and purchases', p: 'Get alerts before key ingredients run out, record purchases against suppliers and track price changes over time.' },
      { h2: 'Multi-outlet and central kitchen', p: 'Track stock per outlet and see consumption trends across locations from one dashboard.' }
    ],
    faqs: [
      { q: 'Does Bhojan Mitra support recipe-based inventory?', a: 'Yes. Link dishes to ingredients and stock is deducted automatically as dishes are sold. We help set up recipes during onboarding.' },
      { q: 'Can I track wastage?', a: 'Yes. Compare expected and actual stock to identify wastage and variance.' },
      { q: 'Does it alert me when stock is low?', a: 'Yes. Set minimum levels per ingredient and get alerts.' },
      { q: 'Can I record supplier purchases?', a: 'Yes. Purchases are recorded against suppliers and added to stock.' }
    ],
    related: ['inventory-management-software', 'restaurant-management-software', 'cloud-kitchen-pos', 'restaurant-billing-software']
  },
  {
    slug: 'zomato-swiggy-integration-pos',
    group: 'restaurant',
    navLabel: 'Zomato & Swiggy POS Integration',
    title: 'Zomato & Swiggy Integration POS for Restaurants | Bhojan Mitra',
    description: 'Manage Zomato, Swiggy and in-house orders from one restaurant POS. Fewer tablets, one KOT flow, unified sales reports. Talk to us about aggregator integration.',
    keywords: ['Zomato Swiggy integration POS', 'Zomato POS integration', 'Swiggy POS integration', 'online order aggregator POS', 'food delivery POS'],
    badge: 'Aggregator Orders',
    h1: 'Bring Zomato and Swiggy Orders Into One POS',
    intro: 'Juggling separate tablets for each delivery app slows your kitchen and makes reconciliation painful. Bhojan Mitra is designed to bring delivery orders into the same billing, KOT and reporting flow as your dine-in and takeaway orders.',
    sections: [
      { h2: 'One screen for every order', p: 'Dine-in, takeaway, your own QR orders and delivery-platform orders appear together, so staff work from one queue instead of several devices.' },
      { h2: 'One kitchen flow', p: 'Delivery orders generate KOTs just like dine-in orders and route to the right station, keeping preparation times predictable during rush hours.' },
      { h2: 'Unified sales reporting', p: 'See revenue by channel side by side. Know how much of your business comes from each platform and how it compares with direct orders.' },
      { h2: 'Grow direct orders too', p: 'Bhojan Mitra\'s QR ordering lets guests order directly without commissions. Use it alongside delivery platforms to improve margins.' }
    ],
    faqs: [
      { q: 'Does Bhojan Mitra integrate with Zomato and Swiggy?', a: 'Aggregator integration is available for restaurants on request. Tell us which platforms you use when you book a demo and we will walk you through setup and availability.' },
      { q: 'Will delivery orders print KOTs?', a: 'Delivery orders follow the same KOT and kitchen routing flow as dine-in orders.' },
      { q: 'Can I see sales by platform?', a: 'Yes. Reports can be split by order channel.' },
      { q: 'Can I take direct online orders without commission?', a: 'Yes. QR ordering lets guests order directly from your menu.' }
    ],
    related: ['online-ordering-system-for-restaurants', 'cloud-kitchen-pos', 'kot-software', 'restaurant-management-software']
  },
  {
    slug: 'online-ordering-system-for-restaurants',
    group: 'restaurant',
    navLabel: 'Online & QR Ordering System',
    title: 'Online Ordering System for Restaurants – QR Ordering | Bhojan Mitra',
    description: 'Commission-free online and QR ordering for restaurants. Guests scan, browse your menu and order; orders flow straight to POS and kitchen. Free forever.',
    keywords: ['online ordering system for restaurants', 'QR code ordering', 'QR menu ordering', 'restaurant online ordering', 'contactless ordering system'],
    badge: 'Online & QR Ordering',
    h1: 'Online Ordering System for Restaurants — Without Commissions',
    intro: 'Let guests order straight from their phones. With Bhojan Mitra QR ordering, customers scan a code at the table or counter, browse your live menu and place orders that go directly to your POS and kitchen.',
    sections: [
      { h2: 'Scan, browse, order', p: 'Each table gets its own QR code. Guests see your up-to-date menu with photos and prices and place orders without waiting for a server.' },
      { h2: 'Straight to the kitchen', p: 'QR orders appear in the POS and generate KOTs automatically, so staff do not re-enter anything and mistakes drop.' },
      { h2: 'Keep your margins', p: 'Direct orders carry no aggregator commission. Encourage regulars to order directly and keep more of every rupee.' },
      { h2: 'Menu changes in real time', p: 'Mark an item out of stock or change a price and the QR menu updates instantly for every guest.' }
    ],
    faqs: [
      { q: 'How does QR ordering work?', a: 'Guests scan a table QR code, view your menu on their phone and place an order that goes directly to your POS and kitchen.' },
      { q: 'Is there a commission on QR orders?', a: 'No. QR orders are direct orders to your restaurant.' },
      { q: 'How much does QR ordering cost?', a: 'Nothing. QR ordering is free forever, with no time limit and no credit card required.' },
      { q: 'Do guests need to download an app?', a: 'No. The menu opens in the phone\'s browser.' }
    ],
    related: ['zomato-swiggy-integration-pos', 'cafe-pos', 'qsr-pos', 'restaurant-billing-software']
  },
  {
    slug: 'cafe-pos',
    group: 'restaurant',
    navLabel: 'Café POS',
    title: 'Café POS System & Coffee Shop Billing Software | Bhojan Mitra',
    description: 'Café POS system for coffee shops and tea cafés. Quick counter billing, modifiers, QR ordering, loyalty-friendly customer records and daily reports. From ₹250/month.',
    keywords: ['cafe POS', 'cafe billing software', 'coffee shop POS', 'cafe management software', 'tea cafe billing software'],
    badge: 'Café POS',
    h1: 'Café POS Built for Quick Counters and Regulars',
    intro: 'Cafés live on speed and repeat customers. Bhojan Mitra keeps the counter quick, handles customisations and helps you recognise your regulars.',
    sections: [
      { h2: 'Fast counter billing', p: 'One-tap favourites, quick modifiers for size, milk and sugar, and instant printing keep the line short during the morning rush.' },
      { h2: 'Customisations done right', p: 'Add-ons like extra shot, oat milk or less sugar are priced correctly and printed clearly for the barista.' },
      { h2: 'QR ordering for seated guests', p: 'Guests can order and reorder from their table using QR ordering, freeing staff to focus on drinks and service.' },
      { h2: 'Know your regulars', p: 'Save customer details at billing and see order history, so you can reward loyalty and run targeted offers.' }
    ],
    faqs: [
      { q: 'Can I add modifiers like size and milk type?', a: 'Yes. Modifiers and add-ons can be priced and appear on the bill and KOT.' },
      { q: 'Does it work on a tablet?', a: 'Yes. Bhojan Mitra works on Android tablets, PCs and our POS machine.' },
      { q: 'Can guests order via QR?', a: 'Yes, and QR ordering is free forever.' },
      { q: 'How much does café POS cost?', a: 'Plans start at ₹250 per month.' }
    ],
    related: ['bakery-pos', 'qsr-pos', 'online-ordering-system-for-restaurants', 'restaurant-billing-software']
  },
  {
    slug: 'bakery-pos',
    group: 'restaurant',
    navLabel: 'Bakery POS',
    title: 'Bakery POS & Billing Software for Cake Shops | Bhojan Mitra',
    description: 'Bakery billing software for cake shops and sweet shops. Weight-based billing, advance cake orders, daily production stock, GST invoices and sales reports.',
    keywords: ['bakery POS', 'bakery billing software', 'cake shop billing software', 'sweet shop billing software', 'mithai shop POS'],
    badge: 'Bakery POS',
    h1: 'Bakery POS for Cake, Sweet and Snack Shops',
    intro: 'Bakeries sell by piece and by weight, take advance orders for celebrations and deal with daily fresh stock. Bhojan Mitra handles all of it from one counter.',
    sections: [
      { h2: 'Billing by piece or weight', p: 'Sell cookies by piece, sweets by kg and cakes by size. Prices calculate automatically for any quantity.' },
      { h2: 'Advance and custom orders', p: 'Record cake orders with delivery date, message and advance payment, and settle the balance at pickup.' },
      { h2: 'Fresh stock, less waste', p: 'Track daily production against sales to see what sells out and what is left over, and plan tomorrow\'s baking accordingly.' },
      { h2: 'GST and festive rush ready', p: 'Correct GST on every item, quick billing for Diwali and festival crowds, and reports that show your best sellers by day.' }
    ],
    faqs: [
      { q: 'Can I bill sweets by weight?', a: 'Yes. Set a per-kg price and bill any weight.' },
      { q: 'Can I take advance cake orders?', a: 'Yes. Record the order details and advance, then settle at pickup.' },
      { q: 'Is it GST compliant?', a: 'Yes. Each item carries its HSN code and tax slab.' },
      { q: 'Can I manage multiple bakery outlets?', a: 'Yes. Multi-outlet reports are included.' }
    ],
    related: ['cafe-pos', 'retail-billing-software', 'restaurant-inventory-management', 'qsr-pos']
  },
  {
    slug: 'cloud-kitchen-pos',
    group: 'restaurant',
    navLabel: 'Cloud Kitchen POS',
    title: 'Cloud Kitchen POS & Software for Delivery Kitchens | Bhojan Mitra',
    description: 'Cloud kitchen POS for delivery-only brands. Run multiple brands from one kitchen, unify order channels, route KOTs by station and track food cost per brand.',
    keywords: ['cloud kitchen POS', 'cloud kitchen software', 'dark kitchen POS', 'multi brand kitchen software', 'delivery kitchen POS'],
    badge: 'Cloud Kitchen POS',
    h1: 'Cloud Kitchen POS for Multi-Brand Delivery Kitchens',
    intro: 'Cloud kitchens run several brands, on several channels, from one kitchen. Bhojan Mitra gives you one system for orders, KOTs, stock and brand-wise reports.',
    sections: [
      { h2: 'Multiple brands, one kitchen', p: 'Set up separate menus and pricing for each brand while sharing inventory and staff. Reports split cleanly by brand.' },
      { h2: 'Every channel in one queue', p: 'Orders from your own QR or website links and delivery platforms flow into one screen, so the kitchen works from a single list.' },
      { h2: 'Station-wise KOT routing', p: 'KOTs route to the right station automatically, which keeps prep times tight when several brands spike at once.' },
      { h2: 'Food cost per brand', p: 'Recipe-based inventory shows ingredient consumption per brand, so you know which concepts are actually profitable.' }
    ],
    faqs: [
      { q: 'Can I run multiple brands in one account?', a: 'Yes. Each brand can have its own menu and reports while sharing inventory.' },
      { q: 'Do you integrate with delivery platforms?', a: 'Aggregator integration is available on request. Discuss your platforms during the demo.' },
      { q: 'Can I track food cost per brand?', a: 'Yes, using recipe-based inventory.' },
      { q: 'Does it work offline?', a: 'Yes. Order capture and KOT routing continue during outages.' }
    ],
    related: ['zomato-swiggy-integration-pos', 'kot-software', 'restaurant-inventory-management', 'cloud-pos-for-restaurants']
  },
  {
    slug: 'qsr-pos',
    group: 'restaurant',
    navLabel: 'QSR POS',
    title: 'QSR POS System for Quick Service Restaurants | Bhojan Mitra',
    description: 'QSR POS for fast food and quick service restaurants. Lightning-fast billing, combos, token numbers, kitchen display and peak-hour analytics. Voice ordering ready.',
    keywords: ['QSR POS', 'quick service restaurant POS', 'fast food POS', 'QSR billing software', 'food court POS'],
    badge: 'QSR POS',
    h1: 'QSR POS Built for Speed',
    intro: 'In quick service, every second at the counter counts. Bhojan Mitra is designed to minimise taps, speed up kitchen handoff and help you serve more guests per hour.',
    sections: [
      { h2: 'Fewer taps per order', p: 'Combos, favourites and quick modifiers make most orders a few taps long. Voice ordering lets staff speak the order instead of hunting through menus.' },
      { h2: 'Tokens and order status', p: 'Print token numbers with the bill so guests know when their order is ready, and keep the pickup counter organised.' },
      { h2: 'Kitchen display for high volume', p: 'Orders appear on the kitchen display instantly with timing, so the line cooks work in the right sequence during the rush.' },
      { h2: 'Peak-hour analytics', p: 'See orders per hour, average ticket size and top items, then staff and prep accordingly.' }
    ],
    faqs: [
      { q: 'Can I create combo meals?', a: 'Yes. Combos can be priced and sold as single items.' },
      { q: 'Does it print token numbers?', a: 'Yes. Token numbers can be printed on bills for pickup.' },
      { q: 'Is it suitable for food courts?', a: 'Yes. Fast counter billing and KOT routing suit food court outlets.' },
      { q: 'Does voice ordering help QSRs?', a: 'Yes. Speaking orders is faster than tapping during peak hours.' }
    ],
    related: ['kot-software', 'cafe-pos', 'cloud-pos-for-restaurants', 'restaurant-billing-software']
  },
  {
    slug: 'restaurant-payroll-attendance-software',
    group: 'restaurant',
    navLabel: 'Restaurant Payroll & Attendance',
    title: 'Restaurant Payroll & Staff Attendance Software | Bhojan Mitra',
    description: 'Manage restaurant staff, attendance, shifts and payroll inside your POS. Track staff performance, advances and salaries without separate HR software.',
    keywords: ['restaurant payroll software', 'restaurant attendance software', 'staff management software for restaurants', 'restaurant HR software', 'staff attendance app'],
    badge: 'Staff & Payroll',
    h1: 'Restaurant Payroll and Attendance, Inside Your POS',
    intro: 'Staff costs are one of your largest expenses. Bhojan Mitra\'s Staff & Payroll module keeps staff records, attendance and salaries in the same system you bill from.',
    sections: [
      { h2: 'Staff records in one place', p: 'Keep every team member\'s role, contact and salary details together, with access permissions matched to their job.' },
      { h2: 'Attendance and shifts', p: 'Record attendance and shifts so payroll is based on actual days worked, not guesswork at month end.' },
      { h2: 'Payroll without spreadsheets', p: 'Calculate monthly salaries including advances and deductions, and keep a history of every payment.' },
      { h2: 'Performance you can see', p: 'Because staff bill in the same system, you can see orders and sales by staff member and reward your best performers.' }
    ],
    faqs: [
      { q: 'Does Bhojan Mitra include payroll?', a: 'Yes. Staff & Payroll is part of Bhojan Mitra. We configure it for your salary structure during onboarding.' },
      { q: 'Can I track staff attendance?', a: 'Attendance and shifts can be recorded for payroll. Share your attendance process in the demo and we will set it up.' },
      { q: 'Can I restrict what staff can access?', a: 'Yes. Role-based permissions limit access to discounts, reports and settings.' },
      { q: 'Can I see sales by staff member?', a: 'Yes. Reports show sales and orders by staff.' }
    ],
    related: ['restaurant-management-software', 'restaurant-billing-software', 'cloud-pos-for-restaurants', 'restaurant-inventory-management']
  },

  {
    slug: 'free-qr-ordering',
    group: 'restaurant',
    navLabel: 'Free QR Code Ordering',
    title: 'Free QR Code Menu & Ordering System for Restaurants | Bhojan Mitra',
    description: 'Free QR code menu and ordering for restaurants and cafés — free forever. Guests scan, browse and order from their phones. No app, no commission, no time limit.',
    keywords: ['free QR code menu', 'free QR ordering system', 'QR code ordering for restaurants free', 'free digital menu', 'QR menu for restaurant', 'contactless ordering free'],
    badge: 'Free Forever',
    h1: 'Free QR Code Ordering for Restaurants — Forever',
    intro: 'Give every table its own QR code. Guests scan, browse your live menu and order from their phones, and you pay nothing, not now and not later. Bhojan Mitra QR ordering is free forever, with no time limit, no commission and no credit card.',
    sections: [
      { h2: 'Actually free, not a trial', p: 'Many "free" QR menus expire after 14 or 30 days, or start charging once guests get used to them. Bhojan Mitra QR ordering has no time limit. Use it for as long as you run your restaurant.' },
      { h2: 'Scan, browse, order', p: 'Each table gets a QR code. Guests see your menu with prices and place orders without downloading an app or waiting for a server to bring a menu card.' },
      { h2: 'Update your menu in seconds', p: 'Change a price, add a special or mark a dish as sold out, and every guest sees it instantly. There are no reprints and no outdated menu cards.' },
      { h2: 'Zero commission on every order', p: 'QR orders are direct orders to your restaurant. Unlike delivery apps, there is no cut on each order, so you keep the full bill.' },
      { h2: 'Upgrade only if you want to', p: 'When you are ready, add GST billing from ₹250/month so QR orders flow straight into bills, KOTs and reports. The QR ordering itself stays free.' }
    ],
    useCases: ['Restaurants', 'Cafés', 'Dhabas', 'Hotels and homestays', 'Food courts', 'Bars and lounges'],
    faqs: [
      { q: 'Is Bhojan Mitra QR ordering really free forever?', a: 'Yes. QR code ordering is free forever, with no time limit, no commission and no credit card required.' },
      { q: 'Do guests need to download an app?', a: 'No. The menu opens in the phone\'s browser when they scan the QR code.' },
      { q: 'Can I change my menu after printing the QR codes?', a: 'Yes. The QR code stays the same, and menu changes appear instantly for guests.' },
      { q: 'What does it cost to add billing?', a: 'GST billing starts at ₹250 per month. QR ordering remains free whether or not you add billing.' }
    ],
    related: ['online-ordering-system-for-restaurants', 'cafe-pos', 'restaurant-billing-software', 'restaurant-pos-dehradun']
  },

  // ─────────────────────────── DEHRADUN & UTTARAKHAND ───────────────────────────
  {
    slug: 'billing-software-dehradun',
    group: 'local',
    navLabel: 'Billing Software in Dehradun',
    title: 'Billing Software in Dehradun – GST Billing & POS | Bhojan Mitra',
    description: 'GST billing and POS software in Dehradun for shops, kirana stores, pharmacies and restaurants. Local team, on-site setup and training. Free QR ordering forever.',
    keywords: ['billing software Dehradun', 'GST billing software Dehradun', 'POS software Dehradun', 'billing machine Dehradun', 'billing software for shop in Dehradun', 'kirana billing software Dehradun', 'retail billing software Dehradun'],
    badge: 'Dehradun, Uttarakhand',
    h1: 'Billing Software in Dehradun, From a Dehradun Team',
    intro: 'Bhojan Mitra is GST billing and POS software built by a team based in Dehradun. We set it up at your shop, train your staff in Hindi or English and stay a phone call away, from Paltan Bazaar to Rajpur Road, Prem Nagar to Clement Town.',
    local: { areaServed: ['Dehradun', 'Uttarakhand'] },
    areas: ['Paltan Bazaar', 'Rajpur Road', 'Clock Tower (Ghanta Ghar)', 'Dalanwala', 'Race Course', 'Ballupur', 'Vasant Vihar', 'Prem Nagar', 'Clement Town', 'Sahastradhara Road', 'Jakhan', 'Patel Nagar', 'GMS Road', 'Chakrata Road', 'ISBT', 'Selaqui', 'Doiwala', 'Raipur'],
    sections: [
      { h2: 'A local team, not a call centre', p: 'Most billing software companies support Dehradun from another state, over the phone. We are here. We visit your counter to set up items and printers, train your staff and come back if something needs fixing.' },
      { h2: 'GST billing set up for Uttarakhand', p: 'Your GSTIN starts with Uttarakhand\'s state code 05. Bhojan Mitra applies CGST + SGST on sales within Uttarakhand and IGST on sales to other states, so bills to customers in Delhi, UP or Himachal are handled correctly too.' },
      { h2: 'Built for Dehradun\'s shops', p: 'Paltan Bazaar garment and footwear stores, kirana shops in every colony, pharmacies near hospitals, hardware stores on Saharanpur Road — Bhojan Mitra handles fast counter billing, stock and customer credit for all of them.' },
      { h2: 'Keeps working through outages', p: 'Power cuts and patchy internet happen. Offline mode keeps billing running and syncs everything to the cloud when you reconnect, so the monsoon season never stops your counter.' },
      { h2: 'Fair, published pricing', p: 'GST billing starts at ₹250 per month, with no hidden charges, and QR ordering is free forever. Try a free demo at your shop before you pay anything.' }
    ],
    useCases: ['Kirana and grocery stores', 'Garment and footwear shops', 'Pharmacies', 'Hardware and electrical stores', 'Sweet shops and bakeries', 'Restaurants and cafés'],
    faqs: [
      { q: 'Do you provide billing software support in Dehradun?', a: 'Yes. Our team is based in Dehradun and offers on-site setup, staff training and support across the city.' },
      { q: 'Is the software set up for Uttarakhand GST?', a: 'Yes. It applies CGST + SGST for sales within Uttarakhand and IGST for inter-state sales, with GST reports ready for filing.' },
      { q: 'How much does billing software cost in Dehradun?', a: 'GST billing starts at ₹250 per month with no hidden charges. QR ordering is free forever, and the demo is free.' },
      { q: 'Can you come to my shop for a demo?', a: 'Yes. Book a demo and we will visit your shop in Dehradun to show it working with your own items.' }
    ],
    related: ['restaurant-pos-dehradun', 'pos-software-uttarakhand', 'gst-billing-software', 'kirana-store-billing-software']
  },
  {
    slug: 'restaurant-pos-dehradun',
    group: 'local',
    navLabel: 'Restaurant POS in Dehradun',
    title: 'Restaurant POS & Billing Software in Dehradun | Bhojan Mitra',
    description: 'Restaurant POS and billing software for Dehradun restaurants, cafés and cloud kitchens. KOT, GST billing, free QR ordering and on-site setup by a local team.',
    keywords: ['restaurant POS Dehradun', 'restaurant billing software Dehradun', 'cafe billing software Dehradun', 'restaurant software Dehradun', 'KOT software Dehradun', 'QR menu Dehradun', 'cloud kitchen software Dehradun'],
    badge: 'Dehradun Restaurants',
    h1: 'Restaurant POS for Dehradun Restaurants and Cafés',
    intro: 'From Rajpur Road cafés to family restaurants in Dalanwala and cloud kitchens near the college belt, Dehradun\'s food scene moves fast. Bhojan Mitra gives you billing, KOTs, QR ordering and reports, with a local team to set it up and train your staff.',
    local: { areaServed: ['Dehradun', 'Mussoorie', 'Uttarakhand'] },
    areas: ['Rajpur Road', 'Dalanwala', 'Astley Hall', 'Paltan Bazaar', 'Vasant Vihar', 'Sahastradhara Road', 'Prem Nagar', 'Clement Town', 'Bidholi', 'Jakhan', 'Race Course', 'Mussoorie Road'],
    sections: [
      { h2: 'Ready for weekend and tourist rush', p: 'Long weekends bring visitors from Delhi and NCR, and Mussoorie traffic flows through the city. Fast billing, KOTs straight to the kitchen and table management keep service moving when every table is full.' },
      { h2: 'Free QR ordering for every table', p: 'Give each table a QR code so guests can browse and order from their phones. QR ordering is free forever, and it is a big help for cafés full of students who prefer ordering on their phones.' },
      { h2: 'Delivery and cloud kitchens near the college belt', p: 'Kitchens serving students around Prem Nagar, Bidholi and Clement Town get one queue for counter, QR and delivery orders, station-wise KOTs and brand-wise reports.' },
      { h2: 'Voice ordering in Hindi', p: 'Staff can speak orders in Hindi and Bhojan Mitra captures items and modifiers automatically, which makes training new staff much faster.' },
      { h2: 'Set up in person, supported locally', p: 'We import your menu, map your printers and train your team at your restaurant. When you need help during service, you are calling someone in Dehradun.' }
    ],
    useCases: ['Cafés', 'Family restaurants', 'Dhabas', 'Cloud kitchens', 'Bakeries and sweet shops', 'Hotel restaurants'],
    faqs: [
      { q: 'Do you install restaurant POS in Dehradun?', a: 'Yes. Our Dehradun team handles on-site setup, menu import, printer mapping and staff training.' },
      { q: 'Is QR ordering free?', a: 'Yes. QR ordering is free forever, with no time limit or commission.' },
      { q: 'Do you serve restaurants in Mussoorie?', a: 'Yes. We serve restaurants and cafés in Mussoorie and across Uttarakhand.' },
      { q: 'What does restaurant billing cost?', a: 'Billing starts at ₹250 per month, analytics at ₹500 and voice ordering at ₹5,000. QR ordering is free.' }
    ],
    related: ['billing-software-dehradun', 'pos-software-uttarakhand', 'free-qr-ordering', 'kot-software']
  },
  {
    slug: 'pos-software-uttarakhand',
    group: 'local',
    navLabel: 'POS Software in Uttarakhand',
    title: 'Billing & POS Software in Uttarakhand | Bhojan Mitra',
    description: 'Billing and POS software for shops, hotels, cafés and restaurants across Uttarakhand — Haridwar, Rishikesh, Haldwani, Roorkee, Mussoorie, Nainital. Free QR ordering.',
    keywords: ['POS software Uttarakhand', 'billing software Uttarakhand', 'billing software Haridwar', 'billing software Rishikesh', 'billing software Haldwani', 'restaurant POS Rishikesh', 'hotel billing software Mussoorie', 'billing software Roorkee'],
    badge: 'Across Uttarakhand',
    h1: 'Billing and POS Software Across Uttarakhand',
    intro: 'Bhojan Mitra is built in Dehradun for businesses across Uttarakhand, whether that is a café in Rishikesh, a sweet shop in Haridwar, a kirana store in Haldwani or a hotel restaurant in Mussoorie or Nainital.',
    local: { areaServed: ['Dehradun', 'Haridwar', 'Rishikesh', 'Haldwani', 'Roorkee', 'Rudrapur', 'Kashipur', 'Mussoorie', 'Nainital', 'Uttarakhand'] },
    areasHeading: 'Cities we serve',
    areas: ['Dehradun', 'Haridwar', 'Rishikesh', 'Haldwani', 'Roorkee', 'Rudrapur', 'Kashipur', 'Mussoorie', 'Nainital', 'Kotdwar', 'Vikasnagar', 'Almora'],
    sections: [
      { h2: 'Made for seasonal, tourist-driven business', p: 'Char Dham season, Ganga Dussehra, summer in the hills and weekend visitors mean sudden peaks. Bhojan Mitra keeps billing fast in the rush and gives you reports to plan stock and staff for the next season.' },
      { h2: 'Cafés and restaurants in Rishikesh and the hills', p: 'Free QR ordering suits cafés with international visitors, since guests browse the menu on their own phones. KOTs, table management and multiple payment modes, including UPI and card, keep service smooth.' },
      { h2: 'Shops and traders in the plains', p: 'Retail and wholesale businesses in Haridwar, Roorkee, Haldwani, Rudrapur and Kashipur get fast GST billing, stock control and customer credit tracking.' },
      { h2: 'Works where the internet does not', p: 'In hill towns connectivity can drop without warning. Offline mode keeps billing running and syncs to the cloud once you are back online.' },
      { h2: 'Correct GST for Uttarakhand', p: 'CGST + SGST within Uttarakhand (state code 05) and IGST for sales to other states are applied automatically, with GST reports ready for your CA.' }
    ],
    useCases: ['Hotel and homestay restaurants', 'Cafés', 'Sweet shops', 'Kirana and general stores', 'Pharmacies', 'Wholesale traders'],
    faqs: [
      { q: 'Do you provide POS software outside Dehradun?', a: 'Yes. We serve businesses across Uttarakhand, including Haridwar, Rishikesh, Haldwani, Roorkee, Mussoorie and Nainital.' },
      { q: 'Does it work in hill areas with weak internet?', a: 'Yes. Offline mode keeps billing running and syncs automatically when the connection returns.' },
      { q: 'Is QR ordering free for hotels and cafés?', a: 'Yes. QR ordering is free forever.' },
      { q: 'How do I get a demo outside Dehradun?', a: 'Book a demo and we will arrange a visit or an online walkthrough, whichever suits you.' }
    ],
    related: ['billing-software-dehradun', 'restaurant-pos-dehradun', 'offline-billing-software', 'free-qr-ordering']
  },

  // ─────────────────────────── COMPARISON ───────────────────────────
  {
    slug: 'petpooja-alternative',
    group: 'compare',
    navLabel: 'Petpooja Alternative',
    title: 'Petpooja Alternative – Affordable Restaurant POS | Bhojan Mitra',
    description: 'Looking for a Petpooja alternative? Bhojan Mitra offers restaurant POS, GST billing, KOT, inventory and AI voice ordering in Indian languages from ₹250/month.',
    keywords: ['Petpooja alternative', 'Petpooja competitor', 'Petpooja vs Bhojan Mitra', 'best restaurant POS India', 'restaurant POS software India', 'Petpooja'],
    badge: 'Petpooja Alternative',
    h1: 'A Petpooja Alternative With AI Voice Ordering',
    intro: 'Petpooja is one of the best-known restaurant POS platforms in India. If you are comparing options, Bhojan Mitra offers the core features restaurants expect, plus voice ordering in Indian languages, transparent pricing and founder-led onboarding.',
    sections: [
      { h2: 'All the restaurant POS essentials', p: 'GST billing, KOT and kitchen display, table management, inventory, staff and payroll, QR ordering, analytics and multi-outlet control are all included in Bhojan Mitra.' },
      { h2: 'Voice ordering in Indian languages', p: 'Bhojan Mitra is voice-first. Staff can speak orders in Hindi and other Indian languages, and the system captures items and modifiers automatically. This is our biggest difference from traditional tap-based POS systems.' },
      { h2: 'Simple, published pricing', p: 'QR ordering is free forever. Simple Billing is ₹250 per month, Analytics + QR is ₹500 and Voice-enabled Ordering is ₹5,000. There are no hidden charges, so you know the cost before you sign up.' },
      { h2: 'Hands-on onboarding', p: 'As a growing company, we work directly with each restaurant, importing your menu, training your staff and adapting workflows to how you actually run service.' }
    ],
    faqs: [
      { q: 'Is Bhojan Mitra a good Petpooja alternative?', a: 'If you want restaurant POS essentials plus AI voice ordering in Indian languages and simple published pricing, Bhojan Mitra is worth a demo. We recommend comparing both on your own menu and workflow.' },
      { q: 'Can I switch from Petpooja to Bhojan Mitra?', a: 'Yes. We help export your menu, set up items and taxes, and train staff so you can switch with minimal disruption.' },
      { q: 'How much does Bhojan Mitra cost?', a: 'QR ordering is free forever. Paid plans are ₹250, ₹500 and ₹5,000 depending on features, with no hidden charges.' },
      { q: 'Does Bhojan Mitra work for retail too?', a: 'Yes. Bhojan Mitra supports retail billing, GST invoicing and inventory for shops as well as restaurants.' }
    ],
    related: ['restaurant-billing-software', 'restaurant-management-software', 'gst-billing-software', 'cloud-pos-for-restaurants']
  }
];
