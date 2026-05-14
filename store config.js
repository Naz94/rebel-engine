/**
 * ============================================================
 * REBEL ENGINE — STORE CONFIG v4.0
 * ============================================================
 * ONE file per client. That's it.
 * Fill this in and the entire store configures itself.
 * No coding required by the client.
 *
 * DEPLOYMENT:
 *   1. Fill in all fields below
 *   2. Set apiBase and clientId
 *   3. Upload to client domain alongside index.html
 *   4. Done
 * ============================================================
 */

window.STORE_CONFIG = {

  /* ──────────────────────────────────────────────
     1. BACKEND CONNECTION
  ────────────────────────────────────────────── */
  apiBase:  'https://api.rebelengine.co.za/api/v1',
  clientId: 'PASTE_CLIENT_ID_HERE',

  /* ──────────────────────────────────────────────
     2. STORE IDENTITY
  ────────────────────────────────────────────── */
  storeName:    "My Store",
  storeTagline: "Quality products, delivered fast.",
  logoText:     "Store",       // Short text logo (used if logoImage is empty)
  logoImage:    '',            // URL to logo image
  favicon:      '',            // URL to favicon

  /* ──────────────────────────────────────────────
     3. COLOURS
     These become CSS variables automatically.
  ────────────────────────────────────────────── */
  colors: {
    primary:   '#111111',      // Nav, footer, headings
    accent:    '#e63946',      // Buttons, links, badges
    accentAlt: '#457b9d',      // Secondary accent
    bg:        '#ffffff',      // Page background
    surface:   '#ffffff',      // Card backgrounds
    text:      '#111111',      // Body text
  },

  /* ──────────────────────────────────────────────
     4. TYPOGRAPHY
     Options: modern | elegant | bold | minimal |
              editorial | technical | friendly | luxury
  ────────────────────────────────────────────── */
  font: 'modern',

  /* ──────────────────────────────────────────────
     5. BUTTON STYLE
     Options: solid | outline | pill
  ────────────────────────────────────────────── */
  buttonStyle: 'solid',

  /* ──────────────────────────────────────────────
     6. BORDER RADIUS
     Options: sharp | default | rounded
  ────────────────────────────────────────────── */
  borderRadius: 'default',

  /* ──────────────────────────────────────────────
     7. CURRENCY
  ────────────────────────────────────────────── */
  currency:     'R',
  currencyCode: 'ZAR',

  /* ──────────────────────────────────────────────
     8. NAVIGATION
  ────────────────────────────────────────────── */
  navLinks: [
    { label: 'Home',    href: 'index.html' },
    { label: 'Shop',    href: 'shop.html' },
    { label: 'About',   href: 'about.html' },
    { label: 'Contact', href: 'contact.html' },
  ],

  /* ──────────────────────────────────────────────
     9. SECTIONS — SHOW / HIDE
     Set to true or false.
  ────────────────────────────────────────────── */
  sections: {
    announcement:     false,   // Top bar message
    ticker:           false,   // Scrolling text strip
    hero:             true,    // Main hero section
    featuredProducts: true,    // Products grid
    promoBanner:      false,   // Split banner (image + text)
    imageSlideshow:   false,   // Standalone image carousel
    video:            false,   // Video embed or upload
    collage:          false,   // Image collage block
    newArrivals:      true,    // New arrivals row
    fullBanner:       false,   // Full-width background banner
    logoCarousel:     false,   // Brand logo strip
    testimonials:     false,   // Customer reviews
    trust:            true,    // Trust badges row
    specials:         false,   // Sale / specials products
    richText:         false,   // Text block (about, story, etc.)
    twoCol:           false,   // Image + text side by side
    faq:              false,   // FAQ accordion
    newsletter:       true,    // Email signup
  },

  /* ──────────────────────────────────────────────
     10. ANNOUNCEMENT BAR
     Only shows when sections.announcement = true
  ────────────────────────────────────────────── */
  announcement: {
    text:      'Free delivery on orders over R500 🚚',
    linkText:  'Shop Now',
    linkHref:  'shop.html',
  },

  /* ──────────────────────────────────────────────
     11. HERO
     style options: split | center | minimal | slideshow
  ────────────────────────────────────────────── */
  hero: {
    style:          'split',        // split | center | minimal | slideshow
    eyebrow:        'New Arrivals',
    title:          'Discover Something Beautiful',
    sub:            'Quality products curated with care. Fast delivery across South Africa.',
    image:          '',             // URL to hero image (leave empty for placeholder)
    video:          '',             // URL to hero video (overrides image if set)
    overlayOpacity: 0.45,           // 0 = no overlay, 1 = fully dark (for center/slideshow)
    height:         '80vh',         // CSS value e.g. '80vh', '600px'
    cta: {
      label: 'Shop Now',
      href:  'shop.html',
    },
    cta2: {
      label: 'Learn More',
      href:  'about.html',
    },
    // For slideshow style only:
    autoplayMs: 5000,
    slides: [
      // {
      //   image:   'https://example.com/slide1.jpg',
      //   eyebrow: 'Collection 1',
      //   title:   'Slide One Heading',
      //   sub:     'Supporting text here.',
      //   align:   'left',   // left | center
      //   cta:     { label: 'Shop Now', href: 'shop.html' },
      //   cta2:    { label: 'View All',  href: 'shop.html' },
      // },
    ],
  },

  /* ──────────────────────────────────────────────
     12. TICKER MESSAGES
  ────────────────────────────────────────────── */
  ticker: {
    items: [
      'Free delivery on orders over R500',
      'New products every week',
      '30 day hassle-free returns',
      'SA owned and operated',
      'Secure checkout',
    ],
  },

  /* ──────────────────────────────────────────────
     13. FEATURED PRODUCTS
  ────────────────────────────────────────────── */
  featured: {
    eyebrow: 'Our Range',
    title:   'Featured Products',
    sub:     '',
    limit:   8,           // How many products to show
  },

  /* ──────────────────────────────────────────────
     14. PRODUCT CATEGORIES
     Used for filter pills above product grid.
     Match exactly to category names in your dashboard.
  ────────────────────────────────────────────── */
  categories: [
    // { label: 'Clothing',  icon: '👕', slug: 'clothing' },
    // { label: 'Shoes',     icon: '👟', slug: 'shoes' },
    // { label: 'Sale',      icon: '⭐', slug: 'sale' },
  ],

  /* ──────────────────────────────────────────────
     15. PROMO BANNER (split: image + text)
  ────────────────────────────────────────────── */
  banner: {
    eyebrow: 'Limited Time',
    title:   'Special Offer',
    sub:     'Don\'t miss out on our latest promotion.',
    image:   '',
    cta:     { label: 'Shop the Deal', href: 'shop.html' },
  },

  /* ──────────────────────────────────────────────
     16. IMAGE SLIDESHOW (standalone)
  ────────────────────────────────────────────── */
  slideshow: {
    eyebrow:    '',
    title:      '',
    autoplayMs: 4500,
    slides: [
      // { image: 'url', title: '', sub: '', cta: { label: '', href: '' } }
    ],
  },

  /* ──────────────────────────────────────────────
     17. VIDEO SECTION
  ────────────────────────────────────────────── */
  video: {
    eyebrow:  '',
    title:    '',
    sub:      '',
    src:      '',          // YouTube URL, Vimeo URL, or direct .mp4 URL
    poster:   '',          // Thumbnail for hosted video
    autoplay: false,
  },

  /* ──────────────────────────────────────────────
     18. IMAGE COLLAGE
     layout options: 3 | 5 | mosaic | circles | rounded
  ────────────────────────────────────────────── */
  collage: {
    eyebrow: '',
    title:   '',
    layout:  'mosaic',     // 3 | 5 | mosaic | circles | rounded
    images:  [
      // { src: 'url', alt: 'description' }
    ],
    link: { label: 'View Gallery', href: '#' },
  },

  /* ──────────────────────────────────────────────
     19. NEW ARRIVALS
  ────────────────────────────────────────────── */
  newArrivals: {
    eyebrow: 'Just In',
    title:   'New Arrivals',
    limit:   8,
  },

  /* ──────────────────────────────────────────────
     20. FULL WIDTH BANNER
  ────────────────────────────────────────────── */
  fullBanner: {
    eyebrow:        '',
    title:          '',
    sub:            '',
    image:          '',
    overlayOpacity: 0.45,
    cta:            { label: 'Shop Now', href: 'shop.html' },
  },

  /* ──────────────────────────────────────────────
     21. LOGO / BRAND CAROUSEL
  ────────────────────────────────────────────── */
  logos: {
    label: 'As featured in',
    items: [
      // { name: 'Brand Name', image: '' }  // image optional
    ],
  },

  /* ──────────────────────────────────────────────
     22. TESTIMONIALS
  ────────────────────────────────────────────── */
  testimonials: {
    eyebrow: 'Reviews',
    title:   'What Our Customers Say',
    sub:     '',
    items:   [
      // {
      //   name:   'Jane Smith',
      //   role:   'Verified Buyer',
      //   rating: 5,
      //   text:   'Amazing product! Fast delivery and excellent quality.',
      //   avatar: '',   // URL to avatar image (optional)
      // },
    ],
  },

  /* ──────────────────────────────────────────────
     23. TRUST BADGES
  ────────────────────────────────────────────── */
  trust: {
    items: [
      { icon: '🚚', label: 'Fast Delivery',  desc: 'Nationwide in 2–5 days' },
      { icon: '↩️', label: 'Easy Returns',   desc: '30 day hassle-free returns' },
      { icon: '🔒', label: 'Secure Payment', desc: 'SSL encrypted checkout' },
      { icon: '✅', label: 'Trusted Store',  desc: 'Verified SA business' },
    ],
  },

  /* ──────────────────────────────────────────────
     24. SPECIALS / SALE
  ────────────────────────────────────────────── */
  specials: {
    eyebrow: 'Deals',
    title:   'On Sale Now',
    limit:   8,
  },

  /* ──────────────────────────────────────────────
     25. RICH TEXT BLOCK
  ────────────────────────────────────────────── */
  richText: {
    eyebrow: '',
    title:   '',
    body:    '',   // HTML or plain text
    cta:     null, // { label: '', href: '' }
  },

  /* ──────────────────────────────────────────────
     26. TWO COLUMN (image + text)
  ────────────────────────────────────────────── */
  twoCol: {
    eyebrow:    '',
    title:      '',
    body:       '',
    image:      '',
    imageRight: false,   // true = image on right side
    cta:        null,    // { label: '', href: '' }
  },

  /* ──────────────────────────────────────────────
     27. FAQ
  ────────────────────────────────────────────── */
  faq: {
    eyebrow: 'FAQ',
    title:   'Frequently Asked Questions',
    items:   [
      // { q: 'Question here?', a: 'Answer here.' }
    ],
  },

  /* ──────────────────────────────────────────────
     28. NEWSLETTER
  ────────────────────────────────────────────── */
  newsletter: {
    eyebrow:     'Stay Connected',
    title:       'Join Our Newsletter',
    sub:         'Be the first to hear about new products and exclusive offers.',
    buttonLabel: 'Subscribe',
  },

  /* ──────────────────────────────────────────────
     29. CONTACT & SOCIAL
  ────────────────────────────────────────────── */
  contact: {
    address:  '',
    phone:    '',
    email:    '',
    whatsapp: '',   // Include country code e.g. +27821234567
  },

  social: {
    facebook:  '',
    instagram: '',
    tiktok:    '',
    twitter:   '',
  },

  hours: {
    weekdays: '',   // e.g. 'Mon – Fri: 08:00 – 17:00'
    saturday: '',
    sunday:   '',
  },

  /* ──────────────────────────────────────────────
     30. DELIVERY INFO
  ────────────────────────────────────────────── */
  delivery: {
    freeOver: 500,    // Free delivery threshold in ZAR (0 = always free)
    flatRate: 99,     // Standard delivery fee
    areas:    'Nationwide',
    note:     '',
  },

  /* ──────────────────────────────────────────────
     31. FOOTER COLUMNS (optional overrides)
  ────────────────────────────────────────────── */
  footer: {
    col1: {
      heading: 'Shop',
      links: [],  // Falls back to navLinks if empty
    },
    col2: {
      heading: 'Help',
      links: [
        { label: 'Contact Us',     href: 'contact.html' },
        { label: 'About Us',       href: 'about.html' },
        { label: 'Track Order',    href: 'order-status.html' },
        { label: 'Returns Policy', href: '#' },
      ],
    },
  },

};
