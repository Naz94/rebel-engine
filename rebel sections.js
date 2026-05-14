/* ============================================================
   REBEL SECTIONS v4.0
   Reads RebelEngine.config and renders every homepage section.
   Called once after RebelEngine.init() resolves.
   ============================================================ */

'use strict';

const Sections = {

  async render(config) {
    const s = config.sections;

    this._announcement(config);
    this._ticker(config);
    this._hero(config);
    this._promoBanner(config);
    this._imageSlideshow(config);
    this._video(config);
    this._collage(config);
    this._fullBanner(config);
    this._logoCarousel(config);
    this._trust(config);
    this._richText(config);
    this._twoCol(config);
    this._faq(config);
    this._newsletter(config);

    // These need product fetches — run in parallel
    await Promise.all([
      s.featuredProducts ? this._featuredProducts(config) : null,
      s.newArrivals      ? this._newArrivals(config)      : null,
      s.testimonials     ? this._testimonials(config)     : null,
      s.specials         ? this._specials(config)         : null,
    ].filter(Boolean));
  },

  /* ── Show/hide helper ── */
  _show(selector) {
    const el = document.querySelector(`[data-section="${selector}"]`);
    if (el) el.style.display = '';
  },
  _hide(selector) {
    const el = document.querySelector(`[data-section="${selector}"]`);
    if (el) el.style.display = 'none';
  },
  _set(selector, value) {
    document.querySelectorAll(`[${selector}]`).forEach(el => {
      if (value !== undefined && value !== null && value !== '') {
        el.textContent = value;
      }
    });
  },
  _setAttr(selector, attr, value) {
    document.querySelectorAll(`[${selector}]`).forEach(el => {
      if (value) el.setAttribute(attr, value);
    });
  },

  /* ── 1. ANNOUNCEMENT BAR ── */
  _announcement(config) {
    const a = config.announcement;
    if (!config.sections.announcement || !a) return;
    const bar = document.querySelector('[data-section="announcement"]');
    if (!bar) return;
    bar.style.display = '';
    document.querySelector('[data-announcement-text]').textContent = a.text || '';
    const link = document.querySelector('[data-announcement-link]');
    if (a.linkText && a.linkHref) {
      link.textContent = a.linkText;
      link.href = a.linkHref;
      link.style.display = '';
    }
  },

  /* ── 2. TICKER ── */
  _ticker(config) {
    if (!config.sections.ticker) return;
    const items = config.ticker?.items || [
      'Free delivery on orders over ' + Currency.format(config.delivery?.freeOver || 500),
      'Secure payment',
      'SA owned and operated',
      '30 day returns',
    ];
    const track = document.getElementById('tickerTrack');
    if (!track) return;
    const html = items.map(t => `<span class="re-ticker__item">${t}</span>`).join('');
    track.innerHTML = html + html; // duplicate for seamless loop
    this._show('ticker');
  },

  /* ── 3. HERO ── */
  _hero(config) {
    if (!config.sections.hero) return;
    const h = config.hero || {};
    const variant = h.style || 'split';

    // Hide all variants first
    document.querySelectorAll('[data-hero-variant]').forEach(el => el.style.display = 'none');

    if (variant === 'slideshow') {
      const el = document.querySelector('[data-hero-variant="slideshow"]');
      if (el) el.style.display = '';
      const slides = h.slides || [];
      if (slides.length && window.Slideshow) {
        Slideshow.init('heroSlideTrack', slides, h.autoplayMs || 5000);
      }
    } else {
      const el = document.querySelector(`[data-hero-variant="${variant}"]`);
      if (el) el.style.display = '';

      // Populate fields
      document.querySelectorAll('[data-hero-eyebrow]').forEach(el => el.textContent = h.eyebrow || '');
      document.querySelectorAll('[data-hero-title]').forEach(el => el.textContent = h.title || config.storeName);
      document.querySelectorAll('[data-hero-sub]').forEach(el => el.textContent = h.sub || config.storeTagline || '');

      // CTA buttons
      document.querySelectorAll('[data-hero-cta-primary]').forEach(el => {
        if (h.cta?.label) {
          el.textContent = h.cta.label;
          el.href = h.cta.href || 'shop.html';
        }
      });
      document.querySelectorAll('[data-hero-cta-secondary]').forEach(el => {
        if (h.cta2?.label) {
          el.textContent = h.cta2.label;
          el.href = h.cta2.href || 'shop.html';
          el.style.display = '';
        }
      });

      // Image / video
      if (h.image) {
        document.querySelectorAll('[data-hero-image]').forEach(el => {
          el.src = h.image;
          el.style.display = '';
        });
      }
      if (h.video) {
        document.querySelectorAll('[data-hero-video]').forEach(el => {
          el.src = h.video;
          el.style.display = '';
          el.load();
        });
        // If video is provided, hide the static image
        if (variant === 'center' || variant === 'split') {
          document.querySelectorAll('[data-hero-image]').forEach(el => el.style.display = 'none');
        }
      }

      // Overlay opacity
      if (h.overlayOpacity !== undefined) {
        document.querySelectorAll('.re-hero__overlay').forEach(el => {
          el.style.background = `rgba(0,0,0,${h.overlayOpacity})`;
        });
      }

      // Min height
      if (h.height) {
        document.querySelectorAll('.re-hero').forEach(el => {
          el.style.minHeight = h.height;
        });
      }
    }

    this._show('hero');
  },

  /* ── 4. FEATURED PRODUCTS ── */
  async _featuredProducts(config) {
    if (!config.sections.featuredProducts) return;
    const f = config.featured || {};
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;

    // Section text
    document.querySelectorAll('[data-featured-eyebrow]').forEach(el => el.textContent = f.eyebrow || 'Shop');
    document.querySelectorAll('[data-featured-title]').forEach(el => el.textContent = f.title || 'Featured Products');
    document.querySelectorAll('[data-featured-sub]').forEach(el => el.textContent = f.sub || '');

    // Category filter pills
    const pillsContainer = document.getElementById('categoryPills');
    const cats = config.categories || [];
    if (pillsContainer && cats.length) {
      pillsContainer.style.display = 'flex';
      pillsContainer.innerHTML = `
        <button class="re-pill active" onclick="Sections._filterCategory(null, this)">All</button>
        ${cats.map(c =>
          `<button class="re-pill" onclick="Sections._filterCategory('${c.slug}', this)">
            ${c.icon ? `<span>${c.icon}</span>` : ''} ${c.label}
          </button>`
        ).join('')}`;
    }

    // Load products
    const limit = f.limit || 8;
    const products = await Products.getAll({ limit, status: 'active' });
    this._allFeatured = products;
    Products.render(grid, products);
    this._show('featured-products');
  },

  // Called by category pill clicks
  _filterCategory(slug, btn) {
    document.querySelectorAll('#categoryPills .re-pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const filtered = slug
      ? (this._allFeatured || []).filter(p => p.category?.toLowerCase() === slug)
      : (this._allFeatured || []);
    Products.render('#featuredGrid', filtered);
  },

  /* ── 5. PROMO BANNER ── */
  _promoBanner(config) {
    if (!config.sections.promoBanner) return;
    const b = config.banner || {};
    document.querySelectorAll('[data-banner-eyebrow]').forEach(el => el.textContent = b.eyebrow || '');
    document.querySelectorAll('[data-banner-title]').forEach(el => el.textContent = b.title || '');
    document.querySelectorAll('[data-banner-sub]').forEach(el => el.textContent = b.sub || '');
    document.querySelectorAll('[data-banner-cta]').forEach(el => {
      if (b.cta?.label) { el.textContent = b.cta.label; el.href = b.cta.href || '#'; }
    });
    document.querySelectorAll('[data-banner-image]').forEach(el => {
      if (b.image) el.src = b.image;
    });
    this._show('promo-banner');
  },

  /* ── 6. IMAGE SLIDESHOW ── */
  _imageSlideshow(config) {
    if (!config.sections.imageSlideshow) return;
    const s = config.slideshow || {};
    document.querySelectorAll('[data-slideshow-eyebrow]').forEach(el => el.textContent = s.eyebrow || '');
    document.querySelectorAll('[data-slideshow-title]').forEach(el => el.textContent = s.title || '');
    if (s.slides?.length && window.Slideshow) {
      Slideshow.init('standaloneTrack', s.slides, s.autoplayMs || 4500);
    }
    this._show('image-slideshow');
  },

  /* ── 7. VIDEO ── */
  _video(config) {
    if (!config.sections.video) return;
    const v = config.video || {};
    document.querySelectorAll('[data-video-eyebrow]').forEach(el => el.textContent = v.eyebrow || '');
    document.querySelectorAll('[data-video-title]').forEach(el => el.textContent = v.title || '');
    document.querySelectorAll('[data-video-sub]').forEach(el => el.textContent = v.sub || '');

    const container = document.getElementById('videoContainer');
    if (container && v.src) {
      if (v.type === 'youtube' || v.type === 'vimeo' || v.src.includes('youtube') || v.src.includes('vimeo')) {
        // Embed iframe
        let src = v.src;
        // Convert youtube watch URL to embed
        src = src.replace('watch?v=', 'embed/').replace('youtu.be/', 'www.youtube.com/embed/');
        container.innerHTML = `
          <iframe
            src="${src}"
            title="${v.title || 'Video'}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style="width:100%;height:100%;position:absolute;inset:0">
          </iframe>`;
      } else {
        // Hosted video
        container.innerHTML = `
          <video
            controls
            playsinline
            ${v.autoplay ? 'autoplay muted' : ''}
            poster="${v.poster || ''}"
            style="width:100%;height:100%;object-fit:cover">
            <source src="${v.src}">
          </video>`;
      }
    }
    this._show('video');
  },

  /* ── 8. IMAGE COLLAGE ── */
  _collage(config) {
    if (!config.sections.collage) return;
    const c = config.collage || {};
    document.querySelectorAll('[data-collage-eyebrow]').forEach(el => el.textContent = c.eyebrow || '');
    document.querySelectorAll('[data-collage-title]').forEach(el => el.textContent = c.title || '');
    document.querySelectorAll('[data-collage-link]').forEach(el => {
      if (c.link?.label) { el.textContent = c.link.label; el.href = c.link.href || '#'; el.style.display = ''; }
    });

    const grid = document.getElementById('collageGrid');
    if (!grid || !c.images?.length) return;

    // Set layout variant
    const layout = c.layout || 'mosaic'; // 3 | 5 | mosaic | circles | rounded
    grid.className = `re-collage re-collage--${layout}`;

    grid.innerHTML = c.images.map((img, i) => `
      <div class="re-collage__item" data-animate data-delay="${i * 100}">
        <img src="${img.src || img}" alt="${img.alt || ''}" loading="lazy">
      </div>`
    ).join('');

    this._show('collage');
  },

  /* ── 9. NEW ARRIVALS ── */
  async _newArrivals(config) {
    if (!config.sections.newArrivals) return;
    const a = config.newArrivals || {};
    document.querySelectorAll('[data-arrivals-eyebrow]').forEach(el => el.textContent = a.eyebrow || 'Just In');
    document.querySelectorAll('[data-arrivals-title]').forEach(el => el.textContent = a.title || 'New Arrivals');

    const grid = document.getElementById('newArrivalsGrid');
    if (!grid) return;
    const products = await Products.getNewArrivals(a.limit || 8);
    Products.render(grid, products);
    this._show('new-arrivals');
  },

  /* ── 10. FULL WIDTH BANNER ── */
  _fullBanner(config) {
    if (!config.sections.fullBanner) return;
    const b = config.fullBanner || {};
    document.querySelectorAll('[data-fullbanner-eyebrow]').forEach(el => el.textContent = b.eyebrow || '');
    document.querySelectorAll('[data-fullbanner-title]').forEach(el => el.textContent = b.title || '');
    document.querySelectorAll('[data-fullbanner-sub]').forEach(el => el.textContent = b.sub || '');
    document.querySelectorAll('[data-fullbanner-cta]').forEach(el => {
      if (b.cta?.label) { el.textContent = b.cta.label; el.href = b.cta.href || '#'; }
    });
    document.querySelectorAll('[data-fullbanner-image]').forEach(el => {
      if (b.image) el.src = b.image;
    });
    if (b.overlayOpacity !== undefined) {
      document.querySelectorAll('.re-banner--full .re-banner__overlay').forEach(el => {
        el.style.background = `rgba(0,0,0,${b.overlayOpacity})`;
      });
    }
    this._show('full-banner');
  },

  /* ── 11. LOGO CAROUSEL ── */
  _logoCarousel(config) {
    if (!config.sections.logoCarousel) return;
    const l = config.logos || {};
    const track = document.getElementById('logoTrack');
    if (!track) return;
    document.querySelectorAll('[data-logos-label]').forEach(el => el.textContent = l.label || 'As seen in');

    const items = l.items || [];
    if (!items.length) return;
    const html = items.map(item =>
      item.image
        ? `<div class="re-logo-item"><img src="${item.image}" alt="${item.name || ''}"></div>`
        : `<div class="re-logo-item"><span class="re-logo-name">${item.name}</span></div>`
    ).join('');
    track.innerHTML = html + html; // duplicate for infinite scroll
    this._show('logo-carousel');
  },

  /* ── 12. TESTIMONIALS ── */
  async _testimonials(config) {
    if (!config.sections.testimonials) return;
    const t = config.testimonials || {};
    document.querySelectorAll('[data-testimonials-eyebrow]').forEach(el => el.textContent = t.eyebrow || 'Reviews');
    document.querySelectorAll('[data-testimonials-title]').forEach(el => el.textContent = t.title || 'What Our Customers Say');
    document.querySelectorAll('[data-testimonials-sub]').forEach(el => el.textContent = t.sub || '');

    const grid = document.getElementById('testimonialsGrid');
    if (!grid) return;

    const items = t.items || [];
    if (!items.length) {
      // Hide section if no testimonials configured
      return;
    }

    grid.innerHTML = items.map((item, i) => `
      <div class="re-testimonial" data-animate data-delay="${i * 100}">
        <div class="re-testimonial__stars">${'★'.repeat(item.rating || 5)}</div>
        <p class="re-testimonial__text">${item.text}</p>
        <div class="re-testimonial__author">
          ${item.avatar
            ? `<img class="re-testimonial__avatar" src="${item.avatar}" alt="${item.name}">`
            : `<div class="re-testimonial__avatar" style="display:flex;align-items:center;justify-content:center;background:var(--re-bg-alt);font-size:1.2rem">${item.name?.[0] || '?'}</div>`
          }
          <div>
            <div class="re-testimonial__name">${item.name}</div>
            ${item.role ? `<div class="re-testimonial__role">${item.role}</div>` : ''}
          </div>
        </div>
      </div>`
    ).join('');

    this._show('testimonials');
  },

  /* ── 13. TRUST BADGES ── */
  _trust(config) {
    if (!config.sections.trust) return;
    const t = config.trust || {};
    const grid = document.getElementById('trustGrid');
    if (!grid) return;

    const items = t.items || [
      { icon: '🚚', label: 'Fast Delivery',     desc: 'Nationwide 2–5 days' },
      { icon: '↩️', label: 'Easy Returns',      desc: '30 day hassle-free returns' },
      { icon: '🔒', label: 'Secure Payment',    desc: 'Your data is safe' },
      { icon: '✅', label: '100% Authentic',    desc: 'Verified products only' },
    ];

    grid.innerHTML = items.map(item => `
      <div class="re-trust__item">
        <span class="re-trust__icon">${item.icon}</span>
        <div>
          <strong class="re-trust__label">${item.label}</strong>
          <span class="re-trust__desc">${item.desc}</span>
        </div>
      </div>`
    ).join('');

    this._show('trust');
  },

  /* ── 14. SPECIALS / SALE ── */
  async _specials(config) {
    if (!config.sections.specials) return;
    const s = config.specials || {};
    document.querySelectorAll('[data-specials-eyebrow]').forEach(el => el.textContent = s.eyebrow || 'Deals');
    document.querySelectorAll('[data-specials-title]').forEach(el => el.textContent = s.title || 'On Sale');

    const grid = document.getElementById('specialsGrid');
    if (!grid) return;
    const products = await Products.getSale(s.limit || 8);
    Products.render(grid, products);
    this._show('specials');
  },

  /* ── 15. RICH TEXT ── */
  _richText(config) {
    if (!config.sections.richText) return;
    const r = config.richText || {};
    document.querySelectorAll('[data-richtext-eyebrow]').forEach(el => el.textContent = r.eyebrow || '');
    document.querySelectorAll('[data-richtext-title]').forEach(el => el.textContent = r.title || '');
    document.querySelectorAll('[data-richtext-body]').forEach(el => {
      // Supports plain text or safe HTML (dashboard sanitises on save)
      el.innerHTML = r.body || '';
    });
    document.querySelectorAll('[data-richtext-cta]').forEach(el => {
      if (r.cta?.label) { el.textContent = r.cta.label; el.href = r.cta.href || '#'; el.style.display = ''; }
    });
    this._show('rich-text');
  },

  /* ── 16. TWO COLUMN ── */
  _twoCol(config) {
    if (!config.sections.twoCol) return;
    const t = config.twoCol || {};
    document.querySelectorAll('[data-twocol-eyebrow]').forEach(el => el.textContent = t.eyebrow || '');
    document.querySelectorAll('[data-twocol-title]').forEach(el => el.textContent = t.title || '');
    document.querySelectorAll('[data-twocol-body]').forEach(el => el.innerHTML = t.body || '');
    document.querySelectorAll('[data-twocol-image]').forEach(el => {
      if (t.image) el.src = t.image;
    });
    document.querySelectorAll('[data-twocol-cta]').forEach(el => {
      if (t.cta?.label) { el.textContent = t.cta.label; el.href = t.cta.href || '#'; el.style.display = ''; }
    });

    // Image left or right
    if (t.imageRight) {
      const grid = document.getElementById('twoColGrid');
      if (grid) {
        const children = [...grid.children];
        children.forEach(c => grid.appendChild(c)); // reverses order
      }
    }

    this._show('two-col');
  },

  /* ── 17. FAQ ── */
  _faq(config) {
    if (!config.sections.faq) return;
    const f = config.faq || {};
    document.querySelectorAll('[data-faq-eyebrow]').forEach(el => el.textContent = f.eyebrow || 'FAQ');
    document.querySelectorAll('[data-faq-title]').forEach(el => el.textContent = f.title || 'Frequently Asked Questions');

    const list = document.getElementById('faqList');
    if (!list) return;
    const items = f.items || [];
    if (!items.length) return;

    list.innerHTML = items.map((item, i) => `
      <div class="re-faq__item">
        <button class="re-faq__question" onclick="Sections._toggleFaq(this)" aria-expanded="false">
          <span>${item.q}</span>
          <span class="re-faq__chevron">▾</span>
        </button>
        <div class="re-faq__answer">
          <div class="re-faq__answer-inner">${item.a}</div>
        </div>
      </div>`
    ).join('');

    this._show('faq');
  },

  _toggleFaq(btn) {
    const item = btn.closest('.re-faq__item');
    const isOpen = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
  },

  /* ── 18. NEWSLETTER ── */
  _newsletter(config) {
    if (!config.sections.newsletter) return;
    const n = config.newsletter || {};
    document.querySelectorAll('[data-newsletter-eyebrow]').forEach(el => el.textContent = n.eyebrow || 'Stay in the loop');
    document.querySelectorAll('[data-newsletter-title]').forEach(el => el.textContent = n.title || 'Join our mailing list');
    document.querySelectorAll('[data-newsletter-sub]').forEach(el => el.textContent = n.sub || 'Get notified about new products and exclusive offers.');
    document.querySelectorAll('[data-newsletter-btn]').forEach(el => {
      const label = n.buttonLabel || 'Subscribe';
      el.textContent = label;
      el.setAttribute('data-original', label);
    });
    this._show('newsletter');
  },
};

window.Sections = Sections;
