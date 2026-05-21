(function () {
  'use strict';
  var C = window.Craftlyt;
  var root = document.getElementById('dashboard-root');
  var user = C.getUser();

  C.guardPage('creator', root, function () {
    var products = C.getCreatorProducts(user.id);
    var requests = (window.CraftlytRequests || []).filter(function (r) {
      return r.status === 'open' || r.status === 'negotiating';
    });
    var convos = window.CraftlytConversations || [];
    var revenue = products.reduce(function (sum, p) {
      return sum + (p.status === 'sold' ? p.price : 0);
    }, 0);

    var productCards = products.length
      ? products
          .map(function (p) {
            return (
              '<article class="dashboard-product-card">' +
              '<img src="' +
              C.esc(C.asset(p.image)) +
              '" alt="">' +
              '<div class="dashboard-product-card-body">' +
              '<h3>' +
              C.esc(p.title) +
              '</h3>' +
              '<span class="product-card-price">' +
              C.esc(C.formatPrice(p.price)) +
              '</span>' +
              '<div class="dashboard-product-card-row">' +
              C.renderStatusBadge(p.status) +
              '<a href="product-form.php?id=' +
              encodeURIComponent(p.id) +
              '" class="btn-sm">Edit</a></div></div></article>'
            );
          })
          .join('')
      : C.renderEmptyState({
          icon: '○',
          title: 'No products yet',
          description: 'Add your first listing to start selling on Craftlyt.',
          actionHtml:
            '<div class="empty-state-actions"><a href="product-form.php" class="primary-btn">Add product</a></div>',
        });

    productCards = productCards.replace(/<\/?motion-illustration>/g, '');

    var requestCards = requests.length
      ? requests
          .slice(0, 3)
          .map(function (r) {
            return (
              '<div class="request-preview-card">' +
              '<img src="' +
              C.esc(r.buyerAvatar) +
              '" alt="">' +
              '<div class="request-preview-body"><h4>' +
              C.esc(r.buyerName) +
              '</h4><p>' +
              C.esc(r.message) +
              '</p><span style="font-size:12px;color:#8d3419">' +
              C.esc(C.formatPrice(r.budgetMin) + ' – ' + C.formatPrice(r.budgetMax)) +
              '</span></div>' +
              '<div class="request-actions">' +
              '<button type="button" class="btn-sm btn-accept" data-id="' +
              r.id +
              '">Accept</button>' +
              '<button type="button" class="btn-sm btn-decline" data-id="' +
              r.id +
              '">Decline</button></div></div>'
            );
          })
          .join('')
      : C.renderEmptyState({
          icon: '◇',
          title: 'No pending requests',
          description: 'Custom order requests from buyers will appear here.',
        });

    var msgCards = convos.length
      ? convos
          .slice(0, 3)
          .map(function (c) {
            return (
              '<a href="messages.php?id=' +
              encodeURIComponent(c.id) +
              '" class="msg-preview-card" style="text-decoration:none;color:inherit">' +
              '<img src="' +
              C.esc(c.participantAvatar) +
              '" alt="">' +
              (c.unread ? '<span class="unread-dot" aria-label="Unread"></span>' : '') +
              '<div class="msg-preview-body"><h4>' +
              C.esc(c.participantName) +
              '</h4><p>' +
              C.esc(c.lastMessage) +
              '</p></div>' +
              '<span class="msg-preview-time">' +
              C.esc(c.lastTime) +
              '</span></a>'
            );
          })
          .join('')
      : C.renderEmptyState({
          icon: '○',
          title: 'No messages',
          description: 'Conversations with buyers will show up here.',
        });

    root.innerHTML =
      '<div class="container">' +
      '<div class="page-head page-head-row">' +
      '<div><p class="eyebrow">Studio</p><h1 class="page-title">Dashboard</h1><p class="page-sub">Welcome back, ' +
      C.esc(user.name) +
      '.</p></div>' +
      '<a href="product-form.php" class="primary-btn">+ Add product</a></div>' +
      '<div class="stat-grid">' +
      '<div class="stat-card"><div class="stat-card-icon">◇</div><p class="stat-card-label">Products</p><p class="stat-card-value">' +
      products.length +
      '</p></div>' +
      '<div class="stat-card"><div class="stat-card-icon">◎</div><p class="stat-card-label">Requests</p><p class="stat-card-value">' +
      requests.length +
      '</p></div>' +
      '<div class="stat-card"><div class="stat-card-icon">◯</div><p class="stat-card-label">Messages</p><p class="stat-card-value">' +
      convos.length +
      '</p></div>' +
      '<div class="stat-card"><div class="stat-card-icon">$</div><p class="stat-card-label">Revenue</p><p class="stat-card-value">' +
      C.esc(C.formatPrice(revenue)) +
      '</p></div></div>' +
      '<section class="dashboard-section"><div class="dashboard-section-head"><h2>My products</h2><a href="product-form.php" class="secondary-btn" style="padding:10px 18px;font-size:13px">New listing</a></div>' +
      '<div class="dashboard-product-grid">' +
      productCards +
      '</div></section>' +
      '<div class="dashboard-two-col">' +
      '<section class="dashboard-section"><div class="dashboard-section-head"><h2>Pending requests</h2><a href="requests.php" class="btn-sm">View all</a></div>' +
      requestCards +
      '</section>' +
      '<section class="dashboard-section"><div class="dashboard-section-head"><h2>Recent messages</h2><a href="messages.php" class="btn-sm">Open inbox</a></div>' +
      msgCards +
      '</section></div></div>';

    root.innerHTML = root.innerHTML.replace(/<\/?motion-illustration>/g, '');

    root.querySelectorAll('.btn-accept, .btn-decline').forEach(function (btn) {
      btn.addEventListener('click', function () {
        btn.disabled = true;
        btn.textContent = btn.classList.contains('btn-decline') ? 'Declined' : 'Accepted';
      });
    });
  });
})();

