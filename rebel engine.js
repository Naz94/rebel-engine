/* ============================================================
   REBEL ENGINE v4.0
   Core storefront engine.
   Reads STORE_CONFIG → fetches remote tenant config → hydrates
   every data-* attribute in the page. Zero brand names here.
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────────────────────
   FONT PAIRS
   Clients pick a pair by name. Engine loads the Google Font URL.
───────────────────────────────────────────────────────────── */
const FONT_PAIRS = {
  'modern': {
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
    display: 'Inter', body: 'Inter'
  },
  'elegant': {
    url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lato:wght@400;600;700&display=swap',
    display: 'Playfair Display', body: 'Lato'
  },
  'bold': {
    url: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;500;600&display=swap',
    display: 'Barlow Condensed', body: 'Barlow'
  },
  'minimal': {
    url: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap',
    display: 'DM Sans', body: 'DM Sans'
  },
  'editorial': {
    url: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Nunito+Sans:wght@400;600;700&display=swap',
    display: 'Cormorant Garamond', body: 'Nunito Sans'
  },
  'technical': {
    url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap',
    display: 'Space Grotesk', body: 'Space Grotesk'
  },
  'friendly': {
    url: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap',
    display: 'Nunito', body: 'Nunito'
  },
  'luxury': {
    url: 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@700;900&family=Jost:wght@300;400;500;600&display=swap',
    display: 'Bodoni Moda', body: 'Jost'
  }
};

/* ─────────────────────────────────────────────────────────────
   CURRENCY HELPER
───────────────────────────────────────────────────────────── */
const Currency = {
  symbol: 'R',
  format(amount) {
    const num = parseFloat(amount) || 0;
    return `${this.symbol} ${num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`;
  }
};

/* ─────────────────────────────────────────────────────────────
   CART — localStorage backed
───────────────────────────────────────────────────────────── */
const Cart = {
  _key: 're_cart',

  get() {
    try { return JSON.parse(localStorage.getItem(this._key)) || []; }
    catch { return []; }
  },

  save(items) {
    localStorage.setItem(this._key, JSON.stringify(items));
    this._emit();
  },

  add(product, qty = 1) {
    const items = this.get();
    const existing = items.find(i => i.id === product._id);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({
        id:    product._id,
        name:  product.name,
        price: product.price,
        image: product.images?.[0]?.url || '',
        sku:   product.sku || '',
        qty
      });
    }
    this.save(items);
  },

  remove(id) {
    this.save(this.get().filter(i => i.id !== id));
  },

  setQty(id, qty) {
    if (qty < 1) { this.remove(id); return; }
    const items = this.get();
    const item = items.find(i => i.id === id);
    if (item) { item.qty = qty; this.save(items); }
  },

  count() {
    return this.get().reduce((sum, i) => sum + i.qty, 0);
  },

  subtotal() {
    return this.get().reduce((sum, i) => sum + (i.price * i.qty), 0);
  },

  clear() { localStorage.removeItem(this._key); this._emit(); },

  _emit() {
    const count = this.count();
    document.querySelectorAll('[data-cart-count]').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
    window.dispatchEvent(new CustomEvent('re:cartchange', { detail: { count } }));
  }
};

/* ─────────────────────────────────────────────────────────────
   WISHLIST — localStorage backed
───────────────────────────────────────────────────────────── */
const Wishlist = {
  _key: 're_wishlist',

  get() {
    try { return JSON.parse(localStorage.getItem(this._key)) || []; }
    catch { return []; }
  },

  toggle(id) {
    const list = this.get();
    const idx = list.indexOf(id);
    if (idx > -1) list.splice(idx, 1);
    else list.push(id);
    localStorage.setItem(this._key, JSON.stringify(list));
    this._emit();
    return idx === -1; // true = added
  },

  has(id) { return this.get().includes(id); },

  count() { return this.get().length; },

  _emit() {
    const count = this.count();
    document.querySelectorAll('[data-wishlist-count]').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }
};

