(function () {
  'use strict';
  var C = window.Craftlyt;
  var root = document.getElementById('buyer-root');
  var buyer = window.CraftlytBuyerData || { cart: [], saved: [], activeRequests: [] };
  var products = window.CraftlytProducts || [];

  C.guardPage('buyer', root, function () {
    var cartItems = buyer.cart
      .map(function (item) {
        var p = C.getProductById(item.productId);
        if (!p) return '';
        var sub = p.price * item.quantity;
        return (
          '<div class="cart-item" data-id="' +
          p.id +
          '">' +
          '<img src="' +
          C.esc(C.asset(p.image)) +
          '" alt="">' +
          '<div class="cart-item-body"><h4>' +
          C.esc(p.title) +
          '</h4><p class="cart-item-creator">by ' +
          C.esc(p.creator) +
          '</p>' +
          '<div class="qty-controls">' +
          '<button type="button" class="qty-minus" aria-label="Decrease">−</button>' +
          '<span class="qty-val">' +
          item.quantity +
          '</span>' +
          '<button type="button" class="qty-plus" aria-label="Increase">+</button></div></div>' +
          '<div class="cart-item-actions"><span class="cart-subtotal">' +
          C.esc(C.formatPrice(sub)) +
          '</span>' +
          '<button type="button" class="btn-remove">Remove</button></div></div>'
        );
      })
      .filter(Boolean);

    var total = buyer.cart.reduce(function (sum, item) {
      var p = C.getProductById(item.productId);
      return sum + (p ? p.price * item.quantity : 0);
    }, 0);

    var cartHtml = cartItems.length
      ? '<div class="cart-card">' +
        cartItems.join('') +
        '<div class="cart-total-row"><span>Total</span><span>' +
        C.esc(C.formatPrice(total)) +
        '</span></div><button type="button" class="primary-btn" style="width:100%;margin-top:16px">Checkout (demo)</button></div>'
      : C.renderEmptyState({
          icon: '○',
          title: 'Your cart is empty',
          description: 'Browse the storefront and add pieces you love.',
          actionHtml:
            '<div class="empty-state-actions"><a href="' +
            C.esc(C.rootPage('storefront.php')) +
            '" class="primary-btn">Browse storefront</a></div>',
        });

    cartHtml = cartHtml.replace(/<\/?motion-illustration>/g, '');

    var savedHtml = buyer.saved.length
      ? '<div class="saved-grid">' +
        buyer.saved
          .map(function (id) {
            var p = C.getProductById(id);
            if (!p) return '';
            return (
              '<a href="product.php?id=' +
              encodeURIComponent(p.id) +
              '" class="saved-mini-card">' +
              '<img src="' +
              C.esc(C.asset(p.image)) +
              '" alt="">' +
              '<p>' +
              C.esc(p.title) +
              '</p></a>'
            );
          })
          .join('') +
        '</div>'
      : C.renderEmptyState({ icon: '◇', title: 'No saved products', description: 'Save listings to revisit later.' });

    var reqHtml = buyer.activeRequests.length
      ? buyer.activeRequests
          .map(function (r) {
            return (
              '<div class="request-preview-card">' +
              '<img src="' +
              C.esc(r.creatorAvatar) +
              '" alt="">' +
              '<div class="request-preview-body"><h4>' +
              C.esc(r.productTitle) +
              ' · ' +
              C.renderStatusBadge(r.status) +
              '</h4><p>' +
              C.esc(r.latestReply) +
              '</p></div>' +
              '<a href="messages.php?id=' +
              encodeURIComponent(r.conversationId) +
              '" class="btn-sm">Message</a></div>'
            );
          })
          .join('')
      : C.renderEmptyState({ icon: '○', title: 'No active requests', description: 'Custom orders you place will appear here.' });

    var convos = (window.CraftlytConversations || []).slice(0, 3);
    var convHtml = convos.length
      ? convos
          .map(function (c) {
            return (
              '<a href="messages.php?id=' +
              encodeURIComponent(c.id) +
              '" class="msg-preview-card" style="text-decoration:none;color:inherit">' +
              '<img src="' +
              C.esc(c.participantAvatar) +
              '" alt="">' +
              '<div class="msg-preview-body"><h4>' +
              C.esc(c.participantName) +
              '</h4><p>' +
              C.esc(c.lastMessage) +
              '</p></div><span class="msg-preview-time">' +
              C.esc(c.lastTime) +
              '</span></a>'
            );
          })
          .join('')
      : C.renderEmptyState({ icon: '○', title: 'No conversations', description: 'Message creators from product pages.' });

    root.innerHTML =
      '<div class="container">' +
      '<div class="page-head"><p class="eyebrow">Account</p><h1 class="page-title">Buyer dashboard</h1>' +
      '<p class="page-sub">Your cart, saved pieces, and conversations in one place.</p></div>' +
      '<div class="buyer-grid">' +
      '<section><h2 class="dashboard-section-head" style="margin-bottom:14px"><span style="font-family:var(--font-display);font-size:26px">Cart</span></h2>' +
      cartHtml +
      '</section>' +
      '<div><section class="dashboard-section"><h2 style="font-family:var(--font-display);font-size:26px;margin-bottom:14px">Saved products</h2>' +
      savedHtml +
      '</section>' +
      '<section class="dashboard-section" style="margin-top:28px"><h2 style="font-family:var(--font-display);font-size:26px;margin-bottom:14px">Active requests</h2>' +
      reqHtml +
      '</section></div></div>' +
      '<section class="dashboard-section" style="margin-top:32px"><h2 style="font-family:var(--font-display);font-size:26px;margin-bottom:14px">Recent conversations</h2>' +
      convHtml +
      '</section></div>';

    root.innerHTML = root.innerHTML.replace(/<\/?motion-illustration>/g, '');

    root.querySelectorAll('.cart-item').forEach(function (row) {
      var id = row.dataset.id;
      var item = buyer.cart.find(function (c) {
        return c.productId === id;
      });
      if (!item) return;
      row.querySelector('.qty-plus').addEventListener('click', function () {
        item.quantity++;
        location.reload();
      });
      row.querySelector('.qty-minus').addEventListener('click', function () {
        if (item.quantity > 1) item.quantity--;
        location.reload();
      });
      row.querySelector('.btn-remove').addEventListener('click', function () {
        buyer.cart = buyer.cart.filter(function (c) {
          return c.productId !== id;
        });
        location.reload();
      });
    });
  });
})();

