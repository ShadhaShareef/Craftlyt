(function () {
  'use strict';
  var C = window.Craftlyt;
  var root = document.getElementById('product-root');
  var id = C.getParam('id');
  var product = id ? C.getProductById(id) : null;

  if (!product) {
    root.innerHTML =
      '<div class="container">' +
      C.renderEmptyState({
        icon: '◇',
        title: 'Product not found',
        description: 'This listing may have been removed or the link is incorrect.',
        actionHtml:
          '<div class="empty-state-actions"><a href="' +
          C.esc(C.rootPage('storefront.php')) +
          '" class="primary-btn">Back to storefront</a></div>',
      }) +
      '</div>';
    root.innerHTML = root.innerHTML.replace(/<\/?motion-illustration>/g, '');
    document.title = 'Not found — Craftlyt';
    return;
  }

  document.title = product.title + ' — Craftlyt';
  var images = product.images || [product.image];
  var related = C.getRelatedProducts(product, 4);
  var mainSrc = C.asset(images[0]);

  var thumbs = images
    .map(function (src, i) {
      return (
        '<button type="button" class="product-thumb' +
        (i === 0 ? ' is-active' : '') +
        '" data-src="' +
        C.esc(C.asset(src)) +
        '"><img src="' +
        C.esc(C.asset(src)) +
        '" alt="" width="72" height="72"></button>'
      );
    })
    .join('');

  var relatedHtml = '';
  if (related.length) {
    relatedHtml =
      '<section class="related-section"><h2>Related work</h2><div class="related-grid">' +
      related.map(function (p) {
        return C.renderProductCard(p);
      }).join('') +
      '</div></section>';
  }

  root.innerHTML =
    '<div class="container">' +
    '<div class="product-detail-grid">' +
    '<div class="product-gallery">' +
    '<div class="product-gallery-main"><img id="product-main-img" src="' +
    C.esc(mainSrc) +
    '" alt=""></div>' +
    '<div class="product-thumbs">' +
    thumbs +
    '</div></div>' +
    '<div class="product-detail-info">' +
    '<span class="product-card-badge" style="position:static;display:inline-block;margin-bottom:12px">' +
    C.esc(product.category) +
    '</span>' +
    '<h1>' +
    C.esc(product.title) +
    '</h1>' +
    '<div class="rating-row">' +
    C.renderStars(product.rating) +
    '<span>' +
    product.rating +
    ' (' +
    product.reviewCount +
    ' reviews)</span></div>' +
    '<p class="product-detail-price">' +
    C.esc(C.formatPrice(product.price)) +
    '</p>' +
    '<p class="product-detail-desc">' +
    C.esc(product.longDescription || product.description) +
    '</p>' +
    '<div class="creator-box">' +
    '<img class="creator-box-avatar" src="' +
    C.esc(product.avatar) +
    '" alt="" width="56" height="56">' +
    '<div class="creator-box-meta"><h3>' +
    C.esc(product.creator) +
    (product.verified ? ' <span class="verified-badge">✓ Verified</span>' : '') +
    '</h3><p>' +
    C.esc(product.responseTime || '') +
    '</p>' +
    '<a href="' +
    C.esc(C.rootPage('storefront.php')) +
    '" class="secondary-btn" style="margin-top:10px;display:inline-flex;padding:8px 16px;font-size:13px">View storefront</a></div></div>' +
    '<div class="product-actions">' +
    '<button type="button" class="primary-btn" id="btn-request">Request custom order</button>' +
    '<a href="messages.php" class="secondary-btn">Message creator</a>' +
    '<button type="button" class="btn-ghost" id="btn-save">Save product</button></div>' +
    '<div class="tabs" role="tablist">' +
    '<button type="button" class="tab-btn is-active" data-tab="details">Details</button>' +
    '<button type="button" class="tab-btn" data-tab="shipping">Shipping</button>' +
    '<button type="button" class="tab-btn" data-tab="materials">Materials</button></div>' +
    '<div id="tab-details" class="tab-panel is-active"><p style="line-height:1.75;color:#666">' +
    C.esc(product.longDescription || product.description) +
    '</p></div>' +
    '<div id="tab-shipping" class="tab-panel"><p style="line-height:1.75;color:#666">' +
    C.esc(product.shipping) +
    '</p></div>' +
    '<div id="tab-materials" class="tab-panel"><p style="line-height:1.75;color:#666"><strong>Materials:</strong> ' +
    C.esc(product.materials) +
    '<br><strong>Dimensions:</strong> ' +
    C.esc(product.dimensions) +
    '</p></div></div></div>' +
    relatedHtml +
    '</div>';

  root.innerHTML = root.innerHTML.replace(/<\/?motion-illustration>/g, '');

  root.querySelectorAll('.product-thumb').forEach(function (btn) {
    btn.addEventListener('click', function () {
      root.querySelectorAll('.product-thumb').forEach(function (b) {
        b.classList.remove('is-active');
      });
      btn.classList.add('is-active');
      document.getElementById('product-main-img').src = btn.dataset.src;
    });
  });

  root.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      root.querySelectorAll('.tab-btn').forEach(function (b) {
        b.classList.remove('is-active');
      });
      root.querySelectorAll('.tab-panel').forEach(function (p) {
        p.classList.remove('is-active');
      });
      btn.classList.add('is-active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('is-active');
    });
  });

  document.getElementById('btn-save').addEventListener('click', function () {
    this.classList.toggle('is-saved');
    this.textContent = this.classList.contains('is-saved') ? 'Saved' : 'Save product';
  });
})();