/* ─────────────────────────────────────────────────────────────
   TOAST
───────────────────────────────────────────────────────────── */
const Toast = {
  _el: null,

  _ensure() {
    if (!this._el) {
      this._el = document.createElement('div');
      this._el.className = 're-toast';
      document.body.appendChild(this._el);
    }
    return this._el;
  },

  show(msg, type = 'success', duration = 3000) {
    const el = this._ensure();
    el.className = `re-toast re-toast--${type}`;
    el.innerHTML = `<span>${type === 'success' ? '✓' : '✕'}</span> ${msg}`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => el.classList.add('re-toast--show'));
    });
    clearTimeout(this._timer);
    this._timer = setTimeout(() => el.classList.remove('re-toast--show'), duration);
  }
};

/* ─────────────────────────────────────────────────────────────
   PRODUCTS API
───────────────────────────────────────────────────────────── */
const Products = {
  _base: '',
  _clientId: '',
  _cache: {},

  init(apiBase, clientId) {
    this._base = apiBase;
    this._clientId = clientId;
  },

  _headers() {
    return {
      'Content-Type':  'application/json',
      'x-client-id':   this._clientId
    };
  },

  async getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    const key = 'all_' + qs;
    if (this._cache[key]) return this._cache[key];

    try {
      const res = await fetch(`${this._base}/products?${qs}`, { headers: this._headers() });
      if (!res.ok) throw new Error('Products fetch failed');
      const json = await res.json();
      const data = json.data || json.products || [];
      this._cache[key] = data;
      return data;
    } catch (err) {
      console.warn('[RebelEngine] Products.getAll failed:', err.message);
      return [];
    }
  },

  async getFeatured(limit = 8) {
    return this.getAll({ limit, isFeatured: true, status: 'active' });
  },

  async getNewArrivals(limit = 8) {
    return this.getAll({ limit, sort: '-createdAt', status: 'active' });
  },

  async getByCategory(category, limit = 20) {
    return this.getAll({ category, limit, status: 'active' });
  },

  async getSale(limit = 8) {
    // FIX: backend filters by comparePrice existence, not a 'sale' flag
    return this.getAll({ hasDiscount: true, limit, status: 'active' });
  },

  async search(query) {
    return this.getAll({ search: query, limit: 8 });
  },

  /* Render products into a grid container */
  render(selector, products, opts = {}) {
    const container = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
    if (!container) return;

    if (!products.length) {
      container.innerHTML = `
        <div class="re-empty" style="grid-column:1/-1">
          <span class="re-empty__icon">📦</span>
          No products found.
        </div>`;
      return;
    }

    container.innerHTML = products.map(p => this._card(p, opts)).join('');

    // Attach add-to-cart listeners
    container.querySelectorAll('[data-add-cart]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.dataset.addCart;
        const product = products.find(p => p._id === id);
        if (product) {
          Cart.add(product, 1);
          Toast.show(`${product.name} added to cart`);
        }
      });
    });

    // Wishlist buttons
    container.querySelectorAll('[data-wishlist-btn]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.dataset.wishlistBtn;
        const added = Wishlist.toggle(id);
        btn.classList.toggle('active', added);
        btn.textContent = added ? '♥' : '♡';
        Toast.show(added ? 'Added to wishlist' : 'Removed from wishlist');
      });
    });

    // Card click → product page
    container.querySelectorAll('[data-product-card]').forEach(card => {
      card.addEventListener('click', () => {
        window.location.href = `product.html?id=${card.dataset.productCard}`;
      });
    });
  },

  _card(p, opts = {}) {
    const img = p.images?.[0]?.url || 'https://placehold.co/400x400/f5f5f5/999?text=Product';
    const inWishlist = Wishlist.has(p._id);
    const isNew = (Date.now() - new Date(p.createdAt)) < 7 * 24 * 60 * 60 * 1000;
    const hasDiscount = p.comparePrice && p.comparePrice > p.price;
    const outOfStock = p.stockQuantity <= 0;

    return `
      <div class="re-card" data-product-card="${p._id}" role="button" tabindex="0">
        <div class="re-card__media">
          <img src="${img}" alt="${p.name}" loading="lazy">
          ${isNew && !hasDiscount ? '<span class="re-card__badge re-card__badge--new">New</span>' : ''}
          ${hasDiscount ? `<span class="re-card__badge re-card__badge--sale">Sale</span>` : ''}
          <button class="re-card__wishlist ${inWishlist ? 'active' : ''}"
            data-wishlist-btn="${p._id}"
            aria-label="${inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}">
            ${inWishlist ? '♥' : '♡'}
          </button>
        </div>
        <div class="re-card__body">
          ${p.category ? `<div class="re-card__category">${p.category}</div>` : ''}
          <div class="re-card__name">${p.name}</div>
          <div class="re-card__pricing">
            <span class="re-card__price">${Currency.format(p.price)}</span>
            ${hasDiscount ? `<span class="re-card__old-price">${Currency.format(p.comparePrice)}</span>` : ''}
          </div>
          <span class="re-card__stock ${outOfStock ? 're-card__stock--out' : 're-card__stock--in'}">
            ${outOfStock ? 'Out of stock' : 'In stock'}
          </span>
          <button class="re-btn re-btn--primary re-card__cta"
            data-add-cart="${p._id}"
            ${outOfStock ? 'disabled' : ''}
            aria-label="Add ${p.name} to cart">
            ${outOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>`;
  }
};

