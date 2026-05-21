(function () {
  'use strict';
  var C = window.Craftlyt;
  var root = document.getElementById('requests-root');
  var all = window.CraftlytRequests || [];
  var activeTab = 'all';
  var searchQ = '';
  var statusFilter = '';

  C.guardPage('creator', root, function () {
    function counts() {
      return {
        all: all.length,
        open: all.filter(function (r) {
          return r.status === 'open';
        }).length,
        negotiating: all.filter(function (r) {
          return r.status === 'negotiating';
        }).length,
        closed: all.filter(function (r) {
          return r.status === 'closed';
        }).length,
      };
    }

    function filtered() {
      return all.filter(function (r) {
        if (activeTab !== 'all' && r.status !== activeTab) return false;
        if (statusFilter && r.status !== statusFilter) return false;
        if (!searchQ) return true;
        var hay = (r.buyerName + r.message + r.productTitle).toLowerCase();
        return hay.indexOf(searchQ) !== -1;
      });
    }

    function render() {
      var c = counts();
      var list = filtered();
      var tabs = [
        ['all', 'All'],
        ['open', 'Open'],
        ['negotiating', 'Negotiating'],
        ['closed', 'Closed'],
      ]
        .map(function (t) {
          return (
            '<button type="button" class="tab-btn' +
            (activeTab === t[0] ? ' is-active' : '') +
            '" data-tab="' +
            t[0] +
            '">' +
            t[1] +
            ' <span class="tab-count">(' +
            c[t[0]] +
            ')</span></button>'
          );
        })
        .join('');

      var cards = list.length
        ? list
            .map(function (r) {
              return (
                '<article class="request-card-full">' +
                '<div class="request-card-header">' +
                '<img src="' +
                C.esc(r.buyerAvatar) +
                '" alt="">' +
                '<div class="request-card-meta"><h3>' +
                C.esc(r.buyerName) +
                ' ' +
                C.renderStatusBadge(r.status) +
                '</h3><p class="request-card-product">' +
                C.esc(r.productTitle) +
                '</p></div></div>' +
                '<p class="request-card-message">' +
                C.esc(r.message) +
                '</p>' +
                '<div class="request-card-details">' +
                '<span><strong>Budget:</strong> ' +
                C.esc(C.formatPrice(r.budgetMin) + ' – ' + C.formatPrice(r.budgetMax)) +
                '</span>' +
                '<span><strong>Deadline:</strong> ' +
                C.esc(r.deadline) +
                '</span></div>' +
                '<div class="request-card-footer">' +
                '<a href="messages.php" class="primary-btn" style="padding:10px 18px;font-size:13px">Respond</a>' +
                '<button type="button" class="btn-ghost btn-decline-req" data-id="' +
                r.id +
                '">Decline</button>' +
                '<button type="button" class="btn-sm btn-view-req" data-id="' +
                r.id +
                '">View full request</button></div></article>'
              );
            })
            .join('')
        : C.renderEmptyState({
            icon: '◇',
            title: 'No requests found',
            description: 'Try adjusting filters or check back when buyers send custom orders.',
          });

      cards = cards.replace(/<\/?motion-illustration>/g, '');

      root.innerHTML =
        '<div class="container" style="padding-bottom:64px">' +
        '<div class="page-head"><p class="eyebrow">Inbox</p><h1 class="page-title">Requests</h1>' +
        '<p class="page-sub">Manage custom order inquiries from buyers.</p></div>' +
        '<div class="requests-toolbar">' +
        '<input type="search" class="storefront-search" id="req-search" placeholder="Search requests…" style="max-width:100%">' +
        '<select id="req-status-filter" aria-label="Filter by status">' +
        '<option value="">All statuses</option>' +
        '<option value="open">Open</option>' +
        '<option value="negotiating">Negotiating</option>' +
        '<option value="closed">Closed</option></select></div>' +
        '<div class="tabs filter-tabs" role="tablist">' +
        tabs +
        '</div>' +
        cards +
        '</div>';

      root.querySelectorAll('.tab-btn[data-tab]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeTab = btn.dataset.tab;
          render();
        });
      });

      document.getElementById('req-search').addEventListener('input', function (e) {
        searchQ = e.target.value.trim().toLowerCase();
        render();
      });

      document.getElementById('req-status-filter').addEventListener('change', function (e) {
        statusFilter = e.target.value;
        render();
      });

      root.querySelectorAll('.btn-decline-req').forEach(function (btn) {
        btn.addEventListener('click', function () {
          btn.textContent = 'Declined';
          btn.disabled = true;
        });
      });

      root.querySelectorAll('.btn-view-req').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var r = all.find(function (x) {
            return x.id === btn.dataset.id;
          });
          if (r) alert(r.message + '\n\nBudget: ' + C.formatPrice(r.budgetMin) + ' – ' + C.formatPrice(r.budgetMax));
        });
      });
    }

    render();
  });
})();

