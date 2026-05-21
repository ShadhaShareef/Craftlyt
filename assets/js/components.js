window.Craftlyt = window.Craftlyt || {};

(function (C) {
  'use strict';

  C.renderStars = function (rating) {
    var full = Math.floor(rating);
    var half = rating - full >= 0.5;
    var html = '<span class="stars" aria-label="' + C.esc(rating) + ' out of 5">';
    for (var i = 0; i < 5; i++) {
      var cls = 'star';
      if (i < full) cls += ' star--full';
      else if (i === full && half) cls += ' star--half';
      html += '<span class="' + cls + '" aria-hidden="true">★</span>';
    }
    html += '</span>';
    return html;
  };

  C.renderProductCard = function (p, opts) {
    opts = opts || {};
    var href = opts.href || C.page('product.php?id=' + encodeURIComponent(p.id));
    var img = p.image.indexOf('http') === 0 ? p.image : C.asset(p.image);
    return (
      '<article class="product-card" data-id="' +
      C.esc(p.id) +
      '">' +
      '<a href="' +
      C.esc(href) +
      '" class="product-card-link">' +
      '<div class="product-card-image-wrap">' +
      '<img class="product-card-img" src="' +
      C.esc(img) +
      '" alt="" width="640" height="480" loading="lazy" />' +
      '<span class="product-card-badge">' +
      C.esc(p.category) +
      '</span></div>' +
      '<div class="product-card-body">' +
      '<h2 class="product-card-title">' +
      C.esc(p.title) +
      '</h2>' +
      '<p class="product-card-desc">' +
      C.esc(p.description) +
      '</p>' +
      '<div class="product-card-footer">' +
      '<span class="product-card-price">' +
      C.esc(C.formatPrice(p.price)) +
      '</span>' +
      '<span class="product-card-creator">' +
      '<img class="product-card-avatar" src="' +
      C.esc(p.avatar) +
      '" alt="" width="36" height="36" loading="lazy" />' +
      '<span class="product-card-creator-name">' +
      C.esc(p.creator) +
      '</span></span></div></div></a></article>'
    );
  };

  C.renderEmptyState = function (opts) {
    return (
      '<div class="empty-state">' +
      '<div class="empty-state-icon" aria-hidden="true">' +
      C.esc(opts.icon || '○') +
      '</div>' +
      '<h2 class="empty-state-title">' +
      C.esc(opts.title) +
      '</h2>' +
      '<p class="empty-state-desc">' +
      C.esc(opts.description || '') +
      '</p>' +
      (opts.actionHtml || '') +
      '</div>'
    );
  };

  C.renderBadge = function (text, variant) {
    return (
      '<span class="badge badge--' +
      C.esc(variant || 'neutral') +
      '">' +
      C.esc(text) +
      '</span>'
    );
  };

  C.renderStatusBadge = function (status) {
    var map = {
      active: 'success',
      draft: 'neutral',
      sold: 'muted',
      open: 'brand',
      negotiating: 'warning',
      closed: 'muted',
    };
    return C.renderBadge(status, map[status] || 'neutral');
  };
})(window.Craftlyt);