/* ─────────────────────────────────────────────────────────────
   SEARCH
───────────────────────────────────────────────────────────── */
const Search = {
  _timer: null,

  initLive(inputSel, resultsSel) {
    const input   = document.querySelector(inputSel);
    const results = document.querySelector(resultsSel);
    if (!input || !results) return;

    input.addEventListener('input', () => {
      clearTimeout(this._timer);
      const q = input.value.trim();
      if (!q) { results.classList.remove('open'); return; }
      this._timer = setTimeout(() => this._run(q, results), 280);
    });

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !results.contains(e.target)) {
        results.classList.remove('open');
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') results.classList.remove('open');
      if (e.key === 'Enter') {
        e.preventDefault();
        const q = input.value.trim();
        if (q) window.location.href = `shop.html?search=${encodeURIComponent(q)}`;
      }
    });
  },

  async _run(q, resultsEl) {
    resultsEl.classList.add('open');
    resultsEl.innerHTML = `<div class="re-search__empty">Searching…</div>`;
    const products = await Products.search(q);

    if (!products.length) {
      resultsEl.innerHTML = `<div class="re-search__empty">No results for "${q}"</div>`;
      return;
    }

    resultsEl.innerHTML = products.slice(0, 6).map(p => `
      <a class="re-search__result" href="product.html?id=${p._id}">
        <img src="${p.images?.[0]?.url || 'https://placehold.co/40x40/f5f5f5/999?text=+'}" alt="${p.name}">
        <div>
          <strong>${p.name}</strong>
          <span>${Currency.format(p.price)}</span>
        </div>
      </a>
    `).join('') + `
      <a class="re-search__result" href="shop.html?search=${encodeURIComponent(q)}"
        style="justify-content:center;font-size:.82rem;color:var(--re-accent);font-weight:700">
        See all results for "${q}" →
      </a>`;
  }
};

