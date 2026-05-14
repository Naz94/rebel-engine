<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="">
  <title>Shop</title>
  <link id="re-font-link" rel="stylesheet" href="">
  <link rel="stylesheet" href="rebel-base.css">
  <link id="re-favicon" rel="icon" href="">
  <style>
    .shop-layout {
      display: grid;
      grid-template-columns: 260px 1fr;
      gap: 40px;
      align-items: start;
    }
    .shop-sidebar {
      position: sticky;
      top: calc(var(--re-nav-height) + 24px);
    }
    .shop-filter-block {
      background: var(--re-surface);
      border: 1px solid var(--re-border);
      border-radius: var(--re-radius-lg);
      padding: 24px;
      margin-bottom: 16px;
    }
    .shop-filter-title {
      font-family: var(--re-font-display);
      font-weight: 800;
      font-size: 0.78rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--re-text-muted);
      margin-bottom: 16px;
    }
    .shop-filter-option {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 0;
      font-size: 0.9rem;
      cursor: pointer;
      color: var(--re-text);
      transition: color var(--re-transition);
      width: 100%;
      text-align: left;
      background: none;
      border: none;
    }
    .shop-filter-option:hover,
    .shop-filter-option.active { color: var(--re-accent); font-weight: 700; }
    .shop-filter-option .count {
      margin-left: auto;
      font-size: 0.75rem;
      color: var(--re-text-muted);
    }
    .shop-price-inputs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .shop-price-inputs input {
      width: 100%;
      padding: 8px 12px;
      border: 2px solid var(--re-border);
      border-radius: var(--re-radius);
      font-size: 0.85rem;
      color: var(--re-text);
      background: var(--re-surface);
      outline: none;
    }
    .shop-price-inputs input:focus { border-color: var(--re-accent); }
    .shop-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }
    .shop-count {
      font-size: 0.88rem;
      color: var(--re-text-muted);
    }
    .shop-sort {
      padding: 8px 14px;
      border: 2px solid var(--re-border);
      border-radius: var(--re-radius);
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--re-text);
      background: var(--re-surface);
      cursor: pointer;
      outline: none;
      transition: border-color var(--re-transition);
    }
    .shop-sort:focus { border-color: var(--re-accent); }
    .shop-view-toggle {
      display: flex;
      gap: 4px;
    }
    .shop-view-btn {
      width: 36px; height: 36px;
      display: flex; align-items: center; justify-content: center;
      border: 2px solid var(--re-border);
      border-radius: var(--re-radius);
      font-size: 0.9rem;
      color: var(--re-text-muted);
      background: var(--re-surface);
      cursor: pointer;
      transition: all var(--re-transition);
    }
    .shop-view-btn.active,
    .shop-view-btn:hover {
      border-color: var(--re-accent);
      color: var(--re-accent);
    }
    .shop-pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 48px;
      flex-wrap: wrap;
    }
    .shop-page-btn {
      min-width: 40px; height: 40px;
      padding: 0 12px;
      display: flex; align-items: center; justify-content: center;
      border: 2px solid var(--re-border);
      border-radius: var(--re-radius);
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--re-text-muted);
      background: var(--re-surface);
      cursor: pointer;
      transition: all var(--re-transition);
    }
    .shop-page-btn:hover { border-color: var(--re-primary); color: var(--re-primary); }
    .shop-page-btn.active { background: var(--re-primary); color: #fff; border-color: var(--re-primary); }
    .shop-page-btn:disabled { opacity: 0.35; pointer-events: none; }
    /* Mobile sidebar toggle */
    .shop-filter-toggle {
      display: none;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      border: 2px solid var(--re-border);
      border-radius: var(--re-radius);
      font-weight: 700;
      font-size: 0.85rem;
      background: var(--re-surface);
      color: var(--re-text);
      cursor: pointer;
    }
    .shop-active-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 16px;
    }
    .shop-active-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      background: var(--re-bg-alt);
      border: 1px solid var(--re-border);
      border-radius: var(--re-radius-full);
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--re-text);
    }
    .shop-active-tag button {
      font-size: 0.8rem;
      color: var(--re-text-muted);
      transition: color var(--re-transition);
    }
    .shop-active-tag button:hover { color: #e63946; }
    @media (max-width: 900px) {
      .shop-layout { grid-template-columns: 1fr; }
      .shop-sidebar {
        position: static;
        display: none;
      }
      .shop-sidebar.open { display: block; }
      .shop-filter-toggle { display: flex; }
    }
  </style>
</head>
<body>

<!-- ANNOUNCEMENT -->
<div data-section="announcement" style="display:none">
  <span data-announcement-text></span>
  <button class="re-announcement__close" onclick="this.parentElement.style.display='none'">✕</button>
</div>

<!-- NAV -->
<nav data-nav>
  <div class="re-container">
    <div class="re-nav__inner">
      <a href="index.html" class="re-nav__logo">
        <img data-store-logo style="display:none" alt="">
        <span data-store-logo-text></span>
      </a>
      <ul class="re-nav__links" data-nav-links></ul>
      <div class="re-nav__actions">
        <div class="re-search-wrapper">
          <span class="re-search__icon">🔍</span>
          <input class="re-nav__search" data-search-input type="search"
            placeholder="Search products..." autocomplete="off">
          <div class="re-search__results" data-search-results></div>
        </div>
        <div class="re-nav__icon" data-wishlist-icon title="Wishlist">
          ♡<span data-wishlist-count style="display:none">0</span>
        </div>
        <div class="re-nav__icon" data-cart-icon title="Cart">
          🛒<span data-cart-count style="display:none">0</span>
        </div>
        <div data-hamburger><span></span><span></span><span></span></div>
      </div>
    </div>
  </div>
</nav>
<div data-mobile-nav aria-hidden="true"><nav data-mobile-nav-links></nav></div>
<div class="re-nav-spacer"></div>

<!-- CART DRAWER -->
<div class="re-cart-overlay" id="cartOverlay"></div>
<div class="re-cart-drawer" id="cartDrawer">
  <div class="re-cart-drawer__header">
    <span class="re-cart-drawer__title">Your Cart (<span data-cart-count>0</span>)</span>
    <button class="re-cart-drawer__close" onclick="CartDrawer.close()">✕</button>
  </div>
  <div class="re-cart-drawer__items" id="cartItems"></div>
  <div class="re-cart-drawer__footer">
    <div class="re-cart-drawer__subtotal">
      <span>Subtotal</span><span id="cartSubtotal">R 0.00</span>
    </div>
    <a href="checkout.html" class="re-btn re-btn--primary re-btn--full re-btn--lg">Checkout</a>
  </div>
</div>

<!-- PAGE HEADER -->
<section class="re-section--sm re-section--alt">
  <div class="re-container">
    <h1 class="re-section-title" id="shopTitle">Shop</h1>
    <p style="color:var(--re-text-muted);margin-top:8px;font-size:.95rem" id="shopSubtitle"></p>
  </div>
</section>

<!-- MAIN -->
<section class="re-section--sm">
  <div class="re-container">

    <!-- Mobile filter toggle -->
    <div style="margin-bottom:16px">
      <button class="shop-filter-toggle" onclick="toggleSidebar()">
        ☰ Filters
        <span id="activeFilterCount" style="display:none;background:var(--re-accent);color:#fff;border-radius:50%;width:18px;height:18px;font-size:.65rem;display:flex;align-items:center;justify-content:center"></span>
      </button>
    </div>

    <!-- Active filter tags -->
    <div class="shop-active-filters" id="activeFilters"></div>

    <div class="shop-layout">

      <!-- SIDEBAR -->
      <aside class="shop-sidebar" id="shopSidebar">

        <!-- Categories -->
        <div class="shop-filter-block">
          <div class="shop-filter-title">Category</div>
          <div id="categoryFilters">
            <button class="shop-filter-option active" onclick="Shop.setCategory(null, this)">
              All Products
            </button>
          </div>
        </div>

        <!-- Price range -->
        <div class="shop-filter-block">
          <div class="shop-filter-title">Price Range</div>
          <div class="shop-price-inputs">
            <input type="number" id="priceMin" placeholder="Min" min="0">
            <input type="number" id="priceMax" placeholder="Max" min="0">
          </div>
          <button class="re-btn re-btn--outline re-btn--full re-btn--sm" style="margin-top:12px"
            onclick="Shop.applyPriceFilter()">Apply</button>
        </div>

        <!-- Sort (sidebar version for mobile) -->
        <div class="shop-filter-block">
          <div class="shop-filter-title">Sort By</div>
          <div id="sortFilters">
            <button class="shop-filter-option active" onclick="Shop.setSort('newest', this)">Newest First</button>
            <button class="shop-filter-option" onclick="Shop.setSort('price_asc', this)">Price: Low to High</button>
            <button class="shop-filter-option" onclick="Shop.setSort('price_desc', this)">Price: High to Low</button>
          </div>
        </div>

        <!-- Stock -->
        <div class="shop-filter-block">
          <div class="shop-filter-title">Availability</div>
          <button class="shop-filter-option" id="inStockFilter" onclick="Shop.toggleInStock(this)">
            ☐ In Stock Only
          </button>
        </div>

        <!-- Clear all -->
        <button class="re-btn re-btn--ghost re-btn--full" onclick="Shop.clearFilters()"
          style="font-size:.82rem">
          Clear All Filters
        </button>

      </aside>

      <!-- PRODUCTS -->
      <div>
        <div class="shop-toolbar">
          <span class="shop-count" id="productCount">Loading...</span>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <select class="shop-sort" id="sortSelect" onchange="Shop.setSort(this.value)">
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
            <div class="shop-view-toggle">
              <button class="shop-view-btn active" id="gridBtn" onclick="Shop.setView('grid', this)" title="Grid view">⊞</button>
              <button class="shop-view-btn" id="listBtn" onclick="Shop.setView('list', this)" title="List view">☰</button>
            </div>
          </div>
        </div>

        <div id="productsGrid" class="re-grid re-grid--3">
          <!-- Skeletons while loading -->
          <div class="re-skeleton" style="height:340px;border-radius:16px"></div>
          <div class="re-skeleton" style="height:340px;border-radius:16px"></div>
          <div class="re-skeleton" style="height:340px;border-radius:16px"></div>
          <div class="re-skeleton" style="height:340px;border-radius:16px"></div>
          <div class="re-skeleton" style="height:340px;border-radius:16px"></div>
          <div class="re-skeleton" style="height:340px;border-radius:16px"></div>
        </div>

        <!-- Pagination -->
        <div class="shop-pagination" id="pagination"></div>
      </div>

    </div>
  </div>
</section>

<!-- FOOTER -->
<footer data-footer>
  <div class="re-container">
    <div class="re-footer__grid">
      <div>
        <a href="index.html" class="re-footer__logo">
          <img data-store-logo style="display:none" alt="">
          <span data-store-logo-text></span>
        </a>
        <p class="re-footer__tagline" data-store-tagline></p>
        <div class="re-footer__social" id="footerSocial"></div>
      </div>
      <div>
        <p class="re-footer__heading" data-footer-col1-heading></p>
        <ul class="re-footer__links" data-footer-col1-links></ul>
      </div>
      <div>
        <p class="re-footer__heading" data-footer-col2-heading></p>
        <ul class="re-footer__links" data-footer-col2-links></ul>
      </div>
      <div>
        <p class="re-footer__heading">Contact</p>
        <ul class="re-footer__links">
          <li data-store-address style="color:rgba(255,255,255,.6);font-size:.88rem;line-height:1.8"></li>
          <li><a data-store-phone style="color:rgba(255,255,255,.6)"></a></li>
          <li><a data-store-email style="color:rgba(255,255,255,.6)"></a></li>
          <li id="footerHours" style="margin-top:10px;font-size:.82rem;color:rgba(255,255,255,.4);line-height:1.9"></li>
        </ul>
      </div>
    </div>
    <div class="re-footer__bottom">
      <p>© <span id="footerYear"></span> <span data-store-name></span>. All rights reserved.</p>
      <p>Powered by <strong style="color:var(--re-accent)">Rebel Engine</strong> 🇿🇦</p>
    </div>
  </div>
</footer>

<a data-whatsapp-float href="#" target="_blank" rel="noopener" aria-label="WhatsApp" style="display:none">💬</a>

<script src="rebel-engine.js"></script>
<script src="STORE_CONFIG.js"></script>
<script>
/* ─────────────────────────────────────────────────────────────
   SHOP STATE
───────────────────────────────────────────────────────────── */
const Shop = {
  _state: {
    category:    null,
    sort:        'newest',
    search:      null,
    priceMin:    null,
    priceMax:    null,
    inStockOnly: false,
    page:        1,
    limit:       12,
    total:       0,
    totalPages:  0,
    view:        'grid',
  },

  async load() {
    const grid = document.getElementById('productsGrid');
    Helpers.loading(grid, true);

    const params = { sort: this._state.sort, page: this._state.page, limit: this._state.limit };
    if (this._state.category) params.category = this._state.category;
    if (this._state.search)   params.search   = this._state.search;

    try {
      // Use direct fetch so we get pagination data back
      const qs  = new URLSearchParams(params).toString();
      const res = await fetch(
        `${RebelEngine.apiBase}/products?${qs}`,
        { headers: { 'x-client-id': RebelEngine.clientId } }
      );
      const json = await res.json();

      let products = json.data || [];
      this._state.total      = json.total || products.length;
      this._state.totalPages = json.pagination?.totalPages || 1;

      // Client-side price filter (backend doesn't support it)
      if (this._state.priceMin !== null) products = products.filter(p => p.price >= this._state.priceMin);
      if (this._state.priceMax !== null) products = products.filter(p => p.price <= this._state.priceMax);
      if (this._state.inStockOnly)       products = products.filter(p => p.stockQuantity > 0);

      // Update count
      document.getElementById('productCount').textContent =
        `${this._state.total} product${this._state.total !== 1 ? 's' : ''}`;

      Products.render(grid, products);
      this._renderPagination();
      this._renderActiveFilters();
      this._updateURL();

    } catch (err) {
      grid.innerHTML = `<div class="re-empty" style="grid-column:1/-1">
        <span class="re-empty__icon">⚠️</span>
        <p>Could not load products. Please try again.</p>
      </div>`;
    }
  },

  async loadCategories() {
    try {
      const res  = await fetch(
        `${RebelEngine.apiBase}/products/categories`,
        { headers: { 'x-client-id': RebelEngine.clientId } }
      );
      const json = await res.json();
      const cats = json.data || [];
      const container = document.getElementById('categoryFilters');
      if (!container || !cats.length) return;

      container.innerHTML = `
        <button class="shop-filter-option active" onclick="Shop.setCategory(null, this)">
          All Products
        </button>
        ${cats.map(c => `
          <button class="shop-filter-option" onclick="Shop.setCategory('${c}', this)">
            ${c}
          </button>`).join('')}`;
    } catch { /* categories are optional */ }
  },

  setCategory(cat, btn) {
    this._state.category = cat;
    this._state.page     = 1;
    document.querySelectorAll('#categoryFilters .shop-filter-option')
      .forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.load();
  },

  setSort(val, btn) {
    this._state.sort = val;
    this._state.page = 1;
    // Sync both sort controls
    const sel = document.getElementById('sortSelect');
    if (sel) sel.value = val;
    if (btn) {
      document.querySelectorAll('#sortFilters .shop-filter-option')
        .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
    this.load();
  },

  applyPriceFilter() {
    const min = parseFloat(document.getElementById('priceMin').value);
    const max = parseFloat(document.getElementById('priceMax').value);
    this._state.priceMin = isNaN(min) ? null : min;
    this._state.priceMax = isNaN(max) ? null : max;
    this._state.page     = 1;
    this.load();
  },

  toggleInStock(btn) {
    this._state.inStockOnly = !this._state.inStockOnly;
    btn.textContent = this._state.inStockOnly ? '☑ In Stock Only' : '☐ In Stock Only';
    btn.classList.toggle('active', this._state.inStockOnly);
    this._state.page = 1;
    this.load();
  },

  setPage(p) {
    this._state.page = p;
    this.load();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  setView(view, btn) {
    this._state.view = view;
    const grid = document.getElementById('productsGrid');
    grid.className = view === 'list'
      ? 're-grid re-grid--1'
      : 're-grid re-grid--3';
    document.querySelectorAll('.shop-view-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
  },

  clearFilters() {
    this._state.category    = null;
    this._state.sort        = 'newest';
    this._state.search      = null;
    this._state.priceMin    = null;
    this._state.priceMax    = null;
    this._state.inStockOnly = false;
    this._state.page        = 1;
    // Reset UI
    document.getElementById('priceMin').value = '';
    document.getElementById('priceMax').value = '';
    document.getElementById('sortSelect').value = 'newest';
    document.querySelectorAll('.shop-filter-option').forEach(b => b.classList.remove('active'));
    document.querySelector('#categoryFilters .shop-filter-option')?.classList.add('active');
    document.querySelector('#sortFilters .shop-filter-option')?.classList.add('active');
    const inStockBtn = document.getElementById('inStockFilter');
    if (inStockBtn) inStockBtn.textContent = '☐ In Stock Only';
    this.load();
  },

  _renderPagination() {
    const el    = document.getElementById('pagination');
    const total = this._state.totalPages;
    const cur   = this._state.page;
    if (!el || total <= 1) { el.innerHTML = ''; return; }

    let pages = [];
    pages.push(`<button class="shop-page-btn" onclick="Shop.setPage(${cur - 1})"
      ${cur === 1 ? 'disabled' : ''}>‹ Prev</button>`);

    for (let i = 1; i <= total; i++) {
      if (total > 7 && Math.abs(i - cur) > 2 && i !== 1 && i !== total) {
        if (i === 2 || i === total - 1) pages.push(`<span style="padding:0 4px;color:var(--re-text-muted)">…</span>`);
        continue;
      }
      pages.push(`<button class="shop-page-btn ${i === cur ? 'active' : ''}"
        onclick="Shop.setPage(${i})">${i}</button>`);
    }

    pages.push(`<button class="shop-page-btn" onclick="Shop.setPage(${cur + 1})"
      ${cur === total ? 'disabled' : ''}>Next ›</button>`);

    el.innerHTML = pages.join('');
  },

  _renderActiveFilters() {
    const el   = document.getElementById('activeFilters');
    const tags = [];
    if (this._state.category)    tags.push({ label: this._state.category, clear: () => this.setCategory(null) });
    if (this._state.search)      tags.push({ label: `"${this._state.search}"`, clear: () => { this._state.search = null; this._state.page = 1; this.load(); } });
    if (this._state.priceMin)    tags.push({ label: `Min: R${this._state.priceMin}`, clear: () => { this._state.priceMin = null; this.load(); } });
    if (this._state.priceMax)    tags.push({ label: `Max: R${this._state.priceMax}`, clear: () => { this._state.priceMax = null; this.load(); } });
    if (this._state.inStockOnly) tags.push({ label: 'In Stock Only', clear: () => this.toggleInStock(document.getElementById('inStockFilter')) });
    if (!el) return;
    el.innerHTML = tags.map((t, i) => `
      <span class="shop-active-tag">
        ${t.label}
        <button onclick="Shop._clearTag(${i})" aria-label="Remove filter">✕</button>
      </span>`).join('');
    this._tags = tags;
  },

  _clearTag(i) { this._tags[i]?.clear(); },

  _updateURL() {
    const params = new URLSearchParams();
    if (this._state.category) params.set('category', this._state.category);
    if (this._state.search)   params.set('search',   this._state.search);
    if (this._state.sort !== 'newest') params.set('sort', this._state.sort);
    if (this._state.page > 1) params.set('page', this._state.page);
    const qs = params.toString();
    history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
  },

  _readURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('category')) this._state.category = params.get('category');
    if (params.get('search'))   this._state.search   = params.get('search');
    if (params.get('sort'))     this._state.sort      = params.get('sort');
    if (params.get('page'))     this._state.page      = parseInt(params.get('page')) || 1;
  },
};

function toggleSidebar() {
  document.getElementById('shopSidebar').classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', async () => {
  const config = await RebelEngine.init(window.STORE_CONFIG);

  // Page title from config
  const title = config.sections?.shopTitle || 'Shop';
  document.getElementById('shopTitle').textContent = title;
  document.title = `${title} | ${config.storeName}`;

  // Read URL params (category/search from links)
  Shop._readURL();

  // Sync sort select
  document.getElementById('sortSelect').value = Shop._state.sort;

  // Load categories and products in parallel
  await Promise.all([
    Shop.loadCategories(),
    Shop.load(),
  ]);

  // Footer year
  document.getElementById('footerYear').textContent = new Date().getFullYear();

  // Intersection observer animations
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('animated'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
});
</script>
</body>
</html>
