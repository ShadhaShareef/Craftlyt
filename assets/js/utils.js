window.Craftlyt = window.Craftlyt || {};

(function (C) {
  'use strict';

  C.isPagesDir = function () {
    return /\/pages\//.test(location.pathname) || location.pathname.includes('pages\\');
  };

  C.base = function () {
    return C.isPagesDir() ? '..' : '.';
  };

  C.asset = function (path) {
    var p = path.replace(/^\//, '');
    return C.isPagesDir() ? '../' + p : p;
  };

  /** Pages under /pages */
  C.page = function (name) {
    return C.isPagesDir() ? name : 'pages/' + name;
  };

  /** Root-level HTML (index, storefront, login) */
  C.rootPage = function (name) {
    return C.isPagesDir() ? '../' + name : name;
  };

  C.esc = function (s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };

  C.formatPrice = function (n) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(n);
  };

  C.getParam = function (key) {
    return new URLSearchParams(window.location.search).get(key);
  };

  C.getProductById = function (id) {
    return (window.CraftlytProducts || []).find(function (p) {
      return p.id === id;
    });
  };

  C.getCreatorProducts = function (creatorId) {
    return (window.CraftlytProducts || []).filter(function (p) {
      return p.creatorId === creatorId;
    });
  };

  C.getRelatedProducts = function (product, limit) {
    limit = limit || 4;
    return (window.CraftlytProducts || [])
      .filter(function (p) {
        return p.id !== product.id && p.category === product.category;
      })
      .slice(0, limit);
  };

  C.suggestPrice = function (category, materials) {
    var base = { Textiles: 95, Ceramics: 65, 'Paper & print': 40, Jewelry: 70, Home: 85 };
    var mid = base[category] || 60;
    var len = (materials || '').length;
    if (len > 40) mid += 15;
    return {
      min: Math.round(mid * 0.75),
      max: Math.round(mid * 1.45),
      recommended: Math.round(mid * 1.05),
    };
  };
})(window.Craftlyt);