/* ─────────────────────────────────────────────────────────────
   MAIN ENGINE
───────────────────────────────────────────────────────────── */
const RebelEngine = {
  apiBase:  '',
  clientId: '',
  config:   {},

  async init(localConfig = {}) {
    this.apiBase  = localConfig.apiBase  || '';
    this.clientId = localConfig.clientId || '';

    // Initialise sub-systems
    Currency.symbol = localConfig.currency || 'R';
    Products.init(this.apiBase, this.clientId);
    Cart._emit();    // sync cart count on page load
    Wishlist._emit();

    // Fetch remote config from API (overrides local defaults)
    let remote = {};
    if (this.apiBase && this.clientId) {
      try {
        const res = await fetch(
          `${this.apiBase}/config/${this.clientId}`,
          { headers: { 'x-client-id': this.clientId } }
        );
        if (res.ok) {
          const json = await res.json();
          remote = json.data || {};
        }
      } catch (err) {
        console.warn('[RebelEngine] Remote config fetch failed — using local config.', err.message);
      }
    }

    // Merge: remote wins over local
    this.config = this._mergeConfig(localConfig, remote);

    // Apply everything
    this._applyFonts();
    this._applyColors();
    this._applyBranding();
    this._applyMeta();
    this._buildNav();
    this._buildMobileNav();
    this._initNavScroll();
    this._initHamburger();
    this._initSearch();
    this._buildFooter();
    this._applyWhatsapp();

    return this.config;
  },

  /* ── Merge local STORE_CONFIG with remote API config ── */
  _mergeConfig(local, remote) {
    const r = remote;
    return {
      storeName:    r.settings?.storeName    || local.storeName    || 'My Store',
      storeTagline: r.settings?.description  || local.storeTagline || '',
      logoText:     local.logoText           || r.settings?.storeName?.split(' ')[0] || 'Store',
      logoImage:    r.branding?.logoUrl      || local.logoImage    || '',
      favicon:      r.branding?.favicon      || local.favicon      || '',
      apiBase:      local.apiBase,
      clientId:     local.clientId,
      currency:     r.settings?.currency     || local.currencyCode || 'ZAR',

      colors: {
        primary:   r.branding?.primaryColor  || local.colors?.primary   || '#111111',
        accent:    r.branding?.accentColor   || local.colors?.accent    || '#e63946',
        accentAlt: r.branding?.accentColor2  || local.colors?.accentAlt || '#457b9d',
        bg:                                     local.colors?.bg        || '#ffffff',
        surface:                                local.colors?.surface   || '#ffffff',
        text:                                   local.colors?.text      || '#111111',
      },

      font: r.settings?.font || local.font || 'modern',

      // Button style: solid | outline | pill
      buttonStyle: r.settings?.buttonStyle || local.buttonStyle || 'solid',

      // Border radius multiplier: sharp(0) / default(1) / rounded(2)
      borderRadius: r.settings?.borderRadius || local.borderRadius || 'default',

      navLinks: local.navLinks || [
        { label: 'Home',  href: 'index.html' },
        { label: 'Shop',  href: 'shop.html' },
        { label: 'About', href: 'about.html' },
      ],

      sections: {
        announcement:      local.sections?.announcement      ?? false,
        ticker:            local.sections?.ticker            ?? false,
        hero:              local.sections?.hero              ?? true,
        featuredProducts:  local.sections?.featuredProducts  ?? true,
        promoBanner:       local.sections?.promoBanner       ?? false,
        imageSlideshow:    local.sections?.imageSlideshow    ?? false,
        video:             local.sections?.video             ?? false,
        collage:           local.sections?.collage           ?? false,
        newArrivals:       local.sections?.newArrivals       ?? true,
        fullBanner:        local.sections?.fullBanner        ?? false,
        logoCarousel:      local.sections?.logoCarousel      ?? false,
        testimonials:      local.sections?.testimonials      ?? false,
        trust:             local.sections?.trust             ?? true,
        specials:          local.sections?.specials          ?? false,
        richText:          local.sections?.richText          ?? false,
        twoCol:            local.sections?.twoCol            ?? false,
        faq:               local.sections?.faq               ?? false,
        newsletter:        local.sections?.newsletter        ?? true,
      },

      announcement: local.announcement || null,
      hero:         local.hero         || {},
      featured:     local.featured     || {},
      banner:       local.banner       || {},
      slideshow:    local.slideshow    || {},
      video:        local.video        || {},
      collage:      local.collage      || {},
      newArrivals:  local.newArrivals  || {},
      fullBanner:   local.fullBanner   || {},
      logos:        local.logos        || {},
      testimonials: local.testimonials || {},
      trust:        local.trust        || {},
      specials:     local.specials     || {},
      richText:     local.richText     || {},
      twoCol:       local.twoCol       || {},
      faq:          local.faq          || {},
      newsletter:   local.newsletter   || {},

      contact: { ...(local.contact || {}), ...(r.contact || {}) },
      social:  { ...(local.social  || {}), ...(r.social  || {}) },
      hours:   local.hours   || {},
      delivery: local.delivery || {},
      categories: local.categories || [],

      footer: local.footer || {},
    };
  },

  /* ── Fonts ── */
  _applyFonts() {
    const pair = FONT_PAIRS[this.config.font] || FONT_PAIRS['modern'];

    // FIX: create font link if not present in HTML (checkout, shop, etc.)
    let link = document.getElementById('re-font-link');
    if (!link) {
      link = document.createElement('link');
      link.id  = 're-font-link';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = pair.url;

    document.documentElement.style.setProperty('--re-font-display', `'${pair.display}', sans-serif`);
    document.documentElement.style.setProperty('--re-font-body',    `'${pair.body}', sans-serif`);
  },

  /* ── CSS variables from config ── */
  _applyColors() {
    const c = this.config.colors;
    const r = document.documentElement;
    if (c.primary)   r.style.setProperty('--re-primary',  c.primary);
    if (c.accent)    r.style.setProperty('--re-accent',   c.accent);
    if (c.accentAlt) r.style.setProperty('--re-accent-2', c.accentAlt);
    if (c.bg)        r.style.setProperty('--re-bg',       c.bg);
    if (c.surface)   r.style.setProperty('--re-surface',  c.surface);
    if (c.text)      r.style.setProperty('--re-text',     c.text);

    // Derive hover colour (darken accent by 12%)
    if (c.accent) {
      r.style.setProperty('--re-accent-hover', this._darken(c.accent, 12));
    }

    // Border radius preset
    const radii = { sharp: '0px', default: '8px', rounded: '16px' };
    const rad = radii[this.config.borderRadius] || '8px';
    r.style.setProperty('--re-radius',    rad);
    r.style.setProperty('--re-radius-lg', `calc(${rad} * 2)`);

    // FIX: pill button style — inject a stylesheet rule, not a CSS var that has no effect
    if (this.config.buttonStyle === 'pill') {
      const s = document.createElement('style');
      s.textContent = '.re-btn { border-radius: 9999px !important; }';
      document.head.appendChild(s);
    }
  },

  /* ── Logo, name, tagline, favicon ── */
  _applyBranding() {
    const cfg = this.config;

    // Store name
    document.querySelectorAll('[data-store-name]').forEach(el => el.textContent = cfg.storeName);
    document.querySelectorAll('[data-store-tagline]').forEach(el => el.textContent = cfg.storeTagline);

    // Logo
    if (cfg.logoImage) {
      document.querySelectorAll('[data-store-logo]').forEach(el => {
        el.src = cfg.logoImage;
        el.alt = cfg.storeName;
        el.style.display = 'block';
      });
      document.querySelectorAll('[data-store-logo-text]').forEach(el => el.style.display = 'none');
    } else {
      document.querySelectorAll('[data-store-logo-text]').forEach(el => el.textContent = cfg.logoText || cfg.storeName);
    }

    // Favicon
    if (cfg.favicon) {
      const fav = document.getElementById('re-favicon');
      if (fav) fav.href = cfg.favicon;
    }

    // Contact in footer
    const contact = cfg.contact || {};
    document.querySelectorAll('[data-store-address]').forEach(el => el.textContent = contact.address || '');
    document.querySelectorAll('[data-store-phone]').forEach(el => {
      el.textContent = contact.phone || '';
      if (contact.phone) el.href = `tel:${contact.phone.replace(/\s/g, '')}`;
    });
    document.querySelectorAll('[data-store-email]').forEach(el => {
      el.textContent = contact.email || '';
      if (contact.email) el.href = `mailto:${contact.email}`;
    });
  },

  /* ── Page <title> and <meta description> ── */
  _applyMeta() {
    document.title = this.config.storeName;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = this.config.storeTagline || this.config.storeName;
  },

  /* ── Nav links ── */
  _buildNav() {
    const ul = document.querySelector('[data-nav-links]');
    if (!ul) return;
    const links = this.config.navLinks || [];
    ul.innerHTML = links.map(l =>
      `<li><a href="${l.href}" data-nav-link>${l.label}</a></li>`
    ).join('');

    // Active link
    links.forEach((l, i) => {
      if (window.location.pathname.endsWith(l.href) ||
          window.location.href.includes(l.href)) {
        ul.children[i]?.querySelector('a')?.classList.add('active');
      }
    });
  },

  _buildMobileNav() {
    const nav = document.querySelector('[data-mobile-nav-links]');
    if (!nav) return;
    const links = this.config.navLinks || [];
    nav.innerHTML = links.map(l =>
      `<a href="${l.href}">${l.label}</a>`
    ).join('');
  },

  /* ── Nav scroll effect ── */
  _initNavScroll() {
    const nav = document.querySelector('[data-nav]');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  },

  /* ── Hamburger toggle ── */
  _initHamburger() {
    const btn  = document.querySelector('[data-hamburger]');
    const mNav = document.querySelector('[data-mobile-nav]');
    if (!btn || !mNav) return;

    btn.addEventListener('click', () => {
      const open = mNav.classList.toggle('open');
      btn.classList.toggle('active', open);
      mNav.setAttribute('aria-hidden', !open);
      // FIX: lock body scroll when nav is open
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!btn.contains(e.target) && !mNav.contains(e.target)) {
        mNav.classList.remove('open');
        btn.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  },

  /* ── Search ── */
  _initSearch() {
    Search.initLive('[data-search-input]', '[data-search-results]');
  },

  /* ── Footer columns ── */
  _buildFooter() {
    // Social icons
    const social = document.getElementById('footerSocial');
    if (social) {
      const s = this.config.social || {};
      const icons = [
        { key: 'facebook',  icon: '📘', label: 'Facebook' },
        { key: 'instagram', icon: '📷', label: 'Instagram' },
        { key: 'tiktok',    icon: '🎵', label: 'TikTok' },
        { key: 'twitter',   icon: '✖',  label: 'Twitter/X' },
        { key: 'whatsapp',  icon: '💬', label: 'WhatsApp',
          href: (v) => `https://wa.me/${v.replace(/\D/g, '')}` },
      ];
      social.innerHTML = icons
        .filter(i => s[i.key])
        .map(i => {
          const href = i.href ? i.href(s[i.key]) : s[i.key];
          return `<a href="${href}" target="_blank" rel="noopener" title="${i.label}">${i.icon}</a>`;
        }).join('');
    }

    // Hours
    const hoursEl = document.getElementById('footerHours');
    const hours = this.config.hours || {};
    if (hoursEl && (hours.weekdays || hours.saturday || hours.sunday)) {
      hoursEl.innerHTML = [hours.weekdays, hours.saturday, hours.sunday]
        .filter(Boolean).join('<br>');
    }

    // Default footer columns if not overridden
    const cfg = this.config;
    const col1heading = document.querySelector('[data-footer-col1-heading]');
    const col1links   = document.querySelector('[data-footer-col1-links]');
    const col2heading = document.querySelector('[data-footer-col2-heading]');
    const col2links   = document.querySelector('[data-footer-col2-links]');

    if (col1heading) col1heading.textContent = cfg.footer?.col1?.heading || 'Shop';
    if (col1links) {
      const links = cfg.footer?.col1?.links || cfg.navLinks?.slice(0, 5) || [];
      col1links.innerHTML = links.map(l =>
        `<li><a href="${l.href}">${l.label}</a></li>`
      ).join('');
    }
    if (col2heading) col2heading.textContent = cfg.footer?.col2?.heading || 'Help';
    if (col2links) {
      const links = cfg.footer?.col2?.links || [
        { label: 'Contact Us',     href: 'contact.html' },
        { label: 'About',          href: 'about.html' },
        { label: 'Track Order',    href: 'order-status.html' },
        { label: 'Returns Policy', href: '#returns' },
      ];
      col2links.innerHTML = links.map(l =>
        `<li><a href="${l.href}">${l.label}</a></li>`
      ).join('');
    }
  },

  /* ── WhatsApp float ── */
  _applyWhatsapp() {
    const wa = this.config.contact?.whatsapp || this.config.social?.whatsapp;
    const btn = document.querySelector('[data-whatsapp-float]');
    if (!btn) return;
    if (wa) {
      const num = wa.replace(/\D/g, '');
      btn.href = `https://wa.me/${num}`;
      btn.style.display = 'flex';
    } else {
      btn.style.display = 'none';
    }
  },

  /* ── Utility: darken a hex colour ── */
  _darken(hex, pct) {
    try {
      const n = parseInt(hex.replace('#', ''), 16);
      const f = 1 - pct / 100;
      const r = Math.max(0, Math.round(((n >> 16) & 0xff) * f));
      const g = Math.max(0, Math.round(((n >> 8)  & 0xff) * f));
      const b = Math.max(0, Math.round(((n)        & 0xff) * f));
      return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
    } catch { return hex; }
  }
};

/* ─────────────────────────────────────────────────────────────
   ORDERS
   FIX: customer shape uses name (not firstName+lastName)
   FIX: correct payload shape matching backend createOrder
   FIX: x-client-id header (lowercase) on all requests
───────────────────────────────────────────────────────────── */
const Orders = {
  // FIX: backend expects customer.name, shippingAddress, payment.method
  async submit(formData) {
    const cart = Cart.get();
    if (!cart.length) throw new Error('Cart is empty');

    const payload = {
      customer: {
        // FIX: combine first+last into name — backend Order model uses customer.name
        name:  `${formData.customer.firstName} ${formData.customer.lastName}`.trim(),
        email: formData.customer.email,
        phone: formData.customer.phone,
      },
      shippingAddress: {
        streetAddress: formData.shipping.address,
        city:          formData.shipping.city,
        province:      formData.shipping.province,
        postalCode:    formData.shipping.postalCode,
        country:       'South Africa',
      },
      items: cart.map(i => ({
        product:  i.id,
        quantity: i.qty,
        price:    i.price,
      })),
      payment: {
        method: formData.paymentMethod || 'eft',
      },
      notes: formData.notes || '',
    };

    const res = await fetch(`${RebelEngine.apiBase}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id':  RebelEngine.clientId,
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (!json.success) throw new Error(json.message || 'Order failed');

    Cart.clear();
    return json.order || json.data;
  },

  renderEFTDetails(container, orderData) {
    const el = typeof container === 'string' ? document.querySelector(container) : container;
    if (!el || !orderData.eftDetails) return;
    const { bankName, accountHolder, accountNumber, branchCode, reference } = orderData.eftDetails;
    el.innerHTML = `
      <div class="re-eft">
        <h3>🏦 EFT Payment Details</h3>
        <p class="re-eft__note">Use your order number as the payment reference.</p>
        <div class="re-eft__detail"><span>Bank</span><strong>${bankName}</strong></div>
        <div class="re-eft__detail"><span>Account Holder</span><strong>${accountHolder}</strong></div>
        <div class="re-eft__detail"><span>Account Number</span><strong>${accountNumber}</strong></div>
        <div class="re-eft__detail"><span>Branch Code</span><strong>${branchCode}</strong></div>
        <div class="re-eft__detail re-eft__reference">
          <span>Reference</span>
          <strong>${reference || orderData.orderNumber}</strong>
        </div>
        <p class="re-eft__warning">⚠️ Your order is only processed once payment is confirmed.</p>
      </div>`;
  },

  async getStatus(orderNumber) {
    const res  = await fetch(`${RebelEngine.apiBase}/orders/status/${orderNumber}`, {
      headers: { 'x-client-id': RebelEngine.clientId },
    });
    const json = await res.json();
    return json.success ? json.data : null;
  },

  // Load payment methods configured for this tenant
  async getPaymentMethods() {
    try {
      const res  = await fetch(`${RebelEngine.apiBase}/payments/methods`, {
        headers: { 'x-client-id': RebelEngine.clientId },
      });
      const json = await res.json();
      return json.success ? json.data : [];
    } catch { return []; }
  },
};

/* ─────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────── */
const Helpers = {
  param(name) {
    return new URLSearchParams(window.location.search).get(name);
  },
  debounce(fn, ms = 300) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  },
  formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-ZA', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  },
  stars(rating, max = 5) {
    const full  = Math.floor(rating);
    const half  = rating % 1 >= 0.5 ? 1 : 0;
    const empty = max - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
  },
  loading(container, show = true) {
    const el = typeof container === 'string' ? document.querySelector(container) : container;
    if (!el) return;
    if (show) el.innerHTML = `<div class="re-loading"><div class="re-spinner"></div><p>Loading...</p></div>`;
  },
};

/* ─────────────────────────────────────────────────────────────
   CART DRAWER
   FIX: cart icon opens drawer, not cart.html
───────────────────────────────────────────────────────────── */
const CartDrawer = {
  open() {
    const drawer  = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (!drawer) { window.location.href = 'checkout.html'; return; }
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    this.render();
  },

  close() {
    const drawer  = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (drawer)  drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  },

  render() {
    const items     = Cart.get();
    const itemsEl   = document.getElementById('cartItems');
    const subtotalEl = document.getElementById('cartSubtotal');

    if (!itemsEl) return;

    if (!items.length) {
      itemsEl.innerHTML = `
        <div class="re-empty">
          <span class="re-empty__icon">🛒</span>
          Your cart is empty.
        </div>`;
      if (subtotalEl) subtotalEl.textContent = `${Currency.symbol} 0.00`;
      return;
    }

    itemsEl.innerHTML = items.map(item => `
      <div class="re-cart-item">
        <img class="re-cart-item__img"
          src="${item.image || 'https://placehold.co/64x64/f5f5f5/999?text=+'}"
          alt="${item.name}">
        <div class="re-cart-item__info">
          <div class="re-cart-item__name">${item.name}</div>
          <div class="re-cart-item__price">${Currency.format(item.price)}</div>
          <div class="re-cart-item__qty">
            <button class="re-cart-item__qty-btn"
              onclick="Cart.setQty('${item.id}',${item.qty - 1}); CartDrawer.render()">−</button>
            <span class="re-cart-item__qty-num">${item.qty}</span>
            <button class="re-cart-item__qty-btn"
              onclick="Cart.setQty('${item.id}',${item.qty + 1}); CartDrawer.render()">+</button>
          </div>
        </div>
        <button class="re-cart-item__remove"
          onclick="Cart.remove('${item.id}'); CartDrawer.render()"
          aria-label="Remove">✕</button>
      </div>`).join('');

    if (subtotalEl) subtotalEl.textContent = Currency.format(Cart.subtotal());
  },
};

// Wire cart icons to drawer on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-cart-icon]').forEach(el => {
    el.addEventListener('click', () => CartDrawer.open());
  });
  // Close drawer on overlay click
  const overlay = document.getElementById('cartOverlay');
  if (overlay) overlay.addEventListener('click', () => CartDrawer.close());
  // Re-render drawer if open when cart changes
  window.addEventListener('re:cartchange', () => {
    const drawer = document.getElementById('cartDrawer');
    if (drawer?.classList.contains('open')) CartDrawer.render();
  });
});

/* ─────────────────────────────────────────────────────────────
   EXPOSE GLOBALS
   All modules available to inline scripts and rebel-sections.js
───────────────────────────────────────────────────────────── */
window.RebelEngine = RebelEngine;
window.Products    = Products;
window.Cart        = Cart;
window.Wishlist    = Wishlist;
window.Toast       = Toast;
window.Search      = Search;
window.Currency    = Currency;
window.Orders      = Orders;
window.Helpers     = Helpers;
window.CartDrawer  = CartDrawer;
