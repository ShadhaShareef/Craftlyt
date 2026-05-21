(function () {
  'use strict';

  var PRODUCTS = window.CraftlytProducts || [];
  var C = window.Craftlyt;

  var categories = ['All'].concat(
    Array.from(
      new Set(
        PRODUCTS.map(function (p) {
          return p.category;
        })
      )
    )
  );

  var searchInput = document.getElementById('store-search');
  var pillsRoot = document.getElementById('category-pills');
  var grid = document.getElementById('product-grid');
  var countEl = document.getElementById('storefront-count');
  var emptyEl = document.getElementById('storefront-empty');

  var activeCategory = 'All';

  function matchesSearch(p, q) {
    if (!q) return true;
    var hay = (p.title + ' ' + p.description + ' ' + p.creator + ' ' + p.category).toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function matchesCategory(p) {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  }

  function getFiltered() {
    var q = searchInput.value.trim().toLowerCase();
    return PRODUCTS.filter(function (p) {
      return matchesCategory(p) && matchesSearch(p, q);
    });
  }

  function syncPillAria() {
    pillsRoot.querySelectorAll('.storefront-pill').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.category === activeCategory ? 'true' : 'false');
    });
  }

  function buildPills() {
    pillsRoot.innerHTML = '';
    categories.forEach(function (cat) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'storefront-pill';
      btn.textContent = cat;
      btn.dataset.category = cat;
      btn.addEventListener('click', function () {
        activeCategory = cat;
        syncPillAria();
        updateGrid();
      });
      pillsRoot.appendChild(btn);
    });
    syncPillAria();
  }

  function updateGrid() {
    var list = getFiltered();
    if (list.length === 0) {
      grid.innerHTML = '';
      emptyEl.hidden = false;
      countEl.textContent = 'No listings match your filters.';
      return;
    }

    emptyEl.hidden = true;
    countEl.textContent = list.length === 1 ? '1 listing' : list.length + ' listings';

    if (C && C.renderProductCard) {
      grid.innerHTML = list
        .map(function (p) {
          return C.renderProductCard(p, { href: 'pages/product.php?id=' + encodeURIComponent(p.id) });
        })
        .join('');
      return;
    }

    grid.innerHTML = list
      .map(function (p) {
        return (
          '<article class="product-card"><a href="pages/product.php?id=' +
          encodeURIComponent(p.id) +
          '" class="product-card-link"><div class="product-card-image-wrap"><img class="product-card-img" src="' +
          p.image +
          '" alt=""><span class="product-card-badge">' +
          p.category +
          '</span></div><div class="product-card-body"><h2 class="product-card-title">' +
          p.title +
          '</h2><p class="product-card-desc">' +
          p.description +
          '</p><div class="product-card-footer"><span class="product-card-price">$' +
          p.price +
          '</span></div></div></a></article>'
        );
      })
      .join('');
    grid.innerHTML = grid.innerHTML.replace(/<\/?motion-illustration>/g, '');
  }

  buildPills();
  searchInput.addEventListener('input', updateGrid);
  updateGrid();
})();

