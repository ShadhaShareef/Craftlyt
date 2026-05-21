(function () {
  'use strict';
  var C = window.Craftlyt;
  var root = document.getElementById('pricing-root');
  var data = window.CraftlytPricingInsights;

  C.guardPage('creator', root, function () {
    var maxBar = Math.max.apply(
      null,
      data.chartBars.map(function (b) {
        return b.value;
      })
    );

    var categories = data.categories
      .map(function (cat) {
        var trendClass =
          cat.trend === 'up' ? 'trend-up' : cat.trend === 'down' ? 'trend-down' : 'trend-steady';
        return (
          '<article class="category-insight-card">' +
          '<h3>' +
          C.esc(cat.name) +
          '</h3>' +
          '<div class="insight-stat-row"><span>Average</span><strong>' +
          C.esc(C.formatPrice(cat.avg)) +
          '</strong></div>' +
          '<div class="insight-stat-row"><span>Range</span><strong>' +
          C.esc(C.formatPrice(cat.min) + ' – ' + C.formatPrice(cat.max)) +
          '</strong></div>' +
          '<p class="' +
          trendClass +
          '">' +
          C.esc(cat.trendLabel) +
          '</p></article>'
        );
      })
      .join('');

    categories = categories.replace(/<\/?motion-illustration>/g, '');

    var panels = data.insights
      .map(function (i) {
        return (
          '<div class="insight-panel"><h4>' +
          C.esc(i.title) +
          '</h4><p class="insight-value">' +
          C.esc(i.value) +
          '</p><p>' +
          C.esc(i.detail) +
          '</p></div>'
        );
      })
      .join('');

    var bars = data.chartBars
      .map(function (b) {
        var h = Math.round((b.value / maxBar) * 100);
        return (
          '<div class="css-chart-bar-wrap"><div class="css-chart-bar" style="height:' +
          h +
          '%"></div><span class="css-chart-label">' +
          C.esc(b.label) +
          '</span></div>'
        );
      })
      .join('');

    root.innerHTML =
      '<div class="container" style="padding-bottom:64px">' +
      '<section class="pricing-hero">' +
      '<p class="eyebrow">Intelligence</p>' +
      '<h1>' +
      C.esc(data.hero.title) +
      '</h1>' +
      '<p class="page-sub" style="margin-inline:auto">' +
      C.esc(data.hero.description) +
      '</p></section>' +
      '<div class="category-insight-grid">' +
      categories +
      '</div>' +
      '<div class="insight-panels">' +
      panels +
      '</div>' +
      '<div class="css-chart"><h3>Listings by price band</h3><div class="css-chart-bars">' +
      bars +
      '</div></div></div>';
  });
})();
