window.Craftlyt = window.Craftlyt || {};

(function (C) {
  'use strict';

  C.getUser = function () {
    return window.currentUser || { role: 'buyer', name: 'Guest' };
  };

  C.isCreator = function () {
    return C.getUser().role === 'creator';
  };

  C.isBuyer = function () {
    return C.getUser().role === 'buyer';
  };

  C.renderRestricted = function (requiredRole) {
    var label = requiredRole === 'creator' ? 'creator tools' : 'buyer accounts';
    var dash =
      requiredRole === 'creator'
        ? C.page('dashboard.php')
        : C.page('buyer-dashboard.php');
    return (
      '<div class="empty-state empty-state--restricted">' +
      '<div class="empty-state-icon" aria-hidden="true">◇</div>' +
      '<h2 class="empty-state-title">Access restricted</h2>' +
      '<p class="empty-state-desc">This area is for ' +
      C.esc(label) +
      ' only. Switch your demo role in <code>data/users.js</code> or return to the marketplace.</p>' +
      '<div class="empty-state-actions">' +
      '<a href="' +
      C.esc(C.rootPage('storefront.php')) +
      '" class="primary-btn">Browse storefront</a>' +
      '<a href="' +
      C.esc(dash) +
      '" class="secondary-btn">Go to dashboard</a>' +
      '</div></div>'
    );
  };

  C.guardPage = function (role, mount, renderContent) {
    if (!mount) return;
    if (C.getUser().role === role) {
      renderContent();
      return;
    }
    mount.innerHTML = C.renderRestricted(role);
  };
})(window.Craftlyt);

